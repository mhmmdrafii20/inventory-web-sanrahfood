import Heading from '~/components/ui/Heading'
import Paragraph from '~/components/ui/Paragraph'
import { usePage, router } from '@inertiajs/react'
import Input from '~/components/ui/Input'
import ActionButton from '~/components/ui/Button/ActionButton'
import { FaSearch } from 'react-icons/fa'
import { useState } from 'react'

export default function Stok() {
  const { stokProduk, searchRes } = usePage<{
    stokProduk: {
      idStokProduk: number
      idProduk: number
      jumlahStok: number
      stokMinimum: number
      produk: { namaProduk: string; satuan: string }
    }[]
    searchRes: {
      idStokProduk: number
      idProduk: number
      jumlahStok: number
      stokMinimum: number
      produk: { namaProduk: string; satuan: string }
    }[]
  }>().props

  const [searchData, setSearchData] = useState('')

  function handleSearch() {
    router.get(
      '/stok-produk/search',
      { search: searchData },
      {
        preserveState: true,
        replace: true,
      }
    )
  }
  const displayStokProduk = searchRes && searchRes.length > 0 ? searchRes : stokProduk
  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        {' '}
        Stok Produk
      </Heading>
      <div className="flex flex-col  w-full bg-white shadow-md rounded-md p-5">
        <div className="w-full flex flex-row items-center gap-3">
          <Input
            variant={1}
            size="md"
            type="text"
            placeholder="Carii Nama Produk..."
            className="flex-1"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          ></Input>
          <ActionButton as="button" type="search" size="lg" onClick={handleSearch}>
            <FaSearch />
          </ActionButton>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full border-collapse mt-5 bg-white">
            <thead>
              <tr>
                <th className="border border-gray-300 py-3">Nama Produk</th>
                <th className="border border-gray-300 py-3">Jumlah Stok</th>
                <th className="border border-gray-300 py-3">Stok Minimum</th>
                <th className="border border-gray-300 py-3">Satuan</th>
              </tr>
            </thead>
            <tbody>
              {displayStokProduk?.length > 0 ? (
                displayStokProduk.map((items) => (
                  <tr key={items.idStokProduk}>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.produk.namaProduk}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.jumlahStok}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.stokMinimum}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.produk.satuan}</Paragraph>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border border-gray-300">
                  <td colSpan={7} className="text-center py-4">
                    <Paragraph size="lg">Tidak Ada Stok Produk</Paragraph>
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
