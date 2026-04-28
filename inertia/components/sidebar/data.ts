import { TbCubePlus, TbPackage, TbCategory, TbUsersGroup, TbHistory, TbMessage, TbNotification, TbNotes, TbBox, TbBoxModel, TbLock, TbUser, TbHome, TbBrandWhatsapp } from "react-icons/tb";
import type { MenuSection } from './types';

export const data: MenuSection[] = [
    {
        label: "Pengguna",
        items: [
            {
                name: "Pengguna",
                link: "/pengguna",
                icon: TbUser
            },
            {
                name: "Hak Akses",
                link: "/role",
                icon: TbLock
            },
        ],
    },
    {
        label: "Bahan Baku",
        items: [
            {
                name: "Bahan Baku",
                link: "/bahan",
                icon: TbBoxModel
            },
            {
                name: "Stok Bahan Baku",
                link: "/stok-bahan",
                icon: TbBox
            },
            {
                name: "Restok Bahan Baku",
                link: "/restok-bahan",
                icon: TbBox
            },
        ],
    },
    {
        label: "Produksi",
        items: [
            {
                name: "Resep",
                link: "/resep",
                icon: TbNotes
            },
            {
                name: "Produksi",
                link: "/produksi",
                icon: TbCubePlus
            },
        ],
    },
    {
        label: "Produk",
        items: [
            {
                name: "Produk",
                link: "/produk",
                icon: TbPackage
            },
            {
                name: "Kategori Produk",
                link: "/kategori-produk",
                icon: TbCategory
            },
            {
                name: "Stok Produk",
                link: "/stok-produk",
                icon: TbPackage
            },
        ],
    },
    {
        label: "Whatsapp",
        items: [
            {
                name: "Notifikasi Whatsapp",
                link: "/notifikasi-whatsapp",
                icon: TbBrandWhatsapp
            },
        ],
    },
    {
        label: "Riwayat",
        items: [
            {
                name: "Riwayat Stok Bahan Baku",
                link: "/riwayat-stok-bahan-baku",
                icon: TbHistory
            },
            {
                name: "Riwayat Stok Produk",
                link: "/riwayat-stok-produk",
                icon: TbHistory
            },
            {
                name: "Riwayat Produksi",
                link: "/riwayat-produksi",
                icon: TbHistory
            },
            {
                name: "Riwayat Notifikasi",
                link: "/riwayat-notifikasi",
                icon: TbHistory
            },
        ],
    },
];
