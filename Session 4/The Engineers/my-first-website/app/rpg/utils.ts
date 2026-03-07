// Game Logic Utilities - Extended

import { 
  CharacterStats, 
  DerivedStats, 
  Weapon, 
  Equipment, 
  ArmorSlot,
  Character,
  LootDrop,
  EnemyTier,
  Passive,
  Dungeon,
  Room,
  RoomType,
  SkillNode,
  Enchantment
} from './types';
import { 
  RARITY_INFO, 
  ENEMY_TIERS, 
  BOSS_DROPS,
  EQUIPMENT_PREFIXES,
  EQUIPMENT_BASE_NAMES,
  PASSIVE_TYPES,
  MATERIALS,
  getUpgradeCosts
} from './gameData';

// Calculate derived stats
export function calculateDerivedStats(stats: CharacterStats): DerivedStats {
  return {
    maxHp: 400 + (stats.vitality * 25) + (stats.durability * 5),
    maxStamina: Math.floor(100 + (stats.vitality * 1.5) + (stats.durability * 0.5)),
    carryWeight: 40 + (stats.vitality * 1.5) + (stats.strength * 0.5),
    critChance: 5.0 + (stats.arcane * 0.2) + (stats.speed * 0.1),
    dodgeBonus: Math.min(stats.speed * 0.03, 0.75),
    iFrames: Math.min(Math.floor(12 + (stats.speed * 0.1)), 20),
    staminaRegen: 20.0 * (1 + (stats.speed * 0.005)),
    defense: stats.durability * 2
  };
}

// Calculate weapon damage with scaling
export function calculateWeaponDamage(
  weapon: Weapon, 
  stats: CharacterStats
): number {
  let damage = weapon.baseDamage;
  
  const scalingMultipliers: Record<string, number> = {
    'S': 2.0, 'A': 1.5, 'B': 1.2, 'C': 1.0, 'D': 0.8, 'E': 0.5, '-': 0
  };
  
  damage += weapon.baseDamage * scalingMultipliers[weapon.scaling.strength] * (stats.strength / 100);
  damage += weapon.baseDamage * scalingMultipliers[weapon.scaling.dexterity] * (stats.speed / 100) * 0.8;
  damage += weapon.baseDamage * scalingMultipliers[weapon.scaling.magic] * (stats.magic / 100);
  damage += weapon.baseDamage * scalingMultipliers[weapon.scaling.arcane] * (stats.arcane / 100) * 0.5;
  
  // Apply upgrade bonus
  if (weapon.upgradeLevel && weapon.upgradeLevel > 0) {
    damage *= (1 + weapon.upgradeLevel * 0.1);
  }
  
  return Math.floor(damage);
}

// Calculate total stats with equipment
export function calculateTotalStats(
  baseStats: CharacterStats,
  equippedArmor: Record<ArmorSlot, Equipment | null>,
  unlockedSkills: string[],
  skillNodes: SkillNode[]
): { stats: CharacterStats; bonuses: Record<string, number> } {
  const stats = { ...baseStats };
  const bonuses: Record<string, number> = {
    hpBonus: 0,
    damageBoost: 0,
    critChance: 0,
    critDamage: 0,
    attackSpeed: 0,
    damageReduction: 0,
    staminaRegen: 0,
    movementSpeed: 0,
    defense: 0
  };
  
  // Apply equipment bonuses
  Object.values(equippedArmor).forEach(item => {
    if (!item) return;
    
    const rarityMult = RARITY_INFO[item.rarity]?.statMult || 1;
    bonuses.defense += item.defense * rarityMult;
    
    item.passives.forEach(passive => {
      switch (passive.type) {
        case 'hp_bonus': bonuses.hpBonus += passive.value; break;
        case 'damage_boost': bonuses.damageBoost += passive.value; break;
        case 'crit_chance': bonuses.critChance += passive.value; break;
        case 'crit_damage': bonuses.critDamage += passive.value; break;
        case 'attack_speed': bonuses.attackSpeed += passive.value; break;
        case 'damage_reduction': bonuses.damageReduction += passive.value; break;
        case 'stamina_regen': bonuses.staminaRegen += passive.value; break;
        case 'movement_speed': bonuses.movementSpeed += passive.value; break;
      }
    });
    
    // Apply enchantments
    item.enchantments?.forEach(enchant => {
      Object.entries(enchant.statBonus).forEach(([stat, value]) => {
        if (value) {
          stats[stat as keyof CharacterStats] += value * enchant.level;
        }
      });
    });
  });
  
  // Apply skill bonuses
  skillNodes.forEach(node => {
    if (unlockedSkills.includes(node.id) && node.currentLevel > 0) {
      node.effects.forEach(effect => {
        if (effect.type === 'stat_bonus' && effect.target) {
          const bonus = effect.value * node.currentLevel;
          stats[effect.target as keyof CharacterStats] += bonus;
        }
      });
    }
  });
  
  return { stats, bonuses };
}

