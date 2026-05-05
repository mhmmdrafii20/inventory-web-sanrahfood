import RiwayatStokProduk from '#models/produk/riwayat_stok_produk'

export class RiwayatStokProdukServices {
  static async filter(tanggal_awal: string, tanggal_akhir: string) {
    const data = await RiwayatStokProduk.query()
      .whereBetween('tanggal_perubahan_stok', [tanggal_awal, tanggal_akhir])
      .orderBy('tanggal_perubahan_stok', 'desc')
      .preload('stokProduk', (produk) => {
        produk.preload('produk')
      })
    return data
  }
}
