import type { HttpContext } from '@adonisjs/core/http'
import RiwayatNotifikasi from '#models/notifikasi/riwayat_notifikasi'
import { RiwayatNotifikasiServices } from '#services/notifikasi/RiwayatNotifikasiServices'
export default class RiwayatNotifikasiController {
  async index({ inertia }: HttpContext) {
    const riwayatNotifikasi = await RiwayatNotifikasi.query()
      .preload('tipeNotifikasi')
    return inertia.render('notifikasi/riwayat', { riwayatNotifikasi })
  }
  async filter({ inertia, request, session, response }: HttpContext) {
    const { tanggal_awal, tanggal_akhir } = request.only(['tanggal_awal', 'tanggal_akhir'])

    if (!tanggal_awal || !tanggal_akhir) {
      session.flash('error', 'Tolong pilih tanggal awal dan tanggal akhir')
      return response.redirect().back()
    }

    const filteredRiwayatNotifikasi = await RiwayatNotifikasiServices.filter(
      tanggal_awal,
      tanggal_akhir
    )
    return inertia.render('produk/riwayat', { filteredRiwayatNotifikasi })
  }
}
