import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.sign_in': { paramsTuple?: []; params?: {} }
    'webhook.get_stok_produk_from_supabase': { paramsTuple?: []; params?: {} }
    'webhook.get_stok_bahan_baku_from_supabase': { paramsTuple?: []; params?: {} }
    'webhook.get_produksi_from_supabase': { paramsTuple?: []; params?: {} }
    'stokBahan.index': { paramsTuple?: []; params?: {} }
    'stokBahan.search': { paramsTuple?: []; params?: {} }
    'stokProduk.index': { paramsTuple?: []; params?: {} }
    'stokProduk.search': { paramsTuple?: []; params?: {} }
    'dashboard.gudang': { paramsTuple?: []; params?: {} }
    'restokBahan.restok': { paramsTuple?: []; params?: {} }
    'restokBahan.create': { paramsTuple?: []; params?: {} }
    'stokBahanBaku.adjustment': { paramsTuple?: []; params?: {} }
    'stokBahanBaku.createAdjustment': { paramsTuple?: []; params?: {} }
    'stokBahanBaku.status': { paramsTuple?: []; params?: {} }
    'stokBahanBaku.searchStatus': { paramsTuple?: []; params?: {} }
    'produk.stokKeluar': { paramsTuple?: []; params?: {} }
    'produk.createStokKeluar': { paramsTuple?: []; params?: {} }
    'stokProduk.adjustment': { paramsTuple?: []; params?: {} }
    'stokProduk.createAdjustment': { paramsTuple?: []; params?: {} }
    'stokProduk.status': { paramsTuple?: []; params?: {} }
    'stokProduk.searchStatus': { paramsTuple?: []; params?: {} }
    'dashboard.produksi': { paramsTuple?: []; params?: {} }
    'resep.index': { paramsTuple?: []; params?: {} }
    'resep.create': { paramsTuple?: []; params?: {} }
    'resep.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'resep.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'resep.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'resep.search': { paramsTuple?: []; params?: {} }
    'resep.trash': { paramsTuple?: []; params?: {} }
    'resep.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'resep.searchTrash': { paramsTuple?: []; params?: {} }
    'produksi.index': { paramsTuple?: []; params?: {} }
    'produksi.create': { paramsTuple?: []; params?: {} }
    'dashboard.pemilik': { paramsTuple?: []; params?: {} }
    'bahan.index': { paramsTuple?: []; params?: {} }
    'bahan.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bahan.create': { paramsTuple?: []; params?: {} }
    'bahan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bahan.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bahan.search': { paramsTuple?: []; params?: {} }
    'bahan.trash': { paramsTuple?: []; params?: {} }
    'bahan.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bahan.searchTrash': { paramsTuple?: []; params?: {} }
    'approval-stok-bahan-baku.index': { paramsTuple?: []; params?: {} }
    'approval-stok-bahan-baku.approve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'approval-stok-bahan-baku.reject': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'approval-stok-bahan-baku.search': { paramsTuple?: []; params?: {} }
    'produk.index': { paramsTuple?: []; params?: {} }
    'produk.create': { paramsTuple?: []; params?: {} }
    'produk.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.search': { paramsTuple?: []; params?: {} }
    'produk.trash': { paramsTuple?: []; params?: {} }
    'produk.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.searchTrash': { paramsTuple?: []; params?: {} }
    'approval-stok-produk.index': { paramsTuple?: []; params?: {} }
    'approval-stok-produk.approve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'approval-stok-produk.reject': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'approval-stok-produk.search': { paramsTuple?: []; params?: {} }
    'hakAkses.index': { paramsTuple?: []; params?: {} }
    'hakAkses.create': { paramsTuple?: []; params?: {} }
    'hakAkses.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.search': { paramsTuple?: []; params?: {} }
    'hakAkses.trash': { paramsTuple?: []; params?: {} }
    'hakAkses.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.searchTrash': { paramsTuple?: []; params?: {} }
    'pengguna.index': { paramsTuple?: []; params?: {} }
    'pengguna.create': { paramsTuple?: []; params?: {} }
    'pengguna.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.search': { paramsTuple?: []; params?: {} }
    'pengguna.trash': { paramsTuple?: []; params?: {} }
    'pengguna.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.searchTrash': { paramsTuple?: []; params?: {} }
    'kategoriProduk.index': { paramsTuple?: []; params?: {} }
    'kategoriProduk.create': { paramsTuple?: []; params?: {} }
    'kategoriProduk.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.search': { paramsTuple?: []; params?: {} }
    'kategoriProduk.trash': { paramsTuple?: []; params?: {} }
    'kategoriProduk.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.searchTrash': { paramsTuple?: []; params?: {} }
    'riwayatStokBahanBaku.index': { paramsTuple?: []; params?: {} }
    'riwayatStokBahanBaku.filter': { paramsTuple?: []; params?: {} }
    'riwayatStokBahanBaku.generate': { paramsTuple?: []; params?: {} }
    'riwayatStokProduk.index': { paramsTuple?: []; params?: {} }
    'riwayatStokProduk.filter': { paramsTuple?: []; params?: {} }
    'riwayatStokProduk.generate': { paramsTuple?: []; params?: {} }
    'riwayatProduksi.index': { paramsTuple?: []; params?: {} }
    'riwayatProduksi.filter': { paramsTuple?: []; params?: {} }
    'riwayatProduksi.generate': { paramsTuple?: []; params?: {} }
    'notifikasiWhatsapp.index': { paramsTuple?: []; params?: {} }
    'notifikasiWhatsapp.createSession': { paramsTuple?: []; params?: {} }
    'notifikasiWhatsapp.getQr': { paramsTuple?: []; params?: {} }
    'notifikasiWhatsapp.deleteSession': { paramsTuple?: []; params?: {} }
    'riwayatNotifikasi.index': { paramsTuple?: []; params?: {} }
    'riwayatNotifikasi.filter': { paramsTuple?: []; params?: {} }
    'daftarPenerima.index': { paramsTuple?: []; params?: {} }
    'daftarPenerima.create': { paramsTuple?: []; params?: {} }
    'daftarPenerima.search': { paramsTuple?: []; params?: {} }
    'daftarPenerima.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'daftarPenerima.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'daftarPenerima.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tipeNotifikasi.index': { paramsTuple?: []; params?: {} }
    'tipeNotifikasi.create': { paramsTuple?: []; params?: {} }
    'tipeNotifikasi.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tipeNotifikasi.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tipeNotifikasi.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tipeNotifikasi.search': { paramsTuple?: []; params?: {} }
    'templateNotifikasi.index': { paramsTuple?: []; params?: {} }
    'templateNotifikasi.create': { paramsTuple?: []; params?: {} }
    'templateNotifikasi.search': { paramsTuple?: []; params?: {} }
    'templateNotifikasi.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'templateNotifikasi.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'templateNotifikasi.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'supplier.index': { paramsTuple?: []; params?: {} }
    'supplier.create': { paramsTuple?: []; params?: {} }
    'supplier.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'supplier.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'supplier.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'supplier.search': { paramsTuple?: []; params?: {} }
    'supplier.trash': { paramsTuple?: []; params?: {} }
    'supplier.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'supplier.searchTrash': { paramsTuple?: []; params?: {} }
    'pengguna.get_current_user': { paramsTuple?: []; params?: {} }
    'auth.signOut': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'stokBahan.index': { paramsTuple?: []; params?: {} }
    'stokBahan.search': { paramsTuple?: []; params?: {} }
    'stokProduk.index': { paramsTuple?: []; params?: {} }
    'stokProduk.search': { paramsTuple?: []; params?: {} }
    'dashboard.gudang': { paramsTuple?: []; params?: {} }
    'restokBahan.restok': { paramsTuple?: []; params?: {} }
    'stokBahanBaku.adjustment': { paramsTuple?: []; params?: {} }
    'stokBahanBaku.status': { paramsTuple?: []; params?: {} }
    'stokBahanBaku.searchStatus': { paramsTuple?: []; params?: {} }
    'produk.stokKeluar': { paramsTuple?: []; params?: {} }
    'stokProduk.adjustment': { paramsTuple?: []; params?: {} }
    'stokProduk.status': { paramsTuple?: []; params?: {} }
    'stokProduk.searchStatus': { paramsTuple?: []; params?: {} }
    'dashboard.produksi': { paramsTuple?: []; params?: {} }
    'resep.index': { paramsTuple?: []; params?: {} }
    'resep.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'resep.search': { paramsTuple?: []; params?: {} }
    'resep.trash': { paramsTuple?: []; params?: {} }
    'resep.searchTrash': { paramsTuple?: []; params?: {} }
    'produksi.index': { paramsTuple?: []; params?: {} }
    'dashboard.pemilik': { paramsTuple?: []; params?: {} }
    'bahan.index': { paramsTuple?: []; params?: {} }
    'bahan.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bahan.search': { paramsTuple?: []; params?: {} }
    'bahan.trash': { paramsTuple?: []; params?: {} }
    'bahan.searchTrash': { paramsTuple?: []; params?: {} }
    'approval-stok-bahan-baku.index': { paramsTuple?: []; params?: {} }
    'approval-stok-bahan-baku.search': { paramsTuple?: []; params?: {} }
    'produk.index': { paramsTuple?: []; params?: {} }
    'produk.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.search': { paramsTuple?: []; params?: {} }
    'produk.trash': { paramsTuple?: []; params?: {} }
    'produk.searchTrash': { paramsTuple?: []; params?: {} }
    'approval-stok-produk.index': { paramsTuple?: []; params?: {} }
    'approval-stok-produk.search': { paramsTuple?: []; params?: {} }
    'hakAkses.index': { paramsTuple?: []; params?: {} }
    'hakAkses.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.search': { paramsTuple?: []; params?: {} }
    'hakAkses.trash': { paramsTuple?: []; params?: {} }
    'hakAkses.searchTrash': { paramsTuple?: []; params?: {} }
    'pengguna.index': { paramsTuple?: []; params?: {} }
    'pengguna.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.search': { paramsTuple?: []; params?: {} }
    'pengguna.trash': { paramsTuple?: []; params?: {} }
    'pengguna.searchTrash': { paramsTuple?: []; params?: {} }
    'kategoriProduk.index': { paramsTuple?: []; params?: {} }
    'kategoriProduk.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.search': { paramsTuple?: []; params?: {} }
    'kategoriProduk.trash': { paramsTuple?: []; params?: {} }
    'kategoriProduk.searchTrash': { paramsTuple?: []; params?: {} }
    'riwayatStokBahanBaku.index': { paramsTuple?: []; params?: {} }
    'riwayatStokBahanBaku.filter': { paramsTuple?: []; params?: {} }
    'riwayatStokBahanBaku.generate': { paramsTuple?: []; params?: {} }
    'riwayatStokProduk.index': { paramsTuple?: []; params?: {} }
    'riwayatStokProduk.filter': { paramsTuple?: []; params?: {} }
    'riwayatStokProduk.generate': { paramsTuple?: []; params?: {} }
    'riwayatProduksi.index': { paramsTuple?: []; params?: {} }
    'riwayatProduksi.filter': { paramsTuple?: []; params?: {} }
    'riwayatProduksi.generate': { paramsTuple?: []; params?: {} }
    'notifikasiWhatsapp.index': { paramsTuple?: []; params?: {} }
    'notifikasiWhatsapp.getQr': { paramsTuple?: []; params?: {} }
    'riwayatNotifikasi.index': { paramsTuple?: []; params?: {} }
    'riwayatNotifikasi.filter': { paramsTuple?: []; params?: {} }
    'daftarPenerima.index': { paramsTuple?: []; params?: {} }
    'daftarPenerima.search': { paramsTuple?: []; params?: {} }
    'daftarPenerima.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tipeNotifikasi.index': { paramsTuple?: []; params?: {} }
    'tipeNotifikasi.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tipeNotifikasi.search': { paramsTuple?: []; params?: {} }
    'templateNotifikasi.index': { paramsTuple?: []; params?: {} }
    'templateNotifikasi.search': { paramsTuple?: []; params?: {} }
    'templateNotifikasi.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'supplier.index': { paramsTuple?: []; params?: {} }
    'supplier.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'supplier.search': { paramsTuple?: []; params?: {} }
    'supplier.trash': { paramsTuple?: []; params?: {} }
    'supplier.searchTrash': { paramsTuple?: []; params?: {} }
    'pengguna.get_current_user': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'stokBahan.index': { paramsTuple?: []; params?: {} }
    'stokBahan.search': { paramsTuple?: []; params?: {} }
    'stokProduk.index': { paramsTuple?: []; params?: {} }
    'stokProduk.search': { paramsTuple?: []; params?: {} }
    'dashboard.gudang': { paramsTuple?: []; params?: {} }
    'restokBahan.restok': { paramsTuple?: []; params?: {} }
    'stokBahanBaku.adjustment': { paramsTuple?: []; params?: {} }
    'stokBahanBaku.status': { paramsTuple?: []; params?: {} }
    'stokBahanBaku.searchStatus': { paramsTuple?: []; params?: {} }
    'produk.stokKeluar': { paramsTuple?: []; params?: {} }
    'stokProduk.adjustment': { paramsTuple?: []; params?: {} }
    'stokProduk.status': { paramsTuple?: []; params?: {} }
    'stokProduk.searchStatus': { paramsTuple?: []; params?: {} }
    'dashboard.produksi': { paramsTuple?: []; params?: {} }
    'resep.index': { paramsTuple?: []; params?: {} }
    'resep.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'resep.search': { paramsTuple?: []; params?: {} }
    'resep.trash': { paramsTuple?: []; params?: {} }
    'resep.searchTrash': { paramsTuple?: []; params?: {} }
    'produksi.index': { paramsTuple?: []; params?: {} }
    'dashboard.pemilik': { paramsTuple?: []; params?: {} }
    'bahan.index': { paramsTuple?: []; params?: {} }
    'bahan.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bahan.search': { paramsTuple?: []; params?: {} }
    'bahan.trash': { paramsTuple?: []; params?: {} }
    'bahan.searchTrash': { paramsTuple?: []; params?: {} }
    'approval-stok-bahan-baku.index': { paramsTuple?: []; params?: {} }
    'approval-stok-bahan-baku.search': { paramsTuple?: []; params?: {} }
    'produk.index': { paramsTuple?: []; params?: {} }
    'produk.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.search': { paramsTuple?: []; params?: {} }
    'produk.trash': { paramsTuple?: []; params?: {} }
    'produk.searchTrash': { paramsTuple?: []; params?: {} }
    'approval-stok-produk.index': { paramsTuple?: []; params?: {} }
    'approval-stok-produk.search': { paramsTuple?: []; params?: {} }
    'hakAkses.index': { paramsTuple?: []; params?: {} }
    'hakAkses.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.search': { paramsTuple?: []; params?: {} }
    'hakAkses.trash': { paramsTuple?: []; params?: {} }
    'hakAkses.searchTrash': { paramsTuple?: []; params?: {} }
    'pengguna.index': { paramsTuple?: []; params?: {} }
    'pengguna.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.search': { paramsTuple?: []; params?: {} }
    'pengguna.trash': { paramsTuple?: []; params?: {} }
    'pengguna.searchTrash': { paramsTuple?: []; params?: {} }
    'kategoriProduk.index': { paramsTuple?: []; params?: {} }
    'kategoriProduk.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.search': { paramsTuple?: []; params?: {} }
    'kategoriProduk.trash': { paramsTuple?: []; params?: {} }
    'kategoriProduk.searchTrash': { paramsTuple?: []; params?: {} }
    'riwayatStokBahanBaku.index': { paramsTuple?: []; params?: {} }
    'riwayatStokBahanBaku.filter': { paramsTuple?: []; params?: {} }
    'riwayatStokBahanBaku.generate': { paramsTuple?: []; params?: {} }
    'riwayatStokProduk.index': { paramsTuple?: []; params?: {} }
    'riwayatStokProduk.filter': { paramsTuple?: []; params?: {} }
    'riwayatStokProduk.generate': { paramsTuple?: []; params?: {} }
    'riwayatProduksi.index': { paramsTuple?: []; params?: {} }
    'riwayatProduksi.filter': { paramsTuple?: []; params?: {} }
    'riwayatProduksi.generate': { paramsTuple?: []; params?: {} }
    'notifikasiWhatsapp.index': { paramsTuple?: []; params?: {} }
    'notifikasiWhatsapp.getQr': { paramsTuple?: []; params?: {} }
    'riwayatNotifikasi.index': { paramsTuple?: []; params?: {} }
    'riwayatNotifikasi.filter': { paramsTuple?: []; params?: {} }
    'daftarPenerima.index': { paramsTuple?: []; params?: {} }
    'daftarPenerima.search': { paramsTuple?: []; params?: {} }
    'daftarPenerima.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tipeNotifikasi.index': { paramsTuple?: []; params?: {} }
    'tipeNotifikasi.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tipeNotifikasi.search': { paramsTuple?: []; params?: {} }
    'templateNotifikasi.index': { paramsTuple?: []; params?: {} }
    'templateNotifikasi.search': { paramsTuple?: []; params?: {} }
    'templateNotifikasi.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'supplier.index': { paramsTuple?: []; params?: {} }
    'supplier.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'supplier.search': { paramsTuple?: []; params?: {} }
    'supplier.trash': { paramsTuple?: []; params?: {} }
    'supplier.searchTrash': { paramsTuple?: []; params?: {} }
    'pengguna.get_current_user': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.sign_in': { paramsTuple?: []; params?: {} }
    'webhook.get_stok_produk_from_supabase': { paramsTuple?: []; params?: {} }
    'webhook.get_stok_bahan_baku_from_supabase': { paramsTuple?: []; params?: {} }
    'webhook.get_produksi_from_supabase': { paramsTuple?: []; params?: {} }
    'restokBahan.create': { paramsTuple?: []; params?: {} }
    'stokBahanBaku.createAdjustment': { paramsTuple?: []; params?: {} }
    'produk.createStokKeluar': { paramsTuple?: []; params?: {} }
    'stokProduk.createAdjustment': { paramsTuple?: []; params?: {} }
    'resep.create': { paramsTuple?: []; params?: {} }
    'produksi.create': { paramsTuple?: []; params?: {} }
    'bahan.create': { paramsTuple?: []; params?: {} }
    'approval-stok-bahan-baku.approve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'approval-stok-bahan-baku.reject': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.create': { paramsTuple?: []; params?: {} }
    'approval-stok-produk.approve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'approval-stok-produk.reject': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.create': { paramsTuple?: []; params?: {} }
    'pengguna.create': { paramsTuple?: []; params?: {} }
    'kategoriProduk.create': { paramsTuple?: []; params?: {} }
    'notifikasiWhatsapp.createSession': { paramsTuple?: []; params?: {} }
    'daftarPenerima.create': { paramsTuple?: []; params?: {} }
    'tipeNotifikasi.create': { paramsTuple?: []; params?: {} }
    'templateNotifikasi.create': { paramsTuple?: []; params?: {} }
    'supplier.create': { paramsTuple?: []; params?: {} }
    'auth.signOut': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'resep.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bahan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'daftarPenerima.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tipeNotifikasi.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'templateNotifikasi.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'supplier.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'resep.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bahan.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'notifikasiWhatsapp.deleteSession': { paramsTuple?: []; params?: {} }
    'daftarPenerima.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tipeNotifikasi.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'templateNotifikasi.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'supplier.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'resep.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'bahan.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produk.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'hakAkses.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pengguna.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kategoriProduk.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'supplier.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}