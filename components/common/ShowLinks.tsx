import prisma from '@/lib/prisma'
import ShowLinksClient from '@/components/common/ShowLinksClient'

export default async function MyLinks() {
  const links = await prisma.link.findMany();
  return <ShowLinksClient links={links} />;
}
