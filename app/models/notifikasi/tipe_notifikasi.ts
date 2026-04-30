import { TbTipeNotifikasiSchema as TipeNotifikasiSchema } from '#database/schema'
import { column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import PenerimaJenisNotifikasi from './penerima_jenis_notifikasi.ts'
import RiwayatNotifikasiBahanBaku from '../bahan/riwayat_notifikasi_bahan_baku.ts'
import RiwayatNotifikasiProduk from '../produk/riwayat_notifikasi_produk.ts'
import TemplateNotifikasi from './template_notifikasi.ts'

export default class TipeNotifikasi extends TipeNotifikasiSchema {
    public static table = 'tb_tipe_notifikasi';

    @column({ isPrimary: true, columnName: 'id_tipe_notifikasi' })
    declare id_tipe_notifikasi: number

    @hasMany(() => RiwayatNotifikasiBahanBaku, {
        foreignKey: 'id_tipe_notifikasi'
    })
    declare riwayatNotifikasiBahanBaku: HasMany<typeof RiwayatNotifikasiBahanBaku>

    @hasMany(() => RiwayatNotifikasiProduk, {
        foreignKey: 'id_tipe_notifikasi'
    })
    declare riwayatNotifikasiProduk: HasMany<typeof RiwayatNotifikasiProduk>

    @hasMany(() => PenerimaJenisNotifikasi, {
        foreignKey: 'id_tipe_notifikasi'
    })
    declare penerima_jenis_notifikasi: HasMany<typeof PenerimaJenisNotifikasi>

    @hasMany(() => TemplateNotifikasi, {
        foreignKey: 'id_tipe_notifikasi'
    })
    declare templateNotifikasi: HasMany<typeof TemplateNotifikasi>

    @column({ columnName: 'kode_notifikasi' })
    declare kode_notifikasi: string

    @column({ columnName: 'nama_notifikasi' })
    declare nama_notifikasi: string

    @column({ columnName: 'is_deleted' })
    declare is_deleted: boolean

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime
}