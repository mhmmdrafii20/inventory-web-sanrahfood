import vine from '@vinejs/vine'

export const kategoriProdukValidator = vine.compile(vine.object({
    id_kategori: vine
        .number()
        .unique({ table: 'tb_kategori_produk', column: 'id_kategori' }),
    nama_kategori: vine
        .string()
        .minLength(3)
        .maxLength(255)
        .trim()
        .unique({ table: 'tb_kategori_produk', column: 'nama_kategori' })
}))