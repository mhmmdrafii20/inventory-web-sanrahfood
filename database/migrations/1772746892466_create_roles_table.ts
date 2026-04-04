import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_hak_akses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_hak_akses', {primaryKey:true}).notNullable()
      table.string('nama_hak_akses').notNullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}