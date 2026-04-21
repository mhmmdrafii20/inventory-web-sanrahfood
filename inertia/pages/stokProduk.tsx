import Heading from "~/components/ui/Heading"
import Paragraph from "~/components/ui/Paragraph"
import { usePage } from "@inertiajs/react";
export default function StokProduk() {
    const { stokProduk } = usePage<{
        stokProduk: { idStokProduk: number; idProduk: number; jumlahStok: number, produk: { namaProduk: string, satuan: string } }[]
    }>().props;
    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold" > Stok Produk</Heading>
            <table className="w-full border-collapse mt-5 bg-white">
                <thead>
                    <tr>
                        <th className="border border-gray-300 py-3">Nama Produk</th>
                        <th className="border border-gray-300 py-3">Jumlah Stok</th>
                        <th className="border border-gray-300 py-3">Satuan</th>
                    </tr>
                </thead>
                <tbody>
                    {stokProduk.map(items => (
                        <tr key={items.idStokProduk}>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.produk.namaProduk}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.jumlahStok}</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items.produk.satuan}</Paragraph></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}