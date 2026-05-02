import vine from '@vinejs/vine'

export const penggunaValidator = vine.create({
  nama_pengguna: vine.string().minLength(3).maxLength(255).trim(),
  email: vine.string().email().trim(),
  password: vine.string().minLength(3).maxLength(255).trim(),
  nomor_telepon: vine.string().mobile().trim(),
  id_hak_akses: vine.number().min(1),
})
export const updatePenggunaValidator = vine.create({
  id: vine.number().min(1).optional(),
  id_pengguna: vine.string().optional(),
  email: vine.string().email().trim().optional(),
  password: vine.string().minLength(3).maxLength(255).trim().optional(),
  nama_pengguna: vine.string().minLength(3).maxLength(255).trim().optional(),
  nomor_telepon: vine.string().mobile().trim().optional(),
  id_hak_akses: vine.number().min(1).optional(),
})
