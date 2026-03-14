"use client";

import Link from "next/link";
import { useState } from "react";
import CardGallery from "./CardGallery";
import StatBar from "./components/StatBar";
import HoloCard from "./components/HoloCard";

interface PokemonCardProps {
  id: string;
  name: string;
  img: string;
}

interface Stat {
  stat: {
    name: string;
  };
  base_stat: number;
}

export default function PokemonCard({ id, name, img }: PokemonCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Stat[] | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  const toggleStats = async () => {
    if (expanded) {
      setExpanded(false);
      return;
    }

    if (stats) {
      setExpanded(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      setStats(data.stats || []);
      setExpanded(true);
    } catch (e) {
      setStats(null);
      setExpanded(true);
    } finally {
      setLoading(false);
    }
  };

  const playCry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const sources = [
      `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${id}.ogg`,
      `https://pokemoncries.com/cries/${id}.mp3`,
    ];

    const audio = new Audio();
    let currentSource = 0;

    const tryPlay = () => {
      if (currentSource >= sources.length) return;
      audio.src = sources[currentSource];
      audio.volume = 0.4;
      audio.play().catch(() => {
        currentSource++;
        tryPlay();
      });
    };

    tryPlay();
  };

  return (
    <div className="relative">
      <HoloCard intensity={0.3}>
        <div className="card p-5 flex flex-col items-center text-center">
          {/* Image Container */}
          <div className="relative w-28 h-28 mb-4 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
            <img
              src={img}
              alt={name}
              className="w-full h-full object-contain relative z-10 transition-all duration-300 group-hover:scale-110 cursor-pointer"
              loading="lazy"
              onClick={(e) => {
                e.stopPropagation();
                setShowGallery(true);
              }}
              onDoubleClick={playCry}
            />
          </div>

          {/* Name */}
          <h3 className="font-display text-sm font-semibold text-white capitalize mb-1">
            {name.replace(/-/g, " ")}
          </h3>

          {/* ID */}
          <div className="font-data text-xs text-slate-500 mb-3">
            #{id.padStart(3, "0")}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 w-full">
            <Link
              href={`/pokemon/${id}`}
              className="flex-1 btn btn-primary py-2 text-[10px]"
            >
              Details
            </Link>
            <button
              onClick={toggleStats}
              className="btn btn-secondary py-2 px-3 text-[10px]"
            >
              {expanded ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
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
              )}
            </button>
          </div>
        </div>
      </HoloCard>

      {/* Expanded Stats */}
      {expanded && (
        <div className="mt-3 glass rounded-xl p-4 animate-fade-in-up">
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : stats && stats.length > 0 ? (
            <div className="space-y-3">
              {stats.map((s, idx) => (
                <StatBar
                  key={s.stat.name}
                  label={s.stat.name}
                  value={s.base_stat}
                  delay={idx * 100}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 text-sm">
              No stats available
            </p>
          )}
        </div>
      )}

      {/* Card Gallery Modal */}
      {showGallery && (
        <CardGallery name={name} onClose={() => setShowGallery(false)} />
      )}
    </div>
  );
}
