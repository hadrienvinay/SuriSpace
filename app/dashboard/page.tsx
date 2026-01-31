import Link from "next/link";
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { link } from "node:fs";

export default async function Dashboard() {
    const links = await prisma.link.findMany()
    const messages = await prisma.message.findMany()
    const articleCount = prisma.post.count()
    const projectCount = prisma.project.count()
    const messageCount = prisma.message.count()

  return (

    <section className="space-y-16">

        <div className="flex text-center mt-10">
            <div className="flex-1 flex flex-col">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-sm text-gray-500">Total Articles</p>
                        <h2 className="text-3xl font-bold text-purple-700 mt-2">{articleCount}</h2>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-sm text-gray-500">Total Projets</p>
                        <h2 className="text-3xl font-bold text-green-600 mt-2">{projectCount}</h2>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-sm text-gray-500">Message</p>
                        <h2 className="text-3xl font-bold text-blue-600 mt-2">{messageCount}</h2>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-sm text-gray-500">Pending Tickets</p>
                        <h2 className="text-3xl font-bold text-red-500 mt-2">12</h2>
                    </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md">
                    <div className="p-4 border-b font-bold text-purple-700">Liens Connaissances</div>
                    <table className="w-full text-left text-black">
                        <thead className="bg-purple-50">
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

                    <div className="bg-white rounded-lg shadow-md">
                    <div className="p-4 border-b font-bold text-purple-700">Liste message</div>
                    <table className="w-full text-left text-black">
                        <thead className="bg-purple-50">
                        <tr>
                            <th className="p-4">Nom</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Message</th>
                        </tr>
                        </thead>
                        <tbody>
                        {messages.map((message) => (
                        <tr className="border-t" key={message.id}>
                            <td className="p-4">{message.name}</td>
                            <td className="p-4 text-blue-600">{message.email}</td>
                            <td className="p-4">{message.message}</td>
                        </tr>
                        ))
                        }
                        </tbody>
                    </table>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="bg-purple-600 text-white py-3 rounded-lg shadow hover:bg-purple-700">Add User</button>
                    <button className="bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700">Export Data</button>
                    <button className="bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700">Generate Report</button>
                    <button className="bg-red-600 text-white py-3 rounded-lg shadow hover:bg-red-700">Delete Records</button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-purple-700">Hadrien Vinay</h3>
                        <p className="text-gray-500">Administrator</p>
                        <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700">Edit</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

  );
}
