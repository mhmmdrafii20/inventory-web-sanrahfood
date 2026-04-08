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
    'bahan': ExtractProps<(typeof import('../../inertia/pages/bahan.tsx'))['default']>
    'hakAkses': ExtractProps<(typeof import('../../inertia/pages/hakAkses.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'login': ExtractProps<(typeof import('../../inertia/pages/login.tsx'))['default']>
    'pengguna': ExtractProps<(typeof import('../../inertia/pages/pengguna.tsx'))['default']>
    'produk': ExtractProps<(typeof import('../../inertia/pages/produk.tsx'))['default']>
    'resep': ExtractProps<(typeof import('../../inertia/pages/resep.tsx'))['default']>
    'updateBahan': ExtractProps<(typeof import('../../inertia/pages/updateBahan.tsx'))['default']>
    'updateHakAkses': ExtractProps<(typeof import('../../inertia/pages/updateHakAkses.tsx'))['default']>
    'updatePengguna': ExtractProps<(typeof import('../../inertia/pages/updatePengguna.tsx'))['default']>
  }
}
