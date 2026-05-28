"use client";

import { useState } from "react";
import type { Player } from "../../data/players";
import { getPlayerFlag } from "../../data/players";

interface PositionedPlayerCardProps {
  player: Player;
  positionX: number;
  positionY: number;
  onClick?: (player: Player) => void;
}

export default function PositionedPlayerCard({
  player,
  positionX,
  positionY,
  onClick,
}: PositionedPlayerCardProps) {
  const flag = getPlayerFlag(player.role);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 cursor-pointer hover:scale-110 transition-transform duration-200 group"
      style={{
        left: `${positionX}%`,
        top: `${100 - positionY}%`,
      }}
      onClick={() => onClick?.(player)}
    >
      {/* Player Circle with Image or Number */}
      <div className="relative">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#2d1b4e] to-[#4a306d] border-2 border-[#d4af37] shadow-lg flex items-center justify-center overflow-hidden group-hover:border-[#e8c547] group-hover:shadow-[#d4af37]/30 transition-all">
          {/* Image - only shown if it loads successfully */}
          {!imageError && (
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
          {/* Number - shown as fallback when image fails */}
          {imageError && (
            <span className="text-[#d4af37] font-display font-bold text-sm md:text-base">
              {player.number}
            </span>
          )}
        </div>
        {/* Flag badge */}
        <div className="absolute -bottom-1 -right-1 text-xs md:text-sm bg-white/90 rounded-full">
          {flag}
        </div>
      </div>

      {/* Player Name Label */}
      <div className="bg-[#1a0f2e]/90 backdrop-blur-sm px-2 py-0.5 rounded text-[#d4af37] text-[10px] md:text-xs font-display font-medium whitespace-nowrap group-hover:bg-[#1a0f2e] transition-colors border border-[#d4af37]/30">
        {player.name.split(" ").pop()}
      </div>
    </div>
  );
}
