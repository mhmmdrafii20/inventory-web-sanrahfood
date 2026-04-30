import { TbPenerimaNotifikasiSchema as PenerimaNotifikasiSchema } from '#database/schema'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Pengguna from '../auth/pengguna.ts'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon';
import RiwayatNotifikasiBahanBaku from '../bahan/riwayat_notifikasi_bahan_baku.ts'
import RiwayatNotifikasiProduk from '../produk/riwayat_notifikasi_produk.ts';

export default class PenerimaNotifikasi extends PenerimaNotifikasiSchema {
    public static table = 'public.tb_penerima_notifikasi';

    @column({ isPrimary: true, columnName: 'id_penerima_notifikasi' })
    declare id_penerima_notifikasi: number

    @hasMany(() => RiwayatNotifikasiBahanBaku, {
        foreignKey: 'id_penerima_notifikasi'
    })
    declare riwayatNotifikasiBahanBaku: HasMany<typeof RiwayatNotifikasiBahanBaku>

    @hasMany(() => RiwayatNotifikasiProduk, {
        foreignKey: 'id_penerima_notifikasi'
    })
    declare riwayatNotifikasiProduk: HasMany<typeof RiwayatNotifikasiProduk>

    @column({ columnName: 'id_pengguna' })
    declare id_pengguna: string

    @belongsTo(() => Pengguna, {
        foreignKey: 'id_pengguna',
        localKey: 'id_pengguna'
    })
    declare pengguna: BelongsTo<typeof Pengguna>

    @column({ columnName: 'nama_penerima' })
    declare nama_penerima: string

    @column({ columnName: 'nomor_telepon' })
    declare nomor_telepon: string

    @column({ columnName: 'is_deleted' })
    declare is_deleted: boolean

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime

}