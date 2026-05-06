import Heading from '~/components/ui/Heading'
import Paragraph from '~/components/ui/Paragraph'
import { usePage } from '@inertiajs/react'
import 'apexcharts/bar'
import 'apexcharts/features/legend'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/id'
import { options } from '../../../../utils/apexcharts'
import RingkasanStok from '../../../components/dashboard/RingkasanStok'
import AdjustmentStok from './components/AdjustmentStok'
import StatusStok from '../../../components/dashboard/StatusStok'
import MonitoringChart from './components/MonitoringChart'

dayjs.extend(relativeTime)
dayjs.locale('id')

export default function Index() {
  const {
    produkPenjualanBulanan,
    totalBahanBaku,
    totalProduk,
    minimumStokProduk,
    pendingRequestAdjustmentStokCount,
    pendingRequestAdjustmentData,
    supplierCount,
    minimumStokBahanBaku,
    statusStok,
    stokBahanBakuPalingBoros,
    namaPengguna,
  } = usePage<{
    produkPenjualanBulanan: { categories: string[]; series: { name: string; data: number[] }[] }
    stokBahanBakuPalingBoros: { categories: string[]; series: { name: string; data: number[] }[] }
    pendingRequestAdjustmentData: {
      combinedRequest: {
        id_stok_produk_adjustment: number | null
        id_stok_bahan_baku_adjustment: number | null
        id_produk: number | null
        id_bahan_baku: number | null
        id_pengguna: string
        jenis_stok: string
        jumlah: number
        status_adjustment: string
        tanggal_adjustment: string
        catatan_tambahan: string
        approved_by: string | null
        approved_at: string | null
        bahan: { nama_bahan_baku: string; satuan: string } | null
        produk: { nama_produk: string; satuan: string } | null
        pengguna: { nama_pengguna: string }
      }[]
    }
    statusStok: {
      stokProduk: {
        jumlah_stok: number
        nama: string
        stok_minimum: number
        satuan: string
        status: 'kritis' | 'warning' | 'aman'
      }[]
      stokBahanBaku: {
        jumlah_stok: number
        nama: string
        stok_minimum: number
        satuan: string
        status: 'kritis' | 'warning' | 'aman'
      }[]
    }
    totalBahanBaku: number
    totalProduk: number
    minimumStokProduk: number
    pendingRequestAdjustmentStokCount: number
    supplierCount: number
    minimumStokBahanBaku: number
    namaPengguna: string
  }>().props
  const optionsProdukPenjualanBulanan = options(
    'produkPenjualanBulanan',
    '100%',
    produkPenjualanBulanan?.categories
  )
  const optionsBahanBakuPalingBoros = options(
    'stokBahanBakuPalingBoros',
    '100%',
    stokBahanBakuPalingBoros?.categories
  )
  const month = new Date().toLocaleString('id-ID', {
    month: 'long',
  })
  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        Selamat Datang, {namaPengguna}
      </Heading>
      <div className="flex flex-col gap-5 mt-5 ">
        <Paragraph size="lg" color="dark_grey">
          Ringkasan Stok
        </Paragraph>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <RingkasanStok
            title="Total Bahan Baku"
            total={totalBahanBaku}
            statusColor={
              minimumStokBahanBaku ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'
            }
            status={minimumStokBahanBaku ? `${minimumStokBahanBaku} Stok Kritis` : 'Stok Aman'}
          />
          <RingkasanStok
            title="Total Produk"
            total={totalProduk ?? 0}
            statusColor={
              minimumStokProduk ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'
            }
            status={minimumStokProduk ? `${minimumStokProduk} Stok Kritis` : 'Stok Aman'}
          />
          <RingkasanStok
            title="Request Adjustment Stok"
            total={pendingRequestAdjustmentStokCount}
            statusColor={
              pendingRequestAdjustmentStokCount
                ? 'text-yellow-500 font-semibold'
                : 'text-green-600 font-semibold'
            }
            status={pendingRequestAdjustmentStokCount ? 'Pending' : 'Tidak ada adjustment'}
          />
          <RingkasanStok
            title="Supplier Aktif"
            total={supplierCount}
            statusColor={
              supplierCount ? ' text-green-600 font-semibold' : 'text-red-600 font-semibold'
            }
            status={supplierCount ? 'Semua Aktif' : 'Tidak ada supplier'}
          />
        </div>
        <AdjustmentStok requests={pendingRequestAdjustmentData.combinedRequest} />
        <Paragraph size="lg" color="dark_grey">
          Monitoring Stok dan Penjualan
        </Paragraph>
        <div className="flex flex-row gap-5 w-full">
          <MonitoringChart
            title={`Penjualan Produk Bulan ${month}`}
            options={optionsProdukPenjualanBulanan}
            series={produkPenjualanBulanan?.series ?? []}
          />
          <div className="flex flex-col gap-4">
            <StatusStok
              title="Stok Produk Status"
              data={statusStok?.stokProduk ?? []}
              linkLabel="Lihat stok produk"
              linkRoute="stokProduk.index"
              width="w-[300px]"
            />
            <StatusStok
              title="Stok Bahan Baku Status"
              data={statusStok?.stokBahanBaku ?? []}
              linkLabel="Lihat stok bahan baku"
              linkRoute="stokBahan.index"
              width="w-[300px]"
            />
          </div>
          <MonitoringChart
            title="Bahan Baku Paling Boros 30 Hari Terakhir"
            options={optionsBahanBakuPalingBoros}
            series={stokBahanBakuPalingBoros?.series ?? []}
          />
        </div>
      </div>
    </>
  )
}
