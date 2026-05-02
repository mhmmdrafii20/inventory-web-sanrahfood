import type { HttpContext } from '@adonisjs/core/http'
import { KategoriProdukServices } from '#services/produk/KategoriProdukServices'
import Kategori from '#models/produk/kategori'
import {
  updateKategoriProdukValidator,
  kategoriProdukValidator,
} from '#validators/produk/kategori_produk'
import Produk from '#models/produk/produk'

export default class KategoriController {
  async index({ inertia }: HttpContext) {
    const kategori = await Kategori.query().where({ is_deleted: false })
    return inertia.render('produk/kategori', { kategori })
  }
  async create({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(kategoriProdukValidator())
      await KategoriProdukServices.create(payload)

      session.flash('success', `${payload.nama_kategori} Berhasil ditambahkan`)
      return response.redirect().toRoute('kategoriProduk.index')
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat tambah data.')
      return response.redirect().back()
    }
  }
  async edit({ inertia, params }: HttpContext) {
    const kategori = await Kategori.find(params.id)
    const dataKategori = kategori?.$attributes

    return inertia.render('produk/update/kategori', { dataKategori })
  }
  async update({ request, response, session, params }: HttpContext) {
    try {
      const kategori = await Kategori.find(params.id)
      const payload = await request.validateUsing(updateKategoriProdukValidator(params.id))

      await KategoriProdukServices.update(payload, params.id)
      session.flash('success', `${kategori?.nama_kategori} Berhasil dilakukan perubahan.`)
      return response.redirect().toRoute('kategoriProduk.index')
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat delete.')
      return response.redirect().back()
    }
  }
  async destroy({ response, params, session }: HttpContext) {
    try {
      const kategori = await Kategori.find(params.id)

      const cekProdukHasKategori = await Produk.query()
        .where('id_kategori', params.id)
        .where({ is_deleted: false })
        .first()

      if (cekProdukHasKategori) {
        throw new Error(
          `Kategori ini masih digunakan oleh produk ${cekProdukHasKategori.nama_produk}`
        )
      }
      await KategoriProdukServices.delete(params.id)
      session.flash('success', `${kategori?.nama_kategori} berhasil dihapus`)
      return response.redirect().toRoute('kategoriProduk.index')
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }
  async search({ request, response, inertia }: HttpContext) {
    const nama_kategori = request.input('search', '')

    if (!nama_kategori) {
      return response.redirect().toRoute('kategoriProduk.index')
    }
    const searchRes = await KategoriProdukServices.search(nama_kategori)
    return inertia.render('produk/kategori', { searchRes })
  }
  async trash({ inertia }: HttpContext) {
    const kategori = await Kategori.query().where({ is_deleted: true })
    return inertia.render('produk/restore/kategori', { kategori })
  }
  async restore({ response, params, session }: HttpContext) {
    try {
      const kategori = await Kategori.find(params.id)
      await KategoriProdukServices.restore(params.id)

      session.flash('success', `${kategori?.nama_kategori} berhasil dipulihkan`)
      return response.redirect().toRoute('kategoriProduk.index')
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }
  async searchTrash({ request, response, inertia }: HttpContext) {
    const nama_kategori = request.input('search', '')

    if (!nama_kategori) {
      return response.redirect().toRoute('kategoriProduk.trash')
    }
    const searchRes = await KategoriProdukServices.searchTrash(nama_kategori)
    return inertia.render('produk/restore/kategori', { searchRes })
  }
}
