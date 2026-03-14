import { NextResponse } from 'next/server';

type EbayPrice = {
  title: string;
  price: number;
  currency: string;
  soldDate: string;
  condition: string;
  itemUrl: string;
};

async function fetchEbayPrices(cardName: string): Promise<EbayPrice[]> {
  const searchQuery = `${cardName} pokemon card raw`;
  const encodedQuery = encodeURIComponent(searchQuery);
  
  try {
    const url = `https://www.ebay.co.uk/sch/i.html?_nkw=${encodedQuery}&_LH_BIN=1&LH_Sold=1&LH_Complete=1&_ipg=25&_oac=1`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });
    
    if (!response.ok) {
      return [];
    }
    
    const html = await response.text();
    const prices: EbayPrice[] = [];
    
    const priceRegex = /(?:£|\$)\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/g;
    const titleRegex = /class="s-item__title"[^>]*>(?:<span[^>]*>)?([^<]+)/g;
    const conditionRegex = /class="s-item__condition"[^>]*>([^<]+)/g;
    const dateRegex = /class="s-item__ended-date"[^>]*>([^<]+)/g;
    
    const lines = html.split('\n');
    const priceMatches: RegExpMatchArray | null[] = [];
    const titleMatches: string[] = [];
    const conditionMatches: string[] = [];
    const dateMatches: string[] = [];
    
    for (const line of lines) {
      const priceMatch = line.match(priceRegex);
      if (priceMatch) {
        priceMatches.push(...priceMatch);
      }
      
      const titleMatch = line.match(titleRegex);
      if (titleMatch && titleMatch[1] && !titleMatch[1].includes('Shop on eBay')) {
        titleMatches.push(titleMatch[1].trim());
      }
      
      const conditionMatch = line.match(conditionRegex);
      if (conditionMatch) {
        conditionMatches.push(conditionMatch[1].trim());
      }
      
      const dateMatch = line.match(dateRegex);
      if (dateMatch) {
        dateMatches.push(dateMatch[1].trim());
      }
    }
    
    const minLength = Math.min(
      priceMatches.length,
      titleMatches.length,
      conditionMatches.length,
      dateMatches.length
    );
    
    for (let i = 0; i < Math.min(50, minLength); i++) {
      const priceStr = priceMatches[i]?.[1]?.replace(/,/g, '') || '0';
      const price = parseFloat(priceStr);
      
        if (price > 0 && price < 10000) {
        prices.push({
          title: titleMatches[i] || '',
          price,
          currency: 'GBP',
          soldDate: dateMatches[i] || '',
          condition: conditionMatches[i] || 'Unknown',
          itemUrl: ''
        });
      }
    }
    
    return prices.slice(0, 10);
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || '';
  
  if (!name) {
    return NextResponse.json({ prices: [] }, { status: 200 });
  }
  
  try {
    const prices = await fetchEbayPrices(name);
    
    if (prices.length === 0) {
      const fallbackPrices = await fetchEbayPrices(name.replace(/-/g, ' '));
      return NextResponse.json({ prices: fallbackPrices }, { status: 200 });
    }
    
    return NextResponse.json({ prices }, { status: 200 });
  } catch {
    return NextResponse.json({ prices: [] }, { status: 200 });
  }
}
