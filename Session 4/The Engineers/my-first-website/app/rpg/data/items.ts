// ============================================
// ITEM SYSTEM - Consumables & Equipment
// ============================================

export type ItemType = 'consumable' | 'weapon' | 'armor' | 'accessory' | 'material';
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface ItemEffect {
  type: 'heal_hp' | 'heal_mp' | 'buff_atk' | 'buff_def' | 'buff_spd' | 'cure' | 'revive' | 'damage' | 'dot';
  value: number; // Percentage or flat value
  duration?: number; // For buffs: number of turns
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  icon: string;
  effect?: ItemEffect;
  stats?: {
    attack?: number;
    defense?: number;
    speed?: number;
    critChance?: number;
    critDamage?: number;
    maxHealth?: number;
    maxMana?: number;
  };
  buyPrice: number;
  sellPrice: number;
  maxStack: number;
}

// ============================================
// CONSUMABLE ITEMS
// ============================================

export const CONSUMABLE_ITEMS: Item[] = [
  // Health Potions
  {
    id: 'hp_potion_small',
    name: 'Health Potion (Small)',
    description: 'Restores 25% of maximum HP',
    type: 'consumable',
    rarity: 'common',
    icon: '🧪',
    effect: { type: 'heal_hp', value: 25 },
    buyPrice: 50,
    sellPrice: 25,
    maxStack: 10,
  },
  {
    id: 'hp_potion_medium',
    name: 'Health Potion (Medium)',
    description: 'Restores 50% of maximum HP',
    type: 'consumable',
    rarity: 'uncommon',
    icon: '🧪',
    effect: { type: 'heal_hp', value: 50 },
    buyPrice: 100,
    sellPrice: 50,
    maxStack: 5,
  },
  {
    id: 'hp_potion_large',
    name: 'Health Potion (Large)',
    description: 'Restores 100% of maximum HP',
    type: 'consumable',
    rarity: 'rare',
    icon: '🧪',
    effect: { type: 'heal_hp', value: 100 },
    buyPrice: 250,
    sellPrice: 125,
    maxStack: 3,
  },
  
  // Mana Potions
  {
    id: 'mp_potion_small',
    name: 'Mana Potion (Small)',
    description: 'Restores 25% of maximum MP',
    type: 'consumable',
    rarity: 'common',
    icon: '⚗️',
    effect: { type: 'heal_mp', value: 25 },
    buyPrice: 75,
    sellPrice: 35,
    maxStack: 10,
  },
  {
    id: 'mp_potion_medium',
    name: 'Mana Potion (Medium)',
    description: 'Restores 50% of maximum MP',
    type: 'consumable',
    rarity: 'uncommon',
    icon: '⚗️',
    effect: { type: 'heal_mp', value: 50 },
    buyPrice: 150,
    sellPrice: 75,
    maxStack: 5,
  },
  {
    id: 'mp_potion_large',
    name: 'Mana Potion (Large)',
    description: 'Restores 100% of maximum MP',
    type: 'consumable',
    rarity: 'rare',
    icon: '⚗️',
    effect: { type: 'heal_mp', value: 100 },
    buyPrice: 350,
    sellPrice: 175,
    maxStack: 3,
  },
  
  // Elixirs
  {
    id: 'elixir',
    name: 'Elixir',
    description: 'Restores 100% HP and MP',
    type: 'consumable',
    rarity: 'epic',
    icon: '🏺',
    effect: { type: 'heal_hp', value: 100 }, // Also heals MP
    buyPrice: 500,
    sellPrice: 250,
    maxStack: 2,
  },
  
  // Status Cure
  {
    id: 'antidote',
    name: 'Antidote',
    description: 'Cures poison, stun, and confusion',
    type: 'consumable',
    rarity: 'common',
    icon: '💊',
    effect: { type: 'cure', value: 0 },
    buyPrice: 30,
    sellPrice: 15,
    maxStack: 10,
  },
  
  // Revive
  {
    id: 'revive_charm',
    name: 'Revive Charm',
    description: 'Auto-revives you once when defeated',
    type: 'consumable',
    rarity: 'legendary',
    icon: '🌀',
    effect: { type: 'revive', value: 50 }, // Revive with 50% HP
    buyPrice: 1000,
    sellPrice: 500,
    maxStack: 1,
  },
  
  // Buff Tonics
  {
    id: 'strength_tonic',
    name: 'Strength Tonic',
    description: '+20% Attack for 3 turns',
    type: 'consumable',
    rarity: 'uncommon',
    icon: '💪',
    effect: { type: 'buff_atk', value: 20, duration: 3 },
    buyPrice: 150,
    sellPrice: 75,
    maxStack: 5,
  },
  {
    id: 'defense_tonic',
    name: 'Defense Tonic',
    description: '+20% Defense for 3 turns',
    type: 'consumable',
    rarity: 'uncommon',
    icon: '🛡️',
    effect: { type: 'buff_def', value: 20, duration: 3 },
    buyPrice: 150,
    sellPrice: 75,
    maxStack: 5,
  },
  {
    id: 'speed_tonic',
    name: 'Speed Tonic',
    description: '+20% Speed for 3 turns',
    type: 'consumable',
    rarity: 'uncommon',
    icon: '⚡',
    effect: { type: 'buff_spd', value: 20, duration: 3 },
    buyPrice: 150,
    sellPrice: 75,
    maxStack: 5,
  },
];

