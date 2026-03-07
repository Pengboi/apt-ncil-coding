'use client';

import { EnemyTier } from '../types';
import { ENEMY_TIERS } from '../gameData';

interface CombatPanelProps {
  onFight: (level: number, tier: EnemyTier, bossName?: string) => void;
  playerLevel: number;
}

const ENEMIES = [
  { name: 'Goblin Scout', level: 5, tier: 'minion' as EnemyTier },
  { name: 'Orc Warrior', level: 15, tier: 'soldier' as EnemyTier },
  { name: 'Elite Knight', level: 30, tier: 'elite' as EnemyTier },
  { name: 'Champion', level: 45, tier: 'champion' as EnemyTier },
];

const BOSSES = [
  { name: 'Iron Golem', level: 50 },
  { name: 'Shadow Demon', level: 55 },
  { name: 'Flame Tyrant', level: 60 },
];

export function CombatPanel({ onFight, playerLevel }: CombatPanelProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span>⚔️</span>
        Combat
      </h3>

      {/* Regular Enemies */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Regular Enemies
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {ENEMIES.map((enemy) => {
            const tierInfo = ENEMY_TIERS[enemy.tier];
            const canFight = playerLevel >= enemy.level - 10;

            return (
              <button
                key={enemy.name}
                onClick={() => onFight(enemy.level, enemy.tier)}
                disabled={!canFight}
                className={`p-3 rounded-lg border text-left transition-all ${
                  canFight
                    ? 'bg-gray-900 border-gray-600 hover:border-amber-500 hover:bg-gray-800'
                    : 'bg-gray-900/50 border-gray-700 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white text-sm">{enemy.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    enemy.tier === 'minion' ? 'bg-gray-600' :
                    enemy.tier === 'soldier' ? 'bg-blue-600' :
                    enemy.tier === 'elite' ? 'bg-purple-600' :
                    'bg-orange-600'
                  }`}>
                    {tierInfo.label}
                  </span>
                </div>
                <div className="text-xs text-gray-500">Level {enemy.level}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bosses */}
      <div>
        <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">
          Bosses
        </h4>
        <div className="space-y-2">
          {BOSSES.map((boss) => {
            const canFight = playerLevel >= boss.level - 15;

            return (
              <button
                key={boss.name}
                onClick={() => onFight(boss.level, 'boss', boss.name)}
                disabled={!canFight}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  canFight
                    ? 'bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-500/50 hover:border-red-400'
                    : 'bg-gray-900/50 border-gray-700 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{boss.name}</div>
                    <div className="text-sm text-red-400">Level {boss.level} BOSS</div>
                  </div>
                  <span className="text-3xl">👹</span>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  Guaranteed Legendary Drop!
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
