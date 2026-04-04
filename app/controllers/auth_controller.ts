import type { HttpContext } from '@adonisjs/core/http'
import { supabase } from '../../services/supabase.ts';
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
        if(error) throw new Error(error.message);
        session.flash('success', 'Berhasil melakukan login.');
        return response.redirect().toRoute('bahan.index');
    }
}