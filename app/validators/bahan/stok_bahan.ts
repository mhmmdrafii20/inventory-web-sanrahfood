import vine from '@vinejs/vine'

export const stokBahanValidator = vine.create({
  id_bahan_baku: vine.number().min(1),
  nama_supplier: vine.string(),
  jumlah: vine.number().min(1),
  tanggal_restok: vine.date(),
})
