import vine from '@vinejs/vine'

export const penggunaValidator = vine.compile(vine.object({
    id: vine
        .number(),
    id_pengguna: vine
        .string()
        .unique({ table: 'tb_pengguna', column: 'id_pengguna' }),
    nama_pengguna: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .trim(),
    email: vine
        .string()
        .email()
        .trim(),
    password: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .trim(),
    nomor_telepon: vine
        .string()
        .minLength(10)
        .maxLength(15)
        .trim(),
    id_hak_akses: vine
        .number().min(1)
}))