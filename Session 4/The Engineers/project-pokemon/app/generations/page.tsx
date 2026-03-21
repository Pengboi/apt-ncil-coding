import Link from "next/link";
import PokemonCard from "../PokemonCard";

export default async function GenerationsPage() {
  const res = await fetch("https://pokeapi.co/api/v2/generation", { next: { revalidate: 60 * 60 } });
  const data = await res.json();
  const gens = data.results || [];

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Generations</h1>
          <Link href="/" className="text-sm text-sky-700">← Back</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gens.map((g: any) => (
            <Link key={g.name} href={`/generations/${g.name}`} className="block p-4 border rounded hover:shadow">
              <div className="font-semibold capitalize">{g.name.replace('-', ' ')}</div>
              <div className="text-sm text-slate-600 mt-1">View Pokémon in this generation</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
