import Image from 'next/image';
import prisma from '@/lib/prisma'
import Link from "next/link";
import DeleteLinkButton  from "@/components/DeleteLinkButton";

export default async function MyLinks() {

    const links = await prisma.link.findMany()

    return(
    <div>
        <div className="rounded-lg shadow-md">
            <div className="p-4 border-b font-bold text-purple-700">Liens Connaissances</div>
            <table className="hidden md:table w-full text-left">
                <thead className="">
                <tr>
                    <th className="p-4">Titre</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Lien</th>
                    <th className="p-4">Tags</th>
                </tr>
                </thead>
                <tbody>
                {links.map((link) => (
                <tr className="border-t" key={link.id}>
                    <td className="p-4">{link.title}</td>
                    <td className="p-4">{link.description}</td>
                    <td className="p-4 "><Link href={`${link.link}`}className="hover:text-blue-600 transition">{link.link}</Link></td>
                    <td className="p-4 text-green-600 font-bold">{link.tag}</td>
                    
                </tr>
                ))
                }
                </tbody>
            </table>
        </div>

        {/* Version mobile */}
        <div className="md:hidden space-y-4 mt-6 p-2">
            {links.map((link) => (
            <div key={link.id} className={`rounded-lg p-2 shadow ${link.id%2 === 0 ? 'bg-black ' : 'bg-gray-700'}`}>
                <p><span className="font-semibold">Source :</span> {link.title}</p>
                <p><span className="font-semibold">Description:</span> {link.description}</p>
                <p><span className="font-semibold">Lien:</span> {link.link}</p>
                
            </div>
            ))}
        </div>

    </div>
    
     )
}