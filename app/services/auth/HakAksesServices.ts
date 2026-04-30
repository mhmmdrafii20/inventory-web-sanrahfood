import HakAkses from "#models/auth/hakAkses";

export class HakAksesServices {
    static async create(payload: { nama_hak_akses: string }) {
        const data = await HakAkses.create(payload);
        return data;
    }
    static async update(payload: { id_hak_akses?: number, nama_hak_akses?: string }, params: number) {
        const data = await HakAkses.query().where('id_hak_akses', params).update(payload);
        return data;
    }
    static async delete(params: number) {
        const data = await HakAkses.query().where('id_hak_akses', params).update({ is_deleted: true });
        return data;
    }
    static async restore(params: number) {
        const data = await HakAkses.query().where('id_hak_akses', params).update({ is_deleted: false });
        return data;
    }
    static async search(nama_hak_akses: string) {
        return await HakAkses.query().where('nama_hak_akses', 'ILIKE', `%${nama_hak_akses}%`).where({ is_deleted: false })
    }
    static async searchTrash(nama_hak_akses: string) {
        return await HakAkses.query().where('nama_hak_akses', 'ILIKE', `%${nama_hak_akses}%`).where({ is_deleted: true })
    }
}