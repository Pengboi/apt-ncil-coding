import type { Player } from '../../data/players';
import { getPlayerFlag } from '../../data/players';

export default function PlayerCard({ player }: { player: Player }) {
  const flag = getPlayerFlag(player.role);

  return (
    <div className="player-card group cursor-pointer">
      <div className="flex items-center gap-4">
        {/* Player Number Badge */}
        <div className="relative w-16 h-16 rounded-full player-number flex-none shadow-lg overflow-hidden">
          <span className="absolute inset-0 flex items-center justify-center font-display text-2xl">
            {player.number}
          </span>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"/>
        </div>
        
        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <div className="font-display text-lg font-bold text-[var(--foreground)] group-hover:text-[#d4af37] transition-colors truncate">
            {player.name}
          </div>
          <div className="text-sm text-[#d4af37] flex items-center gap-1 font-medium">
            {player.role}
            {flag && <span className="ml-1">{flag}</span>}
          </div>
          <div className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">
            {player.shortDescription}
          </div>
        </div>
        
        {/* Arrow indicator */}
        <div className="text-[var(--text-muted)] group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
