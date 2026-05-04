import vine from '@vinejs/vine'
export const adjustmentStokBahanBakuValidator = vine.create({
  id_bahan_baku: vine.number(),
  jenis_stok: vine.string().trim(),
  jumlah: vine.number().min(1),
  tanggal_adjustment: vine.date(),
  catatan_tambahan: vine.string().minLength(50).trim(),
})
