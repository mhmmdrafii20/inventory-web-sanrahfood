import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_resep_bahan'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_resep_bahan', {primaryKey:true})
      table.integer('id_resep')
      table.integer('id_bahan_baku')
      table.integer('jumlah').notNullable()
      table.string('satuan').notNullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}