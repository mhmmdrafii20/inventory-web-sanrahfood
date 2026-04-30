import { TbRiwayatNotifikasiBahanBakuSchema as RiwayatNotifikasiBahanBakuSchema } from '#database/schema'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import PenerimaNotifikasi from '../notifikasi/penerima_notifikasi.ts'
import TipeNotifikasi from '../notifikasi/tipe_notifikasi.ts'
import TemplateNotifikasi from '../notifikasi/template_notifikasi.ts'
import Bahan from './bahan.ts'

export default class RiwayatNotifikasiBahanBaku extends RiwayatNotifikasiBahanBakuSchema {
    public static table = 'tb_riwayat_notifikasi_bahan_baku';

    @column({ isPrimary: true, columnName: 'id_riwayat_notifikasi_bahan_baku' })
    declare id_riwayat_notifikasi_bahan_baku: number

    @column({ columnName: 'id_penerima_notifikasi' })
    declare id_penerima_notifikasi: number

    @belongsTo(() => PenerimaNotifikasi, {
        foreignKey: 'id_penerima_notifikasi'
    })
    declare penerima_notifikasi: BelongsTo<typeof PenerimaNotifikasi>

    @column({ columnName: 'id_tipe_notifikasi' })
    declare id_tipe_notifikasi: number

    @belongsTo(() => TipeNotifikasi, {
        foreignKey: 'id_tipe_notifikasi'
    })
    declare tipe_notifikasi: BelongsTo<typeof TipeNotifikasi>

    @column({ columnName: 'id_template_notifikasi' })
    declare id_template_notifikasi: number

    @belongsTo(() => TemplateNotifikasi, {
        foreignKey: 'id_template_notifikasi'
    })
    declare template_notifikasi: BelongsTo<typeof TemplateNotifikasi>

    @column({ columnName: 'id_bahan_baku' })
    declare id_bahan_baku: number

    @belongsTo(() => Bahan, {
        foreignKey: 'id_bahan_baku'
    })
    declare bahan: BelongsTo<typeof Bahan>

    @column.dateTime({ autoCreate: false, columnName: 'tanggal_dikirim' })
    declare tanggal_dikirim: DateTime

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime
}