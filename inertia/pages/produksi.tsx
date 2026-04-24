import Heading from "~/components/ui/Heading"
import Paragraph from "~/components/ui/Paragraph"
import { usePage, useForm } from "@inertiajs/react";
import { SubmitEvent } from "react";
import Button from "~/components/ui/Button/Button";
import Input from "~/components/ui/Input";
import TextArea from "~/components/ui/Textarea";

export default function Produksi() {
    const { produk } = usePage<{
        produk: { idProduk: number; namaProduk: string; satuan: string; resep: { idResep: number, idProduk: number, namaResep: string, jumlah: number }[] }[],
    }>().props;

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        id_produk: "",
        id_resep: "",
        jumlah_batch: "",
        tanggal_produksi: "",
        catatan_tambahan: "",
    })
    const selectedProduk = produk.find(item => item.idProduk === Number(data.id_produk));
    function handleCreate(e: SubmitEvent) {
        e.preventDefault()

        post('/produksi/create', {
            onSuccess: () => {
                reset()
            }
        })
    }
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Input Produksi</Heading>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-5 shadow-md rounded-md" onSubmit={handleCreate}>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Produk</Paragraph>
                        <select name="id_produk" value={data.id_produk} onChange={(e) => setData('id_produk', e.target.value)}>
                            <option value=" ">Pilih Produk</option>
                            {produk.map(items => (
                                <option key={items.idProduk} value={items.idProduk} >{items.namaProduk}</option>
                            ))}
                        </select>
                    </div>
                    {errors.id_produk && <div>{errors.id_produk}</div>}
                    {selectedProduk && <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Resep</Paragraph>
                        <select name="id_resep" value={data.id_resep} onChange={(e) => setData('id_resep', e.target.value)}>
                            <option value=" ">Pilih Resep</option>
                            {selectedProduk.resep.map(items => (
                                <option key={items.idResep} value={items.idResep} >{items.namaResep}</option>
                            ))}
                        </select>
                    </div>}
                    {errors.id_resep && <div>{errors.id_resep}</div>}
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Jumlah Batch</Paragraph>
                        <Input variant={1} size="md" type="number" name="jumlah_batch" placeholder="Tuliskan jumlah batch disini" value={data.jumlah_batch} onChange={(e) => setData('jumlah_batch', e.target.value)} />
                    </div>
                    {errors.jumlah_batch && <div>{errors.jumlah_batch}</div>}
                    <Button type="submit" className="w-full mt-auto" variant={1} disabled={processing} size="md">{processing ? "Memproses...." : "Input Produksi"}</Button>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Tanggal Produksi</Paragraph>
                        <Input variant={1} size="md" type="date" name="tanggal_produksi" value={data.tanggal_produksi} onChange={(e) => setData('tanggal_produksi', e.target.value)} />
                    </div>
                    {errors.tanggal_produksi && <div>{errors.tanggal_produksi}</div>}
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Catatan Tambahan</Paragraph>
                        <TextArea variant={1} size="md" name="catatan_tambahan" placeholder="Tuliskan catatan tambahan disini" rows={10} value={data.catatan_tambahan} onChange={(e) => setData('catatan_tambahan', e.target.value)} />
                    </div>
                    {errors.catatan_tambahan && <div>{errors.catatan_tambahan}</div>}
                </div>
            </form>
        </>

    )
}