// ============================================
// EQUIPMENT ITEMS
// ============================================

export const EQUIPMENT_ITEMS: Item[] = [
  // Starter Weapons
  {
    id: 'wood_sword',
    name: 'Wood Sword',
    description: 'A basic wooden sword. Perfect for beginners.',
    type: 'weapon',
    rarity: 'common',
    icon: '🗡️',
    stats: { attack: 8 },
    buyPrice: 50,
    sellPrice: 25,
    maxStack: 1,
  },
  {
    id: 'keyboard_of_power',
    name: 'Keyboard of Power',
    description: 'A weaponized mechanical keyboard',
    type: 'weapon',
    rarity: 'common',
    icon: '⌨️',
    stats: { attack: 5, critChance: 2 },
    buyPrice: 100,
    sellPrice: 50,
    maxStack: 1,
  },
  {
    id: 'debug_sword',
    name: 'Debug Sword',
    description: 'Cuts through bugs with precision',
    type: 'weapon',
    rarity: 'uncommon',
    icon: '🗡️',
    stats: { attack: 12, critChance: 5 },
    buyPrice: 300,
    sellPrice: 150,
    maxStack: 1,
  },
  {
    id: 'refactoring_axe',
    name: 'Refactoring Axe',
    description: 'Cleans up messy code structures',
    type: 'weapon',
    rarity: 'rare',
    icon: '🪓',
    stats: { attack: 25, critChance: 8, critDamage: 10 },
    buyPrice: 800,
    sellPrice: 400,
    maxStack: 1,
  },
  {
    id: 'compiler_blade',
    name: 'Compiler Blade',
    description: 'Transforms code into pure damage',
    type: 'weapon',
    rarity: 'epic',
    icon: '⚔️',
    stats: { attack: 45, critChance: 12, critDamage: 20 },
    buyPrice: 2000,
    sellPrice: 1000,
    maxStack: 1,
  },
  {
    id: 'syntax_slayer',
    name: 'Syntax Slayer',
    description: 'Legendary weapon of the Architects',
    type: 'weapon',
    rarity: 'legendary',
    icon: '🗡️',
    stats: { attack: 80, critChance: 20, critDamage: 50, speed: 10 },
    buyPrice: 5000,
    sellPrice: 2500,
    maxStack: 1,
  },
  
  // Armor
  {
    id: 'wood_armor_plate',
    name: 'Wood Armor Plate',
    description: 'Basic wooden armor. Increases your health.',
    type: 'armor',
    rarity: 'common',
    icon: '🛡️',
    stats: { defense: 3, maxHealth: 30 },
    buyPrice: 50,
    sellPrice: 25,
    maxStack: 1,
  },
  {
    id: 'monitor_shield',
    name: 'Monitor Shield',
    description: 'Blocks incoming damage',
    type: 'armor',
    rarity: 'common',
    icon: '🖥️',
    stats: { defense: 5, maxHealth: 20 },
    buyPrice: 100,
    sellPrice: 50,
    maxStack: 1,
  },
  {
    id: 'firewall_plate',
    name: 'Firewall Plate',
    description: 'Digital protection layer',
    type: 'armor',
    rarity: 'uncommon',
    icon: '🛡️',
    stats: { defense: 12, maxHealth: 50 },
    buyPrice: 350,
    sellPrice: 175,
    maxStack: 1,
  },
  {
    id: 'encryption_mail',
    name: 'Encryption Mail',
    description: 'Encrypted defense matrix',
    type: 'armor',
    rarity: 'rare',
    icon: '🔒',
    stats: { defense: 25, maxHealth: 100, maxMana: 30 },
    buyPrice: 900,
    sellPrice: 450,
    maxStack: 1,
  },
  {
    id: 'kernel_armor',
    name: 'Kernel Armor',
    description: 'System-level protection',
    type: 'armor',
    rarity: 'epic',
    icon: '⚙️',
    stats: { defense: 45, maxHealth: 200, maxMana: 60 },
    buyPrice: 2200,
    sellPrice: 1100,
    maxStack: 1,
  },
  {
    id: 'architect_plate',
    name: 'Architect Plate',
    description: 'Forged by the First Coders',
    type: 'armor',
    rarity: 'legendary',
    icon: '🛡️',
    stats: { defense: 80, maxHealth: 400, maxMana: 120 },
    buyPrice: 5500,
    sellPrice: 2750,
    maxStack: 1,
  },
  
  // Accessories
  {
    id: 'silver_ring',
    name: 'Silver Ring',
    description: 'A simple silver ring that enhances your magical energy.',
    type: 'accessory',
    rarity: 'common',
    icon: '💍',
    stats: { maxMana: 25 },
    buyPrice: 50,
    sellPrice: 25,
    maxStack: 1,
  },
  {
    id: 'mouse_amulet',
    name: 'Mouse Amulet',
    description: 'Increases precision',
    type: 'accessory',
    rarity: 'common',
    icon: '🖱️',
    stats: { critChance: 3 },
    buyPrice: 80,
    sellPrice: 40,
    maxStack: 1,
  },
  {
    id: 'wifi_ring',
    name: 'WiFi Ring',
    description: 'Always connected, always ready',
    type: 'accessory',
    rarity: 'uncommon',
    icon: '📡',
    stats: { speed: 5, critChance: 5 },
    buyPrice: 250,
    sellPrice: 125,
    maxStack: 1,
  },
  {
    id: 'bluetooth_charm',
    name: 'Bluetooth Charm',
    description: 'Wireless power boost',
    type: 'accessory',
    rarity: 'rare',
    icon: '📶',
    stats: { attack: 8, speed: 8, critChance: 8 },
    buyPrice: 700,
    sellPrice: 350,
    maxStack: 1,
  },
  {
    id: 'quantum_ring',
    name: 'Quantum Ring',
    description: 'Exists in multiple states',
    type: 'accessory',
    rarity: 'epic',
    icon: '💍',
    stats: { attack: 15, defense: 15, speed: 15, critChance: 15 },
    buyPrice: 1800,
    sellPrice: 900,
    maxStack: 1,
  },
  {
    id: 'ai_crown',
    name: 'AI Crown',
    description: 'Intelligence beyond measure',
    type: 'accessory',
    rarity: 'legendary',
    icon: '👑',
    stats: { attack: 25, defense: 25, speed: 25, critChance: 25, critDamage: 25 },
    buyPrice: 5000,
    sellPrice: 2500,
    maxStack: 1,
  },
];

