import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || '';

  const q = encodeURIComponent(`name:"${name}"`);
  const url = `https://api.pokemontcg.io/v2/cards?q=${q}`;

  const apiKey = process.env.POKEMON_TCG_KEY;
  const headers: Record<string,string> = {
    'Accept': 'application/json',
  };
  if (apiKey) headers['X-Api-Key'] = apiKey;

  try {
    const res = await fetch(url, { headers });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
