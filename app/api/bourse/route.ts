import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import YahooFinance from 'yahoo-finance2';
import { normalizeTicker } from '@/lib/normalizeTicker';

export async function GET() {
  try {
    const orders = await prisma.bourseOrder.findMany({ orderBy: { investmentDate: 'desc' } });
    return NextResponse.json({ orders });
  } catch (err) {
    console.error('GET /api/bourse error', err);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, ticker, type, montant, investmentDate, prix } = body;

    if (!name || !ticker || !type || !montant) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const normalizedTicker = normalizeTicker(ticker);
    let prixAchat = prix ? Number(prix) : 0;

    if (!prixAchat) {
      try {
        const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
        const quote = await yahooFinance.quoteSummary(normalizedTicker, { modules: ['price'] });
        prixAchat = quote.price?.regularMarketPrice || 0;
      } catch (err) {
        console.error(`Erreur Yahoo Finance pour ${ticker}:`, err);
      }
    }

    if (!prixAchat) {
      return NextResponse.json({ error: `Prix introuvable pour "${ticker}" (normalisé : "${normalizedTicker}"). Renseignez le prix manuellement.` }, { status: 422 });
    }

    const quantity = Number(montant) / prixAchat;

    const order = await prisma.bourseOrder.create({
      data: {
        name: String(name),
        ticker: normalizedTicker, // stocker le ticker normalisé
        type: String(type),
        montant: Number(montant),
        prixAchat,
        prixActuel: prixAchat,
        quantity,
        investmentDate: investmentDate ? new Date(investmentDate) : new Date(),
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error('POST /api/bourse error', err);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