// ============================================
// BOSS DROP ITEMS (Unique)
// ============================================

export const BOSS_DROP_ITEMS: Item[] = [
  // Basilisk Drops
  {
    id: 'serpent_scale',
    name: 'Serpent Scale',
    description: 'Shed by the Basilisk. Grants regeneration.',
    type: 'accessory',
    rarity: 'epic',
    icon: '🐍',
    stats: { defense: 20, maxHealth: 100 },
    effect: { type: 'heal_hp', value: 5 }, // Passive: heal 5% per turn
    buyPrice: 0, // Can't buy
    sellPrice: 500,
    maxStack: 1,
  },
  {
    id: 'loop_breaker',
    name: 'Loop Breaker',
    description: 'Sword that ends infinite cycles',
    type: 'weapon',
    rarity: 'epic',
    icon: '🗡️',
    stats: { attack: 60, critChance: 15 },
    buyPrice: 0,
    sellPrice: 800,
    maxStack: 1,
  },
  
  // Shapeshifter Drops
  {
    id: 'void_shard',
    name: 'Void Shard',
    description: 'Fragment of nothingness',
    type: 'material',
    rarity: 'epic',
    icon: '🌑',
    buyPrice: 0,
    sellPrice: 600,
    maxStack: 5,
  },
  {
    id: 'null_amulet',
    name: 'Null Amulet',
    description: 'Protects against void damage',
    type: 'accessory',
    rarity: 'epic',
    icon: '📿',
    stats: { defense: 30, maxMana: 100 },
    buyPrice: 0,
    sellPrice: 900,
    maxStack: 1,
  },
  
  // Golem Drops
  {
    id: 'golem_core',
    name: 'Golem Core',
    description: 'Power source of stone constructs',
    type: 'material',
    rarity: 'legendary',
    icon: '💎',
    buyPrice: 0,
    sellPrice: 1000,
    maxStack: 3,
  },
  {
    id: 'modular_plate',
    name: 'Modular Plate',
    description: 'Armor that adapts to any threat',
    type: 'armor',
    rarity: 'legendary',
    icon: '🛡️',
    stats: { defense: 60, maxHealth: 300 },
    buyPrice: 0,
    sellPrice: 1500,
    maxStack: 1,
  },
  
  // Chimera Drops
  {
    id: 'ux_crystal',
    name: 'UX Crystal',
    description: 'Pure user experience energy',
    type: 'material',
    rarity: 'legendary',
    icon: '💎',
    buyPrice: 0,
    sellPrice: 1200,
    maxStack: 3,
  },
  {
    id: 'chimera_horn',
    name: 'Chimera Horn',
    description: 'Confuses enemies who gaze upon it',
    type: 'accessory',
    rarity: 'legendary',
    icon: '🦄',
    stats: { attack: 40, critChance: 20 },
    buyPrice: 0,
    sellPrice: 1800,
    maxStack: 1,
  },
  
  // Titan Drops
  {
    id: 'titan_core',
    name: 'Titan Core',
    description: 'The ultimate power source',
    type: 'material',
    rarity: 'legendary',
    icon: '⚡',
    buyPrice: 0,
    sellPrice: 2000,
    maxStack: 1,
  },
  {
    id: 'ai_consciousness',
    name: 'AI Consciousness',
    description: 'Fragment of true intelligence',
    type: 'accessory',
    rarity: 'legendary',
    icon: '🧠',
    stats: { attack: 50, defense: 50, speed: 50, critChance: 25 },
    buyPrice: 0,
    sellPrice: 3000,
    maxStack: 1,
  },
  {
    id: 'paragon_crown',
    name: 'Paragon Crown',
    description: 'Worn only by those who conquer all',
    type: 'accessory',
    rarity: 'legendary',
    icon: '👑',
    stats: { attack: 75, defense: 75, speed: 75, critChance: 30, critDamage: 50 },
    buyPrice: 0,
    sellPrice: 5000,
    maxStack: 1,
  },
];

