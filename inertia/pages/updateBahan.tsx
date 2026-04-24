import Heading from "~/components/ui/Heading";
import { usePage, useForm } from "@inertiajs/react";
import Paragraph from "~/components/ui/Paragraph";
import Button from "~/components/ui/Button/Button";
import { SubmitEvent } from "react";
import Input from "~/components/ui/Input";
export default function UpdateBahan() {
    const { dataBahan } = usePage<{ dataBahan: { id_bahan_baku: number; nama_bahan_baku: string; satuan: string; } }>().props;
    const { data, setData, put, processing, errors, reset } = useForm({
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
            <form onSubmit={handleUpdate}>
                <Input variant={1} size="md" type="hidden" value={data.id_bahan_baku} onChange={(e) => setData("id_bahan_baku", parseInt(e.target.value))} />

                <Paragraph size="lg">Nama Bahan Baku</Paragraph>
                <Input variant={1} size="md" type="text" value={data.nama_bahan_baku} onChange={(e) => setData("nama_bahan_baku", e.target.value)} />
                {errors.nama_bahan_baku && <div>{errors.nama_bahan_baku}</div>}

                <Paragraph size="lg">Satuan</Paragraph>
                <Input variant={1} size="md" type="text" value={data.satuan} onChange={(e) => setData("satuan", e.target.value)} />
                {errors.satuan && <div>{errors.satuan}</div>}

                <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Updating...." : "Update"}</Button>
            </form>
        </>
    )
}