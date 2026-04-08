import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_riwayat_notifikasi_bahan_baku'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_riwayat_notifikasi_bahan_baku', {primaryKey:true})
      table.integer('id_penerima_notifikasi')
      table.integer('id_tipe_notifikasi')
      table.integer('id_template_notifikasi')
      table.integer('id_bahan_baku')
      table.datetime('tanggal_dikirim')
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}