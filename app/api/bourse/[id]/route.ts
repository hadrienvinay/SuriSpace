import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id);
    if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    await prisma.bourseOrder.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/bourse/[id] error', err);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id);
    if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

    const body = await req.json();
    const { name, ticker, type, montant, prixAchat, prixActuel, quantity, investmentDate } = body;

    if (!name || !ticker || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updated = await prisma.bourseOrder.update({
      where: { id },
      data: {
        name,
        ticker,
        type,
        montant: Number(montant),
        prixAchat: Number(prixAchat),
        prixActuel: Number(prixActuel),
        quantity: Number(quantity),
        investmentDate: investmentDate ? new Date(investmentDate) : undefined,
      },
    });

    return NextResponse.json({ order: updated });
  } catch (err) {
    console.error('PUT /api/bourse/[id] error', err);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
