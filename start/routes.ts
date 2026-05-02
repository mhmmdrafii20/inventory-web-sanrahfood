/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import BahanController from '#controllers/bahan/bahan_controller'
import AuthController from '#controllers/auth/auth_controller'
import HakAksesController from '#controllers/auth/hak_akses_controller'
import PenggunaController from '#controllers/auth/pengguna_controller'
import ProdukController from '#controllers/produk/produk_controller'
import ResepController from '#controllers/resep/resep_controller'
import { middleware } from './kernel.ts'
import KategoriController from '#controllers/produk/kategori_produk_controller'
import ProduksiController from '#controllers/produksi/produksi_controller'
import StokBahanController from '#controllers/bahan/stok_bahan_controller'
import StokProdukController from '#controllers/produk/stok_produk_controller'
import RiwayatProduksiController from '#controllers/produksi/riwayat_produksi_controller'
import RiwayatStokBahanBakuController from '#controllers/bahan/riwayat_stok_bahan_baku'
import RiwayatStokProdukController from '#controllers/produk/riwayat_stok_produk_controller'
import NotifikasiWhatsappController from '#controllers/notifikasi/notifikasi_whatsapp_controller'
import DaftarPenerimaController from '#controllers/notifikasi/daftar_penerima_controller'
import TipeNotifikasiController from '#controllers/notifikasi/tipe_notifikasi_controller'
import TemplateNotifikasiController from '#controllers/notifikasi/template_notifikasi_controller'
import WebhookController from '#controllers/webhooks/supabase/webhook_controller'
import RiwayatNotifikasiController from '#controllers/notifikasi/riwayat_notifikasi_controller'

router.get('/', [AuthController, 'login']).as('auth.login')
router.post('/login', [AuthController, 'signIn'])

router.post('/webhook/stok-produk', [WebhookController, 'cekStokProduk']).as('webhook.stokProduk')
router.post('/webhook/bahan', [WebhookController, 'cekStokBahanBaku']).as('webhook.stokBahanBaku')
router
  .post('/webhook/produksi', [WebhookController, 'getProduksiFromSupabase'])
  .as('webhook.produksi')
router
  .post('/webhook/restok-bahan-baku', [WebhookController, 'getRestokBahanBakuFromSupabase'])
  .as('webhook.restokBahanBaku')

