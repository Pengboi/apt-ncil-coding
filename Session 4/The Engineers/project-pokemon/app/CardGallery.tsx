"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import HoloCard from "./components/HoloCard";
import CardPriceDetail from "./components/CardPriceDetail";

interface Card {
  id: string;
  name: string;
  setId: string;
  setName: string;
  releaseDate: string;
  images?: { small?: string; large?: string };
  price?: number;
  previousPrice?: number;
  priceSource?: string;
  priceChange?: "up" | "down" | "stable";
}

interface SetInfo {
  id: string;
  name: string;
  releaseDate: string;
}

interface TCGCardProps {
  card: Card;
  index: number;
  onClick: () => void;
}

// Individual TCG Card with 3D holographic effect
function TCGCard({ card, index, onClick }: TCGCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTransform({ rotateX, rotateY });
    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const priceChange = card.previousPrice && card.price
    ? (((card.price - card.previousPrice) / card.previousPrice) * 100).toFixed(1)
    : null;
  const isUp = card.priceChange === "up";
  const isDown = card.priceChange === "down";

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transformStyle: "preserve-3d",
        transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        animationDelay: `${index * 50}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {/* Holographic overlay effect */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-20 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `
            radial-gradient(
              circle at ${glowPosition.x}% ${glowPosition.y}%,
              rgba(0, 212, 255, 0.5) 0%,
              rgba(255, 0, 160, 0.4) 20%,
              rgba(255, 215, 0, 0.3) 40%,
              rgba(163, 230, 53, 0.2) 60%,
              transparent 80%
            )
          `,
          mixBlendMode: "overlay",
        }}
      />

      {/* Rainbow sheen */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-30 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 0.6 : 0,
          background: `
            linear-gradient(
              ${135 + transform.rotateY * 2}deg,
              transparent 0%,
              rgba(0, 212, 255, 0.4) 15%,
              rgba(255, 0, 160, 0.4) 30%,
              rgba(255, 215, 0, 0.3) 45%,
              rgba(163, 230, 53, 0.2) 60%,
              rgba(0, 212, 255, 0.2) 75%,
              transparent 100%
            )
          `,
          backgroundSize: "200% 200%",
        }}
      />

      {/* Card glow border */}
      <div
        className="absolute -inset-0.5 rounded-xl transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: "linear-gradient(135deg, #00d4ff, #ff00a0, #ffd700, #00d4ff)",
          filter: "blur(8px)",
        }}
      />

      {/* Card Content */}
      <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-700 group-hover:border-slate-500 transition-colors">
        {/* Card Image */}
        <div className="aspect-[2.5/3.5] relative">
          <img
            src={card.images?.large || card.images?.small}
            alt={card.name}
            className="w-full h-full object-contain p-2"
            loading="lazy"
          />
        </div>

        {/* Card Info with Price */}
        <div className="p-3 bg-slate-800/50 border-t border-slate-700">
          <h4 className="font-display text-xs font-semibold text-white truncate">
            {card.name}
          </h4>
          <div className="flex items-center justify-between mt-2">
            <span className="font-data text-[10px] text-slate-500">
              {card.setName}
            </span>
            {card.price ? (
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg font-data font-bold text-xs ${
                isUp
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : isDown
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
              }`}>
                <span>£{card.price.toFixed(2)}</span>
                {priceChange && priceChange !== "0.0" && (
                  <span className="text-[9px]">
                    {isUp ? "↑" : isDown ? "↓" : "→"}
                    {Math.abs(Number(priceChange)).toFixed(0)}%
                  </span>
                )}
              </div>
            ) : (
              <span className="font-data text-[10px] text-slate-600">
                {card.id}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CardGalleryProps {
  name: string;
  searchName?: string;
  onClose: () => void;
}

export default function CardGallery({ name, searchName, onClose }: CardGalleryProps) {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);
  const [sets, setSets] = useState<SetInfo[]>([]);
  const [selectedSet, setSelectedSet] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchCards = async () => {
      setLoading(true);
      try {
        // Use searchName for API if provided, otherwise fall back to name
        const searchQuery = searchName || name;
        const q = encodeURIComponent(searchQuery);
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
    return () => {
      cancelled = true;
    };
  }, [name, searchName]);

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
            const res = await fetch(
              `/api/prices?name=${encodeURIComponent(card.name)}&cardId=${
                card.id
              }&setName=${encodeURIComponent(card.setName)}`
            );
            if (!cancelled && res.ok) {
              const data = await res.json();
              if (data.price) {
                cardsWithPrices[i] = {
                  ...card,
                  price: data.price.price,
                  previousPrice: data.price.previousPrice,
                  priceSource: data.price.source,
                  priceChange: data.price.change,
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
    return () => {
      cancelled = true;
    };
  }, [cards.length, name]);

  const filteredCards = useMemo(() => {
    if (selectedSet === "all") return cards;
    return cards.filter((c) => c.setId === selectedSet);
  }, [cards, selectedSet]);

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
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center p-4 overflow-auto transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "rgba(10, 14, 39, 0.95)",
        backdropFilter: "blur(20px)",
      }}
      onClick={onClose}
    >
      <div
        className={`glass-strong rounded-2xl max-w-7xl w-full p-6 max-h-[90vh] overflow-auto transition-all duration-300 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div>
            <h3 className="font-display text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-magenta-400 animate-pulse" />
              TCG Cards
              <span className="text-cyan-400">{name}</span>
            </h3>
            <p className="font-body text-sm text-slate-400 mt-1">
              {filteredCards.length} cards found across {sets.length} sets
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Set Filter */}
            <div className="relative">
              <select
                value={selectedSet}
                onChange={(e) => setSelectedSet(e.target.value)}
                className="input py-2 pl-4 pr-10 appearance-none cursor-pointer text-sm min-w-[180px]"
              >
                <option value="all">All Sets ({sets.length})</option>
                {sets.map((set) => (
                  <option key={set.id} value={set.id}>
                    {set.name} ({set.releaseDate.split("-")[0]})
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Close Button */}
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

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4" />
            <p className="font-data text-slate-400 tracking-wider uppercase">
              Loading card database...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="font-display text-red-400">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredCards.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <p className="font-display text-slate-400">
              No cards found for {name}
            </p>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && !error && filteredCards.length > 0 && (
          <div className="space-y-8">
            {groupedCards.map((group) => (
              <div key={group.setName}>
                {/* Set Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600 to-slate-600" />
                  <h4 className="font-display text-sm font-semibold text-slate-300 uppercase tracking-wider">
                    {group.setName}
                  </h4>
                  <span className="font-data text-xs text-slate-500">
                    {group.cards.length} cards
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-600 to-slate-600" />
                </div>

                {/* Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {group.cards.map((card, index) => (
                    <TCGCard 
                      key={card.id} 
                      card={card} 
                      index={index} 
                      onClick={() => setSelectedCard(card)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading Prices Indicator */}
        {loadingPrices && (
          <div className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 glass rounded-full">
            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="font-data text-sm text-slate-300">
              Fetching prices...
            </span>
          </div>
        )}

        {/* Card Price Detail Modal */}
        {selectedCard && (
          <CardPriceDetail
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </div>
    </div>
  );
}
