import { TbRiwayatNotifikasiProdukSchema as RiwayatNotifikasiProdukSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class RiwayatNotifikasiProduk extends RiwayatNotifikasiProdukSchema {
    @column({isPrimary:true})
    declare id_riwayat_notifikasi_produk:number

    @column()
    declare id_penerima_notifikasi:number

    @column()
    declare  id_tipe_notifikasi:number

    @column()
    declare id_template_notifikasi:number

    @column()
    declare id_produk:number

    @column.dateTime({autoCreate:false})
    declare tanggal_dikirim:DateTime
    
    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}