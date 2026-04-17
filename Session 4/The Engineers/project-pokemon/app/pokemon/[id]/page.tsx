import Link from "next/link";
import TypeBadge from "../../components/TypeBadge";
import StatBar from "../../components/StatBar";
import CardGalleryButton from "./CardGalleryButton";
import FormSelector from "./FormSelector";

interface Params {
  params: Promise<{ id: string }>;
}

// Type effectiveness data (simplified)
const typeEffectiveness: Record<string, { strong: string[]; weak: string[] }> = {
  normal: { strong: [], weak: ["rock", "steel", "ghost"] },
  fire: { strong: ["grass", "ice", "bug", "steel"], weak: ["fire", "water", "rock", "dragon"] },
  water: { strong: ["fire", "ground", "rock"], weak: ["water", "grass", "dragon"] },
  electric: { strong: ["water", "flying"], weak: ["electric", "grass", "dragon", "ground"] },
  grass: { strong: ["water", "ground", "rock"], weak: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"] },
  ice: { strong: ["grass", "ground", "flying", "dragon"], weak: ["fire", "water", "ice", "steel"] },
  fighting: { strong: ["normal", "ice", "rock", "dark", "steel"], weak: ["poison", "flying", "psychic", "bug", "fairy", "ghost"] },
  poison: { strong: ["grass", "fairy"], weak: ["poison", "ground", "rock", "ghost", "steel"] },
  ground: { strong: ["fire", "electric", "poison", "rock", "steel"], weak: ["grass", "bug", "flying"] },
  flying: { strong: ["grass", "fighting", "bug"], weak: ["electric", "rock", "steel"] },
  psychic: { strong: ["fighting", "poison"], weak: ["psychic", "steel", "dark"] },
  bug: { strong: ["grass", "psychic", "dark"], weak: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"] },
  rock: { strong: ["fire", "ice", "flying", "bug"], weak: ["fighting", "ground", "steel"] },
  ghost: { strong: ["psychic", "ghost"], weak: ["dark", "normal"] },
  dragon: { strong: ["dragon"], weak: ["steel", "fairy"] },
  dark: { strong: ["psychic", "ghost"], weak: ["fighting", "dark", "fairy"] },
  steel: { strong: ["ice", "rock", "fairy"], weak: ["fire", "water", "electric", "steel"] },
  fairy: { strong: ["fighting", "dragon", "dark"], weak: ["fire", "poison", "steel"] },
};

interface PokemonForm {
  id: string;
  name: string;
  img: string;
  isCurrent: boolean;
}

async function fetchFormData(url: string): Promise<PokemonForm | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 * 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      id: data.id.toString(),
      name: data.name,
      img: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
      isCurrent: false,
    };
  } catch {
    return null;
  }
}

