import type { HttpContext } from '@adonisjs/core/http'
import { BahanService } from '#services/BahanServices';
import Bahan from '#models/bahan';
export default class BahanController {
    async index({inertia}:HttpContext) {
        const bahan = await Bahan.all();


        return inertia.render('bahan', {bahan});
    }
    async create({request, response, session}:HttpContext) {
        try{
            const payload = request.only(['nama_bahan_baku', 'satuan']);
            await BahanService.create(payload);

            session.flash('success', `${payload.nama_bahan_baku} berhasil ditambahkan.`);
            return response.redirect().toRoute('bahan.index');
        }catch(error){
            session.flash('error', 'Terjadi kesalahan saat tambah data.');
            return response.redirect().back();
        }
    }
    async edit({inertia, params}:HttpContext) {
        const bahan = await Bahan.find(params.id);
        const dataBahan = bahan?.$attributes;

        return inertia.render('updateBahan', {dataBahan});
    }
    async update({request, response, params, session}:HttpContext) {
        try{
            const bahan = await Bahan.find(params.id);
            const dataBahan = bahan?.$attributes;

            const payload = request.only(['id_bahan_baku','nama_bahan_baku', 'satuan']);
            await BahanService.update(payload, params.id);

            session.flash('success', `${dataBahan?.nama_bahan_baku} berhasil diupdate`);
            return response.redirect().toRoute('bahan.index');
        }catch(error){
             session.flash('error', 'Terjadi kesalahan saat update.');
             return response.redirect().back();
        }
    }
    async destroy({response, params, session}:HttpContext){
        try{
            const bahan = await Bahan.find(params.id);
            
            await BahanService.delete(params.id);

            session.flash('success', `${bahan?.nama_bahan_baku} berhasil dihapus`);
            return response.redirect().toRoute('bahan.index');
        }catch(error){
            session.flash('error', 'Terjadi kesalahan saat delete.');
            return response.redirect().back();
        }
    }
}