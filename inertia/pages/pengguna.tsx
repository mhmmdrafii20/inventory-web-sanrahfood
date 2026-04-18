import { useState, SubmitEvent } from "react"
import { useForm, usePage } from "@inertiajs/react"
import Heading from "~/components/ui/Heading"
import Button from "~/components/ui/Button/Button"
import Modal from "react-responsive-modal"
import Paragraph from "~/components/ui/Paragraph"
import 'react-responsive-modal/styles.css';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Link } from "@adonisjs/inertia/react";
import ActionButton from "~/components/ui/Button/ActionButton"
import { FaPen, FaTrash } from "react-icons/fa"
import confirmDialog from '../../utils/sweetalert'

export default function Pengguna () {
    const [open, setIsOpen] = useState(false);
    const {role, pengguna} = usePage<{role:{idHakAkses:number, namaHakAkses:string} [], pengguna:{id:number, idPengguna:number, hakAkses:{namaHakAkses:string}, namaPengguna:string, nomorTelepon:string} []}>().props;
    const {data, setData, post, delete:destroy, processing, errors, reset} = useForm({
        id_pengguna: "",
        id_hak_akses:"",
        email: "",
        password:"",
        nama_pengguna:"",
        nomor_telepon:"",
    });
    function handleCreate(e:SubmitEvent) {
        e.preventDefault();
        post('/pengguna/create', {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            }
        })
    }
    function handleDelete (id:number) {
        confirmDialog(
            "Yakin ingin menghapus ?", 
            "Data ini akan dinonaktifkan untuk sementara", 
            "warning", 
            () => {
                destroy(`/pengguna/delete/${id}`);
            }, 
            "Hapus",
            "Batal")
    }
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Manajemen Pengguna</Heading>
            <div className="flex flex-row justify-between mt-5">
                <Button onClick={() => setIsOpen(true)} variant={1} size="md">Tambah Pengguna</Button>
                <Modal open={open} onClose={() => setIsOpen(false)}  center styles={{modal:{width:"1024px"}}}>
                    <Heading level={1} color="dark_slate_grey" className="font-bold">Tambah Pengguna</Heading>
                    <form className="flex flex-col gap-2" onSubmit={handleCreate}>
                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Email Pengguna</Paragraph>
                            <input  type="text" name="email" value={data.email} onChange={e => setData('email', e.target.value)}  placeholder="Email Pengguna"></input>
                            {errors.email && <div>{errors.email}</div>}
                        </div>

                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Password</Paragraph>
                            <input  type="password" name="password" value={data.password} onChange={e => setData('password', e.target.value)}  placeholder="Password Pengguna"></input>
                            {errors.password && <div>{errors.password}</div>}
                        </div>

                         <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Nama Pengguna</Paragraph>
                            <input  type="text" name="nama_pengguna" value={data.nama_pengguna} onChange={e => setData('nama_pengguna', e.target.value)} placeholder="Nama Pengguna"></input>
                            {errors.nama_pengguna && <div>{errors.nama_pengguna}</div>}
                         </div>

                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Nomor Telepon</Paragraph>
                            <PhoneInput placeholder="Nomor telepon Pengguna"   value={data.nomor_telepon} onChange={(e) => setData("nomor_telepon", e ?? "")}/>
                            {errors.nomor_telepon && <div>{errors.nomor_telepon}</div>}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Hak Akses</Paragraph>
                            <select name="id_hak_akses" onChange={(e) => setData('id_hak_akses', e.target.value)}>
                                <option value="">Pilih Hak Akses</option>
                                {role.map(items => (
                                        <option key={items.idHakAkses} value={items.idHakAkses} >{items.namaHakAkses}</option>
                                ))}
                            </select>
                            {errors.id_hak_akses && <div>{errors.id_hak_akses}</div>}
                        </div>

                        <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Menambahkan...." : "Tambahkan" }</Button>
                    </form>
                </Modal>
            </div>
            <table className="w-full border-collapse mt-5 bg-white">
                <thead>
                    <tr>
                        <th className="border border-gray-300 py-3">Nama Pengguna</th>
                        <th className="border border-gray-300 py-3">Hak Akses</th>
                        <th className="border border-gray-300 py-3">Nomor Telepon</th>
                        <th className="border border-gray-300 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {pengguna.map(items => (
                        <tr key={items.idPengguna}>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.namaPengguna}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.hakAkses?.namaHakAkses}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.nomorTelepon}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5">
                                <div className="flex flex-row gap-2 justify-center">
                                <Link route='updatePengguna.edit' routeParams={{id:items.idPengguna}}> 
                                        <ActionButton as="div" className="flex items-center" type="update" size="sm">
                                            <FaPen/>
                                        </ActionButton>
                                    </Link>
                                    <ActionButton type="delete" size="sm" onClick={() => handleDelete(items.idPengguna)}><FaTrash/></ActionButton>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        </>
    )
}
