"use client";

import { useEffect, useState, useMemo } from "react";
import PokemonFamilyCard from "./PokemonFamilyCard";
import TypeBadge from "./TypeBadge";

interface PokemonEntry {
  name: string;
  url: string;
}

interface PokemonForm {
  id: string;
  name: string;
  img: string;
}

interface PokemonFamily {
  baseName: string;
  forms: PokemonForm[];
  defaultFormId: string;
}

const GENERATIONS = [
  { key: "all", label: "All Gen" },
  { key: "generation-i", label: "Gen I", min: 1, max: 151 },
  { key: "generation-ii", label: "Gen II", min: 152, max: 251 },
  { key: "generation-iii", label: "Gen III", min: 252, max: 386 },
  { key: "generation-iv", label: "Gen IV", min: 387, max: 493 },
  { key: "generation-v", label: "Gen V", min: 494, max: 649 },
  { key: "generation-vi", label: "Gen VI", min: 650, max: 721 },
  { key: "generation-vii", label: "Gen VII", min: 722, max: 809 },
  { key: "generation-viii", label: "Gen VIII", min: 810, max: 898 },
  { key: "generation-ix", label: "Gen IX", min: 906, max: 1010 },
];

const CACHE_KEY = "pokemon_data_cache";
const CACHE_TIMESTAMP_KEY = "pokemon_cache_timestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function getBaseName(name: string): string {
  const baseForms = [
    "galar",
    "alola",
    "hisui",
    "paldea",
    "base",
    "standard",
    "incarnate",
    "therian",
    "ordinary",
    "aria",
    "male",
    "female",
  ];
  const parts = name.split("-");

  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    if (baseForms.includes(part) && i > 0) {
      return parts.slice(0, i).join("-");
    }
  }

  const megaMatch = name.match(/^(.+)-mega$/);
  if (megaMatch) return megaMatch[1];

  const gmaxMatch = name.match(/^(.+)-gmax$/);
  if (gmaxMatch) return gmaxMatch[1];

  const primalMatch = name.match(/^(.+)-primal$/);
  if (primalMatch) return primalMatch[1];

  return name;
}

// Loading Spinner Component
function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="card h-[280px] flex flex-col items-center p-4 relative overflow-hidden animate-pulse"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="absolute top-3 left-3 w-12 h-5 bg-slate-700/50 rounded-full" />
          <div className="relative w-28 h-28 mt-8 mb-3 bg-slate-700/30 rounded-full" />
          <div className="w-20 h-4 bg-slate-700/50 rounded mt-3" />
        </div>
      ))}
    </div>
  );
}

