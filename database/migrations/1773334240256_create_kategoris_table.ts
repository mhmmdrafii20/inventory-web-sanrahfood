import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_kategori'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_kategori', {primaryKey:true})
      table.string('nama_kategori').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}