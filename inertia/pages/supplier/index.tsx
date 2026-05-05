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
import TextArea from '~/components/ui/Textarea'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function Index() {
  const [open, setIsOpen] = useState(false)
  const { supplier, errors, searchRes } = usePage<{
    supplier: { idSupplier: number; namaSupplier: string; alamat: string; nomorTelepon: string }[]
    searchRes: { idSupplier: number; namaSupplier: string; alamat: string; nomorTelepon: string }[]
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
    nama_supplier: '',
    alamat: '',
    nomor_telepon: '',
  })

  const [searchData, setSearchData] = useState('')

  function handleCreate(e: SubmitEvent) {
    e.preventDefault()
    post('/supplier/create', {
      onSuccess: () => {
        setIsOpen(false)
        reset()
      },
    })
  }

  function handleDelete(id: number) {
    showDeleteDialog(() => {
      destroy(`/supplier/delete/${id}`)
    })
  }

  function handleSearch() {
    router.get(
      '/supplier/search',
      { search: searchData },
      {
        preserveState: true,
        replace: true,
      }
    )
  }

  const displaySupplier = searchRes && searchRes.length > 0 ? searchRes : supplier

  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        Manajemen Supplier
      </Heading>
      <div className="flex flex-col w-full bg-white shadow-md rounded-md p-5">
        <div className="flex flex-row justify-between mt-5">
          <Button onClick={() => setIsOpen(true)} variant={1} size="md">
            Tambah Supplier
          </Button>
          <Modal
            open={open}
            onClose={() => setIsOpen(false)}
            center
            styles={{ modal: { width: '1024px' } }}
          >
            <Heading level={1} color="dark_slate_grey" className="font-bold">
              Tambah Supplier
            </Heading>
            <form className="flex flex-col gap-2" onSubmit={handleCreate}>
              <Paragraph size="lg">Nama Supplier</Paragraph>
              <Input
                variant={1}
                size="md"
                type="text"
                name="nama_supplier"
                value={data.nama_supplier}
                onChange={(e) => setData('nama_supplier', e.target.value)}
                placeholder="Nama Supplier"
              />
              {errors.nama_supplier && <Error variant={1}>{errors.nama_supplier}</Error>}

              <div className="flex flex-col gap-2">
                <Paragraph size="lg">Alamat</Paragraph>
                <TextArea
                  variant={1}
                  size="md"
                  name="alamat"
                  value={data.alamat}
                  onChange={(e) => setData('alamat', e.target.value)}
                  placeholder="Alamat"
                />
              </div>
              {errors.alamat && <Error variant={1}>{errors.alamat}</Error>}

              <div className="flex flex-col gap-3">
                <Paragraph size="lg">Nomor Telepon</Paragraph>
                <PhoneInput
                  placeholder="Nomor Telepon"
                  value={data.nomor_telepon}
                  onChange={(e) => setData('nomor_telepon', e ?? '')}
                />
                {errors.nomor_telepon && <Error variant={1}>{errors.nomor_telepon}</Error>}
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
              placeholder="Cari Nama Supplier...."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <ActionButton type="search" size="lg" onClick={handleSearch}>
              <FaSearch />
            </ActionButton>
            <Link href="/supplier/trash">
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
                <th className="border border-gray-300 py-3">Nama Supplier</th>
                <th className="border border-gray-300 py-3">Alamat</th>
                <th className="border border-gray-300 py-3">Nomor Telepon</th>
                <th className="border border-gray-300 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {displaySupplier?.length > 0 ? (
                displaySupplier?.map((items) => (
                  <tr key={items.idSupplier}>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.namaSupplier}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.alamat}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <Paragraph size="lg">{items.nomorTelepon}</Paragraph>
                    </td>
                    <td className="border border-gray-300 py-3 px-5">
                      <div className="flex flex-row gap-2 justify-center">
                        <Link route="supplier.edit" routeParams={{ id: items.idSupplier }}>
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
                          onClick={() => handleDelete(items.idSupplier)}
                        >
                          <FaTrash />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border border-gray-300">
                  <td colSpan={4} className="text-center py-4">
                    <Paragraph size="lg">Tidak Ada Data Supplier</Paragraph>
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
