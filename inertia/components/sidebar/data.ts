import {
  TbCubePlus,
  TbPackage,
  TbCategory,
  TbUsersGroup,
  TbHistory,
  TbMessage,
  TbNotification,
  TbNotes,
  TbBox,
  TbBoxModel,
  TbLock,
  TbUser,
  TbHome,
  TbBrandWhatsapp,
  TbLogout,
} from 'react-icons/tb'
import type { MenuSection } from './types'

export const data: MenuSection[] = [
  {
    label: 'Pengguna',
    items: [
      {
        name: 'Pengguna',
        link: '/pengguna',
        icon: TbUser,
        role: ['Pemilik'],
      },
      {
        name: 'Hak Akses',
        link: '/role',
        icon: TbLock,
        role: ['Pemilik'],
      },
    ],
  },
  {
    label: 'Supplier',
    items: [
      {
        name: 'Supplier',
        link: '/supplier',
        icon: TbUser,
        role: ['Pemilik'],
      },
    ],
  },
  {
    label: 'Bahan Baku',
    items: [
      {
        name: 'Bahan Baku',
        link: '/bahan',
        icon: TbBoxModel,
        role: ['Pemilik'],
      },
      {
        name: 'Stok Bahan Baku',
        link: '/stok-bahan',
        icon: TbBox,
        role: ['Pemilik', 'Karyawan Gudang', 'Karyawan Produksi'],
      },
      {
        name: 'Restok Bahan Baku',
        link: '/restok-bahan',
        icon: TbBox,
        role: ['Karyawan Gudang'],
      },
    ],
  },
  {
    label: 'Produksi',
    items: [
      {
        name: 'Resep',
        link: '/resep',
        icon: TbNotes,
        role: ['Karyawan Produksi'],
      },
      {
        name: 'Produksi',
        link: '/produksi',
        icon: TbCubePlus,
        role: ['Karyawan Produksi'],
      },
    ],
  },
  {
    label: 'Produk',
    items: [
      {
        name: 'Produk',
        link: '/produk',
        icon: TbPackage,
        role: ['Pemilik'],
      },
      {
        name: 'Kategori Produk',
        link: '/kategori-produk',
        icon: TbCategory,
        role: ['Pemilik'],
      },
      {
        name: 'Stok Produk',
        link: '/stok-produk',
        icon: TbPackage,
        role: ['Karyawan Gudang', 'Karyawan Produksi', 'Pemilik'],
      },
      {
        name: 'Stok Keluar',
        link: '/produk/stok-keluar',
        icon: TbBox,
        role: ['Karyawan Gudang'],
      },
    ],
  },
  {
    label: 'Stok Approval',
    items: [
      {
        name: 'Approval Stok Produk',
        link: '/approval-stok-produk',
        icon: TbNotes,
        role: ['Pemilik'],
      },
      {
        name: 'Approval Stok Bahan Baku',
        link: '/approval-stok-bahan-baku',
        icon: TbCubePlus,
        role: ['Pemilik'],
      },
    ],
  },
  {
    label: 'Stok Adjustment',
    items: [
      {
        name: 'Adjust Stok Produk',
        link: '/stok-produk/adjustment',
        icon: TbNotes,
        role: ['Karyawan Gudang'],
      },
      {
        name: 'Adjust Stok Bahan Baku',
        link: '/stok-bahan-baku/adjustment',
        icon: TbCubePlus,
        role: ['Karyawan Gudang'],
      },
    ],
  },
  {
    label: 'Status Adjustment ',
    items: [
      {
        name: 'Status Adjustment Stok Produk',
        link: '/stok-produk/status',
        icon: TbBox,
        role: ['Karyawan Gudang'],
      },
      {
        name: 'Status Adjustment Bahan Baku',
        link: '/stok-bahan-baku/status',
        icon: TbCubePlus,
        role: ['Karyawan Gudang'],
      },
    ],
  },
  {
    label: 'Whatsapp',
    items: [
      {
        name: 'Notifikasi Whatsapp',
        link: '/notifikasi-whatsapp',
        icon: TbBrandWhatsapp,
        role: ['Pemilik'],
      },
    ],
  },
  {
    label: 'Riwayat',
    items: [
      {
        name: 'Riwayat Stok Bahan Baku',
        link: '/riwayat-stok-bahan-baku',
        icon: TbHistory,
        role: ['Pemilik'],
      },
      {
        name: 'Riwayat Stok Produk',
        link: '/riwayat-stok-produk',
        icon: TbHistory,
        role: ['Pemilik'],
      },
      {
        name: 'Riwayat Produksi',
        link: '/riwayat-produksi',
        icon: TbHistory,
        role: ['Pemilik'],
      },
      {
        name: 'Riwayat Notifikasi',
        link: '/riwayat-notifikasi',
        icon: TbHistory,
        role: ['Pemilik'],
      },
    ],
  },
  {
    label: 'Lainnya',
    items: [
      {
        name: 'Logout',
        icon: TbLogout,
        role: ['Pemilik', 'Karyawan Gudang', 'Karyawan Produksi'],
        type: 'action',
        action: 'logout',
      },
    ],
  },
]
