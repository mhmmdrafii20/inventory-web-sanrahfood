import Heading from "~/components/ui/Heading";
import Button from "~/components/ui/Button/Button";
import Modal from "react-responsive-modal";
import Paragraph from "~/components/ui/Paragraph";
import { FaSearch, FaPen, FaTrash, FaTrashRestore } from "react-icons/fa";
import ActionButton from "~/components/ui/Button/ActionButton";
import { useState, SubmitEvent } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import { Link } from "@adonisjs/inertia/react";
import { showDeleteDialog } from "../../../utils/sweetalert";
import Input from "~/components/ui/Input";
import Error from "~/components/ui/Error";

export default function Kategori() {
    const [open, setIsOpen] = useState(false);
    const { kategori, errors, searchRes } = usePage<{ kategori: { idKategori: number, namaKategori: string }[], searchRes: { idKategori: number, namaKategori: string }[] }>().props;
    const { data, setData, post, get, delete: destroy, processing, reset } = useForm({
        nama_kategori: "",
    })
    const [searchData, setSearchData] = useState("");

    function handleCreate(e: SubmitEvent) {
        e.preventDefault();
        post('/kategori-produk/create', {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        })
    }
    function handleDelete(id: number) {
        showDeleteDialog(() => {
            destroy(`/kategori-produk/delete/${id}`);
        });
    }
    function handleSearch() {
        router.get(`/kategori-produk/search`, { search: searchData }, {
            preserveState: true,
            replace: true,
        })
    }
    const displayKategori = searchRes && searchRes.length > 0
        ? searchRes
        : kategori;
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Manajemen Kategori Produk</Heading>
            <div className="flex flex-col  w-full bg-white shadow-md rounded-md p-5">
                <div className="flex flex-row justify-between mt-5">
                    <Button size="md" onClick={() => setIsOpen(true)} variant={1}>Tambah Kategori Produk</Button>
                    <Modal open={open} onClose={() => setIsOpen(false)} center styles={{ modal: { width: "1024px" } }}>
                        <Heading level={1} color="dark_slate_grey" className="font-bold">Tambah Kategori Produk</Heading>
                        <form className="flex flex-col gap-2" onSubmit={handleCreate}>
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Nama Kategori</Paragraph>
                                <Input variant={1} size="md" type="text" name="nama_kategori" placeholder="Nama Kategori" value={data.nama_kategori} onChange={e => setData('nama_kategori', e.target.value)} />
                            </div>
                            {errors.nama_kategori && <Error variant={1}>{errors.nama_kategori}</Error>}

                            <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Menambahkan...." : "Tambahkan"}</Button>
                        </form>
                    </Modal>
                    <div className="flex flex-row gap-3 ">
                        <Input variant={1} size="md" type="text" name="nama_kategori" placeholder="Cari Nama Kategori Produk" value={searchData} onChange={e => setSearchData(e.target.value)}></Input>
                        <ActionButton as="button" type="search" size="lg" onClick={handleSearch}>
                            <FaSearch />
                        </ActionButton>
                        <Link href="/kategori-produk/trash">
                            <ActionButton as="button" className="flex items-center" type="restore" size="lg" title="Lihat data yang terhapus">
                                <FaTrashRestore />
                            </ActionButton>
                        </Link>
                    </div>
                </div>
                <table className="w-full border-collapse mt-5 bg-white">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 py-3">Nama Kategori Produk</th>
                            <th className="border border-gray-300 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayKategori?.length > 0 ? displayKategori.map(items => (
                            <tr key={items.idKategori}>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.namaKategori}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5">
                                    <div className="flex flex-row gap-2 justify-center">
                                        <Link route="kategoriProduk.edit" routeParams={{ id: items.idKategori }}>
                                            <ActionButton as="div" className="flex items-center" type="update" size="sm">
                                                <FaPen />
                                            </ActionButton>
                                        </Link>
                                        <ActionButton type="delete" size="sm" onClick={() => handleDelete(items.idKategori)}><FaTrash /></ActionButton>
                                    </div>
                                </td>
                            </tr>
                        )) : <tr><td colSpan={2} className="text-center py-4"><Paragraph size="lg">Tidak Ada Kategori Produk</Paragraph></td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    )
}