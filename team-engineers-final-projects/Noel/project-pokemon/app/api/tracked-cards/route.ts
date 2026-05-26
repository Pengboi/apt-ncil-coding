// app/api/tracked-cards/route.ts
// API for managing which cards to track
// GET: List all tracked cards
// POST: Add a new card to tracking

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { addCardToTracking } from '@/lib/price-utils';

// GET /api/tracked-cards
// Returns all cards being tracked with their current price snapshots
export async function GET() {
  const supabase = await createClient();
  
  try {
    // Get tracked cards joined with latest price snapshots
    const { data, error } = await supabase
      .from('tracked_cards')
      .select(`
        *,
        cards:card_id (id, name, set_name, rarity, image_url)
      `)
      .eq('is_active', true)
      .order('date_added', { ascending: false });
    
    if (error) {
      console.error('Error fetching tracked cards:', error);
      return NextResponse.json(
        { error: 'Failed to fetch tracked cards' },
        { status: 500 }
      );
    }

    let cards = data || [];

    if (cards.length > 0) {
      const cardIds = cards.map(c => c.card_id);
      const { data: snapshots } = await supabase
        .from('price_snapshots')
        .select('card_id, current_price, change_percent, updated_at')
        .in('card_id', cardIds);

      const snapMap = new Map((snapshots || []).map(s => [s.card_id, s]));

      cards = cards.map(c => ({
        ...c,
        latest_price: snapMap.get(c.card_id) || null,
      }));
    }
    
    return NextResponse.json({
      cards,
      count: cards.length,
    });
    
  } catch (error) {
    console.error('Error in GET /api/tracked-cards:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/tracked-cards
// Add a new card to tracking
// Body: { cardId: string, notes?: string }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardId, notes } = body;
    
    if (!cardId) {
      return NextResponse.json(
        { error: 'cardId is required' },
        { status: 400 }
      );
    }
    
    console.log(`🔍 Adding ${cardId} to tracking...`);
    
    const success = await addCardToTracking(cardId, notes);
    
    if (!success) {
      return NextResponse.json(
        { error: `Failed to add ${cardId} to tracking. Card may not exist in TCG database.` },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `Now tracking ${cardId}`,
      cardId,
    });
    
  } catch (error) {
    console.error('Error in POST /api/tracked-cards:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/tracked-cards
// Remove a card from tracking
// Body: { cardId: string }
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardId } = body;
    
    if (!cardId) {
      return NextResponse.json(
        { error: 'cardId is required' },
        { status: 400 }
      );
    }
    
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('tracked_cards')
      .delete()
      .eq('card_id', cardId);
    
    if (error) {
      console.error('Error removing tracked card:', error);
      return NextResponse.json(
        { error: 'Failed to remove card from tracking' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `Stopped tracking ${cardId}`,
      cardId,
    });
    
  } catch (error) {
    console.error('Error in DELETE /api/tracked-cards:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
