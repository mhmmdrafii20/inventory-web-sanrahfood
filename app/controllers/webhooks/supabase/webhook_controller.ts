import { HttpContext } from "@adonisjs/core/http";
import { NotifikasiWhatsappServices } from "#services/notifikasi/NotifikasiWhatsappServices";

export default class WebhookController {
    async getStokProdukFromSupabase({ request, response }: HttpContext) {
        try {
            const { data } = request.body() as { data: { id_produk: number, jumlah_stok: number } };

            if (!data) return response.ok("Data tidak ada");

            await NotifikasiWhatsappServices.cekStokProduk(data.id_produk, data.jumlah_stok);

            return response.ok("Data produk berhasil diterima");
        } catch (error) {
            return response.ok("Data produk gagal diterima", error);
        }
    }
    async getStokBahanBakuFromSupabase({ request, response }: HttpContext) {
        try {
            const { data } = request.body() as { data: { id_bahan_baku: number, jumlah_stok: number } };

            await NotifikasiWhatsappServices.cekStokBahanBaku(data.id_bahan_baku, data.jumlah_stok);

            return response.ok("Data bahan baku berhasil diterima");
        } catch (error) {
            return response.ok("Data bahan baku gagal diterima", error);
        }
    }
}