import { TbKategoriSchema as KategoriSchema } from "#database/schema";
import { column, hasMany } from "@adonisjs/lucid/orm";
import Produk from './produk.ts'
import  type { HasMany } from "@adonisjs/lucid/types/relations";

export default class Kategori extends KategoriSchema {
    public static table = 'tb_kategori'

    @column({isPrimary:true})
    declare id_kategori:number

    @column()
    declare nama_kategori:string

    @hasMany(() => Produk, {
        foreignKey:'id_kategori'
    })
    declare produk:HasMany<typeof Produk>
}