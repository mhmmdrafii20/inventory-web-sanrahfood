import type { HttpContext } from '@adonisjs/core/http'
import Produk from '#models/produk'
import { RiwayatProduksiServices } from '#services/RiwayatProduksiServices';

export default class ProduksiController {
    async index({ inertia }: HttpContext) {
        const produk = await Produk.query().preload('resep', (resepQuery) => {
            resepQuery.where({ is_deleted: false })
        }).where({ is_deleted: false }).whereHas('resep', (resepQuery) => {
            resepQuery.where({ is_deleted: false })
        });
        return inertia.render('produksi', { produk });
    }
    async create({ request, response, session }: HttpContext) {
        try {
            const payload = request.only(['id_produk', 'id_resep', 'jumlah_batch', 'tanggal_produksi', 'catatan_tambahan'])
            console.log(payload);
            await RiwayatProduksiServices.create(payload);
            session.flash('success', "Produksi berhasil dilakukan");
            return response.redirect().toRoute('produksi.index');
        } catch (error) {
            session.flash('error', 'Terjadi kesalahan saat produksi.');
            return response.redirect().back();
        }
    }
}