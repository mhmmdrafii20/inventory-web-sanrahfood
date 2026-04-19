/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.login': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'auth.sign_in': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'bahan.index': {
    methods: ["GET","HEAD"]
    pattern: '/bahan'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'updateBahan.edit': {
    methods: ["GET","HEAD"]
    pattern: '/bahan/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'bahan.create': {
    methods: ["POST"]
    pattern: '/bahan/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'updateBahan.update': {
    methods: ["PUT"]
    pattern: '/bahan/update/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'bahan.destroy': {
    methods: ["DELETE"]
    pattern: '/bahan/delete/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'produk.index': {
    methods: ["GET","HEAD"]
    pattern: '/produk'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'produk.create': {
    methods: ["POST"]
    pattern: '/produk/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'updateProduk.edit': {
    methods: ["GET","HEAD"]
    pattern: '/produk/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'updateProduk.update': {
    methods: ["PUT"]
    pattern: '/produk/update/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'produk.destroy': {
    methods: ["DELETE"]
    pattern: '/produk/delete/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'hakAkses.index': {
    methods: ["GET","HEAD"]
    pattern: '/role'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'hakAkses.create': {
    methods: ["POST"]
    pattern: '/role/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'updateHakAkses.edit': {
    methods: ["GET","HEAD"]
    pattern: '/role/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'updateHakAkses.update': {
    methods: ["PUT"]
    pattern: '/role/update/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'hakAkses.destroy': {
    methods: ["DELETE"]
    pattern: '/role/delete/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'pengguna.index': {
    methods: ["GET","HEAD"]
    pattern: '/pengguna'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'pengguna.create': {
    methods: ["POST"]
    pattern: '/pengguna/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'updatePengguna.edit': {
    methods: ["GET","HEAD"]
    pattern: '/pengguna/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'updatePengguna.update': {
    methods: ["PUT"]
    pattern: '/pengguna/update/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'pengguna.destroy': {
    methods: ["DELETE"]
    pattern: '/pengguna/delete/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'resep.index': {
    methods: ["GET","HEAD"]
    pattern: '/resep'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'resep.create': {
    methods: ["POST"]
    pattern: '/resep/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'updateResep.edit': {
    methods: ["GET","HEAD"]
    pattern: '/resep/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'updateResep.update': {
    methods: ["PUT"]
    pattern: '/resep/update/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'resep.destroy': {
    methods: ["DELETE"]
    pattern: '/resep/delete/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'kategoriProduk.index': {
    methods: ["GET","HEAD"]
    pattern: '/kategori-produk'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'kategoriProduk.create': {
    methods: ["POST"]
    pattern: '/kategori-produk/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'updateKategoriProduk.edit': {
    methods: ["GET","HEAD"]
    pattern: '/kategori-produk/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'updateKategoriProduk.update': {
    methods: ["PUT"]
    pattern: '/kategori-produk/update/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'kategoriProduk.destroy': {
    methods: ["DELETE"]
    pattern: '/kategori-produk/delete/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'produksi.index': {
    methods: ["GET","HEAD"]
    pattern: '/produksi'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'produksi.create': {
    methods: ["POST"]
    pattern: '/produksi/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'stokBahan.index': {
    methods: ["GET","HEAD"]
    pattern: '/stok-bahan'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
}
