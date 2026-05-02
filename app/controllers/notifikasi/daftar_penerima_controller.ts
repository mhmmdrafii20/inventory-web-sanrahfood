import TipeNotifikasi from '#models/notifikasi/tipe_notifikasi'
import { HttpContext } from '@adonisjs/core/http'
import Pengguna from '#models/auth/pengguna'
import { DaftarPenerimaServices } from '#services/notifikasi/DaftarPenerimaServices'
import {
  daftarPenerimaValidator,
  updateDaftarPenerimaValidator,
} from '#validators/notifikasi/daftar_penerima'
import PenerimaNotifikasi from '#models/notifikasi/penerima_notifikasi'
import PenerimaJenisNotifikasi from '#models/notifikasi/penerima_jenis_notifikasi'

export default class DaftarPenerimaController {
  async index({ inertia }: HttpContext) {
    const tipeNotifikasi = await TipeNotifikasi.query()

    const pengguna = await Pengguna.query()
      .whereHas('hakAkses', (hakAksesQuery) => {
        hakAksesQuery.where({ is_deleted: false })
      })
      .preload('hakAkses')
      .where({ is_deleted: false })

    const daftarPenerima = await PenerimaNotifikasi.query().preload('pengguna', (penggunaQuery) => {
      penggunaQuery.where({ is_deleted: false })
    })

    return inertia.render('notifikasi/daftarPenerima', { tipeNotifikasi, pengguna, daftarPenerima })
  }
  async create({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(daftarPenerimaValidator)
      await DaftarPenerimaServices.create(payload)

      const isInternal = !!payload?.id_pengguna

      let namaPenerima = payload.nama_penerima

      if (isInternal) {
        const pengguna = await Pengguna.query()
          .whereHas('hakAkses', (q) => {
            q.where({ is_deleted: false })
          })
          .preload('hakAkses')
          .where({ is_deleted: false })
          .where('id_pengguna', payload?.id_pengguna!)
          .firstOrFail()

        namaPenerima = pengguna.nama_pengguna
      }

      session.flash('success', `${namaPenerima} berhasil ditambahkan`)
      return response.redirect().toRoute('daftarPenerima.index')
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat tambah data.')
      return response.redirect().back()
    }
  }
  async edit({ inertia, params }: HttpContext) {
    const daftarPenerima = await PenerimaNotifikasi.query()
      .where('id_penerima_notifikasi', params.id)
      .preload('pengguna', (PenggunaQuery) => {
        PenggunaQuery.where({ is_deleted: false })
      })
      .first()

    const dataDaftarPenerima = daftarPenerima?.$attributes

    const tipeNotifikasi = await TipeNotifikasi.query()

    const specificTipeNotifikasi = await PenerimaJenisNotifikasi.query()
      .where('id_penerima_notifikasi', params.id)
      .preload('tipe_notifikasi')

    const dataSpecificTipeNotifikasi = specificTipeNotifikasi.map(
      (item) => item.$attributes.id_tipe_notifikasi
    )

    const pengguna = await Pengguna.query()
      .whereHas('hakAkses', (hakAksesQuery) => {
        hakAksesQuery.where({ is_deleted: false })
      })
      .preload('hakAkses')
      .where({ is_deleted: false })

    return inertia.render('notifikasi/update/daftarPenerima', {
      dataDaftarPenerima,
      tipeNotifikasi,
      dataSpecificTipeNotifikasi,
      pengguna,
    })
  }
  async update({ request, response, session, params }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateDaftarPenerimaValidator(params.id))
      await DaftarPenerimaServices.update(payload, params.id)

      const isInternal = !!payload?.id_pengguna

      let namaPenerima = payload.nama_penerima

      if (isInternal) {
        const pengguna = await Pengguna.query()
          .whereHas('hakAkses', (q) => {
            q.where({ is_deleted: false })
          })
          .preload('hakAkses')
          .where({ is_deleted: false })
          .where('id_pengguna', payload?.id_pengguna!)
          .firstOrFail()

        namaPenerima = pengguna.nama_pengguna
      }

      session.flash('success', `${namaPenerima} berhasil diupdate`)
      return response.redirect().toRoute('daftarPenerima.index')
    } catch (error) {
      console.error(error)
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat update data.')
      return response.redirect().back()
    }
  }
  async destroy({ response, params, session }: HttpContext) {
    try {
      const daftarPenerima = await PenerimaNotifikasi.query()
        .where('id_penerima_notifikasi', params.id)
        .first()

      const isInternal = !!daftarPenerima?.id_pengguna

      let namaPenerima = daftarPenerima?.nama_penerima

      if (isInternal) {
        const pengguna = await Pengguna.query()
          .whereHas('hakAkses', (q) => {
            q.where({ is_deleted: false })
          })
          .preload('hakAkses')
          .where({ is_deleted: false })
          .where('id_pengguna', daftarPenerima?.id_pengguna!)
          .firstOrFail()

        namaPenerima = pengguna.nama_pengguna
      }
      await DaftarPenerimaServices.destroy(params.id)

      session.flash('success', `${namaPenerima} berhasil dihapus`)
      return response.redirect().toRoute('daftarPenerima.index')
    } catch (error) {
      console.error(error)
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat hapus data.')
      return response.redirect().back()
    }
  }
  async search({ request, response, inertia }: HttpContext) {
    const search = request.input('search', '')
    if (!search) {
      return response.redirect().toRoute('daftarPenerima.index')
    }
    const searchRes = await DaftarPenerimaServices.search(search)
    return inertia.render('notifikasi/daftarPenerima', { searchRes })
  }
}
