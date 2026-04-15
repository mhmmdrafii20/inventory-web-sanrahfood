import { TbStokBahanBakuSchema as StokBahanBakuSchema } from '#database/schema'
import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Bahan from './bahan.ts'
import RiwayatStokBahanBaku from './riwayat_stok_bahan_baku.ts'

export default class StokBahanBaku extends StokBahanBakuSchema {
    public static table = 'tb_stok_bahan_baku'; 
    
    @column({isPrimary:true, columnName:'id_stok_bahan_baku'})
    declare id_stok_bahan_baku:number

    @hasMany(() => RiwayatStokBahanBaku, {
        foreignKey:'id_stok_bahan_baku'
    })
    declare riwayatStokBahanBaku:HasMany<typeof RiwayatStokBahanBaku>
    
    @column({columnName:'id_bahan_baku'})
    declare id_bahan_baku:number

    @belongsTo(() => Bahan, {
        foreignKey:'id_bahan_baku'
    })
    declare bahan:BelongsTo<typeof Bahan>

    @column({columnName:'jumlah_stok'})
    declare jumlah_stok:number

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}