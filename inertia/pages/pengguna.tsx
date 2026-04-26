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
import { FaPen, FaTrash, FaSearch } from "react-icons/fa"
import confirmDialog from '../../utils/sweetalert'
import Input from "~/components/ui/Input";
import Select from "~/components/ui/Select"
import Error from "~/components/ui/Error";

export default function Pengguna() {
    const [open, setIsOpen] = useState(false);
    const { role, pengguna, errors, searchRes } = usePage<{ role: { idHakAkses: number, namaHakAkses: string }[], pengguna: { id: number, idPengguna: number, hakAkses: { namaHakAkses: string }, namaPengguna: string, nomorTelepon: string }[], searchRes: { idPengguna: number, hakAkses: { namaHakAkses: string }, namaPengguna: string, nomorTelepon: string }[] }>().props;
    const { data, setData, post, get, delete: destroy, processing, reset } = useForm({
        id_pengguna: "",
        id_hak_akses: "",
        email: "",
        password: "",
        nama_pengguna: "",
        nomor_telepon: "",
    });
    function handleCreate(e: SubmitEvent) {
        e.preventDefault();
        post('/pengguna/create', {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            }
        })
    }
    function handleDelete(id: number) {
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
    function handleSearch() {
        const query = new URLSearchParams(data).toString()
        get(`/pengguna/search?${query}`, {
            preserveState: true,
            replace: true,
        })
    }
    const displayPengguna = searchRes?.length > 0 ? searchRes : pengguna;
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Manajemen Pengguna</Heading>
            <div className="flex flex-row justify-between mt-5">
                <Button onClick={() => setIsOpen(true)} variant={1} size="md">Tambah Pengguna</Button>
                <Modal open={open} onClose={() => setIsOpen(false)} center styles={{ modal: { width: "1024px" } }}>
                    <Heading level={1} color="dark_slate_grey" className="font-bold">Tambah Pengguna</Heading>
                    <form className="flex flex-col gap-2" onSubmit={handleCreate}>
                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Email Pengguna</Paragraph>
                            <Input variant={1} size="md" type="text" name="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder="Email Pengguna" />
                            {errors.email && <Error variant={1}>{errors.email}</Error>}
                        </div>

                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Password</Paragraph>
                            <Input variant={1} size="md" type="password" name="password" value={data.password} onChange={e => setData('password', e.target.value)} placeholder="Password Pengguna" />
                            {errors.password && <Error variant={1}>{errors.password}</Error>}
                        </div>

                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Nama Pengguna</Paragraph>
                            <Input variant={1} size="md" type="text" name="nama_pengguna" value={data.nama_pengguna} onChange={e => setData('nama_pengguna', e.target.value)} placeholder="Nama Pengguna" />
                            {errors.nama_pengguna && <Error variant={1}>{errors.nama_pengguna}</Error>}
                        </div>

                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Nomor Telepon</Paragraph>
                            <PhoneInput placeholder="Nomor telepon Pengguna" value={data.nomor_telepon} onChange={(e) => setData("nomor_telepon", e ?? "")} />
                            {errors.nomor_telepon && <Error variant={1}>{errors.nomor_telepon}</Error>}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Hak Akses</Paragraph>
                            <Select variant={1} size="md" name="id_hak_akses" onChange={(e) => setData('id_hak_akses', e.target.value)}>
                                <option value="">Pilih Hak Akses</option>
                                {role?.map(items => (
                                    <option key={items.idHakAkses} value={items.idHakAkses} >{items.namaHakAkses}</option>
                                ))}
                            </Select>
                            {errors.id_hak_akses && <Error variant={1}>{errors.id_hak_akses}</Error>}
                        </div>

                        <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Menambahkan...." : "Tambahkan"}</Button>
                    </form>
                </Modal>
                <div className="flex flex-row gap-5 ">
                    <Input variant={1} size="md" type="text" placeholder="Cari Pengguna..." value={data.nama_pengguna} onChange={(e) => setData('nama_pengguna', e.target.value)}></Input>
                    <ActionButton as="button" type="update" size="lg" onClick={handleSearch}>
                        <FaSearch />
                    </ActionButton>
                </div>
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
                    {displayPengguna?.length > 0 ? displayPengguna?.map(items => (
                        <tr key={items.idPengguna}>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.namaPengguna}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.hakAkses?.namaHakAkses}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.nomorTelepon}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5">
                                <div className="flex flex-row gap-2 justify-center">
                                    <Link route='updatePengguna.edit' routeParams={{ id: items.idPengguna }}>
                                        <ActionButton as="div" className="flex items-center" type="update" size="sm">
                                            <FaPen />
                                        </ActionButton>
                                    </Link>
                                    <ActionButton type="delete" size="sm" onClick={() => handleDelete(items.idPengguna)}><FaTrash /></ActionButton>
                                </div>
                            </td>
                        </tr>
                    )) : <tr><td colSpan={4} className="border border-gray-300 py-3 text-center"><Paragraph size="lg">Tidak ada pengguna</Paragraph></td></tr>}
                </tbody>
            </table>
        </>
    )
}
