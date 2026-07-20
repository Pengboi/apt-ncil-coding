"use client";

import { useEffect, useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface CardPriceDetailProps {
  card: {
    id: string;
    name: string;
    setName: string;
    setId: string;
    images?: { small?: string; large?: string };
    price?: number;
    previousPrice?: number;
    priceChange?: "up" | "down" | "stable";
  };
  onClose: () => void;
}

interface PricePoint {
  date: string;
  price: number;
  formattedDate: string;
}

interface PriceStats {
  first_price: number;
  last_price: number;
  min_price: number;
  max_price: number;
  avg_price: number;
  change_percent: number;
  change_amount: number;
  data_points: number;
}

export default function CardPriceDetail({ card, onClose }: CardPriceDetailProps) {
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [stats, setStats] = useState<PriceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);
  const [isVisible, setIsVisible] = useState(false);

  const [adding, setAdding] = useState(false);
  const [addQty, setAddQty] = useState(1);
  const [addPrice, setAddPrice] = useState('');
  const [addDate, setAddDate] = useState(new Date().toISOString().slice(0, 10));
  const [addMessage, setAddMessage] = useState('');
  const [inCollection, setInCollection] = useState(false);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  useEffect(() => {
    setAddQty(1);
    setAddPrice(card.price?.toFixed(2) || '');
    setAddDate(new Date().toISOString().slice(0, 10));
    setAddMessage('');
    setInCollection(false);
    fetch('/api/portfolio').then(r => r.json()).then(d => {
      const owned = (d.holdingsWithPrices || []).some((h: any) => h.cardId === card.id);
      setInCollection(owned);
    });
  }, [card.id, card.price]);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(
          `/api/prices/history?cardId=${card.id}&days=${days}&source=tcgplayer`
        );
        
        if (!res.ok) throw new Error("Failed to fetch price history");
        
        const data = await res.json();
        
        const formattedData: PricePoint[] = data.prices.map((p: any) => ({
          date: p.fetched_at,
          price: p.price_gbp,
          formattedDate: new Date(p.fetched_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          }),
        }));
        
        setPriceHistory(formattedData);
        setStats(data.stats);
      } catch (e) {
        setError("Could not load price history");
      } finally {
        setLoading(false);
      }
    };

    fetchPriceHistory();
  }, [card.id, days]);

  async function handleAddToCollection() {
    if (!addPrice || addQty < 1) return;
    setAdding(true);
    setAddMessage('');
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId: card.id,
          quantity: addQty,
          purchasePrice: parseFloat(addPrice),
          purchaseDate: addDate || new Date().toISOString().slice(0, 10),
        }),
      });
      if (res.ok) {
        setInCollection(true);
      } else {
        const json = await res.json();
        setAddMessage(json.error || 'Failed');
      }
    } catch {
      setAddMessage('Failed');
    }
    setAdding(false);
  }

  async function handleRemoveFromCollection() {
    setRemoving(true);
    setAddMessage('');
    try {
      const res = await fetch(`/api/portfolio?cardId=${encodeURIComponent(card.id)}`, { method: 'DELETE' });
      if (res.ok) {
        setInCollection(false);
      } else {
        setAddMessage('Failed to remove');
      }
    } catch {
      setAddMessage('Failed');
    }
    setRemoving(false);
  }

  const priceChange = card.previousPrice && card.price
    ? (((card.price - card.previousPrice) / card.previousPrice) * 100)
    : 0;
  const isUp = priceChange > 0;
  const isDown = priceChange < 0;

  const trend = useMemo(() => {
    if (priceHistory.length < 2) return "stable";
    const first = priceHistory[0].price;
    const last = priceHistory[priceHistory.length - 1].price;
    const change = ((last - first) / first) * 100;
    if (change > 5) return "up";
    if (change < -5) return "down";
    return "stable";
  }, [priceHistory]);

  const chartColor = trend === "up" ? "#10b981" : trend === "down" ? "#ef4444" : "#06b6d4";
  const gradientId = `gradient-${card.id}`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
          <p className="text-slate-400 text-xs mb-1">{label}</p>
          <p className="text-white font-bold text-lg">
            £{payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const pnlColor = (v: number) => (v > 0 ? 'text-emerald-400' : v < 0 ? 'text-rose-400' : 'text-slate-400');
  const fmt = (n: number) => (n ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-auto transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "rgba(10, 14, 39, 0.98)",
        backdropFilter: "blur(30px)",
      }}
      onClick={onClose}
    >
      <div
        className={`glass-strong rounded-2xl max-w-5xl w-full max-h-[88vh] overflow-hidden transition-all duration-300 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — compact */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <div className="min-w-0">
            <h2 className="font-display text-lg font-bold text-white truncate">{card.name}</h2>
            <p className="font-body text-xs text-slate-400">{card.setName} • {card.id}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex bg-slate-800/50 rounded-lg p-0.5">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    days === d ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
            <button onClick={onClose} className="btn btn-secondary p-1.5" aria-label="Close">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content — two columns, scrollable */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-5 overflow-y-auto max-h-[calc(88vh-52px)]">
          {/* Left: Card Image + Price + Add/Remove */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-700/50">
              <div className="aspect-[2.5/3.5] relative rounded-lg overflow-hidden max-h-[240px]">
                <img
                  src={card.images?.large || card.images?.small}
                  alt={card.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between px-3 py-2 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-400 text-xs">Current Price</span>
                  <span className="text-lg font-bold text-white">£{card.price?.toFixed(2) || "--"}</span>
                </div>
                {card.price && card.previousPrice && (
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-400 text-xs">24h Change</span>
                    <span className={`text-sm font-bold ${isUp ? "text-emerald-400" : isDown ? "text-red-400" : "text-slate-400"}`}>
                      {isUp ? "↑" : isDown ? "↓" : "→"}{Math.abs(priceChange).toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Add/Remove toggle */}
              <div className="mt-3 border-t border-slate-700/50 pt-3">
                {inCollection ? (
                  <button
                    onClick={handleRemoveFromCollection}
                    disabled={removing}
                    className="w-full font-display text-xs tracking-wider uppercase font-bold py-2.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 transition-colors disabled:opacity-40"
                  >
                    {removing ? 'Removing...' : '✕ Remove from Collection'}
                  </button>
                ) : (
                  <>
                    <div className="font-display text-[10px] tracking-wider uppercase text-cyan-400 font-bold mb-2">+ Add to My Collection</div>
                    <div className="grid grid-cols-3 gap-1.5 mb-2">
                      <div>
                        <label className="font-display text-[9px] tracking-wider uppercase text-slate-500 block mb-0.5">Qty</label>
                        <input type="number" min="1" value={addQty} onChange={e => setAddQty(Math.max(1, parseInt(e.target.value) || 1))} className="w-full bg-slate-900/50 border border-slate-700/50 rounded px-1.5 py-1 text-xs text-white font-data focus:border-cyan-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="font-display text-[9px] tracking-wider uppercase text-slate-500 block mb-0.5">Paid (£)</label>
                        <input type="number" step="0.01" min="0" value={addPrice} onChange={e => setAddPrice(e.target.value)} placeholder="0.00" className="w-full bg-slate-900/50 border border-slate-700/50 rounded px-1.5 py-1 text-xs text-white font-data focus:border-cyan-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="font-display text-[9px] tracking-wider uppercase text-slate-500 block mb-0.5">Date</label>
                        <input type="date" value={addDate} onChange={e => setAddDate(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700/50 rounded px-1 py-1 text-xs text-white font-data focus:border-cyan-500 focus:outline-none" />
                      </div>
                    </div>
                    <button
                      onClick={handleAddToCollection}
                      disabled={adding || !addPrice}
                      className="w-full font-display text-xs tracking-wider uppercase font-bold py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/20 transition-colors disabled:opacity-40"
                    >
                      {adding ? 'Adding...' : '+ Add to My Collection'}
                    </button>
                  </>
                )}
                {addMessage && (
                  <p className={`text-xs mt-1.5 text-rose-400`}>{addMessage}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Chart and Stats */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
              <h3 className="font-display text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Price History
              </h3>
              
              {loading ? (
                <div className="h-48 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
                </div>
              ) : error ? (
                <div className="h-48 flex items-center justify-center text-slate-400 text-sm">{error}</div>
              ) : priceHistory.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-slate-400 text-sm">No price data available yet</div>
              ) : (
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceHistory} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="formattedDate" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `£${value}`} domain={["auto", "auto"]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="price" stroke={chartColor} strokeWidth={2} fill={`url(#${gradientId})`} animationDuration={1000} />
                      {stats?.avg_price && (
                        <ReferenceLine y={stats.avg_price} stroke="#94a3b8" strokeDasharray="5 5" label={{ value: "Avg", fill: "#94a3b8", fontSize: 11 }} />
                      )}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-700/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-slate-400 text-[10px] uppercase tracking-wider">{days}d High</span>
                  </div>
                  <p className="text-lg font-bold text-white">£{stats.max_price.toFixed(2)}</p>
                </div>
                <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-700/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <span className="text-slate-400 text-[10px] uppercase tracking-wider">{days}d Low</span>
                  </div>
                  <p className="text-lg font-bold text-white">£{stats.min_price.toFixed(2)}</p>
                </div>
                <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-700/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-slate-400 text-[10px] uppercase tracking-wider">Average</span>
                  </div>
                  <p className="text-lg font-bold text-white">£{stats.avg_price.toFixed(2)}</p>
                </div>
                <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-700/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-slate-400 text-[10px] uppercase tracking-wider">Records</span>
                  </div>
                  <p className="text-lg font-bold text-white">{stats.data_points}</p>
                </div>
              </div>
            )}

            {stats && (
              <div className={`rounded-xl p-3 border ${
                trend === "up"
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : trend === "down"
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-slate-800/30 border-slate-700/50"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      trend === "up" ? "bg-emerald-500/20" : trend === "down" ? "bg-red-500/20" : "bg-slate-700/50"
                    }`}>
                      {trend === "up" ? (
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      ) : trend === "down" ? (
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {trend === "up" ? "Rising" : trend === "down" ? "Declining" : "Stable"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {stats.change_percent > 0 ? "+" : ""}{stats.change_percent.toFixed(1)}% over {days}d
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Range</p>
                    <p className="font-semibold text-white text-sm">£{stats.min_price.toFixed(0)} - £{stats.max_price.toFixed(0)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
