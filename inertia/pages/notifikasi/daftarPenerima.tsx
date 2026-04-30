import Heading from "~/components/ui/Heading"
import { useState } from "react";
import Button from "~/components/ui/Button/Button";
import Modal from "react-responsive-modal";
import Paragraph from "~/components/ui/Paragraph";
import 'react-responsive-modal/styles.css';
import Input from "~/components/ui/Input";
import Select from "~/components/ui/Select";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import { MultiSelect } from "react-multi-select-component";
import { useForm, usePage, router } from "@inertiajs/react";
import { SubmitEvent } from "react";
import Error from "~/components/ui/Error";
import ActionButton from "~/components/ui/Button/ActionButton";
import { Link } from "@adonisjs/inertia/react";
import { FaPen, FaTrash, FaSearch } from "react-icons/fa";
import { showDeleteDialog } from "../../../utils/sweetalert"

type Option = {
    label: string
    value: string
}

export default function DaftarPenerima() {
    const [open, setIsOpen] = useState(false);
    const [tipePenerima, setTipePenerima] = useState("");
    const [searchData, setSearchData] = useState("");
    const { tipeNotifikasi, pengguna, errors, searchRes, daftarPenerima } = usePage<{ tipeNotifikasi: { idTipeNotifikasi: number, kodeNotifikasi: string, namaNotifikasi: string }[], searchRes: { idPenerimaNotifikasi: number, namaPenerima: string, pengguna: { namaPengguna: string, nomorTelepon: string }, nomorTelepon: string }[], pengguna: { id: number, idPengguna: string, hakAkses: { namaHakAkses: string }, namaPengguna: string, nomorTelepon: string }[], daftarPenerima: { idPenerimaNotifikasi: number, namaPenerima: string, pengguna: { namaPengguna: string, nomorTelepon: string }, nomorTelepon: string }[] }>().props;

    const { data, setData, post, get, delete: destroy, processing, reset } = useForm({
        id_pengguna: "",
        nama_penerima: "",
        nomor_telepon: "",
        id_tipe_notifikasi: [] as number[]
    })
    const options = tipeNotifikasi?.map(items => ({
        label: items.namaNotifikasi,
        value: items.idTipeNotifikasi
    })) || []

    function handleCreate(e: SubmitEvent) {
        e.preventDefault();
        post('/daftar-penerima/create', {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        })
    }
    function onTipePenerimaChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setTipePenerima(e.target.value);
        reset();
    }
    function handleSearch() {
        router.get(`/daftar-penerima/search`, { search: searchData }, {
            preserveState: true,
            replace: true,
        })
    }
    const displayDaftarPenerima = searchRes && searchRes.length > 0
        ? searchRes
        : daftarPenerima;

    function handleDelete(id: number) {
        showDeleteDialog(() => {
            destroy(`/daftar-penerima/delete/${id}`);
        }, "Yakin ingin menghapus daftar penerima ?", "Data akan dihapus secara permanen");
    }
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Manajemen Daftar Penerima</Heading>
            <div className="flex flex-col  w-full bg-white shadow-md rounded-md p-5">
                <div className="flex flex-row justify-between mt-5">
                    <Button onClick={() => setIsOpen(true)} variant={1} size="md">Tambah Daftar Penerima</Button>
                    <Modal open={open} onClose={() => setIsOpen(false)} center styles={{ modal: { width: "1024px" } }}>
                        <Heading level={1} color="dark_slate_grey" className="font-bold">Tambah Daftar Penerima</Heading>
                        <form className="flex flex-col gap-2 h-[600px]" onSubmit={(handleCreate)}>
                            <Paragraph size="lg">Tipe Penerima</Paragraph>
                            <Select variant={1} size="md" name="tipe_penerima" value={tipePenerima} onChange={(e) => onTipePenerimaChange(e)}>
                                <option value=" ">Pilih Tipe Penerima</option>
                                <option value="Internal">Internal</option>
                                <option value="Eksternal">Eksternal</option>
                            </Select>
                            {tipePenerima === "Internal" && (
                                <>
                                    <Paragraph size="lg">Penerima Internal</Paragraph>
                                    <Select variant={1} size="md" name="id_pengguna" value={data.id_pengguna} onChange={(e) => setData('id_pengguna', e.target.value)}>
                                        <option value="">Pilih User Internal</option>
                                        {pengguna?.map((items => (
                                            <option key={items.idPengguna} value={items.idPengguna}>{items.namaPengguna}</option>
                                        )))}
                                    </Select>
                                    {errors.id_pengguna && <Error variant={1}>{errors.id_pengguna}</Error>}
                                </>
                            )}
                            {tipePenerima === "Eksternal" && (
                                <>
                                    <Paragraph size="lg">Nama Penerima</Paragraph>
                                    <Input variant={1} size="md" type="text" name="nama_penerima" placeholder="Nama Penerima" value={data.nama_penerima} onChange={(e) => setData('nama_penerima', e.target.value)}></Input>
                                    {errors.nama_penerima && <Error variant={1}>{errors.nama_penerima}</Error>}


                                    <Paragraph size="lg">Nomor Telepon</Paragraph>
                                    <PhoneInput placeholder="Nomor Telepon Penerima" value={data.nomor_telepon} onChange={(e) => setData("nomor_telepon", e ?? "")} />
                                    {errors.nomor_telepon && <Error variant={1}>{errors.nomor_telepon}</Error>}
                                </>
                            )}
                            <Paragraph size="lg">Notifikasi yang diterima</Paragraph>
                            <MultiSelect options={options} value={options.filter((item) => data.id_tipe_notifikasi.includes(item.value))} onChange={(val: Option[]) => { setData('id_tipe_notifikasi', val.map(item => Number(item.value))) }} labelledBy="Select"></MultiSelect>
                            {errors.id_tipe_notifikasi && <Error variant={1}>{errors.id_tipe_notifikasi}</Error>}
                            <div className="mt-auto">
                                <Button type="submit" variant={1} disabled={processing} size="md" className="w-full">{processing ? "Menambahkan...." : "Tambahkan"}</Button>
                            </div>
                        </form>
                    </Modal>
                    <div className="flex flex-row gap-5 ">
                        <Input variant={1} size="md" type="text" placeholder="Cari Nama Penerima" value={searchData} onChange={(e) => setSearchData(e.target.value)}></Input>
                        <ActionButton as="button" type="search" size="lg" onClick={handleSearch}>
                            <FaSearch />
                        </ActionButton>
                    </div>
                </div>
                <table className="w-full border-collapse mt-5 bg-white">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 py-3">Nama Penerima</th>
                            <th className="border border-gray-300 py-3">Nomor Telepon</th>
                            <th className="border border-gray-300 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayDaftarPenerima?.length > 0 ? displayDaftarPenerima?.map(items => (
                            <tr key={items.idPenerimaNotifikasi}>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.pengguna?.namaPengguna ?? items?.namaPenerima}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.pengguna?.nomorTelepon ?? items?.nomorTelepon}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5">
                                    <div className="flex flex-row gap-2 justify-center">
                                        <Link route='daftarPenerima.edit' routeParams={{ id: items.idPenerimaNotifikasi }}>
                                            <ActionButton as="div" className="flex items-center" type="update" size="sm">
                                                <FaPen />
                                            </ActionButton>
                                        </Link>
                                        <ActionButton type="delete" size="sm" onClick={() => handleDelete(items.idPenerimaNotifikasi)}><FaTrash /></ActionButton>
                                    </div>
                                </td>
                            </tr>
                        )) : <tr className="border border-gray-300"><td colSpan={6} className="text-center py-4"><Paragraph size="lg">Tidak Ada Daftar Penerima</Paragraph></td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    )
}
