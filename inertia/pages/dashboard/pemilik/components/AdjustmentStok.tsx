import { Link } from '@adonisjs/inertia/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/id'
import Paragraph from '~/components/ui/Paragraph'

dayjs.extend(relativeTime)
dayjs.locale('id')

type RequestItem = {
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
}

type Props = {
  requests: RequestItem[]
}

export default function AdjustmentStok({ requests }: Props) {
  return (
    <>
      <Paragraph size="lg" color="dark_grey">
        Approval Request Adjustment Stok
      </Paragraph>
      <div className="flex flex-col gap-4 bg-white shadow-md px-5 py-5 rounded-md">
        <div className="flex flex-row items-center gap-4">
          <Paragraph size="md" color="dark_grey">
            Menunggu Persetujuan Pemilik
          </Paragraph>
          <span className="text-yellow-500 font-bold text-sm uppercase">
            {requests.length} Pending
          </span>
        </div>

        {requests.length > 0 ? (
          requests.map((item, index) => (
            <div
              key={index}
              className={`flex flex-row ${
                index !== requests.length - 1 ? 'pb-4 border-b border-gray-200' : ''
              } overflow-y-auto`}
            >
              <div className="flex flex-col gap-2 flex-1">
                <Paragraph size="lg" color="dark_slate_grey">
                  Adjustment Stok [{item.produk?.nama_produk || item.bahan?.nama_bahan_baku}]
                </Paragraph>
                <div className="flex flex-row gap-3 flex-wrap">
                  <span className="text-dark-grey">
                    Diajukan oleh{' '}
                    <strong className="font-semibold">{item.pengguna?.nama_pengguna}</strong>
                  </span>
                  <span className="text-dark-grey">
                    Adjustment Stok{' '}
                    <strong className="font-semibold">
                      {item.jumlah} {item.produk?.satuan || item.bahan?.satuan}
                    </strong>
                  </span>
                  <span className="text-dark-grey">
                    Tanggal Pengajuan :{' '}
                    <strong className="font-semibold">
                      {dayjs(item.tanggal_adjustment).fromNow()}
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
    </>
  )
}
