import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id);
    await prisma.book.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/books/[id] error', err);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id);
    const body = await req.json();
    const { title, author, date, dateRead, rating, notes } = body;

    const book = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        date,
        dateRead,
        rating: rating ? Number(rating) : null,
        notes: notes || null,
      },
    });

    return NextResponse.json({ message: 'Livre mis à jour', book });
  } catch (err) {
    console.error('PUT /api/books/[id] error', err);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}
