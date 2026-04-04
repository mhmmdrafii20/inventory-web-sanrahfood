import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_produk'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_produk', {primaryKey:true})
      table.integer('id_kategori')
      table.string('nama_produk').notNullable()
      table.string('satuan').notNullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}