import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { supabase } from '../../services/supabase.ts'
import Pengguna from '#models/pengguna';

export default class EnsureUserAccessMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { data } = await supabase.auth.getUser();

    if(!data.user){
      ctx.session.flash('error', "User data tidak valid");
      return ctx.response.redirect().toRoute('auth.login');
    }

    const pengguna = await Pengguna
    .query()
    .where('id_pengguna', data.user.id)
    .where('is_deleted', false)
    .preload('hakAkses', (q) => {
      q.where('is_deleted', false)
    })
    .first();

    if(!pengguna || !pengguna.hakAkses) {
      await supabase.auth.signOut();
      ctx.session.flash('error', "Akses tidak valid");
      return ctx.response.redirect().toRoute('auth.login');
    }

    ctx.user = pengguna;

    const output = await next()
    return output
  }
}