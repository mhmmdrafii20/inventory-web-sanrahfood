import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_riwayat_notifikasi_produk'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_riwayat_notifikasi_produk', {primaryKey:true})
      table.integer('id_penerima_notifikasi')
      table.integer('id_tipe_notifikasi')
      table.integer('id_template_notifikasi')
      table.integer('id_produk')
      table.datetime('tanggal_dikirim')
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}