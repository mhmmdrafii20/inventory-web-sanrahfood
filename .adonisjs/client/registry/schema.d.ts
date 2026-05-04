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
  'webhook.get_stok_produk_from_supabase': {
    methods: ["POST"]
    pattern: '/webhook/stok-produk'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'webhook.get_stok_bahan_baku_from_supabase': {
    methods: ["POST"]
    pattern: '/webhook/bahan'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'webhook.get_produksi_from_supabase': {
    methods: ["POST"]
    pattern: '/webhook/produksi'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'dashboard.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard'
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
  'stokBahan.search': {
    methods: ["GET","HEAD"]
    pattern: '/stok-bahan/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'stokProduk.index': {
    methods: ["GET","HEAD"]
    pattern: '/stok-produk'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'stokProduk.search': {
    methods: ["GET","HEAD"]
    pattern: '/stok-produk/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'restokBahan.restok': {
    methods: ["GET","HEAD"]
    pattern: '/restok-bahan'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'restokBahan.create': {
    methods: ["POST"]
    pattern: '/restok-bahan/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'stokBahanBaku.adjustment': {
    methods: ["GET","HEAD"]
    pattern: '/stok-bahan-baku/adjustment'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'stokBahanBaku.createAdjustment': {
    methods: ["POST"]
    pattern: '/stok-bahan-baku/adjustment/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'stokBahanBaku.status': {
    methods: ["GET","HEAD"]
    pattern: '/stok-bahan-baku/status'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'stokProduk.adjustment': {
    methods: ["GET","HEAD"]
    pattern: '/stok-produk/adjustment'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'stokProduk.createAdjustment': {
    methods: ["POST"]
    pattern: '/stok-produk/adjustment/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'stokProduk.status': {
    methods: ["GET","HEAD"]
    pattern: '/stok-produk/status'
    types: {
      body: {}
      paramsTuple: []
      params: {}
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
  'resep.edit': {
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
  'resep.update': {
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
  'resep.search': {
    methods: ["GET","HEAD"]
    pattern: '/resep/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'resep.trash': {
    methods: ["GET","HEAD"]
    pattern: '/resep/trash'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'resep.restore': {
    methods: ["PATCH"]
    pattern: '/resep/restore/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'resep.searchTrash': {
    methods: ["GET","HEAD"]
    pattern: '/resep/trash/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
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
  'bahan.edit': {
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
  'bahan.update': {
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
  'bahan.search': {
    methods: ["GET","HEAD"]
    pattern: '/bahan/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'bahan.trash': {
    methods: ["GET","HEAD"]
    pattern: '/bahan/trash'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'bahan.restore': {
    methods: ["PATCH"]
    pattern: '/bahan/restore/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'bahan.searchTrash': {
    methods: ["GET","HEAD"]
    pattern: '/bahan/trash/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'approval-stok-bahan-baku.index': {
    methods: ["GET","HEAD"]
    pattern: '/approval-stok-bahan-baku'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'approval-stok-bahan-baku.approve': {
    methods: ["POST"]
    pattern: '/approval-stok-bahan-baku/approve/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'approval-stok-bahan-baku.reject': {
    methods: ["POST"]
    pattern: '/approval-stok-bahan-baku/reject/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'approval-stok-bahan-baku.search': {
    methods: ["GET","HEAD"]
    pattern: '/approval-stok-bahan-baku/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
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
  'produk.edit': {
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
  'produk.update': {
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
  'produk.search': {
    methods: ["GET","HEAD"]
    pattern: '/produk/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'produk.trash': {
    methods: ["GET","HEAD"]
    pattern: '/produk/trash'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'produk.restore': {
    methods: ["PATCH"]
    pattern: '/produk/restore/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'produk.searchTrash': {
    methods: ["GET","HEAD"]
    pattern: '/produk/trash/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'approval-stok-produk.index': {
    methods: ["GET","HEAD"]
    pattern: '/approval-stok-produk'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'approval-stok-produk.approve': {
    methods: ["POST"]
    pattern: '/approval-stok-produk/approve/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'approval-stok-produk.reject': {
    methods: ["POST"]
    pattern: '/approval-stok-produk/reject/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'approval-stok-produk.search': {
    methods: ["GET","HEAD"]
    pattern: '/approval-stok-produk/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
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
  'hakAkses.edit': {
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
  'hakAkses.update': {
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
  'hakAkses.search': {
    methods: ["GET","HEAD"]
    pattern: '/role/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'hakAkses.trash': {
    methods: ["GET","HEAD"]
    pattern: '/role/trash'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'hakAkses.restore': {
    methods: ["PATCH"]
    pattern: '/role/restore/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'hakAkses.searchTrash': {
    methods: ["GET","HEAD"]
    pattern: '/role/trash/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
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
  'pengguna.edit': {
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
  'pengguna.update': {
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
  'pengguna.search': {
    methods: ["GET","HEAD"]
    pattern: '/pengguna/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'pengguna.trash': {
    methods: ["GET","HEAD"]
    pattern: '/pengguna/trash'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'pengguna.restore': {
    methods: ["PATCH"]
    pattern: '/pengguna/restore/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'pengguna.searchTrash': {
    methods: ["GET","HEAD"]
    pattern: '/pengguna/trash/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
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
  'kategoriProduk.edit': {
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
  'kategoriProduk.update': {
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
  'kategoriProduk.search': {
    methods: ["GET","HEAD"]
    pattern: '/kategori-produk/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'kategoriProduk.trash': {
    methods: ["GET","HEAD"]
    pattern: '/kategori-produk/trash'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'kategoriProduk.restore': {
    methods: ["PATCH"]
    pattern: '/kategori-produk/restore/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'kategoriProduk.searchTrash': {
    methods: ["GET","HEAD"]
    pattern: '/kategori-produk/trash/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'riwayatStokBahanBaku.index': {
    methods: ["GET","HEAD"]
    pattern: '/riwayat-stok-bahan-baku'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'riwayatStokBahanBaku.filter': {
    methods: ["GET","HEAD"]
    pattern: '/riwayat-stok-bahan-baku/filter'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'riwayatStokBahanBaku.generate': {
    methods: ["GET","HEAD"]
    pattern: '/riwayat-stok-bahan-baku/generate-pdf'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'riwayatStokProduk.index': {
    methods: ["GET","HEAD"]
    pattern: '/riwayat-stok-produk'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'riwayatStokProduk.filter': {
    methods: ["GET","HEAD"]
    pattern: '/riwayat-stok-produk/filter'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'riwayatStokProduk.generate': {
    methods: ["GET","HEAD"]
    pattern: '/riwayat-stok-produk/generate-pdf'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'riwayatProduksi.index': {
    methods: ["GET","HEAD"]
    pattern: '/riwayat-produksi'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'riwayatProduksi.filter': {
    methods: ["GET","HEAD"]
    pattern: '/riwayat-produksi/filter'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'riwayatProduksi.generate': {
    methods: ["GET","HEAD"]
    pattern: '/riwayat-produksi/generate-pdf'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'notifikasiWhatsapp.index': {
    methods: ["GET","HEAD"]
    pattern: '/notifikasi-whatsapp'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'notifikasiWhatsapp.createSession': {
    methods: ["POST"]
    pattern: '/notifikasi-whatsapp/createSession'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'notifikasiWhatsapp.getQr': {
    methods: ["GET","HEAD"]
    pattern: '/notifikasi-whatsapp/get-qr'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'notifikasiWhatsapp.deleteSession': {
    methods: ["DELETE"]
    pattern: '/notifikasi-whatsapp/deleteSession'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'riwayatNotifikasi.index': {
    methods: ["GET","HEAD"]
    pattern: '/riwayat-notifikasi'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'riwayatNotifikasi.filter': {
    methods: ["GET","HEAD"]
    pattern: '/riwayat-notifikasi/filter'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'daftarPenerima.index': {
    methods: ["GET","HEAD"]
    pattern: '/daftar-penerima'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'daftarPenerima.create': {
    methods: ["POST"]
    pattern: '/daftar-penerima/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'daftarPenerima.search': {
    methods: ["GET","HEAD"]
    pattern: '/daftar-penerima/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'daftarPenerima.edit': {
    methods: ["GET","HEAD"]
    pattern: '/daftar-penerima/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'daftarPenerima.update': {
    methods: ["PUT"]
    pattern: '/daftar-penerima/update/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'daftarPenerima.destroy': {
    methods: ["DELETE"]
    pattern: '/daftar-penerima/delete/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'tipeNotifikasi.index': {
    methods: ["GET","HEAD"]
    pattern: '/tipe-notifikasi'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'tipeNotifikasi.create': {
    methods: ["POST"]
    pattern: '/tipe-notifikasi/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'tipeNotifikasi.edit': {
    methods: ["GET","HEAD"]
    pattern: '/tipe-notifikasi/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'tipeNotifikasi.update': {
    methods: ["PUT"]
    pattern: '/tipe-notifikasi/update/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'tipeNotifikasi.destroy': {
    methods: ["DELETE"]
    pattern: '/tipe-notifikasi/delete/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'tipeNotifikasi.search': {
    methods: ["GET","HEAD"]
    pattern: '/tipe-notifikasi/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'templateNotifikasi.index': {
    methods: ["GET","HEAD"]
    pattern: '/template-notifikasi'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'templateNotifikasi.create': {
    methods: ["POST"]
    pattern: '/template-notifikasi/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'templateNotifikasi.search': {
    methods: ["GET","HEAD"]
    pattern: '/template-notifikasi/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'templateNotifikasi.edit': {
    methods: ["GET","HEAD"]
    pattern: '/template-notifikasi/edit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'templateNotifikasi.update': {
    methods: ["PUT"]
    pattern: '/template-notifikasi/update/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'templateNotifikasi.destroy': {
    methods: ["DELETE"]
    pattern: '/template-notifikasi/delete/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
    }
  }
  'pengguna.get_current_user': {
    methods: ["GET","HEAD"]
    pattern: '/current-user'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'auth.signOut': {
    methods: ["POST"]
    pattern: '/signout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
}
