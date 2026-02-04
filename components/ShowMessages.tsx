
import prisma from '@/lib/prisma'

export default async function ShowMessages() {
    const messages = await prisma.message.findMany()

    return (
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
    )

}