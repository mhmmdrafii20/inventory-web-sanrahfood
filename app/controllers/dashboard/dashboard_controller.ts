import type { HttpContext } from '@adonisjs/core/http'
import DashboardService from '#services/dashboard/DashboardServices'

export default class DashboardController {
  async pemilik({ inertia }: HttpContext) {
    const totalBahanBaku = await DashboardService.getTotalBahanBakuCount()
    const minimumStokBahanBaku = await DashboardService.getMinimumStokBahanBakuCount()
    const pendingRequestAdjustmentStokCount =
      await DashboardService.getPendingRequestAdjustmentStokCount()
    const supplierCount = await DashboardService.getSupplierCount()
    const pendingRequestAdjustmentData = await DashboardService.getPendingRequestAdjustmentData()
    const produkPenjualanBulanan = await DashboardService.getProdukPenjualanBulanan()
    const totalProduk = await DashboardService.getTotalProdukCount()
    const minimumStokProduk = await DashboardService.getMinimumStokProdukCount()
    const stokProdukKosong = await DashboardService.getStokProdukKosong()
    const stokBahanBakuKosong = await DashboardService.getStokBahanBakuKosong()

    return inertia.render('dashboard/pemilik/index', {
      totalBahanBaku,
      minimumStokBahanBaku,
      pendingRequestAdjustmentStokCount,
      supplierCount,
      pendingRequestAdjustmentData,
      produkPenjualanBulanan,
      totalProduk,
      minimumStokProduk,
      stokProdukKosong,
      stokBahanBakuKosong,
    })
  }
  async gudang({ inertia }: HttpContext) {
    return inertia.render('dashboard/gudang/index', {})
  }
  async produksi({ inertia }: HttpContext) {
    return inertia.render('dashboard/produksi/index', {})
  }
}
