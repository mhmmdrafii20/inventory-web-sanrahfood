import vine from '@vinejs/vine'

export const bahanValidator = vine.compile(vine.object({
    id_bahan_baku: vine
        .number()
        .unique({ table: 'tb_bahan_baku', column: 'id_bahan_baku' }),
    nama_bahan_baku: vine
        .string()
        .minLength(3)
        .maxLength(50)
        .trim(),
    satuan: vine
        .string()
        .minLength(1)
        .maxLength(10)
        .trim(),
}))