import { HttpContext } from '@adonisjs/core/http'
import { NotifikasiWhatsappServices } from '#services/notifikasi/NotifikasiWhatsappServices'

export default class WebhookController {
  async getStokProdukFromSupabase({ request, response }: HttpContext) {
    try {
      const { data } = request.body() as { data: { id_produk: number; jumlah_stok: number } }

      if (!data) return response.ok('Data tidak ada')

      await NotifikasiWhatsappServices.cekStokProduk(data.id_produk, data.jumlah_stok)

      return response.ok('Data produk berhasil diterima')
    } catch (error) {
      return response.ok('Data produk gagal diterima', error)
    }
  }
  async getStokBahanBakuFromSupabase({ request, response }: HttpContext) {
    try {
      const { data } = request.body() as {
        data: { id_stok_bahan_baku: number; stok_sesudah: number }
      }

      await NotifikasiWhatsappServices.cekStokBahanBaku(data.id_stok_bahan_baku, data.stok_sesudah)

      return response.ok('Data bahan baku berhasil diterima')
    } catch (error) {
      console.log(error)
      return response.ok('Data bahan baku gagal diterima', error)
    }
  }
  async getProduksiFromSupabase({ request, response }: HttpContext) {
    try {
      const { data } = request.body() as {
        data: { id_produk: number; jumlah_batch: number; jumlah_hasil_produksi: number }
      }

      await NotifikasiWhatsappServices.cekHasilProduksi(
        data.id_produk,
        data.jumlah_batch,
        data.jumlah_hasil_produksi
      )
      return response.ok('Data produksi berhasil dikirim')
    } catch (error) {
      console.log(error)

      return response.ok('Data produksi gagal dikirim')
    }
  }
  async getRestokBahanBakuFromSupabase({ request, response }: HttpContext) {
    try {
      const { record } = request.body() as {
        record: { id_stok_bahan_baku: number; stok_sesudah: number }
      }

      await NotifikasiWhatsappServices.restokBahanBaku(
        record.id_stok_bahan_baku,
        record.stok_sesudah
      )
      return response.ok('Data restok berhasil dikirim')
    } catch (error) {
      return response.ok('Data produksi gagal dikirim')
    }
  }
}
