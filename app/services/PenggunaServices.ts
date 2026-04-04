import Pengguna from "#models/pengguna";

export class PenggunaServices {
    static async create(payload:{nama_pengguna:string, nomor_telepon:string, id_hak_akses:number}, params:number){
        const data = await Pengguna.query().where('id', params).update(payload);
        return data;
    }
    static async update(payload:{id:number, id_pengguna:string,  id_hak_akses:number, nama_pengguna:string, nomor_telepon:string}, params:number){
        const data = await Pengguna.query().where('id', params).update(payload);
        return data;
    }
}