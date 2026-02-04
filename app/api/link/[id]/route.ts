// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await params
    const { id: idString } = await params
    const id = parseInt(idString)

    // Vérifier que l'ID est un nombre valide
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      )
    }

    await prisma.link.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Lien supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du lien' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await params
    const formData = await request.formData();
    console.log(formData)
    const title = formData.get('titre') as string;
    const description = formData.get('description') as string;
    const tag = formData.get('tag') as string;
    const link = formData.get('link') as string;
    const { id: idString } = await params
    const id = parseInt(idString)
    // Vérifier que l'ID est un nombre valide
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      )
    }

 const updateLink = await prisma.link.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      tag,
      link,
    },
  });

  return NextResponse.json(updateLink);  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du lien' },
      { status: 500 }
    )
  }
}