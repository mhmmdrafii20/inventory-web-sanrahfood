import { TbPenggunaSchema as PenggunaSchema } from '#database/schema'
// import { BaseSchema } from "@adonisjs/lucid/schema";
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import HakAkses from './hakAkses.ts'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import PenerimaNotifikasi from '../notifikasi/penerima_notifikasi.ts'
import PenerimaJenisNotifikasi from '../notifikasi/penerima_jenis_notifikasi.ts'

export default class Pengguna extends PenggunaSchema {
  public static table = 'public.tb_pengguna'

  @column({ isPrimary: true, columnName: 'id' })
  declare id: number

  @column({ columnName: 'id_pengguna' })
  declare id_pengguna: string

  @hasMany(() => PenerimaNotifikasi, {
    foreignKey: 'id_pengguna',
    localKey: 'id_pengguna',
  })
  declare penerima_notifikasi: HasMany<typeof PenerimaNotifikasi>

  @column({ columnName: 'nama_pengguna' })
  declare nama_pengguna: string

  @column({ columnName: 'id_hak_akses' })
  declare id_hak_akses: number

  @belongsTo(() => HakAkses, {
    foreignKey: 'id_hak_akses',
  })
  declare hakAkses: BelongsTo<typeof HakAkses>

  @column({ columnName: 'nomor_telepon' })
  declare nomor_telepon: string

  @column({ columnName: 'is_deleted' })
  declare is_deleted: boolean

  @column.dateTime({ serializeAs: 'deleted_at', columnName: 'deleted_at' })
  declare deleted_at: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
