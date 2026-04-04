import { TbHakAkseSchema as HakAksesSchema } from "#database/schema";
// import { BaseSchema } from "@adonisjs/lucid/schema";
import { column, hasMany } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";
import Pengguna from "./pengguna.ts";
import type { HasMany } from "@adonisjs/lucid/types/relations";

export default class HakAkses extends HakAksesSchema {
    public static table = 'public.tb_hak_akses'

    @column({isPrimary:true})
    declare id_hak_akses:number

    @column()
    declare nama_hak_akses:string

    @hasMany(() => Pengguna)
    declare pengguna:HasMany<typeof Pengguna>

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}