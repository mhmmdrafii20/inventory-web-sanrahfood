import type { HttpContext } from '@adonisjs/core/http'
import { BahanService } from '#services/BahanServices';
import Bahan from '#models/bahan';
import { bahanValidator, updateBahanValidator } from '#validators/bahan';
export default class BahanController {
    async index({ inertia }: HttpContext) {
        const bahan = await Bahan.query().where('is_deleted', false);
        return inertia.render('bahan', { bahan });
    }
    async create({ request, response, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(bahanValidator);
            await BahanService.create(payload);

            session.flash('success', `${payload.nama_bahan_baku} berhasil ditambahkan.`);
            return response.redirect().toRoute('bahan.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat tambah data.')
            return response.redirect().back();
        }
    }
    async edit({ inertia, params }: HttpContext) {
        const bahan = await Bahan.find(params.id);
        const dataBahan = bahan?.$attributes;

        return inertia.render('updateBahan', { dataBahan });
    }
    async update({ request, response, params, session }: HttpContext) {
        try {
            const bahan = await Bahan.find(params.id);
            const dataBahan = bahan?.$attributes;

            const payload = await request.validateUsing(updateBahanValidator(params.id));
            await BahanService.update(payload, params.id);

            session.flash('success', `${dataBahan?.nama_bahan_baku} berhasil diupdate`);
            return response.redirect().toRoute('bahan.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat update data.');
            return response.redirect().back();
        }
    }
    async destroy({ response, params, session }: HttpContext) {
        try {
            const bahan = await Bahan.find(params.id);

            await BahanService.delete(params.id);

            session.flash('success', `${bahan?.nama_bahan_baku} berhasil dihapus`);
            return response.redirect().toRoute('bahan.index');
        } catch (error) {
            session.flash('error', 'Terjadi kesalahan saat delete.');
            return response.redirect().back();
        }
    }
    async search({ request, response, inertia }: HttpContext) {
        const nama_bahan_baku = request.input('search', '');
        if (!nama_bahan_baku) {
            return response.redirect().toRoute('bahan.index');
        }
        const searchRes = await BahanService.search(nama_bahan_baku);
        return inertia.render("bahan", { searchRes });
    }
}