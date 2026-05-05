import { TbSupplierSchema as SupplierSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Supplier extends SupplierSchema {
  public static table = 'public.tb_supplier'

  @column({ isPrimary: true, columnName: 'id_supplier' })
  declare id_supplier: number

  @column({ columnName: 'nama_supplier' })
  declare nama_supplier: string

  @column({ columnName: 'alamat' })
  declare alamat: string

  @column({ columnName: 'nomor_telepon' })
  declare nomor_telepon: string

  @column({ columnName: 'is_deleted' })
  declare is_deleted: boolean

  @column.dateTime({ serializeAs: 'deleted_at', columnName: 'deleted_at' })
  declare deleted_at: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime
}
