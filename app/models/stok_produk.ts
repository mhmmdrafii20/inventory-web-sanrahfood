import { TbStokProdukSchema as StokProdukSchema } from '#database/schema'
import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Produk from './produk.ts'
import RiwayatStokProduk from './riwayat_stok_produk.ts'

export default class StokProduk extends StokProdukSchema {
    @column({isPrimary:true})
    declare id_stok_produk:number

    @hasMany(() => RiwayatStokProduk, {
        foreignKey:'id_stok_produk'
     })
    declare riwayatStokProduk:HasMany<typeof RiwayatStokProduk>
    
    @column()
    declare id_produk:number

    @belongsTo(() => Produk, {
        foreignKey:'id_produk'
    })
    declare produk:BelongsTo<typeof Produk>

    @column()
    declare jumlah_stok:number
    
    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}