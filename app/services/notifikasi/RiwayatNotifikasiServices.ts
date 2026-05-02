import RiwayatNotifikasi from '#models/notifikasi/riwayat_notifikasi'

export class RiwayatNotifikasiServices {
  static async filter(tanggal_awal: string, tanggal_akhir: string) {
    const data = await RiwayatNotifikasi.query()
      .whereBetween('tanggal_dikirim', [tanggal_awal, tanggal_akhir])
      .orderBy('tanggal_dikirim', 'desc')
      .preload('tipeNotifikasi')
    return data
  }
}
