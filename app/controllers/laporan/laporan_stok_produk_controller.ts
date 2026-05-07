import { LaporanStokProdukServices } from '#services/laporan/laporanStokProdukServices'
import { HttpContext } from '@adonisjs/core/http'
import TemplateService from '#services/pdf/TemplateServices'
import { PdfServices } from '#services/pdf/PdfServices'

export default class LaporanStokProdukController {
  async laporan({ inertia }: HttpContext) {
    const laporanData = await LaporanStokProdukServices.getLaporanData()
    return inertia.render('produk/laporan', { laporanData })
  }
  async generate({ request, response, session }: HttpContext) {
    const { tanggal_awal, tanggal_akhir } = request.qs()

    if (!tanggal_awal || !tanggal_akhir) {
      session.flash('error', 'Tolong pilih tanggal awal dan tanggal akhir')
      return response.redirect().back()
    }
    const filteredLaporanStokProduk = await LaporanStokProdukServices.getLaporanData(
      tanggal_awal,
      tanggal_akhir
    )

    if (filteredLaporanStokProduk.length <= 0) {
      session.flash('error', 'Data tidak ditemukan')
      return response.redirect().back()
    }
    console.log(filteredLaporanStokProduk)
    const html = await TemplateService.render('template_laporan', {
      data: filteredLaporanStokProduk.map((item) => ({
        nama: item.nama_produk,
        keluar: item.total_penjualan,
        masuk: item.total_produksi,
        adjustment_masuk: item.adjustment_masuk,
        adjustment_keluar: item.adjustment_keluar,
        satuan: item.satuan,
        type: 'produk',
      })),
      title: 'Laporan Stok Produk',
      date: `${tanggal_awal} s/d ${tanggal_akhir}`,
      namaColumn: 'Nama Produk',
      transaksiKeluarColumn: 'Total Penjualan',
      transaksiMasukColumn: 'Total Produksi',
    })

    const pdf = await PdfServices.generatePdf(html)

    response.header('Content-Type', 'application/pdf')
    response.header('Content-Disposition', 'attachment; filename="Laporan_Stok_Produk.pdf"')
    return response.send(pdf)
  }
}
