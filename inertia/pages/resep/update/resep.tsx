import { usePage, useForm } from '@inertiajs/react'
import { useEffect, SubmitEvent } from 'react'
import Heading from '~/components/ui/Heading'
import Paragraph from '~/components/ui/Paragraph'
import { MultiSelect } from 'react-multi-select-component'
import Button from '~/components/ui/Button/Button'
import Input from '~/components/ui/Input'
import TextArea from '~/components/ui/Textarea'
import Select from '~/components/ui/Select'
import Error from '~/components/ui/Error'

type Option = {
  label: string
  value: number
}
export default function ResepUpdate() {
  const { bahan, produk, specificDataResep, specificResepBahan, errors } = usePage<{
    bahan: { idBahanBaku: number; namaBahanBaku: string; satuan: string }[]
    produk: { idProduk: number; namaProduk: string; satuan: string }[]
    specificResepBahan: {
      idResepBahan: number
      idResep: number
      idBahanBaku: number
      jumlah: number
    }[]
    specificDataResep: {
      id_resep: number
      nama_resep: string
      id_produk: string
      yield_per_batch: number
      catatan_tambahan: string
      produk: { nama_produk: string; satuan: string }
    }
  }>().props

  const options = bahan.map((items) => ({
    label: items.namaBahanBaku,
    value: Number(items.idBahanBaku),
  }))
  const { data, setData, put, processing, reset } = useForm({
    id_resep: specificDataResep.id_resep,
    nama_resep: specificDataResep.nama_resep,
    id_produk: specificDataResep.id_produk,
    yield_per_batch: specificDataResep.yield_per_batch,
    bahan: [] as {
      id_bahan_baku: number
      nama_bahan_baku: string
      jumlah: number
    }[],
    catatan_tambahan: specificDataResep.catatan_tambahan,
  })
  useEffect(() => {
    setData(
      'bahan',
      specificResepBahan.map((item) => ({
        id_bahan_baku: item.idBahanBaku,
        nama_bahan_baku: options.find((o) => o.value === item.idBahanBaku)?.label ?? '',
        jumlah: item.jumlah,
      }))
    )
  }, [specificResepBahan])
  function handleUpdate(e: SubmitEvent) {
    e.preventDefault()
    put(`/resep/update/${specificDataResep.id_resep}`, {
      onSuccess: () => {
        reset()
      },
    })
  }
  return (
    <>
      <Heading level={1} color="dark_slate_grey" className="font-bold">
        Edit Resep
      </Heading>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-5 shadow-md rounded-md"
        onSubmit={handleUpdate}
      >
        <Input
          variant={1}
          size="md"
          type="hidden"
          name="id_resep"
          value={data.id_resep}
          onChange={(e) => setData('id_resep', parseInt(e.target.value))}
        />
        <Input
          variant={1}
          size="md"
          type="hidden"
          name="id_produk"
          value={data.id_produk}
          onChange={(e) => setData('id_produk', e.target.value)}
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Paragraph size="lg">Nama Resep</Paragraph>
            <Input
              variant={1}
              size="md"
              type="text"
              name="nama_resep"
              value={data.nama_resep}
              placeholder="Tuliskan nama resep disini"
              onChange={(e) => setData('nama_resep', e.target.value)}
            />
          </div>
          {errors.nama_resep && <Error variant={1}>{errors.nama_resep}</Error>}
          <div className="flex flex-col gap-3">
            <Paragraph size="lg">Produk</Paragraph>
            <Select
              variant={1}
              size="md"
              className="w-full"
              name="id_produk"
              value={data.id_produk}
              onChange={(e) => setData('id_produk', e.target.value)}
            >
              <option value=" ">Pilih Produk</option>
              {produk.map((items) => (
                <option key={items.idProduk} value={items.idProduk}>
                  {items.namaProduk}
                </option>
              ))}
            </Select>
          </div>
          {errors.id_produk && <Error variant={1}>{errors.id_produk}</Error>}
          <div className="flex flex-col gap-3">
            <Paragraph size="lg">Yield Per Batch</Paragraph>
            <Input
              variant={1}
              size="md"
              type="number"
              name="yield_per_batch"
              value={data.yield_per_batch}
              placeholder="Tuliskan yield per batch disini"
              onChange={(e) => setData('yield_per_batch', parseInt(e.target.value))}
            />
          </div>
          <div className="mt-auto">
            <Button type="submit" className="w-full" variant={1} disabled={processing} size="md">
              {processing ? 'Updating....' : 'Update'}
            </Button>
          </div>
        </div>
        {errors.yield_per_batch && <Error variant={1}>{errors.yield_per_batch}</Error>}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Paragraph size="lg">Bahan Baku</Paragraph>
            <MultiSelect
              options={options}
              value={data.bahan.map((b) => ({
                value: b.id_bahan_baku,
                label: options.find((o) => o.value === b.id_bahan_baku)?.label ?? '',
              }))}
              onChange={(val: Option[]) => {
                const existing = data.bahan
                const newBahan = val.map((v) => {
                  const old = existing.find((b) => b.id_bahan_baku === v.value)
                  return {
                    id_bahan_baku: v.value,
                    nama_bahan_baku: v.label,
                    jumlah: old ? old.jumlah : 0,
                  }
                })
                setData('bahan', newBahan)
              }}
              labelledBy="Select"
            ></MultiSelect>
            {errors.bahan && <Error variant={1}>{errors.bahan}</Error>}
          </div>
          <Paragraph size="lg">List Bahan Baku</Paragraph>
          <div className="flex items-center gap-2">
            <ul className="flex flex-col gap-5 w-full">
              {data.bahan && data.bahan.length > 0 ? (
                data.bahan.map((items, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <div className="flex flex-row gap-3">
                      <span className="flex-1">{items.nama_bahan_baku}</span>
                      <Input
                        variant={1}
                        size="md"
                        type="number"
                        className="w-20"
                        value={items.jumlah}
                        placeholder="Jumlah"
                        onChange={(e) => {
                          const updated = [...data.bahan]
                          updated[i].jumlah = Number(e.target.value)
                          setData('bahan', updated)
                        }}
                      />
                    </div>
                    {errors[`bahan.${i}.id_bahan_baku`] && (
                      <Error variant={1}>{errors[`bahan.${i}.id_bahan_baku`]}</Error>
                    )}
                    {errors[`bahan.${i}.jumlah`] && (
                      <Error variant={1}>{errors[`bahan.${i}.jumlah`]}</Error>
                    )}
                  </li>
                ))
              ) : (
                <Paragraph size="md" className="text-gray-500">
                  Tidak Ada Bahan Baku
                </Paragraph>
              )}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <Paragraph size="lg">Catatan Tambahan</Paragraph>
            <TextArea
              variant={1}
              size="md"
              className="w-full"
              value={data.catatan_tambahan}
              placeholder="Tuliskan catatan tambahan disini"
              rows={10}
              onChange={(e) => setData('catatan_tambahan', e.target.value)}
            />
          </div>
          {errors.catatan_tambahan && <Error variant={1}>{errors.catatan_tambahan}</Error>}
        </div>
      </form>
    </>
  )
}
