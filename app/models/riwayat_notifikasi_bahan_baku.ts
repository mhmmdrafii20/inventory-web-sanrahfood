import { TbRiwayatNotifikasiBahanBakuSchema as  RiwayatNotifikasiBahanBakuSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import PenerimaNotifikasi from './penerima_notifikasi.ts'
import TipeNotifikasi from './tipe_notifikasi.ts'
import TemplateNotifikasi from './template_notifikasi.ts'
import Bahan from './bahan.ts'

export default class RiwayatNotifikasiBahanBaku extends RiwayatNotifikasiBahanBakuSchema {
    @column({isPrimary:true})
    declare id_riwayat_notifikasi_bahan_baku:number

    @column()
    declare id_penerima_notifikasi:number

    @belongsTo(() => PenerimaNotifikasi, {
        foreignKey:'id_penerima_notifikasi'
    })
    declare penerima_notifikasi:BelongsTo<typeof PenerimaNotifikasi>

    @column()
    declare id_tipe_notifikasi:number

    @belongsTo(() => TipeNotifikasi, {
        foreignKey:'id_tipe_notifikasi'
    })
    declare tipe_notifikasi:BelongsTo<typeof TipeNotifikasi>

    @column()
    declare id_template_notifikasi:number

    @belongsTo(() => TemplateNotifikasi, {
        foreignKey:'id_template_notifikasi'
    })
    declare template_notifikasi:BelongsTo<typeof TemplateNotifikasi>

    @column()
    declare id_bahan_baku:number

    @belongsTo(() => Bahan, {
        foreignKey:'id_bahan_baku'
    })
    declare bahan:BelongsTo<typeof Bahan>

    @column.dateTime({autoCreate:false})
    declare tanggal_dikirim:DateTime

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}