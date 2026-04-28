/*
|--------------------------------------------------------------------------
| Validator file
|--------------------------------------------------------------------------
|
| The validator file is used for configuring global transforms for VineJS.
| The transform below converts all VineJS date outputs from JavaScript
| Date objects to Luxon DateTime instances, so that validated dates are
| ready to use with Lucid models and other parts of the app that expect
| Luxon DateTime.
|
*/

import { DateTime } from 'luxon'
import vine, { VineDate, SimpleMessagesProvider } from '@vinejs/vine'


declare module '@vinejs/vine/types' {
  interface VineGlobalTransforms {
    date: DateTime
  }
}

const messages = {
  'database.unique': ' {{field}} sudah digunakan ',
  required: '{{field}} wajib diisi',
  minLength: '{{field}} minimal {{min}} karakter',
  maxLength: '{{field}} maksimal {{max}} karakter',
  email: '{{field}} tidak valid',
  min: '{{field}} minimal {{min}} ',
  max: '{{field}} maksimal {{max}}',
  mobile: '{{field}} harus valid'
}
const field = {
  nama_kategori: 'Nama Kategori',
  nama_produk: 'Nama Produk',
  nama_bahan_baku: 'Nama Bahan Baku',
  satuan: 'Satuan',
  nama_hak_akses: 'Nama Hak Akses',
  nama_resep: 'Nama Resep',
  nama_pengguna: 'Nama Pengguna',
  nomor_telepon: 'Nomor Telepon',
  nama_notifikasi: "Nama Notifikasi",
  email: 'Email',
  password: 'Password',
  id_hak_akses: 'Hak Akses',
  id_produk: 'Produk',
  id_resep: 'Resep',
  id_kategori: 'Kategori',
  id_pengguna: 'Pengguna',
  id_bahan_baku: "Bahan Baku",
  id_tipe_notifikasi: "Tipe Notifikasi",
  jenis_stok: 'Jenis Stok',
  selisih_stok: 'Selisih Stok',
  stok_sebelum: 'Stok Sebelum',
  stok_sesudah: 'Stok Sesudah',
  tanggal_perubahan_stok: 'Tanggal Perubahan Stok',
  tanggal_produksi: 'Tanggal Produksi',
  tanggal_restok: 'Tanggal Restok',
  jumlah_batch: 'Jumlah Batch',
  yield_per_batch: 'Yield Per Batch',
  jumlah_stok: 'Jumlah Stok',
  jumlah: 'Jumlah',
  catatan_tambahan: 'Catatan Tambahan',
}
vine.messagesProvider = new SimpleMessagesProvider(messages, field);

VineDate.transform((value) => DateTime.fromJSDate(value))
