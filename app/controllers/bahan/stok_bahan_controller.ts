import Bahan from '#models/bahan/bahan'
import StokBahanBaku from '#models/bahan/stok_bahan_baku'
import type { HttpContext } from '@adonisjs/core/http'
import { StokBahanServices } from '#services/bahan/StokBahanServices'
import { stokBahanValidator } from '#validators/bahan/stok_bahan'

export default class StokBahanController {
  async index({ inertia }: HttpContext) {
    const stokBahan = await StokBahanBaku.query()
      .whereHas('bahan', (bahanQuery) => {
        bahanQuery.where({ is_deleted: false })
      })
      .preload('bahan')
    return inertia.render('bahan/stok', { stokBahan })
  }
  async restok({ inertia }: HttpContext) {
    const bahan = await Bahan.query().where({ is_deleted: false })
    return inertia.render('bahan/restok', { bahan })
  }
  async create({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(stokBahanValidator)
      await StokBahanServices.update(payload)

      const bahan = await Bahan.find(payload.id_bahan_baku)

      session.flash('success', `Stok ${bahan?.nama_bahan_baku} berhasil ditambahkan`)
      return response.redirect().toRoute('stokBahan.index')
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }
  async search({ request, inertia, response }: HttpContext) {
    const nama_bahan_baku = request.input('search', '')

    if (!nama_bahan_baku) {
      return response.redirect().toRoute('stokBahan.index')
    }
    const searchRes = await StokBahanServices.search(nama_bahan_baku)
    return inertia.render('bahan/stok', { searchRes })
  }
}
