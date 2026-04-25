import HakAkses from "#models/hakAkses";
import { HakAksesServices } from "#services/HakAksesServices";
import { HttpContext } from "@adonisjs/core/http";
import { hakAksesValidator } from "#validators/hak_akses";

export default class HakAksesController {
    async index({ inertia }: HttpContext) {
        const role = await HakAkses.query().where({ is_deleted: false });
        return inertia.render('hakAkses', { role });
    }
    async create({ request, response, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(hakAksesValidator);
            await HakAksesServices.create(payload);

            session.flash('success', `${payload.nama_hak_akses} Berhasil ditambahkan`);
            return response.redirect().toRoute('hakAkses.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat tambah data.')
            return response.redirect().back();
        }
    }
    async edit({ inertia, params }: HttpContext) {
        const role = await HakAkses.find(params.id);
        const dataRole = role?.$attributes;
        return inertia.render('updateHakAkses', { dataRole });
    }
    async update({ request, response, session, params }: HttpContext) {
        try {
            const role = await HakAkses.find(params.id);

            const payload = await request.validateUsing(hakAksesValidator);

            await HakAksesServices.update(payload, params.id);
            session.flash('success', `${role?.nama_hak_akses} Berhasil dilakukan perubahan.`);
            return response.redirect().toRoute('hakAkses.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat update data.')
            return response.redirect().back();
        }
    }
    async destroy({ response, params, session }: HttpContext) {
        try {
            const role = await HakAkses.find(params.id);

            await HakAksesServices.delete(params.id)

            session.flash('success', `${role?.nama_hak_akses} berhasil dihapus`);
            return response.redirect().toRoute('hakAkses.index');
        } catch (error) {
            session.flash('error', 'Terjadi kesalahan saat delete.');
            return response.redirect().back();
        }
    }
}