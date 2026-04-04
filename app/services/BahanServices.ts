import Bahan from "#models/bahan";
export class BahanService {
    static async create(payload:{nama_bahan_baku:string, satuan:string}){
        const data = await Bahan.create(payload);
        return data;
    }
    static async update(payload:{id_bahan_baku:number, nama_bahan_baku:string, satuan:string}, params:number){
        const data = await Bahan.query().where('id_bahan_baku', params).update(payload);
        return data;
    }
}