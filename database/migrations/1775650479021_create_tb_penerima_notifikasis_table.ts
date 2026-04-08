import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_penerima_notifikasi'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_penerima_notifikasi', {primaryKey:true})
      table.integer('id_pengguna')
      table.string('nama_penerima').notNullable()
      table.integer('nomor_telepon').notNullable()
      table.boolean('is_active').notNullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}