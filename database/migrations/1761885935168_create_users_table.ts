import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tb_pengguna'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id', {primaryKey:true}).notNullable()
      table.uuid('id_pengguna').notNullable().references('id').inTable('auth.users').onDelete('CASCADE')
      table.integer('id_hak_akses').unsigned()
      table.string('nama_pengguna').nullable()
      table.integer('nomor_telepon').notNullable()
      table.timestamp('created_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
