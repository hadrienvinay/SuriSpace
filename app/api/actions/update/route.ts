import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import YahooFinance from 'yahoo-finance2';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const actionsList = await prisma.action.findMany();

  for(const action of actionsList) {
    if (action.where !== 'PEA' && action.where !== 'BINANCE') continue;

    let actionPrice = action.price;
    let actionPe = action.pe;
    let actionDividend = action.dividendYield;

    try {
      const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

      if (action.where === 'BINANCE') {
        // Pour les cryptos Binance, le ticker Yahoo Finance est de la forme "BTC-USD"
        const cryptoTicker = action.ticker?.includes('-') ? action.ticker : `${action.ticker}-USD`;
        const quote = await yahooFinance.quoteSummary(cryptoTicker, {
          modules: ['price'],
        });
        actionPrice = quote.price?.regularMarketPrice || action.price;
        // Pas de PE ni dividende pour les cryptos
        actionPe = null;
        actionDividend = null;
      } else if (action.where === 'PEA'){
        // PEA : logique existante
        const quote = await yahooFinance.quoteSummary(action.ticker, {
          modules: ['price', 'summaryDetail', 'defaultKeyStatistics'],
        });
        const result = quote.price;
        const summary = quote.summaryDetail;
        actionPrice = result?.regularMarketPrice || action.price;
        actionPe = summary?.trailingPE || action.pe;
        actionDividend = summary?.dividendYield || 0;
      }
    } catch (err) {
      console.error(`Erreur pour ${action.ticker}:`, err);
    }

    await prisma.action.update({
      where: { id: action.id },
      data: {
        price: Number(actionPrice || action.price),
        purchasePrice: Number(action.purchasePrice || actionPrice),
        pe: action.where === 'BINANCE' ? null : Number(actionPe || action.pe),
        dividendYield: action.where === 'BINANCE' ? null : Number(actionDividend || 0),
      },
    });
  }
    const items = await prisma.action.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ items })

    } catch (err) {
      console.error('UPDATE /api/actions error', err);
      return NextResponse.json({ error: 'Failed to update actions' }, { status: 500 });
    }
  }