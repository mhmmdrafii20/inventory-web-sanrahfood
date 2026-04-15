import { TbRiwayatStokBahanBakuSchema as  RiwayatStokBahanBakuSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import StokBahanBaku from './stok_bahan_baku.ts'

export default class RiwayatStokBahanBaku extends RiwayatStokBahanBakuSchema {
    public static table = 'tb_riwayat_stok_bahan_baku'; 

    @column({isPrimary:true, columnName:'id_riwayat_stok_bb'})
    declare id_riwayat_stok_bb:number
    
    @column({columnName:'id_stok_bahan_baku'})
    declare id_stok_bahan_baku:number

    @belongsTo(() => StokBahanBaku, {
        foreignKey:'id_stok_bahan_baku'
    })
    declare produk:BelongsTo<typeof StokBahanBaku>
    
    @column({columnName:'jenis_stok'})
    declare jenis_stok:Text
    
    @column({columnName:'selisih_stok'})
    declare selisih_stok:number
    
    @column({columnName:'stok_sebelum'})
    declare stok_sebelum:number

    @column({columnName:'stok_sesudah'})
    declare stok_sesudah:number

    @column.dateTime({autoCreate:false, columnName:'tanggal_perubahan_stok'})
    declare tanggal_perubahan_stok:DateTime

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime

}