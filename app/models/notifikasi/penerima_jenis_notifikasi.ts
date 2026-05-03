import { TbPenerimaJenisNotifikasiSchema as PenerimaJenisNotifikasiSchema } from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import PenerimaNotifikasi from './penerima_notifikasi.ts'
import TipeNotifikasi from './tipe_notifikasi.ts'

export default class PenerimaJenisNotifikasi extends PenerimaJenisNotifikasiSchema {
  public static table = 'tb_penerima_jenis_notifikasi'

  @column({ isPrimary: true, columnName: 'id_penerima_jenis_notifikasi' })
  declare id_penerima_jenis_notifikasi: number

  @column({ columnName: 'id_penerima_notifikasi' })
  declare id_penerima_notifikasi: number

  @belongsTo(() => PenerimaNotifikasi, {
    foreignKey: 'id_penerima_notifikasi',
  })
  declare penerima_notifikasi: BelongsTo<typeof PenerimaNotifikasi>

  @column({ columnName: 'id_tipe_notifikasi' })
  declare id_tipe_notifikasi: number

  @belongsTo(() => TipeNotifikasi, {
    foreignKey: 'id_tipe_notifikasi',
  })
  declare tipeNotifikasi: BelongsTo<typeof TipeNotifikasi>
}
