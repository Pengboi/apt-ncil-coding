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
  const flag = getPlayerFlag(player.name, player.role);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 cursor-pointer hover:scale-115 transition-all duration-300 group z-10"
      style={{
        left: `${positionX}%`,
        top: `${100 - positionY}%`,
      }}
      onClick={() => onClick?.(player)}
    >
      {/* Player Circle with Enhanced Background */}
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-full bg-[#d4af37]/30 blur-md group-hover:bg-[#d4af37]/50 transition-all duration-300" />
        
        {/* Main player circle with gradient background */}
        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#2d1b4e] via-[#3d2460] to-[#1a0f2e] border-[3px] border-[#d4af37] shadow-xl shadow-black/40 flex items-center justify-center overflow-hidden group-hover:border-[#f4e4a6] group-hover:shadow-[#d4af37]/40 transition-all duration-300">
          {/* Subtle radial gradient overlay for depth */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20" />
          
          {/* Image - only shown if it loads successfully */}
          {!imageError && (
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover relative z-10"
              onError={() => setImageError(true)}
            />
          )}
          {/* Number - shown as fallback when image fails */}
          {imageError && (
            <span className="text-[#d4af37] font-display font-bold text-lg md:text-xl relative z-10 drop-shadow-lg">
              {player.number}
            </span>
          )}
        </div>
        
        {/* Flag badge with enhanced background */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center text-xs md:text-sm shadow-md border border-[#d4af37]/30 z-20">
          {flag}
        </div>
        
        {/* Jersey number badge */}
        <div className="absolute -top-1 -left-1 w-5 h-5 md:w-6 md:h-6 bg-[#d4af37] rounded-full flex items-center justify-center shadow-md z-20">
          <span className="text-[#1a0f2e] font-bold text-[10px] md:text-xs">{player.number}</span>
        </div>
      </div>

      {/* Player Name Label with enhanced background */}
      <div className="relative">
        {/* Label background glow */}
        <div className="absolute inset-0 bg-[#d4af37]/20 blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative bg-gradient-to-r from-[#1a0f2e]/95 via-[#2d1b4e]/95 to-[#1a0f2e]/95 backdrop-blur-sm px-3 py-1 rounded-lg text-[#d4af37] text-[10px] md:text-xs font-display font-semibold whitespace-nowrap group-hover:bg-[#2d1b4e] transition-all duration-300 border border-[#d4af37]/40 shadow-lg shadow-black/30">
          {player.name.split(" ").pop()}
        </div>
      </div>

      {/* Position indicator dot */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#d4af37]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
