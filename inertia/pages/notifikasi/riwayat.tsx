import Heading from '~/components/ui/Heading'
import Paragraph from '~/components/ui/Paragraph'
import { usePage, useForm } from '@inertiajs/react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import Button from '~/components/ui/Button/Button'
import { SubmitEvent } from 'react'
import Input from '~/components/ui/Input'

export default function Riwayat() {
  const { riwayatNotifikasi, filteredRiwayatNotifikasi } = usePage<{
    riwayatNotifikasi: {
      idRiwayatNotifikasi: number
      idTipeNotifikasi: number
      namaPenerima: string
      nomorTelepon: string
      status: string
      errorMessage: number
      tipeNotifikasi: string
      tanggalDikirim: string
    }[]
    filteredRiwayatNotifikasi: {
      idRiwayatNotifikasi: number
      idTipeNotifikasi: number
      namaPenerima: string
      nomorTelepon: string
      status: string
      errorMessage: number
      tipeNotifikasi: string
      tanggalDikirim: string
    }[]
  }>().props

  const { data, setData, get, processing } = useForm({
    tanggal_awal: '',
    tanggal_akhir: '',
  })

  const displayRiwayatNotifikasi =
    filteredRiwayatNotifikasi && filteredRiwayatNotifikasi.length > 0
      ? filteredRiwayatNotifikasi
      : riwayatNotifikasi

  const handleFilter = (e: SubmitEvent) => {
    e.preventDefault()
    get('/riwayat-notifikasi/filter', {
      replace: true,
      preserveState: true,
    })
  }

  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        {' '}
        Riwayat Notifikasi
      </Heading>
      <div className="flex flex-col  w-full bg-white shadow-md rounded-md p-5">
        <form onSubmit={handleFilter} className="flex flex-row gap-5 mt-5 items-center">
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
          <Button type="submit" variant={1} disabled={processing} size="md">
            {processing ? 'Filtering...' : 'Filter'}
          </Button>
        </form>
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full border-collapse mt-5 bg-white">
            <thead>
              <tr>
                <th className="border border-gray-300 py-3">Nama Penerima</th>
                <th className="border border-gray-300 py-3">Nomor Telepon</th>
                <th className="border border-gray-300 py-3">Tipe Notifikasi</th>
                <th className="border border-gray-300 py-3">Pesan</th>
                <th className="border border-gray-300 py-3">Status</th>
                <th className="border border-gray-300 py-3">Tanggal Dikirim</th>
              </tr>
            </thead>
            <tbody>
              {displayRiwayatNotifikasi?.length > 0 ? (
                displayRiwayatNotifikasi?.map((items) => (
                  <tr key={items.idRiwayatNotifikasi}>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items?.namaPenerima}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.nomorTelepon}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.tipeNotifikasi}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.pesan}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.status}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">
                        {dayjs(items.tanggalDikirim).format('DD/MM/YYYY')}
                      </Paragraph>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border border-gray-300">
                  <td colSpan={6} className="text-center py-4">
                    <Paragraph size="lg">Tidak Ada Riwayat Notifikasi</Paragraph>
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
