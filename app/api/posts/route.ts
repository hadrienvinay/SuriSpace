import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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

    const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    let imagePath = null;

    // Si une image est uploadée
    if (image && image.size > 0) {
      const ext = path.extname(image.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return NextResponse.json({ error: 'Extension de fichier non autorisée' }, { status: 400 });
      }
      if (image.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Fichier trop volumineux (max 5 Mo)' }, { status: 400 });
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
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