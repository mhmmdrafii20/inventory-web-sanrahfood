import type { HttpContext } from '@adonisjs/core/http'
import { supabase } from '../../services/supabase.ts';

export default class ResepController {
    async index  ({inertia}:HttpContext) {
            return inertia.render('resep', {});
    }
}   