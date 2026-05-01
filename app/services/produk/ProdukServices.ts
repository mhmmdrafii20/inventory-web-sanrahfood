import Produk from "#models/produk/produk";
import db from "@adonisjs/lucid/services/db";
import StokProduk from "#models/produk/stok_produk";
export class ProdukServices {
    static async create(payload: { nama_produk: string, satuan: string, id_kategori: number, stok_minimum: number }) {
        return await db.transaction(async (transaction) => {
            const data = await Produk.create({
                nama_produk: payload.nama_produk,
                satuan: payload.satuan,
                id_kategori: payload.id_kategori,
            }, { client: transaction })

            await StokProduk.create({
                id_produk: data.id_produk,
                jumlah_stok: 0,
                stok_minimum: payload.stok_minimum,
            }, { client: transaction })
            return data;
        })
    }
    static async update(payload: { id_produk?: number, id_kategori?: number, nama_produk?: string, satuan?: string, stok_minimum?: number }, params: number) {
        return await db.transaction(async (transaction) => {
            const data = await Produk.query({ client: transaction }).where('id_produk', params).update({
                nama_produk: payload.nama_produk,
                satuan: payload.satuan,
                id_kategori: payload.id_kategori,
            })

            await StokProduk.query({ client: transaction }).where('id_produk', params).update({
                stok_minimum: payload.stok_minimum,
            });
            return data;
        })

    }
    static async delete(params: number) {
        const data = await Produk.query().where('id_produk', params).update({ is_deleted: true });
        return data;
    }
    static async restore(params: number) {
        const data = await Produk.query().where('id_produk', params).update({ is_deleted: false });
        return data;
    }
    static async search(nama_produk: string) {
        return await Produk.query().where('nama_produk', 'ILIKE', `%${nama_produk}%`).where({ is_deleted: false }).preload('kategori');
    }
    static async searchTrash(nama_produk: string) {
        return await Produk.query().where('nama_produk', 'ILIKE', `%${nama_produk}%`).where({ is_deleted: true }).preload('kategori');
    }
}