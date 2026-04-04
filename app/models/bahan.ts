import { TbBahanBakuSchema as BahanBakuSchema } from "#database/schema";
// import { BaseSchema } from "@adonisjs/lucid/schema";
import { column } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";

export default class Bahan extends BahanBakuSchema {
    public static table = 'public.tb_bahan_baku'

    @column({isPrimary:true})
    declare id_bahan_baku:number

    @column()
    declare nama_bahan_baku:string

    @column()
    declare satuan:string

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}