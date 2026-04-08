import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_resep'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_resep', {primaryKey:true})
      table.string('nama_resep').notNullable()
      table.integer('id_produk')
      table.boolean('is_active').notNullable()
      table.integer('batch').notNullable()
      table.string('catatan_tambahan').nullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}