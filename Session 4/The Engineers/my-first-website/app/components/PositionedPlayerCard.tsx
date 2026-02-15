"use client";

import type { Player } from "../../data/players";
import { getPlayerFlag } from "../../data/players";

interface PositionedPlayerCardProps {
  player: Player;
  positionX: number;
  positionY: number;
}

export default function PositionedPlayerCard({
  player,
  positionX,
  positionY,
}: PositionedPlayerCardProps) {
  const flag = getPlayerFlag(player.role);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 cursor-pointer hover:scale-110 transition-transform duration-200"
      style={{
        left: `${positionX}%`,
        top: `${100 - positionY}%`, // Invert Y so 0 is at bottom (goal)
      }}
    >
      {/* Player Circle with Number */}
      <div className="relative">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-purple-900 to-purple-700 border-2 border-white/80 shadow-lg flex items-center justify-center overflow-hidden">
          <span className="text-white font-bold text-sm md:text-base">
            {player.number}
          </span>
        </div>
        {/* Flag badge */}
        <div className="absolute -bottom-1 -right-1 text-xs md:text-sm">
          {flag}
        </div>
      </div>

      {/* Player Name Label */}
      <div className="bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-white text-[10px] md:text-xs font-medium whitespace-nowrap">
        {player.name.split(" ").pop()}
      </div>
    </div>
  );
}
