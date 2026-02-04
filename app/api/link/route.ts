import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    console.log(formData)
    const title = formData.get('titre') as string;
    const description = formData.get('description') as string;
    const tag = formData.get('tag') as string;
    const link = formData.get('link') as string;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Titre et description requis' },
        { status: 400 }
      );
    }

    // Créer l'article dans la DB
    const post = await prisma.link.create({
      data: {
        title,
        description,
        tag,
        link
      },
    });

    return NextResponse.json({ 
      message: 'Lien créé avec succès',
      post 
    });

  } catch (error) {
    console.error('Erreur lors de la création:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du nouveau lien' },
      { status: 500 }
    );
  }
}