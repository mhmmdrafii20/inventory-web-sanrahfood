import type { HttpContext } from '@adonisjs/core/http'
import { supabase } from '../../../services/supabase.ts'
import { authValidator } from '#validators/auth/auth'
import Pengguna from '#models/auth/pengguna'
import HakAkses from '#models/auth/hakAkses'

export default class AuthController {
  async login({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }
  async signIn({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(authValidator)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    })
    if (!error) {
      session.flash('success', 'Berhasil melakukan login.')
      const user = await Pengguna.query()
        .where('id_pengguna', String(data.user?.id))
        .preload('hakAkses')
        .first()

      if (!user) {
        session.flash('error', 'Anda tidak memiliki akses untuk login.')
        return response.redirect().back()
      }
      const hakAkses = await HakAkses.find(user.id_hak_akses)

      type Role = 'Pemilik' | 'Karyawan Gudang' | 'Karyawan Produksi'

      const role = hakAkses?.$attributes.nama_hak_akses as Role

      console.log(role)
      const roleRedirectMap = {
        'Pemilik': 'dashboard.pemilik',
        'Karyawan Gudang': 'dashboard.gudang',
        'Karyawan Produksi': 'dashboard.produksi',
      } as const
      const route = roleRedirectMap[role]
      return response.redirect().toRoute(route)
    }
    session.flash('error', 'Login Gagal')
    return response.redirect().back()
  }
  async signOut({ response, session }: HttpContext) {
    await supabase.auth.signOut()
    session.flash('success', 'Berhasil melakukan logout.')
    return response.redirect().toRoute('auth.login')
  }
}
