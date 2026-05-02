import Modal from 'react-responsive-modal'
import Button from '~/components/ui/Button/Button'
import Heading from '~/components/ui/Heading'
import { SubmitEvent, useState } from 'react'
import 'react-responsive-modal/styles.css'
import Paragraph from '~/components/ui/Paragraph'
import { useForm, usePage, router } from '@inertiajs/react'
import ActionButton from '~/components/ui/Button/ActionButton'
import { FaSearch, FaPen, FaTrash, FaTrashRestore } from 'react-icons/fa'
import { Link } from '@adonisjs/inertia/react'
import { showDeleteDialog } from '../../../utils/sweetalert'
import Input from '~/components/ui/Input'
import Error from '~/components/ui/Error'

export default function HakAkses() {
  const [open, setIsOpen] = useState(false)
  const { role, errors, searchRes } = usePage<{
    role: { idHakAkses: number; namaHakAkses: string }[]
    searchRes: { idHakAkses: number; namaHakAkses: string }[]
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
    nama_hak_akses: '',
  })

  const [searchData, setSearchData] = useState('')

  function handleCreate(e: SubmitEvent) {
    e.preventDefault()
    post('/role/create', {
      onSuccess: () => {
        setIsOpen(false)
        reset()
      },
    })
  }
  function handleDelete(id: number) {
    showDeleteDialog(() => {
      destroy(`/role/delete/${id}`)
    })
  }
  function handleSearch() {
    router.get(
      `/role/search`,
      { search: searchData },
      {
        preserveState: true,
        replace: true,
      }
    )
  }
  const displayRole = searchRes && searchRes.length > 0 ? searchRes : role
  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        Manajemen Hak Akses
      </Heading>
      <div className="flex flex-col  w-full bg-white shadow-md rounded-md p-5">
        <div className="flex flex-row justify-between mt-5">
          <Button size="md" onClick={() => setIsOpen(true)} variant={1}>
            Tambah Hak Akses
          </Button>
          <Modal
            open={open}
            onClose={() => setIsOpen(false)}
            center
            styles={{ modal: { width: '1024px' } }}
          >
            <Heading level={1} color="dark_slate_grey" className="font-bold">
              Tambah Hak Akses
            </Heading>
            <form className="flex flex-col gap-2" onSubmit={handleCreate}>
              <div className="flex flex-col gap-3">
                <Paragraph size="lg">Nama Hak Akses</Paragraph>
                <Input
                  variant={1}
                  size="md"
                  type="text"
                  name="nama_hak_akses"
                  placeholder="Nama Hak Akses"
                  value={data.nama_hak_akses}
                  onChange={(e) => setData('nama_hak_akses', e.target.value)}
                />
              </div>
              {errors.nama_hak_akses && <Error variant={1}>{errors.nama_hak_akses}</Error>}
              <Button type="submit" variant={1} disabled={processing} size="md">
                {processing ? 'Menambahkan....' : 'Tambahkan'}
              </Button>
            </form>
          </Modal>
          <div className="flex flex-row gap-3 items-center ">
            <Input
              variant={1}
              size="md"
              type="text"
              placeholder="Cari Nama Hak Akses...."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <ActionButton as="button" type="search" size="lg" onClick={handleSearch}>
              <FaSearch />
            </ActionButton>
            <Link href="/role/trash">
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
        <table className="w-full border-collapse mt-5 bg-white">
          <thead>
            <tr>
              <th className="border border-gray-300 py-3">Nama Hak Akses</th>
              <th className="border border-gray-300 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayRole?.length > 0 ? (
              displayRole?.map((items) => (
                <tr key={items.idHakAkses}>
                  <td className="border border-gray-300 py-3 px-5">
                    <Paragraph size="lg">{items.namaHakAkses}</Paragraph>
                  </td>
                  <td className="border border-gray-300 py-3 px-5">
                    <div className="flex flex-row gap-2 justify-center">
                      <Link route="hakAkses.edit" routeParams={{ id: items.idHakAkses }}>
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
                        onClick={() => handleDelete(items.idHakAkses)}
                      >
                        <FaTrash />
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4">
                  <Paragraph size="lg">Tidak Ada Hak Akses</Paragraph>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
