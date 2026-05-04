import vine from '@vinejs/vine'
export const adjustmentStokProdukValidator = vine.create({
  id_produk: vine.number(),
  jenis_stok: vine.string().trim(),
  jumlah: vine.number().min(1),
  tanggal_adjustment: vine.date(),
  catatan_tambahan: vine.string().minLength(50).trim(),
})
