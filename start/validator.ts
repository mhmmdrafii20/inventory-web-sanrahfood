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
import { bahanMessages } from '#validators/messages/bahan_messages'
import { produkMessages } from '#validators/messages/produk_messages'
import { kategoriProdukMessages } from '#validators/messages/kategori_produk_messages'
import { resepBahanMessages } from '#validators/messages/resep_bahan_messages'
import { resepMessages } from '#validators/messages/resep_messages'
import { produksiMessages } from '#validators/messages/produksi_messages'
import { stokBahanMessages } from '#validators/messages/stok_bahan_messages'
import { hakAksesMessages } from '#validators/messages/hak_akses_messages'
import { penggunaMessages } from '#validators/messages/pengguna_messages'

declare module '@vinejs/vine/types' {
  interface VineGlobalTransforms {
    date: DateTime
  }
}

vine.messagesProvider = new SimpleMessagesProvider({
  ...bahanMessages,
  ...produkMessages,
  ...kategoriProdukMessages,
  ...resepBahanMessages,
  ...resepMessages,
  ...produksiMessages,
  ...stokBahanMessages,
  ...hakAksesMessages,
  ...penggunaMessages,

})

VineDate.transform((value) => DateTime.fromJSDate(value))
