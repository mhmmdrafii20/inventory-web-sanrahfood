import { HttpContext } from '@adonisjs/core/http'
import TemplateService from '#services/pdf/TemplateServices'
import { PdfServices } from '#services/pdf/PdfServices'
import { LaporanStokBahanBakuServices } from '#services/laporan/laporanStokBahanBakuServices'

export default class LaporanStokBahanBakuController {
  async laporan({ inertia }: HttpContext) {
    const laporanData = await LaporanStokBahanBakuServices.getLaporanData()
    return inertia.render('bahan/laporan', { laporanData })
  }
  async generate({ request, response, session }: HttpContext) {
    const { tanggal_awal, tanggal_akhir } = request.qs()

    if (!tanggal_awal || !tanggal_akhir) {
      session.flash('error', 'Tolong pilih tanggal awal dan tanggal akhir')
      return response.redirect().back()
    }
    const filteredLaporanStokBahanBaku = await LaporanStokBahanBakuServices.getLaporanData(
      tanggal_awal,
      tanggal_akhir
    )

    if (filteredLaporanStokBahanBaku.length <= 0) {
      session.flash('error', 'Data tidak ditemukan')
      return response.redirect().back()
    }

    const html = await TemplateService.render('template_laporan', {
      data: filteredLaporanStokBahanBaku.map((item) => ({
        nama: item.nama_bahan_baku,
        keluar: item.total_penggunaan_produksi,
        masuk: item.total_restok,
        adjustment_masuk: item.adjustment_masuk,
        adjustment_keluar: item.adjustment_keluar,
        satuan: item.satuan,
        type: 'bahan_baku',
      })),
      title: 'Laporan Bahan Baku',
      date: `${tanggal_awal} s/d ${tanggal_akhir}`,
      namaColumn: 'Nama Bahan Baku',
      transaksiKeluarColumn: 'Total Penggunaan Produksi',
      transaksiMasukColumn: 'Total Restok',
    })

    const pdf = await PdfServices.generatePdf(html)

    response.header('Content-Type', 'application/pdf')
    response.header('Content-Disposition', 'attachment; filename="Laporan_Stok_Bahan_Baku.pdf"')
    return response.send(pdf)
  }
}
