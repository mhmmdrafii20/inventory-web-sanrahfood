import type { HttpContext } from '@adonisjs/core/http'
import { supabase } from '../../services/supabase.ts';
import Pengguna from '#models/pengguna';
export default class AuthController {
    async login ({inertia}:HttpContext) {
        return inertia.render('login', {});
    }
    async signIn ({request, response, session}:HttpContext) {
        const payload = request.only(['email', 'password']);
        const {error} = await supabase.auth.signInWithPassword({
            email:payload.email,
            password:payload.password
        });
        if(!error) {
            session.flash('success', 'Berhasil melakukan login.');
            return response.redirect().toRoute('bahan.index');
        }
        response.redirect().back();
        return session.flash('error', "Login Gagal");

    }
}