// ============================================
// PROGRESSIVE BATTLE SYSTEM - Enhanced Monsters
// ============================================

import { CharacterStats } from '../types';
import { rollItemDrops } from './items';

export interface Monster {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: number;
  stats: CharacterStats;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  experienceReward: number;
  goldReward: number;
  abilities: MonsterAbility[];
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'boss';
  color: string;
  dropChance: number; // 0-1 probability
  dropTable?: string[]; // Item IDs this monster can drop
}

export interface MonsterAbility {
  name: string;
  description: string;
  damage?: number;
  healing?: number;
  effect?: 'healing' | 'stun' | 'dot' | 'drain' | 'confuse' | 'buff' | 'aoe' | 'regenerate' | 'randomize' | 'immune';
  effectValue?: number;
  cooldown: number;
  aoe?: boolean; // Area of effect - hits all enemies
}

export interface BattleReward {
  experience: number;
  gold: number;
  items: string[];
  roundBonus?: number;
}

// ============================================
// DIFFICULTY SCALING SYSTEM
// ============================================

export function getDifficultyMultiplier(round: number): number {
  // REVISED: Early rounds now have better scaling so enemies aren't pushovers
  if (round === 1) return 1.0; // Starting round - normal
  if (round <= 5) return 1.1 + (round * 0.05); // Rounds 2-5: 1.15, 1.2, 1.25, 1.3
  if (round <= 9) return 1.3 + ((round - 5) * 0.05); // Gradual increase
  if (round === 10) return 1.5; // Boss 1 - stronger
  if (round <= 15) return 1.6;
  if (round <= 19) return 1.8;
  if (round === 20) return 2.0; // Boss 2
  if (round <= 25) return 2.2;
  if (round <= 29) return 2.5;
  if (round === 30) return 2.8; // Boss 3
  if (round <= 35) return 3.0;
  if (round <= 39) return 3.3;
  if (round === 40) return 3.5; // Boss 4
  if (round <= 45) return 3.8;
  if (round <= 49) return 4.0;
  if (round === 50) return 4.5; // Boss 5 - ultimate challenge
  return 4.5 + (Math.floor((round - 50) / 5) * 0.2); // Endless scaling - faster increase
}

export function getEnemyCountForRound(round: number): number {
  if (round <= 15) return 1;
  if (round <= 29) return Math.random() > 0.5 ? 1 : 2;
  if (round <= 39) return 2;
  return Math.random() > 0.3 ? 2 : 3; // Mostly 2-3 enemies
}

export function isBossRound(round: number): boolean {
  return round % 10 === 0 && round <= 50;
}

// ============================================
// BOSS DEFINITIONS
// ============================================

