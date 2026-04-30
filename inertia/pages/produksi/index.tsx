import Heading from "~/components/ui/Heading"
import Paragraph from "~/components/ui/Paragraph"
import { usePage, useForm } from "@inertiajs/react";
import { SubmitEvent } from "react";
import Button from "~/components/ui/Button/Button";
import Input from "~/components/ui/Input";
import TextArea from "~/components/ui/Textarea";
import Select from "~/components/ui/Select";
import Error from "~/components/ui/Error";

export default function Index() {
    const { produk } = usePage<{
        produk: { idProduk: number; namaProduk: string; satuan: string; resep: { idResep: number, idProduk: number, namaResep: string, jumlah: number }[] }[],
    }>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
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
    function onProdukChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setData('id_produk', e.target.value);
        setData('id_resep', " ");
    }
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold">Input Produksi</Heading>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-5 shadow-md rounded-md" onSubmit={handleCreate}>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Produk</Paragraph>
                        <Select variant={1} size="md" name="id_produk" value={data.id_produk} onChange={(e) => onProdukChange(e)}>
                            <option value=" ">Pilih Produk</option>
                            {produk.map(items => (
                                <option key={items.idProduk} value={items.idProduk} >{items.namaProduk}</option>
                            ))}
                        </Select>
                    </div>
                    {errors.id_produk && <Error variant={1}>{errors.id_produk}</Error>}
                    {selectedProduk && <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Resep</Paragraph>
                        <Select variant={1} size="md" name="id_resep" value={data.id_resep} onChange={(e) => setData('id_resep', e.target.value)}>
                            <option value=" ">Pilih Resep</option>
                            {selectedProduk.resep.map(items => (
                                <option key={items.idResep} value={items.idResep} >{items.namaResep}</option>
                            ))}
                        </Select>
                    </div>}
                    {selectedProduk && errors.id_resep && <Error variant={1}>{errors.id_resep}</Error>}
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Jumlah Batch</Paragraph>
                        <Input variant={1} size="md" type="number" name="jumlah_batch" placeholder="Tuliskan jumlah batch disini" value={data.jumlah_batch} onChange={(e) => setData('jumlah_batch', e.target.value)} />
                    </div>
                    {errors.jumlah_batch && <Error variant={1}>{errors.jumlah_batch}</Error>}
                    <Button type="submit" className="w-full mt-auto" variant={1} disabled={processing} size="md">{processing ? "Memproses...." : "Input Produksi"}</Button>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Tanggal Produksi</Paragraph>
                        <Input variant={1} size="md" type="date" name="tanggal_produksi" value={data.tanggal_produksi} onChange={(e) => setData('tanggal_produksi', e.target.value)} />
                    </div>
                    {errors.tanggal_produksi && <Error variant={1}>{errors.tanggal_produksi}</Error>}
                    <div className="flex flex-col gap-3">
                        <Paragraph size="lg">Catatan Tambahan</Paragraph>
                        <TextArea variant={1} size="md" name="catatan_tambahan" placeholder="Tuliskan catatan tambahan disini" rows={10} value={data.catatan_tambahan} onChange={(e) => setData('catatan_tambahan', e.target.value)} />
                    </div>
                    {errors.catatan_tambahan && <Error variant={1}>{errors.catatan_tambahan}</Error>}
                </div>
            </form>
        </>

    )
}