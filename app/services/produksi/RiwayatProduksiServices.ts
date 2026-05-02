import RiwayatProduksi from '#models/produksi/riwayat_produksi'
export class RiwayatProduksiServices {
  static async filter(tanggal_awal: string, tanggal_akhir: string) {
    const data = await RiwayatProduksi.query()
      .whereBetween('tanggal_produksi', [tanggal_awal, tanggal_akhir])
      .orderBy('tanggal_produksi', 'desc')
      .preload('produk')
      .preload('resep')
    return data
  }
}
