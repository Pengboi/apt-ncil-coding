import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cardId = searchParams.get('cardId');

  if (!cardId) {
    return NextResponse.json({ card: null });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('cards')
      .select('id, name, set_name, rarity, image_url, set_id')
      .eq('id', cardId)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ card: null });
    }

    return NextResponse.json({ card: data });
  } catch {
    return NextResponse.json({ card: null });
  }
}
