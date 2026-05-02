import Bahan from '#models/bahan/bahan'
import db from '@adonisjs/lucid/services/db'
import StokBahanBaku from '#models/bahan/stok_bahan_baku'
export class BahanService {
  static async create(payload: { nama_bahan_baku: string; satuan: string; stok_minimum: number }) {
    return await db.transaction(async (transaction) => {
      const data = await Bahan.create(
        {
          nama_bahan_baku: payload.nama_bahan_baku,
          satuan: payload.satuan,
        },
        { client: transaction }
      )

      await StokBahanBaku.create(
        {
          id_bahan_baku: data.id_bahan_baku,
          jumlah_stok: 0,
          stok_minimum: payload.stok_minimum,
        },
        { client: transaction }
      )
      return data
    })
  }
  static async update(
    payload: {
      id_bahan_baku?: number
      nama_bahan_baku?: string
      satuan?: string
      stok_minimum?: number
    },
    params: number
  ) {
    return await db.transaction(async (transaction) => {
      const data = await Bahan.query({ client: transaction })
        .where('id_bahan_baku', params)
        .update({
          nama_bahan_baku: payload.nama_bahan_baku,
          satuan: payload.satuan,
        })

      await StokBahanBaku.query({ client: transaction }).where('id_bahan_baku', params).update({
        stok_minimum: payload.stok_minimum,
      })
      return data
    })
  }
  static async delete(params: number) {
    const data = await Bahan.query().where('id_bahan_baku', params).update({ is_deleted: true })
    return data
  }
  static async restore(params: number) {
    const data = await Bahan.query().where('id_bahan_baku', params).update({ is_deleted: false })
    return data
  }
  static async search(nama_bahan_baku: string) {
    return await Bahan.query()
      .where('nama_bahan_baku', 'ILIKE', `%${nama_bahan_baku}%`)
      .where({ is_deleted: false })
  }
  static async searchTrash(nama_bahan_baku: string) {
    return await Bahan.query()
      .where('nama_bahan_baku', 'ILIKE', `%${nama_bahan_baku}%`)
      .where({ is_deleted: true })
  }
}
