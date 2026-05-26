import RiwayatStokBahanBaku from '#models/bahan/riwayat_stok_bahan_baku'
import db from '@adonisjs/lucid/services/db'
export class LaporanStokBahanBakuServices {
  static async getLaporanData(tanggal_awal?: string, tanggal_akhir?: string) {
    const laporanMap = new Map()

    function withSatuan(query: any) {
      return query
        .join(
          'tb_stok_bahan_baku',
          'tb_stok_bahan_baku.id_stok_bahan_baku',
          '=',
          'tb_riwayat_stok_bahan_baku.id_stok_bahan_baku'
        )
        .join(
          'tb_bahan_baku',
          'tb_bahan_baku.id_bahan_baku',
          '=',
          'tb_stok_bahan_baku.id_bahan_baku'
        )
        .select('tb_bahan_baku.satuan as satuan')
    }

    const queryRestok = withSatuan(RiwayatStokBahanBaku.query())
      .select('tb_riwayat_stok_bahan_baku.nama_bahan_baku')
      .where('tipe_transaksi', 'RESTOK')

    if (tanggal_awal && tanggal_akhir) {
      queryRestok.whereBetween('tanggal_perubahan_stok', [tanggal_awal, tanggal_akhir])
    }

    const totalRestok = await queryRestok
      .sum('selisih_stok as total')
      .groupBy('tb_riwayat_stok_bahan_baku.nama_bahan_baku', 'tb_bahan_baku.satuan')

    totalRestok.forEach((item) => {
      const nama = item.nama_bahan_baku

      laporanMap.set(nama, {
        ...(laporanMap.get(nama) || {}),
        nama_bahan_baku: nama,
        satuan: item.$extras.satuan,
        total_restok: Number(item.$extras.total),
      })
    })

    const queryPenggunaanProduksi = withSatuan(RiwayatStokBahanBaku.query())
      .select('tb_riwayat_stok_bahan_baku.nama_bahan_baku')
      .where('tipe_transaksi', 'PRODUKSI')

    if (tanggal_awal && tanggal_akhir) {
      queryPenggunaanProduksi.whereBetween('tanggal_perubahan_stok', [tanggal_awal, tanggal_akhir])
    }

    const totalPenggunaanProduksi = await queryPenggunaanProduksi
      .sum('selisih_stok as total')
      .groupBy('tb_riwayat_stok_bahan_baku.nama_bahan_baku', 'tb_bahan_baku.satuan')

    totalPenggunaanProduksi.forEach((item) => {
      const nama = item.nama_bahan_baku

      laporanMap.set(nama, {
        ...(laporanMap.get(nama) || {}),
        nama_bahan_baku: nama,
        satuan: item.$extras.satuan,
        total_penggunaan_produksi: Math.abs(Number(item.$extras.total)),
      })
    })

    const queryAdjustment = withSatuan(RiwayatStokBahanBaku.query())
      .select('tb_riwayat_stok_bahan_baku.nama_bahan_baku')
      .select(
        db.raw(`
        SUM(
          CASE
            WHEN tipe_transaksi = 'ADJUSTMENT'
            AND selisih_stok > 0
            THEN selisih_stok
            ELSE 0
          END
        ) as adjustment_masuk
      `),
        db.raw(`
        SUM(
          CASE
            WHEN tipe_transaksi = 'ADJUSTMENT'
            AND selisih_stok < 0
            THEN ABS(selisih_stok)
            ELSE 0
          END
        ) as adjustment_keluar
      `)
      )

    if (tanggal_awal && tanggal_akhir) {
      queryAdjustment.whereBetween('tanggal_perubahan_stok', [tanggal_awal, tanggal_akhir])
    }

    const totalAdjustment = await queryAdjustment.groupBy(
      'tb_riwayat_stok_bahan_baku.nama_bahan_baku',
      'tb_bahan_baku.satuan'
    )

    totalAdjustment.forEach((item) => {
      const nama = item.nama_bahan_baku

      laporanMap.set(nama, {
        ...(laporanMap.get(nama) || {}),
        nama_bahan_baku: nama,
        satuan: item.$extras.satuan,
        adjustment_masuk: Number(item.$extras.adjustment_masuk),
        adjustment_keluar: Number(item.$extras.adjustment_keluar),
      })
    })
    const laporan = Array.from(laporanMap.values())
    return laporan
  }
}
