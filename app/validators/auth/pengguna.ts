import vine from '@vinejs/vine'
import Pengguna from '#models/auth/pengguna'
import type { FieldContext } from '@vinejs/vine/types'

const uniqueNamaPengguna = vine.createRule(
  async (value: unknown, _, field: FieldContext) => {
    const duplicate = await Pengguna.query()
      .whereRaw('nama_pengguna ILIKE ?', [String(value)])
      .first()

    if (duplicate) {
      field.report('Nama Pengguna sudah digunakan', 'unique', field)
    }
  },
  { isAsync: true }
)

const uniqueNomorTelepon = vine.createRule(
  async (value: unknown, _, field: FieldContext) => {
    const duplicate = await Pengguna.query()
      .whereRaw('nomor_telepon ILIKE ?', [String(value)])
      .first()

    if (duplicate) {
      field.report('Nomor Telepon sudah digunakan', 'unique', field)
    }
  },
  { isAsync: true }
)

export const penggunaValidator = vine.create({
  nama_pengguna: vine.string().minLength(3).maxLength(255).trim().use(uniqueNamaPengguna()),
  email: vine.string().email().trim(),
  password: vine.string().minLength(3).maxLength(255).trim(),
  nomor_telepon: vine.string().mobile().trim().use(uniqueNomorTelepon()),
  id_hak_akses: vine.number().min(1),
})

const uniqueUpdateNamaPengguna = (id: string) =>
  vine.createRule(
    async (value: unknown, _, field: FieldContext) => {
      const duplicate = await Pengguna.query()
        .whereRaw('nama_pengguna ILIKE ?', [String(value)])
        .whereNot('id_pengguna', id)
        .first()

      if (duplicate) {
        field.report('Nama Pengguna sudah digunakan', 'unique', field)
      }
    },
    { isAsync: true }
  )

const uniqueUpdateNomorTelepon = (id: string) =>
  vine.createRule(
    async (value: unknown, _, field: FieldContext) => {
      const duplicate = await Pengguna.query()
        .whereRaw('nomor_telepon ILIKE ?', [String(value)])
        .whereNot('id_pengguna', id)
        .first()

      if (duplicate) {
        field.report('Nomor Telepon sudah digunakan', 'unique', field)
      }
    },
    { isAsync: true }
  )


export const updatePenggunaValidator = (id: string) => vine.create({
  id: vine.number().min(1).optional(),
  id_pengguna: vine.string().optional(),
  email: vine.string().email().trim().optional(),
  password: vine.string().minLength(3).maxLength(255).trim().optional(),
  nama_pengguna: vine.string().minLength(3).maxLength(255).trim().optional().use(uniqueUpdateNamaPengguna(id)()),
  nomor_telepon: vine.string().mobile().trim().optional().use(uniqueUpdateNomorTelepon(id)()),
  id_hak_akses: vine.number().min(1).optional(),
})
