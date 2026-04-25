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
        cards:card_id (id, name, set_name, rarity, image_url),
        latest_price:price_snapshots!inner (current_price, change_percent, updated_at)
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
    
    // Also get cards without prices yet
    const { data: trackedWithoutPrice, error: priceError } = await supabase
      .from('tracked_cards')
      .select(`
        *,
        cards:card_id (id, name, set_name, rarity, image_url)
      `)
      .eq('is_active', true)
      .is('last_fetched', null)
      .order('date_added', { ascending: false });
    
    // Combine results (data might be null if no prices yet)
    const allCards = [...(data || []), ...(trackedWithoutPrice || [])];
    
    // Remove duplicates
    const uniqueCards = allCards.filter((card, index, self) =>
      index === self.findIndex((c) => c.card_id === card.card_id)
    );
    
    return NextResponse.json({
      cards: uniqueCards,
      count: uniqueCards.length,
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
    
    // Validate cardId format (should be like "base1-4")
    if (!cardId.includes('-')) {
      return NextResponse.json(
        { error: 'Invalid cardId format. Expected format: "set-number" (e.g., "base1-4")' },
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
