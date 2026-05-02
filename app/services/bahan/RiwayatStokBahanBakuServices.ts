import RiwayatStokBahanBaku from '#models/bahan/riwayat_stok_bahan_baku'

export class RiwayatStokBahanBakuServices {
  static async filter(tanggal_awal: string, tanggal_akhir: string) {
    const data = await RiwayatStokBahanBaku.query()
      .whereBetween('tanggal_perubahan_stok', [tanggal_awal, tanggal_akhir])
      .orderBy('tanggal_perubahan_stok', 'desc')
      .preload('stokBahanBaku', (stokBahanBakuQuery) => {
        stokBahanBakuQuery.preload('bahan')
      })
    return data
  }
}
