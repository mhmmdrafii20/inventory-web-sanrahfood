import vine from '@vinejs/vine'

export const stokBahanValidator = vine.compile(vine.object({
    id_bahan_baku: vine
        .number().min(1),
    jumlah: vine
        .number().min(1),
    tanggal_restok: vine
        .date(),
}))