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
