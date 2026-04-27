import Pengguna from "#models/pengguna";
import { supabase } from "../../services/supabase.ts";
import db from "@adonisjs/lucid/services/db";
export class PenggunaServices {
    static async create(payload: { nama_pengguna: string, nomor_telepon: string, id_hak_akses: number, email: string, password: string }) {
        try {
            const { email, password } = payload;
            await db.transaction(async (transaction) => {
                const { data } = await supabase.auth.admin.createUser({
                    email: email,
                    password: password,
                    email_confirm: true
                });
                await Pengguna.query({ client: transaction }).where('id_pengguna', String(data?.user?.id)).update(payload);
            })
        } catch (error) {
            console.log(error);
        }
    }
    static async update(payload: { id?: number, id_pengguna?: string, id_hak_akses?: number, nama_pengguna?: string, email?: string, password?: string, nomor_telepon?: string }, params: string) {
        await db.transaction(async (transaction) => {
            const { email, password, ...dbPayload } = payload;
            await Pengguna.query({ client: transaction }).where('id_pengguna', params).update(dbPayload);

            await supabase.auth.admin.updateUserById(params, {
                email: email,
                password: password
            })
        });
    }
    static async delete(params: string) {
        const data = await Pengguna.query().where('id_pengguna', params).update({ is_deleted: true });
        return data;
    }
    static async search(nama_pengguna: string) {
        return await Pengguna.query().whereHas('hakAkses', (b) => {
            b.where('nama_pengguna', 'ILIKE', `%${nama_pengguna}%`).where('is_deleted', false);
        }).preload('hakAkses').where('is_deleted', false)
    }
}