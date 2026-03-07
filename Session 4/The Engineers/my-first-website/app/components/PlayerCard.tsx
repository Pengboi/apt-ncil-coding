import type { Player } from '../../data/players';
import { getPlayerFlag } from '../../data/players';

export default function PlayerCard({ player }: { player: Player }) {
  const flag = getPlayerFlag(player.role);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-900 to-purple-700 overflow-hidden flex-none border-2 border-white/20">
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            {player.number}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-800 dark:text-white">{player.name}</div>
          <div className="text-sm text-yellow-600 flex items-center gap-1">
            {player.role}
            {flag && <span className="ml-1">{flag}</span>}
          </div>
          <div className="text-sm text-muted-foreground mt-1">{player.shortDescription}</div>
        </div>
      </div>
    </div>
  );
}
