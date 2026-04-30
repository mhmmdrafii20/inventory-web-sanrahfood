import HakAkses from "#models/auth/hakAkses";
import { HakAksesServices } from "#services/auth/HakAksesServices";
import { HttpContext } from "@adonisjs/core/http";
import { hakAksesValidator, updateHakAksesValidator } from "#validators/auth/hak_akses";
import Pengguna from "#models/auth/pengguna";

export default class HakAksesController {
    async index({ inertia }: HttpContext) {
        const role = await HakAkses.query().where({ is_deleted: false });
        return inertia.render('auth/hakAkses', { role });
    }
    async create({ request, response, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(hakAksesValidator);
            await HakAksesServices.create(payload);

            session.flash('success', `${payload.nama_hak_akses} Berhasil ditambahkan`);
            return response.redirect().toRoute('hakAkses.index');
        } catch (error) {
            console.error(error);
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
        return inertia.render('auth/update/hakAkses', { dataRole });
    }
    async update({ request, response, session, params }: HttpContext) {
        try {
            const role = await HakAkses.find(params.id);

            const payload = await request.validateUsing(updateHakAksesValidator(params.id));

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

            const cekPenggunaHakAkses = await Pengguna.query().where('id_hak_akses', params.id).where({ is_deleted: false }).preload('hakAkses').first();

            if (cekPenggunaHakAkses) {
                throw new Error(`${cekPenggunaHakAkses?.nama_pengguna} masih menggunakan hak akses ${cekPenggunaHakAkses?.hakAkses?.nama_hak_akses}`);
            }
            await HakAksesServices.delete(params.id)

            session.flash('success', `${role?.nama_hak_akses} berhasil dihapus`);
            return response.redirect().toRoute('hakAkses.index');
        } catch (error) {
            session.flash('error', error.message);
            return response.redirect().back();
        }
    }
    async trash({ inertia }: HttpContext) {
        const role = await HakAkses.query().where({ is_deleted: true });
        return inertia.render('auth/restore/hakAkses', { role });
    }
    async restore({ response, params, session }: HttpContext) {
        try {
            const role = await HakAkses.find(params.id);
            await HakAksesServices.restore(params.id);

            session.flash('success', `${role?.nama_hak_akses} berhasil dipulihkan`);
            return response.redirect().toRoute('hakAkses.index');
        } catch (error) {
            session.flash('error', error.message);
            return response.redirect().back();
        }
    }
    async search({ request, response, inertia }: HttpContext) {
        const nama_hak_akses = request.input('search', '')

        if (!nama_hak_akses) {
            return response.redirect().toRoute('hakAkses.index');
        }
        const searchRes = await HakAksesServices.search(nama_hak_akses);
        return inertia.render("auth/hakAkses", { searchRes });
    }
    async searchTrash({ request, response, inertia }: HttpContext) {
        const nama_hak_akses = request.input('search', '')

        if (!nama_hak_akses) {
            return response.redirect().toRoute('hakAkses.trash');
        }
        const searchRes = await HakAksesServices.searchTrash(nama_hak_akses);
        return inertia.render("auth/restore/hakAkses", { searchRes });
    }
}