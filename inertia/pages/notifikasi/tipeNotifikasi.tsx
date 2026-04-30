import Heading from "~/components/ui/Heading"
import { useState } from "react";
import Button from "~/components/ui/Button/Button";
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import Paragraph from "~/components/ui/Paragraph";
import Input from "~/components/ui/Input";
import { useForm, usePage, router } from "@inertiajs/react";
import { SubmitEvent } from "react";
import Error from "~/components/ui/Error";
import ActionButton from "~/components/ui/Button/ActionButton";
import { FaTrash, FaPen, FaSearch } from "react-icons/fa";
import { Link } from "@adonisjs/inertia/react";
import { showDeleteDialog } from "../../../utils/sweetalert";


export default function TipeNotifikasi() {
    const [open, setIsOpen] = useState(false);
    const { errors, tipeNotifikasi, searchRes } = usePage<{ tipeNotifikasi: { idTipeNotifikasi: number, kodeNotifikasi: number, namaNotifikasi: string }[], searchRes: { idTipeNotifikasi: number, kodeNotifikasi: number, namaNotifikasi: string }[] }>().props;
    const { data, setData, post, get, delete: destroy, processing, reset } = useForm({
        kode_notifikasi: "",
        nama_notifikasi: ""
    })
    const [searchData, setSearchData] = useState("");

    function handleCreate(e: SubmitEvent) {
        e.preventDefault();
        post('/tipe-notifikasi/create', {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        })
    }
    function handleDelete(id: number) {
        showDeleteDialog(() => {
            destroy(`/tipe-notifikasi/delete/${id}`);
        }, "Yakin ingin menghapus tipe notifikasi ?", "Data akan dihapus secara permanen");
    }
    function handleSearch() {
        router.get(`/tipe-notifikasi/search`, { search: searchData }, {
            preserveState: true,
            replace: true,
        })
    }
    const displayTipeNotifikasi = searchRes && searchRes.length > 0
        ? searchRes
        : tipeNotifikasi;
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Manajemen Tipe Notifikasi</Heading>
            <div className="flex flex-col  w-full bg-white shadow-md rounded-md p-5">
                <div className="flex flex-row justify-between mt-5">
                    <Button onClick={() => setIsOpen(true)} variant={1} size="md">Tambah Tipe Notifikasi</Button>
                    <Modal open={open} onClose={() => setIsOpen(false)} center styles={{ modal: { width: "1024px" } }}>
                        <Heading level={1} color="dark_slate_grey" className="font-bold">Tambah Tipe Notifikasi</Heading>
                        <form className="flex flex-col gap-2" onSubmit={handleCreate}>
                            <Paragraph size="lg">Kode Tipe Notifikasi</Paragraph>
                            <Input variant={1} size="md" type="text" name="kode_notifikasi" placeholder="Kode Notifikasi" value={data.kode_notifikasi} onChange={e => setData('kode_notifikasi', e.target.value)}></Input>
                            {errors.kode_notifikasi && <Error variant={1}>{errors.kode_notifikasi}</Error>}

                            <Paragraph size="lg">Nama Notifikasi</Paragraph>
                            <Input variant={1} size="md" type="text" name="nama_notifikasi" placeholder="Nama Notifikasi" value={data.nama_notifikasi} onChange={e => setData('nama_notifikasi', e.target.value)}></Input>
                            {errors.nama_notifikasi && <Error variant={1}>{errors.nama_notifikasi}</Error>}
                            <Button type="submit" variant={1} size="md" disabled={processing} >{processing ? "Menambahkan...." : "Tambahkan"}</Button>
                        </form>
                    </Modal>
                    <div className="flex flex-row gap-5 ">
                        <Input variant={1} size="md" type="text" placeholder="Cari Nama Tipe Notifikasi" value={searchData} onChange={(e) => setSearchData(e.target.value)}></Input>
                        <ActionButton as="button" type="search" size="lg" onClick={handleSearch}>
                            <FaSearch />
                        </ActionButton>
                    </div>
                </div>
                <table className="w-full border-collapse mt-5 bg-white">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 py-3">Kode Notifikasi</th>
                            <th className="border border-gray-300 py-3">Nama Tipe Notifikasi</th>
                            <th className="border border-gray-300 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayTipeNotifikasi?.length > 0 ? displayTipeNotifikasi?.map(items => (
                            <tr key={items.idTipeNotifikasi}>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.kodeNotifikasi}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.namaNotifikasi}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5">
                                    <div className="flex flex-row gap-2 justify-center">
                                        <Link route="tipeNotifikasi.edit" routeParams={{ id: items.idTipeNotifikasi }}>
                                            <ActionButton as="div" className="flex items-center" type="update" size="sm">
                                                <FaPen />
                                            </ActionButton>
                                        </Link>
                                        <ActionButton type="delete" size="sm" onClick={() => handleDelete(items.idTipeNotifikasi)}><FaTrash /></ActionButton>
                                    </div>
                                </td>
                            </tr>
                        )) : <tr><td colSpan={2} className="text-center py-4"><Paragraph size="lg">Tidak Ada Tipe Notifikasi</Paragraph></td></tr>}
                    </tbody>
                </table>
            </div>
        </>

    )
}