export default function PokemonExplorer() {
  const [items, setItems] = useState<PokemonEntry[]>([]);
  const [filterName, setFilterName] = useState("");
  const [filterGen, setFilterGen] = useState("all");
  const [types, setTypes] = useState<string[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [typeSet, setTypeSet] = useState<Set<string> | null>(null);
  const [loadingType, setLoadingType] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Initial data fetch with caching
  useEffect(() => {
    let mounted = true;
    
    // Check localStorage first
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    const now = Date.now();
    
    // Use cache if it exists and is less than 24 hours old
    if (cachedData && cachedTimestamp) {
      const age = now - parseInt(cachedTimestamp);
      if (age < CACHE_DURATION) {
        try {
          const parsed = JSON.parse(cachedData);
          if (mounted) {
            setItems(parsed.items || []);
            setTypes(parsed.types || []);
            setIsLoaded(true);
          }
        } catch (e) {
          // Invalid cache, will fetch fresh
        }
      }
    }
    
    // Always fetch fresh data in background (to update cache)
    setIsFetching(true);
    
    Promise.all([
      fetch("https://pokeapi.co/api/v2/pokemon?limit=2000").then(r => r.json()),
      fetch("https://pokeapi.co/api/v2/type").then(r => r.json())
    ])
      .then(([pokemonData, typeData]) => {
        if (!mounted) return;
        
        const items = pokemonData.results || [];
        const types = (typeData.results || [])
          .map((x: any) => x.name)
          .filter((n: string) => n !== "unknown" && n !== "shadow");
        
        setItems(items);
        setTypes(types);
        setIsLoaded(true);
        setIsFetching(false);
        
        // Save to localStorage
        localStorage.setItem(CACHE_KEY, JSON.stringify({ items, types }));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString());
      })
      .catch(() => {
        if (mounted) {
          setIsFetching(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Fetch type filter data
  useEffect(() => {
    if (!filterType || filterType === "all") {
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
          const parts = p.pokemon.url.split("/").filter(Boolean);
          const id = parts[parts.length - 1];
          s.add(id);
        });
        setTypeSet(s);
      })
      .catch(() => setTypeSet(null))
      .finally(() => setLoadingType(false));

    return () => {
      mounted = false;
    };
  }, [filterType]);

  // Memoized filtered list computation
  const filteredPokemon = useMemo(() => {
    const q = filterName.trim().toLowerCase();
    const gen = GENERATIONS.find((g) => g.key === filterGen);

    return items
      .filter((it) => {
        if (q && !it.name.toLowerCase().includes(q)) return false;
        const parts = it.url.split("/").filter(Boolean);
        const id = parts[parts.length - 1];
        const num = Number(id || 0);
        if (gen && gen.key !== "all") {
          if (num < (gen.min || 0) || num > (gen.max || Infinity))
            return false;
        }
        if (typeSet) {
          if (!typeSet.has(id)) return false;
        }
        return true;
      })
      .map((p) => {
        const parts = p.url.split("/").filter(Boolean);
        const id = parts[parts.length - 1];
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        return { id, name: p.name, img, baseName: getBaseName(p.name) };
      });
  }, [items, filterName, filterGen, typeSet]);

  // Memoized family building
  const families = useMemo<PokemonFamily[]>(() => {
    const uniqueBases = [...new Set(filteredPokemon.map((p) => p.baseName))];
    
    return uniqueBases.map((baseName) => {
      const formsInFilter = filteredPokemon.filter(
        (p) => p.baseName === baseName
      );

      return {
        baseName,
        forms: formsInFilter,
        defaultFormId: formsInFilter[0]?.id || baseName,
      };
    });
  }, [filteredPokemon]);

  // Check if currently loading (no cache available yet)
  const isLoading = items.length === 0 && isFetching;
  const isTypeLoading = loadingType;

  return (
    <div>
      {/* Search and Filters - Inline Layout */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-auto sm:min-w-[240px]">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Search..."
              className="input w-full !py-1.5 !pr-2.5 !pl-8 text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            {/* Generation Filter */}
            <div className="relative">
              <select
                value={filterGen}
                onChange={(e) => setFilterGen(e.target.value)}
                className="input !py-1.5 !pl-2.5 !pr-7 appearance-none cursor-pointer text-sm bg-slate-800/50"
              >
                {GENERATIONS.map((g) => (
                  <option key={g.key} value={g.key}>
                    {g.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-3 h-3 text-slate-400"
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

            {/* Type Filter */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input !py-1.5 !pl-2.5 !pr-7 appearance-none cursor-pointer text-sm bg-slate-800/50"
              >
                <option value="all">All Types</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-3 h-3 text-slate-400"
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

            {/* Active Type Badge */}
            {filterType !== "all" && (
              <TypeBadge type={filterType} size="sm" />
            )}
          </div>

          {/* Results Count */}
          <div className="font-data text-xs text-slate-400 whitespace-nowrap">
            <span className="text-cyan-400 font-semibold">{families.length}</span>
            <span className="ml-1">found</span>
            {isTypeLoading && (
              <span className="ml-2 text-slate-500 animate-pulse">...</span>
            )}
          </div>
        </div>
      </div>

      {/* Show loading spinner if no cached data available */}
      {isLoading ? (
        <LoadingGrid />
      ) : (
        /* Pokemon Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {families.map((family, index) => (
            <div
              key={family.baseName}
              className={`${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${Math.min(index * 20, 500)}ms` }}
            >
              <PokemonFamilyCard
                baseName={family.baseName}
                forms={family.forms}
                defaultFormId={family.defaultFormId}
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {families.length === 0 && !isLoading && !isTypeLoading && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="font-display text-slate-400">
            No Pokémon found in this sector
          </p>
          <p className="font-body text-sm text-slate-500 mt-1">
            Try adjusting your search filters
          </p>
        </div>
      )}
    </div>
  );
}
