import Heading from "~/components/ui/Heading";
import ActionButton from "~/components/ui/Button/ActionButton";
import { FaSearch } from "react-icons/fa";
import { Link } from "@adonisjs/inertia/react";
import { FaPen } from "react-icons/fa";
import Paragraph from "~/components/ui/Paragraph";
import { FaTrash } from "react-icons/fa";

export default function Resep () {
    return (
        <>
            <div className="flex flex-row justify-between mt-5">
                <Heading level={1} color="dark_slate_grey" className="font-bold">Manajemen Resep</Heading>
                <div className="flex flex-row gap-5 ">
                    <input placeholder="Cari Resep"></input>
                    <ActionButton type="search" size="lg">
                        <FaSearch/>
                    </ActionButton>
                </div>
            </div>
                        <table className="w-full border-collapse mt-5 bg-white">
                <thead>
                    <tr>
                        <th className="border border-gray-300 py-3">Bahan Baku</th>
                        <th className="border border-gray-300 py-3">Satuan</th>
                        <th className="border border-gray-300 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {bahan.map(items => ( */}
                        <tr key="">
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">s</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5"><Paragraph size="lg">s</Paragraph></td>
                            <td className="border border-gray-300 py-3 px-5">
                                <div className="flex flex-row gap-2 justify-center">
                                    <Link route='updateBahan.edit' routeParams={}> 
                                        <ActionButton type="update" size="sm">
                                            <FaPen/>
                                        </ActionButton>
                                    </Link>
                                    <ActionButton type="delete" size="sm"><FaTrash/></ActionButton>
                                </div>
                            </td>
                        </tr>
                    {/* ))} */}
                </tbody>
            </table> 
        </>
    )
}