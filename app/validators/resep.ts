import vine from '@vinejs/vine'

export const resepValidator = vine.compile(vine.object({
    id_resep: vine
        .number()
        .unique({ table: 'resep', column: 'id_resep', }),
    nama_resep: vine
        .string()
        .minLength(3)
        .maxLength(255)
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
}));