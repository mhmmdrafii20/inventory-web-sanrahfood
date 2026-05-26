import Heading from '~/components/ui/Heading'
import Paragraph from '~/components/ui/Paragraph'
import { usePage, useForm } from '@inertiajs/react'
import 'dayjs/locale/id'
import Button from '~/components/ui/Button/Button'
import { SubmitEvent } from 'react'
import Input from '~/components/ui/Input'

export default function Laporan() {
  const { laporanData } = usePage<{
    laporanData: {
      nama_produk: string
      satuan: string
      total_penjualan: number
      total_produksi: number
      adjustment_masuk: number
      adjustment_keluar: number
    }[]
  }>().props
  console.log(laporanData)
  const { data, setData, get, processing } = useForm({
    tanggal_awal: '',
    tanggal_akhir: '',
  })

  const handleExportPdf = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const query = new URLSearchParams(data).toString()
    window.open(`/laporan-produk/generate-pdf?${query}`, '_blank')
  }
  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        {' '}
        Laporan Stok Produk
      </Heading>
      <div className="flex flex-col  w-full bg-white shadow-md rounded-md p-5">
        <form className="flex flex-row gap-5 mt-5 items-center">
          <Paragraph size="lg"> Tanggal Awal</Paragraph>
          <Input
            type="date"
            variant={1}
            size="md"
            value={data.tanggal_awal}
            onChange={(e) => setData('tanggal_awal', e.target.value)}
          />
          <Paragraph size="lg"> Tanggal Akhir</Paragraph>
          <Input
            type="date"
            variant={1}
            size="md"
            value={data.tanggal_akhir}
            onChange={(e) => setData('tanggal_akhir', e.target.value)}
          />
          <Button type="button" variant={1} size="md" onClick={handleExportPdf}>
            Export PDF
          </Button>
        </form>
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full border-collapse mt-5 bg-white">
            <thead>
              <tr>
                <th className="border border-gray-300 py-3">Nama Produk</th>
                <th className="border border-gray-300 py-3">Total Produksi</th>
                <th className="border border-gray-300 py-3">Total Penjualan</th>
                <th className="border border-gray-300 py-3">Adjustment Masuk</th>
                <th className="border border-gray-300 py-3">Adjustment Keluar</th>
              </tr>
            </thead>
            <tbody>
              {laporanData.length > 0 ? (
                laporanData?.map((items, i) => (
                  <tr key={i}>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items?.nama_produk}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">
                        {items.total_produksi ?? 0} {items.satuan}
                      </Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.total_penjualan ?? 0}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">
                        {items.adjustment_masuk ?? 0} {items.satuan}
                      </Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">
                        {items.adjustment_keluar ?? 0} {items.satuan}
                      </Paragraph>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border border-gray-300">
                  <td colSpan={8} className="text-center py-4">
                    <Paragraph size="lg">Tidak Ada Laporan Stok Produk</Paragraph>
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
