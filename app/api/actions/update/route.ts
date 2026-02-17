import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import YahooFinance from 'yahoo-finance2';

export async function GET(req: Request) {
  try {
    const actionsList = await prisma.action.findMany();

  for(const action of actionsList) {
    if (action.where !== 'PEA') continue; // Ne mettre à jour que les actions du PEA
    let actionPrice = action.price
    let actionPe = action.pe
    let actionDividend = action.dividendYield
      try {
          const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
            const quote = await yahooFinance.quoteSummary(action.ticker, {
            modules: ['price', 'summaryDetail', 'defaultKeyStatistics'],
            });
            const result = quote.price;
            const summary = quote.summaryDetail;
            const stats = quote.defaultKeyStatistics;
            actionPrice = result?.regularMarketPrice || action.price
            actionPe = summary?.trailingPE || action.pe
            actionDividend = (summary?.dividendYield) || 0

          }catch (err) {
            console.error(`Erreur pour ${action.ticker}:`, err);
        }

      const updated = await prisma.action.update({
        where: { id: action.id },

        data: {
          price: Number(actionPrice || action.price),
          purchasePrice: Number(action.purchasePrice || actionPrice),
          pe: Number(actionPe || action.pe),
          dividendYield: Number(actionDividend || 0),
        },
      })
    }

    } catch (err) {
      console.error('UPDATE /api/actions error', err);
      return NextResponse.json({ error: 'Failed to update actions' }, { status: 500 });
    }
  }