import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  const by = searchParams.get('by') || 'price';

  try {
    const supabase = await createClient();

    let orderCol = 'current_price';
    let orderAsc = false;
    if (by === 'change') {
      orderCol = 'change_percent';
      orderAsc = false;
    }

    const { data: snapshots, error } = await supabase
      .from('price_snapshots')
      .select('card_id, current_price, previous_price, change_percent, source, condition, updated_at')
      .order(orderCol, { ascending: orderAsc })
      .limit(limit);

    if (error) {
      console.error('Error fetching top cards:', error);
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    if (!snapshots || snapshots.length === 0) {
      return NextResponse.json({ data: [], count: 0 });
    }

    const cardIds = snapshots.map(s => s.card_id);
    const { data: cardsData } = await supabase
      .from('cards')
      .select('id, name, set_name, rarity, image_url')
      .in('id', cardIds);

    const cardsMap = new Map((cardsData || []).map(c => [c.id, c]));

    const data = snapshots.map(s => {
      const card = cardsMap.get(s.card_id);
      return {
        card_id: s.card_id,
        name: card?.name || s.card_id,
        set_name: card?.set_name || '',
        rarity: card?.rarity || '',
        image_url: card?.image_url || null,
        current_price: s.current_price,
        previous_price: s.previous_price,
        change_percent: s.change_percent,
        source: s.source,
        updated_at: s.updated_at,
      };
    });

    return NextResponse.json({ data, count: data.length });
  } catch (e) {
    return NextResponse.json({ data: [], error: 'Internal error' }, { status: 500 });
  }
}
