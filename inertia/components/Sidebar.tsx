import { Link } from "@inertiajs/react";
import Heading from "./ui/Heading";
import Logo from '../../resources/assets/logo_sanrahfood.png';
import { TbCubePlus, TbPackage, TbCategory, TbUsersGroup, TbHistory, TbMessage, TbNotification, TbNotes, TbBox, TbBoxModel, TbLock, TbUser, TbHome, TbBrandWhatsapp } from "react-icons/tb";


export default function Sidebar() {
    const menu = [
        {
            name: "Dashboard",
            link: "/bahan",
            icon: <TbHome size={20} className="text-white" />
        },
        {
            name: "Pengguna",
            link: "/pengguna",
            icon: <TbUser size={20} className="text-white" />
        },
        {
            name: "Hak Akses",
            link: "/role",
            icon: <TbLock size={20} className="text-white" />
        },
        {
            name: "Bahan Baku",
            link: "/bahan",
            icon: <TbBoxModel size={20} className="text-white" />
        },
        {
            name: "Stok Bahan Baku",
            link: "/stok-bahan",
            icon: <TbBox size={20} className="text-white" />
        },
        {
            name: "Restok Bahan Baku",
            link: "/restok-bahan",
            icon: <TbBox size={20} className="text-white" />
        },
        {
            name: "Riwayat Stok Bahan Baku",
            link: "/riwayat-stok-bahan-baku",
            icon: <TbHistory size={20} className="text-white" />
        },
        {
            name: "Resep",
            link: "/resep",
            icon: <TbNotes size={20} className="text-white" />
        },
        {
            name: "Produksi",
            link: "/produksi",
            icon: <TbCubePlus size={20} className="text-white" />
        },
        {
            name: "Riwayat Produksi",
            link: "/riwayat-produksi",
            icon: <TbHistory size={20} className="text-white" />
        },
        {
            name: "Produk",
            link: "/produk",
            icon: <TbPackage size={20} className="text-white" />
        },
        {
            name: "Stok Produk",
            link: "/stok-produk",
            icon: <TbPackage size={20} className="text-white" />
        },
        {
            name: "Riwayat Stok Produk",
            link: "/riwayat-stok-produk",
            icon: <TbHistory size={20} className="text-white" />
        },
        {
            name: "Kategori Produk",
            link: "/kategori-produk",
            icon: <TbCategory size={20} className="text-white" />
        },
        {
            name: "Integrasi Whatsapp",
            link: "/integrasi-whatsapp",
            icon: <TbBrandWhatsapp size={20} className="text-white" />
        },
        {
            name: "Daftar Penerima",
            link: "/resep",
            icon: <TbUsersGroup size={20} className="text-white" />
        },
        {
            name: "Atur Tipe Notifikasi",
            link: "/resep",
            icon: <TbNotification size={20} className="text-white" />
        },
        {
            name: "Atur Tipe Template Notifikasi",
            link: "/resep",
            icon: <TbMessage size={20} className="text-white" />
        },
        {
            name: "Riwayat Notifikasi",
            link: "/resep",
            icon: <TbHistory size={20} className="text-white" />
        },
    ]
    return (
        <>
            <nav className="w-80 bg-dark-teal">
                <img src={Logo} height="200px" alt="logo_sanrah" className="mt-5" />
                <ul className="flex flex-col px-5 gap-5">
                    {menu.map((items, i) => (
                        <li key={i} className="flex flex-row gap-2 items-center">
                            {items.icon}
                            <Link href={items.link}><Heading level={2} color="dark_grey">{items.name}</Heading></Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}