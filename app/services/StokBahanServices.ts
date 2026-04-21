import RiwayatStokBahanBaku from "#models/riwayat_stok_bahan_baku";
import StokBahanBaku from "#models/stok_bahan_baku";
import db from "@adonisjs/lucid/services/db";
import { DateTime } from "luxon";

export class StokBahanServices {
    static async update(payload: { id_bahan_baku: number, jumlah: number, tanggal_restok: DateTime }) {

        if (payload.jumlah <= 0) {
            throw new Error('Jumlah stok harus lebih dari 0');
        }

        const stokBahan = await StokBahanBaku.query().where('id_bahan_baku', payload.id_bahan_baku).first();

        if (!stokBahan) {
            throw new Error('Stok bahan baku tidak ditemukan');
        }

        await db.transaction(async (transaction) => {
            const stokAwal = stokBahan.jumlah_stok;
            const updatedJumlahStok = Number(stokAwal) + Number(payload.jumlah);
            const selisihStok = Number(updatedJumlahStok) - Number(stokAwal);

            await StokBahanBaku.query({ client: transaction }).where('id_stok_bahan_baku', stokBahan.id_stok_bahan_baku).update({
                jumlah_stok: Number(updatedJumlahStok),
            });

            await RiwayatStokBahanBaku.create({
                id_stok_bahan_baku: stokBahan.id_stok_bahan_baku,
                jenis_stok: "MASUK",
                selisih_stok: Number(selisihStok),
                stok_sebelum: Number(stokAwal),
                stok_sesudah: Number(updatedJumlahStok),
                tanggal_perubahan_stok: payload.tanggal_restok,
            }, { client: transaction });
        })
    }
}