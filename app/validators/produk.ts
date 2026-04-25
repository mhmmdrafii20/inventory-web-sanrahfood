import vine from '@vinejs/vine'

export const produkValidator = vine.compile(vine.object({
    id_produk: vine
        .number()
        .unique({ table: 'tb_produk', column: 'id_produk' }),
    nama_produk: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .trim(),
    satuan: vine
        .string()
        .minLength(1)
        .maxLength(10)
        .trim(),
    id_kategori: vine
        .number().min(1)
}));