"use client";
import { useEffect, useState } from "react";

type Card = {
  id: string;
  name: string;
  images?: { small?: string; large?: string };
};

export default function CardGallery({ name, onClose }: { name: string; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchCards = async () => {
      setLoading(true);
      try {
        const q = encodeURIComponent(`name:"${name}"`);
        const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=${q}`);
        if (!res.ok) throw new Error("Cards fetch failed");
        const json = await res.json();
        if (!cancelled) setCards(json.data || []);
      } catch (e) {
        if (!cancelled) setError("Could not load TCG cards for this Pokémon.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCards();
    return () => { cancelled = true; };
  }, [name]);

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-start justify-center p-6 overflow-auto">
      <div className="bg-white rounded-lg max-w-5xl w-full p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">TCG Cards: {name}</h3>
          <button onClick={onClose} className="text-sm px-2 py-1 bg-slate-100 rounded">Close</button>
        </div>

        {loading ? (
          <div>Loading cards...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : cards.length === 0 ? (
          <div>No cards found for {name}.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {cards.map((c) => (
              <div key={c.id} className="border rounded p-2 bg-slate-50">
                <img src={c.images?.small || c.images?.large} alt={c.name} className="w-full object-contain" />
                <div className="mt-2 text-sm font-medium">{c.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
