import { TbTipeNotifikasiSchema as TipeNotifikasiSchema } from '#database/schema'
import { column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import PenerimaJenisNotifikasi from './penerima_jenis_notifikasi.ts'
import TemplateNotifikasi from './template_notifikasi.ts'

export default class TipeNotifikasi extends TipeNotifikasiSchema {
  public static table = 'tb_tipe_notifikasi'

  @column({ isPrimary: true, columnName: 'id_tipe_notifikasi' })
  declare id_tipe_notifikasi: number

  @hasMany(() => PenerimaJenisNotifikasi, {
    foreignKey: 'id_tipe_notifikasi',
  })
  declare penerima_jenis_notifikasi: HasMany<typeof PenerimaJenisNotifikasi>

  @hasMany(() => TemplateNotifikasi, {
    foreignKey: 'id_tipe_notifikasi',
  })
  declare templateNotifikasi: HasMany<typeof TemplateNotifikasi>

  @column({ columnName: 'kode_notifikasi' })
  declare kode_notifikasi: string

  @column({ columnName: 'nama_notifikasi' })
  declare nama_notifikasi: string

  @column({
    columnName: 'template_variables',
    prepare: (v: string[]) => {
      // array convert ke JSON string sebelum disimpan ke DB
      if (typeof v === 'string') return v // sudah string, skip
      return JSON.stringify(v)
    },
    // JSON string convert ke array setelah diambil dari DB
    consume: (v: string) => {
      try {
        return JSON.parse(v)
      } catch {
        return v // kalo gagal parse, return apa adanya
      }
    },
  })
  declare template_variables: string[]

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
