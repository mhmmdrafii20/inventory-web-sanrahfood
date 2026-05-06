import { Link } from '@adonisjs/inertia/react'
import Paragraph from '~/components/ui/Paragraph'

type StokItem = {
  nama: string
  satuan: string
  jumlah_stok: number
  stok_minimum: number
  status: 'kritis' | 'warning' | 'aman'
}

type Props = {
  title: string
  data: StokItem[]
  linkLabel: string
  linkRoute: 'stokProduk.index' | 'stokBahan.index' | 'stokBahanBaku.status' | 'stokProduk.status'
  width: string
}

// mapping style badge berdasarkan status dari backend
const statusStyle = {
  kritis: 'bg-red-100 text-red-500',
  warning: 'bg-yellow-100 text-yellow-500',
  aman: 'bg-green-100 text-green-500',
}

export default function StatusStokCard({ title, data, linkLabel, linkRoute, width }: Props) {
  // hitung jumlah item yang statusnya kritis untuk ditampilkan di header
  const jumlahKritis = data.filter((item) => item.status === 'kritis').length

  return (
    <div className={`bg-white shadow-md px-5 py-5 rounded-md ${width} h-fit overflow-y-auto`}>
      <div className="flex flex-row">
        <Paragraph size="md" color="dark_slate_grey" className="flex-1">
          {title}
        </Paragraph>

        {/* hanya tampilkan badge kritis kalau ada yang kritis */}
        {jumlahKritis > 0 && (
          <span className="text-red-500 font-bold text-sm bg-red-100 px-2 py-1 rounded-full uppercase">
            {jumlahKritis} kritis
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className={`flex flex-row ${
                index !== data.length - 1 ? 'pb-4 border-b border-gray-200' : ''
              } overflow-y-auto`}
            >
              <div className="flex flex-row items-center gap-2 flex-1">
                <div className="flex flex-col gap-1 flex-1">
                  <Paragraph size="lg" color="dark_slate_grey">
                    {item.nama}
                  </Paragraph>
                </div>

                <div className="flex flex-col items-end">
                  {/* badge status — warna ditentukan dari status yang dikirim backend */}
                  <span
                    className={`font-bold text-sm px-2 py-1 rounded-full uppercase ${statusStyle[item.status]}`}
                  >
                    {item.status}
                  </span>

                  {/* tampilkan stok saat ini / stok minimum + satuan */}
                  <span className="text-xs text-gray-500 mt-1">
                    {item.jumlah_stok} / {item.stok_minimum} {item.satuan}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Paragraph size="md" color="dark_grey">
            Tidak ada data stok
          </Paragraph>
        )}

        <div className="border-t border-gray-200 pt-3 flex items-center">
          <Link route={linkRoute} className="text-blue-500 font-semibold text-sm">
            {linkLabel} →
          </Link>
        </div>
      </div>
    </div>
  )
}
