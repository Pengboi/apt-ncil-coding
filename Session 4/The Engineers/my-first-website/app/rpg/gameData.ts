// Game Data - Extended with Skills, Dungeons, Enchanting, Multiplayer

import { 
  CharacterClass, 
  Weapon, 
  RarityInfo, 
  CharacterStats,
  ArmorSlot,
  Equipment,
  EnemyTier,
  SkillTree,
  SkillNode,
  Dungeon,
  EnchantmentRecipe,
  UpgradeCost
} from './types';

// Rarity Definitions
export const RARITY_INFO: Record<string, RarityInfo> = {
  common: { label: 'Common', color: '#9ca3af', bgColor: 'bg-gray-400', statMult: 1.0 },
  uncommon: { label: 'Uncommon', color: '#22c55e', bgColor: 'bg-green-500', statMult: 1.15 },
  rare: { label: 'Rare', color: '#3b82f6', bgColor: 'bg-blue-500', statMult: 1.35 },
  epic: { label: 'Epic', color: '#a855f7', bgColor: 'bg-purple-500', statMult: 1.65 },
  legendary: { label: 'Legendary', color: '#f59e0b', bgColor: 'bg-amber-500', statMult: 2.0 },
  mythic: { label: 'Mythic', color: '#ef4444', bgColor: 'bg-red-500', statMult: 2.5 },
};

// Starting Weapons
export const SILVERED_SWORD: Weapon = {
  id: 'silvered_sword',
  name: 'Silvered Sword',
  description: 'A well-crafted longsword with a silvered edge. Favored by knights for its reliability.',
  baseDamage: 120,
  damageType: 'physical',
  staminaCost: 15,
  ability: {
    name: 'Crimson Edge',
    description: 'Critical hits grant +5% damage for 10 seconds. Crits deal 2x damage.'
  },
  scaling: { strength: 'C', dexterity: 'D', magic: '-', arcane: '-' },
  weight: 4.5,
  icon: '⚔️',
  upgradeLevel: 0
};

export const BRONZE_BULWARK: Weapon = {
  id: 'bronze_bulwark',
  name: 'Bronze Bulwark',
  description: 'A massive bronze shield forged for the immovable guardians of the realm.',
  baseDamage: 80,
  damageType: 'physical',
  staminaCost: 20,
  ability: {
    name: 'Unbreakable',
    description: 'Activate to gain Hyperarmor for 15 seconds. Reduces incoming damage by 15%.'
  },
  scaling: { strength: 'D', dexterity: '-', magic: '-', arcane: 'E' },
  weight: 8.0,
  icon: '🛡️',
  upgradeLevel: 0
};

export const SABERTOOTH: Weapon = {
  id: 'sabertooth',
  name: 'Sabertooth',
  description: 'A masterwork katana from the eastern lands. Its edge leaves wounds that bleed endlessly.',
  baseDamage: 100,
  damageType: 'physical',
  staminaCost: 12,
  ability: {
    name: 'Crimson Fangs',
    description: '5% chance to inflict Bleed on hit. Bleed deals 0.5% of max HP per second. Stacks up to 5 times.'
  },
  scaling: { strength: 'D', dexterity: 'B', magic: '-', arcane: 'C' },
  weight: 3.5,
  icon: '🗡️',
  upgradeLevel: 0
};

export const CRYSTAL_STAFF: Weapon = {
  id: 'crystal_staff',
  name: 'Crystal Staff',
  description: 'An ornate staff crowned with a radiant blue crystal that pulses with arcane energy.',
  baseDamage: 90,
  damageType: 'magical',
  staminaCost: 18,
  ability: {
    name: 'Ethereal Focus',
    description: '10% chance when casting to gain hyperarmor and guaranteed critical hit. Prevents spell interruption.'
  },
  scaling: { strength: '-', dexterity: '-', magic: 'A', arcane: 'B' },
  weight: 2.5,
  icon: '🔮',
  upgradeLevel: 0
};

// ===== SKILL TREES =====

