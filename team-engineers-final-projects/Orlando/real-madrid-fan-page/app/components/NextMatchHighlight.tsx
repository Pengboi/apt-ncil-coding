'use client';

import { useState, useEffect } from 'react';
import { getNextMatch, type FormattedMatch } from '../lib/thesportsdb';

export default function NextMatchHighlight() {
  const [nextMatch, setNextMatch] = useState<FormattedMatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isLive, setIsLive] = useState(false);

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
        setIsLive(true);
        setCountdown({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown({ days, hours, minutes });
      setIsLive(false);
    }, 1000);

    // Initial call
    const now = new Date().getTime();
    const matchDate = new Date(`${nextMatch.date} ${nextMatch.time}`).getTime();
    const distance = matchDate - now;
    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      setCountdown({ days, hours, minutes });
    } else {
      setIsLive(true);
    }

    return () => clearInterval(timer);
  }, [nextMatch]);

  if (loading) {
    return (
      <div className="card-royal flex items-center justify-center py-10">
        <div className="flex items-center gap-3">
          <div className="spinner-rm" />
          <span className="text-[var(--text-muted)] font-medium">Loading next match...</span>
        </div>
      </div>
    );
  }

  if (!nextMatch) {
    return null;
  }

  return (
    <div className="card-royal relative overflow-hidden">
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--rm-gold)]" />
      
      <div className="relative pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--rm-gold)] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Next Match
            </span>
          </div>
          <span className="gold-badge">
            {nextMatch.league}
          </span>
        </div>

        {/* Teams Display */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-8 px-6">
          {/* Home Team */}
          <div className="flex-1 flex flex-col items-center gap-4">
            <div className="relative">
              {nextMatch.homeTeamBadge ? (
                <img 
                  src={nextMatch.homeTeamBadge} 
                  alt={nextMatch.homeTeam}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[var(--rm-cream)] border border-[var(--border-subtle)] flex items-center justify-center">
                  <span className="font-display text-4xl sm:text-5xl text-gold">
                    {nextMatch.homeTeam.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-xl bg-[var(--rm-white)] border border-[var(--border-subtle)] flex items-center justify-center text-xs font-bold text-[var(--text-muted)]">
                H
              </div>
            </div>
            <div className="text-center">
              <p className={`team-name-rm ${!nextMatch.isHome ? 'team-name-highlight' : ''}`}>
                {nextMatch.homeTeam}
              </p>
              <span className="text-xs font-medium text-[var(--text-muted)]">Home</span>
            </div>
          </div>

          {/* VS or Live */}
          <div className="flex-shrink-0">
            {isLive ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-display text-lg text-red-600 tracking-wider">LIVE</span>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-[var(--rm-gold)] opacity-20 blur-xl" />
                <div className="relative px-6 py-3 rounded-2xl bg-[var(--rm-cream)] border-2 border-[var(--rm-gold)]">
                  <span className="font-display text-2xl sm:text-3xl text-gold tracking-wider">VS</span>
                </div>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center gap-4">
            <div className="relative">
              {nextMatch.awayTeamBadge ? (
                <img 
                  src={nextMatch.awayTeamBadge} 
                  alt={nextMatch.awayTeam}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[var(--rm-cream)] border border-[var(--border-subtle)] flex items-center justify-center">
                  <span className="font-display text-4xl sm:text-5xl text-[var(--text-secondary)]">
                    {nextMatch.awayTeam.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-xl bg-[var(--rm-white)] border border-[var(--border-subtle)] flex items-center justify-center text-xs font-bold text-[var(--text-muted)]">
                A
              </div>
            </div>
            <div className="text-center">
              <p className={`team-name-rm ${nextMatch.isHome ? 'team-name-highlight' : ''}`}>
                {nextMatch.awayTeam}
              </p>
              <span className="text-xs font-medium text-[var(--text-muted)]">Away</span>
            </div>
          </div>
        </div>

        {/* Match Info */}
        <div className="flex items-center justify-center gap-10 mb-6 px-6">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <svg className="w-4 h-4 text-[var(--rm-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span className="font-medium">{nextMatch.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <svg className="w-4 h-4 text-[var(--rm-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="font-medium">{nextMatch.time}</span>
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)] mb-6 px-6">
          <svg className="w-4 h-4 text-[var(--rm-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span className="font-medium">{nextMatch.venue}</span>
        </div>

        {/* Countdown */}
        {!isLive && (
          <div className="pt-6 border-t border-[var(--border-subtle)] bg-[var(--rm-cream)] px-6 pb-6">
            <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
              Kick-off in
            </p>
            <div className="flex items-center justify-center gap-6 sm:gap-8">
              <div className="text-center">
                <div className="countdown-digit-rm">{String(countdown.days).padStart(2, '0')}</div>
                <div className="text-xs font-medium text-[var(--text-muted)] mt-1 uppercase tracking-wider">Days</div>
              </div>
              <div className="text-gold font-display text-2xl sm:text-3xl">:</div>
              <div className="text-center">
                <div className="countdown-digit-rm">{String(countdown.hours).padStart(2, '0')}</div>
                <div className="text-xs font-medium text-[var(--text-muted)] mt-1 uppercase tracking-wider">Hours</div>
              </div>
              <div className="text-gold font-display text-2xl sm:text-3xl">:</div>
              <div className="text-center">
                <div className="countdown-digit-rm">{String(countdown.minutes).padStart(2, '0')}</div>
                <div className="text-xs font-medium text-[var(--text-muted)] mt-1 uppercase tracking-wider">Mins</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
