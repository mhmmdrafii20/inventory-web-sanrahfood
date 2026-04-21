import type { HttpContext } from "@adonisjs/core/http";
import RiwayatProduksi from "#models/riwayat_produksi";

export default class RiwayatProduksiController {
    async index({ inertia }: HttpContext) {
        const riwayatProduksi = await RiwayatProduksi.query().preload('produk', (produkQuery) => {
            produkQuery.where({ is_deleted: false })
        }).preload('resep', (resepQuery) => {
            resepQuery.where({ is_deleted: false })
        });
        return inertia.render("riwayatProduksi", { riwayatProduksi })
    }
    async filter({ request, inertia }: HttpContext) {
        const { tanggal_awal, tanggal_akhir } = request.only(['tanggal_awal', 'tanggal_akhir']);
        const filteredRiwayatProduksi = await RiwayatProduksi.query().whereBetween('tanggal_produksi', [tanggal_awal, tanggal_akhir]).preload('produk', (produkQuery) => {
            produkQuery.where({ is_deleted: false })
        }).preload('resep', (resepQuery) => {
            resepQuery.where({ is_deleted: false })
        });
        return inertia.render("riwayatProduksi", { filteredRiwayatProduksi })
    }
}