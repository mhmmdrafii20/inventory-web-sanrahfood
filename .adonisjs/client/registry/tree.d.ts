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
  }
  updateBahan: {
    edit: typeof routes['updateBahan.edit']
    update: typeof routes['updateBahan.update']
  }
  produk: {
    index: typeof routes['produk.index']
    create: typeof routes['produk.create']
    destroy: typeof routes['produk.destroy']
  }
  updateProduk: {
    edit: typeof routes['updateProduk.edit']
    update: typeof routes['updateProduk.update']
  }
  hakAkses: {
    index: typeof routes['hakAkses.index']
    create: typeof routes['hakAkses.create']
    destroy: typeof routes['hakAkses.destroy']
  }
  updateHakAkses: {
    edit: typeof routes['updateHakAkses.edit']
    update: typeof routes['updateHakAkses.update']
  }
  pengguna: {
    index: typeof routes['pengguna.index']
    create: typeof routes['pengguna.create']
    destroy: typeof routes['pengguna.destroy']
  }
  updatePengguna: {
    edit: typeof routes['updatePengguna.edit']
    update: typeof routes['updatePengguna.update']
  }
  resep: {
    index: typeof routes['resep.index']
    create: typeof routes['resep.create']
    destroy: typeof routes['resep.destroy']
  }
  updateResep: {
    edit: typeof routes['updateResep.edit']
    update: typeof routes['updateResep.update']
  }
  kategoriProduk: {
    index: typeof routes['kategoriProduk.index']
    create: typeof routes['kategoriProduk.create']
    destroy: typeof routes['kategoriProduk.destroy']
  }
  updateKategoriProduk: {
    edit: typeof routes['updateKategoriProduk.edit']
    update: typeof routes['updateKategoriProduk.update']
  }
}
