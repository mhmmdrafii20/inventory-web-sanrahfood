import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_stok_bahan_baku'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_stok_bahan_baku', {primaryKey:true})
      table.integer('id_bahan_baku')
      table.integer('jumlah_stok').notNullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}