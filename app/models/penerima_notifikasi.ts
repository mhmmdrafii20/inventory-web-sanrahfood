import { TbPenerimaNotifikasiSchema as  PenerimaNotifikasiSchema } from '#database/schema'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Pengguna from './pengguna.ts'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon';
import RiwayatNotifikasiBahanBaku from './riwayat_notifikasi_bahan_baku.ts'
import RiwayatNotifikasiProduk from './riwayat_notifikasi_produk.ts';

export default class PenerimaNotifikasi extends PenerimaNotifikasiSchema {
    @column({isPrimary:true})
    declare id_penerima_notifikasi:number

    @hasMany(() => RiwayatNotifikasiBahanBaku, {
        foreignKey:'id_penerima_notifikasi'
    })
    declare riwayatNotifikasiBahanBaku:HasMany<typeof RiwayatNotifikasiBahanBaku>

    @hasMany(() => RiwayatNotifikasiProduk, {
        foreignKey:'id_penerima_notifikasi'
    })
    declare riwayatNotifikasiProduk:HasMany<typeof RiwayatNotifikasiProduk>

    @column()
    declare id_pengguna:number

    @belongsTo(() => Pengguna, {
        foreignKey:'id_pengguna',
    })
    declare pengguna:BelongsTo<typeof Pengguna>

    @column()
    declare nama_penerima:string

    @column()
    declare nomor_telepon:number

    @column()
    declare is_active:boolean

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime

}