import { TbRiwayatNotifikasiSchema as RiwayatNotifikasiSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import TipeNotifikasi from './tipe_notifikasi.ts'

export default class RiwayatNotifikasi extends RiwayatNotifikasiSchema {
  public static table = 'tb_riwayat_notifikasi'

  @column({ isPrimary: true, columnName: 'id_riwayat_notifikasi' })
  declare id_riwayat_notifikasi: number

  @column({ columnName: 'id_tipe_notifikasi' })
  declare id_tipe_notifikasi: number

  @belongsTo(() => TipeNotifikasi, {
    foreignKey: 'id_tipe_notifikasi',
  })
  declare tipeNotifikasi: BelongsTo<typeof TipeNotifikasi>

  @column({ columnName: 'nama_penerima' })
  declare nama_penerima: string

  @column({ columnName: 'nomor_telepon' })
  declare nomor_telepon: string

  @column({ columnName: 'pesan' })
  declare pesan: string

  @column({ columnName: 'status' })
  declare status: string

  @column({ columnName: 'error_message' })
  declare error_message: string

  @column({ columnName: 'tipe_notifikasi' })
  declare tipe_notifikasi: string

  @column.dateTime({ autoCreate: false, columnName: 'tanggal_dikirim' })
  declare tanggal_dikirim: DateTime

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
