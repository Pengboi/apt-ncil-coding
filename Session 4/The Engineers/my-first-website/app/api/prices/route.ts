import { NextResponse } from 'next/server';

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

const API_KEY = process.env.POKEMON_PRICE_API_KEY;

async function fetchFromPokemonPriceTracker(cardId: string): Promise<PriceData | null> {
  if (!API_KEY) {
    return null;
  }
  
  try {
    const response = await fetch(
      `https://www.pokemonpricetracker.com/api/v2/cards?tcgPlayerId=${cardId}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json',
        },
      }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (!data?.data?.[0]) return null;
    
    const card = data.data[0];
    const prices = card.prices?.[0];
    
    if (!prices) return null;
    
    let price = 0;
    let previousPrice = 0;
    
    if (prices.tcgplayer?.market) {
      price = Math.round(prices.tcgplayer.market * 0.79 * 100) / 100;
      const low = prices.tcgplayer.low || prices.tcgplayer.market;
      previousPrice = Math.round(low * 0.79 * 100) / 100;
    } else if (prices.ebay?.average) {
      price = Math.round(prices.ebay.average * 0.79 * 100) / 100;
      previousPrice = price;
    }
    
    if (price <= 0) return null;
    
    const changePercent = previousPrice > 0 
      ? Math.round(((price - previousPrice) / previousPrice) * 100 * 10) / 10
      : 0;
    
    return {
      cardId,
      price,
      previousPrice,
      currency: 'GBP',
      condition: 'Raw',
      source: 'PokemonPriceTracker',
      change: changePercent > 1 ? 'up' : changePercent < -1 ? 'down' : 'stable',
      changePercent,
    };
  } catch {
    return null;
  }
}

// Fallback to TCGdex
async function fetchFromTcgDex(cardId: string): Promise<PriceData | null> {
  try {
    const response = await fetch(`https://api.tcgdex.net/v2/en/cards/${cardId}`);
    if (!response.ok) return null;
    
    const data = await response.json();
    if (!data?.pricing) return null;
    
    const pricing = data.pricing;
    let price = 0;
    let previousPrice = 0;
    let source = '';
    
    if (pricing.tcgplayer?.holofoil?.marketPrice) {
      const usd = pricing.tcgplayer.holofoil.marketPrice;
      price = Math.round(usd * 0.79 * 100) / 100;
      const trend = pricing.tcgplayer.holofoil.trendPrice || usd;
      previousPrice = Math.round(trend * 0.79 * 100) / 100;
      source = 'TCGPlayer';
    }
    else if (pricing.tcgplayer?.normal?.marketPrice) {
      const usd = pricing.tcgplayer.normal.marketPrice;
      price = Math.round(usd * 0.79 * 100) / 100;
      const trend = pricing.tcgplayer.normal.trendPrice || usd;
      previousPrice = Math.round(trend * 0.79 * 100) / 100;
      source = 'TCGPlayer';
    }
    else if (pricing.cardmarket?.trend) {
      const eur = pricing.cardmarket.trend;
      price = Math.round(eur * 0.85 * 100) / 100;
      previousPrice = price;
      source = 'CardMarket';
    }
    
    if (price <= 0) return null;
    
    const changePercent = previousPrice > 0 
      ? Math.round(((price - previousPrice) / previousPrice) * 100 * 10) / 10
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

async function searchCards(cardName: string): Promise<PriceData | null> {
  const searchResponse = await fetch(
    `https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(cardName)}`
  );
  if (!searchResponse.ok) return null;
  
  const cards = await searchResponse.json();
  if (!Array.isArray(cards) || cards.length === 0) return null;
  
  const baseSetCard = cards.find((c: any) => c.id.startsWith('base1-'));
  if (baseSetCard) {
    const price = await fetchFromTcgDex(baseSetCard.id);
    if (price) return price;
  }
  
  for (const card of cards) {
    const price = await fetchFromTcgDex(card.id);
    if (price && price.price > 0.5) return price;
  }
  
  return null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || '';
  const cardId = searchParams.get('cardId') || '';
  
  if (!name && !cardId) {
    return NextResponse.json({ price: null });
  }
  
  try {
    // Try PokemonPriceTracker first if API key is set
    if (cardId && API_KEY) {
      const price = await fetchFromPokemonPriceTracker(cardId);
      if (price) return NextResponse.json({ price });
    }
    
    // Fallback to TCGdex
    if (cardId) {
      const price = await fetchFromTcgDex(cardId);
      if (price) return NextResponse.json({ price });
    }
    
    if (name) {
      const price = await searchCards(name);
      if (price) return NextResponse.json({ price });
      
      const fallback = name.replace(/-/g, ' ');
      const price2 = await searchCards(fallback);
      if (price2) return NextResponse.json({ price: price2 });
    }
    
    return NextResponse.json({ price: null });
  } catch {
    return NextResponse.json({ price: null });
  }
}
