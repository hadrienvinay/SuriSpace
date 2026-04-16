import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const id = Number((await params).id);
    if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    await prisma.action.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/actions/[id] error', err);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const id = Number((await params).id);
    if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

    const body = await req.json();
    const { name, ticker, price, purchasePrice, quantity, pe, dividendYield, where } = body;

    if (!name || !ticker) return NextResponse.json({ error: 'Missing name or ticker' }, { status: 400 });

    const updated = await prisma.action.update({
      where: { id },
      data: {
        name,
        ticker,
        price: Number(price || 0),
        purchasePrice: Number(purchasePrice || 0),
        quantity: Number(quantity || 1),
        pe: pe != null ? Number(pe) : null,
        dividendYield: dividendYield != null ? Number(dividendYield) : null,
        where: where || null,
      },
    });
    return NextResponse.json({ item: updated });
  } catch (err) {
    console.error('Error updating action:', err);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
