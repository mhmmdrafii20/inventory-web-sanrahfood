import Heading from '~/components/ui/Heading'
import { useForm, usePage } from '@inertiajs/react'
import Paragraph from '~/components/ui/Paragraph'
import Button from '~/components/ui/Button/Button'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { SubmitEvent } from 'react'
import Input from '~/components/ui/Input'
import TextArea from '~/components/ui/Textarea'
import Error from '~/components/ui/Error'

export default function UpdateSupplier() {
  const { dataSupplier, errors } = usePage<{
    flash?: { success?: string; error?: string }
    dataSupplier: {
      id_supplier: number
      nama_supplier: string
      alamat: string
      nomor_telepon: string
    }
  }>().props

  console.log(dataSupplier)

  const { data, setData, put, reset, processing } = useForm({
    id_supplier: dataSupplier.id_supplier,
    nama_supplier: dataSupplier.nama_supplier,
    alamat: dataSupplier.alamat,
    nomor_telepon: dataSupplier.nomor_telepon,
  })

  function handleUpdate(e: SubmitEvent) {
    e.preventDefault()
    put(`/supplier/update/${dataSupplier.id_supplier}`, {
      onSuccess: () => {
        reset()
      },
    })
  }

  return (
    <>
      <div className="flex justify-center mx-auto mb-5">
        <Heading level={1} color="dark_slate_grey" className="font-bold">
          Edit Supplier
        </Heading>
      </div>
      <form
        className="flex flex-col gap-5 bg-white p-5 shadow-md rounded-md w-[600px] mx-auto"
        onSubmit={handleUpdate}
      >
        <Input
          variant={1}
          size="md"
          type="hidden"
          name="id_supplier"
          value={data.id_supplier}
          onChange={(e) => setData('id_supplier', parseInt(e.target.value))}
        />

        <Paragraph size="lg">Nama Supplier</Paragraph>
        <Input
          variant={1}
          size="md"
          type="text"
          name="nama_supplier"
          placeholder="Nama Supplier"
          value={data.nama_supplier}
          onChange={(e) => setData('nama_supplier', e.target.value)}
        />
        {errors.nama_supplier && <Error variant={1}>{errors.nama_supplier}</Error>}

        <Paragraph size="lg">Alamat</Paragraph>
        <TextArea
          variant={1}
          size="md"
          name="alamat"
          placeholder="Alamat"
          value={data.alamat}
          onChange={(e) => setData('alamat', e.target.value)}
        />
        {errors.alamat && <Error variant={1}>{errors.alamat}</Error>}

        <Paragraph size="lg">Nomor Telepon</Paragraph>
        <PhoneInput
          placeholder="Nomor Telepon Supplier"
          value={data.nomor_telepon}
          onChange={(e) => setData('nomor_telepon', e ?? '')}
        />
        {errors.nomor_telepon && <Error variant={1}>{errors.nomor_telepon}</Error>}

        <Button type="submit" variant={1} disabled={processing} size="md">
          {processing ? 'Updating....' : 'Update'}
        </Button>
      </form>
    </>
  )
}
