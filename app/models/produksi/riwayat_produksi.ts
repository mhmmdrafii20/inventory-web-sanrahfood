import { TbRiwayatProduksiSchema as RiwayatProduksiSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Produk from '../produk/produk.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Resep from '../resep/resep.ts'

export default class RiwayatProduksi extends RiwayatProduksiSchema {
  public static table = 'tb_riwayat_produksi'

  @column({ isPrimary: true, columnName: 'id_riwayat_produksi' })
  declare id_riwayat_produksi: number

  @column({ columnName: 'id_produk' })
  declare id_produk: number

  @belongsTo(() => Produk, {
    foreignKey: 'id_produk',
  })
  declare produk: BelongsTo<typeof Produk>

  @column({ columnName: 'nama_produk' })
  declare nama_produk: string

  @column({ columnName: 'id_resep' })
  declare id_resep: number

  @belongsTo(() => Resep, {
    foreignKey: 'id_resep',
  })
  declare resep: BelongsTo<typeof Resep>

  @column({ columnName: 'nama_resep' })
  declare nama_resep: string

  @column({ columnName: 'jumlah_batch' })
  declare jumlah_batch: number

  @column({ columnName: 'jumlah_hasil_produksi' })
  declare jumlah_hasil_produksi: number

  @column.dateTime({ autoCreate: false, columnName: 'tanggal_produksi' })
  declare tanggal_produksi: DateTime

  @column({ columnName: 'catatan_tambahan' })
  declare catatan_tambahan: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
