import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import { usePage, useForm } from "@inertiajs/react";
import Button from "~/components/ui/Button/Button";
import { SubmitEvent } from "react";
import Input from "~/components/ui/Input";
import Error from "~/components/ui/Error";

export default function UpdateKategoriProduk() {
    const { dataKategori, errors } = usePage<{ dataKategori: { id_kategori: number; nama_kategori: string; } }>().props;
    const { data, setData, put, processing, reset } = useForm({
        id_kategori: dataKategori.id_kategori,
        nama_kategori: dataKategori.nama_kategori,
    });
    const handleUpdate = (e: SubmitEvent) => {
        e.preventDefault();
        put(`/kategori-produk/update/${dataKategori.id_kategori}`, {
            onSuccess: () => {
                reset();
            },
        });
    }
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Edit Kategori Produk</Heading>
            <form onSubmit={handleUpdate} className="flex flex-col gap-5 bg-white p-5 shadow-md rounded-md w-96">
                <Input variant={1} size="md" type="hidden" value={data.id_kategori} onChange={(e) => setData("id_kategori", parseInt(e.target.value))} />

                <Paragraph size="lg">Nama Kategori</Paragraph>
                <Input variant={1} size="md" type="text" name="nama_kategori" placeholder="Nama Kategori " value={data.nama_kategori} onChange={(e) => setData("nama_kategori", e.target.value)} />
                {errors.nama_kategori && <Error variant={1}>{errors.nama_kategori}</Error>}

                <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Updating...." : "Update"}</Button>
            </form>
        </>
    )
}

