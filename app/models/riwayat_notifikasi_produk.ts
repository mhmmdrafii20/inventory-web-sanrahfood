import { TbRiwayatNotifikasiProdukSchema as RiwayatNotifikasiProdukSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import PenerimaNotifikasi from './penerima_notifikasi.ts'
import TipeNotifikasi from './tipe_notifikasi.ts'
import TemplateNotifikasi from './template_notifikasi.ts'
import Produk from './produk.ts'

export default class RiwayatNotifikasiProduk extends RiwayatNotifikasiProdukSchema {
    @column({isPrimary:true, columnName:'id_riwayat_produk'})
    declare id_riwayat_notifikasi_produk:number

    @column({columnName:'id_penerima_notifikasi'})
    declare id_penerima_notifikasi:number

    @belongsTo(() => PenerimaNotifikasi, {
        foreignKey:'id_penerima_notifikasi'
    })
    declare penerima_notifikasi:BelongsTo<typeof PenerimaNotifikasi>

    @column({columnName:'id_tipe_notifikasi'})
    declare  id_tipe_notifikasi:number

    @belongsTo(() => TipeNotifikasi, {
        foreignKey:'id_tipe_notifikasi'
    })
    declare tipe_notifikasi:BelongsTo<typeof TipeNotifikasi>

    @column({columnName:'id_template_notifikasi'})
    declare id_template_notifikasi:number

    @belongsTo(() => TemplateNotifikasi, {
        foreignKey:'id_template_notifikasi'
    })
    declare template_notifikasi:BelongsTo<typeof TemplateNotifikasi>

    @column({columnName:'id_produk'})
    declare id_produk:number

    @belongsTo(() => Produk, {
        foreignKey:'id_produk'
    })
    declare produk:BelongsTo<typeof Produk>

    @column.dateTime({autoCreate:false, columnName:'tanggal_dikirim'})
    declare tanggal_dikirim:DateTime
    
    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}