import { usePage, useForm } from "@inertiajs/react";
import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import Button from "~/components/ui/Button/Button";
import { SubmitEvent } from "react";
import Input from "~/components/ui/Input";
import Select from "~/components/ui/Select";
import Error from "~/components/ui/Error";

export default function Produk() {
    const { dataProduk, kategori, errors } = usePage<{ dataProduk: { id_produk: number, nama_produk: string, satuan: string, id_kategori: number }, kategori: { idKategori: number, namaKategori: string }[] }>().props;
    console.log(kategori)
    const { data, setData, put, processing, reset } = useForm({
        id_produk: dataProduk.id_produk,
        id_kategori: dataProduk.id_kategori,
        nama_produk: dataProduk.nama_produk,
        satuan: dataProduk.satuan,
    });

    function handleUpdate(e: SubmitEvent) {
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
            <form onSubmit={handleUpdate} className="flex flex-col gap-5 bg-white p-5 shadow-md rounded-md w-96">
                <Input variant={1} size="md" type="hidden" name="id_produk" value={data.id_produk} onChange={(e) => setData('id_produk', parseInt(e.target.value))} />

                <Paragraph size="lg">Nama Produk</Paragraph>
                <Input variant={1} size="md" type="text" name="nama_produk" value={data.nama_produk} onChange={(e) => setData('nama_produk', e.target.value)} />
                {errors.nama_produk && <Error variant={1}>{errors.nama_produk}</ Error>}

                <Paragraph size="lg">Satuan</Paragraph>
                <Input variant={1} size="md" type="text" name="satuan" value={data.satuan} onChange={(e) => setData('satuan', e.target.value)} />
                {errors.satuan && <Error variant={1}>{errors.satuan}</Error>}

                <Paragraph size="lg">Kategori Produk</Paragraph>
                <Select variant={1} size="md" name="id_kategori" defaultValue={data.id_kategori} onChange={(e) => setData('id_kategori', parseInt(e.target.value))}>
                    <option value=" ">Pilih Kategori</option>
                    {kategori.map(items => (
                        <option key={items.idKategori} value={items.idKategori}>{items.namaKategori}</option>
                    ))}
                </Select>
                {errors.id_kategori && <Error variant={1}>{errors.id_kategori}</Error>}
                <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Updating...." : "Update"}</Button>
            </form>
        </>
    )
}