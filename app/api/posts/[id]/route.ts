// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ params est une Promise en prod
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

    await prisma.post.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Post supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du post' },
      { status: 500 }
    )
  }
}