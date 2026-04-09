import { TbBahanBakuSchema as BahanBakuSchema } from "#database/schema";
// import { BaseSchema } from "@adonisjs/lucid/schema";
import { column, hasMany } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";
import ResepBahan from './resep_bahan.ts'
import type { HasMany } from "@adonisjs/lucid/types/relations";

export default class Bahan extends BahanBakuSchema {
    public static table = 'public.tb_bahan_baku'

    @column({isPrimary:true})
    declare id_bahan_baku:number

    @hasMany(() => ResepBahan)
    declare resep_bahan:HasMany<typeof ResepBahan>

    @column()
    declare nama_bahan_baku:string

    @column()
    declare satuan:string

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}