router
  .group(() => {
    router
      .group(() => {
        router.get('/stok-bahan', [StokBahanController, 'index']).as('stokBahan.index')
        router.get('/stok-bahan/search', [StokBahanController, 'search']).as('stokBahan.search')

        router.get('/stok-produk', [StokProdukController, 'index']).as('stokProduk.index')
        router.get('/stok-produk/search', [StokProdukController, 'search']).as('stokProduk.search')
      })
      .use(middleware.ensureRoleAccess(['Karyawan Gudang', 'Karyawan Produksi', 'Pemilik']))
    router
      .group(() => {
        router.get('/restok-bahan', [StokBahanController, 'restok']).as('restokBahan.restok')
        router
          .post('/restok-bahan/create', [StokBahanController, 'create'])
          .as('restokBahan.create')
      })
      .use(middleware.ensureRoleAccess(['Karyawan Gudang']))
    router
      .group(() => {
        router.get('/resep', [ResepController, 'index']).as('resep.index')
        router.post('/resep/create', [ResepController, 'create']).as('resep.create')
        router.get('/resep/edit/:id', [ResepController, 'edit']).as('resep.edit')
        router.put('/resep/update/:id', [ResepController, 'update']).as('resep.update')
        router.delete('/resep/delete/:id', [ResepController, 'destroy']).as('resep.destroy')
        router.get('/resep/search', [ResepController, 'search']).as('resep.search')
        router.get('/resep/trash', [ResepController, 'trash']).as('resep.trash')
        router.patch('/resep/restore/:id', [ResepController, 'restore']).as('resep.restore')
        router.get('/resep/trash/search', [ResepController, 'searchTrash']).as('resep.searchTrash')

        router.get('/produksi', [ProduksiController, 'index']).as('produksi.index')
        router.post('/produksi/create', [ProduksiController, 'create']).as('produksi.create')
      })
      .use(middleware.ensureRoleAccess(['Karyawan Produksi']))

    router
      .group(() => {
        router.get('/bahan', [BahanController, 'index']).as('bahan.index')
        router.get('/bahan/edit/:id', [BahanController, 'edit']).as('bahan.edit')
        router.post('/bahan/create', [BahanController, `create`]).as('bahan.create')
        router.put('/bahan/update/:id', [BahanController, 'update']).as('bahan.update')
        router.delete('/bahan/delete/:id', [BahanController, 'destroy']).as('bahan.destroy')
        router.get('/bahan/search', [BahanController, 'search']).as('bahan.search')
        router.get('/bahan/trash', [BahanController, 'trash']).as('bahan.trash')
        router.patch('/bahan/restore/:id', [BahanController, 'restore']).as('bahan.restore')
        router.get('/bahan/trash/search', [BahanController, 'searchTrash']).as('bahan.searchTrash')

        router.get('/produk', [ProdukController, 'index']).as('produk.index')
        router.post('/produk/create', [ProdukController, 'create']).as('produk.create')
        router.get('/produk/edit/:id', [ProdukController, 'edit']).as('produk.edit')
        router.put('/produk/update/:id', [ProdukController, 'update']).as('produk.update')
        router.delete('produk/delete/:id', [ProdukController, 'destroy']).as('produk.destroy')
        router.get('/produk/search', [ProdukController, 'search']).as('produk.search')
        router.get('/produk/trash', [ProdukController, 'trash']).as('produk.trash')
        router.patch('/produk/restore/:id', [ProdukController, 'restore']).as('produk.restore')
        router
          .get('/produk/trash/search', [ProdukController, 'searchTrash'])
          .as('produk.searchTrash')

        router.get('/role', [HakAksesController, 'index']).as('hakAkses.index')
        router.post('/role/create', [HakAksesController, 'create']).as('hakAkses.create')
        router.get('/role/edit/:id', [HakAksesController, 'edit']).as('hakAkses.edit')
        router.put('/role/update/:id', [HakAksesController, 'update']).as('hakAkses.update')
        router.delete('/role/delete/:id', [HakAksesController, 'destroy']).as('hakAkses.destroy')
        router.get('/role/search', [HakAksesController, 'search']).as('hakAkses.search')
        router.get('/role/trash', [HakAksesController, 'trash']).as('hakAkses.trash')
        router.patch('/role/restore/:id', [HakAksesController, 'restore']).as('hakAkses.restore')
        router
          .get('/role/trash/search', [HakAksesController, 'searchTrash'])
          .as('hakAkses.searchTrash')

        router.get('/pengguna', [PenggunaController, 'index']).as('pengguna.index')
        router.post('/pengguna/create', [PenggunaController, 'create']).as('pengguna.create')
        router.get('/pengguna/edit/:id', [PenggunaController, 'edit']).as('pengguna.edit')
        router.put('/pengguna/update/:id', [PenggunaController, 'update']).as('pengguna.update')
        router
          .delete('/pengguna/delete/:id', [PenggunaController, 'destroy'])
          .as('pengguna.destroy')
        router.get('/pengguna/search', [PenggunaController, 'search']).as('pengguna.search')
        router.get('/pengguna/trash', [PenggunaController, 'trash']).as('pengguna.trash')
        router
          .patch('/pengguna/restore/:id', [PenggunaController, 'restore'])
          .as('pengguna.restore')
        router
          .get('/pengguna/trash/search', [PenggunaController, 'searchTrash'])
          .as('pengguna.searchTrash')

        router.get('/kategori-produk', [KategoriController, 'index']).as('kategoriProduk.index')
        router
          .post('/kategori-produk/create', [KategoriController, 'create'])
          .as('kategoriProduk.create')
        router
          .get('/kategori-produk/edit/:id', [KategoriController, 'edit'])
          .as('kategoriProduk.edit')
        router
          .put('/kategori-produk/update/:id', [KategoriController, 'update'])
          .as('kategoriProduk.update')
        router
          .delete('/kategori-produk/delete/:id', [KategoriController, 'destroy'])
          .as('kategoriProduk.destroy')
        router
          .get('/kategori-produk/search', [KategoriController, 'search'])
          .as('kategoriProduk.search')
        router
          .get('/kategori-produk/trash', [KategoriController, 'trash'])
          .as('kategoriProduk.trash')
        router
          .patch('/kategori-produk/restore/:id', [KategoriController, 'restore'])
          .as('kategoriProduk.restore')
        router
          .get('/kategori-produk/trash/search', [KategoriController, 'searchTrash'])
          .as('kategoriProduk.searchTrash')

        router
          .get('/riwayat-stok-bahan-baku', [RiwayatStokBahanBakuController, 'index'])
          .as('riwayatStokBahanBaku.index')
        router
          .get('/riwayat-stok-bahan-baku/filter', [RiwayatStokBahanBakuController, 'filter'])
          .as('riwayatStokBahanBaku.filter')
        router
          .get('/riwayat-stok-bahan-baku/generate-pdf', [
            RiwayatStokBahanBakuController,
            'generate',
          ])
          .as('riwayatStokBahanBaku.generate')

        router
          .get('/riwayat-stok-produk', [RiwayatStokProdukController, 'index'])
          .as('riwayatStokProduk.index')
        router
          .get('/riwayat-stok-produk/filter', [RiwayatStokProdukController, 'filter'])
          .as('riwayatStokProduk.filter')
        router
          .get('/riwayat-stok-produk/generate-pdf', [RiwayatStokProdukController, 'generate'])
          .as('riwayatStokProduk.generate')

        router
          .get('/riwayat-produksi', [RiwayatProduksiController, 'index'])
          .as('riwayatProduksi.index')
        router
          .get('/riwayat-produksi/filter', [RiwayatProduksiController, 'filter'])
          .as('riwayatProduksi.filter')
        router
          .get('/riwayat-produksi/generate-pdf', [RiwayatProduksiController, 'generate'])
          .as('riwayatProduksi.generate')

        router
          .get('/notifikasi-whatsapp', [NotifikasiWhatsappController, 'index'])
          .as('notifikasiWhatsapp.index')
        router
          .post('/notifikasi-whatsapp/createSession', [
            NotifikasiWhatsappController,
            'createSession',
          ])
          .as('notifikasiWhatsapp.createSession')
        router
          .get('/notifikasi-whatsapp/get-qr', [NotifikasiWhatsappController, 'getQr'])
          .as('notifikasiWhatsapp.getQr')
        router
          .delete('/notifikasi-whatsapp/deleteSession', [
            NotifikasiWhatsappController,
            'deleteSession',
          ])
          .as('notifikasiWhatsapp.deleteSession')

        router
          .get('/riwayat-notifikasi', [RiwayatNotifikasiController, 'index'])
          .as('riwayatNotifikasi.index')
        router
          .get('/riwayat-notifikasi/filter', [RiwayatNotifikasiController, 'filter'])
          .as('riwayatNotifikasi.filter')

        router
          .get('/daftar-penerima', [DaftarPenerimaController, 'index'])
          .as('daftarPenerima.index')
        router
          .post('/daftar-penerima/create', [DaftarPenerimaController, 'create'])
          .as('daftarPenerima.create')
        router
          .get('/daftar-penerima/search', [DaftarPenerimaController, 'search'])
          .as('daftarPenerima.search')
        router
          .get('/daftar-penerima/edit/:id', [DaftarPenerimaController, 'edit'])
          .as('daftarPenerima.edit')
        router
          .put('/daftar-penerima/update/:id', [DaftarPenerimaController, 'update'])
          .as('daftarPenerima.update')
        router
          .delete('/daftar-penerima/delete/:id', [DaftarPenerimaController, 'destroy'])
          .as('daftarPenerima.destroy')

        router
          .get('/tipe-notifikasi', [TipeNotifikasiController, 'index'])
          .as('tipeNotifikasi.index')
        router
          .post('/tipe-notifikasi/create', [TipeNotifikasiController, 'create'])
          .as('tipeNotifikasi.create')
        router
          .get('/tipe-notifikasi/edit/:id', [TipeNotifikasiController, 'edit'])
          .as('tipeNotifikasi.edit')
        router
          .put('/tipe-notifikasi/update/:id', [TipeNotifikasiController, 'update'])
          .as('tipeNotifikasi.update')
        router
          .delete('/tipe-notifikasi/delete/:id', [TipeNotifikasiController, 'destroy'])
          .as('tipeNotifikasi.destroy')
        router
          .get('/tipe-notifikasi/search', [TipeNotifikasiController, 'search'])
          .as('tipeNotifikasi.search')

        router
          .get('/template-notifikasi', [TemplateNotifikasiController, 'index'])
          .as('templateNotifikasi.index')
        router
          .post('/template-notifikasi/create', [TemplateNotifikasiController, 'create'])
          .as('templateNotifikasi.create')
        router
          .get('/template-notifikasi/search', [TemplateNotifikasiController, 'search'])
          .as('templateNotifikasi.search')
        router
          .get('/template-notifikasi/edit/:id', [TemplateNotifikasiController, 'edit'])
          .as('templateNotifikasi.edit')
        router
          .put('/template-notifikasi/update/:id', [TemplateNotifikasiController, 'update'])
          .as('templateNotifikasi.update')
        router
          .delete('/template-notifikasi/delete/:id', [TemplateNotifikasiController, 'destroy'])
          .as('templateNotifikasi.destroy')
      })
      .use(middleware.ensureRoleAccess(['Pemilik']))

    router.get('/current-user', [PenggunaController, 'getCurrentUser'])
    router.post('/signout', [AuthController, 'signOut']).as('auth.signOut')
  })
  .use(middleware.ensureUserAccess())
