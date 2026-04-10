import { TbProdukSchema as ProdukSchema} from '#database/schema'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import Kategori from './kategori.ts'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import Resep from './resep.ts'
import RiwayatNotifikasiProduk from './riwayat_notifikasi_produk.ts';
import RiwayatProduksi from './riwayat_produksi.ts';


export default class Produk extends ProdukSchema {
    public static table = 'tb_produk'; 
    
    @column({isPrimary:true})
    declare id_produk:number

    @hasMany(() => RiwayatNotifikasiProduk, {
        foreignKey:'id_produk'
    })
    declare riwayatNotifikasiProduk:HasMany<typeof RiwayatNotifikasiProduk>

    @hasMany(() => RiwayatProduksi, {
        foreignKey:'id_produk'
    })
    declare riwayatProduksi:HasMany<typeof RiwayatProduksi>

    @column()
    declare id_kategori:number

    @belongsTo(() => Kategori, {
        foreignKey:'id_kategori',
    })
    declare kategori:BelongsTo<typeof Kategori>

    @hasMany(() => Resep)
    declare resep:HasMany<typeof Resep>

    @column() 
    declare nama_produk:string

    @column()
    declare satuan:string

    @column.dateTime({autoCreate:true})
    declare created_at:DateTime

}