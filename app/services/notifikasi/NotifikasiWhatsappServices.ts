import NotifikasiWhatsapp from "#models/notifikasi/notifikasi_whatsapp";
import axios from "axios";
import TipeNotifikasi from "#models/notifikasi/tipe_notifikasi";
import TemplateNotifikasi from "#models/notifikasi/template_notifikasi";
import PenerimaNotifikasi from "#models/notifikasi/penerima_notifikasi";
import StokProduk from "#models/produk/stok_produk";
import Produk from "#models/produk/produk";
import StokBahanBaku from "#models/bahan/stok_bahan_baku";
import Bahan from "#models/bahan/bahan";

export class NotifikasiWhatsappServices {
    static async createSession(id_zawa: string, session_id: string, id_pengguna: string, status: string) {
        const data = await NotifikasiWhatsapp.updateOrCreate({ id_pengguna: id_pengguna }, {
            id_zawa: id_zawa,
            session_id: session_id,
            id_pengguna: id_pengguna,
            status
        });
        return data;
    }
    static async getQr(id_pengguna: string) {
        const whatsappSession = await NotifikasiWhatsapp.query().where('id_pengguna', id_pengguna).first();

        if (!whatsappSession) {
            throw new Error("Session tidak ada.");
        }
        const res = await axios.get(`https://api-zawa.azickri.com/session`, {
            headers: {
                id: String(whatsappSession?.id_zawa),
                'session-id': String(whatsappSession?.session_id),
            }
        });
        const isConnected = res.data.isConnected;
        const newStatus = isConnected ? "CONNECTED" : "NOT_CONNECTED";

        if (whatsappSession?.status !== newStatus) {
            await NotifikasiWhatsapp.query().where('id_pengguna', id_pengguna).update({
                status: newStatus,
                session_id: whatsappSession.session_id,
                id_zawa: whatsappSession.id_zawa,
            })
        }
        return res.data;
    }
    static async deleteSession(id_pengguna: string) {
        const whatsappSession = await NotifikasiWhatsapp.query().where('id_pengguna', id_pengguna).first();

        if (!whatsappSession) {
            throw new Error("Session tidak ada.");
        }
        console.log({
            id: whatsappSession?.id_zawa,
            session_id: whatsappSession?.session_id
        })
        const res = await axios.delete(`https://api-zawa.azickri.com/session`, {
            headers: {
                id: String(whatsappSession?.id_zawa),
                'session-id': String(whatsappSession?.session_id),
            }
        })
        await NotifikasiWhatsapp.query().where('id_pengguna', id_pengguna).update({
            status: "NOT_CONNECTED",
            session_id: null,
            id_zawa: null,
        })
        return res.data;
    }
    static async processSendNotification(kode_notifikasi: string, template_variables: Record<string, string>) {
        const tipeNotifikasi = await TipeNotifikasi.query().where('kode_notifikasi', kode_notifikasi).first();
        if (!tipeNotifikasi) return;

        const templateNotifikasi = await TemplateNotifikasi.query().where('id_tipe_notifikasi', tipeNotifikasi.id_tipe_notifikasi).first();
        if (!templateNotifikasi) return;

        let pesan = templateNotifikasi?.konten;
        for (const [key, value] of Object.entries(template_variables)) {
            pesan = pesan.replaceAll(`{{${key}}}`, value);
        }

        const penerima = await PenerimaNotifikasi.query().whereHas('penerima_jenis_notifikasi', (penerimaJenisNotifikasiQuery) => {
            penerimaJenisNotifikasiQuery.where('id_tipe_notifikasi', tipeNotifikasi.id_tipe_notifikasi);
        })
        if (penerima.length === 0) return;

        for (const item of penerima) {
            //kirim ke penerima.
        }
    }
    static async cekStokProduk(id_produk: number, jumlah_stok: number) {
        const stok = await StokProduk.query().where('id_produk', id_produk).first();
        if (!stok) return

        if (jumlah_stok <= stok.stok_minimum) {
            const produk = await Produk.query().where({ is_deleted: false }).where('id_produk', id_produk).first();
            if (!produk) return

            await this.processSendNotification('STOK_MINIMUM_PRODUK', {
                nama_produk: produk.nama_produk,
                jumlah_stok: String(jumlah_stok),
                stok_minimum: String(stok.stok_minimum),
                satuan: produk.satuan,
            })
        }
    }
    static async cekStokBahanBaku(id_bahan_baku: number, jumlah_stok: number) {
        const stok = await StokBahanBaku.query().where('id_bahan_baku', id_bahan_baku).first();
        if (!stok) return

        if (jumlah_stok <= stok.stok_minimum) {
            const bahan = await Bahan.query().where({ is_deleted: false }).where('id_bahan_baku', id_bahan_baku).first();
            if (!bahan) return

            await this.processSendNotification('STOK_MINIMUM_BAHAN_BAKU', {
                nama_bahan_baku: bahan.nama_bahan_baku,
                jumlah_stok: String(jumlah_stok),
                stok_minimum: String(stok.stok_minimum),
                satuan: bahan.satuan,
            })
        }
    }
}