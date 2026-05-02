import TemplateNotifikasi from '#models/notifikasi/template_notifikasi'
import TipeNotifikasi from '#models/notifikasi/tipe_notifikasi'
import { checkIfVariableMatched } from '../../helpers/template_notifikasi_helper.ts'

export class TemplateNotifikasiServices {
  static async create(payload: {
    id_tipe_notifikasi: number
    nama_template: string
    konten: string
  }) {
    const tipeNotifikasi = await TipeNotifikasi.find(payload.id_tipe_notifikasi)

    if (!tipeNotifikasi) {
      throw new Error('Tipe Notifikasi tidak ditemukan')
    }
    const allowedVariables = tipeNotifikasi.template_variables
    checkIfVariableMatched(payload.konten, allowedVariables)

    return await TemplateNotifikasi.create(payload)
  }
  static async update(
    payload: {
      id_template_notifikasi?: number
      id_tipe_notifikasi?: number
      nama_template?: string
      konten?: string
    },
    params: number
  ) {
    const tipeNotifikasi = await TipeNotifikasi.find(payload.id_tipe_notifikasi)

    if (!tipeNotifikasi) {
      throw new Error('Tipe Notifikasi tidak ditemukan')
    }
    const allowedVariables = tipeNotifikasi.template_variables
    checkIfVariableMatched(payload.konten!, allowedVariables)

    return await TemplateNotifikasi.query().where('id_template_notifikasi', params).update(payload)
  }
  static async destroy(params: number) {
    return await TemplateNotifikasi.query().where('id_template_notifikasi', params).delete()
  }
  static async search(search: string) {
    return await TemplateNotifikasi.query()
      .where('nama_template', 'ILIKE', `%${search}%`)
      .preload('tipe_notifikasi')
  }
}
