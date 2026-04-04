import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_bahan_baku'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_bahan_baku', {primaryKey:true}).notNullable()
      table.string("nama_bahan_baku").notNullable()
      table.string("satuan").notNullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}