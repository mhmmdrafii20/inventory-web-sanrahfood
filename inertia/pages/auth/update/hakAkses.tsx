import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import { usePage, useForm } from "@inertiajs/react";
import Button from "~/components/ui/Button/Button";
import { SubmitEvent } from "react";
import Input from "~/components/ui/Input";
import Error from "~/components/ui/Error";

export default function UpdateHakAkses() {
    const { dataRole, errors } = usePage<{ dataRole: { id_hak_akses: number; nama_hak_akses: string; } }>().props;
    const { data, setData, put, processing, reset } = useForm({
        id_hak_akses: dataRole.id_hak_akses,
        nama_hak_akses: dataRole.nama_hak_akses,
    });
    const handleUpdate = (e: SubmitEvent) => {
        e.preventDefault();
        put(`/role/update/${dataRole.id_hak_akses}`, {
            onSuccess: () => {
                reset();
            },
        });
    }
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Edit Hak Akses</Heading>
            <form onSubmit={handleUpdate} className="flex flex-col gap-5 bg-white p-5 shadow-md rounded-md w-96">
                <Input variant={1} size="md" type="hidden" value={data.id_hak_akses} onChange={(e) => setData("id_hak_akses", parseInt(e.target.value))} />

                <Paragraph size="lg">Nama Hak Akses</Paragraph>
                <Input variant={1} size="md" type="text" placeholder="Nama Hak Akses " value={data.nama_hak_akses} onChange={(e) => setData("nama_hak_akses", e.target.value)} />
                {errors.nama_hak_akses && <Error variant={1}>{errors.nama_hak_akses}</Error>}

                <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Updating...." : "Update"}</Button>
            </form>
        </>
    )
}

