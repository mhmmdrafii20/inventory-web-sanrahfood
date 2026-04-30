import type { HttpContext } from "@adonisjs/core/http";
import StokProduk from "#models/produk/stok_produk";
import { StokProdukServices } from "#services/produk/StokProdukServices";

export default class StokProdukController {
    async index({ inertia }: HttpContext) {
        const stokProduk = await StokProduk.query().whereHas('produk', (b) => {
            b.where({ is_deleted: false })
        }).preload('produk');
        return inertia.render("produk/stok", { stokProduk })
    }
    async search({ request, inertia, response }: HttpContext) {
        const nama_produk = request.input('search', '');

        if (!nama_produk) {
            return response.redirect().toRoute('stokProduk.index');
        }
        const searchRes = await StokProdukServices.search(nama_produk);
        return inertia.render("produk/stok", { searchRes });
    }
}