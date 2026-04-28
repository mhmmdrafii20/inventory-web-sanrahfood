import { TbNotifikasiWhatsappSchema as NotifikasiWhatsappSchema } from "#database/schema"
import { column } from "@adonisjs/lucid/orm"
import { DateTime } from "luxon"

export default class NotifikasiWhatsapp extends NotifikasiWhatsappSchema {
    static table = 'tb_whatsapp_sessions'

    @column({ columnName: 'id_whatsapp_sessions', isPrimary: true })
    declare id_whatsapp_sessions: number

    @column({ columnName: 'id_pengguna' })
    declare id_pengguna: string

    @column({ columnName: 'id_zawa' })
    declare id_zawa: string

    @column({ columnName: 'session_id' })
    declare session_id: string

    @column({ columnName: 'status' })
    declare status: string

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime

}   