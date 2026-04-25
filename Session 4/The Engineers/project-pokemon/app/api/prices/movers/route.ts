// app/api/prices/movers/route.ts
// API to get top price movers (biggest gainers and losers)
// Useful for the dashboard overview

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET /api/prices/movers?limit=10&timeframe=24h
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');
  const minChange = parseFloat(searchParams.get('minChange') || '1.0');
  
  try {
    // Use our stored function to get top movers
    const { data, error } = await supabase.rpc('get_top_movers', {
      p_limit: limit,
      p_min_change: minChange,
    });
    
    if (error) {
      console.error('Error fetching top movers:', error);
      return NextResponse.json(
        { error: 'Failed to fetch top movers' },
        { status: 500 }
      );
    }
    
    // Split into gainers and losers
    const gainers = (data || [])
      .filter((d: any) => d.change_percent > 0)
      .sort((a: any, b: any) => b.change_percent - a.change_percent);
    
    const losers = (data || [])
      .filter((d: any) => d.change_percent < 0)
      .sort((a: any, b: any) => a.change_percent - b.change_percent);
    
    return NextResponse.json({
      gainers,
      losers,
      total: data?.length || 0,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Error in GET /api/prices/movers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
