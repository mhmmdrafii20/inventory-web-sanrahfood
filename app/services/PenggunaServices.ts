import Pengguna from "#models/pengguna";

export class PenggunaServices {
    static async create(payload: { nama_pengguna: string, nomor_telepon: string, id_hak_akses: number }, params: number) {
        const data = await Pengguna.query().where('id', params).update(payload);
        return data;
    }
    static async update(payload: { id: number, id_pengguna: string, id_hak_akses: number, nama_pengguna: string, nomor_telepon: string }, params: number) {
        const data = await Pengguna.query().where('id', params).update(payload);
        return data;
    }
    static async delete(params: number) {
        const data = await Pengguna.query().where('id_pengguna', params).update({ is_deleted: true });
        return data;
    }
    static async search(nama_pengguna: string) {
        return await Pengguna.query().whereHas('hakAkses', (b) => {
            b.where('nama_pengguna', 'ILIKE', `%${nama_pengguna}%`).where('is_deleted', false);
        }).preload('hakAkses').where('is_deleted', false)
    }
}