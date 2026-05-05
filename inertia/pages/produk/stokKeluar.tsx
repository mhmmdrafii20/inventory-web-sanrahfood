import Heading from '~/components/ui/Heading'
import Paragraph from '~/components/ui/Paragraph'
import Button from '~/components/ui/Button/Button'
import { useForm, usePage } from '@inertiajs/react'
import { SubmitEvent } from 'react'
import Input from '~/components/ui/Input'
import Select from '~/components/ui/Select'
import Error from '~/components/ui/Error'
import TextArea from '~/components/ui/Textarea'
import { MultiSelect } from 'react-multi-select-component'

type Option = {
  label: string
  value: string
}

export default function StokKeluar() {
  const { produk, errors } = usePage<{
    produk: { idProduk: number; namaProduk: string; satuan?: string }[]
  }>().props
  const { data, setData, post, processing, reset } = useForm({
    produk: [] as {
      id_produk: string
      nama_produk: string
      jumlah: number
    }[],
    tanggal_pengeluaran: '',
    catatan_tambahan: '',
  })

  const options = produk.map((item) => ({
    label: item.namaProduk,
    value: String(item.idProduk),
  }))

  const handleCreate = (e: SubmitEvent) => {
    e.preventDefault()
    post('/produk/stok-keluar/create', {
      onSuccess: () => {
        reset()
      },
    })
  }

  return (
    <>
      <div className="flex justify-center mx-auto mb-5">
        <Heading level={1} color="dark_slate_grey" className="font-bold">
          Pengeluaran Stok Produk
        </Heading>
      </div>
      <form
        className="flex flex-col gap-5 bg-white p-5 shadow-md rounded-md w-[600px] mx-auto"
        onSubmit={handleCreate}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Paragraph size="lg">Produk</Paragraph>
            <MultiSelect
              options={options}
              value={data.produk.map((p) => ({
                value: p.id_produk,
                label: options.find((o) => o.value === p.id_produk)?.label ?? '',
              }))}
              onChange={(val: Option[]) => {
                setData(
                  'produk',
                  val.map((v) => ({
                    id_produk: v.value,
                    nama_produk: v.label,
                    jumlah: 0,
                  }))
                )
              }}
              labelledBy="Select"
            />
            {errors.produk && <Error variant={1}>{errors.produk}</Error>}
          </div>

          <Paragraph size="lg">List Produk</Paragraph>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-60 pr-2">
            <ul className="flex flex-col gap-5 w-full">
              {data.produk && data.produk.length > 0 ? (
                data.produk.map((items, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <div className="flex flex-row gap-3 items-center">
                      <span className="flex-1">{items.nama_produk}</span>
                      <Input
                        variant={1}
                        size="md"
                        type="number"
                        className="w-32"
                        value={items.jumlah}
                        placeholder="Jumlah"
                        onChange={(e) => {
                          const updated = [...data.produk]
                          updated[i].jumlah = Number(e.target.value)
                          setData('produk', updated)
                        }}
                      />
                    </div>
                    {errors[`produk.${i}.id_produk`] && (
                      <Error variant={1}>{errors[`produk.${i}.id_produk`]}</Error>
                    )}
                    {errors[`produk.${i}.jumlah`] && (
                      <Error variant={1}>{errors[`produk.${i}.jumlah`]}</Error>
                    )}
                  </li>
                ))
              ) : (
                <Paragraph size="md" className="text-gray-500">
                  Tidak Ada Produk yang Dipilih
                </Paragraph>
              )}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Paragraph size="lg">Tanggal Pengeluaran</Paragraph>
            <Input
              variant={1}
              size="md"
              className="w-full"
              type="date"
              name="tanggal_pengeluaran"
              value={data.tanggal_pengeluaran}
              onChange={(e) => setData('tanggal_pengeluaran', e.target.value)}
            />
          </div>
          {errors.tanggal_pengeluaran && <Error variant={1}>{errors.tanggal_pengeluaran}</Error>}

          <div className="flex flex-col gap-3">
            <Paragraph size="lg">Catatan Tambahan</Paragraph>
            <TextArea
              variant={1}
              size="md"
              className="w-full"
              name="catatan_tambahan"
              placeholder="Masukkan catatan tambahan"
              value={data.catatan_tambahan}
              onChange={(e) => setData('catatan_tambahan', e.target.value)}
            />
          </div>
          {errors.catatan_tambahan && <Error variant={1}>{errors.catatan_tambahan}</Error>}

          <Button type="submit" variant={1} size="md" disabled={processing}>
            {processing ? 'Menyimpan...' : 'Simpan Pengeluaran Stok'}
          </Button>
        </div>
      </form>
    </>
  )
}
