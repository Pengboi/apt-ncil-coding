// ============================================
// RPG SYSTEM TYPES
// ============================================

export interface CharacterStats {
  strength: number;      // Physical damage, carrying capacity
  agility: number;       // Speed, dodge chance, critical hit
  intelligence: number;  // Magic damage, mana, skill points
  vitality: number;      // Health, stamina, regeneration
  luck: number;          // Drop rates, critical damage, random events
}

export interface DerivedStats {
  maxHealth: number;
  maxMana: number;
  attack: number;
  defense: number;
  speed: number;
  critChance: number;
  critDamage: number;
  dodgeChance: number;
}

export interface CharacterClass {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  baseStats: CharacterStats;
  statGrowth: CharacterStats; // Per level
  specialAbility: string;
  startingEquipment: string[];
}

export interface Character {
  id: string;
  name: string;
  level: number;
  experience: number;
  classId: string;
  stats: CharacterStats;
  derivedStats: DerivedStats;
  statPoints: number;
  skillPoints: number;
  equipment: Equipment;
  inventory: Item[];
  gold: number;
  createdAt: number;
}

export interface Equipment {
  weapon: Item | null;
  armor: Item | null;
  accessory: Item | null;
}

export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'consumable';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  stats?: Partial<CharacterStats>;
  effects?: string[];
  description: string;
  value: number;
}

export const STAT_MIN = 1;
export const STAT_MAX = 100;
export const STARTING_POINTS = 20;
export const POINTS_PER_LEVEL = 5;

// Experience needed for each level (exponential growth)
export function getExperienceForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

// Battle rewards
export interface BattleReward {
  experience: number;
  gold: number;
  items?: string[];
}

// Calculate derived stats from base stats
export function calculateDerivedStats(stats: CharacterStats, level: number): DerivedStats {
  return {
    maxHealth: 50 + (stats.vitality * 10) + (level * 5),
    maxMana: 20 + (stats.intelligence * 8) + (level * 3),
    attack: 5 + (stats.strength * 2) + Math.floor(stats.agility * 0.5),
    defense: Math.floor(stats.vitality * 1.5) + Math.floor(stats.agility * 0.5),
    speed: 5 + Math.floor(stats.agility * 0.3),
    critChance: Math.min(50, 5 + Math.floor(stats.agility * 0.4) + Math.floor(stats.luck * 0.2)),
    critDamage: 150 + Math.floor(stats.agility * 0.5),
    dodgeChance: Math.min(40, Math.floor(stats.agility * 0.3) + Math.floor(stats.luck * 0.2)),
  };
}
