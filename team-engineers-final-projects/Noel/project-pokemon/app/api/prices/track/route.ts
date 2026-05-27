import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// Save a price record to the database
export async function POST(req: Request) {
  const supabase = await createClient();
  
  try {
    const body = await req.json();
    const { cardId, price, source = 'manual', condition = 'raw' } = body;
    
    if (!cardId || !price) {
      return NextResponse.json({ error: 'Missing cardId or price' }, { status: 400 });
    }
    
    // First, ensure the card exists in our database
    const { data: existingCard } = await supabase
      .from('cards')
      .select('id')
      .eq('id', cardId)
      .single();
    
    if (!existingCard) {
      // Fetch card info from TCGdex
      const cardRes = await fetch(`https://api.tcgdex.net/v2/en/cards/${cardId}`);
      if (cardRes.ok) {
        const cardData = await cardRes.json();
        await supabase.from('cards').insert({
          id: cardId,
          name: cardData.name,
          set_id: cardData.id?.split('-')[0] || 'unknown',
          set_name: cardData.set?.name,
          rarity: cardData.rarity,
          image_url: cardData.image,
          pokemon_name: cardData.name,
        });
      }
    }
    
    // Insert price into history
    const { error: historyError } = await supabase
      .from('price_history')
      .insert({
        card_id: cardId,
        price_gbp: price,
        source,
        condition,
      });
    
    if (historyError) {
      console.error('Error saving price:', historyError);
      return NextResponse.json({ error: historyError.message }, { status: 500 });
    }
    
    // Update the snapshot
    await supabase.rpc('upsert_price_snapshot', {
      p_card_id: cardId,
      p_source: source,
      p_condition: condition,
      p_current_price: price,
    });
    
    return NextResponse.json({ success: true, message: 'Price tracked!' });
    
  } catch (error) {
    console.error('Track price error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Get price history for a card
export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const cardId = searchParams.get('cardId');
  const days = parseInt(searchParams.get('days') || '30');
  
  if (!cardId) {
    return NextResponse.json({ error: 'Missing cardId' }, { status: 400 });
  }
  
  const since = new Date();
  since.setDate(since.getDate() - days);
  
  const { data, error } = await supabase
    .from('price_history')
    .select('*')
    .eq('card_id', cardId)
    .gte('fetched_at', since.toISOString())
    .order('fetched_at', { ascending: true });
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ prices: data || [] });
}
