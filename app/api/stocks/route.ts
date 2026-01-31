import { NextResponse } from 'next/server'
import YahooFinance from 'yahoo-finance2';

let cache: { data: any[] | null; timestamp: number } = { data: null, timestamp: 0 }
const CACHE_DURATION = 600000 // 10 minute

export async function GET() {
    try{
        const now = Date.now()
        if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
        console.log('Serving from cache')
        return NextResponse.json(cache.data)
        }
        const symbols = [
        // CAC 40 - Actions PEA
        'MC.PA', 'OR.PA', 'SAN.PA', 'AI.PA', 'BNP.PA',
        'TTE.PA', 'SU.PA', 'EL.PA', 'SAF.PA', 'CS.PA',
        'RMS.PA', 'DSY.PA', 'CAP.PA', 'DG.PA', 'RI.PA',
        'KER.PA', 'EN.PA', 'SGO.PA', 'ALO.PA',
        
        // Autres européennes PEA
        'ASML.AS', 'AD.AS', 'SIE.DE', 'SAP.DE', 'VOW3.DE',
        'AIR.PA', 'ITX.MC', 'SAN.MC',
        
        // Actions US - Monde
        'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA',
        'META', 'TSLA', 'BRK-B', 'V', 'JPM',
        'JNJ', 'WMT', 'MA', 'PG', 'UNH',
        'HD', 'DIS', 'BAC', 'NFLX', 'ADBE',
        'CRM', 'ORCL', 'CSCO', 'INTC', 'AMD',
        'NKE', 'PFE', 'KO', 'PEP', 'MCD',
        ]  
        const yahooFinance = new YahooFinance();
        const stocksData = await Promise.all(
        symbols.map(async (symbol) => {
        try {
            const quote = await yahooFinance.quoteSummary(symbol, {
            modules: ['price', 'summaryDetail', 'defaultKeyStatistics'],
            });

            const result = quote.price;
            const summary = quote.summaryDetail;
            const stats = quote.defaultKeyStatistics;

            if (!result) {
                console.error(`No price data for ${symbol}`);
                return null;
            }
            return {
            ticker: symbol,
            name: result.longName,
            price: result.regularMarketPrice,
            change: result.regularMarketChange,
            changePercent: result.regularMarketChangePercent,
            pe: summary?.trailingPE,
            eps: stats?.trailingEps,
            dividendYield: summary?.dividendYield,
            marketCap: result.marketCap,
            currency: result.currency,
            isPEA: symbol.includes('.PA') || symbol.includes('.AS') || symbol.includes('.DE') || symbol.includes('.MC'),
            volume: result.regularMarketVolume,
            // ...
            };
        } catch (err) {
            console.error(`Erreur pour ${symbol}:`, err);
            return null;
        }
        })

    );
    const validStocks = stocksData.filter(stock => stock !== null)

    //save to cache
    cache = { data: validStocks, timestamp: now }

    return NextResponse.json(validStocks);
    
    } catch (error) {
    console.error('Erreur API:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }

}
