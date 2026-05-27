// app/api/prices/history/route.ts
// API to get price history for a specific card
// Used for drawing price charts and showing price trends

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/prices/history?cardId=base1-4&days=30&source=tcgplayer
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const cardId = searchParams.get('cardId');
  const days = parseInt(searchParams.get('days') || '30');
  const source = searchParams.get('source') || 'tcgplayer';
  
  // Validate required parameters
  if (!cardId) {
    return NextResponse.json(
      { error: 'cardId query parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    // Calculate the date range
    const since = new Date();
    since.setDate(since.getDate() - days);
    
    // Fetch price history from database
    const { data, error } = await supabase
      .from('price_history')
      .select('*')
      .eq('card_id', cardId)
      .eq('source', source)
      .gte('fetched_at', since.toISOString())
      .order('fetched_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching price history:', error);
      return NextResponse.json(
        { error: 'Failed to fetch price history' },
        { status: 500 }
      );
    }
    
    // Calculate some statistics
    let stats = null;
    if (data && data.length > 0) {
      const prices = data.map(d => d.price_gbp);
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
        data_points: data.length,
      };
    }
    
    // Also get the current snapshot for comparison
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
      prices: data || [],
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
