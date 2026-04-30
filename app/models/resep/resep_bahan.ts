import { TbResepBahanSchema as ResepBahanSchema } from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Resep from '../resep/resep.ts'
import Bahan from '../bahan/bahan.ts'

export default class ResepBahan extends ResepBahanSchema {
    public static table = 'tb_resep_bahan';
    @column({ isPrimary: true, columnName: 'id_resep_bahan' })
    declare id_resep_bahan: number

    @column({ columnName: 'id_resep' })
    declare id_resep: number

    @belongsTo(() => Resep, {
        foreignKey: 'id_resep',
    })
    declare resep: BelongsTo<typeof Resep>

    @column({ columnName: 'id_bahan_baku' })
    declare id_bahan_baku: number

    @belongsTo(() => Bahan, {
        foreignKey: 'id_bahan_baku',
    })
    declare bahan: BelongsTo<typeof Bahan>

    @column({ columnName: 'jumlah' })
    declare jumlah: number
}