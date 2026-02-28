"use client";
import Link from "next/link";
import { useState } from "react";
import CardGallery from "./CardGallery";

export default function PokemonCard({ id, name, img }: { id: string; name: string; img: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any[] | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  const toggle = async () => {
    if (open) {
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      setStats(data.stats || []);
      setOpen(true);
    } catch (e) {
      setStats(null);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="relative">
        <div className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl border border-slate-100 hover:border-slate-200 transition-all duration-300 ease-out flex flex-col items-center text-center cursor-pointer transform hover:-translate-y-1">
          <div className="relative w-24 h-24 mb-3">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img src={img} alt={name} className="w-24 h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110 relative z-10" loading="lazy" onClick={(e: any) => { e.stopPropagation(); setShowGallery(true); }} />
          </div>

          <button onClick={(e) => { e.stopPropagation(); toggle(); }} className="capitalize font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
            {name}
          </button>

          <div className="text-xs font-medium text-slate-400 mt-1">#{id}</div>
        </div>

        {open && (
          <div className="mt-3 w-full bg-gradient-to-br from-slate-50 to-white p-3 rounded-xl text-sm text-slate-700 border border-slate-100 shadow-inner">
            {loading ? (
              <div>Loading...</div>
            ) : stats && stats.length > 0 ? (
              <div className="space-y-2">
                {stats.map((s) => {
                  const label = s.stat.name.replace('-', ' ');
                  const value = s.base_stat;
                  const max = 255; // scale reference
                  const pct = Math.min(100, Math.round((value / max) * 100));
                  return (
                    <div key={s.stat.name}>
                      <div className="flex items-center justify-between">
                        <div className="capitalize text-sm text-slate-700">{label}</div>
                        <div className="text-sm font-semibold text-slate-800">{value}</div>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded mt-1">
                        <div className="h-2 bg-emerald-500 rounded" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>No stats available.</div>
            )}
          </div>
        )}

        {showGallery && <CardGallery name={name} onClose={() => setShowGallery(false)} />}
      </div>
  );
}
