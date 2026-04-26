import Resep from "#models/resep";
import ResepBahan from "#models/resep_bahan";
import db from '@adonisjs/lucid/services/db'

export class ResepServices {
    static async create(payload: { nama_resep: string, id_produk: number, yield_per_batch: number, catatan_tambahan?: string, bahan: { id_bahan_baku: number; jumlah: number }[] }) {
        await db.transaction(async (transaction) => {
            const resep = await Resep.create({
                nama_resep: payload.nama_resep,
                id_produk: payload.id_produk,
                yield_per_batch: payload.yield_per_batch,
                catatan_tambahan: payload.catatan_tambahan,
            }, { client: transaction })

            const bahan = payload.bahan.map((items) => ({
                id_resep: resep.id_resep,
                id_bahan_baku: items.id_bahan_baku,
                jumlah: items.jumlah,
            }))
            await ResepBahan.createMany(bahan, { client: transaction })
            return resep;
        })
    }
    static async update(params: number, data: { id_resep: number, nama_resep: string, id_produk: number, yield_per_batch: number, bahan: { id_bahan_baku: number, jumlah: number }[] }) {
        await db.transaction(async (transaction) => {
            await Resep
                .query({ client: transaction })
                .where('id_resep', params)
                .update({
                    id_resep: data.id_resep,
                    nama_resep: data.nama_resep,
                    id_produk: data.id_produk,
                    yield_per_batch: data.yield_per_batch
                });

            await ResepBahan
                .query({ client: transaction })
                .where('id_resep', params)
                .delete()

            for (const item of data.bahan) {
                await ResepBahan.create({
                    id_resep: params,
                    id_bahan_baku: item.id_bahan_baku,
                    jumlah: item.jumlah,
                }, { client: transaction })
            }
        })
    }
    static async delete(params: number) {
        const data = await Resep.query().where('id_resep', params).update({ is_deleted: true });
        return data;
    }
    static async search(nama_resep: string) {
        return await Resep.query().whereHas('produk', (ResepQuery) => {
            ResepQuery.where('nama_resep', 'ILIKE', `%${nama_resep}%`).where('is_deleted', false)
        }).preload('produk').where({ is_deleted: false })
    }
}