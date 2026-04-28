import TipeNotifikasi from "#models/tipe_notifikasi";
import { HttpContext } from "@adonisjs/core/http";
import Pengguna from "#models/pengguna";
import { DaftarPenerimaServices } from "#services/DaftarPenerimaServices";
import { daftarPenerimaValidator } from "#validators/daftar_penerima";
import PenerimaNotifikasi from "#models/penerima_notifikasi";

export default class DaftarPenerimaController {
    async index({ inertia }: HttpContext) {
        const tipeNotifikasi = await TipeNotifikasi.query().where({ is_deleted: false })

        const pengguna = await Pengguna.query().whereHas('hakAkses', (hakAksesQuery => {
            hakAksesQuery.where({ is_deleted: false })
        })).preload('hakAkses').where({ is_deleted: false });

        const daftarPenerima = await PenerimaNotifikasi.query()
            .preload('pengguna', (penggunaQuery) => {
                penggunaQuery.where('is_deleted', false)
            })
            .where({ is_deleted: false })

        return inertia.render('daftarPenerima', { tipeNotifikasi, pengguna, daftarPenerima })
    }
    async create({ request, response, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(daftarPenerimaValidator);
            await DaftarPenerimaServices.create(payload);

            const isInternal = !!payload?.id_pengguna;

            let namaPenerima = payload.nama_penerima;

            if (isInternal) {
                const pengguna = await Pengguna.query()
                    .whereHas('hakAkses', (q) => {
                        q.where({ is_deleted: false });
                    })
                    .preload('hakAkses')
                    .where({ is_deleted: false })
                    .where('id_pengguna', payload?.id_pengguna!)
                    .firstOrFail();

                namaPenerima = pengguna.nama_pengguna;
            }

            session.flash('success', `${namaPenerima} berhasil ditambahkan`);
            return response.redirect().toRoute('daftarPenerima.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat tambah data.')
            return response.redirect().back();
        }
    }
    async search({ request, response, inertia }: HttpContext) {
        const search = request.input('search', '');
        if (!search) {
            return response.redirect().toRoute('daftarPenerima.index');
        }
        const searchRes = await DaftarPenerimaServices.search(search);
        return inertia.render("daftarPenerima", { searchRes });
    }

}