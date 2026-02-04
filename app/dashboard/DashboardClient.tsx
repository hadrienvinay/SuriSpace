'use client'
// components/DashboardClient.tsx
import Link from "next/link";
import Image from 'next/image'
import { CreateLinkModal } from "@/components/CreateLinkModal";
import { useState } from "react";
import DeleteLinkButton  from "@/components/DeleteLinkButton";

export default function DashboardClient({ messages, articleCount, projectCount, messageCount, links }: { messages: any[], articleCount: any, projectCount: any, messageCount: any, links: any[] }) {
const [isModalOpen, setIsModalOpen] = useState(false)

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


                    
                    <div className="rounded-lg shadow-md">
                        
                        <div className="p-4 border-b font-bold text-purple-700 flex items-center">
                            <h2 className="flex-1 items-center ">Liens Connaissances</h2>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className=" flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Nouvelle ressource
                            </button>
                        </div>
                        
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
                                <td className="p-4 ">
                                    <div className="flex gap-1">
                                    <DeleteLinkButton linkId={link.id} /> 

                                    <Link href={`/link/${link.id}/edit`} className="flex bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-full shadow-lg">
                                    Edit 
                                    </Link>
                                    </div>
                                </td>
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

        {/* Modal */}
        <CreateLinkModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />

    </section>

  );
}
