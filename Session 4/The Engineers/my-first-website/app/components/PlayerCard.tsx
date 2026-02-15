import type { Player } from '../../data/players';

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden flex-none">
          <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-800 dark:text-white truncate">{player.name}</div>
          <div className="text-sm text-yellow-600">{player.role}</div>
          <div className="text-sm text-muted-foreground mt-1 truncate">{player.shortDescription}</div>
        </div>
      </div>
    </div>
  );
}
