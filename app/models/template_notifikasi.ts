import { TbTemplateNotifikasiSchema  as TemplateNotifikasiSchema } from '#database/schema'
import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import TipeNotifikasi from './tipe_notifikasi.ts'
import RiwayatStokBahanBaku from './riwayat_stok_bahan_baku.ts'
import RiwayatNotifikasiProduk from './riwayat_notifikasi_produk.ts'

export default class TemplateNotifikasi extends TemplateNotifikasiSchema {
    @column({isPrimary:true})
    declare id_template_notifikasi:number

    @hasMany(() => RiwayatStokBahanBaku, {
        foreignKey:'id_template_notifikasi'
    })
    declare riwayatStokBahanBaku:HasMany<typeof RiwayatStokBahanBaku>

    @hasMany(() => RiwayatNotifikasiProduk, {
        foreignKey:'id_template_notifikasi'
     })
    declare riwayatNotifikasiProduk:HasMany<typeof RiwayatNotifikasiProduk>

    @column()
    declare id_tipe_notifikasi:number

    @belongsTo(() => TipeNotifikasi, {
        foreignKey:'id_tipe_notifikasi'
    })
    declare produk:BelongsTo<typeof TipeNotifikasi>

    @column()
    declare nama_template:string

    @column()
    declare konten:string

    @column()
    declare is_active:boolean

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime

}
