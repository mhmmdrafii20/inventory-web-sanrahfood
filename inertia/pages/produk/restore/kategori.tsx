import Heading from '~/components/ui/Heading'
import { usePage, useForm, router } from '@inertiajs/react'
import { FaSearch } from 'react-icons/fa'
import ActionButton from '~/components/ui/Button/ActionButton'
import Input from '~/components/ui/Input'
import { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import Paragraph from '~/components/ui/Paragraph'
import { showRestoreDialog } from '../../../../utils/sweetalert'

export default function kategori() {
  const [searchData, setSearchData] = useState('')
  const { kategori, searchRes } = usePage<{
    kategori: { idKategori: number; namaKategori: string; deleted_at: string }[]
    searchRes: { idKategori: number; namaKategori: string; deleted_at: string }[]
  }>().props
  const { patch } = useForm()

  function handleSearch() {
    router.get(
      `/kategori-produk/trash/search`,
      { search: searchData },
      {
        preserveState: true,
        replace: true,
      }
    )
  }
  const displayKategori = searchRes && searchRes.length > 0 ? searchRes : kategori
  const DIALOG_MESSAGE = 'Data akan dipindahkan kembali ke halaman manajemen kategori produk.'
  function handleRestore(id: number) {
    showRestoreDialog(DIALOG_MESSAGE, () => {
      patch(`/kategori-produk/restore/${id}`)
    })
  }
  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        Arsip Data
      </Heading>
      <div className="flex flex-col gap-5  bg-white shadow-md rounded-md p-5">
        <div className="flex flex-row gap-3 items-center">
          <Input
            variant={1}
            size="md"
            type="text"
            placeholder="Cari Nama Kategori Produk...."
            className="flex-1"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <ActionButton as="button" type="search" size="lg" onClick={handleSearch}>
            <FaSearch />
          </ActionButton>
        </div>
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr>
              <th className="border border-gray-300 py-3">Nama Kategori Produk</th>
              <th className="border border-gray-300 py-3">Tanggal Dihapus</th>
              <th className="border border-gray-300 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayKategori?.length > 0 ? (
              displayKategori.map((items) => (
                <tr key={items.idKategori}>
                  <td className="border border-gray-300 py-3 px-5">
                    <Paragraph size="lg">{items.namaKategori}</Paragraph>
                  </td>
                  <td className="border border-gray-300 py-3 px-5">
                    <Paragraph size="lg">{dayjs(items.deleted_at).format('DD/MM/YYYY')}</Paragraph>
                  </td>
                  <td className="border border-gray-300 py-3 px-5">
                    <div className="flex flex-row gap-2 justify-center">
                      <ActionButton
                        type="restore"
                        size="sm"
                        title="Pulihkan data kembali"
                        onClick={() => handleRestore(items.idKategori)}
                      >
                        Restore
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border border-gray-300">
                <td colSpan={7} className="text-center py-4">
                  <Paragraph size="lg">Tidak Ada Data Sampah Kategori Produk</Paragraph>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
