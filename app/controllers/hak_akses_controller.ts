import HakAkses from "#models/hakAkses";
import { HakAksesServices } from "#services/HakAksesServices";
import { HttpContext } from "@adonisjs/core/http";
export default class HakAksesController {
    async index({inertia}:HttpContext) {
        const role = await HakAkses.query().where({is_deleted:false});
        return inertia.render('hakAkses', {role});
    }
    async create({request, response, session}:HttpContext){
        try{
            const payload = request.only(['nama_hak_akses']);
            await HakAksesServices.create(payload);

            session.flash('success', `${payload.nama_hak_akses} Berhasil ditambahkan`);
            return response.redirect().toRoute('hakAkses.index');
        }catch(error){
            session.flash('error', 'Terjadi kesalahan saat tambah data.');
            return response.redirect().back();
        } 
    }    
    async edit({inertia, params}:HttpContext) {
        const role = await HakAkses.find(params.id);
        const dataRole = role?.$attributes;
        return inertia.render('updateHakAkses', {dataRole});
    }
    async update({request, response, session, params}:HttpContext) {
        try{
            const role = await HakAkses.find(params.id);
            const dataRole = role?.$attributes;

            const payload = request.only(['id_hak_akses', 'nama_hak_akses']);

            await HakAksesServices.update(payload, params.id);
            session.flash('success', `${dataRole?.nama_hak_akses} Berhasil dilakukan perubahan.`);
            return response.redirect().toRoute('hakAkses.index');
        }catch(error){
            session.flash("error", 'Terjadi kesalahan saat update data');
            return response.redirect().back();
        }
    }
    async destroy({response, params, session}:HttpContext){
        try{
            const role = await HakAkses.find(params.id);
            const dataRole = role?.$attributes;

            await HakAksesServices.delete(params.id)
    
            session.flash('success', `${dataRole?.nama_hak_akses} berhasil dihapus`);
            return response.redirect().toRoute('hakAkses.index');
        }catch(error){
            session.flash('error', 'Terjadi kesalahan saat delete.');
            return response.redirect().back();
        }
    }
}