const VIGOR_TREE: SkillTree = {
  name: 'Vigor',
  nodes: [
    {
      id: 'vigor_1',
      name: 'Iron Body',
      description: 'Increase max HP by 5% per level',
      icon: '❤️',
      maxLevel: 5,
      currentLevel: 0,
      position: { x: 1, y: 0 },
      effects: [{ type: 'stat_bonus', target: 'vitality', value: 5, description: '+5% Max HP' }]
    },
    {
      id: 'vigor_2',
      name: 'Endurance',
      description: 'Increase stamina by 3 per level',
      icon: '⚡',
      maxLevel: 5,
      currentLevel: 0,
      position: { x: 2, y: 0 },
      requires: ['vigor_1'],
      effects: [{ type: 'stat_bonus', target: 'stamina', value: 3, description: '+3 Stamina' }]
    },
    {
      id: 'vigor_3',
      name: 'Second Wind',
      description: 'Auto-heal when HP drops below 20%',
      icon: '🌟',
      maxLevel: 1,
      currentLevel: 0,
      position: { x: 3, y: 0 },
      requires: ['vigor_2'],
      effects: [{ type: 'passive', value: 0, description: 'Heal 30% HP when below 20% (once per combat)' }]
    },
    {
      id: 'vigor_4',
      name: 'Undying',
      description: 'Survive one lethal blow per combat',
      icon: '💀',
      maxLevel: 1,
      currentLevel: 0,
      position: { x: 4, y: 0 },
      requires: ['vigor_3'],
      effects: [{ type: 'passive', value: 0, description: 'Survive fatal damage with 1 HP once per combat' }]
    }
  ]
};

const MIGHT_TREE: SkillTree = {
  name: 'Might',
  nodes: [
    {
      id: 'might_1',
      name: 'Power Strike',
      description: 'Increase physical damage by 3% per level',
      icon: '💪',
      maxLevel: 5,
      currentLevel: 0,
      position: { x: 1, y: 1 },
      effects: [{ type: 'stat_bonus', target: 'strength', value: 3, description: '+3% Physical Damage' }]
    },
    {
      id: 'might_2',
      name: 'Critical Eye',
      description: 'Increase crit chance by 1% per level',
      icon: '🎯',
      maxLevel: 5,
      currentLevel: 0,
      position: { x: 2, y: 1 },
      requires: ['might_1'],
      effects: [{ type: 'stat_bonus', target: 'arcane', value: 1, description: '+1% Crit Chance' }]
    },
    {
      id: 'might_3',
      name: 'Executioner',
      description: 'Deal 20% more damage to enemies below 30% HP',
      icon: '🪓',
      maxLevel: 1,
      currentLevel: 0,
      position: { x: 3, y: 1 },
      requires: ['might_2'],
      effects: [{ type: 'passive', value: 20, description: '+20% damage vs low HP enemies' }]
    },
    {
      id: 'might_4',
      name: 'Cleave',
      description: 'Attacks hit 2 adjacent enemies',
      icon: '⚔️',
      maxLevel: 1,
      currentLevel: 0,
      position: { x: 4, y: 1 },
      requires: ['might_3'],
      effects: [{ type: 'ability', value: 0, description: 'Melee attacks cleave to nearby enemies' }]
    }
  ]
};

const ARCANE_TREE: SkillTree = {
  name: 'Arcane',
  nodes: [
    {
      id: 'arcane_1',
      name: 'Magic Focus',
      description: 'Increase magic damage by 3% per level',
      icon: '🔮',
      maxLevel: 5,
      currentLevel: 0,
      position: { x: 1, y: 2 },
      effects: [{ type: 'stat_bonus', target: 'magic', value: 3, description: '+3% Magic Damage' }]
    },
    {
      id: 'arcane_2',
      name: 'Efficiency',
      description: 'Reduce spell cost by 5% per level',
      icon: '💧',
      maxLevel: 5,
      currentLevel: 0,
      position: { x: 2, y: 2 },
      requires: ['arcane_1'],
      effects: [{ type: 'passive', value: 5, description: '-5% Spell Stamina Cost' }]
    },
    {
      id: 'arcane_3',
      name: 'Spell Weaving',
      description: 'Chain spells together for combo bonuses',
      icon: '✨',
      maxLevel: 1,
      currentLevel: 0,
      position: { x: 3, y: 2 },
      requires: ['arcane_2'],
      effects: [{ type: 'ability', value: 0, description: 'Consecutive spells gain +10% damage' }]
    },
    {
      id: 'arcane_4',
      name: 'Archmage',
      description: 'Ultimate magical power',
      icon: '🌟',
      maxLevel: 1,
      currentLevel: 0,
      position: { x: 4, y: 2 },
      requires: ['arcane_3'],
      effects: [{ type: 'passive', value: 50, description: '+50% Magic Damage, spells cost 0 stamina' }]
    }
  ]
};

