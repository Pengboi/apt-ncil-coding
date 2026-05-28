import PlayerCard from '../components/PlayerCard';
import FormationPitch from '../components/FormationPitch';
import { players } from '../../data/players';

const videoStart = 0;

export default function SquadPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-main text-foreground">
      {/* Page Header Banner */}
      <div className="w-full bg-gradient-to-r from-[#2d1b4e] via-[#1a0f2e] to-[#2d1b4e] py-4 border-y border-[#d4af37]/30">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-[#d4af37] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span className="text-sm font-medium uppercase tracking-wider">Back to Home</span>
          </a>
          
          <div className="page-header">
            <svg className="w-6 h-6 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="page-header-text">Squad</span>
            <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"/>
          </div>
          
          <div className="w-24"/> {/* Spacer for centering */}
        </div>
      </div>

      {/* Video Section */}
      <section className="w-full py-8 bg-gradient-to-b from-[var(--background)] to-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative w-full aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border-2 border-[#d4af37]/30">
            <iframe
              title="Match clip"
              src={`https://www.youtube.com/embed/XUPgMNeMVRc?autoplay=1&mute=1&start=${videoStart}&rel=0`}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-center text-[var(--text-muted)] text-sm mt-4">
            Watch the latest highlights and team action
          </p>
        </div>
      </section>

      {/* Formation Section */}
      <section className="w-full py-12 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="section-title">Tactical Formation</h2>
            <p className="text-[var(--text-muted)] mt-8 max-w-xl mx-auto">
              Explore our starting XI in their tactical positions. Click on any player to see detailed stats and information.
            </p>
          </div>

          {/* Formation Pitch */}
          <div className="mb-16">
            <FormationPitch players={players} />
          </div>
        </div>
      </section>

      {/* Squad Grid Section */}
      <section className="w-full py-12 bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="section-title text-left">Full Squad Roster</h2>
              <p className="text-[var(--text-muted)] mt-2">
                {players.length} players • Click for details
              </p>
            </div>
            
            {/* Position Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {["All", "Goalkeepers", "Defenders", "Midfielders", "Attackers"].map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === "All"
                      ? 'bg-[#d4af37] text-[#1a0f2e]'
                      : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[#d4af37]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player, index) => (
              <PlayerCard key={player.slug} player={player} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats Section */}
      <section className="w-full py-16 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="card-royal">
            <h3 className="font-display text-2xl font-bold text-center text-[var(--foreground)] mb-10">
              Squad Statistics
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Total Players", value: players.length.toString() },
                { label: "Average Age", value: "26.5" },
                { label: "Nationalities", value: "12" },
                { label: "Home Grown", value: "4" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-4xl font-bold text-[#d4af37] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[var(--text-muted)] text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="gold-line max-w-xs mx-auto mb-6"/>
          <p className="font-display text-2xl text-[#d4af37] mb-2">Hala Madrid y nada más!</p>
          <p className="text-white/60 text-sm">Made with passion at APT Coding Camp</p>
        </div>
      </footer>
    </main>
  );
}
