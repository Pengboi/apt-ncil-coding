"use client";
import { useState } from "react";

export default function NameSpeak({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any[] | null>(null);

  const toggle = async () => {
    if (open) {
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/proxy/pokemon/${id}`);
      // fall back to direct if proxy not present
      const data = res.ok ? await res.json() : await (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)).json();
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
    <div className="w-full">
      <button onClick={toggle} className="capitalize font-medium text-slate-800 hover:underline" title="Click to show base stats">
        {loading ? "Loading..." : name}
      </button>

      {open && (
        <div className="mt-2 bg-slate-50 p-2 rounded text-sm text-slate-700">
          {stats && stats.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {stats.map((s) => (
                <div key={s.stat.name} className="flex items-baseline justify-between">
                  <div className="capitalize">{s.stat.name.replace('-', ' ')}</div>
                  <div className="font-semibold">{s.base_stat}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>No stats available.</div>
          )}
        </div>
      )}
    </div>
  );
}
