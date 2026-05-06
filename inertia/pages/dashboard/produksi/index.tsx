import Paragraph from '~/components/ui/Paragraph'
import Heading from '~/components/ui/Heading'
import { usePage } from '@inertiajs/react'
import RingkasanStok from '~/components/dashboard/RingkasanStok'
import { Link } from '@adonisjs/inertia/react'
import StatusStok from '~/components/dashboard/StatusStok'

export default function index() {
  const {
    totalBahanBaku,
    minimumStokBahanBaku,
    getTotalProduksiHariIniCount,
    getTotalResepCount,
    namaPengguna,
    getProdukNoResep,
    statusStok,
  } = usePage<{
    totalBahanBaku: number
    minimumStokBahanBaku: number
    namaPengguna: string
    getTotalProduksiHariIniCount: number
    getTotalResepCount: number
    getProdukNoResep: { namaProduk: string; satuan: string; kategori: { namaKategori: string } }[]
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
  }>().props

  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        Selamat Datang, {namaPengguna}
      </Heading>
      <Paragraph size="lg" color="dark_grey" className="mt-5">
        Ringkasan Stok
      </Paragraph>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 mt-5">
        <RingkasanStok
          title="Total Produksi"
          total={getTotalProduksiHariIniCount}
          status={
            getTotalProduksiHariIniCount <= 0 ? 'Belum Produksi Hari Ini' : 'Produksi hari ini'
          }
          statusColor={
            getTotalProduksiHariIniCount <= 0
              ? 'text-red-600 font-semibold'
              : 'text-green-600 font-semibold'
          }
        />
        <RingkasanStok
          title="Total Bahan Baku"
          total={totalBahanBaku}
          statusColor={
            minimumStokBahanBaku ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'
          }
          status={minimumStokBahanBaku ? `${minimumStokBahanBaku} Stok Kritis` : 'Stok Aman'}
        />
        <RingkasanStok
          title="Total Resep"
          total={getTotalResepCount}
          status={getTotalResepCount <= 0 ? 'Belum Ada Resep' : 'Resep Tersedia'}
          statusColor={
            getTotalResepCount <= 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'
          }
        />
      </div>
      <div className="flex flex-row gap-5 w-full">
        <div className="flex flex-col mt-5">
          <div className="bg-white shadow-md px-5 py-5 rounded-md">
            <div className="flex flex-row items-center gap-5 border-b border-gray-200 pb-3">
              <div>
                <Paragraph size="md" color="dark_slate_grey">
                  Produk yang belum memiliki resep
                </Paragraph>
                <span className="text-dark-grey">Perlu dibuatkan resep sebelum produksi</span>
              </div>
              <Paragraph
                size="md"
                color="dark_grey"
                className={
                  getProdukNoResep.length <= 0
                    ? 'bg-green-500 text-white rounded-full px-3'
                    : 'bg-red-500 text-white rounded-full px-3'
                }
              >
                {getProdukNoResep.length <= 0 ? 0 : getProdukNoResep.length}
              </Paragraph>
            </div>
            {getProdukNoResep.length === 0 ? (
              <div className="flex flex-row items-center gap-5">
                <Paragraph size="lg" color="dark_slate_grey">
                  Tidak ada produk yang belum memiliki resep
                </Paragraph>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-5 overflow-y-auto">
                {getProdukNoResep.map((item, index) => (
                  <div key={index} className="flex flex-col border border-gray-200 p-3 rounded-md">
                    <Paragraph color="dark_slate_grey" size="md" className="flex-1">
                      {item.namaProduk}
                    </Paragraph>
                    <Paragraph color="dark_grey" size="sm">
                      {item.kategori.namaKategori}
                    </Paragraph>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex">
                    <Link
                      route="resep.index"
                      className="bg-dark-teal text-white mx-auto w-full px-4 py-2 rounded-md font-semibold text-sm  text-center hover:bg-dark_slate_grey transition duration-300"
                    >
                      Buatkan Resep
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-5 flex-1">
          <StatusStok
            title="Stok Bahan Baku Status"
            data={statusStok?.stokBahanBaku ?? []}
            linkLabel="Lihat stok bahan baku"
            linkRoute="stokBahan.index"
            width="w-full"
          />
        </div>
      </div>
    </>
  )
}
