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
