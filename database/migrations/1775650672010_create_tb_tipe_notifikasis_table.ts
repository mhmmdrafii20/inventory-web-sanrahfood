import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_tipe_notifikasi'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_tipe_notifikasi', {primaryKey:true})
      table.string('kode_notifikasi').notNullable()
      table.string('nama_notifikasi').notNullable()
      table.boolean('is_active').notNullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}