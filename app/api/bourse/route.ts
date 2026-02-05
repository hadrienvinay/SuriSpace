// app/api/stocks/route.ts
import { NextResponse } from 'next/server'

let cache: { data: any[] | null; timestamp: number } = { data: null, timestamp: 0 }
const CACHE_DURATION = 600000 // 10 minute

export async function GET() {
  try {
    const now = Date.now()
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
      //return NextResponse.json(cache.data)
      console.log('Serving from cache')
    }

    const symbols = [
      // CAC 40 - Actions PEA
      'MC.PA', 'OR.PA', 'SAN.PA', 'AI.PA', 'BNP.PA',
      'TTE.PA', 'SU.PA', 'EL.PA', 'SAF.PA', 'CS.PA',
      'RMS.PA', 'DSY.PA', 'CAP.PA', 'DG.PA', 'RI.PA',
      'KER.PA', 'EN.PA', 'SGO.PA', 'ALO.PA', 'URW.AS',
      
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
    
    const stocksData = await Promise.all(
      symbols.map(async (symbol) => {
        try {
          // 1. Prix et variation (chart API)
          const chartUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d`
          const chartResponse = await fetch(chartUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
          })
          const chartData = await chartResponse.json()
          const result = chartData.chart.result[0]
          const meta = result.meta
          console.log(result)
          
          const previousClose = meta.regularMarketPreviousClose || meta.previousClose
          const currentPrice = meta.regularMarketPrice
          
          // 2. P/E ratio et autres métriques (quoteSummary API)
          const summaryUrl = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=defaultKeyStatistics,summaryDetail,financialData`
          const summaryResponse = await fetch(summaryUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
          })
          const summaryData = await summaryResponse.json()
          const quoteSummary = summaryData.quoteSummary?.result?.[0]
          console.log(quoteSummary)
          // Extraire le P/E ratio
          const peRatio = 
            quoteSummary?.defaultKeyStatistics?.trailingPE?.raw ||
            quoteSummary?.summaryDetail?.trailingPE?.raw ||
            quoteSummary?.defaultKeyStatistics?.forwardPE?.raw ||
            null
          
          // Autres métriques utiles
          const dividendYield = quoteSummary?.summaryDetail?.dividendYield?.raw || null
          const beta = quoteSummary?.defaultKeyStatistics?.beta?.raw || null
          const eps = quoteSummary?.defaultKeyStatistics?.trailingEps?.raw || null
          const marketCap = quoteSummary?.summaryDetail?.marketCap?.raw || 0
          
          // Déterminer la devise
          let currency = '€'
          if (!symbol.includes('.PA') && !symbol.includes('.AS') && 
              !symbol.includes('.DE') && !symbol.includes('.MC')) {
            currency = '$'
          }
          
          return {
            ticker: symbol,
            name: meta.longName || meta.symbol,
            price: currentPrice,
            change: currentPrice - previousClose,
            changePercent: ((currentPrice - previousClose) / previousClose) * 100,
            volume: meta.regularMarketVolume || 0,
            marketCap: marketCap,
            pe: peRatio,
            eps: eps,
            dividendYield: dividendYield,
            beta: beta,
            currency: currency,
            isPEA: symbol.includes('.PA') || symbol.includes('.AS') || 
                   symbol.includes('.DE') || symbol.includes('.MC')
          }
        } catch (err) {
          console.error(`Erreur pour ${symbol}:`, err)
          return null
        }
      })
    )

    const validStocks = stocksData.filter(stock => stock !== null)

    cache = {
      data: validStocks,
      timestamp: now
    }

    return NextResponse.json(validStocks)
  } catch (error) {
    console.error('Erreur API:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}