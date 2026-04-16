import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import YahooFinance from 'yahoo-finance2';
import { normalizeTicker } from '@/lib/normalizeTicker';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const orders = await prisma.bourseOrder.findMany();
    if (orders.length === 0) return NextResponse.json({ updated: 0 });

    const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

    const results = await Promise.allSettled(
      orders.map(async (order) => {
        try {
          const ticker = normalizeTicker(order.ticker);
          const quote = await yahooFinance.quoteSummary(ticker, { modules: ['price'] });
          const currentPrice = quote.price?.regularMarketPrice;
          if (!currentPrice) return;

          await prisma.bourseOrder.update({
            where: { id: order.id },
            data: { prixActuel: currentPrice },
          });
        } catch (err) {
          console.error(`Erreur mise à jour ${order.ticker}:`, err);
        }
      })
    );

    const updated = results.filter(r => r.status === 'fulfilled').length;
    return NextResponse.json({ updated, total: orders.length });
  } catch (err) {
    console.error('GET /api/bourse/update error', err);
    return NextResponse.json({ error: 'Failed to update prices' }, { status: 500 });
  }
}
