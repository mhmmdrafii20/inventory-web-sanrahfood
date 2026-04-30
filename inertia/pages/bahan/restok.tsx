import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import Button from "~/components/ui/Button/Button";
import { useForm, usePage } from "@inertiajs/react";
import { SubmitEvent } from "react";
import Input from "~/components/ui/Input";
import Select from "~/components/ui/Select";
import Error from "~/components/ui/Error";

export default function Restok() {
    const { bahan, errors } = usePage<{ bahan: { idBahanBaku: number; namaBahanBaku: string; satuan: string; }[] }>().props;
    const { data, setData, post, processing } = useForm({
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
            <form onSubmit={handleCreate} className="flex flex-col gap-5 bg-white p-5 shadow-md rounded-md w-96">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Bahan Baku</Paragraph>
                        <Select variant={1} size="md" name="id_bahan_baku" value={data.id_bahan_baku} onChange={(e) => setData("id_bahan_baku", e.target.value)}>
                            <option value="">Pilih Bahan Baku</option>
                            {bahan.map((item) => (
                                <option key={item.idBahanBaku} value={item.idBahanBaku}>{item.namaBahanBaku}</option>
                            ))}
                        </Select>
                    </div>
                    {errors.id_bahan_baku && <Error variant={1}>{errors.id_bahan_baku}</Error>}
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Jumlah</Paragraph>
                        <Input variant={1} size="md" className="w-full" type="number" name="jumlah" placeholder="Masukkan jumlah stok" value={data.jumlah} onChange={(e) => setData("jumlah", e.target.value)} />
                    </div>
                    {errors.jumlah && <Error variant={1}>{errors.jumlah}</Error>}
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Tanggal Restok</Paragraph>
                        <Input variant={1} size="md" className="w-full" type="date" name="tanggal_restok" value={data.tanggal_restok} onChange={(e) => setData("tanggal_restok", e.target.value)} />
                    </div>
                    {errors.tanggal_restok && <Error variant={1}>{errors.tanggal_restok}</Error>}
                    <Button type="submit" variant={1} size="md" disabled={processing}>{processing ? "Restoking..." : "Restok Bahan Baku"}</Button>
                </div>
            </form>
        </>
    )
}