'use client';

import { Character, DerivedStats, CharacterStats } from '../types';
import { STAT_LABELS, RARITY_INFO } from '../gameData';
import { getScalingColor, formatNumber } from '../utils';

interface CharacterSheetProps {
  character: Character & {
    effectiveStats: CharacterStats;
    derivedStats: DerivedStats;
    bonuses: Record<string, number>;
  };
}

export function CharacterSheet({ character }: CharacterSheetProps) {
  const classNames: Record<string, string> = {
    knight: 'Knight',
    tank: 'Tank',
    samurai: 'Samurai',
    mage: 'Mage'
  };

  const weapon = character.equippedWeapon;

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">{character.name}</h2>
          <p className="text-amber-400">Level {character.level} {classNames[character.classType]}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">{character.level}</div>
          <div className="text-xs text-gray-500">LEVEL</div>
        </div>
      </div>

      {/* Derived Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard 
          label="Max HP" 
          value={formatNumber(character.derivedStats.maxHp)} 
          icon="❤️" 
          color="red"
        />
        <StatCard 
          label="Stamina" 
          value={formatNumber(character.derivedStats.maxStamina)} 
          icon="⚡" 
          color="yellow"
        />
        <StatCard 
          label="Defense" 
          value={formatNumber(character.derivedStats.defense)} 
          icon="🛡️" 
          color="blue"
        />
        <StatCard 
          label="Crit" 
          value={`${character.derivedStats.critChance.toFixed(1)}%`} 
          icon="💥" 
          color="purple"
        />
      </div>

      {/* Base Stats */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Base Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(character.stats).map(([stat, value]) => {
            const effectiveValue = character.effectiveStats[stat as keyof CharacterStats];
            const hasBonus = effectiveValue !== value;
            
            return (
              <div key={stat} className="bg-gray-900 rounded-lg p-3">
                <div className="text-xs text-gray-500 uppercase">{STAT_LABELS[stat as keyof CharacterStats]}</div>
                <div className={`text-lg font-bold ${hasBonus ? 'text-green-400' : 'text-gray-300'}`}>
                  {value}
                  {hasBonus && <span className="text-sm text-green-400 ml-1">(+{effectiveValue - value})</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weapon */}
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Weapon</h3>
        <div className="flex items-start gap-4">
          <div className="text-4xl">{weapon.icon || '⚔️'}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-white">{weapon.name}</span>
              {weapon.ability && (
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded">
                  {weapon.ability.name}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mb-2">{weapon.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-gray-500">Damage:</span>
                <span className="text-white ml-1">{weapon.baseDamage}</span>
              </div>
              <div>
                <span className="text-gray-500">Type:</span>
                <span className="text-white ml-1 capitalize">{weapon.damageType}</span>
              </div>
              <div>
                <span className="text-gray-500">Stamina:</span>
                <span className="text-white ml-1">{weapon.staminaCost}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              {Object.entries(weapon.scaling).map(([stat, grade]) => (
                <div key={stat} className="text-sm">
                  <span className="text-gray-500 uppercase text-xs">{stat.slice(0, 3)}</span>
                  <span className={`ml-1 font-bold ${getScalingColor(grade)}`}>{grade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { 
  label: string; 
  value: string; 
  icon: string; 
  color: string;
}) {
  const colors: Record<string, string> = {
    red: 'from-red-500/20 to-red-600/20 border-red-500/30',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} rounded-lg border p-3`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400 uppercase">{label}</div>
    </div>
  );
}
