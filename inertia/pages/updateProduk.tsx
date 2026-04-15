import { usePage, useForm } from "@inertiajs/react";
import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import Button from "~/components/ui/Button/Button";
import { SubmitEvent } from "react";

export default function UpdateProduk () {
    const  { dataProduk, kategori } = usePage<{dataProduk:{id_produk:number, nama_produk:string, satuan:string, id_kategori:number}, kategori:{idKategori:number, namaKategori:string} []}>().props;
    console.log(kategori)
    const {data, setData, put, processing, errors, reset} = useForm({
        id_produk:dataProduk.id_produk,
        id_kategori:dataProduk.id_kategori,
        nama_produk:dataProduk.nama_produk,
        satuan:dataProduk.satuan,
    });

    function handleUpdate (e:SubmitEvent) {
        e.preventDefault();
        put(`/produk/update/${dataProduk.id_produk}`, {
            onSuccess: () => {
                reset();
            },
         });
        }

    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Edit Produk</Heading>
            <form onSubmit={handleUpdate}>
                <input type="hidden" name="id_produk" value={data.id_produk} onChange={(e) => setData('id_produk', parseInt(e.target.value))}></input>
                
                <Paragraph size="lg">Nama Produk</Paragraph>
                <input type="text" name="nama_produk" value={data.nama_produk} onChange={(e) => setData('nama_produk', e.target.value)}></input>

                <Paragraph size="lg">Satuan</Paragraph>
                <input type="text" name="satuan" value={data.satuan} onChange={(e) => setData('satuan', e.target.value)}></input>

                <Paragraph size="lg">Kategori Produk</Paragraph>
                <select name="id_kategori"   defaultValue={data.id_kategori}  onChange={(e) => setData('id_kategori', parseInt(e.target.value))}>
                    <option value=" ">Pilih Kategori</option>
                        {kategori.map(items => (
                            <option key={items.idKategori} value={items.idKategori}>{items.namaKategori}</option>
                        ))}
                 </select>
                <Button type="submit" variant={1} disabled={processing} size="md">Update</Button>
            </form>
        </>
    )
}