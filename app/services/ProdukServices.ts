import Produk from "#models/produk";

export class ProdukServices {
    static async create(payload: { nama_produk: string, satuan: string, id_kategori: number }) {
        const data = await Produk.create(payload);
        return data;
    }
    static async update(payload: { id_produk: number, id_kategori: number, nama_produk: string, satuan: string }, params: number) {
        const data = await Produk.query().where('id_produk', params).update(payload);
        return data;
    }
    static async delete(params: number) {
        const data = await Produk.query().where('id_produk', params).update({ is_deleted: true });
        return data;
    }
}