import {TbResepBahanSchema as  ResepBahanSchema } from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Resep from './resep.ts'
import Bahan from './bahan.ts'

export default class ResepBahan extends ResepBahanSchema {
    @column({isPrimary:true})
    declare id_resep_bahan:number

    @column()
    declare id_resep:number

    @belongsTo(() => Resep, {
        foreignKey:'id_resep',
    })
    declare resep:BelongsTo<typeof Resep>

    @column()
    declare id_bahan_baku:number
    
    @belongsTo(() => Bahan, {
        foreignKey:'id_bahan_baku',
    })
    declare bahan:BelongsTo<typeof Bahan>

    @column()
    declare jumlah:number

    @column()
    declare satuan:string

}