import type { HttpContext } from '@adonisjs/core/http'
import DashboardService from '#services/dashboard/DashboardServices'
import Pengguna from '#models/auth/pengguna'

export default class DashboardController {
  async pemilik({ inertia, user }: HttpContext) {
    const totalBahanBaku = await DashboardService.getTotalBahanBakuCount()
    const minimumStokBahanBaku = await DashboardService.getMinimumStokBahanBakuCount()
    const totalProduk = await DashboardService.getTotalProdukCount()
    const minimumStokProduk = await DashboardService.getMinimumStokProdukCount()
    const statusStok = await DashboardService.getStatusStok()
    const pendingRequestAdjustmentStokCount =
      await DashboardService.getPendingRequestAdjustmentStokCount()
    const supplierCount = await DashboardService.getSupplierCount()
    const pendingRequestAdjustmentData = await DashboardService.getPendingRequestAdjustmentData()
    const produkPenjualanBulanan = await DashboardService.getProdukPenjualanBulanan()
    const stokBahanBakuPalingBoros = await DashboardService.getBahanBakuPalingBoros()
    const namaPengguna = user?.nama_pengguna

    return inertia.render('dashboard/pemilik/index', {
      totalBahanBaku,
      minimumStokBahanBaku,
      pendingRequestAdjustmentStokCount,
      supplierCount,
      pendingRequestAdjustmentData,
      produkPenjualanBulanan,
      totalProduk,
      minimumStokProduk,
      statusStok,
      stokBahanBakuPalingBoros,
      namaPengguna,
    })
  }
  async gudang({ inertia, user }: HttpContext) {
    const totalBahanBaku = await DashboardService.getTotalBahanBakuCount()
    const minimumStokBahanBaku = await DashboardService.getMinimumStokBahanBakuCount()
    const totalProduk = await DashboardService.getTotalProdukCount()
    const minimumStokProduk = await DashboardService.getMinimumStokProdukCount()
    const statusStok = await DashboardService.getStatusStok()
    const adjustmentRequestData = await DashboardService.getRequestAdjustmentData()
    const pendingRequestAdjustmentStokCount =
      await DashboardService.getPendingRequestAdjustmentStokCount()
    const rejectedRequestAdjustmentStokCount =
      await DashboardService.getRejectedRequestAdjustmentStokCount()
    const approvedRequestAdjustmentStokCount =
      await DashboardService.getApprovedRequestAdjustmentStokCount()
    const allRequestAdjustmentStokCount = await DashboardService.getAllRequestAdjustmentStokCount()
    const namaPengguna = user?.nama_pengguna

    return inertia.render('dashboard/gudang/index', {
      totalBahanBaku,
      minimumStokBahanBaku,
      pendingRequestAdjustmentStokCount,
      rejectedRequestAdjustmentStokCount,
      approvedRequestAdjustmentStokCount,
      allRequestAdjustmentStokCount,
      totalProduk,
      minimumStokProduk,
      statusStok,
      adjustmentRequestData,
      namaPengguna,
    })
  }
  async produksi({ inertia, user }: HttpContext) {
    const totalProduk = await DashboardService.getTotalProdukCount()
    const totalBahanBaku = await DashboardService.getTotalBahanBakuCount()
    const minimumStokBahanBaku = await DashboardService.getMinimumStokBahanBakuCount()
    const namaPengguna = user?.nama_pengguna
    const getTotalProduksiHariIniCount = await DashboardService.getTotalProduksiHariIniCount()
    const getTotalResepCount = await DashboardService.getTotalResepCount()
    const getProdukNoResep = await DashboardService.getProdukNoResep()
    const statusStok = await DashboardService.getStatusStok()

    return inertia.render('dashboard/produksi/index', {
      statusStok,
      totalProduk,
      totalBahanBaku,
      minimumStokBahanBaku,
      getTotalProduksiHariIniCount,
      getTotalResepCount,
      getProdukNoResep,
      namaPengguna,
    })
  }
}
