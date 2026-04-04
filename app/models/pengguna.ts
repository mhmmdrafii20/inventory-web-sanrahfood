import { TbPenggunaSchema as PenggunaSchema } from "#database/schema";
// import { BaseSchema } from "@adonisjs/lucid/schema";
import { belongsTo, column } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";
import HakAkses from "./hakAkses.ts";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";

export default class Pengguna extends PenggunaSchema {
    public static table = 'public.tb_pengguna'

    @column({isPrimary:true, columnName:'id_pengguna'})
    declare id_pengguna:number

    @column({columnName:'nama_pengguna'})
    declare nama_pengguna:string

    @column({columnName:'id_hak_akses'})
    declare id_hak_akses:number

    @belongsTo(() => HakAkses, {
        foreignKey:'id_hak_akses'
    })
    declare hakAkses:BelongsTo<typeof HakAkses>

    @column({columnName:'nomor_telepon'})
    declare nomor_telepon:number

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}