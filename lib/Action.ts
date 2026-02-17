export type ActionParams = {
  name: string;
  ticker: string;
  price: number;
  purchasePrice: number;
  quantity?: number;
  pe?: number | null;
  dividendYield?: number | null;
  where?: string;
};

export default class Action {
  name: string;
  ticker: string;
  price: number;
  purchasePrice: number;
  quantity: number;
  pe?: number | null;
  dividendYield?: number | null;
  where?: string;

  constructor({ name, ticker, price, purchasePrice,quantity, pe, dividendYield, where }: ActionParams) {
    this.name = name;
    this.ticker = ticker;
    this.price = Number(price || 0);
    this.purchasePrice = Number(purchasePrice || 0);
    this.quantity = Number(quantity || 0);
    this.pe = pe ?? null;
    this.dividendYield = dividendYield ?? null;
    this.where = where;
  }

  getGain(): number {
    return Number((this.price - this.purchasePrice) || 0);
  }

  getGainPercent(): number | null {
    if (!this.purchasePrice) return null;
    return Number(((this.price - this.purchasePrice) / this.purchasePrice) * 100);
  }

  toJSON() {
    return {
      name: this.name,
      ticker: this.ticker,
      price: this.price,
      purchasePrice: this.purchasePrice,
      quantity: this.quantity,
      pe: this.pe,
      dividendYield: this.dividendYield,
      where: this.where,
    };
  }
}
