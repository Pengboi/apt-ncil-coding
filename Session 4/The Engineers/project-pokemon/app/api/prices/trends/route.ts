import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const cardId = searchParams.get('cardId');

  if (!cardId) {
    return NextResponse.json({ error: 'cardId required' }, { status: 400 });
  }

  try {
    const now = new Date();
    const ranges = [
      { label: '1d', days: 1 },
      { label: '7d', days: 7 },
      { label: '30d', days: 30 },
      { label: '90d', days: 90 },
    ];

    const trends: Record<string, any> = {};

    for (const range of ranges) {
      const since = new Date(now);
      since.setDate(since.getDate() - range.days);

      const { data } = await supabase
        .from('price_history')
        .select('price_gbp, fetched_at')
        .eq('card_id', cardId)
        .gte('fetched_at', since.toISOString())
        .order('fetched_at', { ascending: true });

      const prices = (data || []).map(d => d.price_gbp);

      if (prices.length >= 2) {
        const first = prices[0];
        const last = prices[prices.length - 1];
        const high = Math.max(...prices);
        const low = Math.min(...prices);
        const change = Math.round(((last - first) / first) * 1000) / 10;

        trends[range.label] = {
          change,
          high: Math.round(high * 100) / 100,
          low: Math.round(low * 100) / 100,
          open: Math.round(first * 100) / 100,
          close: Math.round(last * 100) / 100,
          dataPoints: prices.length,
        };
      } else if (prices.length === 1) {
        trends[range.label] = {
          change: 0,
          high: prices[0],
          low: prices[0],
          open: prices[0],
          close: prices[0],
          dataPoints: 1,
        };
      } else {
        trends[range.label] = null;
      }
    }

    const { data: snapshot } = await supabase
      .from('price_snapshots')
      .select('current_price, change_percent, previous_price')
      .eq('card_id', cardId)
      .maybeSingle();

    return NextResponse.json({
      cardId,
      trends,
      snapshot: snapshot || null,
    });
  } catch (error) {
    console.error('Error in /api/prices/trends:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
