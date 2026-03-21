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
        {/* Pitch Container */}
        <div className="pitch-container absolute inset-0 rounded-2xl overflow-hidden">
          {/* Grass pattern stripes */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              background: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 10%,
                rgba(255,255,255,0.1) 10%,
                rgba(255,255,255,0.1) 20%
              )`
            }} />
          </div>

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
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.8"
            />

            {/* Halfway line */}
            <line
              x1="5"
              y1="66.67"
              x2="95"
              y2="66.67"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.8"
            />

            {/* Center circle */}
            <circle
              cx="50"
              cy="66.67"
              r="12"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.8"
            />
            <circle
              cx="50"
              cy="66.67"
              r="0.8"
              fill="rgba(255,255,255,0.9)"
            />

            {/* Goal area (bottom - home team) */}
            <rect
              x="35"
              y="5"
              width="30"
              height="10"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.8"
            />
            {/* Penalty area (bottom) */}
            <rect
              x="22.5"
              y="5"
              width="55"
              height="25"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.8"
            />
            {/* Penalty spot (bottom) */}
            <circle
              cx="50"
              cy="22"
              r="0.6"
              fill="rgba(255,255,255,0.9)"
            />
            {/* Penalty arc (bottom) */}
            <path
              d="M 38 30 A 12 12 0 0 1 62 30"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.8"
            />

            {/* Corner arcs */}
            <path
              d="M 5 10 Q 8 10 8 7"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.8"
            />
            <path
              d="M 95 10 Q 92 10 92 7"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.8"
            />
            <path
              d="M 5 123.33 Q 8 123.33 8 126.33"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.8"
            />
            <path
              d="M 95 123.33 Q 92 123.33 92 126.33"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.8"
            />
          </svg>

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
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[var(--surface)] border border-[#d4af37]/30 px-6 py-2 rounded-full shadow-lg">
          <span className="font-display text-[#d4af37] font-bold tracking-wider">4-3-3 Formation</span>
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
