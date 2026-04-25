import vine from '@vinejs/vine'

export const hakAksesValidator = vine.compile(vine.object({
    id_hak_akses: vine
        .number()
        .unique({ table: 'tb_hak_akses', column: 'id_hak_akses' }),
    nama_hak_akses: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .trim()
        .unique({ table: 'tb_hak_akses', column: 'nama_hak_akses' })
}))