/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    signIn: typeof routes['auth.sign_in']
  }
  bahan: {
    index: typeof routes['bahan.index']
    create: typeof routes['bahan.create']
    destroy: typeof routes['bahan.destroy']
    search: typeof routes['bahan.search']
  }
  updateBahan: {
    edit: typeof routes['updateBahan.edit']
    update: typeof routes['updateBahan.update']
  }
  produk: {
    index: typeof routes['produk.index']
    create: typeof routes['produk.create']
    destroy: typeof routes['produk.destroy']
    search: typeof routes['produk.search']
  }
  updateProduk: {
    edit: typeof routes['updateProduk.edit']
    update: typeof routes['updateProduk.update']
  }
  hakAkses: {
    index: typeof routes['hakAkses.index']
    create: typeof routes['hakAkses.create']
    destroy: typeof routes['hakAkses.destroy']
    search: typeof routes['hakAkses.search']
  }
  updateHakAkses: {
    edit: typeof routes['updateHakAkses.edit']
    update: typeof routes['updateHakAkses.update']
  }
  pengguna: {
    index: typeof routes['pengguna.index']
    create: typeof routes['pengguna.create']
    destroy: typeof routes['pengguna.destroy']
    search: typeof routes['pengguna.search']
  }
  updatePengguna: {
    edit: typeof routes['updatePengguna.edit']
    update: typeof routes['updatePengguna.update']
  }
  resep: {
    index: typeof routes['resep.index']
    create: typeof routes['resep.create']
    destroy: typeof routes['resep.destroy']
    search: typeof routes['resep.search']
  }
  updateResep: {
    edit: typeof routes['updateResep.edit']
    update: typeof routes['updateResep.update']
  }
  kategoriProduk: {
    index: typeof routes['kategoriProduk.index']
    create: typeof routes['kategoriProduk.create']
    destroy: typeof routes['kategoriProduk.destroy']
    search: typeof routes['kategoriProduk.search']
  }
  updateKategoriProduk: {
    edit: typeof routes['updateKategoriProduk.edit']
    update: typeof routes['updateKategoriProduk.update']
  }
  produksi: {
    index: typeof routes['produksi.index']
    create: typeof routes['produksi.create']
  }
  stokBahan: {
    index: typeof routes['stokBahan.index']
    search: typeof routes['stokBahan.search']
  }
  restokBahan: {
    restok: typeof routes['restokBahan.restok']
    create: typeof routes['restokBahan.create']
  }
  riwayatStokBahanBaku: {
    index: typeof routes['riwayatStokBahanBaku.index']
    filter: typeof routes['riwayatStokBahanBaku.filter']
    generate: typeof routes['riwayatStokBahanBaku.generate']
  }
  stokProduk: {
    index: typeof routes['stokProduk.index']
    search: typeof routes['stokProduk.search']
  }
  riwayatStokProduk: {
    index: typeof routes['riwayatStokProduk.index']
    filter: typeof routes['riwayatStokProduk.filter']
    generate: typeof routes['riwayatStokProduk.generate']
  }
  riwayatProduksi: {
    index: typeof routes['riwayatProduksi.index']
    filter: typeof routes['riwayatProduksi.filter']
    generate: typeof routes['riwayatProduksi.generate']
  }
  integrasiWhatsapp: {
    index: typeof routes['integrasiWhatsapp.index']
    connect: typeof routes['integrasiWhatsapp.connect']
    getQr: typeof routes['integrasiWhatsapp.getQr']
  }
}
