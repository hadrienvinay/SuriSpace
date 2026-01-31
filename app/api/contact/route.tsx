import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function POST(request: NextRequest) {
  try {

    const formData = await request.formData();
    console.log(formData)
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Titre et email requis' },
        { status: 400 }
      );
    }

    // Créer le message dans la DB
    const post = await prisma.message.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({ 
      message: 'Message envoyé avec succès',
      post 
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}