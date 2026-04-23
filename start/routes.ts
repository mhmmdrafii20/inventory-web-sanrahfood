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
import IntegrasiWhatsappController from '#controllers/integrasi_whatsapp_controller';

router.get('/', [AuthController, 'login']).as('auth.login');
router.post('/login', [AuthController, 'signIn']);

router
    .group(() => {
        router.get('/bahan', [BahanController, 'index']).as('bahan.index');
        router.get('/bahan/edit/:id', [BahanController, 'edit']).as('updateBahan.edit')
        router.post('/bahan/create', [BahanController, `create`]).as('bahan.create');
        router.put('/bahan/update/:id', [BahanController, 'update']).as('updateBahan.update');
        router.delete('/bahan/delete/:id', [BahanController, 'destroy']).as("bahan.destroy");

        router.get('/produk', [ProdukController, 'index']).as('produk.index');
        router.post('/produk/create', [ProdukController, 'create']).as('produk.create');
        router.get('/produk/edit/:id', [ProdukController, 'edit']).as('updateProduk.edit');
        router.put('/produk/update/:id', [ProdukController, 'update']).as('updateProduk.update');
        router.delete('produk/delete/:id', [ProdukController, 'destroy']).as('produk.destroy');

        router.get('/role', [HakAksesController, 'index']).as('hakAkses.index');
        router.post('/role/create', [HakAksesController, 'create']).as('hakAkses.create');
        router.get('/role/edit/:id', [HakAksesController, 'edit']).as('updateHakAkses.edit');
        router.put('/role/update/:id', [HakAksesController, 'update']).as('updateHakAkses.update');
        router.delete('/role/delete/:id', [HakAksesController, 'destroy']).as('hakAkses.destroy');

        router.get('/pengguna', [PenggunaController, 'index']).as('pengguna.index');
        router.post('/pengguna/create', [PenggunaController, 'create']).as('pengguna.create');
        router.get('/pengguna/edit/:id', [PenggunaController, 'edit']).as('updatePengguna.edit');
        router.put('/pengguna/update/:id', [PenggunaController, 'update']).as('updatePengguna.update');
        router.delete('/pengguna/delete/:id', [PenggunaController, 'destroy']).as('pengguna.destroy');

        router.get('/resep', [ResepController, 'index']).as('resep.index');
        router.post('/resep/create', [ResepController, 'create']).as('resep.create');
        router.get('/resep/edit/:id', [ResepController, 'edit']).as('updateResep.edit');
        router.put('/resep/update/:id', [ResepController, 'update']).as('updateResep.update');
        router.delete('/resep/delete/:id', [ResepController, 'destroy']).as('resep.destroy');

        router.get('/kategori-produk', [KategoriController, 'index']).as('kategoriProduk.index');
        router.post('/kategori-produk/create', [KategoriController, 'create']).as('kategoriProduk.create');
        router.get('/kategori-produk/edit/:id', [KategoriController, 'edit']).as('updateKategoriProduk.edit');
        router.put('/kategori-produk/update/:id', [KategoriController, 'update']).as('updateKategoriProduk.update');
        router.delete('/kategori-produk/delete/:id', [KategoriController, 'destroy']).as('kategoriProduk.destroy');

        router.get('/produksi', [ProduksiController, 'index']).as('produksi.index');
        router.post('/produksi/create', [ProduksiController, 'create']).as('produksi.create');

        router.get('/stok-bahan', [StokBahanController, 'index']).as('stokBahan.index');
        router.get('/restok-bahan', [StokBahanController, 'restok']).as('restokBahan.restok');
        router.post('/restok-bahan/create', [StokBahanController, 'create']).as('restokBahan.create');

        router.get('/riwayat-stok-bahan-baku', [RiwayatStokBahanBakuController, 'index']).as('riwayatStokBahanBaku.index');
        router.get('/riwayat-stok-bahan-baku/filter', [RiwayatStokBahanBakuController, 'filter']).as('riwayatStokBahanBaku.filter');

        router.get('/stok-produk', [StokProdukController, 'index']).as('stokProduk.index');

        router.get('/riwayat-stok-produk', [RiwayatStokProdukController, 'index']).as('riwayatStokProduk.index');
        router.get('/riwayat-stok-produk/filter', [RiwayatStokProdukController, 'filter']).as('riwayatStokProduk.filter');

        router.get('/riwayat-produksi', [RiwayatProduksiController, 'index']).as('riwayatProduksi.index');
        router.get('/riwayat-produksi/filter', [RiwayatProduksiController, 'filter']).as('riwayatProduksi.filter');

        router.get('/integrasi-whatsapp', [IntegrasiWhatsappController, 'index']).as('integrasiWhatsapp.index');
        router.post('/integrasi-whatsapp/connect', [IntegrasiWhatsappController, 'connect']).as('integrasiWhatsapp.connect');
        router.get('/integrasi-whatsapp/get-qr', [IntegrasiWhatsappController, 'getQr']).as('integrasiWhatsapp.getQr');
        // router.put('/integrasi-whatsapp/connected', [IntegrasiWhatsappController, 'connected']).as('integrasiWhatsapp.connected');
    })
    .use(middleware.ensureUserAcces())
