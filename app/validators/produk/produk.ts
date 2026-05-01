import Produk from '#models/produk/produk';
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types';

const uniqueProduk = vine.createRule(async (value: unknown, _, field: FieldContext) => {
    const duplicate = await Produk.query()
        .whereRaw('nama_produk ILIKE ?', [String(value)])
        .first();

    if (duplicate) {
        field.report('Nama Produk sudah digunakan', 'unique', field);
    }
}, { isAsync: true })


export const produkValidator = vine.create({
    nama_produk: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .use(uniqueProduk())
        .trim(),
    satuan: vine
        .string()
        .minLength(1)
        .maxLength(10)
        .trim(),
    id_kategori: vine
        .number().min(1),
    stok_minimum: vine
        .number().min(0)
});

const uniqueUpdateProduk = (id: number) =>
    vine.createRule(async (value: unknown, _, field: FieldContext) => {
        const duplicate = await Produk.query()
            .whereRaw('nama_produk ILIKE ?', [String(value)])
            .whereNot('id_produk', id)
            .first();

        if (duplicate) {
            field.report('Nama Produk sudah digunakan', 'unique', field);
        }
    }, { isAsync: true })

export const updateProdukValidator = (id: number) => vine.create({
    id_produk: vine
        .number().min(1)
        .optional(),
    nama_produk: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .trim()
        .use(uniqueUpdateProduk(id)())
        .optional(),
    satuan: vine
        .string()
        .minLength(1)
        .maxLength(10)
        .trim()
        .optional(),
    id_kategori: vine
        .number().min(1)
        .optional(),
    stok_minimum: vine
        .number().min(0)
        .optional(),
});