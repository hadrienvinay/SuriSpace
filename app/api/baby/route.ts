import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

type Bet = {
  id: string;
  date: string;
  sexe: string;
  poids: string;
  taille: string;
  yeux: string;
  cheveux: string;
  nom: string;
  autres: string;
  parieurName: string;
};

export async function POST(request: NextRequest) {
  try {

    const formData = await request.formData();
    console.log(formData)
    const date = formData.get('date') as string;
    const sexe = formData.get('sexe') as string;
    const poids = formData.get('poids') as string;
    const taille = formData.get('taille') as string;
    const yeux = formData.get('yeux') as string;
    const prenom = formData.get('prenom') as string;
    const cheveux = formData.get('cheveux') as string;
    const autres = formData.get('autres') as string;
    const parieurName = formData.get('parieurName') as string;
 
    if (!date || !sexe) {
      return NextResponse.json(
        { error: 'Date et sexe requis' },
        { status: 400 }
      );
    }

    // Créer le message dans la DB
    const pari = await prisma.pari.create({
      data: {
        date,
        sexe,
        poids,
        taille,
        yeux,
        prenom,
        cheveux,
        autres,
        parieurName,
      },
    });

    return NextResponse.json({ 
      message: 'Pari crée avec succès',
      pari 
    });

  } catch (error) {
    console.error('Erreur lors de la création du pari:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du pari' },
      { status: 500 }
    );
  }
}