import Heading from '~/components/ui/Heading'
import Input from '~/components/ui/Input'
import Paragraph from '~/components/ui/Paragraph'
import Select from '~/components/ui/Select'
import TextArea from '~/components/ui/Textarea'
import { useForm, usePage } from '@inertiajs/react'
import Button from '~/components/ui/Button/Button'
import Error from '~/components/ui/Error'
import { SubmitEvent } from 'react'

export default function Adjustment() {
  const { data, setData, post, processing, reset } = useForm({
    id_produk: '',
    jenis_stok: '',
    jumlah: '',
    catatan_tambahan: '',
    tanggal_adjustment: '',
  })
  const { produk, errors } = usePage<{
    produk: {
      idProduk: number
      namaProduk: string
      satuan: string
    }[]
  }>().props

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    post('/stok-produk/adjustment/create', {
      onSuccess: () => {
        reset()
      },
    })
  }
  return (
    <>
      <div className="flex justify-center mx-auto mb-5">
        <Heading level={1} color="dark_slate_grey" className="font-bold">
          Stok Adjustment Produk
        </Heading>
      </div>
      <form
        className="flex flex-col mx-auto  w-[600px] bg-white shadow-md rounded-md p-5 gap-3"
        onSubmit={handleSubmit}
      >
        <Paragraph size="lg">Produk</Paragraph>
        <Select
          variant={1}
          size="md"
          value={data.id_produk}
          onChange={(e) => setData('id_produk', e.target.value)}
        >
          <option value=" ">Pilih Produk</option>
          {produk?.map((item) => (
            <option key={item.idProduk} value={item.idProduk}>
              {item.namaProduk}
            </option>
          ))}
        </Select>
        {errors.id_produk && <Error variant={1}>{errors.id_produk}</Error>}
        <Paragraph size="lg">Jenis Stok</Paragraph>
        <Select
          variant={1}
          size="md"
          value={data.jenis_stok}
          onChange={(e) => setData('jenis_stok', e.target.value)}
        >
          <option value=" ">Pilih Jenis Stok</option>
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
          placeholder="Jumlah stok"
          onChange={(e) => setData('jumlah', e.target.value)}
        ></Input>
        {errors.jumlah && <Error variant={1}>{errors.jumlah}</Error>}
        <Paragraph size="lg">Catatan Tambahan</Paragraph>
        <TextArea
          variant={1}
          size="md"
          placeholder="Alasan pengeluaran/pemasukan stok produk"
          value={data.catatan_tambahan}
          onChange={(e) => setData('catatan_tambahan', e.target.value)}
        ></TextArea>
        {errors.catatan_tambahan && <Error variant={1}>{errors.catatan_tambahan}</Error>}
        <Paragraph size="lg">Tanggal Adjustment</Paragraph>
        <Input
          variant={1}
          size="md"
          type="date"
          value={data.tanggal_adjustment}
          onChange={(e) => setData('tanggal_adjustment', e.target.value)}
        ></Input>
        {errors.tanggal_adjustment && <Error variant={1}>{errors.tanggal_adjustment}</Error>}
        <Button type="submit" variant={1} disabled={processing} size="md">
          {processing ? 'Adjusting....' : 'Adjust Stok Produk'}
        </Button>
      </form>
    </>
  )
}
{
}
