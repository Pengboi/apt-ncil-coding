"use client";

import PlayerCard from './components/PlayerCard';
import FixturesList from './components/FixturesList';
import NextMatchHighlight from './components/NextMatchHighlight';
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
  const featuredPlayers = players.slice(0, 6);
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-royal">
      {/* Page Header Banner - Real Madrid Style */}
      <div className="w-full py-4 bg-[var(--rm-cream)] border-b border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center">
          <div className="page-header">
            <svg className="w-6 h-6 text-[var(--rm-gold)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span className="page-header-text">Home</span>
            <div className="w-2 h-2 rounded-full bg-[var(--rm-gold)] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hero Section - Royal White */}
      <section className="hero-section w-full py-20 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-[var(--rm-cream)] border border-[var(--border-subtle)]">
                <span className="w-2 h-2 rounded-full bg-[var(--rm-gold)] animate-pulse" />
                <span className="text-gold text-sm font-semibold uppercase tracking-wider">Official Fan Hub</span>
              </div>
              
              <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 text-[var(--text-primary)]">
                <span className="text-gold">Hala</span> Madrid!
              </h2>
              
              <p className="text-lg md:text-xl mb-8 text-[var(--text-secondary)] max-w-xl">
                Your premier destination for the latest news, fixtures, and exclusive content for the 
                <span className="text-gold font-semibold"> Real Madrid</span> family.
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

            {/* Hero Right Side - Next Match */}
            <div className="flex-1 w-full max-w-md">
              <NextMatchHighlight />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-20 bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="section-title-rm">About The Club</h3>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mt-8">
              Welcome to Madridista Zone – your premier destination for all things
              <span className="text-gold font-semibold"> Real Madrid</span>.
              We deliver the latest news, match info and merchandise for supporters worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Club Facts */}
            <div className="card-royal">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--rm-cream)] border border-[var(--border-subtle)] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--rm-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 className="font-display text-xl font-bold text-[var(--text-primary)]">Club Facts</h4>
              </div>
              <ul className="space-y-4">
                {[
                  { label: "Founded", value: "1902" },
                  { label: "Stadium", value: "Santiago Bernabéu" },
                  { label: "League", value: "La Liga" },
                  { label: "Colors", value: "White & Gold" },
                ].map((fact) => (
                  <li key={fact.label} className="flex justify-between items-center py-2 border-b border-[var(--border-subtle)]">
                    <span className="text-[var(--text-muted)]">{fact.label}</span>
                    <span className="font-semibold text-[var(--text-primary)]">{fact.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trophies */}
            <div className="card-royal">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--rm-gold)] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 3h14v2H5V3zm0 16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3H5v3zm14-8h-2V7h-2v4H9V7H7v4H5v2h2v4h2v-4h6v4h2v-4h2v-2z"/>
                  </svg>
                </div>
                <h4 className="font-display text-xl font-bold text-[var(--text-primary)]">Major Trophies</h4>
              </div>
              <ul className="space-y-4">
                {[
                  { count: "15", trophy: "Champions League" },
                  { count: "35", trophy: "La Liga Titles" },
                  { count: "20", trophy: "Copa del Rey" },
                  { count: "5", trophy: "FIFA Club World Cup" },
                ].map((item) => (
                  <li key={item.trophy} className="flex items-center gap-4 py-2 border-b border-[var(--border-subtle)]">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-white bg-[var(--rm-gold)]">
                      {item.count}x
                    </span>
                    <span className="text-[var(--text-primary)]">{item.trophy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Squad Section */}
      <section id="squad" className="w-full py-20 bg-[var(--rm-cream)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="section-title-rm">Featured Players</h3>
            <p className="text-[var(--text-secondary)] mt-8 max-w-xl mx-auto">
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

      {/* Fixtures Section - AUTHENTIC REAL MADRID */}
      <section id="fixtures" className="w-full py-20 relative bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-[var(--rm-cream)] border border-[var(--border-subtle)]">
              <svg className="w-4 h-4 text-[var(--rm-gold)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-gold uppercase tracking-wider">Live Data</span>
            </div>
            <h3 className="section-title-rm">Fixtures & Results</h3>
            <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
              Stay updated with the latest matches and results from TheSportsDB API
            </p>
          </div>
          
          <FixturesList />
        </div>
      </section>

      {/* Merchandise Section */}
      <section id="merch" className="w-full py-20 bg-[var(--rm-cream)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="section-title-rm">Official Merchandise</h3>
            <p className="text-[var(--text-secondary)] mt-8">
              Show your colors with official Real Madrid gear
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="card-royal text-center group">
                <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden bg-[var(--rm-cream)] border border-[var(--border-subtle)]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-display text-lg font-bold text-[var(--text-primary)] mb-1">
                  {product.name}
                </h4>
                <p className="text-sm text-[var(--text-muted)] mb-3">{product.description}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-display text-xl font-bold text-gold">
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

      {/* Footer - Real Madrid */}
      <footer className="w-full py-12 text-center bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path 
                  d="M50 5 L60 25 L75 15 L70 35 L90 30 L80 50 L95 70 L70 65 L75 90 L50 80 L25 90 L30 65 L5 70 L20 50 L10 30 L30 35 L25 15 L40 25 Z" 
                  fill="#D4AF37"
                />
                <rect x="45" y="30" width="10" height="25" fill="white"/>
                <rect x="37" y="38" width="26" height="10" fill="white"/>
              </svg>
            </div>
          </div>
          <p className="font-display text-2xl text-gold mb-2">Hala Madrid y nada más!</p>
          <p className="text-[var(--text-muted)] text-sm">Made with passion at APT Coding Camp</p>
          <div className="gold-line max-w-xs mx-auto mt-6" />
        </div>
      </footer>
    </main>
  );
}
