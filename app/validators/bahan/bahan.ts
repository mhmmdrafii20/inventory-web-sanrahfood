import vine from '@vinejs/vine'
import Bahan from '#models/bahan/bahan'
import { FieldContext } from '@vinejs/vine/types'

const uniqueBahanBaku = vine.createRule(
  async (value: unknown, _, field: FieldContext) => {
    const duplicate = await Bahan.query()
      .whereRaw('nama_bahan_baku ILIKE ?', [String(value)])
      .first()

    if (duplicate) {
      field.report('Nama Bahan Baku sudah digunakan', 'unique', field)
    }
  },
  { isAsync: true }
)

export const bahanValidator = vine.create({
  nama_bahan_baku: vine.string().minLength(3).maxLength(50).use(uniqueBahanBaku()).trim(),
  satuan: vine.string().minLength(1).maxLength(10).trim(),
  stok_minimum: vine.number().min(0),
})

const uniqueUpdateBahanBaku = (id: number) =>
  vine.createRule(
    async (value: unknown, _, field: FieldContext) => {
      const duplicate = await Bahan.query()
        .whereRaw('nama_bahan_baku ILIKE ?', [String(value)])
        .whereNot('id_bahan_baku', id)
        .first()

      if (duplicate) {
        field.report('Nama Bahan Baku sudah digunakan', 'unique', field)
      }
    },
    { isAsync: true }
  )

export const updateBahanValidator = (id: number) =>
  vine.create({
    id_bahan_baku: vine.number().min(1).optional(),
    nama_bahan_baku: vine
      .string()
      .minLength(3)
      .maxLength(50)
      .trim()
      .use(uniqueUpdateBahanBaku(id)())
      .optional(),
    satuan: vine.string().minLength(1).maxLength(10).trim().optional(),
    stok_minimum: vine.number().min(0).optional(),
  })
