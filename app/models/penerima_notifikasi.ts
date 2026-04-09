import { TbPenerimaNotifikasiSchema as  PenerimaNotifikasiSchema } from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import Pengguna from './pengguna.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon';

export default class PenerimaNotifikasi extends PenerimaNotifikasiSchema {
    @column({isPrimary:true})
    declare id_penerima_notifikasi:number

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