const AGILITY_TREE: SkillTree = {
  name: 'Agility',
  nodes: [
    {
      id: 'agility_1',
      name: 'Swift Foot',
      description: 'Increase movement speed by 2% per level',
      icon: '👟',
      maxLevel: 5,
      currentLevel: 0,
      position: { x: 1, y: 3 },
      effects: [{ type: 'stat_bonus', target: 'speed', value: 2, description: '+2% Move Speed' }]
    },
    {
      id: 'agility_2',
      name: 'Dodge Master',
      description: 'Increase dodge frames by 5% per level',
      icon: '💨',
      maxLevel: 5,
      currentLevel: 0,
      position: { x: 2, y: 3 },
      requires: ['agility_1'],
      effects: [{ type: 'passive', value: 5, description: '+5% Dodge I-frames' }]
    },
    {
      id: 'agility_3',
      name: 'Blur',
      description: '10% chance to auto-dodge attacks',
      icon: '👻',
      maxLevel: 1,
      currentLevel: 0,
      position: { x: 3, y: 3 },
      requires: ['agility_2'],
      effects: [{ type: 'passive', value: 10, description: '10% auto-dodge chance' }]
    },
    {
      id: 'agility_4',
      name: 'Time Stop',
      description: 'Slow time briefly on perfect dodge',
      icon: '⏱️',
      maxLevel: 1,
      currentLevel: 0,
      position: { x: 4, y: 3 },
      requires: ['agility_3'],
      effects: [{ type: 'ability', value: 0, description: 'Perfect dodge slows enemies for 3 seconds' }]
    }
  ]
};

