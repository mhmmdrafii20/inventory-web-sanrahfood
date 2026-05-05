import vine from '@vinejs/vine'
export const createStokKeluarValidator = vine.create({
  produk: vine.array(
    vine.object({
      id_produk: vine.number(),
      jumlah: vine.number().min(1),
    })
  ).minLength(1),
  tanggal_pengeluaran: vine.date(),
  catatan_tambahan: vine.string().trim().optional(),
})
