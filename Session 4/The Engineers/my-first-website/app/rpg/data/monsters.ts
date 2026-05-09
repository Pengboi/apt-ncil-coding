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
    id: 'goblin_king',
    name: 'Goblin King',
    description: 'The ruler of the goblin horde. Wields a massive cleaver and commands his minions with an iron fist.',
    icon: '👑',
    level: 10,
    stats: { strength: 25, agility: 15, intelligence: 12, vitality: 30, luck: 8 },
    maxHealth: 600,
    attack: 55,
    defense: 20,
    speed: 12,
    experienceReward: 400,
    goldReward: 200,
    abilities: [
      { 
        name: 'Royal Decree', 
        description: 'Heals by commanding minions', 
        healing: 60, 
        effect: 'regenerate', 
        effectValue: 60,
        cooldown: 3 
      },
      { 
        name: 'Cleaver Strike', 
        description: 'Massive sword attack', 
        damage: 70, 
        cooldown: 2 
      },
      { 
        name: 'Minion Swarm', 
        description: 'Summons goblins to attack', 
        damage: 45, 
        cooldown: 4 
      },
    ],
    rarity: 'boss',
    color: '#27ae60',
    dropChance: 1.0,
    dropTable: ['golem_core', 'modular_plate'],
  },
  
  20: {
    id: 'lich_king',
    name: 'Lich King',
    description: 'An undead sorcerer of immense power. His necromantic magic drains the life from all who oppose him.',
    icon: '💀',
    level: 20,
    stats: { strength: 20, agility: 18, intelligence: 45, vitality: 35, luck: 15 },
    maxHealth: 900,
    attack: 75,
    defense: 25,
    speed: 15,
    experienceReward: 600,
    goldReward: 350,
    abilities: [
      { 
        name: 'Soul Drain', 
        description: 'Drains life force', 
        damage: 90, 
        effect: 'drain', 
        effectValue: 45,
        cooldown: 2 
      },
      { 
        name: 'Undead Army', 
        description: 'Summons skeleton warriors', 
        damage: 50, 
        cooldown: 3 
      },
      { 
        name: 'Death Bolt', 
        description: 'Dark magic strike', 
        damage: 120, 
        cooldown: 3 
      },
    ],
    rarity: 'boss',
    color: '#8e44ad',
    dropChance: 1.0,
    dropTable: ['ux_crystal', 'chimera_horn'],
  },
  
  30: {
    id: 'stone_giant',
    name: 'Stone Giant',
    description: 'A towering giant made of living stone. Its crushing blows can shatter armor and bone alike.',
    icon: '🗿',
    level: 30,
    stats: { strength: 60, agility: 5, intelligence: 8, vitality: 70, luck: 3 },
    maxHealth: 1400,
    attack: 100,
    defense: 55,
    speed: 6,
    experienceReward: 900,
    goldReward: 500,
    abilities: [
      { 
        name: 'Earthquake', 
        description: 'Ground-shattering stomp', 
        damage: 140, 
        effect: 'stun', 
        cooldown: 4 
      },
      { 
        name: 'Boulder Throw', 
        description: 'Hurls massive rocks', 
        damage: 90, 
        cooldown: 2 
      },
      { 
        name: 'Crushing Blow', 
        description: 'Devastating fist attack', 
        damage: 200, 
        cooldown: 5 
      },
    ],
    rarity: 'boss',
    color: '#7f8c8d',
    dropChance: 1.0,
    dropTable: ['golem_core', 'modular_plate'],
  },
  
  40: {
    id: 'demon_lord',
    name: 'Demon Lord',
    description: 'A prince of the infernal realms. Wields hellfire and commands legions of demons.',
    icon: '👹',
    level: 40,
    stats: { strength: 50, agility: 35, intelligence: 40, vitality: 45, luck: 20 },
    maxHealth: 1700,
    attack: 120,
    defense: 35,
    speed: 22,
    experienceReward: 1400,
    goldReward: 700,
    abilities: [
      { 
        name: 'Hellfire', 
        description: 'Infernal flames burn the soul', 
        damage: 80, 
        effect: 'dot', 
        effectValue: 25,
        cooldown: 3 
      },
      { 
        name: 'Demon Claw', 
        description: 'Rending demonic strike', 
        damage: 160, 
        cooldown: 2 
      },
      { 
        name: 'Soul Steal', 
        description: 'Steals life essence', 
        damage: 220, 
        effect: 'drain',
        effectValue: 80,
        cooldown: 4 
      },
    ],
    rarity: 'boss',
    color: '#c0392b',
    dropChance: 1.0,
    dropTable: ['ux_crystal', 'chimera_horn'],
  },
  
  50: {
    id: 'ancient_dragon',
    name: 'Ancient Dragon',
    description: 'The ultimate foe. An elder wyrm whose very presence inspires terror. Its breath can melt steel.',
    icon: '🐲',
    level: 50,
    stats: { strength: 70, agility: 45, intelligence: 60, vitality: 90, luck: 25 },
    maxHealth: 2500,
    attack: 150,
    defense: 65,
    speed: 28,
    experienceReward: 2500,
    goldReward: 1500,
    abilities: [
      { 
        name: 'Dragon Fire', 
        description: 'Melts everything in its path', 
        damage: 120, 
        aoe: true,
        effect: 'dot',
        effectValue: 30,
        cooldown: 3 
      },
      { 
        name: 'Wing Buffet', 
        description: 'Knocks enemies down', 
        damage: 100, 
        effect: 'stun',
        cooldown: 2 
      },
      { 
        name: 'Terror Roar', 
        description: 'Instills fear and deals damage', 
        damage: 350, 
        cooldown: 5 
      },
    ],
    rarity: 'boss',
    color: '#e74c3c',
    dropChance: 1.0,
    dropTable: ['titan_core', 'ai_consciousness', 'chaos_orb', 'paragon_crown'],
  },
};

