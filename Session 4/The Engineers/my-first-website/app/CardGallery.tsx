"use client";
import { useEffect, useState, useMemo } from "react";

type Card = {
  id: string;
  name: string;
  setId: string;
  setName: string;
  releaseDate: string;
  images?: { small?: string; large?: string };
  price?: number;
  previousPrice?: number;
  priceSource?: string;
  priceChange?: 'up' | 'down' | 'stable';
};

type SetInfo = {
  id: string;
  name: string;
  releaseDate: string;
};

export default function CardGallery({ name, onClose }: { name: string; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);
  const [sets, setSets] = useState<SetInfo[]>([]);
  const [selectedSet, setSelectedSet] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  const [loadingPrices, setLoadingPrices] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchCards = async () => {
      setLoading(true);
      try {
        const q = encodeURIComponent(name);
        const res = await fetch(`/api/tcg/cards?name=${q}`);
        if (!res.ok) throw new Error("Cards fetch failed");
        const json = await res.json();
        if (!cancelled) {
          setCards(json.data || []);
          setSets(json.sets || []);
        }
      } catch (e) {
        if (!cancelled) setError("Could not load TCG cards for this Pokémon.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCards();
    return () => { cancelled = true; };
  }, [name]);

  useEffect(() => {
    if (cards.length === 0) return;
    
    let cancelled = false;
    const fetchPrices = async () => {
      setLoadingPrices(true);
      try {
        const cardsWithPrices = [...cards];
        
        for (let i = 0; i < cardsWithPrices.length; i++) {
          if (cancelled) break;
          
          const card = cardsWithPrices[i];
          try {
            const res = await fetch(`/api/prices?name=${encodeURIComponent(card.name)}&cardId=${card.id}&setName=${encodeURIComponent(card.setName)}`);
            if (!cancelled && res.ok) {
              const data = await res.json();
              if (data.price) {
                cardsWithPrices[i] = { 
                  ...card, 
                  price: data.price.price, 
                  previousPrice: data.price.previousPrice,
                  priceSource: data.price.source,
                  priceChange: data.price.change
                };
              }
            }
          } catch {
            // ignore errors for individual cards
          }
          
          if (!cancelled) {
            setCards([...cardsWithPrices]);
          }
        }
      } finally {
        if (!cancelled) setLoadingPrices(false);
      }
    };
    
    fetchPrices();
    return () => { cancelled = true; };
  }, [cards.length, name]);

  const filteredCards = useMemo(() => {
    if (selectedSet === "all") return cards;
    return cards.filter((c) => c.setId === selectedSet);
  }, [cards, selectedSet]);

  // Group cards by set for display
  const groupedCards = useMemo(() => {
    const groups: { setName: string; cards: Card[] }[] = [];
    let currentGroup: { setName: string; cards: Card[] } | null = null;
    
    for (const card of filteredCards) {
      if (!currentGroup || currentGroup.setName !== card.setName) {
        currentGroup = { setName: card.setName, cards: [] };
        groups.push(currentGroup);
      }
      currentGroup.cards.push(card);
    }
    return groups;
  }, [filteredCards]);

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-start justify-center p-6 overflow-auto">
      <div className="bg-white rounded-lg max-w-6xl w-full p-4 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">TCG Cards: {name}</h3>
          <button onClick={onClose} className="text-sm px-2 py-1 bg-slate-100 rounded">Close</button>
        </div>

        {/* Set Filter */}
        <div className="mb-4">
          <label className="text-sm text-slate-600 mr-2">Filter by Set:</label>
          <select 
            value={selectedSet} 
            onChange={(e) => setSelectedSet(e.target.value)}
            className="p-2 border rounded text-sm"
          >
            <option value="all">All Sets ({sets.length} sets)</option>
            {sets.map((set) => (
              <option key={set.id} value={set.id}>
                {set.name} ({set.releaseDate.split('-')[0]})
              </option>
            ))}
          </select>
          <span className="ml-4 text-sm text-slate-500">
            Showing {filteredCards.length} cards {loadingPrices && '(loading prices...)'}
          </span>
        </div>

        {loading ? (
          <div>Loading cards...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : filteredCards.length === 0 ? (
          <div>No cards found for {name}.</div>
        ) : (
          <div className="space-y-6">
            {groupedCards.map((group) => (
              <div key={group.setName}>
                <h4 className="text-sm font-semibold text-slate-600 mb-2 border-b pb-1">
                  {group.setName}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {group.cards.map((c) => {
                    const priceChange = c.previousPrice && c.price 
                      ? ((c.price - c.previousPrice) / c.previousPrice * 100).toFixed(1)
                      : null;
                    const isUp = c.priceChange === 'up';
                    const isDown = c.priceChange === 'down';
                    const changeColor = isUp ? 'text-emerald-600' : isDown ? 'text-red-600' : 'text-slate-500';
                    
                    return (
                      <div key={c.id} className="border rounded p-2 bg-slate-50 flex">
                        {c.price ? (
                          <div className={`flex flex-col justify-center mr-2 min-w-[55px] text-right ${changeColor}`}>
                            <div className="text-sm font-bold">
                              £{c.price.toFixed(2)}
                            </div>
                            {priceChange && priceChange !== '0.0' && (
                              <div className={`text-[10px] font-medium`}>
                                {isUp ? '↑' : isDown ? '↓' : ''}{priceChange}%
                              </div>
                            )}
                          </div>
                        ) : null}
                        <div className="flex-1">
                          <img 
                            src={c.images?.small || c.images?.large} 
                            alt={c.name} 
                            className="w-full object-contain" 
                          />
                          <div className="mt-2 text-sm font-medium">{c.name}</div>
                          <div className="text-xs text-slate-500">{c.id}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
