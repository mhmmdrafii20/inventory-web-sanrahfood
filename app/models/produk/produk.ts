import { TbProdukSchema as ProdukSchema } from '#database/schema'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Kategori from './kategori.ts'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Resep from '../resep/resep.ts'
import RiwayatProduksi from '../produksi/riwayat_produksi.ts'
import StokProduk from './stok_produk.ts'

export default class Produk extends ProdukSchema {
  public static table = 'tb_produk'

  @column({ isPrimary: true, columnName: 'id_produk' })
  declare id_produk: number

  @hasMany(() => RiwayatProduksi, {
    foreignKey: 'id_produk',
  })
  declare riwayatProduksi: HasMany<typeof RiwayatProduksi>

  @hasMany(() => StokProduk, {
    foreignKey: 'id_produk',
  })
  declare stokProduk: HasMany<typeof StokProduk>

  @column({ columnName: 'id_kategori' })
  declare id_kategori: number

  @belongsTo(() => Kategori, {
    foreignKey: 'id_kategori',
  })
  declare kategori: BelongsTo<typeof Kategori>

  @hasMany(() => Resep, {
    foreignKey: 'id_produk',
  })
  declare resep: HasMany<typeof Resep>

  @column({ columnName: 'nama_produk' })
  declare nama_produk: string

  @column({ columnName: 'satuan' })
  declare satuan: string

  @column({ columnName: 'is_deleted' })
  declare is_deleted: boolean

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ serializeAs: 'deleted_at', columnName: 'deleted_at' })
  declare deleted_at: DateTime | null
}
