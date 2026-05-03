import type { HttpContext } from '@adonisjs/core/http'
import { BahanService } from '#services/bahan/BahanServices'
import Bahan from '#models/bahan/bahan'
import { bahanValidator, updateBahanValidator } from '#validators/bahan/bahan'
import StokBahanBaku from '#models/bahan/stok_bahan_baku'
import resepBahan from '#models/resep/resep_bahan'

export default class BahanController {
  async index({ inertia }: HttpContext) {
    const bahan = await Bahan.query().where({ is_deleted: false })
    return inertia.render('bahan/index', { bahan })
  }
  async create({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(bahanValidator)
      await BahanService.create(payload)

      session.flash('success', `${payload.nama_bahan_baku} berhasil ditambahkan.`)
      return response.redirect().toRoute('bahan.index')
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat tambah data.')
      return response.redirect().back()
    }
  }
  async edit({ inertia, params }: HttpContext) {
    const bahan = await Bahan.find(params.id)
    const dataBahan = bahan?.$attributes

    const stokBahan = await StokBahanBaku.query().where('id_bahan_baku', params.id).first()
    const dataStokBahan = stokBahan?.$attributes

    return inertia.render('bahan/update', { dataBahan, dataStokBahan })
  }
  async update({ request, response, params, session }: HttpContext) {
    try {
      const bahan = await Bahan.find(params.id)
      const dataBahan = bahan?.$attributes

      const payload = await request.validateUsing(updateBahanValidator(params.id))
      await BahanService.update(payload, params.id)

      session.flash('success', `${dataBahan?.nama_bahan_baku} berhasil diupdate`)
      return response.redirect().toRoute('bahan.index')
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat update data.')
      return response.redirect().back()
    }
  }
  async destroy({ response, params, session }: HttpContext) {
    try {
      const bahan = await Bahan.find(params.id)

      const isUsedInResep = await resepBahan
        .query()
        .whereHas('resep', (resepQuery) => {
          resepQuery.where({ is_deleted: false })
        })
        .where('id_bahan_baku', params.id)
        .first()

      if (isUsedInResep) {
        throw new Error(
          `${bahan?.nama_bahan_baku} tidak dapat dihapus karena masih digunakan dalam resep.`
        )
      }
      await BahanService.delete(params.id)

      session.flash('success', `${bahan?.nama_bahan_baku} berhasil dihapus`)
      return response.redirect().toRoute('bahan.index')
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }
  async trash({ inertia }: HttpContext) {
    const bahan = await Bahan.query().where({ is_deleted: true })
    return inertia.render('bahan/restore/index', { bahan })
  }
  async restore({ response, params, session }: HttpContext) {
    try {
      const bahan = await Bahan.find(params.id)
      await BahanService.restore(params.id)

      session.flash('success', `${bahan?.nama_bahan_baku} berhasil dipulihkan`)
      return response.redirect().toRoute('bahan.index')
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }
  async search({ request, response, inertia }: HttpContext) {
    const nama_bahan_baku = request.input('search', '')
    if (!nama_bahan_baku) {
      return response.redirect().toRoute('bahan.index')
    }
    const searchRes = await BahanService.search(nama_bahan_baku)
    return inertia.render('bahan/index', { searchRes })
  }
  async searchTrash({ request, response, inertia }: HttpContext) {
    const nama_bahan_baku = request.input('search', '')
    if (!nama_bahan_baku) {
      return response.redirect().toRoute('bahan.trash')
    }
    const searchRes = await BahanService.searchTrash(nama_bahan_baku)
    return inertia.render('bahan/restore/index', { searchRes })
  }
}
