import { TbRiwayatProduksiSchema as RiwayatProduksiSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Produk from './produk.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Resep from './resep.ts'

export default class RiwayatProduksi extends RiwayatProduksiSchema {
    @column ({isPrimary:true})
    declare id_riwayat_produksi:number

    @column()
    declare id_produk:number

    @belongsTo(() => Produk, {
        foreignKey:'id_produk'
    })
    declare produk:BelongsTo<typeof Produk>

    @column()
    declare id_resep:number

    @belongsTo(() => Resep, {
        foreignKey:'id_resep'
    })
    declare resep:BelongsTo<typeof Resep>

    @column()
    declare jumlah_batch:number

    @column()
    declare jumlah_hasil_produksi:number

    @column.dateTime({autoCreate:false})
    declare tanggal_produksi:DateTime

    @column()
    declare catatan_tambahan:string
        
    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}