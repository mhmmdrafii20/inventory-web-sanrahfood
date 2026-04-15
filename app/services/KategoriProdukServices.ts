import Kategori from "#models/kategori";

export class KategoriProdukServices {
    static async create(payload:{nama_kategori:string}){
        const data = await Kategori.create(payload);
        return data;
    }
    static async update(payload:{id_kategori:number, nama_kategori:string}, params:number){
        const data = await Kategori.query().where('id_kategori', params).update(payload);
        return data;
    }
    static async delete(params:number){
        const data = await Kategori.query().where('id_kategori', params).update({is_deleted:true});
        return data;
    }
}