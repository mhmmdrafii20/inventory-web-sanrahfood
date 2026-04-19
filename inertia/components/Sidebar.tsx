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
    const menu = [
        {
            name:"Dashboard",
            link:"/bahan",
            icon:<FaHome size={20} className="text-white"/>
        },
        {
            name:"Pengguna",
            link:"/pengguna",
            icon:<FaUser size={20} className="text-white"/>
        },
        {
            name:"Hak Akses",
            link:"/role",
            icon:<FaLock size={20} className="text-white"/>
        },
        {
            name:"Bahan Baku",
            link:"/bahan",
            icon:<FaBox  size={20} className="text-white"/>
        },
        {
            name:"Stok Bahan Baku",
            link:"/bahan",
            icon:<FaBoxes  size={20} className="text-white"/>
        },
        {
            name:"Resep",
            link:"/resep",
            icon:<GrNotes  size={20} className="text-white"/>
        },
        {
            name:"Produksi",
            link:"/produksi",   
            icon:<TbCubePlus  size={20 } className="text-white"/>
        },
        {
            name:"Riwayat Produksi",
            link:"/resep",
            icon:<FaHistory  size={20} className="text-white"/>
        },
        {
            name:"Produk",
            link:"/produk",
            icon:<TbPackage  size={20} className="text-white"/>
        },
        {
            name:"Kategori Produk",
            link:"/kategori-produk",
            icon:<TbCategory  size={20} className="text-white"/>
        },
        {
            name:"Daftar Penerima",
            link:"/resep",
            icon:<TbUsersGroup  size={20} className="text-white"/>
        },
        {
            name:"Atur Tipe Notifikasi",
            link:"/resep",
            icon:<MdOutlineEditNotifications  size={20} className="text-white"/>
        },
        {
            name:"Atur Tipe Template Notifikasi",
            link:"/resep",
            icon:<MdMessage  size={20 } className="text-white"/>
        },
        {
            name:"Riwayat Notifikasi",
            link:"/resep",
            icon:<FaHistory  size={20} className="text-white"/>
        },
    ]
    return (
        <>
        <nav className="w-62.5 bg-dark-teal">
                <img src={Logo} height="200px" alt="logo_sanrah" className="mt-5"/>
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