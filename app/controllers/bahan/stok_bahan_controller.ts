import Bahan from '#models/bahan/bahan'
import StokBahanBaku from '#models/bahan/stok_bahan_baku'
import type { HttpContext } from '@adonisjs/core/http'
import { StokBahanServices } from '#services/bahan/StokBahanServices'
import { stokBahanValidator } from '#validators/bahan/stok_bahan'
import StokAdjustmentBahanBaku from '#models/bahan/stok_adjustment_bahan_baku'
import { adjustmentStokBahanBakuValidator } from '#validators/bahan/stok_adjustment'
import Supplier from '#models/supplier/supplier'
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
    const supplier = await Supplier.query().where({ is_deleted: false })
    return inertia.render('bahan/restok', { bahan, supplier })
  }
  async create({ request, response, session, user }: HttpContext) {
    try {
      const payload = await request.validateUsing(stokBahanValidator)
      await StokBahanServices.update(payload, String(user?.nama_pengguna))

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
  async adjustment({ inertia }: HttpContext) {
    const bahan = await Bahan.query().where({ is_deleted: false })
    return inertia.render('bahan/adjustment/adjustment', { bahan })
  }
  async createAdjustment({ request, response, user, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(adjustmentStokBahanBakuValidator)

      await StokBahanServices.createAdjustment(payload, String(user?.id_pengguna))

      session.flash('success', 'Permintaan adjustment stok bahan baku telah dikirim')
      return response.redirect().back()
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat mengirim adjustment stok bahan baku')
      return response.redirect().back()
    }
  }
  async approval({ inertia }: HttpContext) {
    const adjustmentBahanBaku = await StokAdjustmentBahanBaku.query()
      .preload('bahan', (bahanQuery) => {
        bahanQuery.where({ is_deleted: false })
      })
      .where({ status_adjustment: 'PENDING' })
      .preload('pengguna')

    return inertia.render('bahan/approval', { adjustmentBahanBaku })
  }
  async approve({ session, response, user, params }: HttpContext) {
    console.log(params.id)
    try {
      await StokBahanServices.approve(params.id, String(user?.nama_pengguna))

      session.flash('success', 'Permintaan adjustment stok bahan baku telah disetujui')
      return response.redirect().back()
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }
  async reject({ session, response, user, params }: HttpContext) {
    try {
      await StokBahanServices.reject(params.id, String(user?.nama_pengguna))

      session.flash('success', 'Permintaan adjustment stok bahan baku telah ditolak')
      return response.redirect().back()
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }
  async status({ inertia }: HttpContext) {
    const adjustmentBahan = await StokAdjustmentBahanBaku.query()
      .whereHas('bahan', (bahanQuery) => {
        bahanQuery.where({ is_deleted: false })
      })
      .preload('bahan')
      .preload('pengguna')
    return inertia.render('bahan/adjustment/status', { adjustmentBahan })
  }
  async searchApproval({ request, inertia, response }: HttpContext) {
    const nama_bahan_baku = request.input('search', '')

    if (!nama_bahan_baku) {
      return response.redirect().toRoute('approval-stok-bahan-baku.index')
    }
    const searchRes = await StokBahanServices.searchApproval(nama_bahan_baku)
    return inertia.render('bahan/approval', { searchRes })
  }

  async searchStatus({ request, inertia, response }: HttpContext) {
    const nama_bahan_baku = request.input('search', '')

    if (!nama_bahan_baku) {
      return response.redirect().toRoute('stokBahanBaku.status')
    }
    const searchRes = await StokBahanServices.searchStatus(nama_bahan_baku)
    return inertia.render('bahan/adjustment/status', { searchRes })
  }
}