export const BOSSES: Record<number, Monster> = {
  10: {
    id: 'basilisk_of_infinite_loops',
    name: 'Basilisk of Infinite Loops',
    description: 'A serpentine horror that regenerates endlessly. Break the cycle or be consumed by repetition.',
    icon: '🐍',
    level: 10,
    stats: { strength: 15, agility: 12, intelligence: 20, vitality: 25, luck: 10 },
    maxHealth: 500,
    attack: 50,
    defense: 25,
    speed: 15,
    experienceReward: 300,
    goldReward: 150,
    abilities: [
      { 
        name: 'Infinite Recursion', 
        description: 'Heals 10% HP', 
        healing: 50, 
        effect: 'regenerate', 
        effectValue: 50,
        cooldown: 3 
      },
      { 
        name: 'Stack Overflow', 
        description: 'Deals heavy damage and causes bleeding', 
        damage: 60, 
        effect: 'dot', 
        effectValue: 10,
        cooldown: 2 
      },
      { 
        name: 'Circular Reference', 
        description: 'Traps you in a damaging loop', 
        damage: 40, 
        effect: 'dot', 
        effectValue: 15,
        cooldown: 4 
      },
    ],
    rarity: 'boss',
    color: '#2ecc71',
    dropChance: 1.0, // Guaranteed drop
    dropTable: ['serpent_scale', 'loop_breaker', 'recursion_ring'],
  },
  
  20: {
    id: 'shapeshifter_of_null',
    name: 'Shapeshifter of Null',
    description: 'Nothingness given form. It randomizes its stats constantly, making it unpredictable.',
    icon: '👤',
    level: 20,
    stats: { strength: 20, agility: 25, intelligence: 30, vitality: 20, luck: 40 },
    maxHealth: 800,
    attack: 70,
    defense: 30,
    speed: 20,
    experienceReward: 500,
    goldReward: 250,
    abilities: [
      { 
        name: 'Null Pointer', 
        description: 'Randomizes stats and becomes immune', 
        damage: 0, 
        effect: 'randomize', 
        cooldown: 4 
      },
      { 
        name: 'Void Touch', 
        description: 'Drains life and confuses', 
        damage: 80, 
        effect: 'drain', 
        effectValue: 40,
        cooldown: 2 
      },
      { 
        name: 'Segmentation Fault', 
        description: 'Massive chaotic damage', 
        damage: 100, 
        cooldown: 3 
      },
    ],
    rarity: 'boss',
    color: '#34495e',
    dropChance: 1.0,
    dropTable: ['void_shard', 'null_amulet', 'shifter_cloak'],
  },
  
  30: {
    id: 'golem_of_spaghetti_code',
    name: 'Golem of Spaghetti Code',
    description: 'Built without structure or plan. Slow but crushingly powerful. Only critical hits pierce its armor.',
    icon: '🗿',
    level: 30,
    stats: { strength: 50, agility: 5, intelligence: 15, vitality: 60, luck: 5 },
    maxHealth: 1200,
    attack: 90,
    defense: 50,
    speed: 8,
    experienceReward: 800,
    goldReward: 400,
    abilities: [
      { 
        name: 'Tangled Logic', 
        description: 'Stuns and deals heavy damage', 
        damage: 120, 
        effect: 'stun', 
        cooldown: 5 
      },
      { 
        name: 'Copy-Paste Strike', 
        description: 'Hits twice', 
        damage: 80, 
        cooldown: 2 
      },
      { 
        name: 'Refactor Demolition', 
        description: 'Devastating single blow', 
        damage: 180, 
        cooldown: 6 
      },
    ],
    rarity: 'boss',
    color: '#95a5a6',
    dropChance: 1.0,
    dropTable: ['golem_core', 'spaghetti_code', 'modular_plate'],
  },
  
  40: {
    id: 'chimera_of_bad_ux',
    name: 'Chimera of Bad UX',
    description: 'Beautiful to the eye, unusable to the hand. Confuses and frustrates all who face it.',
    icon: '🦁',
    level: 40,
    stats: { strength: 35, agility: 45, intelligence: 40, vitality: 35, luck: 35 },
    maxHealth: 1500,
    attack: 110,
    defense: 40,
    speed: 25,
    experienceReward: 1200,
    goldReward: 600,
    abilities: [
      { 
        name: 'Confusing Interface', 
        description: 'Confuses and steals gold', 
        damage: 60, 
        effect: 'confuse', 
        effectValue: 20,
        cooldown: 3 
      },
      { 
        name: '404 Strike', 
        description: 'Attack that misses then hits', 
        damage: 140, 
        cooldown: 2 
      },
      { 
        name: 'User Rage', 
        description: 'The frustration builds up', 
        damage: 200, 
        effect: 'confuse',
        cooldown: 5 
      },
    ],
    rarity: 'boss',
    color: '#e67e22',
    dropChance: 1.0,
    dropTable: ['ux_crystal', 'interface_fragment', 'chimera_horn'],
  },
  
  50: {
    id: 'titan_of_artificial_chaos',
    name: 'Titan of Artificial Chaos',
    description: 'The final challenge. Intelligence without wisdom. It has three attack patterns that rotate unpredictably.',
    icon: '🤖',
    level: 50,
    stats: { strength: 60, agility: 50, intelligence: 100, vitality: 80, luck: 50 },
    maxHealth: 2000,
    attack: 130,
    defense: 60,
    speed: 30,
    experienceReward: 2000,
    goldReward: 1000,
    abilities: [
      { 
        name: 'Neural Overload', 
        description: 'AOE pattern - damages everything', 
        damage: 100, 
        aoe: true,
        cooldown: 3 
      },
      { 
        name: 'Life Drain Protocol', 
        description: 'Drains pattern - heals while damaging', 
        damage: 120, 
        effect: 'drain', 
        effectValue: 60,
        cooldown: 2 
      },
      { 
        name: 'Singularity Strike', 
        description: 'Ultimate damage pattern', 
        damage: 300, 
        cooldown: 5 
      },
    ],
    rarity: 'boss',
    color: '#8e44ad',
    dropChance: 1.0,
    dropTable: ['titan_core', 'ai_consciousness', 'chaos_orb', 'paragon_crown'],
  },
};

