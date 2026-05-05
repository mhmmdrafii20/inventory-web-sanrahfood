import Supplier from '#models/supplier/supplier'
export class SupplierServices {
  static async create(payload: { nama_supplier: string; alamat: string; nomor_telepon: string }) {
    return await Supplier.create(payload)
  }
  static async update(
    payload: {
      id_supplier?: number
      nama_supplier?: string
      alamat?: string
      nomor_telepon?: string
    },
    params: number
  ) {
    return await Supplier.query().where('id_supplier', params).update(payload)
  }
  static async delete(params: number) {
    return await Supplier.query().where('id_supplier', params).update({ is_deleted: true })
  }
  static async restore(params: number) {
    return await Supplier.query().where('id_supplier', params).update({ is_deleted: false })
  }
  static async search(nama_supplier: string) {
    return await Supplier.query()
      .where('nama_supplier', 'ILIKE', `%${nama_supplier}%`)
      .where({ is_deleted: false })
  }
  static async searchTrash(nama_supplier: string) {
    return await Supplier.query()
      .where('nama_supplier', 'ILIKE', `%${nama_supplier}%`)
      .where({ is_deleted: true })
  }
}