// Character Classes with Skill Trees
export const CLASSES: CharacterClass[] = [
  {
    id: 'knight',
    name: 'Knight',
    description: 'A balanced warrior specializing in melee combat with a sturdy defense.',
    icon: '⚔️',
    startingStats: {
      vitality: 5,
      strength: 5,
      durability: 5,
      stamina: 3,
      speed: 2,
      magic: 3,
      arcane: 2
    },
    startingWeapon: SILVERED_SWORD,
    skillTree: {
      name: 'Knight Mastery',
      nodes: [
        ...VIGOR_TREE.nodes,
        ...MIGHT_TREE.nodes,
        {
          id: 'knight_ult',
          name: 'Phoenix Dive',
          description: 'Charge that revives you if killed during the animation',
          icon: '🔥',
          maxLevel: 1,
          currentLevel: 0,
          position: { x: 5, y: 0.5 },
          requires: ['vigor_4', 'might_4'],
          effects: [{ type: 'ability', value: 0, description: 'Ultimate: Charge attack that revives on death' }]
        }
      ]
    }
  },
  {
    id: 'tank',
    name: 'Tank',
    description: 'An immovable fortress clad in heavy armor. Wields a massive bronze shield.',
    icon: '🛡️',
    startingStats: {
      vitality: 7,
      durability: 8,
      strength: 4,
      stamina: 3,
      speed: 1,
      magic: 1,
      arcane: 1
    },
    startingWeapon: BRONZE_BULWARK,
    skillTree: {
      name: 'Iron Will',
      nodes: [
        ...VIGOR_TREE.nodes,
        {
          id: 'tank_path_1',
          name: 'Fortress',
          description: 'Increase defense by 5% per level',
          icon: '🏰',
          maxLevel: 5,
          currentLevel: 0,
          position: { x: 1, y: 4 },
          effects: [{ type: 'stat_bonus', target: 'durability', value: 5, description: '+5% Defense' }]
        },
        {
          id: 'tank_path_2',
          name: 'Taunt',
          description: 'Enemies focus on you',
          icon: '📢',
          maxLevel: 1,
          currentLevel: 0,
          position: { x: 2, y: 4 },
          requires: ['tank_path_1'],
          effects: [{ type: 'ability', value: 0, description: 'Force enemies to target you' }]
        },
        {
          id: 'tank_ult',
          name: 'Unstoppable',
          description: '10 seconds of true invincibility',
          icon: '💎',
          maxLevel: 1,
          currentLevel: 0,
          position: { x: 5, y: 0.5 },
          requires: ['vigor_4', 'tank_path_2'],
          effects: [{ type: 'ability', value: 0, description: 'Ultimate: 10s invincibility' }]
        }
      ]
    }
  },
  {
    id: 'samurai',
    name: 'Samurai',
    description: 'A swift warrior from the eastern lands. Wields a deadly katana that inflicts bleeding wounds.',
    icon: '🗡️',
    startingStats: {
      vitality: 4,
      strength: 6,
      arcane: 4,
      stamina: 3,
      speed: 7,
      durability: 1,
      magic: 0
    },
    startingWeapon: SABERTOOTH,
    skillTree: {
      name: 'Iaido',
      nodes: [
        ...MIGHT_TREE.nodes,
        ...AGILITY_TREE.nodes,
        {
          id: 'samurai_ult',
          name: 'Thousand Cuts',
          description: '20 instant slashes in rapid succession',
          icon: '⚡',
          maxLevel: 1,
          currentLevel: 0,
          position: { x: 5, y: 1.5 },
          requires: ['might_4', 'agility_4'],
          effects: [{ type: 'ability', value: 0, description: 'Ultimate: 20 instant slashes' }]
        }
      ]
    }
  },
  {
    id: 'mage',
    name: 'Mage',
    description: 'A graceful sorceress who channels devastating arcane energies through a crystal staff.',
    icon: '🔮',
    startingStats: {
      magic: 8,
      arcane: 5,
      vitality: 4,
      stamina: 4,
      speed: 3,
      durability: 1,
      strength: 0
    },
    startingWeapon: CRYSTAL_STAFF,
    skillTree: {
      name: 'Elemental Mastery',
      nodes: [
        ...ARCANE_TREE.nodes,
        {
          id: 'mage_ult',
          name: 'Meteor',
          description: 'Devastating screen-wide destruction',
          icon: '☄️',
          maxLevel: 1,
          currentLevel: 0,
          position: { x: 5, y: 2 },
          requires: ['arcane_4'],
          effects: [{ type: 'ability', value: 0, description: 'Ultimate: Meteor devastates all enemies' }]
        }
      ]
    }
  }
];

// Stat Labels
export const STAT_LABELS: Record<keyof CharacterStats, string> = {
  vitality: 'Vitality',
  strength: 'Strength',
  magic: 'Magic',
  durability: 'Durability',
  speed: 'Speed',
  arcane: 'Arcane',
  stamina: 'Stamina'
};

// Slot Labels
export const SLOT_LABELS: Record<ArmorSlot, string> = {
  head: 'Head',
  chest: 'Chest',
  legs: 'Legs',
  hands: 'Hands',
  feet: 'Feet',
  ring1: 'Ring 1',
  ring2: 'Ring 2',
  amulet: 'Amulet'
};

// Enemy Tiers
export const ENEMY_TIERS: Record<EnemyTier, { label: string; luckBonus: number; itemMult: number }> = {
  minion: { label: 'Minion', luckBonus: 0, itemMult: 1 },
  soldier: { label: 'Soldier', luckBonus: 0.5, itemMult: 2 },
  elite: { label: 'Elite', luckBonus: 1.0, itemMult: 3 },
  champion: { label: 'Champion', luckBonus: 2.0, itemMult: 5 },
  boss: { label: 'BOSS', luckBonus: 5.0, itemMult: 10 }
};