// ============================================
// FANTASY REALM MONSTERS - Medieval Theme
// ============================================

export const REGULAR_MONSTERS: Monster[] = [
  // COMMON - Level 1-5 (Goblins, Rats, Wolves)
  {
    id: 'goblin_scout',
    name: 'Goblin Scout',
    description: 'A small, green-skinned creature with a rusty dagger. Weak but numerous.',
    icon: '👺',
    level: 1,
    stats: { strength: 8, agility: 10, intelligence: 4, vitality: 5, luck: 5 },
    maxHealth: 60,
    attack: 15,
    defense: 3,
    speed: 8,
    experienceReward: 20,
    goldReward: 5,
    dropChance: 0.25,
    dropTable: ['hp_potion_small'],
    abilities: [
      { name: 'Stab', description: 'Quick dagger strike', damage: 12, cooldown: 0 },
    ],
    rarity: 'common',
    color: '#2ecc71',
  },
  {
    id: 'giant_rat',
    name: 'Giant Rat',
    description: 'An oversized rodent with sharp teeth and a nasty bite.',
    icon: '🐀',
    level: 2,
    stats: { strength: 10, agility: 12, intelligence: 2, vitality: 6, luck: 3 },
    maxHealth: 50,
    attack: 18,
    defense: 2,
    speed: 12,
    experienceReward: 15,
    goldReward: 3,
    dropChance: 0.20,
    dropTable: ['hp_potion_small'],
    abilities: [
      { name: 'Bite', description: 'Vicious bite attack', damage: 15, cooldown: 0 },
      { name: 'Disease', description: 'Infectious bite', damage: 5, effect: 'dot', effectValue: 3, cooldown: 3 },
    ],
    rarity: 'common',
    color: '#7f8c8d',
  },
  {
    id: 'goblin_warrior',
    name: 'Goblin Warrior',
    description: 'A tougher goblin wielding a crude sword and shield.',
    icon: '👹',
    level: 3,
    stats: { strength: 14, agility: 8, intelligence: 5, vitality: 10, luck: 4 },
    maxHealth: 95,
    attack: 22,
    defense: 8,
    speed: 6,
    experienceReward: 35,
    goldReward: 12,
    dropChance: 0.28,
    dropTable: ['hp_potion_small', 'wood_sword'],
    abilities: [
      { name: 'Slash', description: 'Sword attack', damage: 22, cooldown: 0 },
      { name: 'Shield Bash', description: 'Stuns the enemy', damage: 15, effect: 'stun', cooldown: 3 },
    ],
    rarity: 'common',
    color: '#27ae60',
  },
  {
    id: 'dire_wolf',
    name: 'Dire Wolf',
    description: 'A ferocious wolf with fangs that can tear through armor.',
    icon: '🐺',
    level: 4,
    stats: { strength: 16, agility: 15, intelligence: 4, vitality: 9, luck: 6 },
    maxHealth: 85,
    attack: 26,
    defense: 5,
    speed: 14,
    experienceReward: 40,
    goldReward: 15,
    dropChance: 0.25,
    dropTable: ['hp_potion_small', 'speed_tonic'],
    abilities: [
      { name: 'Bite', description: 'Powerful bite', damage: 26, cooldown: 0 },
      { name: 'Pack Tactics', description: 'Coordinated attack', damage: 18, cooldown: 2 },
    ],
    rarity: 'common',
    color: '#95a5a6',
  },
  
  // UNCOMMON - Level 5-10 (Orcs, Skeletons, Bandits)
  {
    id: 'orc_grunt',
    name: 'Orc Grunt',
    description: 'A brutish orc warrior with a heavy axe and tough hide.',
    icon: '👹',
    level: 6,
    stats: { strength: 20, agility: 8, intelligence: 4, vitality: 18, luck: 3 },
    maxHealth: 160,
    attack: 32,
    defense: 12,
    speed: 4,
    experienceReward: 70,
    goldReward: 25,
    dropChance: 0.30,
    dropTable: ['hp_potion_medium', 'wood_sword'],
    abilities: [
      { name: 'Axe Swing', description: 'Heavy axe strike', damage: 35, cooldown: 0 },
      { name: 'Cleave', description: 'Wide arc attack', damage: 40, cooldown: 2 },
    ],
    rarity: 'uncommon',
    color: '#27ae60',
  },
  {
    id: 'skeleton_warrior',
    name: 'Skeleton Warrior',
    description: 'An undead skeletal figure armed with a rusted sword.',
    icon: '💀',
    level: 7,
    stats: { strength: 15, agility: 12, intelligence: 3, vitality: 12, luck: 5 },
    maxHealth: 120,
    attack: 28,
    defense: 8,
    speed: 10,
    experienceReward: 60,
    goldReward: 20,
    dropChance: 0.32,
    dropTable: ['hp_potion_medium', 'antidote'],
    abilities: [
      { name: 'Bone Strike', description: 'Skeletal sword attack', damage: 28, cooldown: 0 },
      { name: 'Undead Resilience', description: 'Regenerates health', healing: 15, effect: 'regenerate', cooldown: 4 },
    ],
    rarity: 'uncommon',
    color: '#ecf0f1',
  },
  {
    id: 'bandit_thief',
    name: 'Bandit Thief',
    description: 'A cunning rogue who strikes from the shadows.',
    icon: '🥷',
    level: 8,
    stats: { strength: 14, agility: 18, intelligence: 10, vitality: 10, luck: 12 },
    maxHealth: 95,
    attack: 30,
    defense: 5,
    speed: 18,
    experienceReward: 75,
    goldReward: 40,
    dropChance: 0.35,
    dropTable: ['speed_tonic', 'silver_ring'],
    abilities: [
      { name: 'Backstab', description: 'Sneak attack from behind', damage: 45, cooldown: 3 },
      { name: 'Quick Strike', description: 'Fast attack', damage: 20, cooldown: 1 },
    ],
    rarity: 'uncommon',
    color: '#34495e',
  },
  {
    id: 'orc_berserker',
    name: 'Orc Berserker',
    description: 'A frenzied orc that enters a rage in combat.',
    icon: '🧟',
    level: 9,
    stats: { strength: 25, agility: 10, intelligence: 2, vitality: 20, luck: 4 },
    maxHealth: 200,
    attack: 40,
    defense: 6,
    speed: 8,
    experienceReward: 90,
    goldReward: 35,
    dropChance: 0.38,
    dropTable: ['strength_tonic', 'hp_potion_medium'],
    abilities: [
      { name: 'Berserker Rage', description: 'Enraged attack', damage: 50, cooldown: 2 },
      { name: 'Wild Swing', description: 'Uncontrolled heavy hit', damage: 35, cooldown: 0 },
    ],
    rarity: 'uncommon',
    color: '#c0392b',
  },
  
  // RARE - Level 10-15 (Trolls, Knights, Wraiths)
  {
    id: 'cave_troll',
    name: 'Cave Troll',
    description: 'A massive troll with regenerative abilities and a club.',
    icon: '👹',
    level: 11,
    stats: { strength: 30, agility: 4, intelligence: 5, vitality: 35, luck: 2 },
    maxHealth: 350,
    attack: 45,
    defense: 20,
    speed: 2,
    experienceReward: 150,
    goldReward: 60,
    dropChance: 0.40,
    dropTable: ['hp_potion_large', 'elixir'],
    abilities: [
      { name: 'Club Smash', description: 'Crushing blow', damage: 55, cooldown: 2 },
      { name: 'Regenerate', description: 'Heals wounds', healing: 40, effect: 'regenerate', cooldown: 3 },
      { name: 'Stomp', description: 'Ground-shaking attack', damage: 35, cooldown: 1 },
    ],
    rarity: 'rare',
    color: '#27ae60',
  },
  {
    id: 'fallen_knight',
    name: 'Fallen Knight',
    description: 'A corrupted knight in dark armor, once a hero now twisted.',
    icon: '🛡️',
    level: 12,
    stats: { strength: 22, agility: 14, intelligence: 12, vitality: 28, luck: 6 },
    maxHealth: 280,
    attack: 38,
    defense: 25,
    speed: 10,
    experienceReward: 140,
    goldReward: 80,
    dropChance: 0.42,
    dropTable: ['hp_potion_large', 'debug_sword'],
    abilities: [
      { name: 'Dark Blade', description: 'Corrupted sword strike', damage: 45, cooldown: 2 },
      { name: 'Shield Block', description: 'Defensive stance', damage: 15, effect: 'buff', cooldown: 3 },
    ],
    rarity: 'rare',
    color: '#2c3e50',
  },
  {
    id: 'wraith',
    name: 'Wraith',
    description: 'A ghostly apparition that drains the life force of the living.',
    icon: '👻',
    level: 13,
    stats: { strength: 12, agility: 20, intelligence: 25, vitality: 18, luck: 10 },
    maxHealth: 180,
    attack: 35,
    defense: 8,
    speed: 20,
    experienceReward: 160,
    goldReward: 70,
    dropChance: 0.45,
    dropTable: ['mp_potion_large', 'elixir'],
    abilities: [
      { name: 'Life Drain', description: 'Drains health', damage: 40, effect: 'drain', effectValue: 20, cooldown: 2 },
      { name: 'Spectral Touch', description: 'Ghostly attack', damage: 30, cooldown: 1 },
    ],
    rarity: 'rare',
    color: '#8e44ad',
  },
  
  // EPIC - Level 15-20 (Dragons, Giants, Vampires)
  {
    id: 'minotaur',
    name: 'Minotaur',
    description: 'A massive bull-headed beast that guards labyrinthine dungeons.',
    icon: '🐂',
    level: 16,
    stats: { strength: 35, agility: 12, intelligence: 6, vitality: 40, luck: 3 },
    maxHealth: 450,
    attack: 55,
    defense: 30,
    speed: 12,
    experienceReward: 250,
    goldReward: 120,
    dropChance: 0.50,
    dropTable: ['elixir', 'refactoring_axe'],
    abilities: [
      { name: 'Gore', description: 'Charge with horns', damage: 70, cooldown: 3 },
      { name: 'Trample', description: 'Crushing stomp', damage: 45, cooldown: 2 },
    ],
    rarity: 'epic',
    color: '#8b4513',
  },
  {
    id: 'vampire_lord',
    name: 'Vampire Lord',
    description: 'An ancient vampire with powerful blood magic.',
    icon: '🧛',
    level: 18,
    stats: { strength: 28, agility: 24, intelligence: 30, vitality: 35, luck: 15 },
    maxHealth: 380,
    attack: 50,
    defense: 18,
    speed: 22,
    experienceReward: 300,
    goldReward: 150,
    dropChance: 0.55,
    dropTable: ['elixir', 'revive_charm'],
    abilities: [
      { name: 'Blood Drain', description: 'Drains life force', damage: 60, effect: 'drain', effectValue: 30, cooldown: 2 },
      { name: 'Hypnotize', description: 'Confuses the enemy', damage: 20, effect: 'confuse', cooldown: 3 },
      { name: 'Shadow Strike', description: 'Swift dark attack', damage: 45, cooldown: 1 },
    ],
    rarity: 'epic',
    color: '#8b0000',
  },
  
  // LEGENDARY - Beyond level 20
  {
    id: 'young_dragon',
    name: 'Young Dragon',
    description: 'A dragon whelp with powerful fiery breath.',
    icon: '🐉',
    level: 20,
    stats: { strength: 40, agility: 20, intelligence: 35, vitality: 50, luck: 10 },
    maxHealth: 600,
    attack: 70,
    defense: 35,
    speed: 18,
    experienceReward: 500,
    goldReward: 300,
    dropChance: 0.60,
    dropTable: ['elixir', 'revive_charm', 'compiler_blade'],
    abilities: [
      { name: 'Fire Breath', description: 'Burns the enemy', damage: 80, effect: 'dot', effectValue: 15, cooldown: 3 },
      { name: 'Claw Swipe', description: 'Rending claws', damage: 55, cooldown: 2 },
      { name: 'Tail Slam', description: 'Heavy tail attack', damage: 65, cooldown: 3 },
    ],
    rarity: 'epic',
    color: '#e74c3c',
  },
  {
    id: 'dark_lord',
    name: 'Dark Lord',
    description: 'The ultimate evil. A master of dark magic and destruction.',
    icon: '👿',
    level: 25,
    stats: { strength: 50, agility: 35, intelligence: 60, vitality: 80, luck: 20 },
    maxHealth: 1200,
    attack: 100,
    defense: 50,
    speed: 25,
    experienceReward: 2000,
    goldReward: 1000,
    dropChance: 0.70,
    dropTable: ['paragon_crown', 'syntax_slayer', 'elixir'],
    abilities: [
      { name: 'Dark Magic', description: 'Unholy power', damage: 120, cooldown: 2 },
      { name: 'Soul Drain', description: 'Steals life essence', damage: 80, effect: 'drain', effectValue: 40, cooldown: 2 },
      { name: 'Apocalypse', description: 'Ultimate destruction', damage: 200, cooldown: 5 },
      { name: 'Doom', description: 'Final judgment', damage: 350, cooldown: 8 },
    ],
    rarity: 'epic',
    color: '#2c003e',
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
  10: '⚠️ WARNING: The Goblin King approaches with his horde! Prepare for Round 10!',
  20: '⚠️ DANGER: Undead presence detected! The Lich King draws near! Round 20 approaches!',
  30: '⚠️ ALERT: The earth shakes! A Stone Giant is coming! Round 30 is upon you!',
  40: '⚠️ WARNING: The air grows hot! A Demon Lord awaits at Round 40!',
  50: '⚠️ FINAL WARNING: The Ancient Dragon awakens! Round 50 - your ultimate test!',
};
