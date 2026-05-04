import { HttpContext } from '@adonisjs/core/http'
import { NotifikasiWhatsappServices } from '#services/notifikasi/NotifikasiWhatsappServices'

export default class WebhookController {
  async getStokProdukFromSupabase({ request, response }: HttpContext) {
    try {
      const { record, old_record } = request.body() as {
        record: { id_produk: number; jumlah_stok: number }
        old_record: { jumlah_stok: number }
      }
      const stokBerkurang = record.jumlah_stok < old_record.jumlah_stok

      if (stokBerkurang) {
        await NotifikasiWhatsappServices.cekStokProduk(record.id_produk, record.jumlah_stok)
      }

      return response.ok('Data produk berhasil diterima')
    } catch (error) {
      return response.ok('Data produk gagal diterima', error)
    }
  }
  async getStokBahanBakuFromSupabase({ request, response }: HttpContext) {
    const { record, old_record } = request.body() as {
      record: { id_stok_bahan_baku: number; jumlah_stok: number }
      old_record: { jumlah_stok: number }
    }

    const stokBertambah = record.jumlah_stok > old_record.jumlah_stok
    const stokBerkurang = record.jumlah_stok < old_record.jumlah_stok

    if (stokBertambah) {
      await NotifikasiWhatsappServices.restokBahanBaku(
        record.id_stok_bahan_baku,
        record.jumlah_stok
      )
    }

    if (stokBerkurang) {
      await NotifikasiWhatsappServices.cekStokBahanBaku(
        record.id_stok_bahan_baku,
        record.jumlah_stok
      )
    }
    return response.ok('OK')
  }
  async getProduksiFromSupabase({ request, response }: HttpContext) {
    try {
      const { record } = request.body() as {
        record: { id_produk: number; jumlah_batch: number; jumlah_hasil_produksi: number }
      }

      await NotifikasiWhatsappServices.cekHasilProduksi(
        record.id_produk,
        record.jumlah_batch,
        record.jumlah_hasil_produksi
      )
      return response.ok('Data produksi berhasil dikirim')
    } catch (error) {
      console.log(error)

      return response.ok('Data produksi gagal dikirim')
    }
  }
}
