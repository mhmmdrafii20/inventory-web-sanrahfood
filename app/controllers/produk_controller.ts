import Kategori from "#models/kategori"
import Produk from "#models/produk";
import { ProdukServices } from "#services/ProdukServices";
import { HttpContext } from "@adonisjs/core/http"
import { produkValidator } from "#validators/produk";

export default class ProdukController {
    async index({ inertia }: HttpContext) {
        const kategori = await Kategori.all();
        const produk = await Produk.query().whereHas('kategori', (b) => {
            b.where({ is_deleted: false })
        }).preload('kategori').where('is_deleted', false);

        return inertia.render('produk', { kategori, produk })
    }
    async create({ request, response, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(produkValidator);
            await ProdukServices.create(payload);

            session.flash('success', 'Berhasil melakukan penambahan produk');
            return response.redirect().toRoute('produk.index');
        } catch (error) {
            if (error.code === 'E_VALIDATION_ERROR') {
                throw error
            }
            session.flash('error', 'Terjadi kesalahan saat tambah data.')
            return response.redirect().back();
        }
    }
    async edit({ inertia, params }: HttpContext) {
        const produk = await Produk.find(params.id);
        const dataProduk = produk?.$attributes;

        const kategori = await Kategori.all();

        return inertia.render('updateProduk', { dataProduk, kategori });
    }
    async update({ response, request, session, params }: HttpContext) {
        try {
            const produk = await Produk.find(params.id);

            const payload = await request.validateUsing(produkValidator);

            await ProdukServices.update(payload, params.id);

            session.flash('success', `${produk?.nama_produk} berhasil diupdate`);
            return response.redirect().toRoute('produk.index');
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
            const produk = await Produk.find(params.id);

            await ProdukServices.delete(params.id);

            session.flash('success', `${produk?.nama_produk} berhasil dihapus`);
            return response.redirect().toRoute('produk.index');
        } catch (error) {
            session.flash('error', 'Terjadi kesalahan saat delete.');
            return response.redirect().back();
        }
    }
    async search({ request, response, inertia }: HttpContext) {
        const { nama_produk } = request.qs()

        if (!nama_produk) {
            return response.redirect().toRoute('produk.index');
        }
        const searchRes = await ProdukServices.search(nama_produk);
        return inertia.render("produk", { searchRes });
    }
}