import RiwayatStokBahanBaku from '#models/bahan/riwayat_stok_bahan_baku'
import StokBahanBaku from '#models/bahan/stok_bahan_baku'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import { errors } from '@vinejs/vine'

export class StokBahanServices {
  static async update(payload: {
    id_bahan_baku: number
    jumlah: number
    tanggal_restok: DateTime
  }, nama_pengguna: string) {
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
}
