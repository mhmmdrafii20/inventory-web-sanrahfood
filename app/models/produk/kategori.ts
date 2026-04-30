import { TbKategoriSchema as KategoriSchema } from "#database/schema";
import { column, hasMany } from "@adonisjs/lucid/orm";
import Produk from '../produk/produk.ts'
import type { HasMany } from "@adonisjs/lucid/types/relations";
import { DateTime } from "luxon";

export default class kategori extends KategoriSchema {
    public static table = 'tb_kategori'

    @column({ isPrimary: true, columnName: 'id_kategori' })
    declare id_kategori: number

    @column({ columnName: 'nama_kategori' })
    declare nama_kategori: string

    @hasMany(() => Produk, {
        foreignKey: 'id_kategori'
    })
    declare produk: HasMany<typeof Produk>

    @column({ columnName: 'is_deleted' })
    declare is_deleted: boolean

    @column.dateTime({ serializeAs: 'deleted_at', columnName: 'deleted_at' })
    declare deleted_at: DateTime | null
}