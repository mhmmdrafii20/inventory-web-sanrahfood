import vine from '@vinejs/vine'

export const resepBahanValidator = vine.compile(vine.array(vine.object({
    id_resep_bahan: vine
        .number().min(1),
    id_bahan_baku: vine
        .number().min(1),
    jumlah: vine
        .number().min(1),
})));