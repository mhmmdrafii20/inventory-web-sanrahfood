import { TbProdukSchema as ProdukSchema} from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm';
import Kategori from './kategori.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';

export default class Produk extends ProdukSchema {
    public static table = 'tb_produk'; 
    
    @column({isPrimary:true})
    declare id_produk:number

    @column()
    declare id_kategori:number

    @belongsTo(() => Kategori, {
        foreignKey:'id_kategori',
    })
    declare kategori:BelongsTo<typeof Kategori>

    @column() 
    declare nama_produk:string

    @column()
    declare satuan:string

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime

}