import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest,  { params }: { params: Promise<{ id: string }> }) {
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

export async function PUT(req: NextRequest,  { params }: { params: Promise<{ id: string }> }) {

  try {
    const id = Number((await params).id);
    if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const ticker = formData.get('ticker') as string;
    const price = Number(formData.get('price') || 0);
    const purchasePrice = Number(formData.get('purchasePrice') || 0);
    const quantity = Number(formData.get('quantity') || 1);
    const pe = formData.get('pe') ? Number(formData.get('pe')) : undefined;

    if (!name || !ticker) return NextResponse.json({ error: 'Missing name or ticker' }, { status: 400 });
    const updated = await prisma.action.update({
      where: { id },
      data: {
        name,
        ticker,
        price,
        purchasePrice,
        quantity,
        pe,
      }
    });
    return NextResponse.json({ item: updated });
  } catch (err) {
    console.error('Error updating action:', err);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}