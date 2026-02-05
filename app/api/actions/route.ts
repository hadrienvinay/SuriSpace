import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import YahooFinance from 'yahoo-finance2';

export async function GET() {
  try {
    const items = await prisma.action.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ items });
  } catch (err) {
    console.error('GET /api/actions error', err);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, ticker, price, purchasePrice, pe, notes } = body;
    if (!name || !ticker) return NextResponse.json({ error: 'Missing name or ticker' }, { status: 400 });
    let actionPe = pe
    let actionDividend = 0
    let actionPrice = price
    try {
        const yahooFinance = new YahooFinance();
          const quote = await yahooFinance.quoteSummary(ticker, {
          modules: ['price', 'summaryDetail', 'defaultKeyStatistics'],
          });
          const result = quote.price;
          const summary = quote.summaryDetail;
          const stats = quote.defaultKeyStatistics;
          console.log(`Fetched data for ${ticker}:`, result);
          actionPrice = result?.regularMarketPrice
          actionPe = summary?.trailingPE
          actionDividend = summary?.dividendYield || 0

        }catch (err) {
          console.error(`Erreur pour ${ticker}:`, err);
      }
    

    const created = await prisma.action.create({
      data: {
        name: String(name),
        ticker: String(ticker),
        price: Number(actionPrice || price),
        purchasePrice: Number(purchasePrice || actionPrice),
        pe: actionPe || pe,
        dividend: actionDividend || 0,
        notes: notes ? String(notes) : null,
      },
    });

    return NextResponse.json({ item: created }, { status: 201 });
  } catch (err) {
    console.error('POST /api/actions error', err);
    return NextResponse.json({ error: 'Failed to create action' }, { status: 500 });
  }
}
