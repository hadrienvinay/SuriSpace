/**
 * Normalize a user-provided ticker to the format expected by Yahoo Finance.
 *
 * Metals / Forex spot: Yahoo Finance uses the "XXXYYY=X" convention.
 * Crypto:              Yahoo Finance uses "XXX-USD" (unchanged).
 * Futures:             Yahoo Finance uses "XX=F"    (unchanged).
 */

const TICKER_MAP: Record<string, string> = {
  // Gold
  'XAU-USD':  'XAUUSD=X',
  'XAU/USD':  'XAUUSD=X',
  'XAUUSD':   'XAUUSD=X',
  'GOLD':     'GC=F',

  // Silver
  'XAG-USD':  'XAGUSD=X',
  'XAG/USD':  'XAGUSD=X',
  'XAGUSD':   'XAGUSD=X',
  'SILVER':   'SI=F',

  // Platinum
  'XPT-USD':  'XPTUSD=X',
  'XPT/USD':  'XPTUSD=X',
  'XPTUSD':   'XPTUSD=X',

  // Palladium
  'XPD-USD':  'XPDUSD=X',
  'XPD/USD':  'XPDUSD=X',
  'XPDUSD':   'XPDUSD=X',

  // Oil (common aliases)
  'OIL':      'CL=F',
  'CRUDE':    'CL=F',
  'WTI':      'CL=F',
  'BRENT':    'BZ=F',

  // Natural Gas
  'GAS':      'NG=F',
  'NATGAS':   'NG=F',

  // Wheat / Corn / Soy
  'WHEAT':    'ZW=F',
  'CORN':     'ZC=F',
  'SOY':      'ZS=F',
  'SOYBEAN':  'ZS=F',

  // EUR/USD, GBP/USD (forex)
  'EUR-USD':  'EURUSD=X',
  'EUR/USD':  'EURUSD=X',
  'GBP-USD':  'GBPUSD=X',
  'GBP/USD':  'GBPUSD=X',
  'USD-JPY':  'USDJPY=X',
  'USD/JPY':  'USDJPY=X',
};

export function normalizeTicker(ticker: string): string {
  const upper = ticker.trim().toUpperCase();
  return TICKER_MAP[upper] ?? upper;
}
