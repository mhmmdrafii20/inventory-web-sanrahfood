import { TbRiwayatStokBahanBakuSchema as  RiwayatStokBahanBakuSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class RiwayatStokBahanBaku extends RiwayatStokBahanBakuSchema {
    @column({isPrimary:true})
    declare id_riwayat_stok_bb:number
    
    @column()
    declare id_stok_bahan_baku:number

    @column()
    declare jenis_stok:Text
    
    @column()
    declare selisih_stok:number
    
    @column()
    declare stok_sebelum:number

    @column()
    declare stok_sesudah:number

    @column.dateTime({autoCreate:false})
    declare tanggal_perubahan_stok:DateTime

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime

}