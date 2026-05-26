'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import Link from 'next/link';

interface HoldingWithPrice {
  cardId: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  card: {
    id: string;
    name: string;
    set_name: string;
    rarity: string;
    image_url: string;
  } | null;
  currentPrice: number;
  marketValue: number;
  costBasis: number;
  pnl: number;
  pnlPercent: number;
  change24h: number;
  lastUpdated: string | null;
}

interface TrackedCard {
  card_id: string;
  cards: { id: string; name: string; set_name: string; rarity: string; image_url: string } | null;
  latest_price?: { current_price: number; change_percent: number; updated_at: string } | null;
}

interface PricePoint {
  fetched_at: string;
  price_gbp: number;
}

interface Mover {
  card_id: string;
  card_name: string;
  current_price: number;
  change_percent: number;
  source: string;
}

type Tab = 'collection' | 'tracked' | 'movers';

function CollectionContent() {
  const searchParams = useSearchParams();
  const urlCardId = searchParams.get('cardId');

  const [holdings, setHoldings] = useState<HoldingWithPrice[]>([]);
  const [trackedCards, setTrackedCards] = useState<TrackedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('collection');

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedIsOwned, setSelectedIsOwned] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState<{name: string; set_name: string; rarity: string; image_url: string} | null>(null);
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyDays, setHistoryDays] = useState(30);

  const [summary, setSummary] = useState({ totalCostBasis: 0, totalMarketValue: 0, totalPnL: 0, totalPnLPercent: 0 });

  const [gainers, setGainers] = useState<Mover[]>([]);
  const [losers, setLosers] = useState<Mover[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState<'owned' | 'tracked'>('owned');
  const [modalCardId, setModalCardId] = useState('');
  const [modalSearch, setModalSearch] = useState('');
  const [modalSearchResults, setModalSearchResults] = useState<any[]>([]);
  const [modalSearching, setModalSearching] = useState(false);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalPurchasePrice, setModalPurchasePrice] = useState('');
  const [modalPurchaseDate, setModalPurchaseDate] = useState('');
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [inlineQty, setInlineQty] = useState(1);
  const [inlinePrice, setInlinePrice] = useState('');
  const [inlineDate, setInlineDate] = useState(new Date().toISOString().slice(0, 10));
  const [inlineSubmitting, setInlineSubmitting] = useState(false);
  const [inlineMessage, setInlineMessage] = useState('');

  const [fetching, setFetching] = useState(false);
  const [fetchMessage, setFetchMessage] = useState('');

  const pnlColor = (v: number) => (v > 0 ? 'text-emerald-400' : v < 0 ? 'text-rose-400' : 'text-slate-400');
  const pnlBg = (v: number) => (v > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : v < 0 ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20');
  const fmt = (n: number) => (n ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const loadData = useCallback(async () => {
    try {
      const [portfolioRes, trackedRes, moversRes] = await Promise.all([
        fetch('/api/portfolio'),
        fetch('/api/tracked-cards'),
        fetch('/api/prices/movers?limit=10&minChange=0.5'),
      ]);
      const portfolioData = await portfolioRes.json();
      const trackedData = await trackedRes.json();
      const moversData = await moversRes.json();

      setHoldings(portfolioData.holdingsWithPrices || []);
      setSummary({
        totalCostBasis: portfolioData.totalCostBasis || 0,
        totalMarketValue: portfolioData.totalMarketValue || 0,
        totalPnL: portfolioData.totalPnL || 0,
        totalPnLPercent: portfolioData.totalPnLPercent || 0,
      });
      setTrackedCards(trackedData.cards || []);
      setGainers(moversData.gainers || []);
      setLosers(moversData.losers || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    if (!urlCardId || selectedCardId) return;
    const isOwned = holdings.some(h => h.cardId === urlCardId);
    if (isOwned) {
      setSelectedCardId(urlCardId);
      setSelectedIsOwned(true);
      return;
    }
    (async () => {
      const [priceRes, cardRes] = await Promise.all([
        fetch(`/api/prices?cardId=${urlCardId}`),
        fetch(`/api/cards?cardId=${urlCardId}`),
      ]);
      const priceData = await priceRes.json();
      const cardData = await cardRes.json();

      if (cardData.card) {
        setSelectedCardData({
          name: cardData.card.name,
          set_name: cardData.card.set_name || '',
          rarity: cardData.card.rarity || '',
          image_url: cardData.card.image_url || '',
        });
      }
      setSelectedCardId(urlCardId);
      setSelectedIsOwned(false);
      if (priceData.price?.price) {
        setInlinePrice(priceData.price.price.toFixed(2));
      }
    })();
  }, [urlCardId, holdings, selectedCardId]);

  useEffect(() => {
    if (selectedCardId) loadPriceHistory(selectedCardId, historyDays);
  }, [selectedCardId, historyDays]);

  async function loadPriceHistory(cardId: string, days: number) {
    setLoadingHistory(true);
    try {
      const res = await fetch(`/api/prices/history?cardId=${cardId}&days=${days}`);
      const json = await res.json();
      setPriceHistory(json.prices || []);
    } catch (e) { console.error(e); }
    setLoadingHistory(false);
  }

  function selectCard(cardId: string, isOwned: boolean) {
    setSelectedCardId(cardId);
    setSelectedIsOwned(isOwned);
    setInlineQty(1);
    setInlineMessage('');
    if (!isOwned) {
      const h = holdings.find(h => h.cardId === cardId);
      const t = trackedCards.find(t => t.card_id === cardId);
      const price = h?.currentPrice ?? t?.latest_price?.current_price ?? 0;
      setInlinePrice(price ? price.toFixed(2) : '');
    }
    setInlineDate(new Date().toISOString().slice(0, 10));
  }

  async function handleAddOwned() {
    if (!modalCardId.trim() || modalQuantity < 1 || !modalPurchasePrice) return;
    setModalSubmitting(true);
    setModalMessage('');
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId: modalCardId.trim(),
          quantity: modalQuantity,
          purchasePrice: parseFloat(modalPurchasePrice),
          purchaseDate: modalPurchaseDate || new Date().toISOString().slice(0, 10),
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setModalMessage(`Added ${modalQuantity}x ${modalCardId.trim()}`);
        loadData();
      } else {
        setModalMessage(json.error || 'Failed');
      }
    } catch { setModalMessage('Request failed'); }
    setModalSubmitting(false);
  }

  async function handleAddTracked() {
    if (!modalCardId.trim()) return;
    setModalSubmitting(true);
    setModalMessage('');
    try {
      const res = await fetch('/api/tracked-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: modalCardId.trim() }),
      });
      const json = await res.json();
      if (res.ok) {
        setModalMessage(`Now tracking ${modalCardId.trim()}`);
        loadData();
      } else {
        setModalMessage(json.error || 'Failed');
      }
    } catch { setModalMessage('Request failed'); }
    setModalSubmitting(false);
  }

  async function handleRemoveOwned(cardId: string) {
    await fetch(`/api/portfolio?cardId=${encodeURIComponent(cardId)}`, { method: 'DELETE' });
    if (selectedCardId === cardId) setSelectedCardId(null);
    loadData();
  }

  async function handleRemoveTracked(cardId: string) {
    await fetch('/api/tracked-cards', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardId }),
    });
    if (selectedCardId === cardId) setSelectedCardId(null);
    loadData();
  }

  async function handleFetchNow() {
    setFetching(true);
    setFetchMessage('');
    try {
      const res = await fetch('/api/cron/fetch-prices', { method: 'POST' });
      const json = await res.json();
      setFetchMessage(res.ok
        ? `Fetched ${json.stats?.success || 0}/${json.stats?.total || 0} cards`
        : json.error || 'Failed');
      loadData();
    } catch { setFetchMessage('Failed'); }
    setFetching(false);
  }

  async function handleInlineAdd() {
    if (!selectedCardId || inlineQty < 1 || !inlinePrice) return;
    setInlineSubmitting(true);
    setInlineMessage('');
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId: selectedCardId,
          quantity: inlineQty,
          purchasePrice: parseFloat(inlinePrice),
          purchaseDate: inlineDate || new Date().toISOString().slice(0, 10),
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setSelectedIsOwned(true);
        loadData();
      } else {
        setInlineMessage(json.error || 'Failed');
      }
    } catch { setInlineMessage('Failed'); }
    setInlineSubmitting(false);
  }

  async function handleReset() {
    if (!confirm('Clear your entire collection?')) return;
    await fetch('/api/portfolio', { method: 'DELETE' });
    setSelectedCardId(null);
    loadData();
  }

  async function handleSearchCards(query: string) {
    setModalSearch(query);
    if (query.length < 2) { setModalSearchResults([]); return; }
    setModalSearching(true);
    try {
      const res = await fetch(`/api/tcg/cards?name=${encodeURIComponent(query)}&limit=20`);
      const json = await res.json();
      setModalSearchResults(json.data || []);
    } catch { setModalSearchResults([]); }
    setModalSearching(false);
  }

  const selectedHolding = selectedIsOwned
    ? holdings.find(h => h.cardId === selectedCardId)
    : null;

  const selectedTracked = !selectedIsOwned
    ? trackedCards.find(t => t.card_id === selectedCardId)
    : null;

  const selectedCardInfo = selectedHolding?.card || selectedTracked?.cards || selectedCardData || null;
  const [selectedCurrentPrice, setSelectedCurrentPrice] = useState(0);

  useEffect(() => {
    if (!selectedCardId) return;
    const h = holdings.find(h => h.cardId === selectedCardId);
    if (h) {
      setSelectedCurrentPrice(h.currentPrice);
      return;
    }
    const t = trackedCards.find(t => t.card_id === selectedCardId);
    if (t?.latest_price?.current_price) {
      setSelectedCurrentPrice(t.latest_price.current_price);
      return;
    }
    fetch(`/api/prices?cardId=${selectedCardId}`).then(r => r.json()).then(d => {
      setSelectedCurrentPrice(d.price?.price || 0);
    });
  }, [selectedCardId, holdings, trackedCards]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-slate-500 font-display text-sm tracking-widest uppercase animate-pulse">Loading...</div>
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
            <h1 className="font-display text-lg font-bold tracking-tight text-cyan-400">My Collection</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/market" className="font-display text-[10px] tracking-widest uppercase text-slate-500 hover:text-white px-3 py-1.5 border border-white/5 rounded-lg transition-colors">
              Market
            </Link>
            <button onClick={handleFetchNow} disabled={fetching} className="font-display text-[10px] tracking-widest uppercase text-purple-400/60 hover:text-purple-400 px-3 py-1.5 border border-purple-500/10 rounded-lg transition-colors disabled:opacity-50">
              {fetching ? '...' : 'Fetch Prices'}
            </button>
          </div>
        </div>
        {fetchMessage && (
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-2">
            <span className={`font-data text-[10px] ${fetchMessage.includes('Fetched') ? 'text-emerald-400' : 'text-rose-400'}`}>{fetchMessage}</span>
          </div>
        )}
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
        {/* Summary row — always visible */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="glass rounded-xl p-3 border border-white/5">
            <div className="font-display text-[9px] tracking-wider text-slate-500 uppercase mb-0.5">Collection Value</div>
            <div className="font-data text-xl font-bold text-white">£{fmt(summary.totalMarketValue)}</div>
          </div>
          <div className="glass rounded-xl p-3 border border-white/5">
            <div className="font-display text-[9px] tracking-wider text-slate-500 uppercase mb-0.5">Total Paid</div>
            <div className="font-data text-xl font-bold text-white">£{fmt(summary.totalCostBasis)}</div>
          </div>
          <div className="glass rounded-xl p-3 border border-white/5">
            <div className="font-display text-[9px] tracking-wider text-slate-500 uppercase mb-0.5">Total P&L</div>
            <div className={`font-data text-xl font-bold ${pnlColor(summary.totalPnL)}`}>
              {summary.totalPnL >= 0 ? '+' : ''}£{fmt(Math.abs(summary.totalPnL))}
            </div>
          </div>
          <div className="glass rounded-xl p-3 border border-white/5">
            <div className="font-display text-[9px] tracking-wider text-slate-500 uppercase mb-0.5">Return</div>
            <div className={`font-data text-xl font-bold ${pnlColor(summary.totalPnLPercent)}`}>
              {summary.totalPnLPercent >= 0 ? '+' : ''}{summary.totalPnLPercent}%
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4 border-b border-white/5 pb-2">
          {(['collection', 'tracked', 'movers'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-display tracking-widest uppercase transition-colors ${
                tab === t ? 'bg-cyan-500/15 text-cyan-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {t === 'collection' ? `My Cards (${holdings.length})` : t === 'tracked' ? `Tracked (${trackedCards.length})` : `Movers (${gainers.length + losers.length})`}
            </button>
          ))}
          <div className="flex-1" />
          <button
            onClick={() => { setShowAddModal(true); setAddMode('owned'); setModalCardId(''); setModalSearch(''); setModalSearchResults([]); setModalQuantity(1); setModalPurchasePrice(''); setModalPurchaseDate(new Date().toISOString().slice(0, 10)); setModalMessage(''); }}
            className="px-3 py-1.5 rounded-lg text-[10px] font-display tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
          >
            + Add Card
          </button>
          {holdings.length > 0 && (
            <button onClick={handleReset} className="px-2 py-1.5 rounded-lg text-[10px] font-display tracking-widest uppercase text-rose-500/50 hover:text-rose-400 transition-colors">
              Clear
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-4">
          {/* Left: card list */}
          <div className="lg:col-span-5">
            {tab === 'collection' && (
              holdings.length === 0 ? (
                <div className="glass rounded-xl p-12 border border-white/5 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-sm">No cards yet. Add cards you own to track their value.</p>
                </div>
              ) : (
                <div className="glass rounded-xl border border-white/5 divide-y divide-white/[0.03] max-h-[calc(100vh-280px)] overflow-y-auto">
                  {holdings.map(h => (
                    <div
                      key={h.cardId}
                      onClick={() => selectCard(h.cardId, true)}
                      className={`px-4 py-3 cursor-pointer transition-colors ${selectedCardId === h.cardId && selectedIsOwned ? 'bg-cyan-500/5' : 'hover:bg-white/[0.02]'}`}
                    >
                      <div className="flex items-center gap-3">
                        {h.card?.image_url ? (
                          <img src={h.card.image_url} alt={h.card.name} className="w-10 h-14 object-contain rounded bg-slate-800/50" />
                        ) : (
                          <div className="w-10 h-14 rounded bg-slate-800/50 flex items-center justify-center text-slate-600 text-xs">?</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-sm font-semibold text-white truncate">{h.card?.name || h.cardId}</div>
                          <div className="font-data text-[10px] text-slate-500">{h.card?.set_name || 'Unknown'} · {h.quantity}x @ £{h.purchasePrice.toFixed(2)}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-data text-sm font-bold">£{h.marketValue.toFixed(2)}</span>
                            <span className={`font-data text-[10px] px-1.5 py-0.5 rounded border ${pnlBg(h.pnl)}`}>{h.pnl >= 0 ? '+' : ''}{h.pnlPercent}%</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                          <span className={`font-data text-xs ${pnlColor(h.pnl)}`}>{h.pnl >= 0 ? '+' : ''}£{Math.abs(h.pnl).toFixed(2)}</span>
                          {h.change24h !== 0 && <span className={`font-data text-[9px] ${pnlColor(h.change24h)}`}>24h {h.change24h >= 0 ? '+' : ''}{h.change24h}%</span>}
                          <button onClick={e => { e.stopPropagation(); handleRemoveOwned(h.cardId); }} className="text-[9px] text-slate-600 hover:text-rose-400">remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {tab === 'tracked' && (
              trackedCards.length === 0 ? (
                <div className="glass rounded-xl p-12 border border-white/5 text-center">
                  <p className="text-slate-500 text-sm">No tracked cards. Add cards to fetch their prices automatically.</p>
                </div>
              ) : (
                <div className="glass rounded-xl border border-white/5 divide-y divide-white/[0.03] max-h-[calc(100vh-280px)] overflow-y-auto">
                  {trackedCards.map(t => (
                    <div
                      key={t.card_id}
                      onClick={() => selectCard(t.card_id, false)}
                      className={`px-4 py-3 cursor-pointer transition-colors ${selectedCardId === t.card_id && !selectedIsOwned ? 'bg-cyan-500/5' : 'hover:bg-white/[0.02]'}`}
                    >
                      <div className="flex items-center gap-3">
                        {t.cards?.image_url ? (
                          <img src={t.cards.image_url} alt={t.cards.name} className="w-10 h-14 object-contain rounded bg-slate-800/50" />
                        ) : (
                          <div className="w-10 h-14 rounded bg-slate-800/50 flex items-center justify-center text-slate-600 text-xs">?</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-sm font-semibold text-white truncate">{t.cards?.name || t.card_id}</div>
                          <div className="font-data text-[10px] text-slate-500">{t.cards?.set_name || 'Unknown'}</div>
                          {t.latest_price ? (
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-data text-sm font-bold">£{t.latest_price.current_price?.toFixed(2)}</span>
                              <span className={`font-data text-[10px] px-1.5 py-0.5 rounded border ${pnlBg(t.latest_price.change_percent)}`}>{t.latest_price.change_percent >= 0 ? '+' : ''}{t.latest_price.change_percent}%</span>
                            </div>
                          ) : (
                            <span className="font-data text-[10px] text-slate-600 mt-0.5 block">No price yet</span>
                          )}
                        </div>
                        <button onClick={e => { e.stopPropagation(); handleRemoveTracked(t.card_id); }} className="text-[9px] text-slate-600 hover:text-rose-400">remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {tab === 'movers' && (
              <div className="space-y-3">
                {gainers.length === 0 && losers.length === 0 ? (
                  <div className="glass rounded-xl p-12 border border-white/5 text-center">
                    <p className="text-slate-500 text-sm">No movers yet. Price data needed first.</p>
                  </div>
                ) : (
                  <>
                    {gainers.length > 0 && (
                      <div className="glass rounded-xl border border-white/5">
                        <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span className="font-display text-[10px] tracking-wider uppercase text-emerald-400 font-bold">Gainers</span>
                        </div>
                        <div className="divide-y divide-white/[0.03]">
                          {gainers.map(g => (
                            <div key={g.card_id} onClick={() => selectCard(g.card_id, false)} className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors">
                              <span className="font-display text-sm text-white truncate">{g.card_name}</span>
                              <div className="text-right ml-4">
                                <span className="font-data text-sm font-bold">£{g.current_price?.toFixed(2)}</span>
                                <span className="ml-2 font-data text-[10px] text-emerald-400">+{g.change_percent?.toFixed(1)}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {losers.length > 0 && (
                      <div className="glass rounded-xl border border-white/5">
                        <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          <span className="font-display text-[10px] tracking-wider uppercase text-rose-400 font-bold">Losers</span>
                        </div>
                        <div className="divide-y divide-white/[0.03]">
                          {losers.map(l => (
                            <div key={l.card_id} onClick={() => selectCard(l.card_id, false)} className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors">
                              <span className="font-display text-sm text-white truncate">{l.card_name}</span>
                              <div className="text-right ml-4">
                                <span className="font-data text-sm font-bold">£{l.current_price?.toFixed(2)}</span>
                                <span className="ml-2 font-data text-[10px] text-rose-400">{l.change_percent?.toFixed(1)}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right: detail panel */}
          <div className="lg:col-span-7">
            {selectedCardId && selectedCardInfo ? (
              <div className="space-y-4">
                {/* Card header */}
                <div className="glass rounded-xl p-4 border border-white/5">
                  <div className="flex items-start gap-4">
                    {selectedCardInfo.image_url && (
                      <img src={selectedCardInfo.image_url} alt={selectedCardInfo.name} className="w-20 h-28 object-contain rounded-lg bg-slate-800/50" />
                    )}
                    <div className="flex-1">
                      <h2 className="font-display text-xl font-bold text-white mb-1">{selectedCardInfo.name}</h2>
                      <div className="font-data text-xs text-slate-500 mb-3">{selectedCardInfo.set_name} · {selectedCardInfo.rarity}</div>

                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {selectedHolding ? (
                          <>
                            <div className="bg-slate-800/50 rounded-lg px-3 py-2 text-center">
                              <div className="font-display text-[9px] text-slate-500 uppercase tracking-wider">Paid</div>
                              <div className="font-data text-sm font-bold">£{selectedHolding.purchasePrice.toFixed(2)}</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg px-3 py-2 text-center">
                              <div className="font-display text-[9px] text-slate-500 uppercase tracking-wider">Now</div>
                              <div className="font-data text-sm font-bold">£{selectedCurrentPrice.toFixed(2)}</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg px-3 py-2 text-center">
                              <div className="font-display text-[9px] text-slate-500 uppercase tracking-wider">P&L</div>
                              <div className={`font-data text-sm font-bold ${pnlColor(selectedHolding.pnl)}`}>{selectedHolding.pnl >= 0 ? '+' : ''}{selectedHolding.pnlPercent}%</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-slate-800/50 rounded-lg px-3 py-2 text-center col-span-3">
                              <div className="font-display text-[9px] text-slate-500 uppercase tracking-wider">Current Price</div>
                              <div className="font-data text-sm font-bold">£{selectedCurrentPrice.toFixed(2)}</div>
                            </div>
                          </>
                        )}
                      </div>

                      {selectedHolding && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-data mb-2">
                          <span>Qty: {selectedHolding.quantity}</span>
                          <span>·</span>
                          <span>Total paid: £{selectedHolding.costBasis.toFixed(2)}</span>
                          <span>·</span>
                          <span>Value: £{selectedHolding.marketValue.toFixed(2)}</span>
                          <span>·</span>
                          <span className={`font-bold ${pnlColor(selectedHolding.pnl)}`}>{selectedHolding.pnl >= 0 ? '+' : ''}£{Math.abs(selectedHolding.pnl).toFixed(2)}</span>
                        </div>
                      )}

                      {selectedHolding && (
                        <div className="flex items-center gap-3 text-xs font-data">
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span className="text-slate-400">Acquired {new Date(selectedHolding.purchaseDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <span className={`font-bold ${pnlColor(selectedHolding.pnl)}`}>
                            {selectedHolding.pnl >= 0 ? '+' : ''}£{Math.abs(selectedHolding.pnl).toFixed(2)} ({selectedHolding.pnlPercent}%)
                          </span>
                        </div>
                      )}

                      {selectedHolding ? (
                        <div className="mt-3 border-t border-white/5 pt-3">
                          <button
                            onClick={() => handleRemoveOwned(selectedCardId!)}
                            className="w-full font-display text-xs tracking-wider uppercase font-bold py-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 transition-colors"
                          >
                            ✕ Remove from Collection
                          </button>
                        </div>
                      ) : (
                        <div className="mt-3 border-t border-white/5 pt-3">
                          <div className="font-display text-[10px] tracking-wider uppercase text-cyan-400 font-bold mb-2">+ Add to My Collection</div>
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <div>
                              <label className="font-display text-[9px] tracking-wider uppercase text-slate-500 block mb-0.5">Qty</label>
                              <input type="number" min="1" value={inlineQty} onChange={e => setInlineQty(Math.max(1, parseInt(e.target.value) || 1))} className="w-full bg-slate-800/50 border border-white/10 rounded px-2 py-1.5 text-sm text-white font-data focus:border-cyan-500 focus:outline-none" />
                            </div>
                            <div>
                              <label className="font-display text-[9px] tracking-wider uppercase text-slate-500 block mb-0.5">Paid (£)</label>
                              <input type="number" step="0.01" min="0" value={inlinePrice} onChange={e => setInlinePrice(e.target.value)} placeholder="0.00" className="w-full bg-slate-800/50 border border-white/10 rounded px-2 py-1.5 text-sm text-white font-data focus:border-cyan-500 focus:outline-none" />
                            </div>
                            <div>
                              <label className="font-display text-[9px] tracking-wider uppercase text-slate-500 block mb-0.5">Date</label>
                              <input type="date" value={inlineDate} onChange={e => setInlineDate(e.target.value)} className="w-full bg-slate-800/50 border border-white/10 rounded px-2 py-1.5 text-sm text-white font-data focus:border-cyan-500 focus:outline-none" />
                            </div>
                          </div>
                          <button
                            onClick={handleInlineAdd}
                            disabled={inlineSubmitting || !inlinePrice}
                            className="w-full font-display text-xs tracking-wider uppercase font-bold py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/20 transition-colors disabled:opacity-40"
                          >
                            {inlineSubmitting ? 'Adding...' : '+ Add to My Collection'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="glass rounded-xl p-4 border border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-xs font-bold text-white tracking-wider uppercase">Price Timeline</h3>
                    <div className="flex gap-1">
                      {[7, 30, 90].map(d => (
                        <button key={d} onClick={() => setHistoryDays(d)} className={`px-2 py-1 rounded text-[10px] font-display tracking-wider uppercase transition-colors ${historyDays === d ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>
                          {d}d
                        </button>
                      ))}
                    </div>
                  </div>
                  {loadingHistory ? (
                    <div className="h-56 flex items-center justify-center text-slate-600 text-sm">Loading...</div>
                  ) : priceHistory.length < 2 ? (
                    <div className="h-56 flex items-center justify-center text-slate-600 text-sm">Not enough price data yet</div>
                  ) : (
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={priceHistory.map(p => ({
                          date: new Date(p.fetched_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
                          price: p.price_gbp,
                        }))}>
                          <defs>
                            <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} tickFormatter={v => `£${v}`} />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} labelStyle={{ color: '#94a3b8' }} formatter={(value: any) => [`£${Number(value).toFixed(2)}`, 'Price']} />
                          {selectedHolding && (
                            <ReferenceLine y={selectedHolding.purchasePrice} stroke="#f59e0b" strokeDasharray="6 4" strokeWidth={1} label={{ value: `Paid £${selectedHolding.purchasePrice.toFixed(2)}`, fill: '#f59e0b', fontSize: 10, position: 'insideTopRight' }} />
                          )}
                          <Area type="monotone" dataKey="price" stroke="#06b6d4" fill="url(#cg)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

                {/* Price history table */}
                {priceHistory.length > 0 && (
                  <div className="glass rounded-xl border border-white/5 overflow-hidden">
                    <div className="px-4 py-2 border-b border-white/5">
                      <h3 className="font-display text-[10px] font-bold text-slate-400 tracking-wider uppercase">Recent Prices</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5 text-left">
                            <th className="px-4 py-1.5 font-display text-[9px] tracking-wider uppercase text-slate-500">Date</th>
                            <th className="px-4 py-1.5 font-display text-[9px] tracking-wider uppercase text-slate-500">Price</th>
                            <th className="px-4 py-1.5 font-display text-[9px] tracking-wider uppercase text-slate-500">Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {priceHistory.slice().reverse().slice(0, 8).map((r, i, arr) => {
                            const prev = arr[i + 1]?.price_gbp;
                            const change = prev ? ((r.price_gbp - prev) / prev * 100).toFixed(1) : null;
                            return (
                              <tr key={r.fetched_at} className="border-b border-white/[0.02]">
                                <td className="px-4 py-1.5 font-data text-xs text-slate-400">{new Date(r.fetched_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</td>
                                <td className="px-4 py-1.5 font-data text-xs font-bold">£{r.price_gbp.toFixed(2)}</td>
                                <td className="px-4 py-1.5 font-data text-xs">
                                  {change ? <span className={pnlColor(parseFloat(change))}>{parseFloat(change) >= 0 ? '+' : ''}{change}%</span> : <span className="text-slate-600">—</span>}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass rounded-xl p-16 border border-white/5 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">Select a Card</h3>
                <p className="font-body text-sm text-slate-500">
                  Choose a card from the list to view price history and P&L
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
          <div className="glass rounded-2xl border border-white/10 p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            {/* Mode toggle */}
            <div className="flex gap-1 mb-4 p-1 bg-slate-800/50 rounded-lg">
              <button
                onClick={() => setAddMode('owned')}
                className={`flex-1 py-1.5 rounded-md text-[10px] font-display tracking-wider uppercase transition-colors ${addMode === 'owned' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500'}`}
              >
                Add to My Cards
              </button>
              <button
                onClick={() => setAddMode('tracked')}
                className={`flex-1 py-1.5 rounded-md text-[10px] font-display tracking-wider uppercase transition-colors ${addMode === 'tracked' ? 'bg-purple-500/20 text-purple-400' : 'text-slate-500'}`}
              >
                Track for Prices
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-display text-[10px] tracking-wider uppercase text-slate-400 block mb-1">Search Card</label>
                <input
                  type="text"
                  value={modalSearch}
                  onChange={e => handleSearchCards(e.target.value)}
                  placeholder="e.g., Charizard, Pikachu..."
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-data focus:border-cyan-500 focus:outline-none"
                />
                {modalSearching && <p className="text-[10px] text-slate-500 mt-1">Searching...</p>}
                {modalSearchResults.length > 0 && (
                  <div className="mt-2 max-h-56 overflow-y-auto border border-white/5 rounded-lg bg-slate-900/80">
                    {modalSearchResults.slice(0, 15).map((c: any) => (
                      <button
                        key={c.id}
                        onClick={() => { setModalCardId(c.id); setModalSearch(c.name); setModalSearchResults([]); if (!modalPurchasePrice && c.currentPrice) setModalPurchasePrice(c.currentPrice.toFixed(2)); }}
                        className={`w-full px-3 py-2.5 text-left flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/[0.02] last:border-0 ${modalCardId === c.id ? 'bg-cyan-500/10' : ''}`}
                      >
                        {c.images?.small ? (
                          <img src={c.images.small} alt={c.name} className="w-9 h-12 object-contain rounded bg-slate-800/50 flex-shrink-0" />
                        ) : (
                          <div className="w-9 h-12 rounded bg-slate-800/50 flex-shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="font-display text-sm text-white truncate leading-tight">{c.name}</div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-data text-[10px] text-cyan-400/70">{c.setName}</span>
                            {c.rarity && c.rarity !== 'Unknown' && (
                              <>
                                <span className="text-slate-700 text-[8px]">·</span>
                                <span className="font-data text-[10px] text-amber-400/60">{c.rarity}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {modalCardId && (
                <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-lg px-3 py-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="font-data text-xs text-cyan-400">Selected: {modalCardId}</span>
                </div>
              )}

              {addMode === 'owned' && (
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-display text-[10px] tracking-wider uppercase text-slate-400 block mb-1">Qty</label>
                    <input type="number" min="1" value={modalQuantity} onChange={e => setModalQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-data focus:border-cyan-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="font-display text-[10px] tracking-wider uppercase text-slate-400 block mb-1">Paid (£)</label>
                    <input type="number" step="0.01" min="0" value={modalPurchasePrice} onChange={e => setModalPurchasePrice(e.target.value)} placeholder="0.00" className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-data focus:border-cyan-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="font-display text-[10px] tracking-wider uppercase text-slate-400 block mb-1">Date</label>
                    <input type="date" value={modalPurchaseDate} onChange={e => setModalPurchaseDate(e.target.value)} className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-data focus:border-cyan-500 focus:outline-none" />
                  </div>
                </div>
              )}

              {modalMessage && (
                <p className={`text-sm ${modalMessage.includes('Added') || modalMessage.includes('tracking') ? 'text-emerald-400' : 'text-rose-400'}`}>{modalMessage}</p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={addMode === 'owned' ? handleAddOwned : handleAddTracked}
                  disabled={modalSubmitting}
                  className={`flex-1 font-display text-xs tracking-wider uppercase font-bold py-2.5 rounded-lg transition-colors disabled:opacity-50 ${
                    addMode === 'owned'
                      ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400'
                      : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400'
                  }`}
                >
                  {modalSubmitting ? 'Adding...' : addMode === 'owned' ? 'Add to My Cards' : 'Start Tracking'}
                </button>
                <button onClick={() => setShowAddModal(false)} className="px-4 bg-slate-700/30 hover:bg-slate-700/50 text-slate-400 font-display text-xs tracking-wider uppercase py-2.5 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center"><div className="text-slate-500 font-display text-sm tracking-widest uppercase animate-pulse">Loading...</div></div>}>
      <CollectionContent />
    </Suspense>
  );
}
