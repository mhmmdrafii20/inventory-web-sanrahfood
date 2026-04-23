import type { HttpContext } from "@adonisjs/core/http";
import RiwayatProduksi from "#models/riwayat_produksi";
import { RiwayatProduksiServices } from "#services/RiwayatProduksiServices";

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
        const filteredRiwayatProduksi = await RiwayatProduksiServices.filter(tanggal_awal, tanggal_akhir)
        return inertia.render("riwayatProduksi", { filteredRiwayatProduksi })
    }
}