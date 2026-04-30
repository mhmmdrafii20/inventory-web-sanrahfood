import Heading from "~/components/ui/Heading";
import { usePage, useForm } from "@inertiajs/react";
import Paragraph from "~/components/ui/Paragraph";
import Button from "~/components/ui/Button/Button";
import { SubmitEvent } from "react";
import Input from "~/components/ui/Input";
import Error from "~/components/ui/Error";

export default function Update() {
    const { dataBahan, errors } = usePage<{ dataBahan: { id_bahan_baku: number; nama_bahan_baku: string; satuan: string; } }>().props;
    const { data, setData, put, processing, reset } = useForm({
        id_bahan_baku: dataBahan.id_bahan_baku,
        nama_bahan_baku: dataBahan.nama_bahan_baku,
        satuan: dataBahan.satuan,
    });
    function handleUpdate(e: SubmitEvent) {
        e.preventDefault();
        put(`/bahan/update/${dataBahan.id_bahan_baku}`, {
            onSuccess: () => {
                reset();
            },
        });
    }
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Edit Bahan Baku</Heading>
            <form onSubmit={handleUpdate} className="flex flex-col gap-5 bg-white p-5 shadow-md rounded-md w-96">
                <Input variant={1} size="md" type="hidden" value={data.id_bahan_baku} onChange={(e) => setData("id_bahan_baku", parseInt(e.target.value))} />

                <Paragraph size="lg">Nama Bahan Baku</Paragraph>
                <Input variant={1} size="md" type="text" value={data.nama_bahan_baku} onChange={(e) => setData("nama_bahan_baku", e.target.value)} />
                {errors.nama_bahan_baku && <Error variant={1}>{errors.nama_bahan_baku}</Error>}

                <Paragraph size="lg">Satuan</Paragraph>
                <Input variant={1} size="md" type="text" value={data.satuan} onChange={(e) => setData("satuan", e.target.value)} />
                {errors.satuan && <Error variant={1}>{errors.satuan}</Error>}

                <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Updating...." : "Update"}</Button>
            </form>
        </>
    )
}