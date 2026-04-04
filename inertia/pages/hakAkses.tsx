import Modal from "react-responsive-modal";
import Button from "~/components/ui/Button/Button"
import Heading from "~/components/ui/Heading"
import { SubmitEvent, useState } from "react";
import 'react-responsive-modal/styles.css';
import Paragraph from "~/components/ui/Paragraph";
import { useForm } from "@inertiajs/react";
import {usePage} from "@inertiajs/react";
import ActionButton from "~/components/ui/Button/ActionButton";
import { FaSearch, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "@adonisjs/inertia/react";

export default function HakAkses () {
    const [open, setIsOpen] = useState(false);
    const {role} = usePage<{role:{idHakAkses:number, namaHakAkses:string} []}>().props;
        const {data, setData, post, delete:destroy, processing, errors, reset} = useForm({
            nama_hak_akses: "",
        })

        function handleCreate (e:SubmitEvent) {
            e.preventDefault();
            post('/role/create', {
                onSuccess:() => {
                    reset();
                },
                onFinish:() => {
                    setIsOpen(false);
                }
            })
        }
        function handleDelete (id:number) {
            destroy(`/role/delete/${id}`);
        }

    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Manajemen Hak Akses</Heading>
            <div className="flex flex-row justify-between mt-5">
                <Button size="md" onClick={() => setIsOpen(true)} variant={1}>Tambah Hak Akses</Button>
                <Modal open={open} onClose={() => setIsOpen(false)}  center styles={{modal:{width:"1024px"}}}>
                    <Heading level={1} color="dark_slate_grey" className="font-bold">Tambah Hak Akses</Heading>
                    <form className="flex flex-col gap-2" onSubmit={handleCreate}>
                        <div className="flex flex-col gap-3 mb-5 mt-5">
                            <Paragraph size="lg">Nama Hak Akses</Paragraph>
                            <input type="text"  name="nama_hak_akses" placeholder="Nama Hak Akses" value={data.nama_hak_akses} onChange={e => setData('nama_hak_akses', e.target.value)} />
                        </div>                        
                        {errors.nama_hak_akses && <div>{errors.nama_hak_akses}</div>}

                        <Button type="submit" variant={1} disabled={processing} size="md">Tambahkan</Button>
                    </form>
                </Modal>
                <div className="flex flex-row gap-5 ">
                    <input placeholder="Cari Bahan Baku...."></input>
                    <ActionButton type="search" size="lg">
                        <FaSearch/>
                    </ActionButton>
                </div>
            </div>
            <table className="w-full border-collapse mt-5 bg-white">
                <thead>
                    <tr>
                        <th className="border border-gray-300 py-3">Hak Akses</th>
                        <th className="border border-gray-300 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {role.map(items => (
                        <tr key={items.idHakAkses}>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.namaHakAkses}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5">
                                <div className="flex flex-row gap-2 justify-center">
                                    <Link route="updateHakAkses.edit" routeParams={{id:items.idHakAkses}}> 
                                        <ActionButton type="update" size="sm">
                                            <FaPen/>
                                        </ActionButton>
                                    </Link>
                                    <ActionButton type="delete" size="sm" onClick={() => handleDelete(items.idHakAkses)}><FaTrash/></ActionButton>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        </>
    )
}