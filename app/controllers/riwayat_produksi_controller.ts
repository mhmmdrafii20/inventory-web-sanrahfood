import type { HttpContext } from "@adonisjs/core/http";
import RiwayatProduksi from "#models/riwayat_produksi";
import { RiwayatProduksiServices } from "#services/RiwayatProduksiServices";
import TemplateServices from "#services/TemplateServices";
import { PdfServices } from "#services/pdfServices";

export default class RiwayatProduksiController {
    async index({ inertia }: HttpContext) {
        const riwayatProduksi = await RiwayatProduksi.query().preload('produk', (produkQuery) => {
            produkQuery.where({ is_deleted: false })
        }).preload('resep', (resepQuery) => {
            resepQuery.where({ is_deleted: false })
        });
        return inertia.render("riwayatProduksi", { riwayatProduksi })
    }
    async filter({ request, inertia, session, response }: HttpContext) {
        const { tanggal_awal, tanggal_akhir } = request.only(['tanggal_awal', 'tanggal_akhir']);

        if (!tanggal_awal || !tanggal_akhir) {
            session.flash('error', "Tolong pilih tanggal awal dan tanggal akhir");
            return response.redirect().back();
        }
        const filteredRiwayatProduksi = await RiwayatProduksiServices.filter(tanggal_awal, tanggal_akhir);
        return inertia.render("riwayatProduksi", { filteredRiwayatProduksi })
    }
    async generate({ request, response, session }: HttpContext) {
        const { tanggal_awal, tanggal_akhir } = request.qs();

        if (!tanggal_awal || !tanggal_akhir) {
            session.flash('error', "Tolong pilih tanggal awal dan tanggal akhir");
            return response.redirect().back();
        }

        const filteredRiwayatProduksi = await RiwayatProduksiServices.filter(tanggal_awal, tanggal_akhir)

        if (filteredRiwayatProduksi.length <= 0) {
            session.flash('error', "Data tidak ditemukan");
            return response.redirect().back();
        }

        const html = await TemplateServices.render('template_riwayat_produksi', {
            data: filteredRiwayatProduksi,
            title: "Laporan Riwayat Produksi",
            date: `${tanggal_awal} s/d ${tanggal_akhir}`
        })

        const pdf = await PdfServices.generatePdf(html);

        response.header('Content-Type', 'application/pdf');
        response.header('Content-Disposition', 'attachment; filename="Laporan_Riwayat_Produksi.pdf"');
        return response.send(pdf);
    }
}