import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_penerima_jenis_notifikasis'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_penerima_jenis_notifikasi', {primaryKey:true})
      table.integer('id_penerima_notifikasi')
      table.integer('id_tipe_notifikasi')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}