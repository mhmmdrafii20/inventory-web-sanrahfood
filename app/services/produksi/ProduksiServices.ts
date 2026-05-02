import Resep from '#models/resep/resep'
import RiwayatProduksi from '#models/produksi/riwayat_produksi'
import StokBahanBaku from '#models/bahan/stok_bahan_baku'
import db from '@adonisjs/lucid/services/db'
import StokProduk from '#models/produk/stok_produk'
import { DateTime } from 'luxon'
import RiwayatStokProduk from '#models/produk/riwayat_stok_produk'
import RiwayatStokBahanBaku from '#models/bahan/riwayat_stok_bahan_baku'
import { errors } from '@vinejs/vine'

export class ProduksiServices {
  static async create(payload: {
    id_resep: number
    id_produk: number
    jumlah_batch: number
    tanggal_produksi: DateTime
    catatan_tambahan?: string
  }) {
    const resep = await Resep.query()
      .where('id_resep', payload.id_resep)
      .preload('resep_bahan', (resepBahanQuery) => {
        resepBahanQuery.preload('bahan')
      })
      .preload('produk')
      .firstOrFail()

    const bahanIds = resep.resep_bahan.map((item) => item.id_bahan_baku)

    const stokList = await StokBahanBaku.query().whereIn('id_bahan_baku', bahanIds)

    const stokMap = new Map(stokList.map((item) => [item.id_bahan_baku, item.jumlah_stok]))

    const maxBatchList = resep.resep_bahan.map((items) => {
      let stok = stokMap.get(items.id_bahan_baku) ?? 0
      return Math.floor(Number(stok) / Number(items.jumlah))
    })
    const maxBatch = Math.min(...maxBatchList)

    if (payload.jumlah_batch > maxBatch) {
      throw new errors.E_VALIDATION_ERROR([
        {
          message: `Stok tidak cukup. Maksimal batch: ${maxBatch}, diminta: ${payload.jumlah_batch}`,
          rule: 'max',
          field: 'jumlah_batch',
        },
      ])
    }

    const kebutuhan = resep.resep_bahan.map((items) => {
      return {
        id_bahan_baku: items.id_bahan_baku,
        jumlah: Number(items.jumlah) * Number(payload.jumlah_batch),
      }
    })

    await db.transaction(async (transaction) => {
      for (const item of kebutuhan) {
        let stok = stokMap.get(item.id_bahan_baku) ?? 0

        if (Number(stok) < Number(item.jumlah)) {
          throw new errors.E_VALIDATION_ERROR([
            {
              message: `Stok tidak cukup. Stok saat ini ${stok} dan jumlah yang dibutuhkan ${item.jumlah}`,
              rule: 'max',
              field: 'jumlah',
            },
          ])
        }

        const stokSesudah = Number(stok) - Number(item.jumlah)

        await StokBahanBaku.query({ client: transaction })
          .where('id_bahan_baku', item.id_bahan_baku)
          .update({
            jumlah_stok: stokSesudah,
          })

        const stokBahanBaku = await StokBahanBaku.query({ client: transaction })
          .where('id_stok_bahan_baku', item.id_bahan_baku)
          .firstOrFail()

        await RiwayatStokBahanBaku.create(
          {
            id_stok_bahan_baku: stokBahanBaku.id_stok_bahan_baku,
            jenis_stok: 'KELUAR',
            stok_sebelum: Number(stok),
            selisih_stok: -Number(item.jumlah),
            stok_sesudah: Number(stokSesudah),
            tanggal_perubahan_stok: payload.tanggal_produksi,
          },
          { client: transaction }
        )
      }

      const stokProduk = await StokProduk.query()
        .where('id_produk', resep.id_produk)
        .preload('produk')
        .firstOrFail()

      stokProduk.jumlah_stok += Number(payload.jumlah_batch) * Number(resep.yield_per_batch)
      await StokProduk.query({ client: transaction })
        .where('id_produk', resep.id_produk)
        .update({
          jumlah_stok: Number(stokProduk.jumlah_stok),
        })

      const stokAwal = Number(stokProduk.jumlah_stok)
      const stokSesudah =
        Number(stokAwal) + Number(payload.jumlah_batch) * Number(resep.yield_per_batch)

      await RiwayatStokProduk.create(
        {
          id_stok_produk: stokProduk.id_stok_produk,
          nama_produk: stokProduk.produk.nama_produk,
          jenis_stok: 'MASUK',
          selisih_stok: Number(payload.jumlah_batch) * Number(resep.yield_per_batch),
          stok_sebelum: Number(stokAwal),
          stok_sesudah: Number(stokSesudah),
          tanggal_perubahan_stok: payload.tanggal_produksi,
        },
        { client: transaction }
      )

      await RiwayatProduksi.create(
        {
          id_produk: resep.id_produk,
          nama_produk: resep.produk.nama_produk,
          id_resep: resep.id_resep,
          nama_resep: resep.nama_resep,
          jumlah_batch: Number(payload.jumlah_batch),
          jumlah_hasil_produksi: Number(payload.jumlah_batch) * Number(resep.yield_per_batch),
          tanggal_produksi: payload.tanggal_produksi,
          catatan_tambahan: payload.catatan_tambahan,
        },
        { client: transaction }
      )
    })
  }
}
