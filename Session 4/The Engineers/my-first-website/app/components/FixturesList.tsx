'use client';

import { useState, useEffect } from 'react';
import { getRealMadridFixtures, type FormattedMatch } from '../lib/thesportsdb';

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
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner-rm" />
          <span className="text-[var(--text-muted)] text-sm font-medium">
            Loading fixtures...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-50 border border-red-200">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span className="text-red-600 font-medium">{error}</span>
        </div>
      </div>
    );
  }

  if (fixtures.length === 0) {
    return (
      <div className="text-center py-14">
        <div className="card-royal inline-flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--rm-cream)] flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--rm-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <span className="text-[var(--text-muted)] font-medium">
            No {activeTab} fixtures found
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Royal Gold Tabs */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`tab-rm ${activeTab === 'upcoming' ? 'tab-rm-active' : 'tab-rm-inactive'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('finished')}
          className={`tab-rm ${activeTab === 'finished' ? 'tab-rm-active' : 'tab-rm-inactive'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Results
        </button>
      </div>

      {/* Authentic Real Madrid Match Cards */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        {fixtures.map((match, index) => (
          <div
            key={match.id}
            className="match-card-rm animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header with League Info */}
            <div className="match-header-rm px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="gold-badge">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  {match.leagueShortCode || match.league}
                </span>
                {match.isCompleted && (
                  <span className="status-badge-ft">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                    </svg>
                    Finished
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-[var(--text-muted)]">
                {match.date}
              </span>
            </div>

            {/* Match Content */}
            <div className="p-6">
              <div className="flex items-center justify-center gap-6 sm:gap-10">
                {/* Home Team */}
                <div className="flex-1 flex flex-col items-center gap-4">
                  <div className="relative">
                    {match.homeTeamBadge ? (
                      <img 
                        src={match.homeTeamBadge} 
                        alt={match.homeTeam}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[var(--rm-cream)] border border-[var(--border-subtle)] flex items-center justify-center">
                        <span className="font-display text-3xl sm:text-4xl text-gold">
                          {match.homeTeam.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`team-name-rm ${!match.isHome ? 'team-name-highlight' : ''}`}>
                      {match.homeTeam}
                    </p>
                    <span className="text-xs font-medium text-[var(--text-muted)]">Home</span>
                  </div>
                </div>

                {/* Score / Time Center */}
                <div className="flex-shrink-0">
                  {match.isCompleted ? (
                    <div className="flex items-center gap-3 bg-[var(--rm-cream)] px-6 py-4 rounded-2xl border border-[var(--border-subtle)]">
                      <span className="score-display-rm">{match.homeScore}</span>
                      <span className="text-[var(--text-muted)] font-display text-xl">-</span>
                      <span className="score-display-rm">{match.awayScore}</span>
                    </div>
                  ) : (
                    <div className="bg-[var(--rm-cream)] px-6 py-4 rounded-2xl border border-[var(--border-gold)] text-center">
                      <div className="time-display-rm">{match.time}</div>
                      <div className="text-xs font-medium mt-1 text-[var(--rm-gold)]">Kick-off</div>
                    </div>
                  )}
                </div>

                {/* Away Team */}
                <div className="flex-1 flex flex-col items-center gap-4">
                  <div className="relative">
                    {match.awayTeamBadge ? (
                      <img 
                        src={match.awayTeamBadge} 
                        alt={match.awayTeam}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[var(--rm-cream)] border border-[var(--border-subtle)] flex items-center justify-center">
                        <span className="font-display text-3xl sm:text-4xl text-[var(--text-secondary)]">
                          {match.awayTeam.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`team-name-rm ${match.isHome ? 'team-name-highlight' : ''}`}>
                      {match.awayTeam}
                    </p>
                    <span className="text-xs font-medium text-[var(--text-muted)]">Away</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Venue */}
            <div className="px-6 py-4 bg-[var(--rm-cream)] border-t border-[var(--border-subtle)] flex items-center justify-center gap-8">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <svg className="w-4 h-4 text-[var(--rm-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="font-medium">{match.venue}</span>
              </div>
              
              {!match.isCompleted && (
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <svg className="w-4 h-4 text-[var(--rm-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span className="font-medium">{match.date}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center pt-4">
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
