"use client";

import { useState } from "react";
import type { Player } from "../../data/players";
import PositionedPlayerCard from "./PositionedPlayerCard";
import PlayerModal from "./PlayerModal";

interface FormationPitchProps {
  players: Player[];
}

export default function FormationPitch({ players }: FormationPitchProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPlayer(null), 200);
  };

  return (
    <>
      <div className="relative w-full aspect-[3/4] max-w-2xl mx-auto">
        {/* Stadium Background Effect */}
        <div className="absolute -inset-4 bg-gradient-to-b from-[#1a0f2e] via-[#2d1b4e] to-[#1a0f2e] rounded-3xl opacity-80 blur-sm" />
        
        {/* Crowd Effect Background */}
        <div className="absolute -inset-8 opacity-10" style={{
          background: `radial-gradient(circle at 50% 120%, #d4af37 0%, transparent 50%)`
        }} />

        {/* Pitch Container */}
        <div className="pitch-container absolute inset-0 rounded-2xl overflow-hidden border-4 border-[#d4af37]/40 shadow-2xl shadow-[#d4af37]/20">
          {/* Deep Grass Base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e4d2b] via-[#2d5a3d] to-[#1e4d2b]" />
          
          {/* Grass pattern stripes - vertical */}
          <div className="absolute inset-0 opacity-30">
            <div className="h-full w-full" style={{
              background: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 8%,
                rgba(255,255,255,0.15) 8%,
                rgba(255,255,255,0.15) 16%
              )`
            }} />
          </div>

          {/* Grass pattern stripes - horizontal for mowed effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 5%,
                rgba(0,0,0,0.1) 5%,
                rgba(0,0,0,0.1) 10%
              )`
            }} />
          </div>

          {/* Pitch Shadow/Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

          {/* Pitch Markings */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 133.33"
            preserveAspectRatio="none"
          >
            {/* Outer boundary */}
            <rect
              x="5"
              y="5"
              width="90"
              height="123.33"
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1"
            />

            {/* Halfway line */}
            <line
              x1="5"
              y1="66.67"
              x2="95"
              y2="66.67"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1"
            />

            {/* Center circle */}
            <circle
              cx="50"
              cy="66.67"
              r="12"
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1"
            />
            <circle
              cx="50"
              cy="66.67"
              r="0.8"
              fill="rgba(255,255,255,0.95)"
            />

            {/* Goal area (bottom - home team) */}
            <rect
              x="35"
              y="5"
              width="30"
              height="10"
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1"
            />
            {/* Penalty area (bottom) */}
            <rect
              x="22.5"
              y="5"
              width="55"
              height="25"
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1"
            />
            {/* Penalty spot (bottom) */}
            <circle
              cx="50"
              cy="22"
              r="0.6"
              fill="rgba(255,255,255,0.95)"
            />
            {/* Penalty arc (bottom) */}
            <path
              d="M 38 30 A 12 12 0 0 1 62 30"
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1"
            />

            {/* Goal line with net pattern indication */}
            <line
              x1="40"
              y1="5"
              x2="60"
              y2="5"
              stroke="rgba(212,175,55,0.6)"
              strokeWidth="2"
            />

            {/* Corner arcs */}
            <path
              d="M 5 10 Q 8 10 8 7"
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1"
            />
            <path
              d="M 95 10 Q 92 10 92 7"
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1"
            />
            <path
              d="M 5 123.33 Q 8 123.33 8 126.33"
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1"
            />
            <path
              d="M 95 123.33 Q 92 123.33 92 126.33"
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1"
            />
          </svg>

          {/* Starting XI Label */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#1a0f2e]/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#d4af37]/50">
            <span className="text-[#d4af37] text-xs font-bold tracking-widest uppercase">Starting XI</span>
          </div>

          {/* Players positioned on pitch */}
          {players.map((player) => (
            <PositionedPlayerCard
              key={player.slug}
              player={player}
              positionX={player.positionX}
              positionY={player.positionY}
              onClick={handlePlayerClick}
            />
          ))}
        </div>

        {/* Formation Label */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2d1b4e] via-[#1a0f2e] to-[#2d1b4e] border-2 border-[#d4af37]/50 px-8 py-3 rounded-full shadow-lg shadow-[#d4af37]/20">
          <span className="font-display text-[#d4af37] font-bold tracking-wider text-lg">4-3-3 Formation</span>
        </div>

        {/* Player Count Badge */}
        <div className="absolute -top-6 right-4 bg-[#d4af37] text-[#1a0f2e] px-4 py-2 rounded-full font-bold text-sm shadow-lg">
          {players.length} Players
        </div>
      </div>

      {/* Player Modal */}
      <PlayerModal
        player={selectedPlayer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
