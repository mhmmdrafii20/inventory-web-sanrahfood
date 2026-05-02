import Heading from '~/components/ui/Heading'
import { useForm, usePage } from '@inertiajs/react'
import Paragraph from '~/components/ui/Paragraph'
import Button from '~/components/ui/Button/Button'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { SubmitEvent } from 'react'
import Input from '~/components/ui/Input'
import Select from '~/components/ui/Select'
import Error from '~/components/ui/Error'

export default function Pengguna() {
  const { role, dataPengguna, auth, errors } = usePage<{
    flash?: { success?: string; error?: string }
    role: { idHakAkses: number; namaHakAkses: string }[]
    dataPengguna: {
      id: number
      id_pengguna: string
      id_hak_akses: number
      nama_pengguna: string
      nomor_telepon: string
    }
    auth: { data: { user: { id: string; email: string } } }
  }>().props
  const { data, setData, put, reset, processing } = useForm({
    id: dataPengguna.id,
    id_pengguna: dataPengguna.id_pengguna,
    id_hak_akses: dataPengguna.id_hak_akses,
    email: auth.data.user.email,
    password: '',
    nama_pengguna: dataPengguna.nama_pengguna,
    nomor_telepon: dataPengguna.nomor_telepon,
  })

  function handleUpdate(e: SubmitEvent) {
    e.preventDefault()
    put(`/pengguna/update/${dataPengguna.id_pengguna}`, {
      onSuccess: () => {
        reset()
      },
    })
  }

  return (
    <>
      <div className="flex justify-center mx-auto mb-5">
        <Heading level={1} color="dark_slate_grey" className="font-bold">
          Edit Pengguna
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
          name="id"
          value={data.id}
          onChange={(e) => setData('id', parseInt(e.target.value))}
        />

        <Input
          variant={1}
          size="md"
          type="hidden"
          name="id_pengguna"
          value={data.id_pengguna}
          onChange={(e) => setData('id_pengguna', e.target.value)}
        />

        <Paragraph size="lg">Email</Paragraph>
        <Input
          variant={1}
          size="md"
          type="email"
          name="email"
          placeholder="Email Pengguna"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
        />
        {errors.email && <Error variant={1}>{errors.email}</Error>}

        <Paragraph size="lg">Password</Paragraph>
        <Input
          variant={1}
          size="md"
          type="password"
          name="password"
          placeholder="Password Pengguna"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
        />
        {errors.password && <Error variant={1}>{errors.password}</Error>}

        <Paragraph size="lg">Nama Pengguna</Paragraph>
        <Input
          variant={1}
          size="md"
          type="text"
          name="nama_pengguna"
          placeholder="Nama Pengguna"
          value={data.nama_pengguna}
          onChange={(e) => setData('nama_pengguna', e.target.value)}
        />
        {errors.nama_pengguna && <Error variant={1}>{errors.nama_pengguna}</Error>}

        <Paragraph size="lg">Hak Akses</Paragraph>
        <Select
          variant={1}
          size="md"
          name="id_hak_akses"
          defaultValue={dataPengguna.id_hak_akses}
          onChange={(e) => setData('id_hak_akses', parseInt(e.target.value))}
        >
          <option value="">Pilih Hak Akses</option>
          {role.map((items) => (
            <option key={items.idHakAkses} value={items.idHakAkses}>
              {items.namaHakAkses}
            </option>
          ))}
        </Select>
        {errors.id_hak_akses && <Error variant={1}>{errors.id_hak_akses}</Error>}

        <Paragraph size="lg">Nomor Telepon</Paragraph>
        <PhoneInput
          placeholder="Nomor telepon Pengguna"
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