// ============================================
// REGULAR MONSTERS
// ============================================

export const REGULAR_MONSTERS: Monster[] = [
  // COMMON - Level 1-5 (BUFFED: Higher base stats for challenge)
  {
    id: 'bug_slime',
    name: 'Bug Slime',
    description: 'A glitched blob of corrupted code. The most basic enemy in the digital realm.',
    icon: '🐛',
    level: 1,
    stats: { strength: 8, agility: 5, intelligence: 3, vitality: 6, luck: 4 },
    maxHealth: 60,
    attack: 15,
    defense: 5,
    speed: 5,
    experienceReward: 20,
    goldReward: 8,
    dropChance: 0.20,
    dropTable: ['hp_potion_small'],
    abilities: [
      { name: 'Glitch', description: 'Basic attack', damage: 15, cooldown: 0 },
    ],
    rarity: 'common',
    color: '#2ecc71',
  },
  {
    id: 'syntax_error',
    name: 'Syntax Error',
    description: 'A wild semicolon that escaped its line. Annoying but harmless.',
    icon: '❌',
    level: 2,
    stats: { strength: 10, agility: 8, intelligence: 6, vitality: 8, luck: 5 },
    maxHealth: 85,
    attack: 20,
    defense: 8,
    speed: 8,
    experienceReward: 35,
    goldReward: 12,
    dropChance: 0.25,
    dropTable: ['hp_potion_small', 'mp_potion_small'],
    abilities: [
      { name: 'Missing Semicolon', description: 'Confuses the target', damage: 20, cooldown: 0 },
    ],
    rarity: 'common',
    color: '#e74c3c',
  },
  {
    id: 'buffer_overflow',
    name: 'Buffer Overflow',
    description: 'Consumes more memory than it should. Hits harder than it looks.',
    icon: '📦',
    level: 3,
    stats: { strength: 12, agility: 6, intelligence: 5, vitality: 10, luck: 3 },
    maxHealth: 110,
    attack: 25,
    defense: 10,
    speed: 5,
    experienceReward: 50,
    goldReward: 18,
    dropChance: 0.28,
    dropTable: ['hp_potion_small'],
    abilities: [
      { name: 'Stack Smash', description: 'Heavy hitting attack', damage: 30, cooldown: 2 },
      { name: 'Memory Leak', description: 'Drains health over time', damage: 8, effect: 'dot', effectValue: 8, cooldown: 3 },
    ],
    rarity: 'common',
    color: '#f39c12',
  },
  {
    id: 'infinite_loop',
    name: 'Infinite Loop',
    description: 'Never stops attacking. You must break the cycle!',
    icon: '🔄',
    level: 4,
    stats: { strength: 10, agility: 12, intelligence: 7, vitality: 9, luck: 6 },
    maxHealth: 95,
    attack: 22,
    defense: 8,
    speed: 12,
    experienceReward: 55,
    goldReward: 15,
    dropChance: 0.22,
    dropTable: ['speed_tonic'],
    abilities: [
      { name: 'Rapid Iteration', description: 'Attacks twice', damage: 10, cooldown: 2 },
      { name: 'While True', description: 'Never-ending assault', damage: 12, cooldown: 0 },
    ],
    rarity: 'common',
    color: '#9b59b6',
  },
  
  // UNCOMMON - Level 5-10
  {
    id: 'null_pointer',
    name: 'Null Pointer',
    description: 'Nothingness given form. Extremely dangerous if touched.',
    icon: '💀',
    level: 6,
    stats: { strength: 10, agility: 7, intelligence: 8, vitality: 8, luck: 6 },
    maxHealth: 100,
    attack: 22,
    defense: 8,
    speed: 6,
    experienceReward: 80,
    goldReward: 25,
    dropChance: 0.25,
    dropTable: ['hp_potion_medium', 'antidote'],
    abilities: [
      { name: 'Dereference', description: 'Catastrophic damage', damage: 30, cooldown: 3 },
      { name: 'Segmentation Fault', description: 'Core dump attack', damage: 18, cooldown: 1 },
    ],
    rarity: 'uncommon',
    color: '#34495e',
  },
  {
    id: 'deadlock',
    name: 'Deadlock',
    description: 'Two processes waiting for each other forever. Freezes anything it touches.',
    icon: '⛓️',
    level: 7,
    stats: { strength: 9, agility: 4, intelligence: 12, vitality: 12, luck: 5 },
    maxHealth: 140,
    attack: 18,
    defense: 15,
    speed: 1,
    experienceReward: 100,
    goldReward: 30,
    dropChance: 0.28,
    dropTable: ['defense_tonic', 'hp_potion_medium'],
    abilities: [
      { name: 'Freeze', description: 'Stuns the target', damage: 10, effect: 'stun', cooldown: 3 },
      { name: 'Mutual Lock', description: 'Traps both in combat', damage: 15, cooldown: 2 },
    ],
    rarity: 'uncommon',
    color: '#7f8c8d',
  },
  {
    id: 'race_condition',
    name: 'Race Condition',
    description: 'Unpredictable and fast. You never know which attack comes next.',
    icon: '🏃',
    level: 8,
    stats: { strength: 8, agility: 15, intelligence: 10, vitality: 7, luck: 10 },
    maxHealth: 90,
    attack: 25,
    defense: 5,
    speed: 15,
    experienceReward: 120,
    goldReward: 35,
    dropChance: 0.30,
    dropTable: ['strength_tonic', 'speed_tonic'],
    abilities: [
      { name: 'Thread Switch', description: 'Random heavy attack', damage: 35, cooldown: 2 },
      { name: 'Concurrency', description: 'Multiple quick hits', damage: 15, cooldown: 1 },
    ],
    rarity: 'uncommon',
    color: '#e67e22',
  },
  
  // RARE - Level 10-15
  {
    id: 'stack_overflow',
    name: 'Stack Overflow',
    description: 'The community has turned against you. Millions of questions bombard you.',
    icon: '📚',
    level: 11,
    stats: { strength: 15, agility: 10, intelligence: 18, vitality: 15, luck: 8 },
    maxHealth: 200,
    attack: 35,
    defense: 12,
    speed: 8,
    experienceReward: 200,
    goldReward: 60,
    dropChance: 0.35,
    dropTable: ['hp_potion_large', 'elixir'],
    abilities: [
      { name: 'Downvote Storm', description: 'Rain of negative karma', damage: 40, cooldown: 2 },
      { name: 'Duplicate Question', description: 'Confusing multi-hit', damage: 25, effect: 'confuse', cooldown: 1 },
      { name: 'Mark as Closed', description: 'Seals your fate', damage: 50, cooldown: 4 },
    ],
    rarity: 'rare',
    color: '#f1c40f',
  },
  {
    id: 'memory_leak',
    name: 'Memory Leak',
    description: 'Slowly consumes everything. The longer the fight, the stronger it gets.',
    icon: '💧',
    level: 12,
    stats: { strength: 12, agility: 8, intelligence: 20, vitality: 25, luck: 6 },
    maxHealth: 300,
    attack: 20,
    defense: 10,
    speed: 4,
    experienceReward: 220,
    goldReward: 70,
    dropChance: 0.38,
    dropTable: ['mp_potion_large', 'hp_potion_large'],
    abilities: [
      { name: 'Allocate', description: 'Grows stronger', damage: 20, healing: 30, effect: 'healing', cooldown: 2 },
      { name: 'No Free', description: 'Drains your resources', damage: 15, effect: 'drain', effectValue: 10, cooldown: 1 },
      { name: 'OOM Killer', description: 'System crash attack', damage: 60, cooldown: 5 },
    ],
    rarity: 'rare',
    color: '#3498db',
  },
  {
    id: 'divide_by_zero',
    name: 'Divide By Zero',
    description: 'Mathematically impossible yet deadly. Reality bends around it.',
    icon: '➗',
    level: 14,
    stats: { strength: 20, agility: 12, intelligence: 25, vitality: 12, luck: 15 },
    maxHealth: 180,
    attack: 45,
    defense: 8,
    speed: 10,
    experienceReward: 280,
    goldReward: 90,
    dropChance: 0.40,
    dropTable: ['elixir', 'revive_charm'],
    abilities: [
      { name: 'Infinity', description: 'Damage approaches forever', damage: 55, cooldown: 3 },
      { name: 'NaN', description: 'Confuses and damages', damage: 30, effect: 'confuse', cooldown: 2 },
      { name: 'Singularity', description: 'Black hole of math', damage: 80, cooldown: 5 },
    ],
    rarity: 'rare',
    color: '#9b59b6',
  },
  
  // EPIC - Level 15-20
  {
    id: 'kernel_panic',
    name: 'Kernel Panic',
    description: 'The operating system has given up. Total system failure imminent.',
    icon: '😱',
    level: 16,
    stats: { strength: 25, agility: 15, intelligence: 30, vitality: 30, luck: 10 },
    maxHealth: 450,
    attack: 55,
    defense: 25,
    speed: 12,
    experienceReward: 450,
    goldReward: 150,
    dropChance: 0.45,
    dropTable: ['elixir', 'strength_tonic', 'defense_tonic'],
    abilities: [
      { name: 'Blue Screen', description: 'Fatal error', damage: 70, effect: 'stun', cooldown: 3 },
      { name: 'Core Dump', description: 'Data overload', damage: 45, cooldown: 1 },
      { name: 'System Halt', description: 'Everything stops', damage: 100, cooldown: 5 },
    ],
    rarity: 'epic',
    color: '#2980b9',
  },
  {
    id: 'infinite_recursion',
    name: 'Infinite Recursion',
    description: 'A function calling itself forever. Each attack spawns more attacks.',
    icon: '🪞',
    level: 18,
    stats: { strength: 18, agility: 20, intelligence: 35, vitality: 25, luck: 12 },
    maxHealth: 350,
    attack: 40,
    defense: 15,
    speed: 18,
    experienceReward: 550,
    goldReward: 180,
    dropChance: 0.50,
    dropTable: ['elixir', 'speed_tonic', 'revive_charm'],
    abilities: [
      { name: 'Base Case', description: 'The beginning of the end', damage: 50, cooldown: 2 },
      { name: 'Stack Depth', description: 'Hits harder each time', damage: 35, effect: 'buff', cooldown: 1 },
      { name: 'Stack Overflow', description: 'Crash the call stack', damage: 120, cooldown: 4 },
    ],
    rarity: 'epic',
    color: '#8e44ad',
  },
  
  // LEGENDARY - Beyond level 20
  {
    id: 'merge_conflict',
    name: 'Merge Conflict',
    description: 'Two branches of reality fighting for dominance. Only one can survive.',
    icon: '⚔️',
    level: 20,
    stats: { strength: 35, agility: 25, intelligence: 40, vitality: 50, luck: 20 },
    maxHealth: 800,
    attack: 70,
    defense: 30,
    speed: 20,
    experienceReward: 1000,
    goldReward: 500,
    dropChance: 0.60,
    dropTable: ['legendary_weapon', 'elixir', 'revive_charm'],
    abilities: [
      { name: 'HEAD vs HEAD', description: 'Clash of titans', damage: 90, cooldown: 2 },
      { name: 'Manual Resolution', description: 'Requires all your skill', damage: 60, effect: 'drain', effectValue: 30, cooldown: 1 },
      { name: 'Force Push', description: 'Overwrites everything', damage: 150, cooldown: 4 },
      { name: 'Git Reset --hard', description: 'Back to nothing', damage: 200, cooldown: 6 },
    ],
    rarity: 'epic',
    color: '#c0392b',
  },
  {
    id: 'dark_lord_bug',
    name: 'Dark Lord Bug',
    description: 'The final boss. The one bug that survives every fix. Unkillable. Unstoppable.',
    icon: '👾',
    level: 25,
    stats: { strength: 50, agility: 40, intelligence: 50, vitality: 100, luck: 30 },
    maxHealth: 2000,
    attack: 100,
    defense: 50,
    speed: 30,
    experienceReward: 5000,
    goldReward: 2000,
    dropChance: 0.70,
    dropTable: ['paragon_crown', 'legendary_weapon', 'elixir'],
    abilities: [
      { name: 'Wont Fix', description: 'Your attacks are ignored', damage: 80, effect: 'immune', cooldown: 2 },
      { name: 'Works on My Machine', description: 'Gaslighting damage', damage: 120, cooldown: 1 },
      { name: 'Feature Not Bug', description: 'Redefines reality', damage: 180, cooldown: 3 },
      { name: 'Commit to Production', description: 'Everything breaks', damage: 300, cooldown: 5 },
      { name: 'Rollback Impossible', description: 'The final commit', damage: 500, cooldown: 8 },
    ],
    rarity: 'epic',
    color: '#8e44ad',
  },
];

