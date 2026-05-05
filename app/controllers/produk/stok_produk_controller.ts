import type { HttpContext } from '@adonisjs/core/http'
import StokProduk from '#models/produk/stok_produk'
import { StokProdukServices } from '#services/produk/StokProdukServices'
import Produk from '#models/produk/produk'
import { adjustmentStokProdukValidator } from '#validators/produk/stok_adjustment'
import StokAdjustmentProduk from '#models/produk/stok_adjustment_produk'
import { createStokKeluarValidator } from '#validators/produk/stok_keluar'

export default class StokProdukController {
  async index({ inertia }: HttpContext) {
    const stokProduk = await StokProduk.query()
      .whereHas('produk', (b) => {
        b.where({ is_deleted: false })
      })
      .preload('produk')
    return inertia.render('produk/stok', { stokProduk })
  }
  async search({ request, inertia, response }: HttpContext) {
    const nama_produk = request.input('search', '')

    if (!nama_produk) {
      return response.redirect().toRoute('stokProduk.index')
    }
    const searchRes = await StokProdukServices.search(nama_produk)
    return inertia.render('produk/stok', { searchRes })
  }
  async stokKeluar({ inertia }: HttpContext) {
    const produk = await Produk.query().where({ is_deleted: false })
    return inertia.render('produk/stokKeluar', { produk })
  }
  async createStokKeluar({ request, response, user, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(createStokKeluarValidator)
      await StokProdukServices.createStokKeluar(payload, String(user?.nama_pengguna))

      session.flash('success', 'Stok produk telah berhasil dikurangi')
      return response.redirect().toRoute('produk.stokKeluar')
    } catch (error) {
      console.error(error)
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }
  async adjustment({ inertia }: HttpContext) {
    const produk = await Produk.query().where({ is_deleted: false })
    return inertia.render('produk/adjustment/adjustment', { produk })
  }
  async createAdjustment({ request, response, user, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(adjustmentStokProdukValidator)
      await StokProdukServices.createAdjustment(payload, String(user?.id_pengguna))
      session.flash('success', 'Permintaaan adjustment stok telah dikirim')
      return response.redirect().back()
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat mengirim adjustment stok produk')
      return response.redirect().back()
    }
  }
  async approval({ inertia }: HttpContext) {
    const adjustmentProduk = await StokAdjustmentProduk.query()
      .preload('produk', (produkQuery) => {
        produkQuery.where({ is_deleted: false })
      })
      .where({ status_adjustment: 'PENDING' })
      .preload('pengguna')

    return inertia.render('produk/approval', { adjustmentProduk })
  }
  async approve({ session, response, user, params }: HttpContext) {
    await StokProdukServices.approve(Number(params.id), String(user?.nama_pengguna))
    session.flash('success', 'Permintaan adjustment stok telah disetujui')
    return response.redirect().back()
  }
  async reject({ session, response, user, params }: HttpContext) {
    await StokProdukServices.reject(Number(params.id), String(user?.nama_pengguna))
    session.flash('success', 'Permintaan adjustment stok telah ditolak')
    return response.redirect().back()
  }
  async status({ inertia }: HttpContext) {
    const adjustmentProduk = await StokAdjustmentProduk.query()
      .preload('produk', (produkQuery) => {
        produkQuery.where({ is_deleted: false })
      })
      .preload('pengguna')

    return inertia.render('produk/adjustment/status', { adjustmentProduk })
  }
  async searchApproval({ request, inertia, response }: HttpContext) {
    const nama_produk = request.input('search', '')

    if (!nama_produk) {
      return response.redirect().toRoute('approval-stok-produk.index')
    }
    const searchRes = await StokProdukServices.searchApproval(nama_produk)
    return inertia.render('produk/approval', { searchRes })
  }

  async searchStatus({ request, inertia, response }: HttpContext) {
    const nama_produk = request.input('search', '')

    if (!nama_produk) {
      return response.redirect().toRoute('stokProduk.status')
    }
    const searchRes = await StokProdukServices.searchStatus(nama_produk)
    return inertia.render('produk/adjustment/status', { searchRes })
  }
}
