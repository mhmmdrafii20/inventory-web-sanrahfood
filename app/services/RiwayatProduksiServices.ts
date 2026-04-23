import RiwayatProduksi from "#models/riwayat_produksi";
export class RiwayatProduksiServices {
    static async filter(tanggal_awal: string, tanggal_akhir: string) {
        const data = await RiwayatProduksi.query()
            .whereBetween('tanggal_produksi', [tanggal_awal, tanggal_akhir])
            .preload('produk', (produkQuery) => {
                produkQuery.where({ is_deleted: false })
            }).preload('resep', (resepQuery) => {
                resepQuery.where({ is_deleted: false })
            })
        return data;
    }
}