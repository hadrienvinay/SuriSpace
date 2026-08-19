import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const books = await prisma.book.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(books);
  } catch (err) {
    console.error('GET /api/books error', err);
    return NextResponse.json({ error: 'Erreur lors de la récupération des livres' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { title, author, date, dateRead, rating, notes } = body;

    if (!title || !author || !date || !dateRead) {
      return NextResponse.json({ error: 'Titre, auteur, date et date de lecture sont requis' }, { status: 400 });
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        date,
        dateRead,
        rating: rating ? Number(rating) : null,
        notes: notes || null,
      },
    });

    return NextResponse.json({ message: 'Livre ajouté avec succès', book });
  } catch (err) {
    console.error('POST /api/books error', err);
    return NextResponse.json({ error: 'Erreur lors de la création du livre' }, { status: 500 });
  }
}
