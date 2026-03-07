"use client";

import type { Player } from "../../data/players";
import { getPlayerFlag } from "../../data/players";
import { useEffect, useState } from "react";

interface PlayerModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PlayerModal({ player, isOpen, onClose }: PlayerModalProps) {
  const [imageError, setImageError] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset image error state when modal opens with new player
  useEffect(() => {
    if (isOpen) {
      setImageError(false);
    }
  }, [isOpen, player]);

  if (!isOpen || !player) return null;

  const flag = getPlayerFlag(player.role);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Player Image Header */}
        <div className="relative h-72 bg-gradient-to-br from-purple-900 to-purple-700 overflow-hidden">
          {!imageError ? (
            <img
              src={player.image}
              alt={player.name}
              className="absolute inset-0 w-full h-full object-contain object-center"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-white/30">{player.number}</span>
            </div>
          )}
          
          {/* Gradient overlay at bottom for text readability */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          
          {/* Player Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-2xl">{player.number}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-white truncate">{player.name}</h2>
              <p className="text-white/90 flex items-center gap-2">
                {player.role}
                {flag && <span className="text-xl">{flag}</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Player Info */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              About
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {player.shortDescription}
            </p>
          </div>

          {/* Player Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {player.number}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">Number</div>
            </div>
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {flag || "🏳️"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">Nationality</div>
            </div>
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {getPositionAbbreviation(player.role)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">Position</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get position abbreviation
function getPositionAbbreviation(role: string): string {
  if (role.includes("Goalkeeper")) return "GK";
  if (role.includes("Center-back")) return "CB";
  if (role.includes("Left-back")) return "LB";
  if (role.includes("Right-back")) return "RB";
  if (role.includes("Defensive Midfielder")) return "CDM";
  if (role.includes("Central Midfielder")) return "CM";
  if (role.includes("Right Midfielder")) return "RM";
  if (role.includes("Left Midfielder")) return "LM";
  if (role.includes("Striker")) return "ST";
  if (role.includes("Left Winger")) return "LW";
  if (role.includes("Right Winger")) return "RW";
  return "N/A";
}
