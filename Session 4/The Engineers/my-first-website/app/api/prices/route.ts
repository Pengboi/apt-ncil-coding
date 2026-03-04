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

async function fetchPriceFromTcgDex(cardId: string): Promise<PriceData | null> {
  try {
    const url = `https://api.tcgdex.net/v2/en/cards/${cardId}`;
    const response = await fetch(url);
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (!data || !data.pricing) return null;
    
    let price = 0;
    let previousPrice = 0;
    let source = '';
    
    // Priority: holofoil > reverse-holofoil > normal
    if (data.pricing.tcgplayer?.holofoil?.marketPrice) {
      const usdPrice = data.pricing.tcgplayer.holofoil.marketPrice;
      price = Math.round(usdPrice * 0.79 * 100) / 100;
      
      const trend = data.pricing.tcgplayer.holofoil.trendPrice || usdPrice;
      previousPrice = Math.round(trend * 0.79 * 100) / 100;
      source = 'TCGPlayer';
    } 
    else if (data.pricing.tcgplayer?.reverseHolofoil?.marketPrice) {
      const usdPrice = data.pricing.tcgplayer.reverseHolofoil.marketPrice;
      price = Math.round(usdPrice * 0.79 * 100) / 100;
      
      const trend = data.pricing.tcgplayer.reverseHolofoil.trendPrice || usdPrice;
      previousPrice = Math.round(trend * 0.79 * 100) / 100;
      source = 'TCGPlayer';
    }
    else if (data.pricing.tcgplayer?.normal?.marketPrice) {
      const usdPrice = data.pricing.tcgplayer.normal.marketPrice;
      price = Math.round(usdPrice * 0.79 * 100) / 100;
      
      const trend = data.pricing.tcgplayer.normal.trendPrice || usdPrice;
      previousPrice = Math.round(trend * 0.79 * 100) / 100;
      source = 'TCGPlayer';
    }
    else if (data.pricing.cardmarket?.trend) {
      const eurPrice = data.pricing.cardmarket.trend;
      price = Math.round(eurPrice * 0.85 * 100) / 100;
      
      const avg30 = data.pricing.cardmarket.avg30 || eurPrice;
      previousPrice = Math.round(avg30 * 0.85 * 100) / 100;
      source = 'CardMarket';
    }
    
    if (price <= 0) return null;
    
    const changePercent = previousPrice > 0 
      ? Math.round(((price - previousPrice) / previousPrice) * 100 * 10) / 10
      : 0;
    
    let change: 'up' | 'down' | 'stable' = 'stable';
    if (changePercent > 1) change = 'up';
    else if (changePercent < -1) change = 'down';
    
    return {
      cardId,
      price,
      previousPrice,
      currency: 'GBP',
      condition: 'Raw',
      source,
      change,
      changePercent
    };
  } catch {
    return null;
  }
}

async function searchAndFetchPrice(cardName: string): Promise<PriceData | null> {
  try {
    const searchUrl = `https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(cardName)}`;
    const response = await fetch(searchUrl);
    
    if (!response.ok) return null;
    
    const cards = await response.json();
    
    if (!cards || !Array.isArray(cards) || cards.length === 0) return null;
    
    // Try to find a holo variant first by checking each card's pricing
    for (const card of cards) {
      const price = await fetchPriceFromTcgDex(card.id);
      if (price && price.price > 0.5) return price;
    }
    
    return null;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || '';
  const cardId = searchParams.get('cardId') || '';
  
  if (!name) {
    return NextResponse.json({ price: null }, { status: 200 });
  }
  
  try {
    let price = null;
    
    if (cardId) {
      price = await fetchPriceFromTcgDex(cardId);
    }
    
    if (!price) {
      price = await searchAndFetchPrice(name);
    }
    
    if (!price) {
      const fallback = name.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
      price = await searchAndFetchPrice(fallback);
    }
    
    return NextResponse.json({ price }, { status: 200 });
  } catch {
    return NextResponse.json({ price: null }, { status: 200 });
  }
}
