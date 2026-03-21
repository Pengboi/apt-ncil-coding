'use client';

import { useState, useEffect } from 'react';

interface PricePoint {
  id: number;
  card_id: string;
  price_gbp: number;
  source: string;
  fetched_at: string;
}

export default function PriceTrackerPage() {
  const [cardId, setCardId] = useState('base1-4'); // Charizard
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<PricePoint[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Fetch price history on load
  useEffect(() => {
    fetchHistory();
  }, [cardId]);

  async function fetchHistory() {
    setLoadingHistory(true);
    try {
      const res = await fetch(`/api/prices/track?cardId=${cardId}&days=30`);
      const data = await res.json();
      setHistory(data.prices || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
    setLoadingHistory(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!price) return;

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/prices/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId,
          price: parseFloat(price),
          source: 'manual',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Price saved to Supabase!');
        setPrice('');
        fetchHistory(); // Refresh history
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to save price');
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
          📈 Pokemon Price Tracker
        </h1>
        <p className="text-center text-slate-400 mb-8">
          Track card prices over time with Supabase
        </p>

        {/* Price Entry Form */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Add Price Record</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Card ID</label>
                <input
                  type="text"
                  value={cardId}
                  onChange={(e) => setCardId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="e.g., base1-4"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Try: base1-4 (Charizard), base1-2 (Blastoise), base1-15 (Venusaur)
                </p>
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Price (£)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="e.g., 150.00"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : '💾 Save Price to Database'}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center ${
              message.includes('✅') ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Price History */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-cyan-400">
              Price History: {cardId}
            </h2>
            <span className="text-sm text-slate-400">
              {history.length} records
            </span>
          </div>

          {loadingHistory ? (
            <div className="text-center py-8 text-slate-500">Loading...</div>
          ) : history.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No price history yet. Add your first price above!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 text-left">
                    <th className="pb-3 text-slate-400 font-medium">Date</th>
                    <th className="pb-3 text-slate-400 font-medium">Price</th>
                    <th className="pb-3 text-slate-400 font-medium">Source</th>
                    <th className="pb-3 text-slate-400 font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((record, index) => {
                    const prevPrice = index > 0 ? history[index - 1].price_gbp : null;
                    const change = prevPrice ? ((record.price_gbp - prevPrice) / prevPrice * 100).toFixed(2) : null;
                    
                    return (
                      <tr key={record.id} className="border-b border-slate-700/50">
                        <td className="py-3 text-slate-300">
                          {new Date(record.fetched_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 font-mono text-white">
                          £{record.price_gbp.toFixed(2)}
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">
                            {record.source}
                          </span>
                        </td>
                        <td className="py-3">
                          {change ? (
                            <span className={parseFloat(change) >= 0 ? 'text-green-400' : 'text-red-400'}>
                              {parseFloat(change) >= 0 ? '▲' : '▼'} {Math.abs(parseFloat(change))}%
                            </span>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Simple Chart Visualization */}
        {history.length > 1 && (
          <div className="bg-slate-800 rounded-xl p-6 mt-8 border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Price Chart</h2>
            <div className="h-48 flex items-end gap-1">
              {history.map((record, i) => {
                const maxPrice = Math.max(...history.map(h => h.price_gbp));
                const height = (record.price_gbp / maxPrice) * 100;
                return (
                  <div
                    key={record.id}
                    className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t hover:from-cyan-500 hover:to-cyan-300 transition-all relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                      £{record.price_gbp.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
