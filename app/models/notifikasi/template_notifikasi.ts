import { TbTemplateNotifikasiSchema as TemplateNotifikasiSchema } from '#database/schema'
import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import TipeNotifikasi from './tipe_notifikasi.ts'
import RiwayatStokBahanBaku from '../bahan/riwayat_stok_bahan_baku.ts'
import RiwayatNotifikasiProduk from '../produk/riwayat_notifikasi_produk.ts'

export default class TemplateNotifikasi extends TemplateNotifikasiSchema {
    public static table = 'tb_template_notifikasi';

    @column({ isPrimary: true, columnName: 'id_template_notifikasi' })
    declare id_template_notifikasi: number

    @hasMany(() => RiwayatStokBahanBaku, {
        foreignKey: 'id_template_notifikasi'
    })
    declare riwayatStokBahanBaku: HasMany<typeof RiwayatStokBahanBaku>

    @hasMany(() => RiwayatNotifikasiProduk, {
        foreignKey: 'id_template_notifikasi'
    })
    declare riwayatNotifikasiProduk: HasMany<typeof RiwayatNotifikasiProduk>

    @column({ columnName: 'id_tipe_notifikasi' })
    declare id_tipe_notifikasi: number

    @belongsTo(() => TipeNotifikasi, {
        foreignKey: 'id_tipe_notifikasi'
    })
    declare tipe_notifikasi: BelongsTo<typeof TipeNotifikasi>

    @column({ columnName: 'nama_template' })
    declare nama_template: string

    @column({ columnName: 'konten' })
    declare konten: string

    @column({ columnName: 'is_deleted' })
    declare is_deleted: boolean

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime

}
