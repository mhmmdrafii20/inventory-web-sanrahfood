import { TbRiwayatNotifikasiBahanBakuSchema as  RiwayatNotifikasiBahanBakuSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class RiwayatNotifikasiBahanBaku extends RiwayatNotifikasiBahanBakuSchema {
    @column({isPrimary:true})
    declare id_riwayat_notifikasi_bahan_baku:number

    @column()
    declare id_penerima_notifikasi:number

    @column()
    declare id_tipe_notifikasi:number

    @column()
    declare id_template_notifikasi:number

    @column()
    declare id_bahan_baku:number

    @column.dateTime({autoCreate:false})
    declare tanggal_dikirim:DateTime

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}