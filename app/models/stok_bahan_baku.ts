import { TbStokBahanBakuSchema as StokBahanBakuSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class StokBahanBaku extends StokBahanBakuSchema {
    
    @column({isPrimary:true})
    declare id_stok_bahan_baku:number

    @column()
    declare id_bahan_baku:number

    @column()
    declare jumlah_stok:number

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}