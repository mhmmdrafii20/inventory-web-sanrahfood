import { TbResepSchema as ResepSchema } from '#database/schema'
import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Produk from './produk.ts'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import ResepBahan from './resep_bahan.ts'

export default class Resep extends ResepSchema {
    @column({isPrimary:true})
    declare id_resep:number

    @hasMany(() => ResepBahan)
    declare resep_bahan:HasMany<typeof ResepBahan>

    @column()
    declare nama_resep:string

    @column()
    declare id_produk:number

    @belongsTo(() => Produk, {
        foreignKey:'id_produk'
    })
    declare produk:BelongsTo<typeof Produk>

    
}