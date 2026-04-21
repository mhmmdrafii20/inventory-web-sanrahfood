import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import Button from "~/components/ui/Button/Button";
import { useForm, usePage } from "@inertiajs/react";
import { SubmitEvent } from "react";

export default function RestokBahan() {
    const { bahan } = usePage<{ bahan: { idBahanBaku: number; namaBahanBaku: string; satuan: string; }[] }>().props;
    const { data, setData, post, processing, errors } = useForm({
        id_bahan_baku: "",
        jumlah: "",
        tanggal_restok: "",
    });

    const handleCreate = (e: SubmitEvent) => {
        e.preventDefault();
        post("restok-bahan/create");
    };

    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Restok Bahan Baku</Heading>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-5 shadow-md rounded-md">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Bahan Baku</Paragraph>
                        <select name="id_bahan_baku" value={data.id_bahan_baku} onChange={(e) => setData("id_bahan_baku", e.target.value)}>
                            <option value="">Pilih Bahan Baku</option>
                            {bahan.map((item) => (
                                <option key={item.idBahanBaku} value={item.idBahanBaku}>{item.namaBahanBaku}</option>
                            ))}
                        </select>
                    </div>
                    {errors.id_bahan_baku && <div>{errors.id_bahan_baku}</div>}
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Jumlah</Paragraph>
                        <input className="w-full" type="number" name="jumlah" placeholder="Masukkan jumlah stok" value={data.jumlah} onChange={(e) => setData("jumlah", e.target.value)} />
                    </div>
                    {errors.jumlah && <div>{errors.jumlah}</div>}
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Tanggal Restok</Paragraph>
                        <input className="w-full" type="date" name="tanggal_restok" value={data.tanggal_restok} onChange={(e) => setData("tanggal_restok", e.target.value)} />
                    </div>
                    {errors.tanggal_restok && <div>{errors.tanggal_restok}</div>}
                    <Button type="submit" variant={1} size="md" disabled={processing}>{processing ? "Restoking..." : "Restok Bahan Baku"}</Button>
                </div>
            </form>
        </>
    )
}