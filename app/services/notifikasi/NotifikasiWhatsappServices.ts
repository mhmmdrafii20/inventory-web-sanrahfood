import NotifikasiWhatsapp from '#models/notifikasi/notifikasi_whatsapp'
import axios from 'axios'
import TipeNotifikasi from '#models/notifikasi/tipe_notifikasi'
import TemplateNotifikasi from '#models/notifikasi/template_notifikasi'
import PenerimaNotifikasi from '#models/notifikasi/penerima_notifikasi'
import StokProduk from '#models/produk/stok_produk'
import Produk from '#models/produk/produk'
import StokBahanBaku from '#models/bahan/stok_bahan_baku'
import Bahan from '#models/bahan/bahan'

export class NotifikasiWhatsappServices {
  static async createSession(
    id_zawa: string,
    session_id: string,
    id_pengguna: string,
    status: string
  ) {
    const data = await NotifikasiWhatsapp.updateOrCreate(
      { id_pengguna: id_pengguna },
      {
        id_zawa: id_zawa,
        session_id: session_id,
        id_pengguna: id_pengguna,
        status,
      }
    )
    return data
  }
  static async getQr(id_pengguna: string) {
    const whatsappSession = await NotifikasiWhatsapp.query()
      .where('id_pengguna', id_pengguna)
      .first()

    if (!whatsappSession) {
      throw new Error('Session tidak ada.')
    }
    const res = await axios.get(`https://api-zawa.azickri.com/session`, {
      headers: {
        'id': String(whatsappSession?.id_zawa),
        'session-id': String(whatsappSession?.session_id),
      },
    })
    const isConnected = res.data.isConnected
    const newStatus = isConnected ? 'CONNECTED' : 'NOT_CONNECTED'

    if (whatsappSession?.status !== newStatus) {
      await NotifikasiWhatsapp.query().where('id_pengguna', id_pengguna).update({
        status: newStatus,
        session_id: whatsappSession.session_id,
        id_zawa: whatsappSession.id_zawa,
      })
    }
    return res.data
  }
  static async deleteSession(id_pengguna: string) {
    const whatsappSession = await NotifikasiWhatsapp.query()
      .where('id_pengguna', id_pengguna)
      .first()

    if (!whatsappSession) {
      throw new Error('Session tidak ada.')
    }

    const res = await axios.delete(`https://api-zawa.azickri.com/session`, {
      headers: {
        'id': String(whatsappSession?.id_zawa),
        'session-id': String(whatsappSession?.session_id),
      },
    })
    await NotifikasiWhatsapp.query().where('id_pengguna', id_pengguna).update({
      status: 'NOT_CONNECTED',
      session_id: null,
      id_zawa: null,
    })
    return res.data
  }
  static async processSendNotification(
    kode_notifikasi: string,
    template_variables: Record<string, string>
  ) {
    const tipeNotifikasi = await TipeNotifikasi.query()
      .where('kode_notifikasi', kode_notifikasi)
      .first()
    if (!tipeNotifikasi) throw new Error('Tipe notifikasi tidak ditemukan')

    const templateNotifikasi = await TemplateNotifikasi.query()
      .where('id_tipe_notifikasi', tipeNotifikasi.id_tipe_notifikasi)
      .first()
    if (!templateNotifikasi) throw new Error('Template notifikasi tidak ditemukan')

    let pesan = templateNotifikasi?.konten
    for (const [key, value] of Object.entries(template_variables)) {
      pesan = pesan.replaceAll(`{{${key}}}`, value)
    }

    const penerima = await PenerimaNotifikasi.query()
      .whereHas('penerima_jenis_notifikasi', (penerimaJenisNotifikasiQuery) => {
        penerimaJenisNotifikasiQuery.where('id_tipe_notifikasi', tipeNotifikasi.id_tipe_notifikasi)
      })
      .preload('pengguna')
    if (penerima.length === 0) throw new Error('Tidak ada penerima untuk notifikasi ini')
    for (const item of penerima) {
      try {
        await this.kirimWhatsapp(item.nomor_telepon, pesan)
        await new Promise((resolve) => setTimeout(resolve, 7000))

        await RiwayatNotifikasi.create({
          nama_penerima: item.nama_penerima ?? item.pengguna?.nama_pengguna,
          nomor_telepon: item.nomor_telepon ?? item.pengguna?.nomor_telepon,
          pesan,
          status: 'TERKIRIM',
          tipe_notifikasi: tipeNotifikasi.nama_notifikasi,
          tanggal_dikirim: new Date(),
          error_message: null,
          id_tipe_notifikasi: tipeNotifikasi.id_tipe_notifikasi,
        })
      } catch (error) {
        await RiwayatNotifikasi.create({
          nama_penerima: item.nama_penerima ?? item.pengguna?.nama_pengguna,
          nomor_telepon: item.nomor_telepon ?? item.pengguna?.nomor_telepon,
          pesan,
          status: 'GAGAL',
          tipe_notifikasi: tipeNotifikasi.nama_notifikasi,
          tanggal_dikirim: new Date(),
          error_message: error.message || error.response?.data?.message || error.response?.data,
          id_tipe_notifikasi: tipeNotifikasi.id_tipe_notifikasi,
        })
      }
    }
  }
  static async cekStokProduk(id_produk: number, jumlah_stok: number) {
    const stok = await StokProduk.query().where('id_produk', id_produk).first()
    if (!stok) throw new Error('Stok produk tidak ditemukan')

    if (jumlah_stok <= stok.stok_minimum) {
      const produk = await Produk.query()
        .where({ is_deleted: false })
        .where('id_produk', id_produk)
        .first()
      if (!produk) throw new Error('Produk tidak ditemukan')

      await this.processSendNotification('STOK_MINIMUM_PRODUK', {
        nama_produk: produk.nama_produk,
        jumlah_stok: String(jumlah_stok),
        stok_minimum: String(stok.stok_minimum),
        satuan: produk.satuan,
      })
    }
  }
  static async cekStokBahanBaku(id_bahan_baku: number, jumlah_stok: number) {
    const stok = await StokBahanBaku.query().where('id_bahan_baku', id_bahan_baku).first()
    if (!stok) throw new Error('Stok bahan baku tidak ditemukan')

    if (jumlah_stok <= stok.stok_minimum) {
      const bahan = await Bahan.query()
        .where({ is_deleted: false })
        .where('id_bahan_baku', id_bahan_baku)
        .first()
      if (!bahan) throw new Error('Bahan baku tidak ditemukan')

      await this.processSendNotification('STOK_MINIMUM_BAHAN_BAKU', {
        nama_bahan_baku: bahan.nama_bahan_baku,
        jumlah_stok: String(jumlah_stok),
        stok_minimum: String(stok.stok_minimum),
        satuan: bahan.satuan,
      })
    }
  }
  static async cekHasilProduksi(
    id_produk: number,
    jumlah_batch: number,
    jumlah_hasil_produksi: number
  ) {
    const produk = await Produk.query()
      .where('id_produk', id_produk)
      .where({ is_deleted: false })
      .first()
    if (!produk) throw new Error('Produk tidak ditemukan')

    await this.processSendNotification('PRODUKSI_SELESAI', {
      nama_produk: produk.nama_produk,
      jumlah_batch: String(jumlah_batch),
      jumlah_hasil_produksi: String(jumlah_hasil_produksi),
      satuan: produk.satuan,
    })
  }
  static async restokBahanBaku(id_stok_bahan_baku: number, stok_sesudah: number) {
    const stok = await StokBahanBaku.query()
      .where('id_stok_bahan_baku', id_stok_bahan_baku)
      .preload('bahan')
      .first()
    if (!stok) throw new Error('Stok bahan baku tidak ditemukan')

    await this.processSendNotification('RESTOK_BAHAN_BAKU', {
      nama_bahan: stok.bahan.nama_bahan_baku,
      stok_bahan: String(stok_sesudah),
      satuan_bahan: stok.bahan.satuan,
    })
  }
  static async kirimWhatsapp(nomor_telepon: string, pesan: string) {
    const session = await NotifikasiWhatsapp.query().where('status', 'CONNECTED').first()

    const check = await axios.get(`https://api-zawa.azickri.com/session`, {
      headers: {
        'id': String(session.id_zawa),
        'session-id': String(session.session_id),
      },
    })

    if (!check.data.isConnected) {
      await NotifikasiWhatsapp.query().where('id', session.id_zawa).update({
        status: 'NOT_CONNECTED',
      })
      throw new Error('Gagal kirim pesan, WhatsApp belum terhubung (device tidak aktif)')
    }

    try {
      const res = await axios.post(
        `https://api-zawa.azickri.com/message`,
        {
          phone: nomor_telepon.replace('+', ''),
          type: 'text',
          text: pesan,
        },
        {
          headers: {
            'id': String(session.id_zawa),
            'session-id': String(session.session_id),
          },
        }
      )
    } catch (error) {
      console.error('❌ FULL ERROR:', error)
      console.error('❌ RESPONSE DATA:', error.response?.data)
      console.error('❌ RESPONSE STATUS:', error.response?.status)
      throw new Error('WA ERROR:', error.response?.data || error.message)
    }
  }
}
