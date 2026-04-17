import Link from "next/link";
import PokemonExplorer from "./components/PokemonExplorer";

export default async function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              {/* Animated pokeball logo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-600 animate-pulse-glow" />
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <span className="font-display font-bold text-xl text-white">P</span>
              </div>
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-slate-700 -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-slate-600 rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-slate-800" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-white tracking-wide">
                Neo-Pokédex
              </h1>
              <p className="font-data text-xs text-cyan-400 tracking-widest uppercase">
                Archives
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Link
              href="/price-tracker"
              className="btn btn-secondary text-xs py-2 px-4"
            >
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              Prices
            </Link>
            <Link
              href="/stats"
              className="btn btn-secondary text-xs py-2 px-4"
            >
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Stats
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Explore the World of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-400 to-yellow-400">
              Pokémon
            </span>
          </h2>
          
          <p className="font-body text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Access comprehensive base stats and browse the complete TCG card 
            collection in our futuristic digital archive.
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-8 text-center">
            <div>
              <div className="font-data text-3xl font-bold text-white">1000+</div>
              <div className="font-data text-sm text-slate-500 uppercase tracking-wider">
                Species
              </div>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div>
              <div className="font-data text-3xl font-bold text-white">18</div>
              <div className="font-data text-sm text-slate-500 uppercase tracking-wider">
                Types
              </div>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div>
              <div className="font-data text-3xl font-bold text-white">9</div>
              <div className="font-data text-sm text-slate-500 uppercase tracking-wider">
                Generations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        <div className="glass rounded-2xl p-6 md:p-8">
          <PokemonExplorer />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-slate-500">
            Data from{" "}
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              PokeAPI
            </a>{" "}
            &{" "}
            <a
              href="https://tcgdex.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              TCGdex
            </a>
          </p>
          <p className="font-data text-xs text-slate-600 tracking-wider uppercase">
            Neo-Pokédex Archives v2.0
          </p>
        </div>
      </footer>
    </div>
  );
}
