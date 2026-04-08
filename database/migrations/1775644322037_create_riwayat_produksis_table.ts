import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_riwayat_produksi'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_riwayat_produksi', {primaryKey:true})
      table.integer('id_produk')
      table.integer('id_resep')
      table.integer('jumlah_batch').notNullable()
      table.integer('jumlah_hasil_produksi').notNullable()
      table.datetime('tanggal_produksi').notNullable()
      table.string('catatan_tambahan').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}