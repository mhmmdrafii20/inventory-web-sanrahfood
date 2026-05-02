import StokProduk from '#models/produk/stok_produk'

export class StokProdukServices {
  static async search(nama_produk: string) {
    return await StokProduk.query()
      .whereHas('produk', (b) => {
        b.where('nama_produk', 'ILIKE', `%${nama_produk}%`).where({ is_deleted: false })
      })
      .preload('produk')
  }
}
