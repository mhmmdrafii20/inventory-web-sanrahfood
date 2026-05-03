import { HttpContext } from "@adonisjs/core/http";
import { tipeNotifikasiValidator, updateTipeNotifikasiValidator } from "#validators/notifikasi/tipe_notifikasi";
import TipeNotifikasiService from "#services/notifikasi/TipeNotifikasiService";
import TipeNotifikasi from "#models/notifikasi/tipe_notifikasi";
import PenerimaJenisNotifikasi from "#models/notifikasi/penerima_jenis_notifikasi";

export default class TipeNotifikasiController {
    async index({ inertia }: HttpContext) {
        const tipeNotifikasi = await TipeNotifikasi.query();

        return inertia.render('notifikasi/tipeNotifikasi', { tipeNotifikasi })
    }
    async create({ response, request, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(tipeNotifikasiValidator);

            await TipeNotifikasiService.create(payload);
            session.flash('success', `${payload.nama_notifikasi} berhasil ditambahkan`);
            return response.redirect().toRoute('tipeNotifikasi.index');
        } catch (error) {
            console.error(error)
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
        return inertia.render('notifikasi/update/tipeNotifikasi', { dataTipeNotifikasi });
    }
    async update({ request, response, session, params }: HttpContext) {
        try {
            const tipeNotifikasi = await TipeNotifikasi.find(params.id);

            const payload = await request.validateUsing(updateTipeNotifikasiValidator(params.id));

            await TipeNotifikasiService.update(payload, params.id);
            session.flash('success', `${tipeNotifikasi?.nama_notifikasi} Berhasil dilakukan perubahan.`);
            return response.redirect().toRoute('tipeNotifikasi.index');
        } catch (error) {
            console.error(error);
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

            const cekPenerimaNotifikasiHasTipeNotifikasi = await PenerimaJenisNotifikasi.query().where('id_tipe_notifikasi', params.id).first();

            if (cekPenerimaNotifikasiHasTipeNotifikasi) {
                throw new Error(`${tipeNotifikasi?.nama_notifikasi} masih digunakan sebagai tipe notifikasi`);
            }

            await TipeNotifikasiService.delete(params.id);

            session.flash('success', `${tipeNotifikasi?.nama_notifikasi} berhasil dihapus`);
            return response.redirect().toRoute('tipeNotifikasi.index');
        } catch (error) {
            session.flash('error', error.message);
            return response.redirect().back();
        }
    }
    async search({ request, response, inertia }: HttpContext) {
        const nama_notifikasi = request.input('search', '');
        if (!nama_notifikasi) {
            return response.redirect().toRoute('tipeNotifikasi.index');
        }
        const searchRes = await TipeNotifikasiService.search(nama_notifikasi);
        return inertia.render("notifikasi/tipeNotifikasi", { searchRes });
    }
}