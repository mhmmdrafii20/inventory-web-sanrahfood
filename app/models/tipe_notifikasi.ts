import { TbTipeNotifikasiSchema as  TipeNotifikasiSchema } from '#database/schema'
import { column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import PenerimaJenisNotifikasi from './penerima_jenis_notifikasi.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class TipeNotifikasi extends TipeNotifikasiSchema {
    @column({isPrimary:true})
    declare id_tipe_notifikasi:number

    @hasMany(() => PenerimaJenisNotifikasi)
    declare penerima_jenis_notifikasi:HasMany<typeof PenerimaJenisNotifikasi>

    @column()
    declare kode_notifikasi:string

    @column()
    declare nama_notifikasi:string

    @column()
    declare is_active:boolean

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}