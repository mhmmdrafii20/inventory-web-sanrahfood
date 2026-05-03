import type { HttpContext } from '@adonisjs/core/http'
import { supabase } from '../../../services/supabase.ts'
import { authValidator } from '#validators/auth/auth'
export default class AuthController {
  async login({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }
  async signIn({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(authValidator)
    const { error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    })
    if (!error) {
      session.flash('success', 'Berhasil melakukan login.')
      return response.redirect().toRoute('dashboard.index')
    }
    session.flash('error', 'Login Gagal')
    return response.redirect().back()
  }
  async signOut({ request, response, session }: HttpContext) {
    await supabase.auth.signOut()
    session.flash('success', 'Berhasil melakukan logout.')
    return response.redirect().toRoute('auth.login')
  }
}
