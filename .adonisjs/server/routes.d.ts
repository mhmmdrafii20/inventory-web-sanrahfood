import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.sign_in': { paramsTuple?: []; params?: {} }
    'bahan.index': { paramsTuple?: []; params?: {} }
    'updateBahan.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bahan.create': { paramsTuple?: []; params?: {} }
    'updateBahan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bahan.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.index': { paramsTuple?: []; params?: {} }
    'produk.create': { paramsTuple?: []; params?: {} }
    'updateProduk.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'updateProduk.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.index': { paramsTuple?: []; params?: {} }
    'hakAkses.create': { paramsTuple?: []; params?: {} }
    'updateHakAkses.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'updateHakAkses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.index': { paramsTuple?: []; params?: {} }
    'pengguna.create': { paramsTuple?: []; params?: {} }
    'updatePengguna.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'updatePengguna.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'resep.index': { paramsTuple?: []; params?: {} }
    'resep.create': { paramsTuple?: []; params?: {} }
    'updateResep.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'updateResep.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'resep.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.index': { paramsTuple?: []; params?: {} }
    'kategoriProduk.create': { paramsTuple?: []; params?: {} }
    'updateKategoriProduk.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'updateKategoriProduk.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'bahan.index': { paramsTuple?: []; params?: {} }
    'updateBahan.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.index': { paramsTuple?: []; params?: {} }
    'updateProduk.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.index': { paramsTuple?: []; params?: {} }
    'updateHakAkses.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.index': { paramsTuple?: []; params?: {} }
    'updatePengguna.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'resep.index': { paramsTuple?: []; params?: {} }
    'updateResep.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.index': { paramsTuple?: []; params?: {} }
    'updateKategoriProduk.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'bahan.index': { paramsTuple?: []; params?: {} }
    'updateBahan.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.index': { paramsTuple?: []; params?: {} }
    'updateProduk.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.index': { paramsTuple?: []; params?: {} }
    'updateHakAkses.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.index': { paramsTuple?: []; params?: {} }
    'updatePengguna.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'resep.index': { paramsTuple?: []; params?: {} }
    'updateResep.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.index': { paramsTuple?: []; params?: {} }
    'updateKategoriProduk.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.sign_in': { paramsTuple?: []; params?: {} }
    'bahan.create': { paramsTuple?: []; params?: {} }
    'produk.create': { paramsTuple?: []; params?: {} }
    'hakAkses.create': { paramsTuple?: []; params?: {} }
    'pengguna.create': { paramsTuple?: []; params?: {} }
    'resep.create': { paramsTuple?: []; params?: {} }
    'kategoriProduk.create': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'updateBahan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'updateProduk.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'updateHakAkses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'updatePengguna.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'updateResep.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'updateKategoriProduk.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'bahan.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'resep.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}