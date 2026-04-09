import { TbTemplateNotifikasiSchema  as TemplateNotifikasiSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class TemplateNotifikasi extends TemplateNotifikasiSchema {
    @column({isPrimary:true})
    declare id_template_notifikasi:number

    @column()
    declare id_tipe_notifikasi:number

    @column()
    declare nama_template:string

    @column()
    declare konten:string

    @column()
    declare is_active:boolean

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime

}
