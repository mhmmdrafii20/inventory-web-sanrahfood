import vine from '@vinejs/vine'

export const produksiValidator = vine.create({
    id_produk: vine
        .number().min(1),
    id_resep: vine
        .number().min(1),
    jumlah_batch: vine
        .number().min(1),
    tanggal_produksi: vine
        .date(),
    catatan_tambahan: vine
        .string()
        .optional()
});