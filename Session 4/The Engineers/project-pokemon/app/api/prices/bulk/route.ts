import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  try {
    const body = await request.json();
    const { cardIds } = body;

    if (!Array.isArray(cardIds) || cardIds.length === 0) {
      return NextResponse.json({ error: 'cardIds array required' }, { status: 400 });
    }

    if (cardIds.length > 100) {
      return NextResponse.json({ error: 'Maximum 100 card IDs per request' }, { status: 400 });
    }

    const { data: snapshots } = await supabase
      .from('price_snapshots')
      .select('card_id, current_price, previous_price, change_percent, updated_at')
      .in('card_id', cardIds);

    const snapshotMap = new Map((snapshots || []).map(s => [s.card_id, s]));

    const { data: cards } = await supabase
      .from('cards')
      .select('id, name, set_name, rarity, image_url')
      .in('id', cardIds);

    const cardMap = new Map((cards || []).map(c => [c.id, c]));

    const results: Record<string, any> = {};
    for (const cardId of cardIds) {
      const snapshot = snapshotMap.get(cardId);
      const card = cardMap.get(cardId);

      results[cardId] = {
        current: snapshot?.current_price ?? null,
        previous: snapshot?.previous_price ?? null,
        change24h: snapshot?.change_percent ?? null,
        lastUpdated: snapshot?.updated_at ?? null,
        card: card || null,
      };
    }

    return NextResponse.json({ prices: results });
  } catch (error) {
    console.error('Error in /api/prices/bulk:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
