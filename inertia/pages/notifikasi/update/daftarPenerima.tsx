import Heading from "~/components/ui/Heading";
import Input from "~/components/ui/Input";
import Select from "~/components/ui/Select";
import Button from "~/components/ui/Button/Button";
import { useForm, usePage } from "@inertiajs/react";
import Paragraph from "~/components/ui/Paragraph";
import Error from "~/components/ui/Error";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import { MultiSelect } from "react-multi-select-component";
import { SubmitEvent } from "react";

type Option = {
    label: string
    value: string
}

export default function DaftarPenerima() {
    const { tipeNotifikasi, pengguna, errors, dataDaftarPenerima, dataSpecificTipeNotifikasi } = usePage<{ tipeNotifikasi: { idTipeNotifikasi: number, kodeNotifikasi: string, namaNotifikasi: string }[], pengguna: { id: number, idPengguna: string, hakAkses: { namaHakAkses: string }, namaPengguna: string, nomorTelepon: string }[], dataDaftarPenerima: { id_penerima_notifikasi: number, nama_penerima: string, id_pengguna: string, nomor_telepon: string, pengguna: { namaPengguna: string, nomorTelepon: string } }, dataSpecificTipeNotifikasi: number[] }>().props;
    const { data, setData, put, processing, reset } = useForm({
        id_penerima_notifikasi: dataDaftarPenerima?.id_penerima_notifikasi,
        id_pengguna: dataDaftarPenerima?.id_pengguna,
        nama_penerima: dataDaftarPenerima?.nama_penerima,
        nomor_telepon: dataDaftarPenerima?.nomor_telepon ?? dataDaftarPenerima?.pengguna?.nomorTelepon,
        id_tipe_notifikasi: dataSpecificTipeNotifikasi as number[] ?? []
    })
    const options = tipeNotifikasi?.map(items => ({
        label: items.namaNotifikasi,
        value: items.idTipeNotifikasi
    })) || []

    const isInternal = !!dataDaftarPenerima?.id_pengguna;

    const handleUpdate = (e: SubmitEvent) => {
        e.preventDefault();
        put(`/daftar-penerima/update/${dataDaftarPenerima?.id_penerima_notifikasi}`, {
            onSuccess: () => {
                reset();
            },
        });
    }

    return (
        <>
            <div className="flex justify-center mx-auto mb-5">
                <Heading level={1} color="dark_slate_grey" className="font-bold">Edit Daftar Penerima</Heading>
            </div>
            <form className="flex flex-col gap-5 bg-white p-5 shadow-md rounded-md w-[600px] mx-auto" onSubmit={handleUpdate}>
                <Input variant={1} size="md" type="hidden" name="id_penerima_notifikasi" value={data.id_penerima_notifikasi} onChange={(e) => setData('id_penerima_notifikasi', parseInt(e.target.value))} />
                {isInternal &&
                    <>
                        <Paragraph size="lg">Penerima Internal</Paragraph>
                        <Select variant={1} size="md" name="id_pengguna" value={data.id_pengguna} onChange={(e) => setData('id_pengguna', e.target.value)}>
                            <option value="">Pilih User Internal</option>
                            {pengguna?.map((items => (
                                <option key={items.idPengguna} value={items.idPengguna}>{items.namaPengguna}</option>
                            )))}
                        </Select>
                        {errors.id_pengguna && <Error variant={1}>{errors.id_pengguna}</Error>}
                    </>
                }
                {!isInternal &&
                    <>
                        <Paragraph size="lg">Nama Penerima</Paragraph>
                        <Input variant={1} size="md" type="text" name="nama_penerima" placeholder="Nama Penerima" value={data.nama_penerima} onChange={(e) => setData('nama_penerima', e.target.value)}></Input>
                        {errors.nama_penerima && <Error variant={1}>{errors.nama_penerima}</Error>}


                        <Paragraph size="lg">Nomor Telepon</Paragraph>
                        <PhoneInput placeholder="Nomor Telepon Penerima" value={data.nomor_telepon} onChange={(e) => setData("nomor_telepon", e ?? "")} />
                        {errors.nomor_telepon && <Error variant={1}>{errors.nomor_telepon}</Error>}
                    </>
                }
                <Paragraph size="lg">Notifikasi yang diterima</Paragraph>
                <MultiSelect options={options} value={options.filter((item) => data.id_tipe_notifikasi.includes(item.value))} onChange={(val: Option[]) => { setData('id_tipe_notifikasi', val.map(item => Number(item.value))) }} labelledBy="Select"></MultiSelect>
                {errors.id_tipe_notifikasi && <Error variant={1}>{errors.id_tipe_notifikasi}</Error>}

                <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Updating..." : "Update"}</Button>
            </form>
        </>
    )
}