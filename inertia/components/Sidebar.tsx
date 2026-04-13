import { Link } from "@inertiajs/react";
import Heading from "./ui/Heading";
import Logo from '../../resources/assets/logo_sanrahfood.png';
import { FaHome, FaUser, FaLock, FaBox, FaBoxes, FaHistory  } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { TbCubePlus, TbPackage, TbCategory, TbUsersGroup } from "react-icons/tb";
import { RiBox3Line } from "react-icons/ri";
import { PiStackMinusFill } from "react-icons/pi";
import { MdOutlineEditNotifications } from "react-icons/md";
import { MdMessage } from "react-icons/md";


export default function Sidebar () {
    return (
        <>
        <nav className="w-62.5 bg-dark-teal">
                <img src={Logo} height="200px" alt="logo_sanrah" className="mt-5"/>
                <ul className="flex flex-col px-5 gap-5">
                    <li className="flex flex-row gap-2 items-center">
                        <FaHome size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Dashboard</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <FaUser size={20} className="text-white"/>
                        <Link href="/pengguna"><Heading level={2} color="dark_grey">Pengguna</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <FaLock size={20} className="text-white"/>
                        <Link href="/role"><Heading level={2} color="dark_grey">Hak Akses</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <FaBox size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Bahan Baku</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <FaBoxes size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Stok Bahan Baku</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <GrNotes size={20} className="text-white"/>
                        <Link href="/resep"><Heading level={2} color="dark_grey">Resep</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <TbCubePlus size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Produksi</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <FaHistory size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Riwayat Produksi</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <TbPackage size={20} className="text-white"/>
                        <Link href="/produk"><Heading level={2} color="dark_grey">Produk</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <TbCategory size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Kategori Produk</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <RiBox3Line size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Stok Produk</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <PiStackMinusFill size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Stok Produk Keluar</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <FaHistory size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Riwayat Stok</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <TbUsersGroup size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Daftar Penerima</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <MdOutlineEditNotifications size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Atur Tipe Notifikasi</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <MdMessage size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Template Notifikasi</Heading></Link>
                    </li>
                    <li className="flex flex-row gap-2 items-center">
                        <FaHistory size={20} className="text-white"/>
                        <Link href="/bahan"><Heading level={2} color="dark_grey">Log Notifikasi</Heading></Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}