// ============================================
// SCALING FUNCTIONS
// ============================================

export function scaleMonster(monster: Monster, round: number, playerLevel?: number): Monster {
  const roundMultiplier = getDifficultyMultiplier(round);
  
  // NEW: Player level scaling - enemies get stronger as you level up
  // This ensures enemies stay challenging throughout the game
  const playerLevelMultiplier = playerLevel ? 1 + (playerLevel * 0.15) : 1; // +15% per player level
  const combinedMultiplier = roundMultiplier * playerLevelMultiplier;
  
  return {
    ...monster,
    maxHealth: Math.floor(monster.maxHealth * combinedMultiplier),
    attack: Math.floor(monster.attack * combinedMultiplier),
    defense: Math.floor(monster.defense * combinedMultiplier),
    speed: Math.floor(monster.speed * (combinedMultiplier * 0.8)), // Speed scales slower
    experienceReward: Math.floor(monster.experienceReward * roundMultiplier), // XP only scales by round
    goldReward: Math.floor(monster.goldReward * roundMultiplier), // Gold only scales by round
    // Higher multiplier = better item drop chance
    dropChance: Math.min(0.9, monster.dropChance * (1 + (combinedMultiplier - 1) * 0.5)),
    abilities: monster.abilities.map(a => ({
      ...a,
      damage: a.damage ? Math.floor(a.damage * combinedMultiplier) : undefined,
      healing: a.healing ? Math.floor(a.healing * combinedMultiplier) : undefined,
    })),
  };
}

