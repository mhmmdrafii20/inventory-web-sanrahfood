import Heading from "~/components/ui/Heading"
import Button from "~/components/ui/Button/Button"
import { SubmitEvent, useState } from "react";
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import { useForm } from "@inertiajs/react";
import Paragraph from "~/components/ui/Paragraph";
import {usePage} from "@inertiajs/react";
import ActionButton from "~/components/ui/Button/ActionButton";
import { FaSearch } from "react-icons/fa";

export default function Produk () {
    const [open, setIsOpen] = useState(false);
    const {kategori} = usePage<{kategori:{idKategori:number, namaKategori:string} []}>().props;

    const {data, setData, post, delete:destroy, processing, errors, reset} = useForm({
        id_kategori: "",
        nama_produk:"",
        satuan:"",
    });
    
    function handleCreate (e:SubmitEvent) {
        e.preventDefault();
        post('/produk/create', {
            onSuccess: () => {
                reset()
            }
        })
    }

    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Manajemen Produk</Heading>
             <div className="flex flex-row justify-between mt-5">
                   <Button onClick={() => setIsOpen(true)} variant={1} size="md">Tambah Produk</Button>
                     <Modal open={open} onClose={() => setIsOpen(false)}  center styles={{modal:{width:"1024px"}}}>
                          <Heading level={1} color="dark_slate_grey" className="font-bold">Tambah Produk</Heading>
                            <form className="flex flex-col gap-2" onSubmit={handleCreate}>
                                <div className="flex flex-col gap-3">
                                        <Paragraph size="lg">Nama Produk</Paragraph>
                                        <input type="text" name="nama_produk" placeholder="Nama Produk" value={data.nama_produk} onChange={(e) => setData('nama_produk', e.target.value)}></input>
                                        {errors.nama_produk && <div>{errors.nama_produk}</div>}
                                </div >
                                <div className="flex flex-col gap-3">
                                        <Paragraph size="lg">Satuan</Paragraph>
                                        <input type="text" name="satuan" placeholder="Satuan Produk" value={data.satuan} onChange={(e) => setData('satuan', e.target.value)}></input>
                                        {errors.satuan && <div>{errors.satuan}</div>}
                                </div>
                                <div className="flex flex-col gap-3">
                                        <Paragraph size="lg">Kategori Produk</Paragraph>
                                        <select name="id_kategori" onChange={(e) => setData('id_kategori', e.target.value)}>
                                            <option value="">Pilih Hak Akses</option>
                                             {kategori.map(items => (
                                                <option key={items.idKategori} value={items.idKategori} >{items.namaKategori}</option>
                                            ))}
                                        </select>
                                        {errors.id_kategori && <div>{errors.id_kategori}</div>}
                                </div>
                                <Button type="submit" variant={1} disabled={processing} size="md">Tambahkan</Button>
                            </form>
                    </Modal>
                    <div className="flex flex-row gap-5 ">
                        <input placeholder="Cari Produk..."></input>
                            <ActionButton type="search" size="lg">
                                <FaSearch/>
                            </ActionButton>
                    </div>
             </div>

        </>
    )
}