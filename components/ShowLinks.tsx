import Image from 'next/image';
import prisma from '@/lib/prisma'
import Link from "next/link";

export default async function MyLinks() {

    const links = await prisma.link.findMany()

    return(

    <div className="rounded-lg shadow-md">
        <div className="p-4 border-b font-bold text-purple-700">Liens Connaissances</div>
        <table className="w-full text-left">
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
    
     )
}