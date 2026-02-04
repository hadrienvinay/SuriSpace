// app/edit/[id]/page.tsx
import LinkForm from '@/components/LinkForm'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditLinkPage({ params }: PageProps) {
  const { id } = await params
  const linkId = parseInt(id)

  if (isNaN(linkId)) {
    notFound()
  }

  const link = await prisma.link.findUnique({
    where: { id: linkId }
  })

  if (!link) {
    notFound()
  }

  return (
    <section className="max-w-screen-xl mx-auto p-16">
      <div className="p-8">
        <LinkForm 
          mode="edit" 
          initialData={{
            id: link.id,
            titre: link.title ,
            description: link.description ?? '',
            tag: link.tag ?? '',
            link: link.link?? ''
          }}
        />
      </div>
    </section>
  )
}