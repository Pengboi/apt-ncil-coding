"use client";

import { useEffect, useState } from "react";
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

export default function PokemonExplorer() {
  const [items, setItems] = useState<PokemonEntry[]>([]);
  const [filterName, setFilterName] = useState("");
  const [filterGen, setFilterGen] = useState("all");
  const [types, setTypes] = useState<string[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [typeSet, setTypeSet] = useState<Set<string> | null>(null);
  const [loadingType, setLoadingType] = useState(false);
  const [families, setFamilies] = useState<PokemonFamily[]>([]);
  const [loadingFamilies, setLoadingFamilies] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        setItems(d.results || []);
        setTimeout(() => setIsLoaded(true), 100);
      })
      .catch(() => {});

    fetch("https://pokeapi.co/api/v2/type")
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        const t = (d.results || [])
          .map((x: any) => x.name)
          .filter((n: string) => n !== "unknown" && n !== "shadow");
        setTypes(t);
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

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

  useEffect(() => {
    const filteredList = (() => {
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
    })();

    const uniqueBases = [...new Set(filteredList.map((p) => p.baseName))];

    const buildFamilies = async () => {
      setLoadingFamilies(true);
      const newFamilies: PokemonFamily[] = [];

      for (const baseName of uniqueBases) {
        const formsInFilter = filteredList.filter(
          (p) => p.baseName === baseName
        );

        if (formsInFilter.length > 1) {
          newFamilies.push({
            baseName,
            forms: formsInFilter,
            defaultFormId: formsInFilter[0].id,
          });
        } else {
          newFamilies.push({
            baseName,
            forms: formsInFilter,
            defaultFormId: formsInFilter[0]?.id || baseName,
          });
        }
      }

      setFamilies(newFamilies);
      setLoadingFamilies(false);
    };

    buildFamilies();
  }, [items, filterName, filterGen, typeSet]);

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-cyan-400"
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
            placeholder="Search Pokémon..."
            className="input pl-12 pr-4 py-3 text-center"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Generation Filter */}
          <div className="relative">
            <select
              value={filterGen}
              onChange={(e) => setFilterGen(e.target.value)}
              className="input py-2 pl-4 pr-10 appearance-none cursor-pointer text-sm"
            >
              {GENERATIONS.map((g) => (
                <option key={g.key} value={g.key}>
                  {g.label}
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

          {/* Type Filter */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input py-2 pl-4 pr-10 appearance-none cursor-pointer text-sm"
            >
              <option value="all">All Types</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
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

          {/* Active Type Badge */}
          {filterType !== "all" && (
            <TypeBadge type={filterType} size="sm" />
          )}
        </div>

        {/* Results Count */}
        <div className="text-center">
          <span className="font-data text-sm text-slate-400">
            Showing{" "}
            <span className="text-cyan-400 font-semibold">{families.length}</span>{" "}
            Pokémon
            {(loadingFamilies || loadingType) && (
              <span className="ml-2 text-slate-500 animate-pulse">
                scanning...
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Pokemon Grid */}
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

      {/* Empty State */}
      {families.length === 0 && !loadingFamilies && (
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
