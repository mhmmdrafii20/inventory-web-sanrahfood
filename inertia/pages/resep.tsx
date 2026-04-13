import Heading from "~/components/ui/Heading";
import ActionButton from "~/components/ui/Button/ActionButton";
import { FaSearch } from "react-icons/fa";
import { Link } from "@adonisjs/inertia/react";
import { FaPen } from "react-icons/fa";
import Paragraph from "~/components/ui/Paragraph";
import { FaTrash } from "react-icons/fa";
import Button from "~/components/ui/Button/Button";
import { useState } from "react";
import Modal from "react-responsive-modal";

export default function Resep () {
    const [open, setIsOpen] = useState(false);
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Manajemen Resep</Heading>
            <div className="flex flex-row justify-between mt-5">
                <Button onClick={() => setIsOpen(true)} variant={1} size="md">Tambah Resep</Button>
                 <Modal open={open} onClose={() => setIsOpen(false)}  center styles={{modal:{width:"1024px"}}} closeOnOverlayClick={false} closeOnEsc={false}>
                    <Heading level={1} color="dark_slate_grey" className="font-bold">Tambah Resep</Heading>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Nama Resep</Paragraph>
                                <input className="w-full" type="text" name="nama_resep" placeholder="Tuliskan nama resep disini" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Produk</Paragraph>
                                <select className="w-full">
                                <option>Pilih Produk</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Status</Paragraph>
                                <select className="w-full">
                                    <option>Pilih Status</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Batch</Paragraph>
                                <input className="w-full" type="number" name="batch" placeholder="Tuliskan batch disini" />
                            </div>
                            <div className="mt-auto">
                                <Button className="w-full" variant={1} size="md">Tambah Resep</Button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Bahan Baku</Paragraph>
                                <select className="w-full">
                                    <option>C1</option>
                                    <option>C2</option>
                                    <option>C3</option>
                                </select>
                            </div>
                            <Paragraph size="lg">List Bahan Baku</Paragraph>
                            <ol className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <li className="flex-1">Bahan Baku 1</li>
                                    <input type="number" className="w-20" placeholder="Jumlah" />
                                    <ActionButton type="delete" size="xs">
                                        <FaTrash size={10} />
                                    </ActionButton>
                                </div>
                                </ol>
                            <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Catatan Tambahan</Paragraph>
                                <textarea className="w-full" placeholder="Tuliskan catatan tambahan disini" rows={10}></textarea>
                            </div>
                        </div>
                    </div>
                 </Modal>
                <div className="flex flex-row gap-5 ">
                    <input placeholder="Cari Resep"></input>
                    <ActionButton type="search" size="lg">
                        <FaSearch/>
                    </ActionButton>
                </div>
            </div>
            <table className="w-full border-collapse mt-5 bg-white">
                <thead>
                    <tr>
                        <th className="border border-gray-300 py-3">Nama Resep</th>
                        <th className="border border-gray-300 py-3">Produk</th>
                        <th className="border border-gray-300 py-3">Batch</th>
                        <th className="border border-gray-300 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {bahan.map(items => ( */}
                        <tr key="">
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">s</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">s</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">s</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5">
                                <div className="flex flex-row gap-2 justify-center">
                                    {/* <Link route='updateBahan.edit' routeParams={}>  */}
                                        <ActionButton type="update" size="sm">
                                            <FaPen/>
                                        </ActionButton>
                                    {/* </Link> */}
                                    <ActionButton type="delete" size="sm"><FaTrash/></ActionButton>
                                </div>
                            </td>
                        </tr>
                    {/* ))} */}
                </tbody>
            </table>
        </>
    )
}