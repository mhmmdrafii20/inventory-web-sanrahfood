import { TbRiwayatStokBahanBakuSchema as  RiwayatStokBahanBakuSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import StokBahanBaku from './stok_bahan_baku.ts'

export default class RiwayatStokBahanBaku extends RiwayatStokBahanBakuSchema {
    @column({isPrimary:true})
    declare id_riwayat_stok_bb:number
    
    @column()
    declare id_stok_bahan_baku:number

    @belongsTo(() => StokBahanBaku, {
        foreignKey:'id_stok_bahan_baku'
    })
    declare produk:BelongsTo<typeof StokBahanBaku>
    
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