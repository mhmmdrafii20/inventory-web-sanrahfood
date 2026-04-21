import type { HttpContext } from "@adonisjs/core/http";
import StokProduk from "#models/stok_produk";

export default class StokProdukController {
    async index({ inertia }: HttpContext) {
        const stokProduk = await StokProduk.query().preload('produk', (produkQuery) => {
            produkQuery.where({ is_deleted: false })
        });
        return inertia.render("stokProduk", { stokProduk })
    }
}