// ============================================
// ALL ITEMS COMBINED
// ============================================

export const ALL_ITEMS: Item[] = [
  ...CONSUMABLE_ITEMS,
  ...EQUIPMENT_ITEMS,
  ...BOSS_DROP_ITEMS,
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getItemById(id: string): Item | undefined {
  return ALL_ITEMS.find(item => item.id === id);
}

export function getItemsByType(type: ItemType): Item[] {
  return ALL_ITEMS.filter(item => item.type === type);
}

export function getItemsByRarity(rarity: ItemRarity): Item[] {
  return ALL_ITEMS.filter(item => item.rarity === rarity);
}

export function getShopItems(round: number): Item[] {
  // Filter items available in shop (not boss drops)
  const shopItems = [...CONSUMABLE_ITEMS, ...EQUIPMENT_ITEMS];
  
  // Apply inflation based on round
  const inflation = 1 + (round * 0.02);
  
  return shopItems.map(item => ({
    ...item,
    buyPrice: Math.floor(item.buyPrice * inflation),
  }));
}

export function calculateSellPrice(item: Item, round: number): number {
  // Prices decrease as rounds progress (market saturation)
  const depreciation = Math.max(0.5, 1 - (round * 0.01));
  return Math.floor(item.sellPrice * depreciation);
}

export function generateDrop(round: number, isBoss: boolean = false): Item | null {
  const roll = Math.random();
  
  // Bosses have guaranteed good drops
  if (isBoss) {
    const bossDrops = BOSS_DROP_ITEMS.filter(item => 
      item.rarity === 'epic' || item.rarity === 'legendary'
    );
    return bossDrops[Math.floor(Math.random() * bossDrops.length)] || null;
  }
  
  // Regular drops with round-based quality improvement
  const qualityBonus = Math.min(0.3, round * 0.01);
  const adjustedRoll = roll + qualityBonus;
  
  if (adjustedRoll > 0.95) {
    // Legendary drop (very rare)
    const legendary = ALL_ITEMS.filter(i => i.rarity === 'legendary' && i.type !== 'material');
    return legendary[Math.floor(Math.random() * legendary.length)] || null;
  }
  if (adjustedRoll > 0.85) {
    // Epic drop
    const epic = ALL_ITEMS.filter(i => i.rarity === 'epic' && i.type !== 'material');
    return epic[Math.floor(Math.random() * epic.length)] || null;
  }
  if (adjustedRoll > 0.70) {
    // Rare drop
    const rare = ALL_ITEMS.filter(i => i.rarity === 'rare' && i.type !== 'material');
    return rare[Math.floor(Math.random() * rare.length)] || null;
  }
  if (adjustedRoll > 0.45) {
    // Uncommon drop
    const uncommon = ALL_ITEMS.filter(i => i.rarity === 'uncommon');
    return uncommon[Math.floor(Math.random() * uncommon.length)] || null;
  }
  
  // Common drop (consumables mostly)
  const common = CONSUMABLE_ITEMS.filter(i => i.rarity === 'common');
  return common[Math.floor(Math.random() * common.length)] || null;
}

// Roll for item drops based on monster rarity and player luck
// Returns array of item IDs
export function rollItemDrops(rarity: string, playerLuck: number = 0): string[] {
  const drops: string[] = [];
  
  // Base drop chances by monster rarity
  const baseChances: Record<string, number> = {
    common: 0.15,
    uncommon: 0.25,
    rare: 0.40,
    epic: 0.60,
    boss: 1.0, // Guaranteed drops from bosses
  };
  
  const baseChance = baseChances[rarity] || 0.1;
  const luckBonus = playerLuck * 0.005; // Each luck point adds 0.5% chance
  const finalChance = Math.min(0.95, baseChance + luckBonus);
  
  // Roll for drop
  if (Math.random() < finalChance) {
    // Determine what rarity of item drops
    const rarityRoll = Math.random();
    let dropRarity: ItemRarity;
    
    if (rarity === 'boss') {
      // Bosses drop better items
      if (rarityRoll < 0.3) dropRarity = 'rare';
      else if (rarityRoll < 0.6) dropRarity = 'epic';
      else dropRarity = 'legendary';
    } else {
      // Regular drops
      if (rarityRoll < 0.5) dropRarity = 'common';
      else if (rarityRoll < 0.8) dropRarity = 'uncommon';
      else if (rarityRoll < 0.95) dropRarity = 'rare';
      else dropRarity = 'epic';
    }
    
    // Get items of that rarity (not materials)
    const possibleItems = ALL_ITEMS.filter(
      item => item.rarity === dropRarity && item.type !== 'material'
    );
    
    if (possibleItems.length > 0) {
      const droppedItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
      if (droppedItem) {
        drops.push(droppedItem.id);
      }
    }
  }
  
  // Bosses get a second roll for extra drops
  if (rarity === 'boss' && Math.random() < 0.5) {
    const extraDrop = ALL_ITEMS.filter(
      item => (item.rarity === 'epic' || item.rarity === 'legendary') && item.type !== 'material'
    );
    if (extraDrop.length > 0) {
      const item = extraDrop[Math.floor(Math.random() * extraDrop.length)];
      if (item) drops.push(item.id);
    }
  }
  
  return drops;
}

// Rarity colors for UI
export const RARITY_COLORS: Record<ItemRarity, string> = {
  common: '#95a5a6',
  uncommon: '#2ecc71',
  rare: '#3498db',
  epic: '#9b59b6',
  legendary: '#f1c40f',
};

export const RARITY_NAMES: Record<ItemRarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

// Effect descriptions
export function getEffectDescription(effect: ItemEffect): string {
  switch (effect.type) {
    case 'heal_hp':
      return `Restores ${effect.value}% HP`;
    case 'heal_mp':
      return `Restores ${effect.value}% MP`;
    case 'buff_atk':
      return `+${effect.value}% ATK for ${effect.duration} turns`;
    case 'buff_def':
      return `+${effect.value}% DEF for ${effect.duration} turns`;
    case 'buff_spd':
      return `+${effect.value}% SPD for ${effect.duration} turns`;
    case 'cure':
      return 'Cures all status effects';
    case 'revive':
      return `Revives with ${effect.value}% HP`;
    case 'damage':
      return `Deals ${effect.value} damage`;
    case 'dot':
      return `Poison: ${effect.value} dmg/turn`;
    default:
      return 'Unknown effect';
  }
}
