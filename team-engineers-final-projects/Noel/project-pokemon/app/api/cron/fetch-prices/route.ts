// app/api/cron/fetch-prices/route.ts
// This is the MAIN API endpoint that runs every 4 hours
// It fetches prices for all tracked cards and saves them to Supabase
// 
// HOW IT WORKS:
// 1. Vercel Cron calls this endpoint every 4 hours (configured in vercel.json)
// 2. We get all cards from the 'tracked_cards' table
// 3. For each card, we:
//    - Fetch info from TCG API (if not in our database yet)
//    - Get the current price
//    - Save to price_history table
//    - Update price_snapshots table
// 4. Log the results

import { NextRequest, NextResponse } from 'next/server';
import { fetchAllTrackedPrices, logFetchOperation } from '@/lib/price-utils';

// CRON_SECRET protects this endpoint so only Vercel Cron can trigger it
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  // Verify this request is authorized (either from Vercel Cron or has secret)
  const authHeader = request.headers.get('authorization');
  const isVercelCron = request.headers.get('x-vercel-signature') !== null;
  const hasValidSecret = CRON_SECRET && authHeader === `Bearer ${CRON_SECRET}`;
  
  // For security, require either Vercel Cron header or secret
  // In development, you can skip this check
  if (process.env.NODE_ENV === 'production' && !isVercelCron && !hasValidSecret) {
    return NextResponse.json(
      { error: 'Unauthorized. This endpoint is for scheduled cron jobs only.' },
      { status: 401 }
    );
  }
  
  console.log('🚀 Starting scheduled price fetch...');
  console.log(`   Time: ${new Date().toISOString()}`);
  console.log(`   Triggered by: ${isVercelCron ? 'Vercel Cron' : 'Manual/Secret'}`);
  
  try {
    // Fetch all prices for tracked cards
    const stats = await fetchAllTrackedPrices();
    
    // Calculate duration
    const durationSeconds = Math.round((Date.now() - startTime) / 1000);
    
    // Log this fetch operation
    await logFetchOperation(
      'scheduled',
      stats,
      durationSeconds,
      isVercelCron ? 'cron' : 'manual'
    );
    
    console.log(`✅ Fetch complete in ${durationSeconds}s`);
    
    return NextResponse.json({
      success: true,
      message: 'Price fetch completed successfully',
      stats: {
        total: stats.total,
        success: stats.success,
        failed: stats.failed,
        duration_seconds: durationSeconds,
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    const durationSeconds = Math.round((Date.now() - startTime) / 1000);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    console.error('❌ Scheduled fetch failed:', error);
    
    // Log the failure
    await logFetchOperation(
      'scheduled',
      { total: 0, success: 0, failed: 0, errors: [errorMessage] },
      durationSeconds,
      'cron'
    );
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggering
export async function POST(request: NextRequest) {
  return GET(request);
}
