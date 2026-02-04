
import prisma from '@/lib/prisma'

export default async function ShowStats() {
    const articleCount = prisma.post.count()
    const projectCount = prisma.project.count()
    const messageCount = prisma.message.count()
    return (
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
    )

}