export function getBossForRound(round: number, playerLevel?: number): Monster | null {
  const boss = BOSSES[round];
  if (!boss) return null;
  return scaleMonster(boss, round, playerLevel);
}

export function getMonstersForRound(round: number, playerLevel?: number): Monster[] {
  if (isBossRound(round)) {
    const boss = getBossForRound(round, playerLevel);
    return boss ? [boss] : [];
  }
  
  const count = getEnemyCountForRound(round);
  const available = REGULAR_MONSTERS.filter(m => {
    // Filter monsters appropriate for this round
    const minLevel = Math.max(1, Math.floor(round / 3) - 2);
    const maxLevel = Math.floor(round / 3) + 5;
    return m.level >= minLevel && m.level <= maxLevel;
  });
  
  if (available.length === 0) {
    // Fallback to all monsters if no filter matches
    return [scaleMonster(REGULAR_MONSTERS[0], round, playerLevel)];
  }
  
  const selected: Monster[] = [];
  for (let i = 0; i < count; i++) {
    const baseMonster = available[Math.floor(Math.random() * available.length)];
    selected.push(scaleMonster(baseMonster, round, playerLevel));
  }
  
  return selected;
}

// ============================================
// RARITY DISPLAY
// ============================================

// Calculate battle rewards
export function calculateRewards(monster: Monster, playerLevel: number, playerLuck: number = 0): BattleReward {
  const levelDiff = playerLevel - monster.level;
  const multiplier = Math.max(0.5, 1 - (levelDiff * 0.1));
  
  // Roll for item drops based on monster rarity and player luck
  const itemDrops = rollItemDrops(monster.rarity, playerLuck);
  
  return {
    experience: Math.floor(monster.experienceReward * multiplier),
    gold: Math.floor(monster.goldReward * multiplier),
    items: itemDrops,
  };
}

// Rarity colors for UI
export const RARITY_COLORS: Record<string, string> = {
  common: '#95a5a6',
  uncommon: '#2ecc71',
  rare: '#3498db',
  epic: '#9b59b6',
  boss: '#e74c3c',
};

export const RARITY_NAMES: Record<string, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  boss: 'BOSS',
};

// Boss warning messages
export const BOSS_WARNINGS: Record<number, string> = {
  10: '⚠️ WARNING: A Basilisk approaches! Prepare for Round 10!',
  20: '⚠️ DANGER: The Shapeshifter draws near! Round 20 approaches!',
  30: '⚠️ ALERT: Golem footsteps shake the ground! Round 30 is coming!',
  40: '⚠️ WARNING: Something beautiful but deadly awaits at Round 40!',
  50: '⚠️ FINAL WARNING: The Titan awakens at Round 50!',
};
