import vine from '@vinejs/vine'
import Supplier from '#models/supplier/supplier'
import { FieldContext } from '@vinejs/vine/types'

const uniqueNamaSupplier = vine.createRule(
  async (value: unknown, _, field: FieldContext) => {
    const duplicate = await Supplier.query()
      .whereRaw('nama_supplier ILIKE ?', [String(value)])
      .first()

    if (duplicate) {
      field.report('Nama Supplier sudah digunakan', 'unique', field)
    }
  },
  { isAsync: true }
)

const uniqueNomorTelepon = vine.createRule(
  async (value: unknown, _, field: FieldContext) => {
    const duplicate = await Supplier.query()
      .whereRaw('nomor_telepon ILIKE ?', [String(value)])
      .first()

    if (duplicate) {
      field.report('Nomor Telepon sudah digunakan', 'unique', field)
    }
  },
  { isAsync: true }
)

export const createSupplierValidator = vine.create({
  nama_supplier: vine.string().minLength(1).maxLength(255).use(uniqueNamaSupplier()),
  alamat: vine.string().minLength(1).maxLength(255),
  nomor_telepon: vine.string().mobile().use(uniqueNomorTelepon()),
})

const uniqueUpdateNamaSupplier = (id: number) =>
  vine.createRule(
    async (value: unknown, _, field: FieldContext) => {
      const duplicate = await Supplier.query()
        .whereRaw('nama_supplier ILIKE ?', [String(value)])
        .whereNot('id_supplier', id)
        .first()

      if (duplicate) {
        field.report('Nama Supplier sudah digunakan', 'unique', field)
      }
    },
    { isAsync: true }
  )

const uniqueUpdateNomorTelepon = (id: number) =>
  vine.createRule(
    async (value: unknown, _, field: FieldContext) => {
      const duplicate = await Supplier.query()
        .whereRaw('nomor_telepon ILIKE ?', [String(value)])
        .whereNot('id_supplier', id)
        .first()

      if (duplicate) {
        field.report('Nomor Telepon sudah digunakan', 'unique', field)
      }
    },
    { isAsync: true }
  )

export const updateSupplierValidator = (id: number) =>
  vine.create({
    id_supplier: vine.number().min(1).optional(),
    nama_supplier: vine
      .string()
      .minLength(1)
      .maxLength(255)
      .optional()
      .use(uniqueUpdateNamaSupplier(id)()),
    alamat: vine.string().minLength(1).maxLength(255).optional(),
    nomor_telepon: vine.string().mobile().optional().use(uniqueUpdateNomorTelepon(id)()),
  })
