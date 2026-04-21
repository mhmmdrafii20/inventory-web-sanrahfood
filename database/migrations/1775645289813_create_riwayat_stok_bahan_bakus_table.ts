import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_riwayat_stok_bahan_baku'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_riwayat_stok_bb', { primaryKey: true })
      table.integer('id_stok_bahan_baku')
      table.enu('jenis_stok', ['restok', 'expired', 'keluar']).notNullable()
      table.integer('selisih_stok').notNullable()
      table.integer('stok_sebelum').notNullable()
      table.integer('stok_sesudah').notNullable()
      table.datetime('tanggal_perubahan_stok').notNullable()
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}