// Boss Drop Table
export const BOSS_DROPS: Record<string, () => Equipment> = {
  'Iron Golem': () => ({
    id: `iron_golem_chest_${Date.now()}`,
    name: "Iron Golem's Heartplate",
    description: 'Torn from the Iron Golem upon defeat. Gradually repairs itself during combat.',
    slot: 'chest',
    rarity: 'legendary',
    levelRequirement: 50,
    defense: 80,
    weight: 12,
    passives: [
      { type: 'hp_bonus', label: 'Max HP', value: 15, unit: '%' },
      { type: 'damage_reduction', label: 'Damage Reduction', value: 8, unit: '%' }
    ],
    uniquePassive: 'Living Metal: Regenerate 2 HP per second while in combat',
    icon: '⬛',
    upgradeLevel: 0
  }),
  'Shadow Demon': () => ({
    id: `shadow_demon_ring_${Date.now()}`,
    name: "Shadow Demon's Band",
    description: 'A ring infused with shadow magic. Leaves behind shadow clones when dodging.',
    slot: 'ring1',
    rarity: 'legendary',
    levelRequirement: 50,
    defense: 15,
    weight: 0.5,
    passives: [
      { type: 'crit_chance', label: 'Critical Chance', value: 5, unit: '%' },
      { type: 'movement_speed', label: 'Movement Speed', value: 10, unit: '%' }
    ],
    uniquePassive: 'Shadow Step: Dodging leaves a shadow clone that explodes for 50 damage',
    icon: '💍',
    upgradeLevel: 0
  }),
  'Flame Tyrant': () => ({
    id: `flame_tyrant_helm_${Date.now()}`,
    name: "Flame Tyrant's Crown",
    description: 'A crown forged in dragonfire. Burns those who dare strike the wearer.',
    slot: 'head',
    rarity: 'legendary',
    levelRequirement: 50,
    defense: 45,
    weight: 5,
    passives: [
      { type: 'damage_boost', label: 'Damage', value: 10, unit: '%' },
      { type: 'stagger_resist', label: 'Stagger Resistance', value: 20, unit: '%' }
    ],
    uniquePassive: 'Crown of Flames: Melee attackers take 30 fire damage. Immune to burn.',
    icon: '👑',
    upgradeLevel: 0
  })
};

// Equipment Name Generators
export const EQUIPMENT_PREFIXES: Record<string, string[]> = {
  common: ['Worn', 'Tattered', 'Basic', 'Rusty', 'Crude'],
  uncommon: ['Sturdy', 'Polished', 'Reinforced', 'Hardened', 'Balanced'],
  rare: ['Gleaming', 'Superior', 'Enchanted', 'Runic', 'Fine'],
  epic: ['Exalted', 'Mythical', 'Arcane', 'Ancient', 'Exceptional'],
  legendary: ['Legendary', 'Divine', 'Eternal', 'Transcendent', 'Celestial'],
  mythic: ['Primordial', 'Godslayer', 'Infinity', 'Apocalyptic', 'Reality']
};

export const EQUIPMENT_BASE_NAMES: Record<ArmorSlot, string[]> = {
  head: ['Helm', 'Crown', 'Hood', 'Mask', 'Cap'],
  chest: ['Plate', 'Vest', 'Robe', 'Mail', 'Armor'],
  legs: ['Greaves', 'Leggings', 'Tassets', 'Pants', 'Chausses'],
  hands: ['Gauntlets', 'Gloves', 'Wraps', 'Claws', 'Bracers'],
  feet: ['Boots', 'Sabatons', 'Treads', 'Sandals', 'Greaves'],
  ring1: ['Ring', 'Band', 'Seal', 'Loop', 'Circle'],
  ring2: ['Ring', 'Band', 'Seal', 'Loop', 'Circle'],
  amulet: ['Amulet', 'Pendant', 'Charm', 'Talisman', 'Necklace']
};

