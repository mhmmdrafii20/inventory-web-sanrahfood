import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_stok_produk'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_stok_produk', {primaryKey:true})
      table.integer('id_produk')
      table.integer('jumlah_stok').notNullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}