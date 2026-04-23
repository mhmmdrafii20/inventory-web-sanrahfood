import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import { usePage, useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import 'dayjs/locale/id'
import Button from "~/components/ui/Button/Button";
import { SubmitEvent } from "react";

export default function RiwayatStokProduk() {
    const { riwayatStokProduk, filteredRiwayatStokProduk } = usePage<{
        riwayatStokProduk: { idRiwayatStokProduk: number; idStokProduk: number; jenisStok: string; selisihStok: number, stokSebelum: number, stokSesudah: number, tanggalPerubahanStok: string, stokProduk: { produk: { namaProduk: string } } }[],
        filteredRiwayatStokProduk: { idRiwayatStokProduk: number; idStokProduk: number; jenisStok: string; selisihStok: number, stokSebelum: number, stokSesudah: number, tanggalPerubahanStok: string, stokProduk: { produk: { namaProduk: string } } }[]
    }>().props;

    const { data, setData, get, delete: destroy, processing, errors, reset } = useForm({
        tanggal_awal: "",
        tanggal_akhir: "",
    });

    const displayRiwayatStokProduk = filteredRiwayatStokProduk && filteredRiwayatStokProduk.length > 0
        ? filteredRiwayatStokProduk
        : riwayatStokProduk;

    const handleFilter = (e: SubmitEvent) => {
        e.preventDefault()
        get('/riwayat-stok-produk/filter', {
            replace: true,
            preserveState: true,
        })
    }
    //TODO : BIKIN TOMBOL RESET DATA NYA.

    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold"> Riwayat Stok Produk</Heading>
            <form onSubmit={handleFilter} className="flex flex-row gap-5 mt-5 items-center">
                <Paragraph size="lg" className="font-bold"> Tanggal Awal</Paragraph>
                <input type="date" value={data.tanggal_awal} onChange={(e) => setData('tanggal_awal', e.target.value)} />
                <Paragraph size="lg" className="font-bold"> Tanggal Akhir</Paragraph>
                <input type="date" value={data.tanggal_akhir} onChange={(e) => setData('tanggal_akhir', e.target.value)} />
                <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Filtering..." : "Filter"}</Button>
            </form>
            <table className="w-full border-collapse mt-5 bg-white">
                <thead>
                    <tr>
                        <th className="border border-gray-300 py-3">Nama Produk</th>
                        <th className="border border-gray-300 py-3">Selisih Stok</th>
                        <th className="border border-gray-300 py-3">Stok Sebelum</th>
                        <th className="border border-gray-300 py-3">Stok Sesudah</th>
                        <th className="border border-gray-300 py-3">Jenis Stok</th>
                        <th className="border border-gray-300 py-3">Tanggal Perubahan Stok</th>
                    </tr>
                </thead>
                <tbody>
                    {riwayatStokProduk?.length > 0 ? riwayatStokProduk?.map(items => (
                        <tr key={items.idRiwayatStokProduk}>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.stokProduk.produk.namaProduk}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.selisihStok}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.stokSebelum}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.stokSesudah}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg" className={`${items.jenisStok === "MASUK" ? "text-green-800 font-bold" : "text-red-500 font-bold"}`}>{items.jenisStok}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{dayjs(items.tanggalPerubahanStok).format("DD/MM/YYYY")}</Paragraph></td>
                        </tr>
                    )) : <tr className="border border-gray-300"><td colSpan={6} className="text-center py-4"><Paragraph size="lg">Tidak Ada Riwayat Stok Produk</Paragraph></td></tr>}
                </tbody>
            </table>
        </>
    )
}