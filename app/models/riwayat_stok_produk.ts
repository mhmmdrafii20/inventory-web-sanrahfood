import { TbRiwayatStokProdukSchema as RiwayatStokProdukSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import StokProduk from './stok_produk.ts'

export default class RiwayatStokProduk extends RiwayatStokProdukSchema {

    @column ({isPrimary:true})
    declare id_riwayat_stok_produk:number

    @column()
    declare id_stok_produk:number

    @belongsTo(() => StokProduk, {
        foreignKey:'id_stok_produk'
    })
    declare stokProduk:BelongsTo<typeof StokProduk>

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