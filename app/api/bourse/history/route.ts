import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import YahooFinance from 'yahoo-finance2';
import { normalizeTicker } from '@/lib/normalizeTicker';
import { auth } from '@/lib/auth';

// Separate caches for daily and intraday
let cacheDaily:   { data: any; timestamp: number } | null = null;
let cacheIntraday:{ data: any; timestamp: number } | null = null;
const CACHE_DAILY_MS    = 30 * 60 * 1000; //  30 min
const CACHE_INTRADAY_MS =  5 * 60 * 1000; //   5 min

export async function GET(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const bypassCache = searchParams.has('t');
    const intraday    = searchParams.get('interval') === '1d'; // 1J view

    const now = Date.now();

    // Serve from cache when fresh
    if (!bypassCache) {
      if (intraday && cacheIntraday && now - cacheIntraday.timestamp < CACHE_INTRADAY_MS) {
        return NextResponse.json(cacheIntraday.data);
      }
      if (!intraday && cacheDaily && now - cacheDaily.timestamp < CACHE_DAILY_MS) {
        return NextResponse.json(cacheDaily.data);
      }
    }

    const orders = await prisma.bourseOrder.findMany({ orderBy: { investmentDate: 'asc' } });
    if (orders.length === 0) return NextResponse.json({ series: [] });

    const uniqueTickers = [...new Set(orders.map(o => o.ticker))];
    const yahooFinance  = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

    // ── INTRADAY (1J) ──────────────────────────────────────────────────
    if (intraday) {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const intradayHistories = await Promise.all(
        uniqueTickers.map(async (rawTicker) => {
          const ticker = normalizeTicker(rawTicker);
          try {
            const chart = await yahooFinance.chart(ticker, {
              period1: todayStart.toISOString(),
              interval: '1h',
            });
            // Build map: ISO timestamp → price
            const priceMap: Record<string, number> = {};
            for (const quote of chart.quotes ?? []) {
              if (!quote.date || !quote.close) continue;
              priceMap[new Date(quote.date).toISOString()] = quote.close;
            }
            return { ticker, priceMap, quotes: chart.quotes ?? [] };
          } catch (err) {
            console.error(`Erreur intraday ${ticker}:`, err);
            return { ticker, priceMap: {}, quotes: [] };
          }
        })
      );

      // Collect all unique timestamps across tickers
      const allTimestamps = [...new Set(
        intradayHistories.flatMap(({ quotes }) =>
          (quotes as any[]).map((q: any) => new Date(q.date).toISOString())
        )
      )].sort();

      // For each timestamp, compute portfolio value
      // Track last known price per ticker
      const lastPrice: Record<string, number> = {};
      for (const order of orders) {
        lastPrice[order.ticker] = order.prixActuel;
      }

      const series = allTimestamps.map(ts => {
        const tsDate = new Date(ts);
        // Update lastPrice from this timestamp's data
        for (const { ticker, priceMap } of intradayHistories) {
          if (priceMap[ts] !== undefined) lastPrice[ticker] = priceMap[ts];
        }
        let investi = 0;
        let valeur  = 0;
        for (const order of orders) {
          const orderDate = new Date(order.investmentDate);
          if (orderDate > tsDate) continue;
          investi += order.montant;
          valeur  += (lastPrice[order.ticker] ?? order.prixActuel) * order.quantity;
        }
        return { date: ts, investi, valeur };
      });

      const result = { series };
      cacheIntraday = { data: result, timestamp: now };
      return NextResponse.json(result);
    }

    // ── DAILY (multi-period) ───────────────────────────────────────────
    const earliest = new Date(orders[0].investmentDate);
    earliest.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const priceHistories = await Promise.all(
      uniqueTickers.map(async (rawTicker) => {
        const ticker = normalizeTicker(rawTicker);
        try {
          const history = await yahooFinance.historical(ticker, {
            period1: earliest.toISOString().slice(0, 10),
            period2: today.toISOString().slice(0, 10),
            interval: '1d',
          });
          const priceMap: Record<string, number> = {};
          for (const h of history) {
            const d = new Date(h.date);
            priceMap[d.toISOString().slice(0, 10)] = h.close;
          }
          return { ticker, priceMap };
        } catch (err) {
          console.error(`Erreur historique pour ${ticker}:`, err);
          return { ticker, priceMap: {} };
        }
      })
    );

    const priceIndex: Record<string, Record<string, number>> = {};
    for (const { ticker, priceMap } of priceHistories) {
      priceIndex[ticker] = priceMap;
    }

    function getPriceOn(ticker: string, dateStr: string): number | null {
      const map = priceIndex[ticker] || {};
      for (let offset = 0; offset <= 5; offset++) {
        const d = new Date(dateStr);
        d.setDate(d.getDate() - offset);
        const key = d.toISOString().slice(0, 10);
        if (map[key] !== undefined) return map[key];
      }
      return null;
    }

    const series: { date: string; investi: number; valeur: number }[] = [];
    const cursor = new Date(earliest);

    while (cursor <= today) {
      const dateStr = cursor.toISOString().slice(0, 10);
      const dow = cursor.getDay();
      if (dow !== 0 && dow !== 6) {
        let investi = 0;
        let valeur  = 0;
        for (const order of orders) {
          const orderDate = new Date(order.investmentDate);
          orderDate.setHours(0, 0, 0, 0);
          if (orderDate > cursor) continue;
          const price = getPriceOn(order.ticker, dateStr);
          investi += order.montant;
          valeur  += price !== null ? price * order.quantity : order.prixActuel * order.quantity;
        }
        series.push({ date: dateStr, investi, valeur });
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    const result = { series };
    cacheDaily = { data: result, timestamp: now };
    return NextResponse.json(result);

  } catch (err) {
    console.error('GET /api/bourse/history error', err);
    return NextResponse.json({ error: 'Failed to compute history' }, { status: 500 });
  }
}
