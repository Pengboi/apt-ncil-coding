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

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

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
        
        // Transform data for the chart
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

  const priceChange = card.previousPrice && card.price
    ? (((card.price - card.previousPrice) / card.previousPrice) * 100)
    : 0;
  const isUp = priceChange > 0;
  const isDown = priceChange < 0;

  // Calculate trend
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
        className={`glass-strong rounded-2xl max-w-6xl w-full p-6 max-h-[90vh] overflow-auto transition-all duration-300 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              {card.name}
            </h2>
            <p className="font-body text-sm text-slate-400 mt-1">
              {card.setName} • {card.id}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Timeframe selector */}
            <div className="flex bg-slate-800/50 rounded-lg p-1">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    days === d
                      ? "bg-cyan-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
            
            <button
              onClick={onClose}
              className="btn btn-secondary p-2"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Card Image */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
              <div className="aspect-[2.5/3.5] relative rounded-lg overflow-hidden">
                <img
                  src={card.images?.large || card.images?.small}
                  alt={card.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Quick Stats Below Image */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-400 text-sm">Current Price</span>
                  <span className="text-xl font-bold text-white">
                    £{card.price?.toFixed(2) || "--"}
                  </span>
                </div>
                
                {card.price && card.previousPrice && (
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-400 text-sm">24h Change</span>
                    <span
                      className={`text-lg font-bold ${
                        isUp ? "text-emerald-400" : isDown ? "text-red-400" : "text-slate-400"
                      }`}
                    >
                      {isUp ? "↑" : isDown ? "↓" : "→"}
                      {Math.abs(priceChange).toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Chart and Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Section */}
            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
              <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Price History
              </h3>
              
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
                </div>
              ) : error ? (
                <div className="h-64 flex items-center justify-center text-slate-400">
                  {error}
                </div>
              ) : priceHistory.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-slate-400">
                  No price data available yet
                </div>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis
                        dataKey="formattedDate"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `£${value}`}
                        domain={["auto", "auto"]}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={chartColor}
                        strokeWidth={2}
                        fill={`url(#${gradientId})`}
                        animationDuration={1000}
                      />
                      {stats?.avg_price && (
                        <ReferenceLine
                          y={stats.avg_price}
                          stroke="#94a3b8"
                          strokeDasharray="5 5"
                          label={{ value: "Avg", fill: "#94a3b8", fontSize: 12 }}
                        />
                      )}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Infographics Grid */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* 30d High */}
                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-slate-400 text-xs uppercase tracking-wider">{days}d High</span>
                  </div>
                  <p className="text-xl font-bold text-white">£{stats.max_price.toFixed(2)}</p>
                </div>

                {/* 30d Low */}
                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <span className="text-slate-400 text-xs uppercase tracking-wider">{days}d Low</span>
                  </div>
                  <p className="text-xl font-bold text-white">£{stats.min_price.toFixed(2)}</p>
                </div>

                {/* Average */}
                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-slate-400 text-xs uppercase tracking-wider">Average</span>
                  </div>
                  <p className="text-xl font-bold text-white">£{stats.avg_price.toFixed(2)}</p>
                </div>

                {/* Data Points */}
                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-slate-400 text-xs uppercase tracking-wider">Records</span>
                  </div>
                  <p className="text-xl font-bold text-white">{stats.data_points}</p>
                </div>
              </div>
            )}

            {/* Trend Indicator */}
            {stats && (
              <div className={`rounded-xl p-4 border ${
                trend === "up"
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : trend === "down"
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-slate-800/30 border-slate-700/50"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      trend === "up"
                        ? "bg-emerald-500/20"
                        : trend === "down"
                        ? "bg-red-500/20"
                        : "bg-slate-700/50"
                    }`}>
                      {trend === "up" ? (
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      ) : trend === "down" ? (
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {trend === "up" ? "📈 Rising Trend" : trend === "down" ? "📉 Declining Trend" : "➡️ Stable"}
                      </p>
                      <p className="text-sm text-slate-400">
                        {stats.change_percent > 0 ? "+" : ""}
                        {stats.change_percent.toFixed(1)}% over {days} days
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Price Range</p>
                    <p className="font-semibold text-white">
                      £{stats.min_price.toFixed(0)} - £{stats.max_price.toFixed(0)}
                    </p>
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
