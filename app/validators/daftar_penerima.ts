import vine from "@vinejs/vine"
import PenerimaNotifikasi from "#models/penerima_notifikasi";
import { FieldContext } from "@vinejs/vine/types";

const uniqueDaftarPenerima = vine.createRule(async (value: unknown, _, field: FieldContext) => {
    const duplicate = await PenerimaNotifikasi.query()
        .whereRaw('nama_penerima ILIKE ?', [String(value)])
        .first();

    if (duplicate) {
        field.report('Nama Penerima sudah digunakan', 'unique', field);
    }
}, { isAsync: true })

export const daftarPenerimaValidator = vine.create({
    id_pengguna: vine
        .string()
        .trim()
        .optional(),
    nama_penerima: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .trim()
        .use(uniqueDaftarPenerima())
        .optional(),
    nomor_telepon: vine
        .string()
        .mobile()
        .trim()
        .optional(),
    id_tipe_notifikasi: vine.array(
        vine.number().min(1)
    )
})