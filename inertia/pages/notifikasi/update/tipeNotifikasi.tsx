import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import { usePage, useForm } from "@inertiajs/react";
import Button from "~/components/ui/Button/Button";
import { SubmitEvent } from "react";
import Input from "~/components/ui/Input";
import Error from "~/components/ui/Error";

export default function TipeNotifikasi() {
    const { dataTipeNotifikasi, errors } = usePage<{ dataTipeNotifikasi: { id_tipe_notifikasi: number, kode_notifikasi: string; nama_notifikasi: string; } }>().props;
    const { data, setData, put, processing, reset } = useForm({
        id_tipe_notifikasi: dataTipeNotifikasi?.id_tipe_notifikasi,
        kode_notifikasi: dataTipeNotifikasi?.kode_notifikasi,
        nama_notifikasi: dataTipeNotifikasi?.nama_notifikasi,
    });
    const handleUpdate = (e: SubmitEvent) => {
        e.preventDefault();
        put(`/tipe-notifikasi/update/${dataTipeNotifikasi.id_tipe_notifikasi}`, {
            onSuccess: () => {
                reset();
            },
        });
    }
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Edit Tipe Notifikasi</Heading>
            <form onSubmit={handleUpdate} className="flex flex-col gap-5 bg-white p-5 shadow-md rounded-md w-96">
                <Input variant={1} size="md" type="hidden" value={data.id_tipe_notifikasi} onChange={(e) => setData("id_tipe_notifikasi", parseInt(e.target.value))} />

                <Paragraph size="lg">Nama Notifikasi</Paragraph>
                <Input variant={1} size="md" type="text" placeholder="Nama Notifikasi " value={data.nama_notifikasi} onChange={(e) => setData("nama_notifikasi", e.target.value)} />
                {errors.nama_notifikasi && <Error variant={1}>{errors.nama_notifikasi}</Error>}

                <Paragraph size="lg">Kode Notifikasi</Paragraph>
                <Input variant={1} size="md" type="text" placeholder="Kode Notifikasi " value={data.kode_notifikasi} onChange={(e) => setData("kode_notifikasi", e.target.value)} />
                {errors.kode_notifikasi && <Error variant={1}>{errors.kode_notifikasi}</Error>}

                <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Updating...." : "Update"}</Button>
            </form>
        </>
    )
}

