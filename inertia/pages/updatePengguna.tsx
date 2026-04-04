import Heading from "~/components/ui/Heading"
import { useForm, usePage } from "@inertiajs/react"
import Paragraph from "~/components/ui/Paragraph";
import Button from "~/components/ui/Button/Button";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { SubmitEvent } from "react";

export default function UpdatePengguna () {
    const {role, dataPengguna, auth} = usePage<{flash?:{success?:string; error?:string}, role:{idHakAkses:number, namaHakAkses:string} [], dataPengguna:{id:number, id_pengguna:string, id_hak_akses:number, nama_pengguna:string, nomor_telepon:string}, auth:{data:{user:{id:string, email:string}}}}>().props;
    console.log(dataPengguna)
    const {data, setData,  put, errors,  reset, processing} = useForm({
        id:dataPengguna.id,
        id_pengguna: dataPengguna.id_pengguna,
        id_hak_akses:dataPengguna.id_hak_akses,
        email: auth.data.user.email,
        password:"",
        nama_pengguna:dataPengguna.nama_pengguna,
        nomor_telepon:dataPengguna.nomor_telepon,
    })

    function handleUpdate (e:SubmitEvent) {
        e.preventDefault();
        put(`/pengguna/update/${dataPengguna.id_pengguna}`, {
            onSuccess: () => {
                reset();
            }
        })
    }

    return (
        <>
                  <Heading level={1} color="dark_slate_grey" className="font-bold">Edit Hak Akses</Heading>
                    <form onSubmit={handleUpdate}>
                        <input type="hidden"  name="id" value={data.id} onChange={(e) => setData('id', parseInt(e.target.value))}></input>

                        <input type="hidden"  name="id_pengguna" value={data.id_pengguna} onChange={(e) => setData('id_pengguna', e.target.value)}></input>

                        <Paragraph size="lg">Email</Paragraph>
                        <input type="email" name="email" placeholder="Email Pengguna" value={data.email} onChange={(e) => setData('email', e.target.value)}></input>
                        {errors.email && <div>{errors.email}</div>}

                        <Paragraph size="lg">Password</Paragraph>
                        <input type="password" name="password" placeholder="Password Pengguna" value={data.password} onChange={(e) => setData('password', e.target.value)}></input>
                        {errors.password && <div>{errors.password}</div>}

                        <Paragraph size="lg">Nama Pengguna</Paragraph>
                        <input type="text" name="nama_pengguna" placeholder="Nama Pengguna"  value={data.nama_pengguna} onChange={(e) => setData('nama_pengguna', e.target.value)}></input>
                        {errors.nama_pengguna && <div>{errors.nama_pengguna}</div>}

                        <Paragraph size="lg">Hak Akses</Paragraph>
                        <select name="id_hak_akses"   defaultValue={dataPengguna.id_hak_akses} onChange={(e) => setData('id_hak_akses', parseInt(e.target.value))}>
                                <option value="">Pilih Hak Akses</option>
                                {role.map(items => (
                                        <option key={items.idHakAkses} value={items.idHakAkses} >{items.namaHakAkses}</option>
                                ))}
                        </select>
                        {errors.id_hak_akses && <div>{errors.id_hak_akses}</div>}

                        <Paragraph size="lg">Nomor Telepon</Paragraph>
                        <PhoneInput placeholder="Nomor telepon Pengguna"   value={data.nomor_telepon} onChange={(e) => setData("nomor_telepon", e ?? "")}/>
                        {errors.nomor_telepon && <div>{errors.nomor_telepon}</div>}

                        <Button type="submit" variant={1} disabled={processing} size="md">Update</Button>
                    </form>
        </>
    )
}