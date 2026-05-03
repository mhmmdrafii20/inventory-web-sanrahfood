import type { HttpContext } from '@adonisjs/core/http'
import RiwayatStokBahanBaku from '#models/bahan/riwayat_stok_bahan_baku'
import { RiwayatStokBahanBakuServices } from '#services/bahan/RiwayatStokBahanBakuServices'
import TemplateService from '#services/pdf/TemplateServices'
import { PdfServices } from '#services/pdf/PdfServices'

export default class RiwayatStokBahanBakuController {
  async index({ inertia }: HttpContext) {
    const riwayatStokBahanBaku = await RiwayatStokBahanBaku.query()
      .preload('stokBahanBaku', (stokBahanBakuQuery) => {
        stokBahanBakuQuery.preload('bahan')
      })
    return inertia.render('bahan/riwayat', { riwayatStokBahanBaku })
  }
  async filter({ inertia, request, session, response }: HttpContext) {
    const { tanggal_awal, tanggal_akhir } = request.only(['tanggal_awal', 'tanggal_akhir'])

    if (!tanggal_awal || !tanggal_akhir) {
      session.flash('error', 'Tolong pilih tanggal awal dan tanggal akhir')
      return response.redirect().back()
    }
    const filteredRiwayatStokBahanBaku = await RiwayatStokBahanBakuServices.filter(
      tanggal_awal,
      tanggal_akhir
    )
    return inertia.render('bahan/riwayat', { filteredRiwayatStokBahanBaku })
  }
  async generate({ request, response, session }: HttpContext) {
    const { tanggal_awal, tanggal_akhir } = request.qs()

    if (!tanggal_awal || !tanggal_akhir) {
      session.flash('error', 'Tolong pilih tanggal awal dan tanggal akhir')
      return response.redirect().back()
    }

    const filteredRiwayatStokBahanBaku = await RiwayatStokBahanBakuServices.filter(
      tanggal_awal,
      tanggal_akhir
    )

    if (filteredRiwayatStokBahanBaku.length <= 0) {
      session.flash('error', 'Data tidak ditemukan')
      return response.redirect().back()
    }

    const html = await TemplateService.render('template_riwayat_bahan', {
      data: filteredRiwayatStokBahanBaku,
      title: 'Laporan Riwayat Stok Bahan Baku',
      date: `${tanggal_awal} s/d ${tanggal_akhir}`,
    })

    const pdf = await PdfServices.generatePdf(html)

    response.header('Content-Type', 'application/pdf')
    response.header(
      'Content-Disposition',
      'attachment; filename="Laporan_Riwayat_Stok_Bahan_Baku.pdf"'
    )
    return response.send(pdf)
  }
}
