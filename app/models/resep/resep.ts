import { TbResepSchema as ResepSchema } from '#database/schema'
import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Produk from '../produk/produk.ts'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import ResepBahan from './resep_bahan.ts'
import RiwayatProduksi from '../produksi/riwayat_produksi.ts';
import { DateTime } from 'luxon';

export default class Resep extends ResepSchema {
    public static table = 'tb_resep';

    @column({ isPrimary: true, columnName: 'id_resep' })
    declare id_resep: number

    @hasMany(() => ResepBahan, {
        foreignKey: 'id_resep'
    })
    declare resep_bahan: HasMany<typeof ResepBahan>

    @hasMany(() => RiwayatProduksi, {
        foreignKey: 'id_resep'
    })
    declare riwayatProduksi: HasMany<typeof RiwayatProduksi>

    @column({ columnName: 'nama_resep' })
    declare nama_resep: string

    @column({ columnName: 'id_produk' })
    declare id_produk: number

    @belongsTo(() => Produk, {
        foreignKey: 'id_produk'
    })
    declare produk: BelongsTo<typeof Produk>

    @column({ columnName: 'yield_per_batch' })
    declare yield_per_batch: number

    @column({ columnName: 'catatan_tambahan' })
    declare catatan_tambahan: string

    @column({ columnName: 'is_deleted' })
    declare is_deleted: boolean

    @column.dateTime({ serializeAs: 'deleted_at', columnName: 'deleted_at' })
    declare deleted_at: DateTime | null

}