import Heading from '~/components/ui/Heading'
import Paragraph from '~/components/ui/Paragraph'
import { usePage } from '@inertiajs/react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

export default function Status() {
  const { adjustmentProduk } = usePage<{
    adjustmentProduk: {
      idStokProdukAdjustment: number
      idProduk: number
      jenisStok: string
      jumlah: number
      statusAdjustment: string
      approvedBy: string | null
      approvedAt: string | null
      produk: { namaProduk: string; satuan: string }
    }[]
  }>().props

  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        Status Adjustment Stok
      </Heading>
      <div className="flex flex-col w-full bg-white shadow-md rounded-md p-5">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full border-collapse mt-5 bg-white">
            <thead>
              <tr>
                <th className="border border-gray-300 py-3">Nama Produk</th>
                <th className="border border-gray-300 py-3">Jenis Stok</th>
                <th className="border border-gray-300 py-3">Jumlah</th>
                <th className="border border-gray-300 py-3">Status Adjustment</th>
                <th className="border border-gray-300 py-3">Approved By</th>
                <th className="border border-gray-300 py-3">Approved At</th>
              </tr>
            </thead>
            <tbody>
              {adjustmentProduk?.length > 0 ? (
                adjustmentProduk.map((items) => (
                  <tr key={items.idStokProdukAdjustment}>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.produk.namaProduk}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph
                        size="lg"
                        className={`${items.jenisStok === 'MASUK' ? 'text-green-800 font-bold' : 'text-red-500 font-bold'}`}
                      >
                        {items.jenisStok}
                      </Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">
                        {items.jumlah} {items.produk.satuan}
                      </Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <span
                        className={`px-2 py-1 rounded-sm text-white text-sm font-semibold ${
                          items.statusAdjustment === 'APPROVED'
                            ? 'bg-green-600'
                            : items.statusAdjustment === 'REJECTED'
                              ? 'bg-red-500'
                              : 'bg-yellow-500'
                        }`}
                      >
                        {items.statusAdjustment}
                      </span>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.approvedBy ?? '—'}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">
                        {items.approvedAt
                          ? dayjs(new Date(JSON.parse(items.approvedAt))).format('DD/MM/YYYY HH:mm')
                          : '—'}
                      </Paragraph>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border border-gray-300">
                  <td colSpan={6} className="text-center py-4">
                    <Paragraph size="lg">Tidak Ada Data Adjustment</Paragraph>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
