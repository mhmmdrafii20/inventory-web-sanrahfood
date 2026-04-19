/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.login': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.sign_in': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.sign_in']['types'],
  },
  'bahan.index': {
    methods: ["GET","HEAD"],
    pattern: '/bahan',
    tokens: [{"old":"/bahan","type":0,"val":"bahan","end":""}],
    types: placeholder as Registry['bahan.index']['types'],
  },
  'updateBahan.edit': {
    methods: ["GET","HEAD"],
    pattern: '/bahan/edit/:id',
    tokens: [{"old":"/bahan/edit/:id","type":0,"val":"bahan","end":""},{"old":"/bahan/edit/:id","type":0,"val":"edit","end":""},{"old":"/bahan/edit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['updateBahan.edit']['types'],
  },
  'bahan.create': {
    methods: ["POST"],
    pattern: '/bahan/create',
    tokens: [{"old":"/bahan/create","type":0,"val":"bahan","end":""},{"old":"/bahan/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['bahan.create']['types'],
  },
  'updateBahan.update': {
    methods: ["PUT"],
    pattern: '/bahan/update/:id',
    tokens: [{"old":"/bahan/update/:id","type":0,"val":"bahan","end":""},{"old":"/bahan/update/:id","type":0,"val":"update","end":""},{"old":"/bahan/update/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['updateBahan.update']['types'],
  },
  'bahan.destroy': {
    methods: ["DELETE"],
    pattern: '/bahan/delete/:id',
    tokens: [{"old":"/bahan/delete/:id","type":0,"val":"bahan","end":""},{"old":"/bahan/delete/:id","type":0,"val":"delete","end":""},{"old":"/bahan/delete/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['bahan.destroy']['types'],
  },
  'produk.index': {
    methods: ["GET","HEAD"],
    pattern: '/produk',
    tokens: [{"old":"/produk","type":0,"val":"produk","end":""}],
    types: placeholder as Registry['produk.index']['types'],
  },
  'produk.create': {
    methods: ["POST"],
    pattern: '/produk/create',
    tokens: [{"old":"/produk/create","type":0,"val":"produk","end":""},{"old":"/produk/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['produk.create']['types'],
  },
  'updateProduk.edit': {
    methods: ["GET","HEAD"],
    pattern: '/produk/edit/:id',
    tokens: [{"old":"/produk/edit/:id","type":0,"val":"produk","end":""},{"old":"/produk/edit/:id","type":0,"val":"edit","end":""},{"old":"/produk/edit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['updateProduk.edit']['types'],
  },
  'updateProduk.update': {
    methods: ["PUT"],
    pattern: '/produk/update/:id',
    tokens: [{"old":"/produk/update/:id","type":0,"val":"produk","end":""},{"old":"/produk/update/:id","type":0,"val":"update","end":""},{"old":"/produk/update/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['updateProduk.update']['types'],
  },
  'produk.destroy': {
    methods: ["DELETE"],
    pattern: '/produk/delete/:id',
    tokens: [{"old":"/produk/delete/:id","type":0,"val":"produk","end":""},{"old":"/produk/delete/:id","type":0,"val":"delete","end":""},{"old":"/produk/delete/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['produk.destroy']['types'],
  },
  'hakAkses.index': {
    methods: ["GET","HEAD"],
    pattern: '/role',
    tokens: [{"old":"/role","type":0,"val":"role","end":""}],
    types: placeholder as Registry['hakAkses.index']['types'],
  },
  'hakAkses.create': {
    methods: ["POST"],
    pattern: '/role/create',
    tokens: [{"old":"/role/create","type":0,"val":"role","end":""},{"old":"/role/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['hakAkses.create']['types'],
  },
  'updateHakAkses.edit': {
    methods: ["GET","HEAD"],
    pattern: '/role/edit/:id',
    tokens: [{"old":"/role/edit/:id","type":0,"val":"role","end":""},{"old":"/role/edit/:id","type":0,"val":"edit","end":""},{"old":"/role/edit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['updateHakAkses.edit']['types'],
  },
  'updateHakAkses.update': {
    methods: ["PUT"],
    pattern: '/role/update/:id',
    tokens: [{"old":"/role/update/:id","type":0,"val":"role","end":""},{"old":"/role/update/:id","type":0,"val":"update","end":""},{"old":"/role/update/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['updateHakAkses.update']['types'],
  },
  'hakAkses.destroy': {
    methods: ["DELETE"],
    pattern: '/role/delete/:id',
    tokens: [{"old":"/role/delete/:id","type":0,"val":"role","end":""},{"old":"/role/delete/:id","type":0,"val":"delete","end":""},{"old":"/role/delete/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['hakAkses.destroy']['types'],
  },
  'pengguna.index': {
    methods: ["GET","HEAD"],
    pattern: '/pengguna',
    tokens: [{"old":"/pengguna","type":0,"val":"pengguna","end":""}],
    types: placeholder as Registry['pengguna.index']['types'],
  },
  'pengguna.create': {
    methods: ["POST"],
    pattern: '/pengguna/create',
    tokens: [{"old":"/pengguna/create","type":0,"val":"pengguna","end":""},{"old":"/pengguna/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['pengguna.create']['types'],
  },
  'updatePengguna.edit': {
    methods: ["GET","HEAD"],
    pattern: '/pengguna/edit/:id',
    tokens: [{"old":"/pengguna/edit/:id","type":0,"val":"pengguna","end":""},{"old":"/pengguna/edit/:id","type":0,"val":"edit","end":""},{"old":"/pengguna/edit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['updatePengguna.edit']['types'],
  },
  'updatePengguna.update': {
    methods: ["PUT"],
    pattern: '/pengguna/update/:id',
    tokens: [{"old":"/pengguna/update/:id","type":0,"val":"pengguna","end":""},{"old":"/pengguna/update/:id","type":0,"val":"update","end":""},{"old":"/pengguna/update/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['updatePengguna.update']['types'],
  },
  'pengguna.destroy': {
    methods: ["DELETE"],
    pattern: '/pengguna/delete/:id',
    tokens: [{"old":"/pengguna/delete/:id","type":0,"val":"pengguna","end":""},{"old":"/pengguna/delete/:id","type":0,"val":"delete","end":""},{"old":"/pengguna/delete/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['pengguna.destroy']['types'],
  },
  'resep.index': {
    methods: ["GET","HEAD"],
    pattern: '/resep',
    tokens: [{"old":"/resep","type":0,"val":"resep","end":""}],
    types: placeholder as Registry['resep.index']['types'],
  },
  'resep.create': {
    methods: ["POST"],
    pattern: '/resep/create',
    tokens: [{"old":"/resep/create","type":0,"val":"resep","end":""},{"old":"/resep/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['resep.create']['types'],
  },
  'updateResep.edit': {
    methods: ["GET","HEAD"],
    pattern: '/resep/edit/:id',
    tokens: [{"old":"/resep/edit/:id","type":0,"val":"resep","end":""},{"old":"/resep/edit/:id","type":0,"val":"edit","end":""},{"old":"/resep/edit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['updateResep.edit']['types'],
  },
  'updateResep.update': {
    methods: ["PUT"],
    pattern: '/resep/update/:id',
    tokens: [{"old":"/resep/update/:id","type":0,"val":"resep","end":""},{"old":"/resep/update/:id","type":0,"val":"update","end":""},{"old":"/resep/update/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['updateResep.update']['types'],
  },
  'resep.destroy': {
    methods: ["DELETE"],
    pattern: '/resep/delete/:id',
    tokens: [{"old":"/resep/delete/:id","type":0,"val":"resep","end":""},{"old":"/resep/delete/:id","type":0,"val":"delete","end":""},{"old":"/resep/delete/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['resep.destroy']['types'],
  },
  'kategoriProduk.index': {
    methods: ["GET","HEAD"],
    pattern: '/kategori-produk',
    tokens: [{"old":"/kategori-produk","type":0,"val":"kategori-produk","end":""}],
    types: placeholder as Registry['kategoriProduk.index']['types'],
  },
  'kategoriProduk.create': {
    methods: ["POST"],
    pattern: '/kategori-produk/create',
    tokens: [{"old":"/kategori-produk/create","type":0,"val":"kategori-produk","end":""},{"old":"/kategori-produk/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['kategoriProduk.create']['types'],
  },
  'updateKategoriProduk.edit': {
    methods: ["GET","HEAD"],
    pattern: '/kategori-produk/edit/:id',
    tokens: [{"old":"/kategori-produk/edit/:id","type":0,"val":"kategori-produk","end":""},{"old":"/kategori-produk/edit/:id","type":0,"val":"edit","end":""},{"old":"/kategori-produk/edit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['updateKategoriProduk.edit']['types'],
  },
  'updateKategoriProduk.update': {
    methods: ["PUT"],
    pattern: '/kategori-produk/update/:id',
    tokens: [{"old":"/kategori-produk/update/:id","type":0,"val":"kategori-produk","end":""},{"old":"/kategori-produk/update/:id","type":0,"val":"update","end":""},{"old":"/kategori-produk/update/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['updateKategoriProduk.update']['types'],
  },
  'kategoriProduk.destroy': {
    methods: ["DELETE"],
    pattern: '/kategori-produk/delete/:id',
    tokens: [{"old":"/kategori-produk/delete/:id","type":0,"val":"kategori-produk","end":""},{"old":"/kategori-produk/delete/:id","type":0,"val":"delete","end":""},{"old":"/kategori-produk/delete/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['kategoriProduk.destroy']['types'],
  },
  'produksi.index': {
    methods: ["GET","HEAD"],
    pattern: '/produksi',
    tokens: [{"old":"/produksi","type":0,"val":"produksi","end":""}],
    types: placeholder as Registry['produksi.index']['types'],
  },
  'produksi.create': {
    methods: ["POST"],
    pattern: '/produksi/create',
    tokens: [{"old":"/produksi/create","type":0,"val":"produksi","end":""},{"old":"/produksi/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['produksi.create']['types'],
  },
  'stokBahan.index': {
    methods: ["GET","HEAD"],
    pattern: '/stok-bahan',
    tokens: [{"old":"/stok-bahan","type":0,"val":"stok-bahan","end":""}],
    types: placeholder as Registry['stokBahan.index']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
