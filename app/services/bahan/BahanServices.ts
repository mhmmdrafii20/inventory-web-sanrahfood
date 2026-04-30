import Bahan from "#models/bahan/bahan";
export class BahanService {
    static async create(payload: { nama_bahan_baku: string, satuan: string }) {
        const data = await Bahan.create(payload);
        return data;
    }
    static async update(payload: { id_bahan_baku?: number, nama_bahan_baku?: string, satuan?: string }, params: number) {
        const data = await Bahan.query().where('id_bahan_baku', params).update(payload);
        return data;
    }
    static async delete(params: number) {
        const data = await Bahan.query().where('id_bahan_baku', params).update({ is_deleted: true });
        return data;
    }
    static async restore(params: number) {
        const data = await Bahan.query().where('id_bahan_baku', params).update({ is_deleted: false });
        return data;
    }
    static async search(nama_bahan_baku: string) {
        return await Bahan.query().where('nama_bahan_baku', 'ILIKE', `%${nama_bahan_baku}%`).where({ is_deleted: false });
    }
    static async searchTrash(nama_bahan_baku: string) {
        return await Bahan.query().where('nama_bahan_baku', 'ILIKE', `%${nama_bahan_baku}%`).where({ is_deleted: true });
    }
}