// Passive Types
export const PASSIVE_TYPES = [
  { type: 'crit_chance', label: 'Critical Chance', min: 0.5, max: 3.0, unit: '%' },
  { type: 'crit_damage', label: 'Critical Damage', min: 5, max: 25, unit: '%' },
  { type: 'attack_speed', label: 'Attack Speed', min: 3, max: 15, unit: '%' },
  { type: 'damage_boost', label: 'Damage', min: 2, max: 10, unit: '%' },
  { type: 'hp_bonus', label: 'Max HP', min: 3, max: 15, unit: '%' },
  { type: 'damage_reduction', label: 'Damage Reduction', min: 2, max: 8, unit: '%' },
  { type: 'stamina_regen', label: 'Stamina Regen', min: 5, max: 20, unit: '%' },
  { type: 'movement_speed', label: 'Movement Speed', min: 2, max: 10, unit: '%' },
];

// ===== DUNGEON DATA =====

export const DUNGEONS: Dungeon[] = [
  {
    id: 'crypt_of_shadows',
    name: 'Crypt of Shadows',
    description: 'An ancient burial ground infested with undead.',
    difficulty: 1,
    rooms: [],
    currentRoom: 'start',
    completed: false
  },
  {
    id: 'molten_core',
    name: 'Molten Core',
    description: 'A volcanic dungeon filled with fire elementals.',
    difficulty: 2,
    rooms: [],
    currentRoom: 'start',
    completed: false
  },
  {
    id: 'frozen_throne',
    name: 'Frozen Throne',
    description: 'The icy lair of the Frost Queen.',
    difficulty: 3,
    rooms: [],
    currentRoom: 'start',
    completed: false
  }
];

// ===== ENCHANTMENT RECIPES =====

export const ENCHANTMENT_RECIPES: EnchantmentRecipe[] = [
  {
    id: 'fire_enchant',
    name: 'Flame Weapon',
    description: 'Add fire damage to your weapon',
    targetSlot: 'weapon',
    materials: { 'fire_essence': 3, 'magic_dust': 5 },
    goldCost: 100,
    successRate: 0.8,
    result: {
      id: 'fire_enchant',
      name: 'Flame',
      description: 'Weapon deals additional fire damage',
      statBonus: { strength: 2 },
      level: 1,
      maxLevel: 5
    }
  },
  {
    id: 'ice_enchant',
    name: 'Frost Weapon',
    description: 'Add ice damage and slow effect',
    targetSlot: 'weapon',
    materials: { 'ice_shard': 3, 'magic_dust': 5 },
    goldCost: 100,
    successRate: 0.8,
    result: {
      id: 'ice_enchant',
      name: 'Frost',
      description: 'Weapon slows enemies on hit',
      statBonus: { magic: 2 },
      level: 1,
      maxLevel: 5
    }
  },
  {
    id: 'fortify_armor',
    name: 'Fortify Armor',
    description: 'Increase armor defense',
    targetSlot: 'armor',
    materials: { 'iron_ingot': 5, 'leather': 3 },
    goldCost: 150,
    successRate: 0.9,
    result: {
      id: 'fortify',
      name: 'Fortified',
      description: 'Increased defense',
      statBonus: { durability: 3 },
      level: 1,
      maxLevel: 5
    }
  }
];

// ===== UPGRADE COSTS =====

export function getUpgradeCosts(currentLevel: number): UpgradeCost {
  return {
    level: currentLevel + 1,
    gold: 50 * Math.pow(2, currentLevel),
    materials: {
      'upgrade_shard': currentLevel + 1,
      'magic_dust': (currentLevel + 1) * 2
    },
    successRate: Math.max(0.3, 1 - (currentLevel * 0.1))
  };
}

// ===== MATERIALS =====

export const MATERIALS: Record<string, { name: string; description: string; icon: string }> = {
  'fire_essence': { name: 'Fire Essence', description: 'Flame from the heart of a volcano', icon: '🔥' },
  'ice_shard': { name: 'Ice Shard', description: 'Frozen fragment from the Frozen Throne', icon: '❄️' },
  'magic_dust': { name: 'Magic Dust', description: 'Residual magical energy', icon: '✨' },
  'iron_ingot': { name: 'Iron Ingot', description: 'Refined iron for crafting', icon: '🔩' },
  'leather': { name: 'Leather', description: 'Sturdy animal hide', icon: '🟫' },
  'upgrade_shard': { name: 'Upgrade Shard', description: 'Used to upgrade equipment', icon: '💎' }
};
