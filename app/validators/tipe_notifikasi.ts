import vine from "@vinejs/vine"
import { FieldContext } from "@vinejs/vine/types";
import TipeNotifikasi from "#models/tipe_notifikasi";

const uniqueTipeNotifikasi = vine.createRule(async (value: unknown, _, field: FieldContext) => {
    const duplicate = await TipeNotifikasi.query()
        .whereRaw('kode_notifikasi ILIKE ?', [String(value)])
        .first();

    if (duplicate) {
        field.report('Kode Notifikasi sudah digunakan', 'unique', field);
    }
}, { isAsync: true })

export const tipeNotifikasiValidator = vine.create({
    kode_notifikasi: vine
        .string()
        .minLength(3)
        .maxLength(50)
        .use(uniqueTipeNotifikasi())
        .trim(),
    nama_notifikasi: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .trim()
})

const uniqueUpdateTipeNotifikasi = (id: number) =>
    vine.createRule(async (value: unknown, _, field: FieldContext) => {
        const duplicate = await TipeNotifikasi.query()
            .whereRaw('kode_notifikasi ILIKE ?', [String(value)])
            .whereNot('id_tipe_notifikasi', id)
            .first();

        if (duplicate) {
            field.report('Kode Notifikasi sudah digunakan', 'unique', field);
        }
    }, { isAsync: true })

export const updateTipeNotifikasiValidator = (id: number) => vine.create({
    id_tipe_notifikasi: vine
        .number().min(1)
        .optional(),
    kode_notifikasi: vine
        .string()
        .minLength(3)
        .maxLength(50)
        .use(uniqueUpdateTipeNotifikasi(id)())
        .trim()
        .optional(),
    nama_notifikasi: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .trim()
        .optional(),
})