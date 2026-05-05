import Supplier from '#models/supplier/supplier'
import RiwayatStokProduk from '#models/produk/riwayat_stok_produk'
import { getWeekOfMonth } from '../../../utils/dateHelper.ts'
import Bahan from '#models/bahan/bahan'
import StokBahanBaku from '#models/bahan/stok_bahan_baku'
import RiwayatProduksi from '#models/produksi/riwayat_produksi'
import StokAdjustmentBahanBaku from '#models/bahan/stok_adjustment_bahan_baku'
import StokAdjustmentProduk from '#models/produk/stok_adjustment_produk'
import Produk from '#models/produk/produk'
import StokProduk from '#models/produk/stok_produk'

export default class DashboardService {
  static async getTotalBahanBakuCount() {
    const getTotal = await Bahan.query().where({ is_deleted: false }).count('* as total')
    const total = Number(getTotal[0].$extras.total)
    return total
  }
  static async getMinimumStokBahanBakuCount() {
    const getMinimum = await StokBahanBaku.query()
      .whereRaw('jumlah_stok <= stok_minimum')
      .count('* as total')
    const minimum = Number(getMinimum[0].$extras.total)
    return minimum
  }
  static async getTotalProdukCount() {
    const getTotal = await Produk.query().where({ is_deleted: false }).count('* as total')
    const total = Number(getTotal[0].$extras.total)
    return total
  }
  static async getMinimumStokProdukCount() {
    const getMinimum = await StokProduk.query()
      .whereRaw('jumlah_stok <= stok_minimum')
      .count('* as total')
    const minimum = Number(getMinimum[0].$extras.total)
    return minimum
  }
  static async getStokProdukKosong() {
    const data = await StokProduk.query()
      .where('jumlah_stok', 0)
      .preload('produk', (query) => {
        query.where({ is_deleted: false }).preload('kategori')
      })
    return data
  }
  static async getStokBahanBakuKosong() {
    const data = await StokBahanBaku.query().where('jumlah_stok', 0).preload('bahan')
    return data
  }
  static async getProduksiCurrentMonthCount() {
    const now = new Date()
    // Ambil tanggal pertama di bulan sekarang (misal: 1 Mei 2026)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    // Ambil tanggal terakhir di bulan sekarang (misal: 31 Mei 2026)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0) //0 -> mundur satu hari dari tanggal terakhir di bulan ini.

    const getProduksi = await RiwayatProduksi.query()
      .whereBetween('tanggal_produksi', [startOfMonth, endOfMonth])
      .count('* as total')
    const totalProduksi = getProduksi[0].$extras.total
    return totalProduksi
  }
  static async getPendingRequestAdjustmentStokCount() {
    const getPendingBahanBaku = await StokAdjustmentBahanBaku.query()
      .where({ status_adjustment: 'PENDING' })
      .count('* as total')
    const pendingBahanBaku = Number(getPendingBahanBaku[0].$extras.total)

    const getPendingProduk = await StokAdjustmentProduk.query()
      .where({ status_adjustment: 'PENDING' })
      .count('* as total')
    const pendingProduk = Number(getPendingProduk[0].$extras.total)

    const totalPendingRequest = pendingBahanBaku + pendingProduk
    return totalPendingRequest
  }
  static async getSupplierCount() {
    const getSupplier = await Supplier.query().where({ is_deleted: false }).count('* as total')
    const totalSupplier = Number(getSupplier[0].$extras.total)
    return totalSupplier
  }
  static async getPendingRequestAdjustmentData() {
    const produkRequest = StokAdjustmentProduk.query()
      .where({ status_adjustment: 'PENDING' })
      .preload('produk')
      .preload('pengguna')
    const bahanRequest = StokAdjustmentBahanBaku.query()
      .where({ status_adjustment: 'PENDING' })
      .preload('bahan')
      .preload('pengguna')

    const combinedRequest = [
      ...(await produkRequest).map((items) => ({
        id_stok_produk_adjustment: items.id_stok_produk_adjustment,
        id_produk: items.id_produk,
        produk: {
          nama_produk: items.produk.nama_produk,
          satuan: items.produk.satuan,
        },
        pengguna: {
          nama_pengguna: items.pengguna.nama_pengguna,
        },
        jenis_stok: items.jenis_stok,
        jumlah: items.jumlah,
        status_adjustment: items.status_adjustment,
        tanggal_adjustment: items.tanggal_adjustment,
        id_pengguna: items.id_pengguna,
        approved_by: items.approved_by,
        approved_at: items.approved_at,
        catatan_tambahan: items.catatan_tambahan,
      })),
      ...(await bahanRequest).map((items) => ({
        id_stok_bahan_baku_adjustment: items.id_stok_bahan_baku_adjustment,
        id_bahan_baku: items.id_bahan_baku,
        bahan: {
          nama_bahan_baku: items.bahan.nama_bahan_baku,
          satuan: items.bahan.satuan,
        },
        pengguna: {
          nama_pengguna: items.pengguna.nama_pengguna,
        },
        jenis_stok: items.jenis_stok,
        jumlah: items.jumlah,
        status_adjustment: items.status_adjustment,
        tanggal_adjustment: items.tanggal_adjustment,
        id_pengguna: items.id_pengguna,
        approved_by: items.approved_by,
        approved_at: items.approved_at,
        catatan_tambahan: items.catatan_tambahan,
      })),
    ]
    return { combinedRequest }
  }
  static async getProdukPenjualanBulanan() {
    const now = new Date()

    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const data = await RiwayatStokProduk.query()
      .whereBetween('tanggal_perubahan_stok', [start, end])
      .where('tipe_transaksi', 'PENJUALAN')
      .preload('stokProduk', (query) => {
        query.preload('produk')
      })

    const grouped: Record<string, number[]> = {}

    data.forEach((item) => {
      const namaProduk = item.stokProduk.produk.nama_produk
      const minggu = getWeekOfMonth(item.tanggal_perubahan_stok.toJSDate())

      if (!grouped[namaProduk]) {
        grouped[namaProduk] = [0, 0, 0, 0, 0]
      }
      grouped[namaProduk][minggu - 1] += Math.abs(item.selisih_stok)
    })
    const categories = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5']

    const series = Object.keys(grouped).map((namaProduk) => ({
      name: namaProduk,
      data: grouped[namaProduk],
    }))
    return { categories, series }
  }
}
