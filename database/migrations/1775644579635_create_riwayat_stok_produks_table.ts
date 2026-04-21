import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_riwayat_stok_produk'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_riwayat_stok_produk', { primaryKey: true })
      table.integer('id_stok_produk')
      table.enu('jenis_stok', ['terjual', 'rusak', 'expired', 'masuk']).notNullable()
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