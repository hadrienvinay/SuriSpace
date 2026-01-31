import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('titre') as string;
    const content = formData.get('contenu') as string;
    const image = formData.get('image') as File | null;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Titre et contenu requis' },
        { status: 400 }
      );
    }

    let imagePath = null;

    // Si une image est uploadée
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Générer un nom unique pour l'image
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const ext = path.extname(image.name);
      const filename = `image-${uniqueSuffix}${ext}`;
      
      // Sauvegarder dans /public/uploads
      const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(filepath, buffer);
      
      // Chemin relatif pour la DB
      imagePath = `/uploads/${filename}`;
    }

    // Créer l'article dans la DB
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
        image: imagePath,
      },
    });

    return NextResponse.json({ 
      message: 'Article créé avec succès',
      post 
    });

  } catch (error) {
    console.error('Erreur lors de la création:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'article' },
      { status: 500 }
    );
  }
}