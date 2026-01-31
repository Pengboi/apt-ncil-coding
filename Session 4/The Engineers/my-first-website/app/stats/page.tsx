import Link from "next/link";

const STAT_KEYS = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
];

async function fetchAllPokemon() {
  const listRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000", { next: { revalidate: 60 * 60 } });
  const list = await listRes.json();
  const results: { name: string; url: string }[] = list.results || [];

  const batchSize = 50;
  const details: any[] = [];

  for (let i = 0; i < results.length; i += batchSize) {
    const batch = results.slice(i, i + batchSize);
    const promises = batch.map((r) => fetch(r.url).then((r) => r.json()).catch(() => null));
    const res = await Promise.all(promises);
    details.push(...res.filter(Boolean));
  }

  return details;
}

export default async function AllStatsPage() {
  const all = await fetchAllPokemon();

  const rows = all.map((p: any) => {
    const parts = p.species.url.split("/").filter(Boolean);
    const id = p.id || (parts[parts.length - 1] as string);
    const stats: Record<string, number> = {};
    (p.stats || []).forEach((s: any) => (stats[s.stat.name] = s.base_stat));
    return { id, name: p.name, stats };
  });

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">All Pokémon — Base Stats</h1>
          <Link href="/" className="text-sm text-sky-700">← Back</Link>
        </div>

        <div className="overflow-x-auto border rounded">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Name</th>
                {STAT_KEYS.map((k) => (
                  <th key={k} className="p-2 capitalize">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r: any) => (
                <tr key={r.id} className="even:bg-white odd:bg-slate-50">
                  <td className="p-2">{r.id}</td>
                  <td className="p-2 capitalize"><Link href={`/pokemon/${r.id}`} className="text-sky-700 hover:underline">{r.name}</Link></td>
                  {STAT_KEYS.map((k) => (
                    <td key={k} className="p-2">{r.stats[k] ?? "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
