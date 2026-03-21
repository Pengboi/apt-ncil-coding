'use client';

import { useState, useEffect } from 'react';
import { getRealMadridFixtures, type FormattedMatch } from '../lib/sportmonks';

export default function FixturesList() {
  const [fixtures, setFixtures] = useState<FormattedMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'finished'>('upcoming');

  useEffect(() => {
    async function loadFixtures() {
      try {
        setLoading(true);
        setError(null);
        const data = await getRealMadridFixtures(activeTab, 5);
        setFixtures(data);
      } catch (err) {
        setError('Failed to load fixtures. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadFixtures();
  }, [activeTab]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3 text-[var(--text-muted)]">
          <div className="w-6 h-6 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"/>
          Loading fixtures...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {error}
        </div>
      </div>
    );
  }

  if (fixtures.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--text-muted)]">
        No {activeTab} fixtures found.
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeTab === 'upcoming'
              ? 'bg-[#d4af37] text-[#1a0f2e]'
              : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[#d4af37]'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('finished')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeTab === 'finished'
              ? 'bg-[#d4af37] text-[#1a0f2e]'
              : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[#d4af37]'
          }`}
        >
          Results
        </button>
      </div>

      {/* Fixtures List */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {fixtures.map((match) => (
          <div
            key={match.id}
            className="card-royal group cursor-pointer hover:border-[#d4af37]/50 transition-all"
          >
            {/* League Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="trophy-badge text-xs">
                {match.leagueShortCode || match.league}
              </span>
              {match.isCompleted && (
                <span className="text-xs text-green-500 font-medium">
                  FT
                </span>
              )}
            </div>

            {/* Match Details */}
            <div className="flex items-center justify-between gap-4">
              {/* Home Team */}
              <div className={`flex-1 text-right ${!match.isHome ? 'opacity-70' : ''}`}>
                <p className={`font-display font-bold ${!match.isHome ? 'text-[var(--foreground)]' : 'text-[#d4af37]'}`}>
                  {match.homeTeam}
                </p>
              </div>

              {/* Score/Time */}
              <div className="flex-shrink-0 px-6 py-3 bg-[var(--background)] rounded-lg border border-[var(--border)]">
                {match.isCompleted ? (
                  <div className="font-display text-2xl font-bold text-[#d4af37]">
                    {match.homeScore} - {match.awayScore}
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="font-display text-xl font-bold text-[#d4af37]">
                      {match.time}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      {match.date}
                    </div>
                  </div>
                )}
              </div>

              {/* Away Team */}
              <div className={`flex-1 text-left ${match.isHome ? 'opacity-70' : ''}`}>
                <p className={`font-display font-bold ${match.isHome ? 'text-[var(--foreground)]' : 'text-[#d4af37]'}`}>
                  {match.awayTeam}
                </p>
              </div>
            </div>

            {/* Venue Info */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[var(--border)]">
              <span className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                {match.venue}
              </span>
              {!match.isCompleted && (
                <span className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {match.date}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-8">
        <a
          href="https://www.realmadrid.com/en/football/schedule"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2"
        >
          View Full Schedule
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
