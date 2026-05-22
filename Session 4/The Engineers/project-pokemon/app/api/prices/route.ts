import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const TCG_API = 'https://tcgtracking.com/tcgapi/v1';
const POKEMON_CAT = 3;
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

async function getPriceFromDB(cardId: string): Promise<PriceData | null> {
  try {
    const supabase = await createClient();
    const { data: snapshot } = await supabase
      .from('price_snapshots')
      .select('current_price, previous_price, change_percent, source, condition, updated_at')
      .eq('card_id', cardId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (snapshot?.current_price) {
      const changePercent = snapshot.change_percent || 0;
      return {
        cardId,
        price: snapshot.current_price,
        previousPrice: snapshot.previous_price || snapshot.current_price,
        currency: 'GBP',
        condition: snapshot.condition || 'raw',
        source: snapshot.source || 'tcgplayer',
        change: changePercent > 1 ? 'up' : changePercent < -1 ? 'down' : 'stable',
        changePercent,
      };
    }
  } catch {}
  return null;
}

async function fetchFromTCGTracking(cardId: string): Promise<PriceData | null> {
  try {
    const res = await fetch(`${TCG_API}/products/${cardId}`);
    if (!res.ok) return null;

    const data = await res.json();
    const pricing = data?.pricing;

    if (!pricing?.tcg) return null;

    const subtypes = Object.keys(pricing.tcg);
    const normalSubtype = subtypes.find(s => s.toLowerCase() === 'normal');
    const foilSubtype = subtypes.find(s => s.toLowerCase() === 'foil' || s.toLowerCase() === 'holofoil');
    const subtype = normalSubtype || foilSubtype || subtypes[0];
    const priceData = pricing.tcg[subtype];

    if (!priceData?.market && !priceData?.low) return null;

    const marketUSD = priceData.market || priceData.low;
    const lowUSD = priceData.low || priceData.market;
    const price = Math.round(marketUSD * USD_TO_GBP * 100) / 100;
    const previousPrice = Math.round(lowUSD * USD_TO_GBP * 100) / 100;

    const changePercent = previousPrice > 0
      ? Math.round(((price - previousPrice) / previousPrice) * 1000) / 10
      : 0;

    return {
      cardId,
      price,
      previousPrice,
      currency: 'GBP',
      condition: subtype,
      source: 'TCGPlayer',
      change: changePercent > 1 ? 'up' : changePercent < -1 ? 'down' : 'stable',
      changePercent,
    };
  } catch {
    return null;
  }
}

async function searchByName(name: string): Promise<PriceData | null> {
  try {
    const supabase = await createClient();
    const { data: cards } = await supabase
      .from('cards')
      .select('id')
      .or(`name.ilike.%${name}%,pokemon_name.ilike.%${name}%`)
      .limit(1);

    if (cards && cards.length > 0) {
      return getPriceFromDB(cards[0].id);
    }
  } catch {}
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
    if (cardId) {
      const dbPrice = await getPriceFromDB(cardId);
      if (dbPrice) return NextResponse.json({ price: dbPrice });

      const apiPrice = await fetchFromTCGTracking(cardId);
      if (apiPrice) return NextResponse.json({ price: apiPrice });
    }

    if (name) {
      const price = await searchByName(name);
      if (price) return NextResponse.json({ price });
    }

    return NextResponse.json({ price: null });
  } catch {
    return NextResponse.json({ price: null });
  }
}
