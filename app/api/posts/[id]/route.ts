// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ajustez le chemin selon votre config

export async function DELETE(request: Request,{ params }: { params: { id: string } })
 {
  try {
    const param  = await params
    const id = parseInt(param.id)

    // Vérifier que l'ID est un nombre valide
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }

    await prisma.post.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Post supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du post' },
      { status: 500 }
    );
  }
}

