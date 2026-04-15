import type { HttpContext } from '@adonisjs/core/http'
import { supabase } from '../../services/supabase.ts';
import HakAkses from '#models/hakAkses';
import Pengguna from '#models/pengguna';
import { PenggunaServices } from '#services/PenggunaServices';

export default class PenggunaController {
    async index ({inertia}:HttpContext) {
        const role = await HakAkses.query().where({is_deleted:false});
        const pengguna = await Pengguna.query().preload('hakAkses').where({is_deleted:false});
        return inertia.render('pengguna', {role, pengguna});
    }
    async create({response, request, session}:HttpContext){
        try{
            const userPayload = request.only(['email', 'password']);
            const additionalUserPayload = request.only(['nama_pengguna', 'nomor_telepon', 'id_hak_akses']);

            const {data, error} = await supabase.auth.admin.createUser({
                email:userPayload.email,
                password:userPayload.password,
                email_confirm:true
            });
            const user = await Pengguna.findBy('id_pengguna', data.user?.id);
            if(error) throw Error(error.message);

            await PenggunaServices.create(additionalUserPayload, user!.id);

            session.flash('success', 'Berhasil melakukan pembuatan akun.');
            response.redirect().toRoute('pengguna.index');
        }catch(error){
            console.log(error)
            session.flash('error', 'Terjadi kesalahan dalam pembuatan akun');
            response.redirect().back();
        }
    }
    async edit({inertia, params}:HttpContext) {
        const pengguna = await Pengguna.find(params.id);
        const dataPengguna = pengguna?.$attributes;
        const role = await HakAkses.query().where({is_deleted:false});
        const auth = await supabase.auth.admin.getUserById(pengguna!.$attributes.id_pengguna);

        return inertia.render('updatePengguna', {dataPengguna, role, auth});
    }
    async update({response, request,  session, params}:HttpContext){
        try{
            const userPayload = request.only(['email', 'password']);
            const additionalPayload = request.only(['id', 'id_pengguna', 'id_hak_akses', 'nama_pengguna', 'nomor_telepon']);

            const {error} = await supabase.auth.admin.updateUserById(params.id, {
                email:userPayload.email,
                password:userPayload.password
            })
            if(error) throw new Error(error.message);

            await  PenggunaServices.update(additionalPayload, additionalPayload.id);

            session.flash('success', 'Berhasil melakukan perubahan');
            response.redirect().toRoute('pengguna.index');
        }catch(error) {
            session.flash('error', 'Terjadi kesalahan dalam update akun');
            response.redirect().back();
        }
      
    }
    async destroy({response, session, params}:HttpContext){
        try{
            const pengguna = await Pengguna.find(params.id);

            await PenggunaServices.delete(params.id);
            await supabase.auth.signOut();

            session.flash('success', `${pengguna?.nama_pengguna} Berhasil dihapus`);
            return response.redirect().toRoute('pengguna.index');
        }catch(error){
            session.flash('error', 'Terjadi kesalahan saat delete.');
            return response.redirect().back();
        }
    }
}