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
import RiwayatStokBahanBaku from '#models/bahan/riwayat_stok_bahan_baku'
import Resep from '#models/resep/resep'

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
  static async getStatusStok() {
    const stokProduk = await StokProduk.query()
      .join('tb_produk as p', 'p.id_produk', 'tb_stok_produk.id_produk')
      .where('p.is_deleted', false)
      .select(
        'p.nama_produk',
        'p.satuan',
        'tb_stok_produk.jumlah_stok',
        'tb_stok_produk.stok_minimum'
      )
      .orderBy('tb_stok_produk.jumlah_stok', 'asc')

    const stokBahanBaku = await StokBahanBaku.query()
      .join('tb_bahan_baku as b', 'b.id_bahan_baku', 'tb_stok_bahan_baku.id_bahan_baku')
      .where('b.is_deleted', false)
      .select(
        'b.nama_bahan_baku',
        'b.satuan',
        'tb_stok_bahan_baku.jumlah_stok',
        'tb_stok_bahan_baku.stok_minimum'
      )
      .orderBy('tb_stok_bahan_baku.jumlah_stok', 'asc')

    const getStatus = (jumlah: number, minimum: number) => {
      if (jumlah <= minimum) return 'kritis'
      if (jumlah <= minimum * 1.5) return 'warning' //dikali 1.5 yang berarti stok masih aman tapi udah mau nyentuh minimum.
      return 'aman'
    }
    return {
      stokProduk: stokProduk.map((item) => ({
        nama: item.$extras.nama_produk,
        satuan: item.$extras.satuan,
        jumlah_stok: Number(item.jumlah_stok),
        stok_minimum: Number(item.stok_minimum),
        status: getStatus(Number(item.jumlah_stok), Number(item.stok_minimum)),
      })),
      stokBahanBaku: stokBahanBaku.map((item) => ({
        nama: item.$extras.nama_bahan_baku,
        satuan: item.$extras.satuan,
        jumlah_stok: Number(item.jumlah_stok),
        stok_minimum: Number(item.stok_minimum),
        status: getStatus(Number(item.jumlah_stok), Number(item.stok_minimum)),
      })),
    }
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
  static async getRejectedRequestAdjustmentStokCount() {
    const getRejectedBahanBaku = await StokAdjustmentBahanBaku.query()
      .where({ status_adjustment: 'REJECTED' })
      .count('* as total')
    const rejectedBahanBaku = Number(getRejectedBahanBaku[0].$extras.total)

    const getRejectedProduk = await StokAdjustmentProduk.query()
      .where({ status_adjustment: 'REJECTED' })
      .count('* as total')
    const rejectedProduk = Number(getRejectedProduk[0].$extras.total)

    const totalRejectedRequest = rejectedBahanBaku + rejectedProduk
    return totalRejectedRequest
  }
  static async getApprovedRequestAdjustmentStokCount() {
    const getApprovedBahanBaku = await StokAdjustmentBahanBaku.query()
      .where({ status_adjustment: 'APPROVED' })
      .count('* as total')
    const approvedBahanBaku = Number(getApprovedBahanBaku[0].$extras.total)

    const getApprovedProduk = await StokAdjustmentProduk.query()
      .where({ status_adjustment: 'APPROVED' })
      .count('* as total')
    const approvedProduk = Number(getApprovedProduk[0].$extras.total)

    const totalApprovedRequest = approvedBahanBaku + approvedProduk
    return totalApprovedRequest
  }
  static async getAllRequestAdjustmentStokCount() {
    const getRequestBahanBaku = await StokAdjustmentBahanBaku.query().count('* as total')
    const requestBahanBaku = Number(getRequestBahanBaku[0].$extras.total)

    const getRequestProduk = await StokAdjustmentProduk.query().count('* as total')
    const requestProduk = Number(getRequestProduk[0].$extras.total)

    const totalRequest = requestBahanBaku + requestProduk
    return totalRequest
  }
  static async getSupplierCount() {
    const getSupplier = await Supplier.query().where({ is_deleted: false }).count('* as total')
    const totalSupplier = Number(getSupplier[0].$extras.total)
    return totalSupplier
  }
  static async getRequestAdjustmentData() {
    const produkRequest = StokAdjustmentProduk.query().preload('produk').preload('pengguna')
    const bahanRequest = StokAdjustmentBahanBaku.query().preload('bahan').preload('pengguna')

    const adjustmentRequestData = [
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
    return adjustmentRequestData
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

  static async getBahanBakuPalingBoros() {
    const data = await RiwayatStokBahanBaku.query()
      .join(
        'tb_stok_bahan_baku',
        'tb_stok_bahan_baku.id_stok_bahan_baku',
        '=',
        'tb_riwayat_stok_bahan_baku.id_stok_bahan_baku'
      )
      .join('tb_bahan_baku', 'tb_bahan_baku.id_bahan_baku', '=', 'tb_stok_bahan_baku.id_bahan_baku')
      .where('jenis_stok', 'KELUAR')
      .where('tipe_transaksi', 'PRODUKSI')
      .whereRaw("tanggal_perubahan_stok >= NOW() - INTERVAL '30 days'")
      .groupBy('tb_bahan_baku.nama_bahan_baku')
      .sum('selisih_stok as total_pemakaian')
      .select('tb_bahan_baku.nama_bahan_baku')
      .orderBy('total_pemakaian', 'desc')
      .limit(10)

    const categories = data.map((item) => item.$extras.nama_bahan_baku ?? item.nama_bahan_baku)
    const series = [
      {
        name: 'Total Pemakaian',
        data: data.map((item) => Number(Math.abs(item.$extras.total_pemakaian))),
      },
    ]
    return { categories, series }
  }
  static async getTotalProduksiHariIniCount() {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    const data = await RiwayatProduksi.query()
      .whereBetween('tanggal_produksi', [start, end])
      .count('* as total')

    const totalProduksi = Number(data[0].$extras.total)
    return totalProduksi
  }
  static async getTotalResepCount() {
    const resep = await Resep.query().where({ is_deleted: false }).count('* as total')
    const totalResep = Number(resep[0].$extras.total)
    return totalResep
  }
  static async getProdukNoResep() {
    const produkWithResep = await Resep.query()
      .select('id_produk')
      .distinct() //ngilangin duplikasi id_produk di tabel resep.
      .where({ is_deleted: false })
    const idProdukWithResep = produkWithResep.map((resep) => resep.id_produk)
    //ambil produk yg id_produknya ga ada di tabel resep
    const produkNoResep = await Produk.query()
      .whereNotIn('id_produk', idProdukWithResep)
      .where({ is_deleted: false })
      .preload('kategori')
    return produkNoResep
  }
}
