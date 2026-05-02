import { TbStokProdukSchema as StokProdukSchema } from '#database/schema'
import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Produk from './produk.ts'
import RiwayatStokProduk from './riwayat_stok_produk.ts'

export default class StokProduk extends StokProdukSchema {
  public static table = 'tb_stok_produk'

  @column({ isPrimary: true, columnName: 'id_stok_produk' })
  declare id_stok_produk: number

  @hasMany(() => RiwayatStokProduk, {
    foreignKey: 'id_stok_produk',
  })
  declare riwayatStokProduk: HasMany<typeof RiwayatStokProduk>

  @column({ columnName: 'id_produk' })
  declare id_produk: number

  @belongsTo(() => Produk, {
    foreignKey: 'id_produk',
  })
  declare produk: BelongsTo<typeof Produk>

  @column({ columnName: 'jumlah_stok' })
  declare jumlah_stok: number

  @column({ columnName: 'stok_minimum' })
  declare stok_minimum: number

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
