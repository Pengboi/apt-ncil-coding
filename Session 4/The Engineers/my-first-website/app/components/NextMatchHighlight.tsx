'use client';

import { useState, useEffect } from 'react';
import { getNextMatch, type FormattedMatch } from '../lib/sportmonks';

export default function NextMatchHighlight() {
  const [nextMatch, setNextMatch] = useState<FormattedMatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    async function loadNextMatch() {
      try {
        const match = await getNextMatch();
        setNextMatch(match);
      } catch (error) {
        console.error('Error loading next match:', error);
      } finally {
        setLoading(false);
      }
    }

    loadNextMatch();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!nextMatch) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const matchDate = new Date(`${nextMatch.date} ${nextMatch.time}`).getTime();
      const distance = matchDate - now;

      if (distance < 0) {
        setCountdown('Match Started!');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown(`${days}d ${hours}h ${minutes}m`);
    }, 60000); // Update every minute

    // Initial call
    const now = new Date().getTime();
    const matchDate = new Date(`${nextMatch.date} ${nextMatch.time}`).getTime();
    const distance = matchDate - now;
    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      setCountdown(`${days}d ${hours}h ${minutes}m`);
    }

    return () => clearInterval(timer);
  }, [nextMatch]);

  if (loading) {
    return (
      <div className="bg-[#1a0f2e]/60 backdrop-blur-md rounded-xl p-6 border border-[#d4af37]/30">
        <div className="flex items-center justify-center gap-2 text-[#d4af37]">
          <div className="w-4 h-4 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"/>
          Loading next match...
        </div>
      </div>
    );
  }

  if (!nextMatch) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-[#2d1b4e]/80 to-[#1a0f2e]/80 backdrop-blur-md rounded-xl p-6 border border-[#d4af37]/30">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
          Next Match
        </span>
        <span className="text-xs text-[var(--text-muted)]">
          {nextMatch.league}
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className={`flex-1 text-center ${!nextMatch.isHome ? 'opacity-70' : ''}`}>
          <p className={`font-display text-sm font-bold ${!nextMatch.isHome ? 'text-[var(--foreground)]' : 'text-[#d4af37]'}`}>
            {nextMatch.homeTeam}
          </p>
          <span className="text-xs text-[var(--text-muted)]">Home</span>
        </div>

        <div className="px-4 py-2 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/30">
          <span className="font-display text-xl font-bold text-[#d4af37]">VS</span>
        </div>

        <div className={`flex-1 text-center ${nextMatch.isHome ? 'opacity-70' : ''}`}>
          <p className={`font-display text-sm font-bold ${nextMatch.isHome ? 'text-[var(--foreground)]' : 'text-[#d4af37]'}`}>
            {nextMatch.awayTeam}
          </p>
          <span className="text-xs text-[var(--text-muted)]">Away</span>
        </div>
      </div>

      {/* Match Details */}
      <div className="flex items-center justify-center gap-6 text-sm text-[var(--text-muted)] mb-4">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          {nextMatch.date}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {nextMatch.time}
        </span>
      </div>

      {/* Venue */}
      <p className="text-center text-xs text-[var(--text-muted)] mb-4">
        📍 {nextMatch.venue}
      </p>

      {/* Countdown */}
      {countdown && (
        <div className="text-center pt-4 border-t border-[#d4af37]/20">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
            Kick-off in
          </p>
          <p className="font-display text-2xl font-bold text-[#d4af37]">
            {countdown}
          </p>
        </div>
      )}
    </div>
  );
}
