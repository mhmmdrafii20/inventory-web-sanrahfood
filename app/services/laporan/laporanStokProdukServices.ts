import RiwayatStokProduk from '#models/produk/riwayat_stok_produk'
import db from '@adonisjs/lucid/services/db'
export class LaporanStokProdukServices {
  static async getLaporanData(tanggal_awal?: string, tanggal_akhir?: string) {
    const laporanMap = new Map()

    const queryPenjualan = RiwayatStokProduk.query()
      .select('nama_produk')
      .where('tipe_transaksi', 'PENJUALAN')

    if (tanggal_awal && tanggal_akhir) {
      queryPenjualan.whereBetween('tanggal_perubahan_stok', [tanggal_awal, tanggal_akhir])
    }

    const totalPenjualan = await queryPenjualan.sum('selisih_stok as total').groupBy('nama_produk')

    totalPenjualan.forEach((item) => {
      const nama = item.nama_produk

      laporanMap.set(nama, {
        ...(laporanMap.get(nama) || {}),
        nama_produk: nama,
        total_penjualan: Math.abs(Number(item.$extras.total)),
      })
    })

    const queryProduksi = RiwayatStokProduk.query()
      .join(
        'tb_stok_produk',
        'tb_stok_produk.id_stok_produk',
        '=',
        'tb_riwayat_stok_produk.id_stok_produk'
      )
      .join('tb_produk', 'tb_produk.id_produk', '=', 'tb_stok_produk.id_produk')
      .select('tb_riwayat_stok_produk.nama_produk', 'tb_produk.satuan as satuan')
      .where('tipe_transaksi', 'PRODUKSI')

    if (tanggal_awal && tanggal_akhir) {
      queryProduksi.whereBetween('tanggal_perubahan_stok', [tanggal_awal, tanggal_akhir])
    }

    const totalProduksi = await queryProduksi
      .sum('selisih_stok as total')
      .groupBy('tb_riwayat_stok_produk.nama_produk', 'satuan')

    totalProduksi.forEach((item) => {
      const nama = item.nama_produk

      laporanMap.set(nama, {
        ...(laporanMap.get(nama) || {}),
        nama_produk: nama,
        satuan: item.$extras.satuan,
        total_produksi: Number(item.$extras.total),
      })
    })

    const queryAdjustment = RiwayatStokProduk.query()
      .select('nama_produk')
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

    const totalAdjustment = await queryAdjustment.groupBy('nama_produk')

    totalAdjustment.forEach((item) => {
      const nama = item.nama_produk

      laporanMap.set(nama, {
        ...(laporanMap.get(nama) || {}),
        nama_produk: nama,
        adjustment_masuk: Number(item.$extras.adjustment_masuk),
        adjustment_keluar: Number(item.$extras.adjustment_keluar),
      })
    })
    const laporan = Array.from(laporanMap.values())
    return laporan
  }
}
