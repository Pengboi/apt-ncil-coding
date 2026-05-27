'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MoverCard {
  card_id: string;
  card_name: string;
  current_price: number;
  change_percent: number;
  source: string;
}

interface TopCard {
  card_id: string;
  name: string;
  set_name: string;
  rarity: string;
  image_url: string | null;
  current_price: number;
  change_percent: number;
  source: string;
}

export default function MarketPage() {
  const [gainers, setGainers] = useState<MoverCard[]>([]);
  const [losers, setLosers] = useState<MoverCard[]>([]);
  const [topCards, setTopCards] = useState<TopCard[]>([]);
  const [totalCards, setTotalCards] = useState(0);
  const [totalPriced, setTotalPriced] = useState(0);
  const [totalSets, setTotalSets] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [moversRes, topRes] = await Promise.all([
          fetch('/api/prices/movers?limit=10&minChange=0.5'),
          fetch('/api/prices/top?limit=20&by=price'),
        ]);

        const moversData = await moversRes.json();
        const topData = await topRes.json();

        setGainers(moversData.gainers || []);
        setLosers(moversData.losers || []);
        setTopCards(topData.data || []);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/prices/stats');
        if (res.ok) {
          const data = await res.json();
          setTotalCards(data.totalCards || 0);
          setTotalPriced(data.totalPriced || 0);
          setTotalSets(data.totalSets || 0);
        }
      } catch {}
    }
    loadStats();
  }, []);

  const pnlColor = (v: number) => (v > 0 ? 'text-emerald-400' : v < 0 ? 'text-rose-400' : 'text-slate-400');
  const pnlBg = (v: number) => (v > 0 ? 'bg-emerald-500/10 border-emerald-500/20' : v < 0 ? 'bg-rose-500/10 border-rose-500/20' : 'bg-slate-500/10 border-slate-500/20');
  const fmt = (n: number) => (n ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const hasMovers = gainers.length > 0 || losers.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-slate-500 font-display text-sm tracking-widest uppercase animate-pulse">Loading market data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#050505]/90 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <div className="w-7 h-7 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-cyan-400 transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <span className="font-display tracking-widest text-[10px] uppercase font-bold">Back</span>
            </Link>
            <div className="w-px h-6 bg-white/5" />
            <h1 className="font-display text-lg font-bold tracking-tight">
              <span className="text-cyan-400">Market</span> Overview
            </h1>
          </div>
          <Link href="/collection" className="font-display text-[10px] tracking-widest uppercase text-slate-500 hover:text-white px-3 py-1.5 border border-white/5 rounded-lg transition-colors">
            My Collection
          </Link>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glass rounded-xl p-4 border border-white/5">
            <div className="font-display text-[9px] tracking-wider text-slate-500 uppercase mb-1">Cards in DB</div>
            <div className="font-data text-2xl font-bold text-white">{totalCards.toLocaleString()}</div>
          </div>
          <div className="glass rounded-xl p-4 border border-white/5">
            <div className="font-display text-[9px] tracking-wider text-slate-500 uppercase mb-1">Priced Cards</div>
            <div className="font-data text-2xl font-bold text-cyan-400">{totalPriced.toLocaleString()}</div>
          </div>
          <div className="glass rounded-xl p-4 border border-white/5">
            <div className="font-display text-[9px] tracking-wider text-slate-500 uppercase mb-1">Gainers</div>
            <div className="font-data text-2xl font-bold text-emerald-400">{gainers.length}</div>
          </div>
          <div className="glass rounded-xl p-4 border border-white/5">
            <div className="font-display text-[9px] tracking-wider text-slate-500 uppercase mb-1">Losers</div>
            <div className="font-data text-2xl font-bold text-rose-400">{losers.length}</div>
          </div>
        </div>

        {/* Top Valued Cards — always visible */}
        <div className="glass rounded-xl border border-white/5">
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <h2 className="font-display text-xs font-bold tracking-wider uppercase text-amber-400">Top Valued Cards</h2>
            <span className="font-data text-[10px] text-slate-600 ml-auto">{topCards.length} cards</span>
          </div>
          {topCards.length === 0 ? (
            <div className="p-8 text-center text-slate-600 font-display text-sm">No priced cards yet</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.03]">
              {topCards.slice(0, 20).map(card => (
                <Link
                  key={card.card_id}
                  href={`/collection?cardId=${card.card_id}`}
                  className="px-4 py-3 flex items-center gap-3 hover:bg-white/[0.02] transition-colors"
                >
                  {card.image_url ? (
                    <img src={card.image_url} alt={card.name} className="w-9 h-12 object-contain rounded bg-slate-800/50 flex-shrink-0" />
                  ) : (
                    <div className="w-9 h-12 rounded bg-slate-800/50 flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-sm font-semibold text-white truncate leading-tight">{card.name}</div>
                    <div className="font-data text-[10px] text-cyan-400/60 truncate">{card.set_name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-data text-sm font-bold">£{fmt(card.current_price)}</span>
                      {card.change_percent !== 0 && card.change_percent !== null && (
                        <span className={`font-data text-[10px] ${pnlColor(card.change_percent)}`}>
                          {card.change_percent >= 0 ? '+' : ''}{Number(card.change_percent).toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Movers — only if data exists */}
        {hasMovers && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass rounded-xl border border-white/5">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <h2 className="font-display text-xs font-bold tracking-wider uppercase text-emerald-400">Top Gainers (24h)</h2>
              </div>
              <div className="divide-y divide-white/[0.03]">
                {gainers.map(card => (
                  <Link key={card.card_id} href={`/collection?cardId=${card.card_id}`} className="px-4 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors block">
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-sm font-semibold text-white truncate">{card.card_name}</div>
                      <div className="font-data text-[10px] text-slate-500">{card.card_id}</div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="font-data text-sm font-bold text-white">£{Number(card.current_price).toFixed(2)}</div>
                      <div className="font-data text-[10px] text-emerald-400">+{Number(card.change_percent).toFixed(1)}%</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl border border-white/5">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <h2 className="font-display text-xs font-bold tracking-wider uppercase text-rose-400">Top Losers (24h)</h2>
              </div>
              <div className="divide-y divide-white/[0.03]">
                {losers.map(card => (
                  <Link key={card.card_id} href={`/collection?cardId=${card.card_id}`} className="px-4 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors block">
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-sm font-semibold text-white truncate">{card.card_name}</div>
                      <div className="font-data text-[10px] text-slate-500">{card.card_id}</div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="font-data text-sm font-bold text-white">£{Number(card.current_price).toFixed(2)}</div>
                      <div className="font-data text-[10px] text-rose-400">{Number(card.change_percent).toFixed(1)}%</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No movers note */}
        {!hasMovers && (
          <div className="glass rounded-xl p-6 border border-white/5 text-center">
            <div className="font-display text-[10px] tracking-wider uppercase text-slate-500 mb-1">Price Movers</div>
            <p className="text-sm text-slate-500">Movers will appear here after the next price fetch detects changes. Click <span className="text-cyan-400">Fetch Prices</span> on the Collection page to update.</p>
          </div>
        )}
      </main>
    </div>
  );
}
