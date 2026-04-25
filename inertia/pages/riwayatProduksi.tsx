import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import { usePage, useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import 'dayjs/locale/id'
import Button from "~/components/ui/Button/Button";
import { SubmitEvent } from "react";
import Input from "~/components/ui/Input";

export default function RiwayatProduksi() {
    const { riwayatProduksi, filteredRiwayatProduksi } = usePage<{
        riwayatProduksi: { idRiwayatProduksi: number; idProduk: number; idResep: number, jumlahBatch: number, jumlahHasilProduksi: number, catatanTambahan: string, tanggalProduksi: string, produk: { namaProduk: string, satuan: string }, resep: { namaResep: string, yieldPerBatch: number } }[]
        filteredRiwayatProduksi: { idRiwayatProduksi: number; idProduk: number; idResep: number, jumlahBatch: number, jumlahHasilProduksi: number, catatanTambahan: string, tanggalProduksi: string, produk: { namaProduk: string, satuan: string }, resep: { namaResep: string, yieldPerBatch: number } }[]
    }>().props;

    const { data, setData, get, processing } = useForm({
        tanggal_awal: "",
        tanggal_akhir: "",
    });

    const displayRiwayatProduksi = filteredRiwayatProduksi && filteredRiwayatProduksi.length > 0
        ? filteredRiwayatProduksi
        : riwayatProduksi;

    const handleFilter = (e: SubmitEvent) => {
        e.preventDefault()
        get('/riwayat-produksi/filter', {
            replace: true,
            preserveState: true,
        })
    }
    //TODO : BIKIN TOMBOL RESET DATA NYA.

    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold" > Riwayat Produksi</Heading>
            <form onSubmit={handleFilter} className="flex flex-row gap-5 mt-5 items-center">
                <Paragraph size="lg"> Tanggal Awal</Paragraph>
                <Input type="date" variant={1} size="md" value={data.tanggal_awal} onChange={(e) => setData('tanggal_awal', e.target.value)} />
                <Paragraph size="lg"> Tanggal Akhir</Paragraph>
                <Input type="date" variant={1} size="md" value={data.tanggal_akhir} onChange={(e) => setData('tanggal_akhir', e.target.value)} />
                <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Filtering..." : "Filter"}</Button>
            </form>
            <table className="w-full border-collapse mt-5 bg-white">
                <thead>
                    <tr>
                        <th className="border border-gray-300 py-3">Nama Produk</th>
                        <th className="border border-gray-300 py-3">Nama Resep</th>
                        <th className="border border-gray-300 py-3">Yield Per Batch</th>
                        <th className="border border-gray-300 py-3">Jumlah Batch</th>
                        <th className="border border-gray-300 py-3">Jumlah Hasil Produksi</th>
                        <th className="border border-gray-300 py-3">Tanggal Produksi</th>
                        <th className="border border-gray-300 py-3">Catatan Tambahan</th>
                    </tr>
                </thead>
                <tbody>
                    {displayRiwayatProduksi?.length > 0 ? displayRiwayatProduksi?.map(items => (
                        <tr key={items.idRiwayatProduksi}>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.produk.namaProduk}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.resep.namaResep}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.resep.yieldPerBatch}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.jumlahBatch}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.jumlahHasilProduksi}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{dayjs(items.tanggalProduksi).format("DD/MM/YYYY")}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.catatanTambahan}</Paragraph></td>
                        </tr>
                    )) : <tr className="border border-gray-300"><td colSpan={7} className="text-center py-4"><Paragraph size="lg">Tidak Ada Riwayat Produksi</Paragraph></td></tr>}
                </tbody>
            </table>
        </>
    )
}