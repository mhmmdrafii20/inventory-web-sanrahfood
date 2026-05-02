import TipeNotifikasi from '#models/notifikasi/tipe_notifikasi'

export default class TipeNotifikasiService {
  static async create(payload: {
    kode_notifikasi: string
    nama_notifikasi: string
    template_variables: string[]
  }) {
    const data = await TipeNotifikasi.create({ ...payload })
    return data
  }
  static async update(
    payload: {
      id_tipe_notifikasi?: number
      kode_notifikasi?: string
      nama_notifikasi?: string
      template_variables?: string[]
    },
    params: number
  ) {
    const data = await TipeNotifikasi.query()
      .where('id_tipe_notifikasi', params)
      .update({ ...payload })
    return data
  }
  static async delete(params: number) {
    return await TipeNotifikasi.query().where('id_tipe_notifikasi', params).delete()
  }
  static async search(nama_notifikasi: string) {
    return await TipeNotifikasi.query().where('nama_notifikasi', 'ILIKE', `%${nama_notifikasi}%`)
  }
}
