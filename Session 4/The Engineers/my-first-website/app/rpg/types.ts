// RPG Game Types - Extended with all features

export type StatType = 
  | 'vitality' 
  | 'strength' 
  | 'magic' 
  | 'durability' 
  | 'speed' 
  | 'arcane' 
  | 'stamina';

export interface CharacterStats {
  vitality: number;
  strength: number;
  magic: number;
  durability: number;
  speed: number;
  arcane: number;
  stamina: number;
}

export interface DerivedStats {
  maxHp: number;
  maxStamina: number;
  carryWeight: number;
  critChance: number;
  dodgeBonus: number;
  iFrames: number;
  staminaRegen: number;
  defense: number;
}

export type ClassType = 'knight' | 'tank' | 'samurai' | 'mage';

export interface CharacterClass {
  id: ClassType;
  name: string;
  description: string;
  icon: string;
  startingStats: CharacterStats;
  startingWeapon: Weapon;
  skillTree: SkillTree;
}

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface RarityInfo {
  label: string;
  color: string;
  bgColor: string;
  statMult: number;
}

export type DamageType = 'physical' | 'magical' | 'fire' | 'ice' | 'lightning' | 'holy' | 'dark';

export interface WeaponAbility {
  name: string;
  description: string;
}

export interface Weapon {
  id: string;
  name: string;
  description: string;
  baseDamage: number;
  damageType: DamageType;
  staminaCost: number;
  ability?: WeaponAbility;
  scaling: WeaponScaling;
  weight: number;
  icon?: string;
  enchantments?: Enchantment[];
  upgradeLevel?: number;
}

export interface WeaponScaling {
  strength: ScalingGrade;
  dexterity: ScalingGrade;
  magic: ScalingGrade;
  arcane: ScalingGrade;
}

export type ScalingGrade = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | '-';

export type ArmorSlot = 
  | 'head' 
  | 'chest' 
  | 'legs' 
  | 'hands' 
  | 'feet' 
  | 'ring1' 
  | 'ring2' 
  | 'amulet';

export interface Passive {
  type: string;
  label: string;
  value: number;
  unit: string;
}

export interface Enchantment {
  id: string;
  name: string;
  description: string;
  statBonus: Partial<CharacterStats>;
  effect?: string;
  level: number;
  maxLevel: number;
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  slot: ArmorSlot;
  rarity: Rarity;
  levelRequirement: number;
  defense: number;
  weight: number;
  passives: Passive[];
  uniquePassive?: string;
  icon?: string;
  enchantments?: Enchantment[];
  upgradeLevel?: number;
}

export interface Character {
  id: string;
  name: string;
  classType: ClassType;
  level: number;
  stats: CharacterStats;
  equippedWeapon: Weapon;
  equippedArmor: Record<ArmorSlot, Equipment | null>;
  inventory: (Weapon | Equipment)[];
  experience: number;
  skillPoints: number;
  unlockedSkills: string[];
  gold: number;
  materials: Record<string, number>;
  dungeonProgress: DungeonProgress;
}

export interface LootDrop {
  gold: number;
  equipment: Equipment[];
  weapons: Weapon[];
  materials?: Record<string, number>;
}

export type EnemyTier = 'minion' | 'soldier' | 'elite' | 'champion' | 'boss';

export interface Enemy {
  id: string;
  name: string;
  tier: EnemyTier;
  level: number;
  maxHp: number;
  currentHp: number;
}

// ===== SKILL TREE SYSTEM =====

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  icon: string;
  maxLevel: number;
  currentLevel: number;
  requires?: string[];
  position: { x: number; y: number };
  effects: SkillEffect[];
}

export interface SkillEffect {
  type: 'stat_bonus' | 'passive' | 'ability' | 'unlock';
  target?: keyof CharacterStats | string;
  value: number;
  description: string;
}

export interface SkillTree {
  name: string;
  nodes: SkillNode[];
}

// ===== DUNGEON SYSTEM =====

export type RoomType = 'start' | 'combat' | 'elite' | 'boss' | 'treasure' | 'shop' | 'rest' | 'event' | 'exit';

export interface Room {
  id: string;
  type: RoomType;
  x: number;
  y: number;
  connections: string[];
  visited: boolean;
  cleared: boolean;
  enemies?: Enemy[];
  loot?: LootDrop;
  event?: DungeonEvent;
}

export interface Dungeon {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  rooms: Room[];
  currentRoom: string;
  completed: boolean;
}

export interface DungeonProgress {
  currentDungeon: string | null;
  completedDungeons: string[];
  totalRuns: number;
  bestRun: number | null;
}

export interface DungeonEvent {
  id: string;
  title: string;
  description: string;
  choices: EventChoice[];
}

export interface EventChoice {
  id: string;
  text: string;
  outcome: 'benefit' | 'risk' | 'neutral';
  effect: () => void;
}

// ===== MULTIPLAYER SYSTEM =====

export interface Player {
  id: string;
  name: string;
  character: Character;
  isHost: boolean;
  isReady: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
}

export interface GameSession {
  id: string;
  name: string;
  hostId: string;
  players: Player[];
  maxPlayers: number;
  status: 'lobby' | 'playing' | 'paused';
  sharedDungeon?: Dungeon;
  difficulty: 'normal' | 'hard' | 'nightmare';
}

export interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: number;
  type: 'chat' | 'system' | 'loot' | 'combat';
}

// ===== ENCHANTING SYSTEM =====

export interface EnchantmentRecipe {
  id: string;
  name: string;
  description: string;
  targetSlot: 'weapon' | 'armor' | 'any';
  materials: Record<string, number>;
  goldCost: number;
  successRate: number;
  result: Enchantment;
}

export interface UpgradeCost {
  level: number;
  gold: number;
  materials: Record<string, number>;
  successRate: number;
}
