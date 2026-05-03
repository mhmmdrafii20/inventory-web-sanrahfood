import { TbNotifikasiWhatsappSchema as NotifikasiWhatsappSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Pengguna from '../auth/pengguna.ts'

export default class NotifikasiWhatsapp extends NotifikasiWhatsappSchema {
  static table = 'tb_whatsapp_sessions'

  @column({ columnName: 'id_whatsapp_sessions', isPrimary: true })
  declare id_whatsapp_sessions: number

  @column({ columnName: 'id_pengguna' })
  declare id_pengguna: string

  @belongsTo(() => Pengguna, {
    foreignKey: 'id_pengguna',
    localKey: 'id_pengguna',
  })
  declare pengguna: BelongsTo<typeof Pengguna>

  @column({ columnName: 'id_zawa' })
  declare id_zawa: string

  @column({ columnName: 'session_id' })
  declare session_id: string

  @column({ columnName: 'status' })
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
