import { NextRequest, NextResponse } from 'next/server';

const TCG_API = 'https://api.tcgdex.net/v2/en';
const EUR_TO_GBP = 0.85;
const USD_TO_GBP = 0.79;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardIds } = body;

    if (!Array.isArray(cardIds) || cardIds.length === 0) {
      return NextResponse.json({ error: 'cardIds array required' }, { status: 400 });
    }

    if (cardIds.length > 100) {
      return NextResponse.json({ error: 'Maximum 100 card IDs per request' }, { status: 400 });
    }

    const results: Record<string, any> = {};

    const batchSize = 5;
    for (let i = 0; i < cardIds.length; i += batchSize) {
      const batch = cardIds.slice(i, i + batchSize);
      const promises = batch.map(async (cardId: string) => {
        try {
          const res = await fetch(`${TCG_API}/cards/${cardId}`, {
            headers: { Accept: 'application/json' },
          });
          if (!res.ok) return;

          const data = await res.json();
          const pricing = data?.pricing;
          if (!pricing) return;

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

          if (price <= 0) return;

          const changePercent = previousPrice > 0
            ? Math.round(((price - previousPrice) / previousPrice) * 1000) / 10
            : 0;

          results[cardId] = {
            price,
            previousPrice,
            source,
            change: changePercent > 1 ? 'up' : changePercent < -1 ? 'down' : 'stable',
            changePercent,
          };
        } catch {}
      });

      await Promise.all(promises);

      if (i + batchSize < cardIds.length) {
        await new Promise(r => setTimeout(r, 100));
      }
    }

    return NextResponse.json({ prices: results });
  } catch (error) {
    console.error('Error in /api/prices/bulk:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
