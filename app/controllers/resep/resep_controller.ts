import type { HttpContext } from '@adonisjs/core/http'
import Bahan from '#models/bahan/bahan'
import Produk from '#models/produk/produk'
import { ResepServices } from '#services/resep/ResepServices'
import Resep from '#models/resep/resep'
import ResepBahan from '#models/resep/resep_bahan'
import { resepValidator, updateResepValidator } from '#validators/resep/resep'

export default class ResepController {
  async index({ inertia }: HttpContext) {
    const bahan = await Bahan.query().where({ is_deleted: false })
    const produk = await Produk.query().where({ is_deleted: false })
    const resep = await Resep.query()
      .whereHas('produk', (produkQuery) => {
        produkQuery.where({ is_deleted: false })
      })
      .preload('produk', (produkQuery) => {
        produkQuery.where({ is_deleted: false })
      })
      .where({ is_deleted: false })
      .preload('resep_bahan', (resepBahanQuery) => {
        resepBahanQuery.preload('bahan', (bahanQuery) => {
          bahanQuery.where({ is_deleted: false })
        })
      })

    return inertia.render('resep/index', { bahan, produk, resep })
  }
  async create({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(resepValidator)
      await ResepServices.create(payload)

      session.flash('success', `${payload.nama_resep} Berhasil ditambahkan `)
      return response.redirect().toRoute('resep.index')
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat tambah data.')
      return response.redirect().back()
    }
  }
  async edit({ inertia, params }: HttpContext) {
    const specificResep = await Resep.find(params.id)
    const specificDataResep = specificResep?.$attributes

    const specificResepBahan = await ResepBahan.findManyBy('id_resep', params.id)

    const produk = await Produk.query().where({ is_deleted: false })
    const bahan = await Bahan.query().where({ is_deleted: false })

    return inertia.render('resep/update/resep', {
      specificDataResep,
      specificResepBahan,
      produk,
      bahan,
    })
  }
  async update({ response, request, session, params }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateResepValidator(params.id))
      await ResepServices.update(params.id, payload)

      session.flash('success', `${payload.nama_resep} berhasil diupdate`)
      response.redirect().toRoute('resep.index')
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat update data.')
      return response.redirect().back()
    }
  }
  async destroy({ response, session, params }: HttpContext) {
    try {
      const resep = await Resep.find(params.id)
      await ResepServices.delete(params.id)

      session.flash('success', `${resep?.nama_resep} berhasil dihapus`)
      return response.redirect().toRoute('resep.index')
    } catch (error) {
      session.flash('error', 'Terjadi kesalahan saat delete.')
      return response.redirect().back()
    }
  }
  async trash({ inertia }: HttpContext) {
    const resep = await Resep.query().where({ is_deleted: true }).preload('produk')
    return inertia.render('resep/restore/resep', { resep })
  }
  async restore({ response, session, params }: HttpContext) {
    try {
      const resep = await Resep.find(params.id)

      const produk = await Produk.query()
        .where('id_produk', Number(resep?.id_produk))
        .where({ is_deleted: false })
        .first()

      if (!produk) {
        throw new Error(
          `${resep?.nama_resep} tidak dapat dipulihkan karena produk nya sudah dihapus.`
        )
      }

      const isBahanDeleted = await ResepBahan.query()
        .whereHas('bahan', (bahanQuery) => {
          bahanQuery.where({ is_deleted: true })
        })
        .where('id_resep', params.id)
        .first()

      if (isBahanDeleted) {
        throw new Error(
          `${resep?.nama_resep} tidak dapat dipulihkan karena bahan nya sudah dihapus.`
        )
      }

      await ResepServices.restore(params.id)

      session.flash('success', `${resep?.nama_resep} berhasil dipulihkan`)
      return response.redirect().toRoute('resep.index')
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }
  async search({ request, response, inertia }: HttpContext) {
    const nama_resep = request.input('search', '')

    if (!nama_resep) {
      return response.redirect().toRoute('resep.index')
    }
    const searchRes = await ResepServices.search(nama_resep)
    return inertia.render('resep/index', { searchRes })
  }
  async searchTrash({ request, response, inertia }: HttpContext) {
    const nama_resep = request.input('search', '')

    if (!nama_resep) {
      return response.redirect().toRoute('resep.trash')
    }
    const searchRes = await ResepServices.searchTrash(nama_resep)
    return inertia.render('resep/restore/resep', { searchRes })
  }
}
