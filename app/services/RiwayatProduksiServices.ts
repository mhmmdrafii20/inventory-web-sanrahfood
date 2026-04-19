import Resep from "#models/resep";
import RiwayatProduksi from "#models/riwayat_produksi";
import StokBahanBaku from "#models/stok_bahan_baku";
import db from '@adonisjs/lucid/services/db'
import StokProduk from "#models/stok_produk";
import { DateTime } from 'luxon';

export class RiwayatProdukServices {
    static async create(payload: { id_resep: number, id_produk: number, jumlah_batch: number, tanggal_produksi: DateTime, catatan_tambahan: string }) {

        const resep = await Resep.query().where('id_resep', payload.id_resep).preload('resep_bahan', (resepBahanQuery) => {
            resepBahanQuery.preload('bahan');
        }).firstOrFail();

        const bahanIds = resep.resep_bahan.map((item) => item.id_bahan_baku);

        const stokList = await StokBahanBaku.query().whereIn('id_bahan_baku', bahanIds);

        const stokMap = new Map(
            stokList.map((item) => [item.id_bahan_baku, item.jumlah_stok])
        )

        const maxBatchList = resep.resep_bahan.map((items) => {
            let stok = stokMap.get(items.id_bahan_baku) ?? 0
            return Math.floor(stok / items.jumlah);
        })
        const maxBatch = Math.min(...maxBatchList);

        if (payload.jumlah_batch > maxBatch) {
            throw new Error(`Stok tidak cukup. Maksimal batch: ${maxBatch}, diminta: ${payload.jumlah_batch}`);
        }

        const kebutuhan = resep.resep_bahan.map((items) => {
            return {
                id_bahan_baku: items.id_bahan_baku,
                jumlah: items.jumlah * payload.jumlah_batch,
            }
        })

        await db.transaction(async (transaction) => {
            for (const item of kebutuhan) {
                let stok = stokMap.get(item.id_bahan_baku) ?? 0
                if (stok < item.jumlah) {
                    throw new Error("Stok tidak cukup");
                }
                stok -= item.jumlah;
                await StokBahanBaku.query({ client: transaction }).where('id_bahan_baku', item.id_bahan_baku).update({
                    jumlah_stok: stok,
                })
            }
            const stokProduk = await StokProduk.findOrFail(resep.id_produk);

            stokProduk.jumlah_stok += payload.jumlah_batch * resep.batch;
            await StokProduk.query({ client: transaction }).where('id_produk', resep.id_produk).update({
                jumlah_stok: stokProduk.jumlah_stok,
            })

            await RiwayatProduksi.create({
                id_produk: resep.id_produk,
                id_resep: resep.id_resep,
                jumlah_batch: payload.jumlah_batch,
                jumlah_hasil_produksi: resep.batch * payload.jumlah_batch,
                tanggal_produksi: payload.tanggal_produksi,
                catatan_tambahan: payload.catatan_tambahan
            }, { client: transaction })
        })

    }
}