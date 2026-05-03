import { TbRiwayatStokProdukSchema as RiwayatStokProdukSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import StokProduk from './stok_produk.ts'

export default class RiwayatStokProduk extends RiwayatStokProdukSchema {
  public static table = 'tb_riwayat_stok_produk'

  @column({ isPrimary: true, columnName: 'id_riwayat_stok_produk' })
  declare id_riwayat_stok_produk: number

  @column({ columnName: 'id_stok_produk' })
  declare id_stok_produk: number

  @belongsTo(() => StokProduk, {
    foreignKey: 'id_stok_produk',
  })
  declare stokProduk: BelongsTo<typeof StokProduk>

  @column({ columnName: 'nama_produk' })
  declare nama_produk: string

  @column({ columnName: 'jenis_stok' })
  declare jenis_stok: Text

  @column({ columnName: 'selisih_stok' })
  declare selisih_stok: number

  @column({ columnName: 'stok_sebelum' })
  declare stok_sebelum: number

  @column({ columnName: 'stok_sesudah' })
  declare stok_sesudah: number

  @column({ columnName: 'nama_pengguna' })
  declare nama_pengguna: string

  @column.dateTime({ autoCreate: false, columnName: 'tanggal_perubahan_stok' })
  declare tanggal_perubahan_stok: DateTime

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
