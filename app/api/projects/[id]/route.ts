// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { writeFile } from 'fs/promises';
import path from 'path';
import { auth } from '@/lib/auth';

export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }> })
{
  console.log(request)
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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

    await prisma.project.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Projet supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du projet' },
      { status: 500 }
    )
  }
}

export async function PUT(request:Request , { params }: { params: Promise<{ id: string }>}) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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

    const formData = await request.formData(); 
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const content2 = formData.get('content2') as string;
    const resume = formData.get('resume') as string;
    const image = formData.get('image') as File| null;
    const image2 = formData.get('image2') as File| null;
    const imageTitle = formData.get('imageTitle') as string| null;
    const image2Title = formData.get('imageTitle2') as string| null;
    const link = formData.get('link') as string| null;
    const createdAtRaw = formData.get('createdAt') as string | null;
    const tags = formData.getAll('tags') as string[];
    
    const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    let imagePath: string | null = null;
    let imagePath2: string | null = null;

    for (const img of [image, image2]) {
      if (img && img.size > 0) {
        const ext = path.extname(img.name).toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
          return NextResponse.json({ error: 'Extension de fichier non autorisée' }, { status: 400 });
        }
        if (img.size > MAX_FILE_SIZE) {
          return NextResponse.json({ error: 'Fichier trop volumineux (max 5 Mo)' }, { status: 400 });
        }

        const bytes = await img.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const filename = `image-${uniqueSuffix}${ext}`;
        const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
        await writeFile(filepath, buffer);

        if (img === image) imagePath = `/uploads/${filename}`;
        else imagePath2 = `/uploads/${filename}`;
      }
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        resume,
        content,
        content2,
        ...(imagePath && { image: imagePath }),
        imageTitle,
        ...(imagePath2 && { image2: imagePath2 }),
        image2Title,
        tags,
        link,
        authorId: 1,
        ...(createdAtRaw && { createdAt: new Date(createdAtRaw) }),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du projet' },
      { status: 500 }
    );
  }
}