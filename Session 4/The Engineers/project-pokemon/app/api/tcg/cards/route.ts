import { NextResponse } from 'next/server';

// TCG Pocket set IDs - these are digital-only cards that don't exist as real physical cards
const TCG_POCKET_SETS = new Set([
  'A1', 'A1a', 'A2', 'A2a', 'A2b', 'A3', 'A4', 'A4a', // Main sets
  'P-A', // Promos
  'B1', 'B2' // Future sets
]);

function isTcgPocketCard(card: any): boolean {
  // Check if the card's image URL contains '/tcgp/' (TCG Pocket path)
  if (card.image && card.image.includes('/tcgp/')) {
    return true;
  }
  // Check if the card ID starts with a TCG Pocket set prefix
  const cardId = card.id || '';
  for (const setId of TCG_POCKET_SETS) {
    if (cardId.startsWith(setId + '-')) {
      return true;
    }
  }
  return false;
}

// Cache for set release dates to avoid repeated fetches
const setCache = new Map<string, { name: string; releaseDate: string }>();

async function getSetInfo(setId: string): Promise<{ name: string; releaseDate: string }> {
  // Check cache first
  if (setCache.has(setId)) {
    return setCache.get(setId)!;
  }
  
  try {
    const res = await fetch(`https://api.tcgdex.net/v2/en/sets/${setId}`);
    if (res.ok) {
      const setData = await res.json();
      const info = {
        name: setData.name || setId,
        releaseDate: setData.releaseDate || '9999-99-99'
      };
      setCache.set(setId, info);
      return info;
    }
  } catch (e) {
    // Fallback to default
  }
  
  const defaultInfo = { name: setId, releaseDate: '9999-99-99' };
  setCache.set(setId, defaultInfo);
  return defaultInfo;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || '';

  try {
    // Fetch cards for the pokemon
    const cardsUrl = `https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(name)}`;
    const cardsRes = await fetch(cardsUrl);
    if (!cardsRes.ok) {
      return NextResponse.json({ data: [], sets: [] }, { status: 200 });
    }
    const cards = await cardsRes.json();
    
    // Filter out TCG Pocket cards and cards without images
    const realCards = cards.filter((card: any) => !isTcgPocketCard(card) && card.image);
    
    // Get unique set IDs from cards
    const setIds = new Set<string>();
    realCards.forEach((card: any) => {
      const setId = card.id?.split('-')[0];
      if (setId) setIds.add(setId);
    });
    
    // Fetch set details for each unique set
    const setInfos = await Promise.all(
      Array.from(setIds).map(async (setId) => {
        const info = await getSetInfo(setId);
        return { id: setId, ...info };
      })
    );
    
    // Build a map of setId -> { name, releaseDate }
    const setMap = new Map<string, { name: string; releaseDate: string }>();
    setInfos.forEach((info) => {
      setMap.set(info.id, { name: info.name, releaseDate: info.releaseDate });
    });
    
    // Add set info to each card and sort by release date (oldest first)
    const cardsWithSetInfo = realCards.map((card: any) => {
      const setId = card.id?.split('-')[0] || '';
      const setInfo = setMap.get(setId);
      return {
        ...card,
        setId,
        setName: setInfo?.name || setId,
        releaseDate: setInfo?.releaseDate || '9999-99-99'
      };
    });
    
    // Sort by release date (oldest first), then by card id
    cardsWithSetInfo.sort((a: any, b: any) => {
      const dateCompare = a.releaseDate.localeCompare(b.releaseDate);
      if (dateCompare !== 0) return dateCompare;
      return a.id.localeCompare(b.id);
    });
    
    // Build unique sets list for filter dropdown
    const uniqueSets = setInfos
      .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
    
    // Transform to expected format
    const transformedData = {
      data: cardsWithSetInfo.map((card: any) => ({
        id: card.id,
        name: card.name,
        setId: card.setId,
        setName: card.setName,
        releaseDate: card.releaseDate,
        images: {
          small: card.image ? `${card.image}/low.png` : null,
          large: card.image ? `${card.image}/high.png` : null
        }
      })),
      sets: uniqueSets
    };
    
    return NextResponse.json(transformedData, { status: 200 });
  } catch (e) {
    return NextResponse.json({ data: [], sets: [] }, { status: 200 });
  }
}
