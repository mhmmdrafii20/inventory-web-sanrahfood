import type { HttpContext } from '@adonisjs/core/http'
import { supabase } from '../../../services/supabase.ts';
import HakAkses from '#models/auth/hakAkses';
import Pengguna from '#models/auth/pengguna';
import { PenggunaServices } from '#services/auth/PenggunaServices';
import { updatePenggunaValidator, penggunaValidator } from '#validators/auth/pengguna';
import PenerimaNotifikasi from '#models/notifikasi/penerima_notifikasi';

export default class PenggunaController {
    async index({ inertia }: HttpContext) {
        const role = await HakAkses.query().where({ is_deleted: false });
        const pengguna = await Pengguna.query().preload('hakAkses').where({ is_deleted: false });

        return inertia.render('auth/pengguna', { role, pengguna });
    }
    async create({ response, request, session }: HttpContext) {
        try {
            const userPayload = await request.validateUsing(penggunaValidator);

            await PenggunaServices.create(userPayload);

            session.flash('success', 'Berhasil melakukan pembuatan akun.');
            response.redirect().toRoute('pengguna.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat tambah data.')
            return response.redirect().back();
        }
    }
    async edit({ inertia, params }: HttpContext) {
        const pengguna = await Pengguna.query().where('id_pengguna', params.id).first();
        const dataPengguna = pengguna?.$attributes;
        const role = await HakAkses.query().where({ is_deleted: false });
        const auth = await supabase.auth.admin.getUserById(pengguna!.$attributes.id_pengguna);

        return inertia.render('auth/update/pengguna', { dataPengguna, role, auth });
    }
    async update({ response, request, session, params }: HttpContext) {
        try {
            const userPayload = await request.validateUsing(updatePenggunaValidator);

            await PenggunaServices.update(userPayload, params.id);

            session.flash('success', 'Berhasil melakukan perubahan');
            response.redirect().toRoute('pengguna.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat update data.')
            return response.redirect().back();
        }
    }
    async destroy({ response, session, params }: HttpContext) {
        try {
            const pengguna = await Pengguna.query().where('id_pengguna', params.id).first();
            const cekPenggunaHasPenerimaNotifikasi = await PenerimaNotifikasi.query().where('id_pengguna', params.id).first();

            if (cekPenggunaHasPenerimaNotifikasi) {
                throw new Error(`${pengguna?.nama_pengguna} masih terdaftar sebagai penerima notifikasi`);
            }
            await PenggunaServices.delete(params.id);

            session.flash('success', `${pengguna?.nama_pengguna} Berhasil dihapus`);
            return response.redirect().toRoute('pengguna.index');
        } catch (error) {
            session.flash('error', error.message);
            return response.redirect().back();
        }
    }
    async trash({ inertia }: HttpContext) {
        const pengguna = await Pengguna.query().where({ is_deleted: true }).preload('hakAkses');
        return inertia.render('auth/restore/pengguna', { pengguna });
    }
    async restore({ response, session, params }: HttpContext) {
        try {
            const pengguna = await Pengguna.query().where('id_pengguna', params.id).preload('hakAkses').first();
            const hakAkses = await HakAkses.query().where('id_hak_akses', Number(pengguna?.id_hak_akses)).where({ is_deleted: false }).first();

            if (!hakAkses) {
                throw new Error(`${pengguna?.nama_pengguna} tidak dapat dipulihkan karena hak aksesnya sudah dihapus.`);
            }
            await PenggunaServices.restore(params.id);

            session.flash('success', `${pengguna?.nama_pengguna} berhasil dipulihkan`);
            return response.redirect().toRoute('pengguna.index');
        } catch (error) {
            session.flash('error', error.message);
            return response.redirect().back();
        }
    }
    async search({ request, response, inertia }: HttpContext) {
        const nama_pengguna = request.input('search', '')

        if (!nama_pengguna) {
            return response.redirect().toRoute('pengguna.index');
        }
        const searchRes = await PenggunaServices.search(nama_pengguna);
        return inertia.render("auth/pengguna", { searchRes });
    }
    async searchTrash({ request, response, inertia }: HttpContext) {
        const nama_pengguna = request.input('search', '');

        if (!nama_pengguna) {
            return response.redirect().toRoute('pengguna.trash');
        }
        const searchRes = await PenggunaServices.searchTrash(nama_pengguna);
        return inertia.render("auth/restore/pengguna", { searchRes });
    }
}