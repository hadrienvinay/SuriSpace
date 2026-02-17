// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { writeFile } from 'fs/promises';
import path from 'path';

export async function DELETE(request: Request,{ params }: { params: Promise<{ id: string }> }) 
{
  console.log(request)
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
    
    let imagePath,imagePath2 = null;

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
        // Si une image est uploadée
    if (image2 && image2.size > 0) {
      const bytes = await image2.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Générer un nom unique pour l'image
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const ext = path.extname(image2.name);
      const filename2 = `image-${uniqueSuffix}${ext}`;
      
      // Sauvegarder dans /public/uploads
      const filepath = path.join(process.cwd(), 'public', 'uploads', filename2);
      await writeFile(filepath, buffer);
      
      // Chemin relatif pour la DB
      imagePath2 = `/uploads/${filename2}`;
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
        link,
        authorId: 1,
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