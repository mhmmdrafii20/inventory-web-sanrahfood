/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import BahanController from '#controllers/bahan_controller'
import AuthController from '#controllers/auth_controller';
import HakAksesController from '#controllers/hak_akses_controller';
import PenggunaController from '#controllers/pengguna_controller';
import ProdukController from '#controllers/produk_controller';
import ResepController from '#controllers/resep_controller';
import { middleware } from './kernel.ts';
import KategoriController from '#controllers/kategori_produk_controller';
import ProduksiController from '#controllers/produksi_controller';
import StokBahanController from '#controllers/stok_bahan_controller';
import StokProdukController from '#controllers/stok_produk_controller';
import RiwayatProduksiController from '#controllers/riwayat_produksi_controller';
import RiwayatStokBahanBakuController from '#controllers/riwayat_stok_bahan_baku';
import RiwayatStokProdukController from '#controllers/riwayat_stok_produk_controller';
import NotifikasiWhatsappController from '#controllers/notifikasi_whatsapp_controller';
import DaftarPenerimaController from '#controllers/daftar_penerima_controller';
import TipeNotifikasiController from '#controllers/tipe_notifikasi_controller';

router.get('/', [AuthController, 'login']).as('auth.login');
router.post('/login', [AuthController, 'signIn']);

router
    .group(() => {
        router.get('/bahan', [BahanController, 'index']).as('bahan.index');
        router.get('/bahan/edit/:id', [BahanController, 'edit']).as('updateBahan.edit')
        router.post('/bahan/create', [BahanController, `create`]).as('bahan.create');
        router.put('/bahan/update/:id', [BahanController, 'update']).as('updateBahan.update');
        router.delete('/bahan/delete/:id', [BahanController, 'destroy']).as("bahan.destroy");
        router.get('/bahan/search', [BahanController, 'search']).as('bahan.search');

        router.get('/produk', [ProdukController, 'index']).as('produk.index');
        router.post('/produk/create', [ProdukController, 'create']).as('produk.create');
        router.get('/produk/edit/:id', [ProdukController, 'edit']).as('updateProduk.edit');
        router.put('/produk/update/:id', [ProdukController, 'update']).as('updateProduk.update');
        router.delete('produk/delete/:id', [ProdukController, 'destroy']).as('produk.destroy');
        router.get('/produk/search', [ProdukController, 'search']).as('produk.search');

        router.get('/role', [HakAksesController, 'index']).as('hakAkses.index');
        router.post('/role/create', [HakAksesController, 'create']).as('hakAkses.create');
        router.get('/role/edit/:id', [HakAksesController, 'edit']).as('updateHakAkses.edit');
        router.put('/role/update/:id', [HakAksesController, 'update']).as('updateHakAkses.update');
        router.delete('/role/delete/:id', [HakAksesController, 'destroy']).as('hakAkses.destroy');
        router.get('/role/search', [HakAksesController, 'search']).as('hakAkses.search');

        router.get('/pengguna', [PenggunaController, 'index']).as('pengguna.index');
        router.post('/pengguna/create', [PenggunaController, 'create']).as('pengguna.create');
        router.get('/pengguna/edit/:id', [PenggunaController, 'edit']).as('updatePengguna.edit');
        router.put('/pengguna/update/:id', [PenggunaController, 'update']).as('updatePengguna.update');
        router.delete('/pengguna/delete/:id', [PenggunaController, 'destroy']).as('pengguna.destroy');
        router.get('/pengguna/search', [PenggunaController, 'search']).as('pengguna.search');

        router.get('/resep', [ResepController, 'index']).as('resep.index');
        router.post('/resep/create', [ResepController, 'create']).as('resep.create');
        router.get('/resep/edit/:id', [ResepController, 'edit']).as('updateResep.edit');
        router.put('/resep/update/:id', [ResepController, 'update']).as('updateResep.update');
        router.delete('/resep/delete/:id', [ResepController, 'destroy']).as('resep.destroy');
        router.get('/resep/search', [ResepController, 'search']).as('resep.search');

        router.get('/kategori-produk', [KategoriController, 'index']).as('kategoriProduk.index');
        router.post('/kategori-produk/create', [KategoriController, 'create']).as('kategoriProduk.create');
        router.get('/kategori-produk/edit/:id', [KategoriController, 'edit']).as('updateKategoriProduk.edit');
        router.put('/kategori-produk/update/:id', [KategoriController, 'update']).as('updateKategoriProduk.update');
        router.delete('/kategori-produk/delete/:id', [KategoriController, 'destroy']).as('kategoriProduk.destroy');
        router.get('/kategori-produk/search', [KategoriController, 'search']).as('kategoriProduk.search');

        router.get('/produksi', [ProduksiController, 'index']).as('produksi.index');
        router.post('/produksi/create', [ProduksiController, 'create']).as('produksi.create');

        router.get('/stok-bahan', [StokBahanController, 'index']).as('stokBahan.index');
        router.get('/stok-bahan/search', [StokBahanController, 'search']).as('stokBahan.search');
        router.get('/restok-bahan', [StokBahanController, 'restok']).as('restokBahan.restok');
        router.post('/restok-bahan/create', [StokBahanController, 'create']).as('restokBahan.create');

        router.get('/riwayat-stok-bahan-baku', [RiwayatStokBahanBakuController, 'index']).as('riwayatStokBahanBaku.index');
        router.get('/riwayat-stok-bahan-baku/filter', [RiwayatStokBahanBakuController, 'filter']).as('riwayatStokBahanBaku.filter');
        router.get('/riwayat-stok-bahan-baku/generate-pdf', [RiwayatStokBahanBakuController, 'generate']).as('riwayatStokBahanBaku.generate');

        router.get('/stok-produk', [StokProdukController, 'index']).as('stokProduk.index');
        router.get('/stok-produk/search', [StokProdukController, 'search']).as('stokProduk.search');

        router.get('/riwayat-stok-produk', [RiwayatStokProdukController, 'index']).as('riwayatStokProduk.index');
        router.get('/riwayat-stok-produk/filter', [RiwayatStokProdukController, 'filter']).as('riwayatStokProduk.filter');
        router.get('/riwayat-stok-produk/generate-pdf', [RiwayatStokProdukController, 'generate']).as('riwayatStokProduk.generate');

        router.get('/riwayat-produksi', [RiwayatProduksiController, 'index']).as('riwayatProduksi.index');
        router.get('/riwayat-produksi/filter', [RiwayatProduksiController, 'filter']).as('riwayatProduksi.filter');
        router.get('/riwayat-produksi/generate-pdf', [RiwayatProduksiController, 'generate']).as('riwayatProduksi.generate');

        router.get('/notifikasi-whatsapp', [NotifikasiWhatsappController, 'index']).as('notifikasiWhatsapp.index');
        router.post('/notifikasi-whatsapp/createSession', [NotifikasiWhatsappController, 'createSession']).as('notifikasiWhatsapp.createSession');
        router.get('/notifikasi-whatsapp/get-qr', [NotifikasiWhatsappController, 'getQr']).as('notifikasiWhatsapp.getQr');
        router.delete('/notifikasi-whatsapp/deleteSession', [NotifikasiWhatsappController, 'deleteSession']).as('notifikasiWhatsapp.deleteSession');

        router.get('/daftar-penerima', [DaftarPenerimaController, 'index']).as('daftarPenerima.index');
        router.post('/daftar-penerima/create', [DaftarPenerimaController, 'create']).as('daftarPenerima.create');
        router.get('/daftar-penerima/search', [DaftarPenerimaController, 'search']).as('daftarPenerima.search');

        router.get('/tipe-notifikasi', [TipeNotifikasiController, 'index']).as('tipeNotifikasi.index');
        router.post('/tipe-notifikasi/create', [TipeNotifikasiController, 'create']).as('tipeNotifikasi.create');
        router.get('/tipe-notifikasi/edit/:id', [TipeNotifikasiController, 'edit']).as('updateTipeNotifikasi.edit');
        router.put('/tipe-notifikasi/update/:id', [TipeNotifikasiController, 'update']).as('updateTipeNotifikasi.update');
        router.delete('/tipe-notifikasi/delete/:id', [TipeNotifikasiController, 'destroy']).as('tipeNotifikasi.destroy');
        router.get('/tipe-notifikasi/search', [TipeNotifikasiController, 'search']).as('tipeNotifikasi.search');
    })
    .use(middleware.ensureUserAcces())