// Roll random rarity
export function rollRarity(luckBonus: number = 0): string {
  const weights = [
    { rarity: 'common', weight: 50 - luckBonus * 3 },
    { rarity: 'uncommon', weight: 30 },
    { rarity: 'rare', weight: 15 + luckBonus * 2 },
    { rarity: 'epic', weight: 4 + luckBonus * 0.5 },
    { rarity: 'legendary', weight: 0.9 + luckBonus * 0.1 },
    { rarity: 'mythic', weight: 0.1 + luckBonus * 0.02 }
  ];
  
  const totalWeight = weights.reduce((sum, w) => sum + Math.max(0, w.weight), 0);
  let random = Math.random() * totalWeight;
  
  for (const { rarity, weight } of weights) {
    random -= Math.max(0, weight);
    if (random <= 0) return rarity;
  }
  
  return 'common';
}

// Generate random equipment
export function generateRandomEquipment(
  slot: ArmorSlot,
  level: number,
  rarity?: string
): Equipment {
  const finalRarity = rarity || rollRarity();
  const rarityMult = RARITY_INFO[finalRarity].statMult;
  
  const prefixes = EQUIPMENT_PREFIXES[finalRarity];
  const baseNames = EQUIPMENT_BASE_NAMES[slot];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const baseName = baseNames[Math.floor(Math.random() * baseNames.length)];
  
  const baseDefense = Math.floor((5 + level * 2) * rarityMult);
  const weight = slot === 'chest' || slot === 'legs' 
    ? 2 + Math.random() * 6 
    : 0.5 + Math.random() * 2.5;
  
  const numPassives = Math.floor(Math.random() * (rarityMult > 1.5 ? 3 : 2));
  const passives: Passive[] = [];
  
  for (let i = 0; i < numPassives; i++) {
    const passiveType = PASSIVE_TYPES[Math.floor(Math.random() * PASSIVE_TYPES.length)];
    const value = Math.floor(
      (passiveType.min + Math.random() * (passiveType.max - passiveType.min)) * rarityMult
    );
    passives.push({
      type: passiveType.type,
      label: passiveType.label,
      value,
      unit: passiveType.unit
    });
  }
  
  return {
    id: `eq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: `${prefix} ${baseName}`,
    description: `A ${finalRarity} piece of equipment found in the dungeon depths.`,
    slot,
    rarity: finalRarity as any,
    levelRequirement: Math.max(1, level - 5),
    defense: baseDefense,
    weight: Math.round(weight * 10) / 10,
    passives,
    upgradeLevel: 0
  };
}

// Generate loot
export function generateLoot(
  enemyLevel: number,
  tier: EnemyTier,
  bossName?: string
): LootDrop {
  const tierInfo = ENEMY_TIERS[tier];
  const luckBonus = tierInfo.luckBonus;
  
  const drop: LootDrop = {
    gold: Math.floor(Math.random() * (10 * tierInfo.itemMult)) + (5 * tierInfo.itemMult),
    equipment: [],
    weapons: [],
    materials: {}
  };
  
  // Roll equipment
  if (Math.random() < 0.3 * tierInfo.itemMult) {
    const numItems = Math.floor(Math.random() * tierInfo.itemMult) + 1;
    const slots: ArmorSlot[] = ['head', 'chest', 'legs', 'hands', 'feet', 'ring1', 'amulet'];
    
    for (let i = 0; i < numItems; i++) {
      const slot = slots[Math.floor(Math.random() * slots.length)];
      drop.equipment.push(generateRandomEquipment(slot, enemyLevel));
    }
  }
  
  // Roll materials
  if (Math.random() < 0.5) {
    const materialKeys = Object.keys(MATERIALS);
    const material = materialKeys[Math.floor(Math.random() * materialKeys.length)];
    const amount = Math.floor(Math.random() * tierInfo.itemMult) + 1;
    drop.materials = { [material]: amount };
  }
  
  // Boss drop
  if (bossName && BOSS_DROPS[bossName]) {
    drop.equipment.unshift(BOSS_DROPS[bossName]());
  }
  
  return drop;
}

// ===== DUNGEON GENERATION =====

export function generateDungeon(dungeonId: string, playerLevel: number): Dungeon {
  const rooms: Room[] = [];
  const roomCount = 8 + Math.floor(Math.random() * 5);
  
  // Create start room
  rooms.push({
    id: 'start',
    type: 'start',
    x: 0,
    y: 0,
    connections: [],
    visited: true,
    cleared: true
  });
  
  // Generate rooms in a branching pattern
  let currentX = 1;
  let currentY = 0;
  
  for (let i = 1; i < roomCount; i++) {
    const types: RoomType[] = ['combat', 'combat', 'combat', 'elite', 'treasure', 'shop', 'rest'];
    
    // Boss room at the end
    if (i === roomCount - 1) {
      types.push('boss');
    }
    
    const type = types[Math.floor(Math.random() * types.length)];
    
    rooms.push({
      id: `room_${i}`,
      type,
      x: currentX,
      y: currentY + (Math.random() > 0.5 ? 1 : -1),
      connections: i > 0 ? [`room_${i-1}`] : [],
      visited: false,
      cleared: false
    });
    
    // Connect previous room back
    if (i > 1) {
      rooms[i-1].connections.push(`room_${i}`);
    }
    
    currentX++;
  }
  
  return {
    id: dungeonId,
    name: getDungeonName(dungeonId),
    description: getDungeonDescription(dungeonId),
    difficulty: Math.floor(playerLevel / 20) + 1,
    rooms,
    currentRoom: 'start',
    completed: false
  };
}

function getDungeonName(id: string): string {
  const names: Record<string, string> = {
    'crypt_of_shadows': 'Crypt of Shadows',
    'molten_core': 'Molten Core',
    'frozen_throne': 'Frozen Throne'
  };
  return names[id] || 'Unknown Dungeon';
}

function getDungeonDescription(id: string): string {
  const descs: Record<string, string> = {
    'crypt_of_shadows': 'An ancient burial ground infested with undead.',
    'molten_core': 'A volcanic dungeon filled with fire elementals.',
    'frozen_throne': 'The icy lair of the Frost Queen.'
  };
  return descs[id] || 'A mysterious dungeon.';
}

// ===== SKILL TREE FUNCTIONS =====

export function canUnlockSkill(node: SkillNode, unlockedSkills: string[]): boolean {
  if (node.currentLevel >= node.maxLevel) return false;
  if (!node.requires) return true;
  return node.requires.every(req => unlockedSkills.includes(req));
}

export function unlockSkill(
  nodeId: string, 
  skillNodes: SkillNode[], 
  unlockedSkills: string[],
  availablePoints: number
): { success: boolean; nodes: SkillNode[]; points: number } {
  if (availablePoints <= 0) return { success: false, nodes: skillNodes, points: availablePoints };
  
  const nodeIndex = skillNodes.findIndex(n => n.id === nodeId);
  if (nodeIndex === -1) return { success: false, nodes: skillNodes, points: availablePoints };
  
  const node = skillNodes[nodeIndex];
  if (!canUnlockSkill(node, unlockedSkills)) {
    return { success: false, nodes: skillNodes, points: availablePoints };
  }
  
  const newNodes = [...skillNodes];
  newNodes[nodeIndex] = { ...node, currentLevel: node.currentLevel + 1 };
  
  const newUnlocked = [...unlockedSkills];
  if (!newUnlocked.includes(nodeId)) {
    newUnlocked.push(nodeId);
  }
  
  return { success: true, nodes: newNodes, points: availablePoints - 1 };
}

// ===== ENCHANTING FUNCTIONS =====

export function applyEnchantment(
  item: Weapon | Equipment,
  enchantment: Enchantment
): Weapon | Equipment {
  const newItem = { ...item };
  if (!newItem.enchantments) {
    newItem.enchantments = [];
  }
  
  // Check if same enchantment exists and upgrade it
  const existingIndex = newItem.enchantments.findIndex(e => e.id === enchantment.id);
  if (existingIndex >= 0) {
    const existing = newItem.enchantments[existingIndex];
    if (existing.level < existing.maxLevel) {
      newItem.enchantments[existingIndex] = { ...existing, level: existing.level + 1 };
    }
  } else {
    newItem.enchantments.push(enchantment);
  }
  
  return newItem;
}

// ===== UPGRADE FUNCTIONS =====

export function upgradeItem(item: Weapon | Equipment): { success: boolean; item: Weapon | Equipment } {
  const currentLevel = item.upgradeLevel || 0;
  const costs = getUpgradeCosts(currentLevel);
  
  // Roll for success
  const roll = Math.random();
  if (roll <= costs.successRate) {
    const upgradedItem = { ...item };
    upgradedItem.upgradeLevel = currentLevel + 1;
    
    if ('baseDamage' in upgradedItem) {
      upgradedItem.baseDamage = Math.floor(upgradedItem.baseDamage * 1.1);
    }
    if ('defense' in upgradedItem) {
      upgradedItem.defense = Math.floor(upgradedItem.defense * 1.1);
    }
    
    return { success: true, item: upgradedItem };
  }
  
  return { success: false, item };
}

// ===== UTILITY FUNCTIONS =====

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function getScalingColor(grade: string): string {
  const colors: Record<string, string> = {
    'S': 'text-red-500', 'A': 'text-orange-500', 'B': 'text-yellow-500',
    'C': 'text-green-500', 'D': 'text-blue-500', 'E': 'text-gray-500', '-': 'text-gray-600'
  };
  return colors[grade] || 'text-gray-500';
}

export function xpForLevel(currentLevel: number): number {
  return Math.floor(100 + Math.pow(currentLevel * 15, 2));
}

export function compareItems(oldItem: Equipment | null, newItem: Equipment): {
  stat: string;
  difference: number;
  better: boolean;
}[] {
  const comparisons: { stat: string; difference: number; better: boolean }[] = [];
  
  if (!oldItem) {
    return [{ stat: 'defense', difference: newItem.defense, better: true }];
  }
  
  const oldDefense = oldItem.defense * (RARITY_INFO[oldItem.rarity]?.statMult || 1);
  const newDefense = newItem.defense * (RARITY_INFO[newItem.rarity]?.statMult || 1);
  
  comparisons.push({
    stat: 'defense',
    difference: newDefense - oldDefense,
    better: newDefense > oldDefense
  });
  
  comparisons.push({
    stat: 'weight',
    difference: oldItem.weight - newItem.weight,
    better: newItem.weight < oldItem.weight
  });
  
  return comparisons;
}

// ===== MULTIPLAYER HELPERS =====

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 9).toUpperCase();
}

export function createSystemMessage(text: string) {
  return {
    id: `sys_${Date.now()}`,
    playerId: 'system',
    playerName: 'System',
    message: text,
    timestamp: Date.now(),
    type: 'system' as const
  };
}
