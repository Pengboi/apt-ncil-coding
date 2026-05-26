import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

interface Holding {
  cardId: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
}

interface Portfolio {
  holdings: Holding[];
  createdAt: string;
}

const PORTFOLIO_COOKIE = 'pokemon_portfolio';

function serialize(p: Portfolio): string {
  return JSON.stringify(p);
}

function deserialize(raw: string | undefined): Portfolio {
  if (!raw) return { holdings: [], createdAt: new Date().toISOString() };
  try {
    const p = JSON.parse(raw);
    return { holdings: p.holdings ?? [], createdAt: p.createdAt ?? new Date().toISOString() };
  } catch {
    return { holdings: [], createdAt: new Date().toISOString() };
  }
}

function setCookie(response: NextResponse, portfolio: Portfolio) {
  response.cookies.set(PORTFOLIO_COOKIE, serialize(portfolio), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  return response;
}

export async function GET() {
  const cookieStore = await cookies();
  const portfolio = deserialize(cookieStore.get(PORTFOLIO_COOKIE)?.value);

  const supabase = await createClient();

  if (portfolio.holdings.length === 0) {
    const empty = { holdingsWithPrices: [], totalCostBasis: 0, totalMarketValue: 0, totalPnL: 0, totalPnLPercent: 0 };
    return NextResponse.json(empty);
  }

  const cardIds = portfolio.holdings.map(h => h.cardId);

  const [cardsRes, snapshotsRes] = await Promise.all([
    supabase.from('cards').select('id, name, set_name, rarity, image_url').in('id', cardIds),
    supabase.from('price_snapshots').select('card_id, current_price, previous_price, change_percent, updated_at').in('card_id', cardIds),
  ]);

  const cardMap = new Map((cardsRes.data || []).map(c => [c.id, c]));
  const snapshotMap = new Map((snapshotsRes.data || []).map(s => [s.card_id, s]));

  let totalCostBasis = 0;
  let totalMarketValue = 0;

  const holdingsWithPrices = portfolio.holdings.map(holding => {
    const card = cardMap.get(holding.cardId);
    const snapshot = snapshotMap.get(holding.cardId);
    const currentPrice = snapshot?.current_price ?? 0;
    const marketValue = Math.round(currentPrice * holding.quantity * 100) / 100;
    const costBasis = Math.round(holding.purchasePrice * holding.quantity * 100) / 100;
    const pnl = Math.round((marketValue - costBasis) * 100) / 100;
    const pnlPercent = costBasis > 0 ? Math.round((pnl / costBasis) * 1000) / 10 : 0;

    totalCostBasis += costBasis;
    totalMarketValue += marketValue;

    return {
      ...holding,
      card: card || null,
      currentPrice,
      marketValue,
      costBasis,
      pnl,
      pnlPercent,
      change24h: snapshot?.change_percent ?? 0,
      lastUpdated: snapshot?.updated_at ?? null,
    };
  });

  const totalPnL = Math.round((totalMarketValue - totalCostBasis) * 100) / 100;
  const totalPnLPercent = totalCostBasis > 0 ? Math.round((totalPnL / totalCostBasis) * 1000) / 10 : 0;

  return NextResponse.json({
    holdingsWithPrices,
    totalCostBasis: Math.round(totalCostBasis * 100) / 100,
    totalMarketValue: Math.round(totalMarketValue * 100) / 100,
    totalPnL,
    totalPnLPercent,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { cardId, quantity, purchasePrice, purchaseDate } = body;

  if (!cardId || !quantity || quantity < 1 || purchasePrice == null || purchasePrice < 0) {
    return NextResponse.json({ error: 'cardId, quantity, and purchasePrice required' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const portfolio = deserialize(cookieStore.get(PORTFOLIO_COOKIE)?.value);

  const existing = portfolio.holdings.find(h => h.cardId === cardId);

  if (existing) {
    const totalQty = existing.quantity + quantity;
    const avgPrice = Math.round(
      ((existing.purchasePrice * existing.quantity) + (purchasePrice * quantity)) / totalQty * 100
    ) / 100;
    const earliestDate = existing.purchaseDate < purchaseDate ? existing.purchaseDate : purchaseDate;
    portfolio.holdings = portfolio.holdings.map(h =>
      h.cardId === cardId ? { ...h, quantity: totalQty, purchasePrice: avgPrice, purchaseDate: earliestDate } : h
    );
  } else {
    portfolio.holdings.push({
      cardId,
      quantity,
      purchasePrice: Math.round(purchasePrice * 100) / 100,
      purchaseDate: purchaseDate || new Date().toISOString().slice(0, 10),
    });
  }

  const response = NextResponse.json({ success: true, portfolio });
  return setCookie(response, portfolio);
}

export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies();
  const portfolio = deserialize(cookieStore.get(PORTFOLIO_COOKIE)?.value);

  const { searchParams } = new URL(request.url);
  const cardId = searchParams.get('cardId');

  if (cardId) {
    portfolio.holdings = portfolio.holdings.filter(h => h.cardId !== cardId);
    const response = NextResponse.json({ success: true, portfolio });
    return setCookie(response, portfolio);
  }

  const empty: Portfolio = { holdings: [], createdAt: new Date().toISOString() };
  const response = NextResponse.json({ success: true, portfolio: empty });
  return setCookie(response, empty);
}
