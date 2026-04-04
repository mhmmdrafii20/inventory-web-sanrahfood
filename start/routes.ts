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

router.get('/', [AuthController, 'login']);
router.post('/login', [AuthController, 'signIn']);

router.get('/bahan', [BahanController, 'index']).as('bahan.index');
router.get('/bahan/edit/:id', [BahanController, 'edit']).as('updateBahan.edit')
router.post('/bahan/create', [BahanController, `create`]).as('bahan.create');
router.put('/bahan/update/:id', [BahanController, 'update']).as('updateBahan.update');
router.delete('/bahan/delete/:id', [BahanController, 'destroy']).as("bahan.destroy");

router.get('/produk', [ProdukController, 'index' ]).as('produk.index');
router.post('/produk/create', [ProdukController, 'create']).as('produk.create');


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