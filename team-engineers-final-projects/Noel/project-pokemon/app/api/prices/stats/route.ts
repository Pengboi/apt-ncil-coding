import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const [cardsRes, pricedRes] = await Promise.all([
      supabase.from('cards').select('id', { count: 'exact', head: true }),
      supabase.from('price_snapshots').select('card_id', { count: 'exact', head: true }),
    ]);

    const { data: setData } = await supabase
      .from('cards')
      .select('set_id')
      .not('set_id', 'is', null);

    const uniqueSets = new Set((setData || []).map(s => s.set_id)).size;

    return NextResponse.json({
      totalCards: cardsRes.count || 0,
      totalPriced: pricedRes.count || 0,
      totalSets: uniqueSets,
    });
  } catch (e) {
    return NextResponse.json({ totalCards: 0, totalPriced: 0, totalSets: 0 });
  }
}
