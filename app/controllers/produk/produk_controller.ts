import Kategori from "#models/produk/kategori"
import Produk from "#models/produk/produk";
import { ProdukServices } from "#services/produk/ProdukServices";
import { HttpContext } from "@adonisjs/core/http"
import { produkValidator, updateProdukValidator } from "#validators/produk/produk";
import Resep from "#models/resep/resep";

export default class ProdukController {
    async index({ inertia }: HttpContext) {
        const kategori = await Kategori.all();
        const produk = await Produk.query().whereHas('kategori', (b) => {
            b.where({ is_deleted: false })
        }).preload('kategori').where({ is_deleted: false });

        return inertia.render('produk/index', { kategori, produk })
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

        return inertia.render('produk/update/produk', { dataProduk, kategori });
    }
    async update({ response, request, session, params }: HttpContext) {
        try {
            const produk = await Produk.find(params.id);
            const payload = await request.validateUsing(updateProdukValidator(params.id));

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

            const cekProdukHasResep = await Resep.query().where('id_produk', params.id).where({ is_deleted: false }).first();

            if (cekProdukHasResep) {
                throw new Error(`${produk?.nama_produk} masih mempunyai resep.`);
            }
            await ProdukServices.delete(params.id);

            session.flash('success', `${produk?.nama_produk} berhasil dihapus`);
            return response.redirect().toRoute('produk.index');
        } catch (error) {
            session.flash('error', error.message);
            return response.redirect().back();
        }
    }
    async trash({ inertia }: HttpContext) {
        const produk = await Produk.query().where({ is_deleted: true }).preload('kategori')
        return inertia.render('produk/restore/produk', { produk });
    }
    async restore({ response, params, session }: HttpContext) {
        try {
            const produk = await Produk.find(params.id);

            const kategori = await Kategori.query().where('id_kategori', Number(produk?.id_kategori)).where({ is_deleted: false }).first();

            if (!kategori) {
                throw new Error(`${produk?.nama_produk} tidak dapat dipulihkan karena kategorinya sudah dihapus.`);
            }

            await ProdukServices.restore(params.id);

            session.flash('success', `${produk?.nama_produk} berhasil dipulihkan`);
            return response.redirect().toRoute('produk.index');
        } catch (error) {
            session.flash('error', error.message);
            return response.redirect().back();
        }
    }
    async search({ request, response, inertia }: HttpContext) {
        const nama_produk = request.input('search', '')

        if (!nama_produk) {
            return response.redirect().toRoute('produk.index');
        }
        const searchRes = await ProdukServices.search(nama_produk);
        return inertia.render("produk/index", { searchRes });
    }
    async searchTrash({ request, response, inertia }: HttpContext) {
        const nama_produk = request.input('search', '')

        if (!nama_produk) {
            return response.redirect().toRoute('produk.trash');
        }
        const searchRes = await ProdukServices.searchTrash(nama_produk);
        return inertia.render("produk/restore/produk", { searchRes });
    }
}