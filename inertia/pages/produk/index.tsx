import Heading from "~/components/ui/Heading"
import Button from "~/components/ui/Button/Button"
import { SubmitEvent, useState } from "react";
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import { useForm, usePage, router } from "@inertiajs/react";
import Paragraph from "~/components/ui/Paragraph";
import ActionButton from "~/components/ui/Button/ActionButton";
import { FaSearch, FaPen, FaTrash, FaTrashRestore } from "react-icons/fa";
import { Link } from "@adonisjs/inertia/react";
import { showDeleteDialog } from '../../../utils/sweetalert'
import Input from "~/components/ui/Input";
import Select from "~/components/ui/Select";
import Error from "~/components/ui/Error";

export default function Index() {
    const [open, setIsOpen] = useState(false);
    const { kategori, produk, errors, searchRes } = usePage<{ kategori: { idKategori: number, namaKategori: string }[], produk: { idProduk: number, namaProduk: string, satuan: string, kategori: { namaKategori: string } }[], searchRes: { idProduk: number, namaProduk: string, satuan: string, kategori: { namaKategori: string } }[] }>().props;
    const { data, setData, post, get, delete: destroy, processing, reset } = useForm({
        nama_produk: "",
        satuan: "",
        id_kategori: "",
    });

    const [searchData, setSearchData] = useState("");

    function handleCreate(e: SubmitEvent) {
        e.preventDefault();
        post('/produk/create', {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            }
        })
    }
    function handleDelete(id: number) {
        showDeleteDialog(() => {
            destroy(`/produk/delete/${id}`);
        });
    }
    function handleSearch() {
        router.get(`/produk/search`, { search: searchData }, {
            preserveState: true,
            replace: true,
        })
    }
    const displayProduk = searchRes?.length > 0 ? searchRes : produk;

    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Manajemen Produk</Heading>
            <div className="flex flex-col  w-full bg-white shadow-md rounded-md p-5">
                <div className="flex flex-row justify-between mt-5">
                    <Button onClick={() => setIsOpen(true)} variant={1} size="md">Tambah Produk</Button>
                    <Modal open={open} onClose={() => setIsOpen(false)} center styles={{ modal: { width: "1024px" } }}>
                        <Heading level={1} color="dark_slate_grey" className="font-bold">Tambah Produk</Heading>
                        <form className="flex flex-col gap-2" onSubmit={handleCreate}>
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Nama Produk</Paragraph>
                                <Input variant={1} size="md" type="text" name="nama_produk" placeholder="Nama Produk" value={data.nama_produk} onChange={(e) => setData('nama_produk', e.target.value)} />
                                {errors.nama_produk && <Error variant={1}>{errors.nama_produk}</Error>}
                            </div >
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Satuan</Paragraph>
                                <Input variant={1} size="md" type="text" name="satuan" placeholder="Satuan Produk" value={data.satuan} onChange={(e) => setData('satuan', e.target.value)} />
                                {errors.satuan && <Error variant={1}>{errors.satuan}</Error>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Kategori Produk</Paragraph>
                                <Select variant={1} size="md" name="id_kategori" onChange={(e) => setData('id_kategori', e.target.value)}>
                                    <option value="">Pilih Kategori</option>
                                    {kategori?.map(items => (
                                        <option key={items.idKategori} value={items.idKategori} >{items.namaKategori}</option>
                                    ))}
                                </Select>
                                {errors.id_kategori && <Error variant={1}>{errors.id_kategori}</Error>}
                            </div>
                            <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Menambahkan...." : "Tambahkan"}</Button>
                        </form>
                    </Modal>
                    <div className="flex flex-row gap-3 ">
                        <Input variant={1} size="md" type="text" placeholder="Cari Nama Produk..." value={searchData} onChange={(e) => setSearchData(e.target.value)}></Input>
                        <ActionButton as="button" type="search" size="lg" onClick={handleSearch}>
                            <FaSearch />
                        </ActionButton>
                        <Link href="/produk/trash">
                            <ActionButton as="button" className="flex items-center" type="restore" size="lg" title="Lihat data yang terhapus">
                                <FaTrashRestore />
                            </ActionButton>
                        </Link>
                    </div>
                </div>
                <table className="w-full border-collapse mt-5 bg-white">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 py-3">Nama Produk</th>
                            <th className="border border-gray-300 py-3">Kategori Produk</th>
                            <th className="border border-gray-300 py-3">Satuan</th>
                            <th className="border border-gray-300 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayProduk?.length > 0 ? displayProduk?.map(items => (
                            <tr key={items.idProduk}>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.namaProduk}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.kategori.namaKategori}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.satuan}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5">
                                    <div className="flex flex-row gap-2 justify-center">
                                        <Link route='produk.edit' routeParams={{ id: items.idProduk }}>
                                            <ActionButton className="flex items-center" as="div" type="update" size="sm">
                                                <FaPen />
                                            </ActionButton>
                                        </Link>
                                        <ActionButton type="delete" size="sm" onClick={() => handleDelete(items.idProduk)}><FaTrash /></ActionButton>
                                    </div>
                                </td>
                            </tr>
                        )) : (<tr className="border border-gray-300"><td colSpan={7} className="text-center py-4"><Paragraph size="lg">Tidak Ada Produk</Paragraph></td></tr>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}