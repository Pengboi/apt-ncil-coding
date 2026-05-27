// app/api/prices/history/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const TCG_API = 'https://api.tcgdex.net/v2/en';
const USD_TO_GBP = 0.79;
const EUR_TO_GBP = 0.85;

async function fetchLivePrice(cardId: string): Promise<{ price: number; previousPrice: number; source: string } | null> {
  try {
    const res = await fetch(`${TCG_API}/cards/${cardId}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const pricing = data?.pricing;
    if (!pricing) return null;

    if (pricing.tcgplayer?.holofoil?.marketPrice) {
      return {
        price: Math.round(pricing.tcgplayer.holofoil.marketPrice * USD_TO_GBP * 100) / 100,
        previousPrice: Math.round((pricing.tcgplayer.holofoil.trendPrice || pricing.tcgplayer.holofoil.marketPrice) * USD_TO_GBP * 100) / 100,
        source: 'TCGPlayer',
      };
    }
    if (pricing.tcgplayer?.normal?.marketPrice) {
      return {
        price: Math.round(pricing.tcgplayer.normal.marketPrice * USD_TO_GBP * 100) / 100,
        previousPrice: Math.round((pricing.tcgplayer.normal.trendPrice || pricing.tcgplayer.normal.marketPrice) * USD_TO_GBP * 100) / 100,
        source: 'TCGPlayer',
      };
    }
    if (pricing.cardmarket?.trend) {
      return {
        price: Math.round(pricing.cardmarket.trend * EUR_TO_GBP * 100) / 100,
        previousPrice: Math.round((pricing.cardmarket.avg30 || pricing.cardmarket.avg7 || pricing.cardmarket.avg || pricing.cardmarket.trend) * EUR_TO_GBP * 100) / 100,
        source: 'CardMarket',
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  
  const { searchParams } = new URL(request.url);
  const cardId = searchParams.get('cardId');
  const days = parseInt(searchParams.get('days') || '30');
  const source = searchParams.get('source') || 'tcgplayer';
  
  if (!cardId) {
    return NextResponse.json(
      { error: 'cardId query parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    const since = new Date();
    since.setDate(since.getDate() - days);
    
    const { data, error } = await supabase
      .from('price_history')
      .select('*')
      .eq('card_id', cardId)
      .eq('source', source)
      .gte('fetched_at', since.toISOString())
      .order('fetched_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching price history:', error);
    }
    
    let priceData = data || [];
    
    if (priceData.length === 0) {
      const live = await fetchLivePrice(cardId);
      if (live && live.price > 0) {
        const now = new Date().toISOString();
        const syntheticRow = {
          card_id: cardId,
          price_gbp: live.price,
          source,
          condition: 'raw',
          fetched_at: now,
        };
        priceData = [syntheticRow];

        const { data: existingCard } = await supabase
          .from('cards')
          .select('id')
          .eq('id', cardId)
          .maybeSingle();

        if (existingCard) {
          await supabase.from('price_history').upsert(
            { card_id: cardId, price_gbp: live.price, source, condition: 'raw', fetched_at: now },
            { onConflict: 'card_id,source,condition,fetched_at' }
          );
          await supabase.from('price_snapshots').upsert(
            {
              card_id: cardId,
              source,
              condition: 'raw',
              current_price: live.price,
              previous_price: live.previousPrice,
              change_percent: live.previousPrice > 0
                ? Math.round(((live.price - live.previousPrice) / live.previousPrice) * 1000) / 10
                : 0,
              updated_at: now,
            },
            { onConflict: 'card_id,source,condition' }
          );
        }
      }
    }
    
    let stats = null;
    if (priceData.length > 0) {
      const prices = priceData.map(d => d.price_gbp);
      const firstPrice = prices[0];
      const lastPrice = prices[prices.length - 1];
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
      const changePercent = firstPrice > 0 
        ? ((lastPrice - firstPrice) / firstPrice * 100).toFixed(2)
        : 0;
      
      stats = {
        first_price: firstPrice,
        last_price: lastPrice,
        min_price: minPrice,
        max_price: maxPrice,
        avg_price: parseFloat(avgPrice.toFixed(2)),
        change_percent: parseFloat(changePercent as string),
        change_amount: parseFloat((lastPrice - firstPrice).toFixed(2)),
        data_points: priceData.length,
      };
    }
    
    const { data: snapshot } = await supabase
      .from('price_snapshots')
      .select('*')
      .eq('card_id', cardId)
      .eq('source', source)
      .maybeSingle();
    
    return NextResponse.json({
      card_id: cardId,
      days,
      source,
      prices: priceData,
      stats,
      snapshot,
    });
    
  } catch (error) {
    console.error('Error in GET /api/prices/history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
