import { TbRiwayatProduksiSchema as RiwayatProduksiSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class RiwayatProduksi extends RiwayatProduksiSchema {
    @column ({isPrimary:true})
    declare id_riwayat_produksi:number

    @column()
    declare id_produk:number

    @column()
    declare id_resep:number

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