// app/edit/[id]/page.tsx
import ActionForm from '@/components/ActionsForm'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import Action from '@/lib/Action'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditActionPage({ params }: PageProps) {
  const { id } = await params
  const actionId = parseInt(id)

  if (isNaN(actionId)) {
    notFound()
  }

  const action = await prisma.action.findUnique({
    where: { id: actionId }
  })

  if (!action) {
    notFound()
  }
  console.log('Editing action:', action)

  return (
    <section className="max-w-screen-xl mx-auto p-16">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Modifier l'action {action.name}</h1>
        <ActionForm 
          mode="edit" 
          initialData={{
            id: action.id,
            name: action.name,
            ticker: action.ticker ?? '',
            price: (action.price ?? 0).toString(),
            purchasePrice: (action.purchasePrice ?? 0).toString(),
            quantity: (action.quantity ?? 1).toString(),
            pe: (action.pe ?? 0).toString()
          }}
        />
      </div>
    </section>
  )
}