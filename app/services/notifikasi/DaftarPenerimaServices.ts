import PenerimaJenisNotifikasi from '#models/notifikasi/penerima_jenis_notifikasi'
import PenerimaNotifikasi from '#models/notifikasi/penerima_notifikasi'
import db from '@adonisjs/lucid/services/db'
export class DaftarPenerimaServices {
  static async create(payload: {
    id_pengguna?: string
    nama_penerima?: string
    nomor_telepon?: string
    id_tipe_notifikasi: number[]
  }) {
    await db.transaction(async (transaction) => {
      const data = await PenerimaNotifikasi.create(
        {
          id_pengguna: payload.id_pengguna,
          nama_penerima: payload.nama_penerima,
          nomor_telepon: payload.nomor_telepon,
        },
        { client: transaction }
      )

      await PenerimaJenisNotifikasi.createMany(
        payload.id_tipe_notifikasi.map((id) => ({
          id_penerima_notifikasi: data.id_penerima_notifikasi,
          id_tipe_notifikasi: id,
        })),
        { client: transaction }
      )
    })
  }
  static async update(
    payload: {
      id_pengguna?: string
      nama_penerima?: string
      nomor_telepon?: string
      id_tipe_notifikasi: number[]
    },
    params: number
  ) {
    await db.transaction(async (transaction) => {
      await PenerimaNotifikasi.query({ client: transaction })
        .where('id_penerima_notifikasi', params)
        .update({
          id_pengguna: payload.id_pengguna,
          nama_penerima: payload.nama_penerima,
          nomor_telepon: payload.nomor_telepon,
        })

      await PenerimaJenisNotifikasi.query({ client: transaction })
        .where('id_penerima_notifikasi', params)
        .delete()

      await PenerimaJenisNotifikasi.createMany(
        payload.id_tipe_notifikasi.map((id) => ({
          id_penerima_notifikasi: params,
          id_tipe_notifikasi: id,
        })),
        { client: transaction }
      )
    })
  }
  static async destroy(params: number) {
    return await PenerimaNotifikasi.query().where('id_penerima_notifikasi', params).delete()
  }
  static async search(search: string) {
    return await PenerimaNotifikasi.query()
      .preload('pengguna')
      .preload('penerima_jenis_notifikasi', (penerimaJenisNotifikasiQuery) => {
        penerimaJenisNotifikasiQuery.preload('tipeNotifikasi')
      })
      .whereHas('pengguna', (penggunaQuery) => {
        penggunaQuery.where({ is_deleted: false }).whereHas('hakAkses', (hakAksesQuery) => {
          hakAksesQuery.where({ is_deleted: false })
        })
      })
      .where((query) => {
        query
          .where('nama_penerima', 'ILIKE', `%${search}%`)
          .orWhereHas('pengguna', (penggunaQuery) => {
            penggunaQuery.where('nama_pengguna', 'ILIKE', `%${search}%`)
          })
      })
      .where({ is_deleted: false })
  }
}
