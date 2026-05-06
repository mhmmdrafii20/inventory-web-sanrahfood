import Heading from '~/components/ui/Heading'
import { usePage } from '@inertiajs/react'
import RingkasanStok from '~/components/dashboard/RingkasanStok'
import { Link } from '@adonisjs/inertia/react'
import Paragraph from '~/components/ui/Paragraph'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/id'
import StatusStok from '~/components/dashboard/StatusStok'

dayjs.extend(relativeTime)
dayjs.locale('id')

export default function Index() {
  const {
    totalBahanBaku,
    totalProduk,
    minimumStokBahanBaku,
    minimumStokProduk,
    statusStok,
    adjustmentRequestData,
    pendingRequestAdjustmentStokCount,
    rejectedRequestAdjustmentStokCount,
    approvedRequestAdjustmentStokCount,
    allRequestAdjustmentStokCount,
    namaPengguna,
  } = usePage<{
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
    minimumStokBahanBaku: number
    pendingRequestAdjustmentStokCount: number
    rejectedRequestAdjustmentStokCount: number
    approvedRequestAdjustmentStokCount: number
    allRequestAdjustmentStokCount: number
    adjustmentRequestData: {
      jenis_stok: string
      id_produk?: string
      id_bahan_baku?: string
      produk?: { nama_produk: string; satuan: string }
      bahan?: { nama_bahan_baku: string; satuan: string }
      jumlah: number
      status_adjustment: string
      tanggal_adjustment: string
    }[]
    namaPengguna: string
  }>().props

  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        Selamat Datang, {namaPengguna}
      </Heading>
      <Paragraph size="lg" color="dark_grey" className="mt-5">
        Ringkasan Stok
      </Paragraph>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
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
        <div className="bg-white shadow-md px-5 py-5 rounded-xl border-l-4 border-l-dark-teal">
          <div className="flex flex-col ">
            <Heading level={3} color="dark_grey">
              Request Adjustment Stok Saya
            </Heading>
            <Heading level={1} color="ultra_light_grey" className="font-bold">
              {allRequestAdjustmentStokCount}
            </Heading>
            <div className=" border-t border-gray-200">
              <div className="flex flex-row gap-3 items-center mt-2 flex-wrap">
                <span className="text-green-600 font-semibold text-xs">
                  Approved Request <strong>{approvedRequestAdjustmentStokCount}</strong>
                </span>
                <span className="text-yellow-500 font-semibold text-xs">
                  Pending Request <strong>{pendingRequestAdjustmentStokCount}</strong>
                </span>
                <span className="text-red-600 font-semibold text-xs">
                  Rejected Request <strong>{rejectedRequestAdjustmentStokCount}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Paragraph size="lg" color="dark_grey" className="mt-5 mb-2">
        Status Request Adjustment Stok & Status Stok Bahan Baku & Produk
      </Paragraph>
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <div className="flex-1 flex flex-col gap-4 bg-white shadow-md px-5 py-5 rounded-md overflow-y-auto">
          <div className="flex flex-row gap-3 items-center">
            <Paragraph color="dark_slate_grey" size="md">
              Status Request Adjustment Stok
            </Paragraph>
            <span className=" text-yellow-500 font-bold  px-2 py-1 uppercase">
              {adjustmentRequestData.filter((item) => item.status_adjustment === 'PENDING').length}{' '}
              pending
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {adjustmentRequestData.map((items, index) => (
              <div
                key={index}
                className={` ${
                  index !== adjustmentRequestData.length - 1 ? 'pb-4 border-b border-gray-200' : ''
                } overflow-y-auto`}
              >
                <div className="flex flex-row gap-2">
                  <Paragraph color="dark_slate_grey" size="md" className="flex-1">
                    Adjustment Stok [{items.produk?.nama_produk ?? items.bahan?.nama_bahan_baku}]
                  </Paragraph>
                  <span
                    className={`font-bold text-sm px-2 py-1 rounded-full uppercase ${
                      items.status_adjustment === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-500'
                        : items.status_adjustment === 'APPROVED'
                          ? 'bg-green-100 text-green-500'
                          : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {items.status_adjustment}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-dark-grey">
                    Adjustment Stok{' '}
                    <strong>
                      {items.jumlah} {items.produk?.satuan ?? items.bahan?.satuan}
                    </strong>
                  </span>
                  <span className="text-dark-grey mb-2">
                    Tanggal Pengajuan <strong>{dayjs(items.tanggal_adjustment).fromNow()}</strong>
                  </span>
                </div>
                <Link
                  route={
                    items.id_bahan_baku && !items.id_produk
                      ? 'stokBahanBaku.status'
                      : 'stokProduk.status'
                  }
                  className="text-blue-500 font-semibold text-sm"
                >
                  Lihat lebih lanjut →
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-80">
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
      </div>
    </>
  )
}
