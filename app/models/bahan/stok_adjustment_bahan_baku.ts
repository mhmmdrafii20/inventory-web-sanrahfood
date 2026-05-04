import { TbStokBahanBakuAdjustmentSchema as StokBahanBakuAdjustmentSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Bahan from './bahan.ts'
import Pengguna from '../auth/pengguna.ts'

export default class StokAdjustmentBahanBaku extends StokBahanBakuAdjustmentSchema {
  public static table = 'tb_stok_bahan_baku_adjustment'

  @column({ isPrimary: true, columnName: 'id_stok_bahan_baku_adjustment' })
  declare id_stok_bahan_baku_adjustment: number

  @column({ columnName: 'id_bahan_baku' })
  declare id_bahan_baku: number

  @belongsTo(() => Bahan, {
    foreignKey: 'id_bahan_baku',
  })
  declare bahan: BelongsTo<typeof Bahan>

  @column({ columnName: 'id_pengguna' })
  declare id_pengguna: string

  @belongsTo(() => Pengguna, {
    localKey: 'id_pengguna',
    foreignKey: 'id_pengguna',
  })
  declare pengguna: BelongsTo<typeof Pengguna>

  @column({ columnName: 'jenis_stok' })
  declare jenis_stok: string

  @column({ columnName: 'jumlah' })
  declare jumlah: number

  @column({ columnName: 'status_adjustment' })
  declare status_adjustment: string

  @column({ columnName: 'tanggal_adjustment' })
  declare tanggal_adjustment: DateTime

  @column({ columnName: 'catatan_tambahan' })
  declare catatan_tambahan: string

  @column({ columnName: 'approved_by' })
  declare approved_by: string | null

  @column({ columnName: 'approved_at' })
  declare approved_at: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime | null
}
