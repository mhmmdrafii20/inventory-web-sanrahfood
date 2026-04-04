import Produk from "#models/produk";

export class ProdukServices {
    static async create(payload:{id_kategori:number, nama_produk:string, satuan:string}){
        const data = await Produk.create(payload);
        return data;
    }
    // static async update(payload:{id:number, id_pengguna:string,  id_hak_akses:number, nama_pengguna:string, nomor_telepon:string}, params:number){
    //     const data = await Pengguna.query().where('id', params).update(payload);
    //     return data;
    // }
}