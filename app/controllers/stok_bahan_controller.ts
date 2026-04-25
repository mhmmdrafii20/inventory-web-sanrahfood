import Bahan from "#models/bahan";
import StokBahanBaku from "#models/stok_bahan_baku";
import type { HttpContext } from "@adonisjs/core/http";
import { StokBahanServices } from "#services/StokBahanServices";
import { stokBahanValidator } from "#validators/stok_bahan";

export default class StokBahanController {
    async index({ inertia }: HttpContext) {
        const stokBahan = await StokBahanBaku.query().preload('bahan', (bahanQuery) => {
            bahanQuery.where({ is_deleted: false })
        });
        return inertia.render("stokBahan", { stokBahan })
    }
    async restok({ inertia }: HttpContext) {
        const bahan = await Bahan.query().where({ is_deleted: false });
        return inertia.render("restokBahan", { bahan });
    }
    async create({ request, response, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(stokBahanValidator)
            await StokBahanServices.update(payload);

            const bahan = await Bahan.find(payload.id_bahan_baku);

            session.flash('success', `Stok ${bahan?.nama_bahan_baku} berhasil ditambahkan`);
            return response.redirect().toRoute('stokBahan.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat tambah data.')
            return response.redirect().back();
        }
    }
}