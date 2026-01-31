import Link from "next/link";
import NameSpeak from "./NameSpeak";
import PokemonCard from "./PokemonCard";
import PokemonExplorer from "./components/PokemonExplorer";

type PokemonListItem = {
  name: string;
  url: string;
};

export default async function Home() {
  // client-side explorer handles fetching and filtering

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-white">
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Every Pokémon</h1>
        <nav className="flex items-center gap-4">
          <p className="text-sm text-slate-700">Data from PokeAPI</p>
          <Link href="/stats" className="text-sm text-sky-700 hover:underline">All Base Stats</Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <p className="mb-4 text-slate-700">Browse the list and click a Pokémon to view details. Use search and filters to narrow results.</p>

        <PokemonExplorer />
      </main>
    </div>
  );
}
