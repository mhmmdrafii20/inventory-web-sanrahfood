import { TbBahanBakuSchema as BahanBakuSchema } from "#database/schema";
// import { BaseSchema } from "@adonisjs/lucid/schema";
import { column, hasMany } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";
import ResepBahan from './resep_bahan.ts'
import type { HasMany } from "@adonisjs/lucid/types/relations";
import RiwayatNotifikasiBahanBaku from "./riwayat_notifikasi_bahan_baku.ts";
import StokBahanBaku from "./stok_bahan_baku.ts";

export default class Bahan extends BahanBakuSchema {
    public static table = 'public.tb_bahan_baku'

    @column({isPrimary:true, columnName:'id_bahan_baku'})
    declare id_bahan_baku:number

    @hasMany(() => RiwayatNotifikasiBahanBaku, {
         foreignKey:'id_bahan_baku'
    })
    declare riwayatNotifikasiBahanBaku:HasMany<typeof RiwayatNotifikasiBahanBaku>

    @hasMany(() => ResepBahan, {
        foreignKey:'id_bahan_baku'
    })
    declare resep_bahan:HasMany<typeof ResepBahan>

    @hasMany(() => StokBahanBaku, {
        foreignKey:'id_bahan_baku'
    })
    declare stokBahanBaku:HasMany<typeof StokBahanBaku>

    @column({columnName:'nama_bahan_baku'})
    declare nama_bahan_baku:string

    @column({columnName:'satuan'})
    declare satuan:string

    @column({columnName:'is_deleted'})
    declare is_deleted:boolean

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime
}