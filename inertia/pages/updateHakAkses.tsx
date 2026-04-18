import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import { usePage, useForm } from "@inertiajs/react";
import Button from "~/components/ui/Button/Button";
import { SubmitEvent } from "react";
export default function UpdateHakAkses () {
    const {dataRole} = usePage<{dataRole:{ id_hak_akses:number; nama_hak_akses:string;}}>().props;
    const {data, setData, put, processing, errors, reset} = useForm({
        id_hak_akses:dataRole.id_hak_akses,
        nama_hak_akses:dataRole.nama_hak_akses,
    });
    const handleUpdate = (e:SubmitEvent) => {
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
            <form onSubmit={handleUpdate} >
                <input type="hidden" value={data.id_hak_akses}  onChange={(e) => setData("id_hak_akses", parseInt(e.target.value))}/>
                
                <Paragraph size="lg">Nama Hak Akses</Paragraph>
                <input type="text" placeholder="Nama Hak Akses " value={data.nama_hak_akses} onChange={(e) => setData("nama_hak_akses", e.target.value)}/>
                {errors.nama_hak_akses && <div>{errors.nama_hak_akses}</div>}

                 <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Updating...." : "Update" }</Button>
            </form>
        </>
    )
}

