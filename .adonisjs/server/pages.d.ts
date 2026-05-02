import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/hakAkses': ExtractProps<(typeof import('../../inertia/pages/auth/hakAkses.tsx'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/pengguna': ExtractProps<(typeof import('../../inertia/pages/auth/pengguna.tsx'))['default']>
    'auth/restore/hakAkses': ExtractProps<(typeof import('../../inertia/pages/auth/restore/hakAkses.tsx'))['default']>
    'auth/restore/pengguna': ExtractProps<(typeof import('../../inertia/pages/auth/restore/pengguna.tsx'))['default']>
    'auth/update/hakAkses': ExtractProps<(typeof import('../../inertia/pages/auth/update/hakAkses.tsx'))['default']>
    'auth/update/pengguna': ExtractProps<(typeof import('../../inertia/pages/auth/update/pengguna.tsx'))['default']>
    'bahan/index': ExtractProps<(typeof import('../../inertia/pages/bahan/index.tsx'))['default']>
    'bahan/restok': ExtractProps<(typeof import('../../inertia/pages/bahan/restok.tsx'))['default']>
    'bahan/restore/index': ExtractProps<(typeof import('../../inertia/pages/bahan/restore/index.tsx'))['default']>
    'bahan/riwayat': ExtractProps<(typeof import('../../inertia/pages/bahan/riwayat.tsx'))['default']>
    'bahan/stok': ExtractProps<(typeof import('../../inertia/pages/bahan/stok.tsx'))['default']>
    'bahan/update': ExtractProps<(typeof import('../../inertia/pages/bahan/update.tsx'))['default']>
    'dashboard/home': ExtractProps<(typeof import('../../inertia/pages/dashboard/home.tsx'))['default']>
    'notifikasi/daftarPenerima': ExtractProps<(typeof import('../../inertia/pages/notifikasi/daftarPenerima.tsx'))['default']>
    'notifikasi/data': ExtractProps<(typeof import('../../inertia/pages/notifikasi/data.ts'))['default']>
    'notifikasi/notifikasiWhatsapp': ExtractProps<(typeof import('../../inertia/pages/notifikasi/notifikasiWhatsapp.tsx'))['default']>
    'notifikasi/riwayat': ExtractProps<(typeof import('../../inertia/pages/notifikasi/riwayat.tsx'))['default']>
    'notifikasi/templateNotifikasi': ExtractProps<(typeof import('../../inertia/pages/notifikasi/templateNotifikasi.tsx'))['default']>
    'notifikasi/tipeNotifikasi': ExtractProps<(typeof import('../../inertia/pages/notifikasi/tipeNotifikasi.tsx'))['default']>
    'notifikasi/update/daftarPenerima': ExtractProps<(typeof import('../../inertia/pages/notifikasi/update/daftarPenerima.tsx'))['default']>
    'notifikasi/update/templateNotifikasi': ExtractProps<(typeof import('../../inertia/pages/notifikasi/update/templateNotifikasi.tsx'))['default']>
    'notifikasi/update/tipeNotifikasi': ExtractProps<(typeof import('../../inertia/pages/notifikasi/update/tipeNotifikasi.tsx'))['default']>
    'produk/index': ExtractProps<(typeof import('../../inertia/pages/produk/index.tsx'))['default']>
    'produk/kategori': ExtractProps<(typeof import('../../inertia/pages/produk/kategori.tsx'))['default']>
    'produk/restore/kategori': ExtractProps<(typeof import('../../inertia/pages/produk/restore/kategori.tsx'))['default']>
    'produk/restore/produk': ExtractProps<(typeof import('../../inertia/pages/produk/restore/produk.tsx'))['default']>
    'produk/riwayat': ExtractProps<(typeof import('../../inertia/pages/produk/riwayat.tsx'))['default']>
    'produk/stok': ExtractProps<(typeof import('../../inertia/pages/produk/stok.tsx'))['default']>
    'produk/update/kategori': ExtractProps<(typeof import('../../inertia/pages/produk/update/kategori.tsx'))['default']>
    'produk/update/produk': ExtractProps<(typeof import('../../inertia/pages/produk/update/produk.tsx'))['default']>
    'produksi/index': ExtractProps<(typeof import('../../inertia/pages/produksi/index.tsx'))['default']>
    'produksi/riwayat': ExtractProps<(typeof import('../../inertia/pages/produksi/riwayat.tsx'))['default']>
    'resep/index': ExtractProps<(typeof import('../../inertia/pages/resep/index.tsx'))['default']>
    'resep/restore/resep': ExtractProps<(typeof import('../../inertia/pages/resep/restore/resep.tsx'))['default']>
    'resep/update/resep': ExtractProps<(typeof import('../../inertia/pages/resep/update/resep.tsx'))['default']>
  }
}
