import StokAdjustmentProduk from '#models/produk/stok_adjustment_produk'
import StokProduk from '#models/produk/stok_produk'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import RiwayatStokProduk from '#models/produk/riwayat_stok_produk'

export class StokProdukServices {
  static async search(nama_produk: string) {
    return await StokProduk.query()
      .whereHas('produk', (b) => {
        b.where('nama_produk', 'ILIKE', `%${nama_produk}%`).where({ is_deleted: false })
      })
      .preload('produk')
  }
  static async createStokKeluar(
    payload: {
      produk: {
        id_produk: number
        jumlah: number
      }[]
      tanggal_pengeluaran: DateTime
      catatan_tambahan?: string
    },
    nama_pengguna: string
  ) {
    await db.transaction(async (transaction) => {
      for (const item of payload.produk) {
        const oldStok = await StokProduk.query({ client: transaction })
          .where('id_produk', item.id_produk)
          .preload('produk')
          .firstOrFail()

        if (Number(item.jumlah) > Number(oldStok.jumlah_stok)) {
          throw new Error(
            `Jumlah yang diminta untuk produk ${oldStok.produk.nama_produk} lebih besar dari stok yang tersedia.`
          )
        }

        const updatedStok = Number(oldStok.jumlah_stok) - Number(item.jumlah)

        if (updatedStok < 0) {
          throw new Error(
            `Stok tidak mencukupi untuk melakukan transaksi produk ${oldStok.produk.nama_produk}.`
          )
        }

        await StokProduk.query({ client: transaction }).where('id_produk', item.id_produk).update({
          jumlah_stok: updatedStok,
        })

        await RiwayatStokProduk.create(
          {
            id_stok_produk: Number(oldStok?.id_stok_produk),
            nama_produk: oldStok.produk.nama_produk,
            selisih_stok: -Number(item.jumlah),
            tipe_transaksi: 'PENJUALAN',
            stok_sebelum: Number(oldStok.jumlah_stok),
            stok_sesudah: Number(updatedStok),
            jenis_stok: 'KELUAR',
            nama_pengguna: nama_pengguna,
            tanggal_perubahan_stok: payload.tanggal_pengeluaran,
          },
          { client: transaction }
        )
      }
    })
  }
  static async createAdjustment(
    payload: {
      id_produk: number
      jenis_stok: string
      jumlah: number
      tanggal_adjustment: DateTime
      catatan_tambahan: string
    },
    id_pengguna: string
  ) {
    const data = await StokAdjustmentProduk.create({
      id_produk: payload.id_produk,
      id_pengguna: id_pengguna,
      jenis_stok: payload.jenis_stok,
      jumlah: payload.jumlah,
      tanggal_adjustment: payload.tanggal_adjustment,
      catatan_tambahan: payload.catatan_tambahan,
      status_adjustment: 'PENDING',
    })
    return data
  }
  static async approve(params: number, nama_pengguna: string) {
    await db.transaction(async (transaction) => {
      await StokAdjustmentProduk.query({ client: transaction })
        .where('id_stok_produk_adjustment', params)
        .update({
          status_adjustment: 'APPROVED',
          approved_at: DateTime.now(),
          approved_by: nama_pengguna,
        })
      const adjustmentStok = await StokAdjustmentProduk.query({ client: transaction })
        .where('id_stok_produk_adjustment', params)
        .firstOrFail()

      const oldStok = await StokProduk.query({ client: transaction })
        .where('id_produk', adjustmentStok.id_produk)
        .preload('produk')
        .firstOrFail()

      let updatedStok: number
      if (adjustmentStok.jenis_stok === 'MASUK') {
        updatedStok = Number(oldStok?.jumlah_stok) + Number(adjustmentStok?.jumlah)
      } else if (adjustmentStok.jenis_stok === 'KELUAR') {
        updatedStok = Number(oldStok?.jumlah_stok) - Number(adjustmentStok?.jumlah)
        if (updatedStok < 0) {
          throw new Error('Stok tidak mencukupi')
        }
      } else {
        throw new Error('Jenis stok tidak valid')
      }

      await StokProduk.query({ client: transaction })
        .where('id_produk', adjustmentStok.id_produk)
        .update({
          jumlah_stok: updatedStok,
        })

      await RiwayatStokProduk.create(
        {
          id_stok_produk: Number(oldStok?.id_stok_produk),
          nama_produk: oldStok.produk.nama_produk,
          selisih_stok:
            adjustmentStok.jenis_stok === 'MASUK'
              ? Number(adjustmentStok.jumlah)
              : -Number(adjustmentStok.jumlah),
          tipe_transaksi: 'ADJUSTMENT',
          stok_sebelum: Number(oldStok.jumlah_stok),
          stok_sesudah: Number(updatedStok),
          jenis_stok: adjustmentStok.jenis_stok,
          nama_pengguna: nama_pengguna,
          tanggal_perubahan_stok: DateTime.now(),
        },
        { client: transaction }
      )
    })
  }
  static async reject(params: number, nama_pengguna: string) {
    await StokAdjustmentProduk.query().where('id_stok_produk_adjustment', params).update({
      status_adjustment: 'REJECTED',
      approved_by: nama_pengguna,
      approved_at: DateTime.now(),
    })
  }
  static async searchApproval(nama_produk: string) {
    return await StokAdjustmentProduk.query()
      .whereHas('produk', (b) => {
        b.where('nama_produk', 'ILIKE', `%${nama_produk}%`).where({ is_deleted: false })
      })
      .preload('produk')
      .preload('pengguna')
      .where('status_adjustment', 'PENDING')
  }

  static async searchStatus(nama_produk: string) {
    return await StokAdjustmentProduk.query()
      .whereHas('produk', (b) => {
        b.where('nama_produk', 'ILIKE', `%${nama_produk}%`).where({ is_deleted: false })
      })
      .preload('produk')
      .preload('pengguna')
  }
}
