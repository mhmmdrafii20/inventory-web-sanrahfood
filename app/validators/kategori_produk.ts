import Kategori from '#models/kategori'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types';

const uniqueKategori = vine.createRule(async (value: unknown, _, field: FieldContext) => {
    const duplicate = await Kategori.query()
        .whereRaw('nama_kategori ILIKE ?', [String(value)])
        .first();

    if (duplicate) {
        field.report('Nama Kategori sudah digunakan', 'unique', field);
    }
}, { isAsync: true })

export const kategoriProdukValidator = () => vine.create({
    nama_kategori: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .trim()
        .use(uniqueKategori())
})

const uniqueUpdateKategori = (id: number) =>
    vine.createRule(async (value: unknown, _, field: FieldContext) => {
        const duplicate = await Kategori.query()
            .whereRaw('nama_kategori ILIKE ?', [String(value)])
            .whereNot('id_kategori', id)
            .first();

        if (duplicate) {
            field.report('Nama Kategori sudah digunakan', 'unique', field);
        }
    }, { isAsync: true })

export const updateKategoriProdukValidator = (id: number) => vine.create({
    id_kategori: vine
        .number()
        .optional(),
    nama_kategori: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .trim()
        .use(uniqueUpdateKategori(id)())
})