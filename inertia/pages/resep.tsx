import Heading from "~/components/ui/Heading";
import ActionButton from "~/components/ui/Button/ActionButton";
import { FaSearch } from "react-icons/fa";
import { Link } from "@adonisjs/inertia/react";
import { FaPen } from "react-icons/fa";
import Paragraph from "~/components/ui/Paragraph";
import { FaTrash } from "react-icons/fa";
import Button from "~/components/ui/Button/Button";
import { useState, SubmitEvent } from "react";
import Modal from "react-responsive-modal";
import { MultiSelect } from 'react-multi-select-component';
import { usePage, useForm } from "@inertiajs/react";
import confirmDialog from "../../utils/sweetalert";
import Input from "~/components/ui/Input";
import TextArea from "~/components/ui/Textarea";
import Select from "~/components/ui/Select";
import Error from "~/components/ui/Error";

export default function Resep() {
    type Option = {
        label: string
        value: string
    }

    const [open, setIsOpen] = useState(false);
    const { bahan, produk, resep, errors, searchRes } = usePage<{
        bahan: { idBahanBaku: number; namaBahanBaku: string; satuan: string; }[],
        produk: { idProduk: number; namaProduk: string; satuan: string; }[],
        resep: { idResep: number, namaResep: string, idProduk: string, yieldPerBatch: number, catatanTambahan: string, produk: { namaProduk: string, satuan: string } }[],
        searchRes: { idResep: number, namaResep: string, idProduk: string, yieldPerBatch: number, catatanTambahan: string, produk: { namaProduk: string, satuan: string } }[]
    }>().props;

    const options = bahan?.map(items => ({
        label: items.namaBahanBaku,
        value: String(items.idBahanBaku)
    }))
    const { data, setData, post, get, delete: destroy, processing, reset } = useForm({
        nama_resep: "",
        id_produk: "",
        yield_per_batch: "",
        catatan_tambahan: "",
        bahan: [] as {
            id_bahan_baku: string,
            nama_bahan_baku: string
            jumlah: number,
        }[],
    });
    function handleCreate(e: SubmitEvent) {
        e.preventDefault();

        post('/resep/create', {
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
                destroy(`/resep/delete/${id}`);
            },
            "Hapus",
            "Batal")
    }
    function handleSearch() {
        const query = new URLSearchParams(data.nama_resep).toString()
        get(`/resep/search?${query}`, {
            preserveState: true,
            replace: true,
        })
    }
    const displayResep = searchRes?.length > 0 ? searchRes : resep;
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Manajemen Resep</Heading>
            <div className="flex flex-row justify-between mt-5">
                <Button onClick={() => setIsOpen(true)} variant={1} size="md">Tambah Resep</Button>
                <Modal open={open} onClose={() => setIsOpen(false)} center styles={{ modal: { width: "1024px" } }} closeOnOverlayClick={false} closeOnEsc={false}>
                    <Heading level={1} color="dark_slate_grey" className="font-bold">Tambah Resep</Heading>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-10" onSubmit={handleCreate}>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Nama Resep</Paragraph>
                                <Input className="w-full" variant={1} size="md" type="text" name="nama_resep" value={data.nama_resep} placeholder="Tuliskan nama resep disini" onChange={(e) => setData('nama_resep', e.target.value)} />
                            </div>
                            {errors.nama_resep && <Error variant={1}>{errors.nama_resep}</Error>}
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Produk</Paragraph>
                                <Select variant={1} size="md" className="w-full" name="id_produk" onChange={(e) => setData('id_produk', e.target.value)}>
                                    <option value=" ">Pilih Produk</option>
                                    {produk?.map(items => (
                                        <option key={items.idProduk} value={items.idProduk} >{items.namaProduk}</option>
                                    ))}
                                </Select>
                            </div>
                            {errors.id_produk && <Error variant={1}>{errors.id_produk}</Error>}
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Yield Per Batch</Paragraph>
                                <Input className="w-full" variant={1} size="md" type="number" name="yield_per_batch" value={data.yield_per_batch} placeholder="Tuliskan yield per batch disini" onChange={(e) => setData('yield_per_batch', e.target.value)} />
                            </div>
                            {errors.yield_per_batch && <Error variant={1}>{errors.yield_per_batch}</Error>}
                            <div className="mt-auto">
                                <Button type="submit" className="w-full" variant={1} disabled={processing} size="md">{processing ? "Menambahkan...." : "Tambahkan"}</Button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Bahan Baku</Paragraph>
                                <MultiSelect options={options} value={data.bahan.map(b => ({
                                    value: b.id_bahan_baku,
                                    label: options.find(o => o.value === b.id_bahan_baku)?.label ?? ""
                                }))} onChange={(val: Option[]) => {
                                    setData("bahan", val.map(v => ({
                                        id_bahan_baku: v.value,
                                        nama_bahan_baku: v.label,
                                        jumlah: 0
                                    })))
                                }} labelledBy="Select"></MultiSelect>
                                {errors.bahan && <Error variant={1}>{errors.bahan}</Error>}
                            </div>
                            <Paragraph size="lg">List Bahan Baku</Paragraph>
                            <div className="flex items-center gap-2">
                                <ul className="flex flex-col gap-5 w-full">
                                    {data.bahan && data.bahan.length > 0 ? data.bahan.map((items, i) =>
                                        <li key={i} className="flex flex-col gap-1">
                                            <div className="flex flex-row gap-3">
                                                <span className="flex-1">{items.nama_bahan_baku}</span>
                                                <Input variant={1} size="md" type="number" className="w-20" value={items.jumlah} placeholder="Jumlah" onChange={(e) => {
                                                    const updated = [...data.bahan];
                                                    updated[i].jumlah = Number(e.target.value);
                                                    setData("bahan", updated);
                                                }} />
                                            </div>
                                            {(errors)[`bahan.${i}.id_bahan_baku`] && <Error variant={1}>{(errors)[`bahan.${i}.id_bahan_baku`]}</Error>}
                                            {(errors)[`bahan.${i}.jumlah`] && <Error variant={1}>{(errors)[`bahan.${i}.jumlah`]}</Error>}
                                        </li>
                                    ) : (<Paragraph size="md" className="text-gray-500">Tidak Ada Bahan Baku</Paragraph>)}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Catatan Tambahan</Paragraph>
                                <TextArea variant={1} size="md" className="w-full" value={data.catatan_tambahan} placeholder="Tuliskan catatan tambahan disini" rows={10} onChange={(e) => setData('catatan_tambahan', e.target.value)} />
                            </div>
                            {errors.catatan_tambahan && <Error variant={1}>{errors.catatan_tambahan}</Error>}
                        </div>
                    </form>
                </Modal>
                <div className="flex flex-row gap-5 ">
                    <Input variant={1} size="md" type="text" name="" placeholder="Cari Resep" value={data.nama_resep} onChange={(e) => setData('nama_resep', e.target.value)} />
                    <ActionButton type="search" size="lg" onClick={handleSearch}>
                        <FaSearch />
                    </ActionButton>
                </div>
            </div>
            <table className="w-full border-collapse mt-5 bg-white">
                <thead>
                    <tr>
                        <th className="border border-gray-300 py-3">Nama Resep</th>
                        <th className="border border-gray-300 py-3">Produk</th>
                        <th className="border border-gray-300 py-3">Yield Per Batch</th>
                        <th className="border border-gray-300 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {displayResep?.length > 0 ? displayResep.map(items => (
                        <tr key={items.idResep}>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.namaResep}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.produk.namaProduk}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.yieldPerBatch}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5">
                                <div className="flex flex-row gap-2 justify-center">
                                    <Link route='updateResep.edit' routeParams={{ id: items.idResep }}>
                                        <ActionButton as="div" className="flex items-center" type="update" size="sm">
                                            <FaPen />
                                        </ActionButton>
                                    </Link>
                                    <ActionButton type="delete" size="sm" onClick={() => handleDelete(items.idResep)}><FaTrash /></ActionButton>
                                </div>
                            </td>
                        </tr>
                    )) : (<tr><td colSpan={4} className="border border-gray-300 py-3 text-center"><Paragraph size="lg">Tidak Ada Resep</Paragraph></td></tr>)}
                </tbody>
            </table>
        </>
    )
}