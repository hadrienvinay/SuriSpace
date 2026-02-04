import prisma from "@/lib/prisma";
import DashboardClient from "@/app/dashboard/DashboardClient";

export default async function Dashboard() {

    const messages = await prisma.message.findMany()
    const links =    await prisma.link.findMany()
    const articleCount = prisma.post.count()
    const projectCount = prisma.project.count()
    const messageCount = prisma.message.count()

    return <DashboardClient messages={messages} articleCount={articleCount} projectCount={projectCount} messageCount={messageCount} links={links} />;
  
}