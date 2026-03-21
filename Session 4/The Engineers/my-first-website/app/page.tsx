"use client";

import PlayerCard from './components/PlayerCard';
import { players } from '../data/players';
import { useCart, type Product } from './context/CartContext';

// Product data
const products: Product[] = [
  {
    id: "home-jersey-2024-25",
    name: "Home Jersey 2024/25",
    description: "Classic white home kit",
    price: 89.99,
    image: "/images/home jersey photo.webp",
    category: "Kit"
  },
  {
    id: "official-scarf",
    name: "Official Scarf",
    description: "White & gold scarf",
    price: 24.99,
    image: "/images/scarf photo.avif",
    category: "Accessories"
  },
  {
    id: "club-mug",
    name: "Club Mug",
    description: "Ceramic mug with crest",
    price: 14.99,
    image: "/images/mug photo.jpg",
    category: "Accessories"
  }
];

export default function Home() {
  // Get featured players (first 6)
  const featuredPlayers = players.slice(0, 6);
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-main text-foreground">
      {/* Page Header Banner */}
      <div className="w-full bg-gradient-to-r from-[#2d1b4e] via-[#1a0f2e] to-[#2d1b4e] py-4 border-y border-[#d4af37]/30">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center">
          <div className="page-header">
            <svg className="w-6 h-6 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span className="page-header-text">Home</span>
            <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"/>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section w-full py-20 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"/>
                <span className="text-[#d4af37] text-sm font-medium uppercase tracking-wider">Official Fan Hub</span>
              </div>
              
              <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white">
                <span className="text-gradient-gold">Hala</span> Madrid!
              </h2>
              
              <p className="text-lg md:text-xl mb-8 text-white/70 max-w-xl">
                Your premier destination for the latest news, fixtures, and exclusive content for the 
                <span className="text-[#d4af37] font-semibold"> Real Madrid</span> family.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <a href="/squad" className="btn-primary w-full sm:w-auto">
                  Meet The Squad
                </a>
                <a href="#fixtures" className="btn-secondary w-full sm:w-auto">
                  View Fixtures
                </a>
              </div>
            </div>

            {/* Hero Image/Graphic */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                {/* Glowing orb background */}
                <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-3xl scale-150"/>
                <img 
                  src="/images/football.png" 
                  alt="Real Madrid Football" 
                  className="relative w-48 h-48 md:w-72 md:h-72 drop-shadow-2xl animate-float"
                />
                {/* Decorative ring */}
                <div className="absolute inset-0 border-2 border-[#d4af37]/30 rounded-full scale-125 animate-pulse"/>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent"/>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-20 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="section-title">About The Club</h3>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto mt-8">
              Welcome to Madridista Zone – your premier destination for all things
              <span className="text-[#d4af37] font-semibold"> Real Madrid</span>.
              We deliver the latest news, match info and merchandise for supporters worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Club Facts */}
            <div className="card-royal">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2d1b4e] to-[#4a306d] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 className="font-display text-xl font-bold text-[var(--foreground)]">Club Facts</h4>
              </div>
              <ul className="space-y-4">
                {[
                  { label: "Founded", value: "1902" },
                  { label: "Stadium", value: "Santiago Bernabéu" },
                  { label: "League", value: "La Liga" },
                  { label: "Colors", value: "White & Gold" },
                ].map((fact) => (
                  <li key={fact.label} className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                    <span className="text-[var(--text-muted)]">{fact.label}</span>
                    <span className="font-semibold text-[var(--foreground)]">{fact.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trophies */}
            <div className="card-royal">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#e8c547] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#1a0f2e]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 3h14v2H5V3zm0 16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3H5v3zm14-8h-2V7h-2v4H9V7H7v4H5v2h2v4h2v-4h6v4h2v-4h2v-2z"/>
                  </svg>
                </div>
                <h4 className="font-display text-xl font-bold text-[var(--foreground)]">Major Trophies</h4>
              </div>
              <ul className="space-y-4">
                {[
                  { count: "15", trophy: "Champions League" },
                  { count: "35", trophy: "La Liga Titles" },
                  { count: "20", trophy: "Copa del Rey" },
                  { count: "5", trophy: "FIFA Club World Cup" },
                ].map((item) => (
                  <li key={item.trophy} className="flex items-center gap-4 py-2 border-b border-[var(--border)]">
                    <span className="trophy-badge">{item.count}x</span>
                    <span className="text-[var(--foreground)]">{item.trophy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Squad Section */}
      <section id="squad" className="w-full py-20 bg-gradient-to-b from-[var(--background)] to-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="section-title">Featured Players</h3>
            <p className="text-[var(--text-muted)] mt-8 max-w-xl mx-auto">
              Meet the stars of our first team. Click on any player to view their full profile.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlayers.map((player) => (
              <PlayerCard key={player.slug} player={player} />
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/squad" className="btn-secondary">
              View Full Squad →
            </a>
          </div>
        </div>
      </section>

      {/* Fixtures Section */}
      <section id="fixtures" className="w-full py-20 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="section-title">Upcoming Matches</h3>
            <p className="text-[var(--text-muted)] mt-8">
              Don&apos;t miss the next thrilling encounter
            </p>
          </div>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { match: "Real Madrid vs Barcelona", venue: "Santiago Bernabéu", date: "Sun 14 Feb, 20:00", league: "LaLiga", isHome: true },
              { match: "Atletico Madrid vs Real Madrid", venue: "Wanda Metropolitano", date: "Sat 21 Feb, 18:30", league: "LaLiga", isHome: false },
              { match: "Real Madrid vs PSG", venue: "Santiago Bernabéu", date: "Wed 25 Feb, 20:00", league: "Champions League", isHome: true },
            ].map((fixture) => (
              <div 
                key={fixture.match}
                className="card-royal flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      fixture.isHome 
                        ? 'bg-[#d4af37]/20 text-[#d4af37]' 
                        : 'bg-[var(--text-muted)]/20 text-[var(--text-muted)]'
                    }`}>
                      {fixture.isHome ? 'Home' : 'Away'}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                      {fixture.league}
                    </span>
                  </div>
                  <div className="font-display text-lg font-bold text-[var(--foreground)] group-hover:text-[#d4af37] transition-colors">
                    {fixture.match}
                  </div>
                  <div className="text-sm text-[var(--text-muted)] flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      </svg>
                      {fixture.venue}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {fixture.date}
                    </span>
                  </div>
                </div>
                <div className="trophy-badge whitespace-nowrap">
                  {fixture.league}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Merchandise Section */}
      <section id="merch" className="w-full py-20 bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="section-title">Official Merchandise</h3>
            <p className="text-[var(--text-muted)] mt-8">
              Show your colors with official Real Madrid gear
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="card-royal text-center group">
                <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden bg-[var(--rm-gray-light)] dark:bg-[var(--rm-purple)]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-display text-lg font-bold text-[var(--foreground)] mb-1">
                  {product.name}
                </h4>
                <p className="text-sm text-[var(--text-muted)] mb-3">{product.description}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-display text-xl font-bold text-[#d4af37]">
                    £{product.price.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="btn-primary text-xs py-2 px-4"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path 
                  d="M50 5 L60 25 L75 15 L70 35 L90 30 L80 50 L95 70 L70 65 L75 90 L50 80 L25 90 L30 65 L5 70 L20 50 L10 30 L30 35 L25 15 L40 25 Z" 
                  fill="#d4af37"
                />
                <rect x="45" y="30" width="10" height="25" fill="white"/>
                <rect x="37" y="38" width="26" height="10" fill="white"/>
              </svg>
            </div>
          </div>
          <p className="font-display text-2xl text-[#d4af37] mb-2">Hala Madrid y nada más!</p>
          <p className="text-white/60 text-sm">Made with passion at APT Coding Camp</p>
          <div className="gold-line max-w-xs mx-auto mt-6"/>
        </div>
      </footer>
    </main>
  );
}
