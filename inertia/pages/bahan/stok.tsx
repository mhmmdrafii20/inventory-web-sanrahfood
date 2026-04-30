import Heading from "~/components/ui/Heading";
import { usePage, router } from "@inertiajs/react";
import Paragraph from "~/components/ui/Paragraph";
import Input from "~/components/ui/Input";
import ActionButton from "~/components/ui/Button/ActionButton";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function Stok() {
    const { stokBahan, searchRes } = usePage<{
        stokBahan: { idStokBahanBaku: number; idBahanBaku: number; jumlahStok: number, bahan: { namaBahanBaku: string, satuan: string } }[],
        searchRes: { idStokBahanBaku: number; idBahanBaku: number; jumlahStok: number, bahan: { namaBahanBaku: string, satuan: string } }[]
    }>().props;

    const [searchData, setSearchData] = useState("");

    function handleSearch() {
        router.get('/stok-bahan/search', { search: searchData }, {
            preserveState: true,
            replace: true,
        })
    }

    const displayStokBahan = searchRes && searchRes.length > 0
        ? searchRes
        : stokBahan;

    return (
        <>
            <Heading level={1} color="dark_slate_grey" className="font-bold" > Stok Bahan Baku</Heading>
            <div className="flex flex-col  w-full bg-white shadow-md rounded-md p-5">
                <div className="w-full flex flex-row items-center gap-3">
                    <Input variant={1} size="md" type="text" name="nama_bahan_baku" placeholder="Cari Nama Bahan Baku" className="flex-1" value={searchData} onChange={(e) => setSearchData(e.target.value)} />
                    <ActionButton type="search" size="lg" onClick={handleSearch}>
                        <FaSearch />
                    </ActionButton>
                </div>
                <table className="w-full border-collapse mt-5 bg-white">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 py-3">Nama Bahan Baku</th>
                            <th className="border border-gray-300 py-3">Jumlah Stok</th>
                            <th className="border border-gray-300 py-3">Satuan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayStokBahan?.length > 0 ? displayStokBahan.map(items => (
                            <tr key={items.idStokBahanBaku}>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items?.bahan?.namaBahanBaku}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items?.jumlahStok}</Paragraph></td>
                                <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">{items?.bahan?.satuan}</Paragraph></td>
                            </tr>
                        )) : <tr className="border border-gray-300"><td colSpan={7} className="text-center py-4"><Paragraph size="lg">Tidak Ada Stok Bahan Baku</Paragraph></td></tr>}
                    </tbody>
                </table>
            </div>
        </>

    )
}