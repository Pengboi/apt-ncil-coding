import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const SUPPLEMENTAL_SETS = new Set([
  'Miscellaneous Cards & Products',
  'Blister Exclusives',
  'Deck Exclusives',
  'Prize Pack Series Cards',
  'League & Championship Cards',
  'Jumbo Cards',
  'World Championship Decks',
  'Best of Promos',
]);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || searchParams.get('q') || '';

  if (name.length < 2) {
    return NextResponse.json({ data: [], sets: [] });
  }

  try {
    const supabase = await createClient();

    const { data: cards, error } = await supabase
      .from('cards')
      .select('id, name, set_id, set_name, rarity, image_url, pokemon_name')
      .or(`name.ilike.%${name}%,pokemon_name.ilike.%${name}%`)
      .limit(100);

    if (error || !cards || cards.length === 0) {
      return NextResponse.json({ data: [], sets: [] });
    }

    const sorted = cards.sort((a, b) => {
      const aSupp = SUPPLEMENTAL_SETS.has(a.set_name) ? 1 : 0;
      const bSupp = SUPPLEMENTAL_SETS.has(b.set_name) ? 1 : 0;
      if (aSupp !== bSupp) return aSupp - bSupp;
      const aExact = a.pokemon_name?.toLowerCase() === name.toLowerCase() ? 0 : 1;
      const bExact = b.pokemon_name?.toLowerCase() === name.toLowerCase() ? 0 : 1;
      if (aExact !== bExact) return aExact - bExact;
      return a.name.localeCompare(b.name);
    });

    const data = sorted.slice(0, 30).map(c => ({
      id: c.id,
      name: c.name,
      setId: c.set_id,
      setName: c.set_name,
      rarity: c.rarity,
      images: {
        small: c.image_url || null,
        large: c.image_url || null,
      },
    }));

    return NextResponse.json({ data, sets: [] });
  } catch {
    return NextResponse.json({ data: [], sets: [] });
  }
}
