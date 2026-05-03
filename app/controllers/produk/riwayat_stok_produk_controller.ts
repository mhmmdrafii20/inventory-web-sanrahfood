import type { HttpContext } from '@adonisjs/core/http'
import RiwayatStokProduk from '#models/produk/riwayat_stok_produk'
import { RiwayatStokProdukServices } from '#services/produk/RiwayatStokProdukServices'
import TemplateService from '#services/pdf/TemplateServices'
import { PdfServices } from '#services/pdf/PdfServices'

export default class RiwayatStokProdukController {
  async index({ inertia }: HttpContext) {
    const riwayatStokProduk = await RiwayatStokProduk.query()
      .preload('stokProduk', (stokProdukQuery) => {
        stokProdukQuery.preload('produk')
      })
    return inertia.render('produk/riwayat', { riwayatStokProduk })
  }
  async filter({ inertia, request, session, response }: HttpContext) {
    const { tanggal_awal, tanggal_akhir } = request.only(['tanggal_awal', 'tanggal_akhir'])

    if (!tanggal_awal || !tanggal_akhir) {
      session.flash('error', 'Tolong pilih tanggal awal dan tanggal akhir')
      return response.redirect().back()
    }

    const filteredRiwayatStokProduk = await RiwayatStokProdukServices.filter(
      tanggal_awal,
      tanggal_akhir
    )
    return inertia.render('produk/riwayat', { filteredRiwayatStokProduk })
  }
  async generate({ request, response, session }: HttpContext) {
    const { tanggal_awal, tanggal_akhir } = request.qs()

    if (!tanggal_awal || !tanggal_akhir) {
      session.flash('error', 'Tolong pilih tanggal awal dan tanggal akhir')
      return response.redirect().back()
    }
    const filteredRiwayatStokProduk = await RiwayatStokProdukServices.filter(
      tanggal_awal,
      tanggal_akhir
    )

    if (filteredRiwayatStokProduk.length <= 0) {
      session.flash('error', 'Data tidak ditemukan')
      return response.redirect().back()
    }

    const html = await TemplateService.render('template_riwayat_produk', {
      data: filteredRiwayatStokProduk,
      title: 'Laporan Riwayat Stok Produk',
      date: `${tanggal_awal} s/d ${tanggal_akhir}`,
    })

    const pdf = await PdfServices.generatePdf(html)

    response.header('Content-Type', 'application/pdf')
    response.header('Content-Disposition', 'attachment; filename="Laporan_Riwayat_Stok_Produk.pdf"')
    return response.send(pdf)
  }
}
