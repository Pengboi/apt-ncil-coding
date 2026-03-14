import { CharacterStats } from '../types';

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
}

export interface MonsterAbility {
  name: string;
  description: string;
  damage?: number;
  healing?: number;
  effect?: string;
  cooldown: number;
}

export interface BattleReward {
  experience: number;
  gold: number;
  items?: string[];
}

// Monster templates by rarity
export const MONSTERS: Monster[] = [
  // COMMON - Level 1-5
  {
    id: 'bug_slime',
    name: 'Bug Slime',
    description: 'A glitched blob of corrupted code. The most basic enemy in the digital realm.',
    icon: '🐛',
    level: 1,
    stats: { strength: 5, agility: 3, intelligence: 2, vitality: 4, luck: 3 },
    maxHealth: 30,
    attack: 8,
    defense: 2,
    speed: 3,
    experienceReward: 15,
    goldReward: 5,
    abilities: [
      { name: 'Glitch', description: 'Basic attack', damage: 8, cooldown: 0 },
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
    stats: { strength: 6, agility: 5, intelligence: 4, vitality: 5, luck: 4 },
    maxHealth: 45,
    attack: 12,
    defense: 3,
    speed: 5,
    experienceReward: 25,
    goldReward: 8,
    abilities: [
      { name: 'Missing Semicolon', description: 'Confuses the target', damage: 12, cooldown: 0 },
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
    stats: { strength: 8, agility: 4, intelligence: 3, vitality: 7, luck: 2 },
    maxHealth: 70,
    attack: 15,
    defense: 5,
    speed: 2,
    experienceReward: 40,
    goldReward: 12,
    abilities: [
      { name: 'Stack Smash', description: 'Heavy hitting attack', damage: 18, cooldown: 2 },
      { name: 'Memory Leak', description: 'Drains health over time', damage: 5, effect: 'dot', cooldown: 3 },
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
    stats: { strength: 6, agility: 8, intelligence: 5, vitality: 6, luck: 5 },
    maxHealth: 55,
    attack: 14,
    defense: 4,
    speed: 8,
    experienceReward: 55,
    goldReward: 15,
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
    abilities: [
      { name: 'Downvote Storm', description: 'Rain of negative karma', damage: 40, cooldown: 2 },
      { name: 'Duplicate Question', description: 'Confusing multi-hit', damage: 25, effect: 'multi', cooldown: 1 },
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
    abilities: [
      { name: 'Allocate', description: 'Grows stronger', damage: 20, healing: 30, cooldown: 2 },
      { name: 'No Free', description: 'Drains your resources', damage: 15, effect: 'drain', cooldown: 1 },
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
    abilities: [
      { name: 'Base Case', description: 'The beginning of the end', damage: 50, cooldown: 2 },
      { name: 'Stack Depth', description: 'Hits harder each time', damage: 35, effect: 'stacking', cooldown: 1 },
      { name: 'Stack Overflow', description: 'Crash the call stack', damage: 120, cooldown: 4 },
    ],
    rarity: 'epic',
    color: '#8e44ad',
  },
  
  // BOSS - Level 20+
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
    abilities: [
      { name: 'HEAD vs HEAD', description: 'Clash of titans', damage: 90, cooldown: 2 },
      { name: 'Manual Resolution', description: 'Requires all your skill', damage: 60, effect: 'drain', cooldown: 1 },
      { name: 'Force Push', description: 'Overwrites everything', damage: 150, cooldown: 4 },
      { name: 'Git Reset --hard', description: 'Back to nothing', damage: 200, cooldown: 6 },
    ],
    rarity: 'boss',
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
    abilities: [
      { name: 'Wont Fix', description: 'Your attacks are ignored', damage: 80, effect: 'immune', cooldown: 2 },
      { name: 'Works on My Machine', description: 'Gaslighting damage', damage: 120, cooldown: 1 },
      { name: 'Feature Not Bug', description: 'Redefines reality', damage: 180, cooldown: 3 },
      { name: 'Commit to Production', description: 'Everything breaks', damage: 300, cooldown: 5 },
      { name: 'Rollback Impossible', description: 'The final commit', damage: 500, cooldown: 8 },
    ],
    rarity: 'boss',
    color: '#8e44ad',
  },
];

// Get monsters appropriate for player level
export function getMonstersForLevel(playerLevel: number): Monster[] {
  // Get monsters within 3 levels of player level, but at least level 1
  const minLevel = Math.max(1, playerLevel - 2);
  const maxLevel = playerLevel + 3;
  
  return MONSTERS.filter(m => m.level >= minLevel && m.level <= maxLevel);
}

// Get a random monster for the player to fight
export function getRandomMonster(playerLevel: number): Monster {
  const appropriate = getMonstersForLevel(playerLevel);
  
  // Weight towards easier monsters
  const weighted = appropriate.flatMap(m => {
    const weight = m.level <= playerLevel ? 3 : m.level <= playerLevel + 1 ? 2 : 1;
    return Array(weight).fill(m);
  });
  
  const base = weighted[Math.floor(Math.random() * weighted.length)];
  
  // Create a copy with some variance
  return {
    ...base,
    maxHealth: Math.floor(base.maxHealth * (0.9 + Math.random() * 0.2)),
    attack: Math.floor(base.attack * (0.9 + Math.random() * 0.2)),
  };
}

// Get boss for special battles
export function getBossById(id: string): Monster | undefined {
  return MONSTERS.find(m => m.id === id && m.rarity === 'boss');
}

// Calculate battle rewards
export function calculateRewards(monster: Monster, playerLevel: number): BattleReward {
  const levelDiff = playerLevel - monster.level;
  const multiplier = Math.max(0.5, 1 - (levelDiff * 0.1));
  
  return {
    experience: Math.floor(monster.experienceReward * multiplier),
    gold: Math.floor(monster.goldReward * multiplier),
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
