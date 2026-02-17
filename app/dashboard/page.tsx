import prisma from "@/lib/prisma";
import DashboardClient from "@/app/dashboard/DashboardClient";

export default async function Dashboard() {

    const messages = await prisma.message.findMany()
    const links =    await prisma.link.findMany()
    const articleCount = await prisma.post.count() 
    const projectCount = await prisma.project.count()
    const messageCount = await prisma.message.count()
    //add 3 articles and 1 project to the count because created manually

    return <DashboardClient messages={messages} articleCount={articleCount+3} projectCount={projectCount+1} messageCount={messageCount} links={links} />;
  
}