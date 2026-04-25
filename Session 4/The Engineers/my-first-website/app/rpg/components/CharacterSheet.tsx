'use client';

import { useState, useEffect } from 'react';
import { Character } from '../types';
import { getClassById } from '../data/classes';
import { getGold, getInventory, getCurrentRound, getSurvivalStreak } from '../data/storage';

interface CharacterSheetProps {
  character: Character;
  onLevelUp?: () => void;
  isEditable?: boolean;
}

const STAT_ICONS: Record<string, string> = {
  strength: '💪',
  agility: '⚡',
  intelligence: '🧠',
  vitality: '❤️',
  luck: '🍀',
};

const STAT_COLORS: Record<string, string> = {
  strength: '#ff00a0',
  agility: '#00f5ff',
  intelligence: '#8b5cf6',
  vitality: '#2ecc71',
  luck: '#ffb800',
};

export default function CharacterSheet({ character, onLevelUp, isEditable = false }: CharacterSheetProps) {
  const characterClass = getClassById(character.classId);

  if (!characterClass) return null;

  const xpPercent = (character.experience / (character.level * 100)) * 100;
  const hpPercent = (character.derivedStats.maxHealth / (character.derivedStats.maxHealth + 100)) * 100;
  const mpPercent = (character.derivedStats.maxMana / (character.derivedStats.maxMana + 50)) * 100;

  // Storage-managed stats
  const [storageGold, setStorageGold] = useState(0);
  const [storageInventoryCount, setStorageInventoryCount] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [survivalStreak, setSurvivalStreak] = useState(0);

  useEffect(() => {
    setStorageGold(getGold());
    setStorageInventoryCount(getInventory().items.length);
    setCurrentRound(getCurrentRound());
    setSurvivalStreak(getSurvivalStreak());
  }, []);

  return (
    <div className="glass-card rounded-2xl overflow-hidden corner-accent">
      {/* Header */}
      <div className="relative p-6 border-b border-[var(--edge)]" style={{ background: `linear-gradient(135deg, ${characterClass.color}10, transparent)` }}>
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <div 
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl"
              style={{ backgroundColor: `${characterClass.color}20`, border: `2px solid ${characterClass.color}` }}
            >
              {characterClass.icon}
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[var(--void)] border-2 border-[var(--arcane-cyan)] flex items-center justify-center">
              <span className="font-display font-bold text-sm text-[var(--arcane-cyan)]">{character.level}</span>
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h2 className="font-display text-3xl font-bold text-white mb-1">{character.name}</h2>
            <p className="font-body text-[var(--arcane-cyan)] mb-3">{characterClass.name}</p>
            
            {/* XP Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-body text-[var(--text-muted)]">Experience</span>
                <span className="font-body text-[var(--text-secondary)]">{character.experience} / {character.level * 100} XP</span>
              </div>
              <div className="h-2 bg-[var(--edge)] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[var(--legendary-amber)] to-[var(--mystic-magenta)] transition-all duration-500"
                  style={{ width: `${Math.min(100, xpPercent)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Level Up Button */}
          {isEditable && onLevelUp && character.statPoints > 0 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onLevelUp();
              }}
              className="btn-primary text-sm py-2 px-4 animate-pulse-glow relative z-50">
              +{character.statPoints} Points
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6 grid lg:grid-cols-2 gap-6">
        {/* Base Stats */}
        <div>
          <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
            <span>📊</span> Base Stats
          </h3>
          <div className="space-y-3">
            {Object.entries(character.stats).map(([stat, value]) => (
              <div key={stat} className="flex items-center gap-3">
                <span className="text-xl">{STAT_ICONS[stat]}</span>
                <span className="font-body text-sm text-[var(--text-secondary)] capitalize w-24">{stat}</span>
                <div className="flex-1 h-3 bg-[var(--edge)] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(value / 100) * 100}%`,
                      backgroundColor: STAT_COLORS[stat],
                    }}
                  />
                </div>
                <span className="font-display font-bold text-white w-10 text-right">{value}</span>
              </div>
            ))}
          </div>
          
          {/* Stat Points Info */}
          <div className="mt-4 p-3 rounded-lg bg-[var(--void)]/50 border border-[var(--edge)]">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-[var(--text-secondary)]">Available Stat Points</span>
              <span className={`font-display font-bold ${character.statPoints > 0 ? 'text-[var(--arcane-cyan)]' : 'text-[var(--text-muted)]'}`}>
                {character.statPoints}
              </span>
            </div>
            {character.statPoints === 0 && (
              <p className="font-body text-xs text-[var(--text-muted)] mt-1">
                💡 Gain XP from battles to level up and earn stat points!
              </p>
            )}
          </div>
        </div>

        {/* Derived Stats */}
        <div>
          <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
            <span>⚔️</span> Combat Stats
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <StatBox 
              label="Health" 
              value={character.derivedStats.maxHealth} 
              color="#e74c3c" 
              icon="❤️"
              barWidth={hpPercent}
            />
            <StatBox 
              label="Mana" 
              value={character.derivedStats.maxMana} 
              color="#3498db" 
              icon="💧"
              barWidth={mpPercent}
            />
            <StatBox 
              label="Attack" 
              value={character.derivedStats.attack} 
              color="#e67e22" 
              icon="⚔️"
            />
            <StatBox 
              label="Defense" 
              value={character.derivedStats.defense} 
              color="#95a5a6" 
              icon="🛡️"
            />
            <StatBox 
              label="Speed" 
              value={character.derivedStats.speed} 
              color="#2ecc71" 
              icon="⚡"
            />
            <StatBox 
              label="Crit Rate" 
              value={`${character.derivedStats.critChance}%`} 
              color="#f1c40f" 
              icon="🎯"
            />
            <StatBox 
              label="Crit Dmg" 
              value={`${character.derivedStats.critDamage}%`} 
              color="#e74c3c" 
              icon="💥"
            />
            <StatBox 
              label="Dodge" 
              value={`${character.derivedStats.dodgeChance}%`} 
              color="#9b59b6" 
              icon="💨"
            />
          </div>
        </div>
      </div>

      {/* Special Ability */}
      <div className="px-6 pb-6">
        <div className="p-4 rounded-xl border border-[var(--legendary-amber)]/30 bg-[var(--legendary-amber)]/5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✦</span>
            <div>
              <div className="font-display text-sm text-[var(--legendary-amber)] mb-1">SPECIAL ABILITY</div>
              <div className="font-body text-[var(--text-secondary)]">{characterClass.specialAbility}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment & Inventory Summary */}
      <div className="px-6 pb-6 grid md:grid-cols-2 gap-4">
        {/* Equipment */}
        <div className="p-4 rounded-xl bg-[var(--void)]/50">
          <h4 className="font-display text-sm text-[var(--text-muted)] mb-3">EQUIPMENT</h4>
          <div className="space-y-2">
            {['weapon', 'armor', 'accessory'].map((slot) => {
              const item = character.equipment[slot as keyof typeof character.equipment];
              return (
                <div key={slot} className="flex items-center gap-3 p-2 rounded-lg bg-[var(--surface)]">
                  <span className="text-lg">
                    {slot === 'weapon' ? '⚔️' : slot === 'armor' ? '👕' : '💍'}
                  </span>
                  <div className="flex-1">
                    <div className="font-body text-sm text-[var(--text-muted)] capitalize">{slot}</div>
                    <div className="font-body text-white">
                      {item ? item.name : <span className="text-[var(--text-muted)] italic">Empty</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats - Storage Managed */}
        <div className="p-4 rounded-xl bg-[var(--void)]/50">
          <h4 className="font-display text-sm text-[var(--text-muted)] mb-3">BATTLE PROGRESS</h4>
          <div className="space-y-2 font-body text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Current Round</span>
              <span className="text-white font-bold">{currentRound}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Win Streak</span>
              <span className="text-[var(--legendary-amber)]">{survivalStreak} 🔥</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Gold</span>
              <span className="text-[var(--arcane-cyan)]">🪙 {storageGold}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Inventory</span>
              <span className="text-[var(--mystic-magenta)]">{storageInventoryCount} items</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Stat Points</span>
              <span className={character.statPoints > 0 ? 'text-[var(--arcane-cyan)]' : 'text-white'}>
                {character.statPoints}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Skill Points</span>
              <span className="text-white">{character.skillPoints}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color, icon, barWidth }: { label: string; value: string | number; color: string; icon: string; barWidth?: number }) {
  return (
    <div className="p-3 rounded-lg bg-[var(--void)]/50">
      <div className="flex items-center gap-2 mb-2">
        <span>{icon}</span>
        <span className="font-body text-xs text-[var(--text-muted)]">{label}</span>
      </div>
      <div className="font-display text-xl font-bold mb-1" style={{ color }}>{value}</div>
      {barWidth !== undefined && (
        <div className="h-1.5 bg-[var(--edge)] rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, barWidth)}%`, backgroundColor: color }}
          />
        </div>
      )}
    </div>
  );
}
