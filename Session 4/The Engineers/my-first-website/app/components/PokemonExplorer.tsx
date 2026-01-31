"use client";
import { useEffect, useMemo, useState } from "react";
import PokemonCard from "../PokemonCard";

type PokemonEntry = { name: string; url: string };

const GENERATIONS = [
  { key: 'all', label: 'All' },
  { key: 'generation-i', label: 'Generation I', min: 1, max: 151 },
  { key: 'generation-ii', label: 'Generation II', min: 152, max: 251 },
  { key: 'generation-iii', label: 'Generation III', min: 252, max: 386 },
  { key: 'generation-iv', label: 'Generation IV', min: 387, max: 493 },
  { key: 'generation-v', label: 'Generation V', min: 494, max: 649 },
  { key: 'generation-vi', label: 'Generation VI', min: 650, max: 721 },
  { key: 'generation-vii', label: 'Generation VII', min: 722, max: 809 },
  { key: 'generation-viii', label: 'Generation VIII', min: 810, max: 898 },
  { key: 'generation-ix', label: 'Generation IX', min: 906, max: 1010 },
];

export default function PokemonExplorer() {
  const [items, setItems] = useState<PokemonEntry[]>([]);
  const [filterName, setFilterName] = useState('');
  const [filterGen, setFilterGen] = useState('all');
  const [types, setTypes] = useState<string[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [typeSet, setTypeSet] = useState<Set<string> | null>(null);
  const [loadingType, setLoadingType] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        setItems(d.results || []);
      })
      .catch(() => {});

    fetch('https://pokeapi.co/api/v2/type')
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        const t = (d.results || []).map((x: any) => x.name).filter((n: string) => n !== 'unknown' && n !== 'shadow');
        setTypes(t);
      })
      .catch(() => {});

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!filterType || filterType === 'all') {
      setTypeSet(null);
      return;
    }

    let mounted = true;
    setLoadingType(true);
    fetch(`https://pokeapi.co/api/v2/type/${filterType}`)
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        const s = new Set<string>();
        (d.pokemon || []).forEach((p: any) => {
          const parts = p.pokemon.url.split('/').filter(Boolean);
          const id = parts[parts.length - 1];
          s.add(id);
        });
        setTypeSet(s);
      })
      .catch(() => setTypeSet(null))
      .finally(() => setLoadingType(false));

    return () => { mounted = false; };
  }, [filterType]);

  const filtered = useMemo(() => {
    const q = filterName.trim().toLowerCase();
    const gen = GENERATIONS.find((g) => g.key === filterGen);

    return items.filter((it) => {
      if (q && !it.name.toLowerCase().includes(q)) return false;
      const parts = it.url.split('/').filter(Boolean);
      const id = parts[parts.length - 1];
      const num = Number(id || 0);
      if (gen && gen.key !== 'all') {
        if (num < (gen.min || 0) || num > (gen.max || Infinity)) return false;
      }
      if (typeSet) {
        if (!typeSet.has(id)) return false;
      }
      return true;
    }).map((p) => {
      const parts = p.url.split('/').filter(Boolean);
      const id = parts[parts.length - 1];
      const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return { id, name: p.name, img };
    });
  }, [items, filterName, filterGen, typeSet]);

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
        <input aria-label="Search Pokémon" value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder="Search by name" className="p-2 border rounded w-full sm:w-1/3" />
        <select value={filterGen} onChange={(e) => setFilterGen(e.target.value)} className="p-2 border rounded">
          {GENERATIONS.map((g) => (
            <option key={g.key} value={g.key}>{g.label}</option>
          ))}
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="p-2 border rounded">
          <option value="all">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="text-sm text-slate-600 mb-4">Showing {filtered.length} Pokémon {loadingType ? '(loading type data...)' : ''}</div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((it: any) => (
          <PokemonCard key={it.id} id={it.id} name={it.name} img={it.img} />
        ))}
      </div>
    </div>
  );
}
