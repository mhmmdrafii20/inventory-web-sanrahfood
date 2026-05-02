import Heading from '~/components/ui/Heading'
import Paragraph from '~/components/ui/Paragraph'
import Select from '~/components/ui/Select'
import Input from '~/components/ui/Input'
import TextArea from '~/components/ui/Textarea'
import Button from '~/components/ui/Button/Button'
import Error from '~/components/ui/Error'
import { useForm, usePage } from '@inertiajs/react'
import { SubmitEvent } from 'react'

export default function templateNotifikasi() {
  const { tipeNotifikasi, errors, dataTemplateNotifikasi } = usePage<{
    tipeNotifikasi: {
      idTipeNotifikasi: number
      kodeNotifikasi: number
      namaNotifikasi: string
      templateVariables: string[]
    }[]
    dataTemplateNotifikasi: {
      id_template_notifikasi: number
      nama_template: string
      id_tipe_notifikasi: number
      konten: string
      tipe_notifikasi: {
        idTipeNotifikasi: number
        kodeNotifikasi: number
        namaNotifikasi: string
        templateVariables: string[]
      }
    }
  }>().props
  const { data, setData, put, processing, reset } = useForm({
    id_template_notifikasi: dataTemplateNotifikasi.id_template_notifikasi,
    id_tipe_notifikasi: dataTemplateNotifikasi.id_tipe_notifikasi,
    nama_template: dataTemplateNotifikasi.nama_template,
    konten: dataTemplateNotifikasi.konten,
  })
  const selectedTipe = tipeNotifikasi?.find(
    (items) => items.idTipeNotifikasi === Number(data.id_tipe_notifikasi)
  )

  function handleUpdate(e: SubmitEvent) {
    e.preventDefault()
    put(`/template-notifikasi/update/${data.id_template_notifikasi}`, {
      onSuccess: () => {
        reset()
      },
    })
  }

  return (
    <>
      <div className="flex justify-center mx-auto mb-5">
        <Heading level={1} color="dark_slate_grey" className="font-bold">
          Edit Template Notifikasi
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
          name="id_template_notifikasi"
          value={data.id_template_notifikasi}
          onChange={(e) => setData('id_template_notifikasi', Number(e.target.value))}
        ></Input>
        <Paragraph size="lg">Tipe Notifikasi</Paragraph>
        <Select
          variant={1}
          size="md"
          name="id_tipe_notifikasi"
          value={data.id_tipe_notifikasi}
          onChange={(e) => setData('id_tipe_notifikasi', Number(e.target.value))}
        >
          <option value="">Pilih Tipe Notifikasi</option>
          {tipeNotifikasi?.map((items) => (
            <option key={items.idTipeNotifikasi} value={items.idTipeNotifikasi}>
              {items.namaNotifikasi}
            </option>
          ))}
        </Select>
        {errors.id_tipe_notifikasi && <Error variant={1}>{errors.id_tipe_notifikasi}</Error>}

        <Paragraph size="lg">Nama Template</Paragraph>
        <Input
          variant={1}
          size="md"
          type="text"
          placeholder="Nama Template"
          name="nama_template"
          value={data.nama_template}
          onChange={(e) => setData('nama_template', e.target.value)}
        />
        {errors.nama_template && <Error variant={1}>{errors.nama_template}</Error>}

        <Paragraph size="lg">Konten</Paragraph>
        <TextArea
          variant={1}
          size="md"
          rows={10}
          placeholder={
            selectedTipe &&
            selectedTipe?.templateVariables &&
            selectedTipe?.templateVariables?.length > 0
              ? `Contoh: Halo {${selectedTipe?.templateVariables[0]}}, stok {${selectedTipe?.templateVariables[1] ?? selectedTipe?.templateVariables[0]}} sudah mencapai batas minimum`
              : 'Pilih tipe notifikasi terlebih dahulu...'
          }
          name="konten"
          value={data.konten}
          onChange={(e) => setData('konten', e.target.value)}
        />
        {errors.konten && <Error variant={1}>{errors.konten}</Error>}

        <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700 mt-5 mb-5">
          <Paragraph color="red_500" className="font-bold mb-2" size="md">
            VARIABLE TERSEDIA :
          </Paragraph>
          {!data.id_tipe_notifikasi ? (
            <p className="text-xs text-red-500">
              Pilih tipe notifikasi dulu untuk melihat variabel yang tersedia.
            </p>
          ) : (
            <>
              <div className="flex flex-row flex-wrap gap-2">
                {selectedTipe?.templateVariables?.map((variable) => (
                  <code key={variable} className="bg-red-100 px-2 py-1 rounded text-xs">
                    {`{{${variable}}}`}
                  </code>
                ))}
              </div>
              <p className="mt-2 text-xs text-red-500">
                Gunakan variabel di atas dengan format{' '}
                <code className="bg-red-100 px-1 rounded">{'{{nama_variabel}}'}</code> di dalam{' '}
                <b>konten</b>
              </p>
            </>
          )}
        </div>
        <Button type="submit" variant={1} size="md" disabled={processing}>
          {processing ? 'Updating....' : 'Update'}
        </Button>
      </form>
    </>
  )
}
