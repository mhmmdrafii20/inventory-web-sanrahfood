import { usePage, useForm } from "@inertiajs/react";
import { useEffect, SubmitEvent } from "react";
import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import { MultiSelect } from "react-multi-select-component";
import Button from "~/components/ui/Button/Button";

export default function updateResep () {
        type Option = {
            label: string
            value: number
        }
        const {bahan, produk, specificDataResep, specificResepBahan} = usePage<{
        bahan:{ idBahanBaku:number; namaBahanBaku:string; satuan:string;} [], 
        produk:{ idProduk:number; namaProduk:string; satuan:string;} [],
        specificResepBahan:{idResepBahan:number, idResep:number, idBahanBaku:number, jumlah:number}[],
        specificDataResep:{id_resep:number, nama_resep:string, id_produk:string, batch:number, catatan_tambahan:string, produk:{nama_produk:string, satuan:string}}
        }>().props;

        const options = bahan.map(items => ({
            label: items.namaBahanBaku,
            value: Number(items.idBahanBaku)
        }))
        const {data, setData, put, processing, errors, reset} = useForm({
            id_resep:specificDataResep.id_resep,
            nama_resep:specificDataResep.nama_resep,
            id_produk:specificDataResep.id_produk,
            batch:specificDataResep.batch,
            bahan: [] as {
                id_bahan_baku:number,
                nama_bahan_baku:string;
                jumlah:number;
            }[],
            catatan_tambahan:specificDataResep.catatan_tambahan
        })
        useEffect(() => {
            setData("bahan", specificResepBahan.map((item) => ({
                id_bahan_baku:item.idBahanBaku,
                nama_bahan_baku: options.find(o => o.value === item.idBahanBaku)?.label ?? "",
                jumlah:item.jumlah
            })));
         }, [specificResepBahan]);
        function handleUpdate (e:SubmitEvent) {
            e.preventDefault();
            put(`/resep/update/${specificDataResep.id_resep}`, {
                onSuccess: () => {
                    reset();
                },
            });
        }
    return (
        <>
              <Heading level={1} color="dark_slate_grey" className="font-bold">Edit Resep</Heading>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-5 shadow-md rounded-md"  onSubmit={handleUpdate}>
                    <input type="hidden"  name="id_resep" value={data.id_resep} onChange={(e) => setData('id_resep', parseInt(e.target.value))}></input>
                    <input type="hidden"  name="id_produk" value={data.id_produk} onChange={(e) => setData('id_produk', e.target.value)}></input>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-3">
                                <Paragraph size="lg">Nama Resep</Paragraph>
                                <input className="w-full" type="text" name="nama_resep" value={data.nama_resep} placeholder="Tuliskan nama resep disini" onChange={(e) => setData('nama_resep', e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Produk</Paragraph>
                            <select className="w-full" name="id_produk" value={data.id_produk} onChange={(e) => setData('id_produk', e.target.value)}>
                                <option value=" ">Pilih Produk</option>
                                    {produk.map(items => (
                                        <option key={items.idProduk} value={items.idProduk} >{items.namaProduk}</option>
                                        ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Batch</Paragraph>
                            <input className="w-full" type="number" name="batch" value={data.batch} placeholder="Tuliskan batch disini"  onChange={(e) => setData('batch', parseInt(e.target.value))} />
                        </div>
                        <div className="mt-auto">
                            <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Updating...." : "Update" }</Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Bahan Baku</Paragraph>
                            <MultiSelect options={options} value={data.bahan.map(b => ({
                                value:b.id_bahan_baku,
                                label:options.find(o => o.value === b.id_bahan_baku)?.label ?? ""
                            }))} onChange={(val:Option[]) => {
                                    const existing = data.bahan;
                                    const newBahan = val.map(v => {
                                        const old = existing.find(b => b.id_bahan_baku === v.value);
                                        return {
                                            id_bahan_baku:v.value,
                                            nama_bahan_baku:v.label,
                                            jumlah:old ? old.jumlah : 0,
                                        }
                                    });
                                    setData('bahan', newBahan);
                            }} labelledBy="Select"></MultiSelect>
                        </div>
                        <Paragraph size="lg">List Bahan Baku</Paragraph>
                        <div className="flex items-center gap-2">
                            <ul className="flex flex-col gap-5 w-full">
                                    {data.bahan.map((items, i) => 
                                        <li key={i} className="flex flex-row gap-3">
                                            <span className="flex-1">{items.nama_bahan_baku}</span>
                                                <input type="number"  className="w-20" value={items.jumlah}  placeholder="Jumlah" onChange={(e) => {
                                                    const updated = [...data.bahan];
                                                    updated[i].jumlah = Number(e.target.value);
                                                    setData("bahan", updated);
                                                }}/>
                                        </li>
                                    )}
                                </ul>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Paragraph size="lg">Catatan Tambahan</Paragraph>
                            <textarea className="w-full" value={data.catatan_tambahan} placeholder="Tuliskan catatan tambahan disini" rows={10} onChange={(e) => setData('catatan_tambahan', e.target.value)}></textarea>
                        </div>
                    </div>
              </form>
        </>
    )
} 