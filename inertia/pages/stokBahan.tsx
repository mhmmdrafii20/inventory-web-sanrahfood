import Heading from "~/components/ui/Heading";
import { usePage } from "@inertiajs/react";
import Paragraph from "~/components/ui/Paragraph";

export default function StokBahan() {
    const { stokBahan } = usePage<{
        stokBahan: { idStokBahanBaku: number; idBahanBaku: number; jumlahStok: number, bahan: { namaBahanBaku: string, satuan: string } }[]
    }>().props;
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold" > Stok Bahan Baku</Heading>
            <table className="w-full border-collapse mt-5 bg-white">
                <thead>
                    <tr>
                        <th className="border border-gray-300 py-3">Nama Bahan Baku</th>
                        <th className="border border-gray-300 py-3">Jumlah Stok</th>
                        <th className="border border-gray-300 py-3">Satuan</th>
                    </tr>
                </thead>
                <tbody>
                    {stokBahan.map(items => (
                        <tr key={items.idStokBahanBaku}>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.bahan.namaBahanBaku}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.jumlahStok}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.bahan.satuan}</Paragraph></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}