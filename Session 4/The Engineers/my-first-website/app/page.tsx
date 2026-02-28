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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Every Pokémon</h1>
          </div>
          <nav className="flex items-center gap-4">
            <p className="text-sm text-slate-500">Data from PokeAPI</p>
            <Link href="/stats" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">All Base Stats</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
          <p className="text-slate-600">Browse the list and click a Pokémon to view details. Use search and filters to narrow results.</p>
        </div>

        <PokemonExplorer />
      </main>
    </div>
  );
}
