import Heading from "~/components/ui/Heading";
import Input from "~/components/ui/Input"
import ActionButton from "~/components/ui/Button/ActionButton";
import { FaSearch } from "react-icons/fa";
import Button from "~/components/ui/Button/Button";
import { useState } from "react";
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import Select from "~/components/ui/Select";
import Paragraph from "~/components/ui/Paragraph";
import TextArea from "~/components/ui/Textarea";
import { useForm, usePage, router } from "@inertiajs/react";
import Error from "~/components/ui/Error";
import { SubmitEvent } from "react";
import { showDeleteDialog } from "../../../utils/sweetalert";
import { Link } from "@adonisjs/inertia/react";
import { FaPen, FaTrash } from "react-icons/fa";

export default function TemplateNotifikasi() {
    const [open, setIsOpen] = useState(false);
    const [searchData, setSearchData] = useState("");
    const { tipeNotifikasi, errors, templateNotifikasi, searchRes } = usePage<{ tipeNotifikasi: { idTipeNotifikasi: number, kodeNotifikasi: number, namaNotifikasi: string, templateVariables: string[] }[], templateNotifikasi: { idTemplateNotifikasi: number, namaTemplate: string, idTipeNotifikasi: number, konten: string, tipe_notifikasi: { idTipeNotifikasi: number, kodeNotifikasi: number, namaNotifikasi: string, templateVariables: string[] } }[], searchRes: { idTemplateNotifikasi: number, namaTemplate: string, tipe_notifikasi: { idTipeNotifikasi: number, kodeNotifikasi: number, namaNotifikasi: string, templateVariables: string[] }, konten: string }[] }>().props;
    const { data, setData, post, get, delete: destroy, processing, reset } = useForm({
        id_tipe_notifikasi: "",
        nama_template: "",
        konten: ""
    })
    function handleCreate(e: SubmitEvent) {
        e.preventDefault();
        post('/template-notifikasi/create', {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        })
    }
    function handleSearch() {
        router.get(`/template-notifikasi/search`, { search: searchData }, {
            preserveState: true,
            replace: true,
        })
    }
    const displayTemplateNotifikasi = searchRes && searchRes.length > 0
        ? searchRes
        : templateNotifikasi;

    function handleDelete(id: number) {
        showDeleteDialog(() => {
            destroy(`/template-notifikasi/delete/${id}`);
        }, "Yakin ingin menghapus template notifikasi ?", "Data akan dihapus secara permanen");
    }
    const selectedTipe = tipeNotifikasi?.find(
        items => items.idTipeNotifikasi === Number(data.id_tipe_notifikasi)
    )

    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Template Notifikasi</Heading>
            <div className="flex flex-col gap-5  bg-white shadow-md rounded-md p-5">
                <div className="flex flex-row justify-between mt-5">
                    <Button onClick={() => setIsOpen(true)} variant={1} size="md">Tambah Template Notifikasi</Button>
                    <Modal open={open} onClose={() => setIsOpen(false)} center styles={{ modal: { width: "1024px" } }}>
                        <Heading level={1} color="dark_slate_grey" className="font-bold">Tambah Template Notifikasi</Heading>
                        <form className="flex flex-col gap-2 h-[600px]" onSubmit={(handleCreate)}>
                            <Paragraph size="lg">Tipe Notifikasi</Paragraph>
                            <Select variant={1} size="md" name="id_tipe_notifikasi" value={data.id_tipe_notifikasi} onChange={(e) => setData('id_tipe_notifikasi', e.target.value)}>
                                <option value="">Pilih Tipe Notifikasi</option>
                                {tipeNotifikasi?.map((items => (
                                    <option key={items.idTipeNotifikasi} value={items.idTipeNotifikasi}>{items.namaNotifikasi}</option>
                                )))}
                            </Select>
                            {errors.id_tipe_notifikasi && <Error variant={1}>{errors.id_tipe_notifikasi}</Error>}

                            <Paragraph size="lg">Nama Template</Paragraph>
                            <Input variant={1} size="md" type="text" placeholder="Nama Template" name="nama_template" value={data.nama_template} onChange={(e) => setData('nama_template', e.target.value)} />
                            {errors.nama_template && <Error variant={1}>{errors.nama_template}</Error>}

                            <Paragraph size="lg">Konten</Paragraph>
                            <TextArea variant={1} size="md" rows={10} placeholder={
                                selectedTipe && selectedTipe?.templateVariables && selectedTipe?.templateVariables?.length > 0
                                    ? `Contoh: Halo {${selectedTipe?.templateVariables[0]}}, stok {${selectedTipe?.templateVariables[1] ?? selectedTipe?.templateVariables[0]}} sudah mencapai batas minimum`
                                    : "Pilih tipe notifikasi terlebih dahulu..."
                            } name="konten" value={data.konten} onChange={(e) => setData('konten', e.target.value)} />
                            {errors.konten && <Error variant={1}>{errors.konten}</Error>}

                            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700 mt-5 mb-5">
                                <Paragraph color="red_500" className="font-bold mb-2" size="md">VARIABLE TERSEDIA :</Paragraph>
                                {!data.id_tipe_notifikasi ? (
                                    <p className="text-xs text-red-500">Pilih tipe notifikasi dulu untuk melihat variabel yang tersedia.</p>
                                ) : (
                                    <>
                                        <div className="flex flex-row flex-wrap gap-2">
                                            {selectedTipe?.templateVariables?.map((variable) => (
                                                <code key={variable} className="bg-red-100 px-2 py-1 rounded text-xs">
                                                    {`{${variable}}`}
                                                </code>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-xs text-red-500">
                                            Gunakan variabel di atas dengan format <code className="bg-red-100 px-1 rounded">{'{nama_variabel}'}</code> di dalam <b>konten</b>
                                        </p>
                                    </>
                                )}
                            </div>

                            <Button type="submit" variant={1} size="md" disabled={processing}>{processing ? "Menambahkan...." : "Tambahkan"}</Button>
                        </form>
                    </Modal>
                    <div className="flex flex-row gap-3 items-center">
                        <Input variant={1} size="md" type="text" placeholder="Cari Nama Template Notifikasi...." className="flex-1" value={searchData} onChange={(e) => setSearchData(e.target.value)} />
                        <ActionButton as="button" type="search" size="lg" onClick={handleSearch}>
                            <FaSearch />
                        </ActionButton>
                    </div>
                </div>
                <table className="w-full border-collapse mt-5 bg-white">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 py-3">Nama Template Notifikasi</th>
                            <th className="border border-gray-300 py-3">Tipe Notifikasi</th>
                            <th className="border border-gray-300 py-3">Konten</th>
                            <th className="border border-gray-300 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayTemplateNotifikasi?.length > 0 ? displayTemplateNotifikasi?.map(items => (
                            <tr key={items.idTemplateNotifikasi}>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.namaTemplate}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.tipe_notifikasi.namaNotifikasi}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.konten}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5">
                                    <div className="flex flex-row gap-2 justify-center">
                                        <Link route='templateNotifikasi.edit' routeParams={{ id: items.idTemplateNotifikasi }}>
                                            <ActionButton as="div" className="flex items-center" type="update" size="sm">
                                                <FaPen />
                                            </ActionButton>
                                        </Link>
                                        <ActionButton type="delete" size="sm" onClick={() => handleDelete(items.idTemplateNotifikasi)}><FaTrash /></ActionButton>
                                    </div>
                                </td>
                            </tr>
                        )) : <tr className="border border-gray-300"><td colSpan={6} className="text-center py-4"><Paragraph size="lg">Tidak Ada Template Notifikasi</Paragraph></td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    )
}   