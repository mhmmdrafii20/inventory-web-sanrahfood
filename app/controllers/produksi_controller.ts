import type { HttpContext } from '@adonisjs/core/http'
import Produk from '#models/produk'
import { ProduksiServices } from '#services/ProduksiServices';
import { produksiValidator } from '#validators/produksi';

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
            const payload = await request.validateUsing(produksiValidator);
            await ProduksiServices.create(payload);

            session.flash('success', "Produksi berhasil dilakukan");
            return response.redirect().toRoute('produksi.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat tambah data.')
            return response.redirect().back();
        }
    }
}