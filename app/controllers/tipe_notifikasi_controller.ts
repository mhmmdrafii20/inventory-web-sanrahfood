import { HttpContext } from "@adonisjs/core/http";
import { tipeNotifikasiValidator, updateTipeNotifikasiValidator } from "#validators/tipe_notifikasi";
import TipeNotifikasiService from "#services/TipeNotifikasiService";
import TipeNotifikasi from "#models/tipe_notifikasi";
import Pengguna from "#models/pengguna";

export default class TipeNotifikasiController {
    async index({ inertia }: HttpContext) {
        const tipeNotifikasi = await TipeNotifikasi.query().where({ is_deleted: false });
        const pengguna = await Pengguna.query().whereHas('hakAkses', (hakAksesQuery => {
            hakAksesQuery.where({ is_deleted: false })
        })).preload('hakAkses').where({ is_deleted: false });

        return inertia.render('tipeNotifikasi', { tipeNotifikasi, pengguna })
    }
    async create({ response, request, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(tipeNotifikasiValidator);

            await TipeNotifikasiService.create(payload);
            session.flash('success', `${payload.nama_notifikasi} berhasil ditambahkan`);
            return response.redirect().toRoute('tipeNotifikasi.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat tambah data.')
            return response.redirect().back();
        }
    }
    async edit({ inertia, params }: HttpContext) {
        const tipeNotifikasi = await TipeNotifikasi.find(params.id);
        const dataTipeNotifikasi = tipeNotifikasi?.$attributes;
        return inertia.render('updateTipeNotifikasi', { dataTipeNotifikasi });
    }
    async update({ request, response, session, params }: HttpContext) {
        try {
            const tipeNotifikasi = await TipeNotifikasi.find(params.id);

            const payload = await request.validateUsing(updateTipeNotifikasiValidator(params.id));

            await TipeNotifikasiService.update(payload, params.id);
            session.flash('success', `${tipeNotifikasi?.nama_notifikasi} Berhasil dilakukan perubahan.`);
            return response.redirect().toRoute('tipeNotifikasi.index');
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
            const tipeNotifikasi = await TipeNotifikasi.find(params.id);

            await TipeNotifikasiService.delete(params.id)

            session.flash('success', `${tipeNotifikasi?.nama_notifikasi} berhasil dihapus`);
            return response.redirect().toRoute('tipeNotifikasi.index');
        } catch (error) {
            session.flash('error', 'Terjadi kesalahan saat delete.');
            return response.redirect().back();
        }
    }
    async search({ request, response, inertia }: HttpContext) {
        const nama_notifikasi = request.input('search', '');
        if (!nama_notifikasi) {
            return response.redirect().toRoute('tipeNotifikasi.index');
        }
        const searchRes = await TipeNotifikasiService.search(nama_notifikasi);
        return inertia.render("tipeNotifikasi", { searchRes });
    }
}