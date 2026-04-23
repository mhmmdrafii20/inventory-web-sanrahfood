import type { HttpContext } from "@adonisjs/core/http";
import RiwayatStokProduk from "#models/riwayat_stok_produk";
import { RiwayatStokProdukServices } from "#services/RiwayatStokProdukServices";
export default class RiwayatStokProdukController {
    async index({ inertia }: HttpContext) {
        const riwayatStokProduk = await RiwayatStokProduk.query().preload('stokProduk', (stokProdukQuery) => {
            stokProdukQuery.preload('produk', (produkQuery) => {
                produkQuery.where({ is_deleted: false })
            });
        });
        return inertia.render("riwayatStokProduk", { riwayatStokProduk })
    }
    async filter({ inertia, request }: HttpContext) {
        const { tanggal_awal, tanggal_akhir } = request.only(['tanggal_awal', 'tanggal_akhir']);
        const filteredRiwayatStokProduk = await RiwayatStokProdukServices.filter(tanggal_awal, tanggal_akhir)
        return inertia.render("riwayatStokProduk", { filteredRiwayatStokProduk })
    }
}