/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    signIn: typeof routes['auth.sign_in']
  }
  bahan: {
    index: typeof routes['bahan.index']
    edit: typeof routes['bahan.edit']
    create: typeof routes['bahan.create']
    update: typeof routes['bahan.update']
    destroy: typeof routes['bahan.destroy']
    search: typeof routes['bahan.search']
    trash: typeof routes['bahan.trash']
    restore: typeof routes['bahan.restore']
    searchTrash: typeof routes['bahan.searchTrash']
  }
  produk: {
    index: typeof routes['produk.index']
    create: typeof routes['produk.create']
    edit: typeof routes['produk.edit']
    update: typeof routes['produk.update']
    destroy: typeof routes['produk.destroy']
    search: typeof routes['produk.search']
    trash: typeof routes['produk.trash']
    restore: typeof routes['produk.restore']
    searchTrash: typeof routes['produk.searchTrash']
  }
  hakAkses: {
    index: typeof routes['hakAkses.index']
    create: typeof routes['hakAkses.create']
    edit: typeof routes['hakAkses.edit']
    update: typeof routes['hakAkses.update']
    destroy: typeof routes['hakAkses.destroy']
    search: typeof routes['hakAkses.search']
    trash: typeof routes['hakAkses.trash']
    restore: typeof routes['hakAkses.restore']
    searchTrash: typeof routes['hakAkses.searchTrash']
  }
  pengguna: {
    index: typeof routes['pengguna.index']
    create: typeof routes['pengguna.create']
    edit: typeof routes['pengguna.edit']
    update: typeof routes['pengguna.update']
    destroy: typeof routes['pengguna.destroy']
    search: typeof routes['pengguna.search']
    trash: typeof routes['pengguna.trash']
    restore: typeof routes['pengguna.restore']
    searchTrash: typeof routes['pengguna.searchTrash']
  }
  resep: {
    index: typeof routes['resep.index']
    create: typeof routes['resep.create']
    edit: typeof routes['resep.edit']
    update: typeof routes['resep.update']
    destroy: typeof routes['resep.destroy']
    search: typeof routes['resep.search']
    trash: typeof routes['resep.trash']
    restore: typeof routes['resep.restore']
    searchTrash: typeof routes['resep.searchTrash']
  }
  kategoriProduk: {
    index: typeof routes['kategoriProduk.index']
    create: typeof routes['kategoriProduk.create']
    edit: typeof routes['kategoriProduk.edit']
    update: typeof routes['kategoriProduk.update']
    destroy: typeof routes['kategoriProduk.destroy']
    search: typeof routes['kategoriProduk.search']
    trash: typeof routes['kategoriProduk.trash']
    restore: typeof routes['kategoriProduk.restore']
    searchTrash: typeof routes['kategoriProduk.searchTrash']
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
  notifikasiWhatsapp: {
    index: typeof routes['notifikasiWhatsapp.index']
    createSession: typeof routes['notifikasiWhatsapp.createSession']
    getQr: typeof routes['notifikasiWhatsapp.getQr']
    deleteSession: typeof routes['notifikasiWhatsapp.deleteSession']
  }
  daftarPenerima: {
    index: typeof routes['daftarPenerima.index']
    create: typeof routes['daftarPenerima.create']
    search: typeof routes['daftarPenerima.search']
    edit: typeof routes['daftarPenerima.edit']
    update: typeof routes['daftarPenerima.update']
    destroy: typeof routes['daftarPenerima.destroy']
  }
  tipeNotifikasi: {
    index: typeof routes['tipeNotifikasi.index']
    create: typeof routes['tipeNotifikasi.create']
    edit: typeof routes['tipeNotifikasi.edit']
    update: typeof routes['tipeNotifikasi.update']
    destroy: typeof routes['tipeNotifikasi.destroy']
    search: typeof routes['tipeNotifikasi.search']
  }
}
