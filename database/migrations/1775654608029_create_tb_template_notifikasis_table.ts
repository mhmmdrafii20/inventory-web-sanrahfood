import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_template_notifikasi'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_template_notifikasi', {primaryKey:true})
      table.integer('id_tipe_notifikasi')
      table.string('nama_template').notNullable()
      table.string('konten').notNullable()
      table.boolean('is_active').notNullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}