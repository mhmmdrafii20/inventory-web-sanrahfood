import { Link } from '@adonisjs/inertia/react'
import Heading from '~/components/ui/Heading'
import Paragraph from '~/components/ui/Paragraph'
import { usePage } from '@inertiajs/react'
import Chart from 'react-apexcharts/core'
import 'apexcharts/bar'
import 'apexcharts/features/legend'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/id'

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
    stokProdukKosong,
    stokBahanBakuKosong,
  } = usePage<{
    produkPenjualanBulanan: { categories: string[]; series: { name: string; data: number[] }[] }
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
    stokProdukKosong: {
      produk: {
        namaProduk: string
        satuan: string
        kategori: {
          namaKategori: string
        }
      }
      jumlahStok: number
    }[]
    stokBahanBakuKosong: {
      bahan: {
        namaBahanBaku: string
        satuan: string
      }
      jumlahStok: number
    }[]
    totalBahanBaku: number
    totalProduk: number
    minimumStokProduk: number
    pendingRequestAdjustmentStokCount: number
    supplierCount: number
    minimumStokBahanBaku: number
  }>().props
  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: produkPenjualanBulanan?.categories ?? [],
    },
  }
  const monthName = new Date().toLocaleString('id-ID', {
    month: 'long',
  })

  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        Selamat Datang, [Nama User]
      </Heading>
      <div className="flex flex-col gap-5 mt-5 ">
        <Paragraph size="lg" color="dark_grey">
          Ringkasan Stok
        </Paragraph>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <div className="bg-white shadow-md px-5 py-5 rounded-xl border-l-4 border-l-dark-teal">
            <div className="flex flex-col ">
              <Heading level={3} color="dark_grey">
                Total Bahan Baku
              </Heading>
              <Heading level={1} color="ultra_light_grey" className="font-bold">
                {totalBahanBaku}
              </Heading>
              <div className="flex flex-row gap-3">
                <span
                  className={`text-sm uppercase ${
                    minimumStokBahanBaku
                      ? 'text-red-600 font-semibold'
                      : 'text-green-600 font-semibold'
                  }`}
                >
                  {minimumStokBahanBaku ? `${minimumStokBahanBaku} Stok Kritis` : 'Stok Aman'}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md px-5 py-5 rounded-xl border-l-4 border-l-dark-teal">
            <div className="flex flex-col">
              <Heading level={3} color="dark_grey">
                Total Produk
              </Heading>
              <Heading level={1} color="ultra_light_grey" className="font-bold">
                {totalProduk ?? 0}
              </Heading>
              <div className="flex flex-row gap-3">
                <span
                  className={`text-sm uppercase ${
                    minimumStokProduk
                      ? 'text-red-600 font-semibold'
                      : 'text-green-600 font-semibold'
                  }`}
                >
                  {minimumStokProduk ? `${minimumStokProduk} Stok Kritis` : 'Stok Aman'}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md px-5 py-5 rounded-xl border-l-4 border-l-dark-teal">
            <div className="flex flex-col">
              <Heading level={3} color="dark_grey">
                Request Adjustment Stok
              </Heading>
              <Heading level={1} color="ultra_light_grey" className="font-bold">
                {pendingRequestAdjustmentStokCount}
              </Heading>
              <span
                className={`${
                  pendingRequestAdjustmentStokCount ? 'text-yellow-500' : 'text-green-500'
                } font-semibold text-sm uppercase`}
              >
                {pendingRequestAdjustmentStokCount ? 'Pending' : 'Tidak ada adjustment'}
              </span>
            </div>
          </div>
          <div className="bg-white shadow-md px-5 py-5 rounded-xl border-l-4 border-l-dark-teal">
            <div className="flex flex-col">
              <Heading level={3} color="dark_grey">
                Supplier Aktif
              </Heading>
              <Heading level={1} color="ultra_light_grey" className="font-bold">
                {supplierCount}
              </Heading>
              <span
                className={`${
                  supplierCount ? 'text-green-500' : 'text-red-500'
                } font-semibold text-sm uppercase`}
              >
                {supplierCount ? 'Semua Aktif' : 'Tidak ada supplier'}
              </span>
            </div>
          </div>
        </div>
        <Paragraph size="lg" color="dark_grey">
          Approval Request Adjustment Stok
        </Paragraph>
        <div className="flex flex-col gap-4 bg-white shadow-md px-5 py-5 rounded-md">
          <div className="flex flex-row items-center gap-4">
            <Paragraph size="md" color="dark_grey">
              Menunggu Persetujuan Pemilik
            </Paragraph>
            <span className="text-yellow-500 font-bold text-sm uppercase">
              {pendingRequestAdjustmentData.combinedRequest.length} Pending
            </span>
          </div>
          {pendingRequestAdjustmentData.combinedRequest?.length > 0 ? (
            pendingRequestAdjustmentData.combinedRequest.map((item, index) => (
              <div
                className={`flex flex-row ${index !== pendingRequestAdjustmentData.combinedRequest.length - 1 ? 'pb-4 border-b border-gray-200' : ''} overflow-y-auto`}
              >
                <div className="flex flex-col gap-2 flex-1">
                  <Paragraph size="lg" color="dark_slate_grey">
                    Adjustment Stok [{item?.produk?.nama_produk || item?.bahan?.nama_bahan_baku}]
                  </Paragraph>
                  <div className="flex flex-row gap-3 flex-wrap">
                    <span className="text-dark-grey">
                      Diajukan oleh{' '}
                      <strong className="font-semibold">{item.pengguna?.nama_pengguna}</strong>
                    </span>
                    <span className="text-dark-grey">
                      Adjustment Stok{' '}
                      <strong className="font-semibold">
                        {item.jumlah} {item.produk?.satuan || item?.bahan?.satuan}
                      </strong>
                    </span>
                    <span className="text-dark-grey">
                      Tanggal Pengajuan :{' '}
                      <strong className="font-semibold">
                        {' '}
                        {dayjs(item.tanggal_adjustment).format('D MMM YYYY')}
                      </strong>
                    </span>
                  </div>
                  <Link
                    route="approval-stok-produk.index"
                    className="text-blue-500 font-semibold text-sm"
                  >
                    Lihat detail →
                  </Link>
                </div>
                {item.id_stok_bahan_baku_adjustment && (
                  <span className="text-lime-500 font-semibold text-sm uppercase">Bahan Baku</span>
                )}
                {item.id_stok_produk_adjustment && (
                  <span className="text-cyan-500 font-semibold text-sm uppercase">Produk</span>
                )}
              </div>
            ))
          ) : (
            <Paragraph size="md" color="dark_grey">
              Tidak ada pending request adjustment stok
            </Paragraph>
          )}
        </div>
        <Paragraph size="lg" color="dark_grey">
          Monitoring Stok & Produksi
        </Paragraph>
        <div className="flex flex-row gap-5 w-full">
          <div className="bg-white shadow-md px-5 py-5 rounded-md w-fit">
            <Paragraph size="md" color="dark_slate_grey">
              Penjualan Produk Bulan {monthName}
            </Paragraph>
            <Chart
              options={options}
              series={produkPenjualanBulanan?.series ?? []}
              type="bar"
              width={500}
              height={250}
            />
          </div>
          {/* STOK BAHAN BAKU & STOK PRODUK YANG KOSONG*/}
          <div className="flex flex-col gap-4">
            <div className="bg-white shadow-md px-5 py-5 rounded-md w-[300px] h-fit overflow-y-auto">
              <div className="flex flex-row ">
                <Paragraph size="md" color="dark_slate_grey" className="flex-1">
                  Stok Produk Kosong
                </Paragraph>
                {stokProdukKosong?.length > 0 && (
                  <span className="text-red-500 font-bold text-sm bg-red-100 px-2 py-1 rounded-full">
                    {stokProdukKosong.length} kosong
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4 mt-4">
                {stokProdukKosong?.length > 0 ? (
                  stokProdukKosong.map((item, index) => (
                    <div
                      className={`flex flex-row ${index !== stokProdukKosong.length - 1 ? 'pb-4 border-b border-gray-200' : ''} overflow-y-auto`}
                    >
                      <div className="flex flex-row items-center gap-2 flex-1">
                        <div className="flex flex-col gap-1 flex-1">
                          <Paragraph size="lg" color="dark_slate_grey">
                            {item?.produk?.namaProduk}
                          </Paragraph>
                          <Paragraph size="sm" color="dark_grey">
                            Kategori : {item?.produk?.kategori?.namaKategori}
                          </Paragraph>
                        </div>
                        <span className="text-red-500 font-bold text-sm bg-red-100 px-2 py-1 rounded-full">
                          {item?.jumlahStok} {item?.produk?.satuan}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <Paragraph size="md" color="dark_grey">
                    Tidak ada stok produk kosong
                  </Paragraph>
                )}
                <div className="border-t border-gray-200 pt-3 flex items-center ">
                  <Link route="stokProduk.index" className="text-blue-500 font-semibold text-sm">
                    Lihat stok produk →
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-md px-5 py-5 rounded-md w-[300px] h-fit overflow-y-auto">
              <div className="flex flex-row ">
                <Paragraph size="md" color="dark_slate_grey" className="flex-1">
                  Stok Bahan Baku Kosong
                </Paragraph>
                {stokBahanBakuKosong?.length > 0 && (
                  <span className="text-red-500 font-bold text-sm bg-red-100 px-2 py-1 rounded-full">
                    {stokBahanBakuKosong.length} kosong
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4 mt-4">
                {stokBahanBakuKosong?.length > 0 ? (
                  stokBahanBakuKosong.map((item, index) => (
                    <div
                      className={`flex flex-row ${index !== stokBahanBakuKosong.length - 1 ? 'pb-4 border-b border-gray-200' : ''} overflow-y-auto`}
                    >
                      <div className="flex flex-row items-center gap-2 flex-1">
                        <div className="flex flex-col gap-1 flex-1">
                          <Paragraph size="lg" color="dark_slate_grey">
                            {item?.bahan?.namaBahanBaku}
                          </Paragraph>
                        </div>
                        <span className="text-red-500 font-bold text-sm bg-red-100 px-2 py-1 rounded-full">
                          {item?.jumlahStok} {item?.bahan?.satuan}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <Paragraph size="md" color="dark_grey">
                    Tidak ada stok bahan baku kosong
                  </Paragraph>
                )}
                <div className="border-t border-gray-200 pt-3 flex items-center ">
                  <Link route="stokBahan.index" className="text-blue-500 font-semibold text-sm">
                    Lihat stok bahan baku →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