export default async function PokemonPage({ params }: Params) {
  const { id } = await params;

  // Fetch Pokemon data
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
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
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            Pokémon Not Found
          </h1>
          <Link href="/" className="btn btn-primary text-xs mt-4 inline-flex">
            Return to Database
          </Link>
        </div>
      </div>
    );
  }

  const data = await res.json();

  // Fetch species data for flavor text and varieties
  const spRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.species.name}`, {
    next: { revalidate: 60 * 60 },
  });
  const species = spRes.ok ? await spRes.json() : null;
  const flavor =
    species?.flavor_text_entries
      ?.find((e: any) => e.language.name === "en")
      ?.flavor_text?.replace(/\n|\f/g, " ") || "";

  // Fetch all form data for the selector
  let allForms: PokemonForm[] = [];
  if (species?.varieties && species.varieties.length > 1) {
    const formPromises = species.varieties.map((v: any) => fetchFormData(v.pokemon.url));
    const forms = await Promise.all(formPromises);
    allForms = forms
      .filter((f): f is PokemonForm => f !== null)
      .map((f) => ({ ...f, isCurrent: f.id === id }));
  }

  const mainType = data.types[0]?.type?.name || "normal";
  const typeColor = `var(--type-${mainType})`;

  // Calculate type matchups
  const matchups = data.types.map((t: any) => {
    const typeName = t.type.name;
    return typeEffectiveness[typeName] || { strong: [], weak: [] };
  });

  const allStrong = [...new Set<string>(matchups.flatMap((m: { strong: string[] }) => m.strong))];
  const allWeak = [...new Set<string>(matchups.flatMap((m: { weak: string[] }) => m.weak))];

  const getBaseName = (name: string) => {
    const baseForms = ["galar", "alola", "hisui", "paldea", "base", "standard", "incarnate", "therian", "ordinary", "aria", "male", "female"];
    const parts = name.split("-");
    for (let i = parts.length - 1; i >= 0; i--) {
      if (baseForms.includes(parts[i]) && i > 0) {
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
  };

  const baseName = getBaseName(data.name);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="btn btn-secondary text-xs py-2 px-4">
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Database
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-data text-sm text-slate-400">ID</span>
            <span
              className="font-data text-lg font-bold"
              style={{ color: typeColor }}
            >
              #{data.id.toString().padStart(3, "0")}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Column */}
          <div className="relative">
            {/* Background glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-30"
              style={{ backgroundColor: typeColor }}
            />

            {/* Pokemon Image */}
            <div className="relative glass rounded-3xl p-8 flex items-center justify-center overflow-hidden">
              {/* Scanner lines animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
                  style={{
                    animation: "scan 3s linear infinite",
                  }}
                />
              </div>

              <img
                src={
                  data.sprites.other["official-artwork"].front_default ||
                  data.sprites.front_default
                }
                alt={data.name}
                className="w-full max-w-sm h-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              />

              {/* Grid overlay */}
              <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
            </div>

            {/* Form Selector */}
            {allForms.length > 1 && (
              <FormSelector 
                forms={allForms} 
                baseName={baseName}
                currentId={id}
              />
            )}

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="glass rounded-xl p-4 text-center">
                <div className="font-data text-2xl font-bold text-white">
                  {data.height / 10}m
                </div>
                <div className="font-data text-xs text-slate-500 uppercase tracking-wider">
                  Height
                </div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="font-data text-2xl font-bold text-white">
                  {data.weight / 10}kg
                </div>
                <div className="font-data text-xs text-slate-500 uppercase tracking-wider">
                  Weight
                </div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="font-data text-2xl font-bold text-white">
                  {data.base_experience || "—"}
                </div>
                <div className="font-data text-xs text-slate-500 uppercase tracking-wider">
                  Base XP
                </div>
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div className="space-y-6">
            {/* Name & Types */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {data.types.map((t: any) => (
                  <TypeBadge key={t.slot} type={t.type.name} size="lg" />
                ))}
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white capitalize mb-4">
                {data.name.replace(/-/g, " ")}
              </h1>
              {flavor && (
                <p className="font-body text-slate-400 leading-relaxed">
                  {flavor}
                </p>
              )}
            </div>

            {/* Abilities */}
            <div className="glass rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Abilities
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.abilities.map((a: any) => (
                  <div
                    key={a.slot}
                    className={`px-4 py-2 rounded-lg font-data text-sm ${
                      a.is_hidden
                        ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        : "bg-slate-700/50 text-slate-300 border border-slate-600/30"
                    }`}
                  >
                    <span className="capitalize">
                      {a.ability.name.replace(/-/g, " ")}
                    </span>
                    {a.is_hidden && (
                      <span className="ml-2 text-xs opacity-70">(Hidden)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Type Effectiveness */}
            <div className="glass rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Type Effectiveness
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-data text-xs text-slate-500 uppercase tracking-wider mb-2">
                    Strong Against
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {allStrong.length > 0 ? (
                      allStrong.slice(0, 6).map((type) => (
                        <TypeBadge key={type} type={type} size="sm" />
                      ))
                    ) : (
                      <span className="text-slate-600 text-sm">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-data text-xs text-slate-500 uppercase tracking-wider mb-2">
                    Weak Against
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {allWeak.length > 0 ? (
                      allWeak.slice(0, 6).map((type) => (
                        <TypeBadge key={type} type={type} size="sm" />
                      ))
                    ) : (
                      <span className="text-slate-600 text-sm">None</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* TCG Cards Button */}
            <CardGalleryButton name={data.name} />
          </div>
        </div>

        {/* Base Stats Section */}
        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            Base Stats
          </h2>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {data.stats.map((s: any, idx: number) => (
              <StatBar
                key={s.stat.name}
                label={s.stat.name}
                value={s.base_stat}
                delay={idx * 100}
              />
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="font-display text-lg font-semibold text-white">
              Total
            </span>
            <span className="font-data text-3xl font-bold text-cyan-400">
              {data.stats.reduce((sum: number, s: any) => sum + s.base_stat, 0)}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
