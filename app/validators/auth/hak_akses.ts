import vine from '@vinejs/vine'
import HakAkses from '#models/auth/hakAkses'
import { FieldContext } from '@vinejs/vine/types'

const uniqueHakAkses = vine.createRule(
  async (value: unknown, _, field: FieldContext) => {
    const duplicate = await HakAkses.query()
      .whereRaw('nama_hak_akses ILIKE ?', [String(value)])
      .first()

    if (duplicate) {
      field.report('Nama Hak Akses sudah digunakan', 'unique', field)
    }
  },
  { isAsync: true }
)

export const hakAksesValidator = vine.create({
  nama_hak_akses: vine
    .string()
    .unique({ table: 'tb_hak_akses', column: 'nama_hak_akses' })
    .minLength(3)
    .maxLength(255)
    .use(uniqueHakAkses())
    .trim(),
})

const uniqueUpdateKategori = (id: number) =>
  vine.createRule(
    async (value: unknown, _, field: FieldContext) => {
      const duplicate = await HakAkses.query()
        .whereRaw('nama_hak_akses ILIKE ?', [String(value)])
        .whereNot('id_hak_akses', id)
        .first()

      if (duplicate) {
        field.report('Nama Hak Akses sudah digunakan', 'unique', field)
      }
    },
    { isAsync: true }
  )

export const updateHakAksesValidator = (id: number) =>
  vine.create({
    id_hak_akses: vine.number().min(1).optional(),
    nama_hak_akses: vine
      .string()
      .minLength(3)
      .maxLength(255)
      .trim()
      .use(uniqueUpdateKategori(id)())
      .optional(),
  })
