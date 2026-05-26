import Link from "next/link";
import TypeBadge from "../../components/TypeBadge";
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

// Color-coded stats
const statColors: Record<string, { bg: string; text: string }> = {
  hp: { bg: "#FF5959", text: "#FF5959" },
  attack: { bg: "#F5AC78", text: "#F5AC78" },
  defense: { bg: "#FAE078", text: "#FAE078" },
  "special-attack": { bg: "#9DB7F5", text: "#9DB7F5" },
  "special-defense": { bg: "#A7DB8D", text: "#A7DB8D" },
  speed: { bg: "#FA92B2", text: "#FA92B2" },
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

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-2">Pokémon Not Found</h1>
          <Link href="/" className="btn btn-primary text-xs mt-4 inline-flex">Return to Database</Link>
        </div>
      </div>
    );
  }

  const data = await res.json();

  const spRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.species.name}`, {
    next: { revalidate: 60 * 60 },
  });
  const species = spRes.ok ? await spRes.json() : null;
  const flavor =
    species?.flavor_text_entries
      ?.find((e: any) => e.language.name === "en")
      ?.flavor_text?.replace(/\n|\f/g, " ") || "";

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
      if (baseForms.includes(parts[i]) && i > 0) return parts.slice(0, i).join("-");
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
  const imageUrl = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
  const totalStats = data.stats.reduce((sum: number, s: any) => sum + s.base_stat, 0);

  return (
    <div className="h-[100dvh] flex flex-col relative overflow-hidden bg-[#050505]">
      {/* Type colour backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{ background: `radial-gradient(ellipse at 15% 60%, ${typeColor} 0%, transparent 55%)` }}
      />

      {/* ── Header ── */}
      <header className="relative z-20 flex-none px-4 sm:px-6 py-3 border-b border-white/[0.04]">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <div className="w-7 h-7 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-cyan-400 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="font-display tracking-widest text-[10px] uppercase font-bold">Back</span>
          </Link>
          <div className="font-display text-[10px] tracking-[0.2em] text-slate-500 uppercase">
            Entry <span className="text-white">//{data.id.toString().padStart(4, "0")}</span>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="relative z-10 flex-1 min-h-0">

        {/* ════════════════════════════════════════
            DESKTOP  (≥ 1024 px)
            Left col  — image fills 1fr row, meta snaps to bottom
            Right col — flavor text fills the gap between title & matchups
            ════════════════════════════════════════ */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-x-8 h-full max-w-[1400px] mx-auto px-6 pb-4">

          {/* LEFT — 5 cols */}
          <div
            className="col-span-5 h-full py-3 gap-3"
            style={{ display: "grid", gridTemplateRows: "1fr auto" }}
          >
            {/* Image row — takes all remaining height */}
            <div className="flex items-center justify-center min-h-0 overflow-hidden">
              <div className="relative flex items-center justify-center w-full h-full">
                {/* type glow */}
                <div
                  className="absolute w-[55%] aspect-square rounded-full blur-[90px] opacity-30"
                  style={{ backgroundColor: typeColor }}
                />
                <img
                  src={imageUrl}
                  alt={data.name}
                  className="relative z-10 object-contain animate-float drop-shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                  style={{ maxHeight: "100%", maxWidth: "100%", height: "100%", width: "100%" }}
                />
              </div>
            </div>

            {/* Meta row — auto height, stays at bottom */}
            <div className="space-y-2">
              {allForms.length > 1 && (
                <FormSelector forms={allForms} baseName={baseName} currentId={id} />
              )}
              <CardGalleryButton name={data.name} searchName={baseName} />
              <div className="glass rounded-lg px-3 py-2.5">
                <div className="grid grid-cols-3 divide-x divide-white/5 text-center">
                  <div className="pr-2">
                    <div className="font-data text-base font-bold text-white leading-tight">
                      {data.height / 10}<span className="text-[10px] text-slate-500 ml-0.5">m</span>
                    </div>
                    <div className="font-display text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Height</div>
                  </div>
                  <div className="px-2">
                    <div className="font-data text-base font-bold text-white leading-tight">
                      {data.weight / 10}<span className="text-[10px] text-slate-500 ml-0.5">kg</span>
                    </div>
                    <div className="font-display text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Weight</div>
                  </div>
                  <div className="pl-2">
                    <div className="font-data text-base font-bold text-white leading-tight">
                      {data.base_experience || "—"}
                    </div>
                    <div className="font-display text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Base XP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — 7 cols */}
          <div className="col-span-7 flex flex-col h-full py-3 gap-3">

            {/* Title + Description */}
            <div className="shrink-0">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {data.types.map((t: any) => (
                      <TypeBadge key={t.slot} type={t.type.name} size="md" />
                    ))}
                  </div>
                  <h1 className="font-display text-5xl font-black text-white capitalize leading-none tracking-tight">
                    {data.name.replace(/-/g, " ")}
                  </h1>
                </div>
                <span className="font-data text-lg text-slate-500 tracking-widest shrink-0 ml-4">
                  #{data.id.toString().padStart(3, "0")}
                </span>
              </div>
              {flavor && (
                <p className="font-body text-sm text-slate-400 leading-relaxed max-w-[90%]">
                  {flavor}
                </p>
              )}
            </div>

            {/* Combat matchups + abilities */}
            <div className="glass rounded-xl p-3 border border-white/5 shrink-0">
              <div className="flex items-start gap-6 mb-3 pb-3 border-b border-white/5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="font-display text-[10px] tracking-wider text-emerald-400/80 uppercase">Strong</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {allStrong.length > 0
                      ? allStrong.slice(0, 6).map((type) => <TypeBadge key={type} type={type} size="xs" />)
                      : <span className="text-xs text-slate-600">None</span>}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span className="font-display text-[10px] tracking-wider text-rose-400/80 uppercase">Weak</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {allWeak.length > 0
                      ? allWeak.slice(0, 6).map((type) => <TypeBadge key={type} type={type} size="xs" />)
                      : <span className="text-xs text-slate-600">None</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display text-[10px] tracking-wider text-slate-500 uppercase">Abilities:</span>
                {data.abilities.map((a: any, idx: number) => (
                  <span key={a.slot} className="flex items-center">
                    <span className={`font-body text-xs capitalize ${a.is_hidden ? "text-purple-300" : "text-slate-300"}`}>
                      {a.ability.name.replace(/-/g, " ")}
                      {a.is_hidden && <span className="text-[9px] opacity-60 ml-0.5">(H)</span>}
                    </span>
                    {idx < data.abilities.length - 1 && <span className="text-slate-600 mx-1.5">·</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Base stats */}
            <div className="glass rounded-xl p-5 border border-white/5 flex-1 min-h-0 flex flex-col">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <h2 className="font-display text-sm font-bold text-white tracking-tight">Base Stats</h2>
                <div className="font-data text-xl font-bold text-cyan-400">{totalStats}</div>
              </div>
              <div className="flex-1 flex flex-col justify-between min-h-0">
                {data.stats.map((s: any) => {
                  const colors = statColors[s.stat.name] || { bg: "#888", text: "#888" };
                  const percentage = Math.min((s.base_stat / 255) * 100, 100);
                  return (
                    <div key={s.stat.name} className="flex items-center gap-3">
                      <div className="w-20 flex-shrink-0 font-display text-[10px] tracking-wider uppercase text-slate-400 text-right">
                        {s.stat.name.replace(/-/g, " ").replace(/special /, "Sp. ")}
                      </div>
                      <div className="font-data text-sm font-bold w-8 text-right" style={{ color: colors.text }}>
                        {s.base_stat}
                      </div>
                      <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${percentage}%`, backgroundColor: colors.bg }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ════════════════════════════════════════
            MOBILE  (< 1024 px)
            Compact layout that fits in 100dvh:
              • identity row  (image + name/types)
              • matchups card
              • stats card    (flex-1, fills the gap)
              • bottom strip  (physical + TCG + forms)
            ════════════════════════════════════════ */}
        <div className="flex lg:hidden flex-col h-full px-4 pb-3 pt-2 gap-2">

          {/* Identity row */}
          <div className="flex items-center gap-3 flex-none">
            <div className="relative w-[108px] h-[108px] flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full blur-[28px] opacity-50"
                style={{ backgroundColor: typeColor }}
              />
              <img
                src={imageUrl}
                alt={data.name}
                className="w-full h-full object-contain relative z-10 animate-float drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)]"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                {data.types.map((t: any) => (
                  <TypeBadge key={t.slot} type={t.type.name} size="xs" />
                ))}
              </div>
              <h1 className="font-display text-[1.35rem] font-black text-white capitalize leading-tight tracking-tight">
                {data.name.replace(/-/g, " ")}
              </h1>
              {flavor && (
                <p className="font-body text-[11px] text-slate-400 leading-snug mt-1 line-clamp-2">
                  {flavor}
                </p>
              )}
              <div className="font-data text-xs text-slate-500 tracking-widest mt-0.5">
                #{data.id.toString().padStart(3, "0")}
              </div>
            </div>
          </div>

          {/* Matchups + abilities */}
          <div className="glass rounded-xl px-3 py-2.5 border border-white/5 flex-none">
            <div className="flex gap-4 mb-2 pb-2 border-b border-white/5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-display text-[9px] tracking-wider text-emerald-400/80 uppercase">Strong</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {allStrong.length > 0
                    ? allStrong.slice(0, 5).map((type) => <TypeBadge key={type} type={type} size="xs" />)
                    : <span className="text-[10px] text-slate-600">None</span>}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="font-display text-[9px] tracking-wider text-rose-400/80 uppercase">Weak</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {allWeak.length > 0
                    ? allWeak.slice(0, 5).map((type) => <TypeBadge key={type} type={type} size="xs" />)
                    : <span className="text-[10px] text-slate-600">None</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-display text-[9px] tracking-wider text-slate-500 uppercase">Abilities:</span>
              {data.abilities.map((a: any, idx: number) => (
                <span key={a.slot} className="flex items-center">
                  <span className={`font-body text-[10px] capitalize ${a.is_hidden ? "text-purple-300" : "text-slate-300"}`}>
                    {a.ability.name.replace(/-/g, " ")}
                    {a.is_hidden && <span className="text-[8px] opacity-60 ml-0.5">(H)</span>}
                  </span>
                  {idx < data.abilities.length - 1 && <span className="text-slate-600 mx-1">·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Stats — fills remaining space */}
          <div className="glass rounded-xl px-4 py-3 border border-white/5 flex-1 min-h-0 flex flex-col">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h2 className="font-display text-xs font-bold text-white tracking-tight">Base Stats</h2>
              <div className="font-data text-base font-bold text-cyan-400">{totalStats}</div>
            </div>
            <div className="flex-1 min-h-0 flex flex-col justify-between">
              {data.stats.map((s: any) => {
                const colors = statColors[s.stat.name] || { bg: "#888", text: "#888" };
                const percentage = Math.min((s.base_stat / 255) * 100, 100);
                return (
                  <div key={s.stat.name} className="flex items-center gap-2.5">
                    <div className="w-16 flex-shrink-0 font-display text-[9px] tracking-wider uppercase text-slate-400 text-right">
                      {s.stat.name.replace(/-/g, " ").replace(/special /, "Sp. ")}
                    </div>
                    <div className="font-data text-sm font-bold w-7 text-right" style={{ color: colors.text }}>
                      {s.base_stat}
                    </div>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${percentage}%`, backgroundColor: colors.bg }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom strip */}
          <div className="flex-none space-y-2">
            <div className="flex gap-2 items-stretch">
              {/* Physical specs */}
              <div className="glass rounded-lg px-3 py-2 flex-1">
                <div className="grid grid-cols-3 divide-x divide-white/5 text-center h-full items-center">
                  <div className="pr-1">
                    <div className="font-data text-sm font-bold text-white leading-tight">
                      {data.height / 10}<span className="text-[9px] text-slate-500 ml-0.5">m</span>
                    </div>
                    <div className="font-display text-[8px] text-slate-400 uppercase tracking-wide">Height</div>
                  </div>
                  <div className="px-1">
                    <div className="font-data text-sm font-bold text-white leading-tight">
                      {data.weight / 10}<span className="text-[9px] text-slate-500 ml-0.5">kg</span>
                    </div>
                    <div className="font-display text-[8px] text-slate-400 uppercase tracking-wide">Weight</div>
                  </div>
                  <div className="pl-1">
                    <div className="font-data text-sm font-bold text-white leading-tight">
                      {data.base_experience || "—"}
                    </div>
                    <div className="font-display text-[8px] text-slate-400 uppercase tracking-wide">Base XP</div>
                  </div>
                </div>
              </div>
              {/* TCG button */}
              <div className="flex-shrink-0 w-[130px]">
                <CardGalleryButton name={data.name} searchName={baseName} />
              </div>
            </div>
            {/* Forms */}
            {allForms.length > 1 && (
              <FormSelector forms={allForms} baseName={baseName} currentId={id} />
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
