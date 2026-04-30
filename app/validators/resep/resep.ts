import vine from '@vinejs/vine'
import Resep from '#models/resep/resep';
import { FieldContext } from '@vinejs/vine/types';

const uniqueResep = vine.createRule(async (value: unknown, _, field: FieldContext) => {
    const duplicate = await Resep.query()
        .whereRaw('nama_resep ILIKE ?', [String(value)])
        .first();

    if (duplicate) {
        field.report('Nama Resep sudah digunakan', 'unique', field);
    }
}, { isAsync: true })

export const resepValidator = vine.create({
    nama_resep: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .use(uniqueResep())
        .trim(),
    yield_per_batch: vine
        .number().min(1),
    bahan: vine.array(
        vine.object({
            id_bahan_baku: vine.number().min(1),
            jumlah: vine.number().min(1)
        })
    ).minLength(1),
    id_produk: vine
        .number().min(1),
    catatan_tambahan: vine
        .string()
        .maxLength(255)
        .trim()
        .optional(),
});

const uniqueUpdateResep = (id: number) =>
    vine.createRule(async (value: unknown, _, field: FieldContext) => {
        const duplicate = await Resep.query()
            .whereRaw('nama_resep ILIKE ?', [String(value)])
            .whereNot('id_resep', id)
            .first();

        if (duplicate) {
            field.report('Nama Resep sudah digunakan', 'unique', field);
        }
    }, { isAsync: true })


export const updateResepValidator = (id: number) => vine.create({
    id_resep: vine
        .number().min(1)
        .optional(),
    nama_resep: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .trim()
        .use(uniqueUpdateResep(id)())
        .optional(),
    yield_per_batch: vine
        .number().min(1)
        .optional(),
    bahan: vine.array(
        vine.object({
            id_bahan_baku: vine.number().min(1).optional(),
            jumlah: vine.number().min(1).optional()
        })
    ).minLength(1),
    id_produk: vine
        .number().min(1)
        .optional(),
    catatan_tambahan: vine
        .string()
        .maxLength(255)
        .trim()
        .optional(),
});