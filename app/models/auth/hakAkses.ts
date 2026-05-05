import { TbHakAkseSchema as HakAksesSchema } from '#database/schema'
// import { BaseSchema } from "@adonisjs/lucid/schema";
import { column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Pengguna from '../auth/pengguna.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class HakAkses extends HakAksesSchema {
  public static table = 'public.tb_hak_akses'

  @column({ isPrimary: true, columnName: 'id_hak_akses' })
  declare id_hak_akses: number

  @column({ columnName: 'nama_hak_akses' })
  declare nama_hak_akses: string

  @hasMany(() => Pengguna, {
    foreignKey: 'id_hak_akses',
    localKey: 'id_hak_akses',
  })
  declare pengguna: HasMany<typeof Pengguna>

  @column({ columnName: 'is_deleted' })
  declare is_deleted: boolean

  @column.dateTime({ serializeAs: 'deleted_at', columnName: 'deleted_at' })
  declare deleted_at: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
