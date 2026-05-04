import RiwayatStokBahanBaku from '#models/bahan/riwayat_stok_bahan_baku'
import StokBahanBaku from '#models/bahan/stok_bahan_baku'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import { errors } from '@vinejs/vine'
import StokAdjustmentBahanBaku from '#models/bahan/stok_adjustment_bahan_baku'

export class StokBahanServices {
  static async update(
    payload: {
      id_bahan_baku: number
      jumlah: number
      tanggal_restok: DateTime
    },
    nama_pengguna: string
  ) {
    if (payload.jumlah <= 0) {
      throw new errors.E_VALIDATION_ERROR([
        {
          message: `Jumlah tidak bisa kurang dari ${payload.jumlah}`,
          rule: 'max',
          field: 'jumlah',
        },
      ])
    }

    const stokBahan = await StokBahanBaku.query()
      .where('id_bahan_baku', payload.id_bahan_baku)
      .preload('bahan')
      .first()

    if (!stokBahan) {
      throw new Error('Stok bahan baku tidak ditemukan')
    }

    await db.transaction(async (transaction) => {
      const stokAwal = stokBahan.jumlah_stok
      const updatedJumlahStok = Number(stokAwal) + Number(payload.jumlah)
      const selisihStok = Number(updatedJumlahStok) - Number(stokAwal)

      await StokBahanBaku.query({ client: transaction })
        .where('id_stok_bahan_baku', stokBahan.id_stok_bahan_baku)
        .update({
          jumlah_stok: Number(updatedJumlahStok),
        })

      await RiwayatStokBahanBaku.create(
        {
          id_stok_bahan_baku: stokBahan.id_stok_bahan_baku,
          nama_bahan_baku: stokBahan.bahan.nama_bahan_baku,
          jenis_stok: 'MASUK',
          tipe_transaksi: 'RESTOK',
          selisih_stok: Number(selisihStok),
          stok_sebelum: Number(stokAwal),
          stok_sesudah: Number(updatedJumlahStok),
          tanggal_perubahan_stok: payload.tanggal_restok,
          nama_pengguna: nama_pengguna,
        },
        { client: transaction }
      )
    })
  }
  static async search(nama_bahan_baku: string) {
    return await StokBahanBaku.query()
      .whereHas('bahan', (b) => {
        b.where('nama_bahan_baku', 'ILIKE', `%${nama_bahan_baku}%`).where({ is_deleted: false })
      })
      .preload('bahan')
  }
  static async createAdjustment(
    payload: {
      id_bahan_baku: number
      jenis_stok: string
      jumlah: number
      tanggal_adjustment: DateTime
      catatan_tambahan: string
    },
    id_pengguna: string
  ) {
    const data = await StokAdjustmentBahanBaku.create({
      id_bahan_baku: payload.id_bahan_baku,
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
      await StokAdjustmentBahanBaku.query({ client: transaction })
        .where('id_stok_bahan_baku_adjustment', params)
        .update({
          status_adjustment: 'APPROVED',
          approved_at: DateTime.now(),
          approved_by: nama_pengguna,
        })

      const adjustmentStok = await StokAdjustmentBahanBaku.query({ client: transaction })
        .where('id_stok_bahan_baku_adjustment', params)
        .firstOrFail()

      const oldStok = await StokBahanBaku.query({ client: transaction })
        .where('id_bahan_baku', adjustmentStok.id_bahan_baku)
        .preload('bahan')
        .firstOrFail()

      let updatedStok: number

      if (adjustmentStok.jenis_stok === 'MASUK') {
        updatedStok = Number(oldStok.jumlah_stok) + Number(adjustmentStok.jumlah)
      } else if (adjustmentStok.jenis_stok === 'KELUAR') {
        updatedStok = Number(oldStok.jumlah_stok) - Number(adjustmentStok.jumlah)

        if (updatedStok < 0) {
          throw new Error('Stok tidak mencukupi')
        }
      } else {
        throw new Error('Jenis stok tidak valid')
      }

      await StokBahanBaku.query({ client: transaction })
        .where('id_bahan_baku', adjustmentStok.id_bahan_baku)
        .update({
          jumlah_stok: updatedStok,
        })

      await RiwayatStokBahanBaku.create(
        {
          id_stok_bahan_baku: Number(oldStok.id_stok_bahan_baku),
          nama_bahan_baku: oldStok.bahan.nama_bahan_baku,
          selisih_stok:
            adjustmentStok.jenis_stok === 'MASUK'
              ? Number(adjustmentStok.jumlah)
              : -Number(adjustmentStok.jumlah),
          stok_sebelum: Number(oldStok.jumlah_stok),
          stok_sesudah: Number(updatedStok),
          jenis_stok: adjustmentStok.jenis_stok,
          tipe_transaksi: 'ADJUSTMENT',
          nama_pengguna: nama_pengguna,
          tanggal_perubahan_stok: DateTime.now(),
        },
        { client: transaction }
      )
    })
  }

  static async reject(params: number, nama_pengguna: string) {
    await StokAdjustmentBahanBaku.query().where('id_stok_bahan_baku_adjustment', params).update({
      status_adjustment: 'REJECTED',
      approved_by: nama_pengguna,
      approved_at: DateTime.now(),
    })
  }
  static async searchApproval(nama_produk: string) {
    return await StokAdjustmentBahanBaku.query()
      .whereHas('bahan', (b) => {
        b.where('nama_bahan_baku', 'ILIKE', `%${nama_produk}%`).where({ is_deleted: false })
      })
      .preload('bahan')
      .preload('pengguna')
      .where('status_adjustment', 'PENDING')
  }
}
