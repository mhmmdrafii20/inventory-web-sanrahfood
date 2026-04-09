import { TbStokProdukSchema as StokProdukSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class StokProduk extends StokProdukSchema {
    @column({isPrimary:true})
    declare id_stok_produk:number

    @column()
    declare id_produk:number

    @column()
    declare jumlah_stok:number
    
    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}