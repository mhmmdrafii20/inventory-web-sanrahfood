import Heading from '~/components/ui/Heading'
import Input from '~/components/ui/Input'
import Paragraph from '~/components/ui/Paragraph'
import Select from '~/components/ui/Select'
import TextArea from '~/components/ui/Textarea'
import { useForm, usePage } from '@inertiajs/react'
import Button from '~/components/ui/Button/Button'
import Error from '~/components/ui/Error'
import { SubmitEvent } from 'react'

export default function AdjustmentBahanBaku() {
  const { data, setData, post, processing, reset } = useForm({
    id_bahan_baku: '',
    jenis_stok: '',
    jumlah: '',
    catatan_tambahan: '',
    tanggal_adjustment: '',
  })

  const { bahan, errors } = usePage<{
    bahan: {
      idBahanBaku: number
      namaBahanBaku: string
      satuan: string
    }[]
  }>().props

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    post('/stok-bahan-baku/adjustment/create', {
      onSuccess: () => {
        reset()
      },
    })
  }

  return (
    <>
      <div className="flex justify-center mx-auto mb-5">
        <Heading level={1} color="dark_slate_grey" className="font-bold">
          Stok Adjustment Bahan Baku
        </Heading>
      </div>

      <form
        className="flex flex-col mx-auto w-[600px] bg-white shadow-md rounded-md p-5 gap-3"
        onSubmit={handleSubmit}
      >
        <Paragraph size="lg">Bahan Baku</Paragraph>
        <Select
          variant={1}
          size="md"
          value={data.id_bahan_baku}
          onChange={(e) => setData('id_bahan_baku', e.target.value)}
        >
          <option value="">Pilih Bahan Baku</option>
          {bahan?.map((item) => (
            <option key={item.idBahanBaku} value={item.idBahanBaku}>
              {item.namaBahanBaku}
            </option>
          ))}
        </Select>
        {errors.id_bahan_baku && <Error variant={1}>{errors.id_bahan_baku}</Error>}

        <Paragraph size="lg">Jenis Stok</Paragraph>
        <Select
          variant={1}
          size="md"
          value={data.jenis_stok}
          onChange={(e) => setData('jenis_stok', e.target.value)}
        >
          <option value="">Pilih Jenis Stok</option>
          <option value="MASUK">Masuk</option>
          <option value="KELUAR">Keluar</option>
        </Select>
        {errors.jenis_stok && <Error variant={1}>{errors.jenis_stok}</Error>}

        <Paragraph size="lg">Jumlah Stok</Paragraph>
        <Input
          variant={1}
          size="md"
          type="number"
          min={0}
          value={data.jumlah}
          placeholder="Jumlah stok bahan baku"
          onChange={(e) => setData('jumlah', e.target.value)}
        />
        {errors.jumlah && <Error variant={1}>{errors.jumlah}</Error>}

        <Paragraph size="lg">Catatan Tambahan</Paragraph>
        <TextArea
          variant={1}
          size="md"
          placeholder="Alasan pengeluaran/pemasukan stok bahan baku"
          value={data.catatan_tambahan}
          onChange={(e) => setData('catatan_tambahan', e.target.value)}
        />
        {errors.catatan_tambahan && <Error variant={1}>{errors.catatan_tambahan}</Error>}

        <Paragraph size="lg">Tanggal Adjustment</Paragraph>
        <Input
          variant={1}
          size="md"
          type="date"
          value={data.tanggal_adjustment}
          onChange={(e) => setData('tanggal_adjustment', e.target.value)}
        />
        {errors.tanggal_adjustment && <Error variant={1}>{errors.tanggal_adjustment}</Error>}

        <Button type="submit" variant={1} disabled={processing} size="md">
          {processing ? 'Adjusting....' : 'Adjust Stok Bahan Baku'}
        </Button>
      </form>
    </>
  )
}
