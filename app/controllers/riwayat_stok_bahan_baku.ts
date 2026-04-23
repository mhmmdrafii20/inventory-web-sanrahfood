import type { HttpContext } from "@adonisjs/core/http";
import RiwayatStokBahanBaku from "#models/riwayat_stok_bahan_baku";
import { RiwayatStokBahanBakuServices } from "#services/RiwayatStokBahanBakuServices";

export default class RiwayatStokBahanBakuController {
    async index({ inertia }: HttpContext) {
        const riwayatStokBahanBaku = await RiwayatStokBahanBaku.query().preload('stokBahanBaku', (stokBahanBakuQuery) => {
            stokBahanBakuQuery.preload('bahan', (bahanQuery) => {
                bahanQuery.where({ is_deleted: false })
            });
        });
        return inertia.render("riwayatStokBahan", { riwayatStokBahanBaku })
    }
    async filter({ inertia, request }: HttpContext) {
        const { tanggal_awal, tanggal_akhir } = request.only(['tanggal_awal', 'tanggal_akhir']);
        const filteredRiwayatStokBahanBaku = await RiwayatStokBahanBakuServices.filter(tanggal_awal, tanggal_akhir)
        return inertia.render("riwayatStokBahan", { filteredRiwayatStokBahanBaku })
    }
}