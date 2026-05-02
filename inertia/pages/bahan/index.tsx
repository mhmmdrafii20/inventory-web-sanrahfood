import ActionButton from '~/components/ui/Button/ActionButton'
import Button from '~/components/ui/Button/Button'
import Heading from '~/components/ui/Heading'
import { FaPen, FaSearch, FaTrash, FaTrashRestore } from 'react-icons/fa'
import Paragraph from '~/components/ui/Paragraph'
import { SubmitEvent, useState } from 'react'
import { router, useForm, usePage } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import 'react-responsive-modal/styles.css'
import Modal from 'react-responsive-modal'
import { showDeleteDialog } from '../../../utils/sweetalert'
import Input from '~/components/ui/Input'
import Error from '~/components/ui/Error'

export default function Index() {
  const [open, setIsOpen] = useState(false)
  const { bahan, errors, searchRes } = usePage<{
    bahan: { idBahanBaku: number; namaBahanBaku: string; satuan: string }[]
    searchRes: { idBahanBaku: number; namaBahanBaku: string; satuan: string }[]
  }>().props
  const {
    data,
    setData,
    post,
    get,
    delete: destroy,
    processing,
    reset,
  } = useForm({
    nama_bahan_baku: '',
    satuan: '',
    stok_minimum: '',
  })
  const [searchData, setSearchData] = useState('')

  function handleCreate(e: SubmitEvent) {
    e.preventDefault()
    post('/bahan/create', {
      onSuccess: () => {
        setIsOpen(false)
        reset()
      },
    })
  }
  function handleDelete(id: number) {
    showDeleteDialog(() => {
      destroy(`/bahan/delete/${id}`)
    })
  }
  function handleSearch() {
    router.get(
      '/bahan/search',
      { search: searchData },
      {
        preserveState: true,
        replace: true,
      }
    )
  }
  const displayBahan = searchRes && searchRes.length > 0 ? searchRes : bahan

  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        Manajemen Bahan Baku
      </Heading>
      <div className="flex flex-col  w-full bg-white shadow-md rounded-md p-5">
        <div className="flex flex-row justify-between mt-5">
          <Button onClick={() => setIsOpen(true)} variant={1} size="md">
            Tambah Bahan Baku
          </Button>
          <Modal
            open={open}
            onClose={() => setIsOpen(false)}
            center
            styles={{ modal: { width: '1024px' } }}
          >
            <Heading level={1} color="dark_slate_grey" className="font-bold">
              Tambah Bahan Baku
            </Heading>
            <form className="flex flex-col gap-2" onSubmit={handleCreate}>
              <Paragraph size="lg">Nama Bahan Baku</Paragraph>
              <Input
                variant={1}
                size="md"
                type="text"
                name="nama_bahan_baku"
                value={data.nama_bahan_baku}
                onChange={(e) => setData('nama_bahan_baku', e.target.value)}
                placeholder="Nama Bahan Baku"
              />
              {errors.nama_bahan_baku && <Error variant={1}>{errors.nama_bahan_baku}</Error>}
              <div className="flex flex-col gap-2">
                <Paragraph size="lg">Satuan</Paragraph>
                <Input
                  variant={1}
                  size="md"
                  type="text"
                  name="satuan"
                  value={data.satuan}
                  onChange={(e) => setData('satuan', e.target.value)}
                  placeholder="Satuan"
                />
              </div>
              {errors.satuan && <Error variant={1}>{errors.satuan}</Error>}
              <div className="flex flex-col gap-3">
                <Paragraph size="lg">Stok Minimum</Paragraph>
                <Input
                  variant={1}
                  size="md"
                  type="number"
                  name="stok_minimum"
                  placeholder="Stok Minimum"
                  value={data.stok_minimum}
                  onChange={(e) => setData('stok_minimum', e.target.value)}
                />
                {errors.stok_minimum && <Error variant={1}>{errors.stok_minimum}</Error>}
              </div>
              <Button type="submit" variant={1} disabled={processing} size="md">
                {processing ? 'Menambahkan....' : 'Tambahkan'}
              </Button>
            </form>
          </Modal>
          <div className="flex flex-row gap-3 items-center">
            <Input
              variant={1}
              size="md"
              type="text"
              placeholder="Cari Nama Bahan Baku...."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <ActionButton type="search" size="lg" onClick={handleSearch}>
              <FaSearch />
            </ActionButton>
            <Link href="/bahan/trash">
              <ActionButton
                as="button"
                className="flex items-center"
                type="restore"
                size="lg"
                title="Lihat data yang terhapus"
              >
                <FaTrashRestore />
              </ActionButton>
            </Link>
          </div>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full border-collapse mt-5 bg-white">
            <thead>
              <tr>
                <th className="border border-gray-300 py-3">Nama Bahan Baku</th>
                <th className="border border-gray-300 py-3">Satuan</th>
                <th className="border border-gray-300 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {displayBahan?.length > 0 ? (
                displayBahan?.map((items) => (
                  <tr key={items.idBahanBaku}>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.namaBahanBaku}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.satuan}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <div className="flex flex-row gap-2 justify-center">
                        <Link route="bahan.edit" routeParams={{ id: items.idBahanBaku }}>
                          <ActionButton
                            as="div"
                            className="flex items-center"
                            type="update"
                            size="sm"
                          >
                            <FaPen />
                          </ActionButton>
                        </Link>
                        <ActionButton
                          type="delete"
                          size="sm"
                          onClick={() => handleDelete(items.idBahanBaku)}
                        >
                          <FaTrash />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border border-gray-300">
                  <td colSpan={6} className="text-center py-4">
                    <Paragraph size="lg">Tidak Ada Bahan Baku</Paragraph>
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
