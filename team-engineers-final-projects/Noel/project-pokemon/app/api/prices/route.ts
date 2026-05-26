import { NextResponse } from 'next/server';

const TCG_API = 'https://api.tcgdex.net/v2/en';
const EUR_TO_GBP = 0.85;
const USD_TO_GBP = 0.79;

type PriceData = {
  cardId: string;
  price: number;
  previousPrice: number;
  currency: string;
  condition: string;
  source: string;
  change: 'up' | 'down' | 'stable';
  changePercent: number;
};

async function fetchFromTcgDex(cardId: string): Promise<PriceData | null> {
  try {
    const res = await fetch(`${TCG_API}/cards/${cardId}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const pricing = data?.pricing;
    if (!pricing) return null;

    let price = 0;
    let previousPrice = 0;
    let source = '';

    if (pricing.tcgplayer?.holofoil?.marketPrice) {
      const marketUSD = pricing.tcgplayer.holofoil.marketPrice;
      const trendUSD = pricing.tcgplayer.holofoil.trendPrice || marketUSD;
      price = Math.round(marketUSD * USD_TO_GBP * 100) / 100;
      previousPrice = Math.round(trendUSD * USD_TO_GBP * 100) / 100;
      source = 'TCGPlayer';
    } else if (pricing.tcgplayer?.normal?.marketPrice) {
      const marketUSD = pricing.tcgplayer.normal.marketPrice;
      const trendUSD = pricing.tcgplayer.normal.trendPrice || marketUSD;
      price = Math.round(marketUSD * USD_TO_GBP * 100) / 100;
      previousPrice = Math.round(trendUSD * USD_TO_GBP * 100) / 100;
      source = 'TCGPlayer';
    } else if (pricing.cardmarket?.trend) {
      const trendEUR = pricing.cardmarket.trend;
      const avg30EUR = pricing.cardmarket.avg30 || pricing.cardmarket.avg7 || pricing.cardmarket.avg || trendEUR;
      price = Math.round(trendEUR * EUR_TO_GBP * 100) / 100;
      previousPrice = Math.round(avg30EUR * EUR_TO_GBP * 100) / 100;
      source = 'CardMarket';
    }

    if (price <= 0) return null;

    const changePercent = previousPrice > 0
      ? Math.round(((price - previousPrice) / previousPrice) * 1000) / 10
      : 0;

    return {
      cardId,
      price,
      previousPrice,
      currency: 'GBP',
      condition: 'Raw',
      source,
      change: changePercent > 1 ? 'up' : changePercent < -1 ? 'down' : 'stable',
      changePercent,
    };
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cardId = searchParams.get('cardId') || '';
  const name = searchParams.get('name') || '';

  if (!cardId && !name) {
    return NextResponse.json({ price: null });
  }

  try {
    if (cardId) {
      const price = await fetchFromTcgDex(cardId);
      if (price) return NextResponse.json({ price });
    }

    return NextResponse.json({ price: null });
  } catch {
    return NextResponse.json({ price: null });
  }
}
