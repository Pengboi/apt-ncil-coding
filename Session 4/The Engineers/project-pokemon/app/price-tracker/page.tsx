// app/price-tracker/page.tsx
// Main price tracking dashboard
// Shows: Tracked cards, price charts, ability to add new cards

'use client';

import { useState, useEffect } from 'react';

// Type definitions
interface Card {
  id: string;
  name: string;
  set_name: string;
  rarity: string;
  image_url: string;
}

interface TrackedCard {
  id: string;
  card_id: string;
  date_added: string;
  is_active: boolean;
  last_fetched: string | null;
  fetch_count: number;
  notes: string | null;
  cards: Card;
  latest_price?: {
    current_price: number;
    change_percent: number;
    updated_at: string;
  };
}

interface PricePoint {
  id: string;
  card_id: string;
  price_gbp: number;
  source: string;
  fetched_at: string;
}

export default function PriceTrackerPage() {
  // State for tracked cards
  const [trackedCards, setTrackedCards] = useState<TrackedCard[]>([]);
  const [loadingCards, setLoadingCards] = useState(true);
  
  // State for adding new card
  const [newCardId, setNewCardId] = useState('');
  const [addingCard, setAddingCard] = useState(false);
  const [addMessage, setAddMessage] = useState('');
  
  // State for selected card's price history
  const [selectedCard, setSelectedCard] = useState<TrackedCard | null>(null);
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyDays, setHistoryDays] = useState(30);
  
  // State for manual fetch
  const [fetching, setFetching] = useState(false);
  const [fetchMessage, setFetchMessage] = useState('');

  // Load tracked cards on mount
  useEffect(() => {
    loadTrackedCards();
  }, []);

  // Load price history when selected card changes
  useEffect(() => {
    if (selectedCard) {
      loadPriceHistory(selectedCard.card_id);
    }
  }, [selectedCard, historyDays]);

  async function loadTrackedCards() {
    setLoadingCards(true);
    try {
      const res = await fetch('/api/tracked-cards');
      const data = await res.json();
      setTrackedCards(data.cards || []);
    } catch (error) {
      console.error('Error loading tracked cards:', error);
    }
    setLoadingCards(false);
  }

  async function loadPriceHistory(cardId: string) {
    setLoadingHistory(true);
    try {
      const res = await fetch(`/api/prices/history?cardId=${cardId}&days=${historyDays}`);
      const data = await res.json();
      setPriceHistory(data.prices || []);
    } catch (error) {
      console.error('Error loading price history:', error);
    }
    setLoadingHistory(false);
  }

  async function handleAddCard(e: React.FormEvent) {
    e.preventDefault();
    if (!newCardId.trim()) return;

    setAddingCard(true);
    setAddMessage('');

    try {
      const res = await fetch('/api/tracked-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: newCardId.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setAddMessage(`✅ ${data.message}`);
        setNewCardId('');
        loadTrackedCards(); // Refresh the list
      } else {
        setAddMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      setAddMessage('❌ Failed to add card');
    }

    setAddingCard(false);
  }

  async function handleRemoveCard(cardId: string) {
    if (!confirm(`Stop tracking ${cardId}?`)) return;

    try {
      const res = await fetch('/api/tracked-cards', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId }),
      });

      if (res.ok) {
        loadTrackedCards(); // Refresh the list
        if (selectedCard?.card_id === cardId) {
          setSelectedCard(null);
        }
      }
    } catch (error) {
      console.error('Error removing card:', error);
    }
  }

  async function handleFetchNow() {
    setFetching(true);
    setFetchMessage('Fetching prices... This may take a moment.');

    try {
      const res = await fetch('/api/cron/fetch-prices', {
        method: 'POST',
      });

      const data = await res.json();

      if (res.ok) {
        setFetchMessage(`✅ Fetched ${data.stats.success}/${data.stats.total} cards in ${data.stats.duration_seconds}s`);
        loadTrackedCards(); // Refresh to show new prices
        if (selectedCard) {
          loadPriceHistory(selectedCard.card_id);
        }
      } else {
        setFetchMessage(`❌ ${data.error || 'Fetch failed'}`);
      }
    } catch (error) {
      setFetchMessage('❌ Failed to trigger fetch');
    }

    setFetching(false);
  }

  // Calculate price change color
  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-slate-400';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            📈 Pokemon Price Tracker
          </h1>
          <p className="text-slate-400">
            Track Pokemon card prices automatically every 4 hours
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Tracked Cards List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add New Card */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold mb-4 text-cyan-400">Add Card to Track</h2>
              
              <form onSubmit={handleAddCard} className="space-y-3">
                <div>
                  <input
                    type="text"
                    value={newCardId}
                    onChange={(e) => setNewCardId(e.target.value)}
                    placeholder="e.g., base1-4 (Charizard)"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Format: set-number. Try: base1-2, base1-15, swsh4-75
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={addingCard}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-50"
                >
                  {addingCard ? 'Adding...' : '➕ Add to Tracking'}
                </button>
              </form>

              {addMessage && (
                <p className={`mt-3 text-sm ${addMessage.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                  {addMessage}
                </p>
              )}
            </div>

            {/* Manual Fetch Button */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold mb-4 text-purple-400">Manual Fetch</h2>
              <p className="text-sm text-slate-400 mb-4">
                Usually runs every 4 hours automatically. Click to fetch now.
              </p>
              <button
                onClick={handleFetchNow}
                disabled={fetching}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-50"
              >
                {fetching ? '🔄 Fetching...' : '🚀 Fetch Prices Now'}
              </button>
              {fetchMessage && (
                <p className={`mt-3 text-sm ${fetchMessage.includes('✅') ? 'text-green-400' : fetchMessage.includes('❌') ? 'text-red-400' : 'text-yellow-400'}`}>
                  {fetchMessage}
                </p>
              )}
            </div>

            {/* Tracked Cards List */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-cyan-400">
                  Tracked Cards ({trackedCards.length})
                </h2>
                <button
                  onClick={loadTrackedCards}
                  className="text-sm text-slate-400 hover:text-white"
                >
                  🔄 Refresh
                </button>
              </div>

              {loadingCards ? (
                <div className="text-center py-8 text-slate-500">Loading...</div>
              ) : trackedCards.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No cards being tracked yet.
                  <br />Add your first card above!
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {trackedCards.map((tracked) => (
                    <div
                      key={tracked.card_id}
                      onClick={() => setSelectedCard(tracked)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedCard?.card_id === tracked.card_id
                          ? 'bg-cyan-900/50 border border-cyan-500'
                          : 'bg-slate-700/50 hover:bg-slate-700 border border-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{tracked.cards?.name || tracked.card_id}</p>
                          <p className="text-xs text-slate-400">
                            {tracked.cards?.set_name || 'Unknown Set'}
                          </p>
                          {tracked.latest_price && (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-mono text-sm">
                                £{tracked.latest_price.current_price.toFixed(2)}
                              </span>
                              <span className={`text-xs ${getChangeColor(tracked.latest_price.change_percent)}`}>
                                {tracked.latest_price.change_percent >= 0 ? '▲' : '▼'}
                                {Math.abs(tracked.latest_price.change_percent)}%
                              </span>
                            </div>
                          )}
                          {!tracked.last_fetched && (
                            <span className="text-xs text-yellow-400">⏳ Never fetched</span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveCard(tracked.card_id);
                          }}
                          className="text-slate-500 hover:text-red-400 ml-2"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Price History Chart */}
          <div className="lg:col-span-2">
            {selectedCard ? (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                {/* Card Header */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  {selectedCard.cards?.image_url && (
                    <img
                      src={selectedCard.cards.image_url}
                      alt={selectedCard.cards.name}
                      className="w-32 h-44 object-contain rounded-lg bg-slate-700"
                    />
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {selectedCard.cards?.name || selectedCard.card_id}
                    </h2>
                    <p className="text-slate-400 mb-2">
                      {selectedCard.cards?.set_name} • {selectedCard.cards?.rarity}
                    </p>
                    <p className="text-sm text-slate-500 font-mono">
                      ID: {selectedCard.card_id}
                    </p>
                    
                    {selectedCard.latest_price && (
                      <div className="flex gap-4 mt-4">
                        <div className="bg-slate-700 rounded-lg px-4 py-2">
                          <p className="text-xs text-slate-400">Current Price</p>
                          <p className="text-xl font-mono font-bold">
                            £{selectedCard.latest_price.current_price.toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-slate-700 rounded-lg px-4 py-2">
                          <p className="text-xs text-slate-400">24h Change</p>
                          <p className={`text-xl font-mono font-bold ${getChangeColor(selectedCard.latest_price.change_percent)}`}>
                            {selectedCard.latest_price.change_percent >= 0 ? '+' : ''}
                            {selectedCard.latest_price.change_percent}%
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Time Range Selector */}
                <div className="flex gap-2 mb-4">
                  {[7, 30, 90].map((days) => (
                    <button
                      key={days}
                      onClick={() => setHistoryDays(days)}
                      className={`px-3 py-1 rounded text-sm transition-all ${
                        historyDays === days
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                      }`}
                    >
                      {days}d
                    </button>
                  ))}
                </div>

                {/* Price Chart */}
                {loadingHistory ? (
                  <div className="text-center py-16 text-slate-500">Loading chart...</div>
                ) : priceHistory.length === 0 ? (
                  <div className="text-center py-16 text-slate-500">
                    No price history yet.
                    <br />
                    <button
                      onClick={handleFetchNow}
                      className="mt-4 text-cyan-400 hover:underline"
                    >
                      Fetch prices now →
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Simple Bar Chart */}
                    <div className="h-64 flex items-end gap-1 mb-4">
                      {priceHistory.map((record, i) => {
                        const prices = priceHistory.map(h => h.price_gbp);
                        const minPrice = Math.min(...prices);
                        const maxPrice = Math.max(...prices);
                        const range = maxPrice - minPrice || 1;
                        const height = ((record.price_gbp - minPrice) / range) * 100;
                        
                        return (
                          <div
                            key={record.id}
                            className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t hover:from-cyan-500 hover:to-cyan-300 transition-all relative group min-h-[5px]"
                            style={{ height: `${Math.max(height, 5)}%` }}
                          >
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                              £{record.price_gbp.toFixed(2)}
                              <br />
                              {new Date(record.fetched_at).toLocaleDateString()}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Price Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-700 text-left">
                            <th className="pb-2 text-slate-400">Date</th>
                            <th className="pb-2 text-slate-400">Price</th>
                            <th className="pb-2 text-slate-400">Source</th>
                            <th className="pb-2 text-slate-400">Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {priceHistory.slice().reverse().slice(0, 10).map((record, index, arr) => {
                            const prevPrice = arr[index + 1]?.price_gbp;
                            const change = prevPrice ? ((record.price_gbp - prevPrice) / prevPrice * 100).toFixed(2) : null;
                            
                            return (
                              <tr key={record.id} className="border-b border-slate-800">
                                <td className="py-2 text-slate-300">
                                  {new Date(record.fetched_at).toLocaleString()}
                                </td>
                                <td className="py-2 font-mono text-white">
                                  £{record.price_gbp.toFixed(2)}
                                </td>
                                <td className="py-2">
                                  <span className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300">
                                    {record.source}
                                  </span>
                                </td>
                                <td className="py-2">
                                  {change ? (
                                    <span className={parseFloat(change) >= 0 ? 'text-green-400' : 'text-red-400'}>
                                      {parseFloat(change) >= 0 ? '▲' : '▼'} {Math.abs(parseFloat(change)).toFixed(1)}%
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
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
                <p className="text-slate-400 text-lg mb-4">
                  Select a card from the list to view its price history
                </p>
                <p className="text-slate-500 text-sm">
                  Or add a new card to start tracking
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
