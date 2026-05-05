import type { HttpContext } from '@adonisjs/core/http'
import Supplier from '#models/supplier/supplier'
import { SupplierServices } from '#services/supplier/SupplierServices'
import { createSupplierValidator, updateSupplierValidator } from '#validators/supplier/supplier'
export default class SupplierController {
  async index({ inertia }: HttpContext) {
    const supplier = await Supplier.query().where({ is_deleted: false })
    return inertia.render('supplier/index', { supplier })
  }
  async create({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(createSupplierValidator)

      await SupplierServices.create(payload)

      session.flash('success', 'Supplier berhasil ditambahkan')
      return response.redirect().toRoute('supplier.index')
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat tambah data.')
      return response.redirect().back()
    }
  }
  async edit({ params, inertia }: HttpContext) {
    const supplier = await Supplier.query().where({ id_supplier: params.id }).first()
    const dataSupplier = supplier?.$attributes
    return inertia.render('supplier/update', { dataSupplier })
  }
  async update({ request, response, session, params }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateSupplierValidator(params.id))

      await SupplierServices.update(payload, params.id)

      session.flash('success', 'Supplier berhasil diupdate')
      return response.redirect().toRoute('supplier.index')
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        throw error
      }
      session.flash('error', 'Terjadi kesalahan saat update data.')
      return response.redirect().back()
    }
  }
  async trash({ inertia }: HttpContext) {
    const supplier = await Supplier.query().where({ is_deleted: true })
    return inertia.render('supplier/restore', { supplier })
  }
  async restore({ response, session, params }: HttpContext) {
    try {
      const supplier = await Supplier.find(params.id)
      await SupplierServices.restore(params.id)

      session.flash('success', `${supplier?.nama_supplier} berhasil dipulihkan`)
      return response.redirect().toRoute('supplier.trash')
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }
  async destroy({ response, session, params }: HttpContext) {
    try {
      const supplier = await Supplier.find(params.id)
      await SupplierServices.delete(params.id)

      session.flash('success', `${supplier?.nama_supplier} berhasil dihapus`)
      return response.redirect().toRoute('supplier.index')
    } catch (error) {
      session.flash('error', error.message)
      return response.redirect().back()
    }
  }
  async search({ request, inertia, response }: HttpContext) {
    const nama_supplier = request.input('search', '')

    if (!nama_supplier) {
      return response.redirect().toRoute('supplier.index')
    }
    const searchRes = await SupplierServices.search(nama_supplier)
    return inertia.render('supplier/index', { searchRes })
  }
  async searchTrash({ request, inertia, response }: HttpContext) {
    const nama_supplier = request.input('search', '')

    if (!nama_supplier) {
      return response.redirect().toRoute('supplier.trash')
    }
    const searchRes = await SupplierServices.searchTrash(nama_supplier)
    return inertia.render('supplier/restore', { searchRes })
  }
}
