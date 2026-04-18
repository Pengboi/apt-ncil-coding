// ============================================
// STORAGE SYSTEM - Persistence & Progress
// ============================================

import { Item } from './items';

// ============================================
// STORAGE KEYS
// ============================================

const STORAGE_KEYS = {
  BATTLE_ROUND: 'adventurers_battle_round',
  BATTLE_STREAK: 'adventurers_battle_streak',
  INVENTORY: 'adventurers_inventory',
  GOLD: 'adventurers_gold',
  HIGHEST_ROUND: 'adventurers_highest_round',
  BOSSES_DEFEATED: 'adventurers_bosses_defeated',
  ACHIEVEMENTS: 'adventurers_achievements',
  LAST_BATTLE_TIME: 'adventurers_last_battle',
  PLAYER_BUFFS: 'adventurers_buffs', // Active buffs between battles
} as const;

// ============================================
// TYPES
// ============================================

export interface SavedInventory {
  items: { itemId: string; quantity: number }[];
  maxSlots: number;
}

export interface BossProgress {
  round: number;
  defeatedAt: string; // ISO date
  attempts: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: string;
  icon: string;
}

export interface ActiveBuff {
  type: 'atk' | 'def' | 'spd';
  value: number;
  remainingTurns: number;
}

export interface BattleProgress {
  currentRound: number;
  survivalStreak: number;
  highestRoundReached: number;
  bossesDefeated: BossProgress[];
  achievements: Achievement[];
}

// ============================================
// ROUND MANAGEMENT
// ============================================

export function getCurrentRound(): number {
  if (typeof window === 'undefined') return 1;
  const saved = localStorage.getItem(STORAGE_KEYS.BATTLE_ROUND);
  return saved ? parseInt(saved, 10) : 1;
}

export function setCurrentRound(round: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.BATTLE_ROUND, round.toString());
  
  // Update highest round if this is a new record
  const highest = getHighestRound();
  if (round > highest) {
    setHighestRound(round);
  }
}

export function incrementRound(): number {
  const current = getCurrentRound();
  const next = current + 1;
  setCurrentRound(next);
  return next;
}

export function decrementRound(amount: number = 1): number {
  const current = getCurrentRound();
  const next = Math.max(1, current - amount);
  setCurrentRound(next);
  return next;
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  setCurrentRound(1);
  setSurvivalStreak(0);
  setHighestRound(0);
  clearInventory();
  setGold(0);
  clearBossesDefeated();
  clearAchievements();
}

// ============================================
// STREAK MANAGEMENT
// ============================================

export function getSurvivalStreak(): number {
  if (typeof window === 'undefined') return 0;
  const saved = localStorage.getItem(STORAGE_KEYS.BATTLE_STREAK);
  return saved ? parseInt(saved, 10) : 0;
}

export function setSurvivalStreak(streak: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.BATTLE_STREAK, streak.toString());
}

export function incrementStreak(): number {
  const current = getSurvivalStreak();
  const next = current + 1;
  setSurvivalStreak(next);
  return next;
}

export function resetStreak(): void {
  setSurvivalStreak(0);
}

// ============================================
// HIGHEST ROUND TRACKING
// ============================================

export function getHighestRound(): number {
  if (typeof window === 'undefined') return 0;
  const saved = localStorage.getItem(STORAGE_KEYS.HIGHEST_ROUND);
  return saved ? parseInt(saved, 10) : 0;
}

export function setHighestRound(round: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.HIGHEST_ROUND, round.toString());
}

// ============================================
// GOLD MANAGEMENT
// ============================================

export function getGold(): number {
  if (typeof window === 'undefined') return 0;
  const saved = localStorage.getItem(STORAGE_KEYS.GOLD);
  return saved ? parseInt(saved, 10) : 0;
}

export function setGold(gold: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.GOLD, Math.max(0, gold).toString());
}

export function addGold(amount: number): number {
  const current = getGold();
  const next = current + amount;
  setGold(next);
  return next;
}

export function spendGold(amount: number): boolean {
  const current = getGold();
  if (current < amount) return false;
  setGold(current - amount);
  return true;
}

// ============================================
// INVENTORY MANAGEMENT
// ============================================

export function getInventory(): SavedInventory {
  if (typeof window === 'undefined') return { items: [], maxSlots: 20 };
  const saved = localStorage.getItem(STORAGE_KEYS.INVENTORY);
  return saved ? JSON.parse(saved) : { items: [], maxSlots: 20 };
}

export function saveInventory(inventory: SavedInventory): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
}

export function addItemToInventory(itemId: string, quantity: number = 1): boolean {
  const inventory = getInventory();
  const existing = inventory.items.find(i => i.itemId === itemId);
  
  if (existing) {
    existing.quantity += quantity;
  } else {
    // Check if we have space
    if (inventory.items.length >= inventory.maxSlots) {
      return false; // Inventory full
    }
    inventory.items.push({ itemId, quantity });
  }
  
  saveInventory(inventory);
  return true;
}

export function removeItemFromInventory(itemId: string, quantity: number = 1): boolean {
  const inventory = getInventory();
  const existing = inventory.items.find(i => i.itemId === itemId);
  
  if (!existing || existing.quantity < quantity) {
    return false; // Not enough items
  }
  
  existing.quantity -= quantity;
  
  if (existing.quantity <= 0) {
    inventory.items = inventory.items.filter(i => i.itemId !== itemId);
  }
  
  saveInventory(inventory);
  return true;
}

export function getItemQuantity(itemId: string): number {
  const inventory = getInventory();
  const existing = inventory.items.find(i => i.itemId === itemId);
  return existing ? existing.quantity : 0;
}

export function clearInventory(): void {
  saveInventory({ items: [], maxSlots: 20 });
}

export function expandInventory(slots: number): void {
  const inventory = getInventory();
  inventory.maxSlots += slots;
  saveInventory(inventory);
}

// ============================================
// BOSS TRACKING
// ============================================

export function getBossesDefeated(): BossProgress[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEYS.BOSSES_DEFEATED);
  return saved ? JSON.parse(saved) : [];
}

export function recordBossDefeat(round: number): void {
  const bosses = getBossesDefeated();
  const existing = bosses.find(b => b.round === round);
  
  if (existing) {
    existing.defeatedAt = new Date().toISOString();
    existing.attempts += 1;
  } else {
    bosses.push({
      round,
      defeatedAt: new Date().toISOString(),
      attempts: 1,
    });
  }
  
  localStorage.setItem(STORAGE_KEYS.BOSSES_DEFEATED, JSON.stringify(bosses));
}

export function recordBossAttempt(round: number): void {
  const bosses = getBossesDefeated();
  const existing = bosses.find(b => b.round === round);
  
  if (existing) {
    existing.attempts += 1;
  } else {
    bosses.push({
      round,
      defeatedAt: '', // Not defeated yet
      attempts: 1,
    });
  }
  
  localStorage.setItem(STORAGE_KEYS.BOSSES_DEFEATED, JSON.stringify(bosses));
}

export function isBossDefeated(round: number): boolean {
  const bosses = getBossesDefeated();
  return bosses.some(b => b.round === round && b.defeatedAt !== '');
}

export function getBossAttempts(round: number): number {
  const bosses = getBossesDefeated();
  const boss = bosses.find(b => b.round === round);
  return boss ? boss.attempts : 0;
}

export function clearBossesDefeated(): void {
  localStorage.removeItem(STORAGE_KEYS.BOSSES_DEFEATED);
}

// ============================================
// ACHIEVEMENTS
// ============================================

export function getAchievements(): Achievement[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
  return saved ? JSON.parse(saved) : [];
}

export function unlockAchievement(achievement: Omit<Achievement, 'unlockedAt'>): boolean {
  const achievements = getAchievements();
  
  // Check if already unlocked
  if (achievements.some(a => a.id === achievement.id)) {
    return false;
  }
  
  achievements.push({
    ...achievement,
    unlockedAt: new Date().toISOString(),
  });
  
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  return true;
}

export function hasAchievement(id: string): boolean {
  const achievements = getAchievements();
  return achievements.some(a => a.id === id);
}

export function clearAchievements(): void {
  localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
}

// Achievement definitions
export const ACHIEVEMENTS_LIST = {
  FIRST_VICTORY: {
    id: 'first_victory',
    name: 'First Blood',
    description: 'Win your first battle',
    icon: '🩸',
  },
  BOSS_SLAYER_1: {
    id: 'boss_slayer_1',
    name: 'Serpent Slayer',
    description: 'Defeat the Basilisk of Infinite Loops',
    icon: '🐍',
  },
  BOSS_SLAYER_2: {
    id: 'boss_slayer_2',
    name: 'Void Walker',
    description: 'Defeat the Shapeshifter of Null',
    icon: '👤',
  },
  BOSS_SLAYER_3: {
    id: 'boss_slayer_3',
    name: 'Stone Breaker',
    description: 'Defeat the Golem of Spaghetti Code',
    icon: '🗿',
  },
  BOSS_SLAYER_4: {
    id: 'boss_slayer_4',
    name: 'UX Master',
    description: 'Defeat the Chimera of Bad UX',
    icon: '🦁',
  },
  BOSS_SLAYER_5: {
    id: 'boss_slayer_5',
    name: 'Titan Slayer',
    description: 'Defeat the Titan of Artificial Chaos',
    icon: '🤖',
  },
  ALL_BOSSES: {
    id: 'all_bosses',
    name: 'Boss Hunter',
    description: 'Defeat all 5 bosses',
    icon: '🏆',
  },
  STREAK_5: {
    id: 'streak_5',
    name: 'Warmup',
    description: 'Win 5 battles in a row',
    icon: '🔥',
  },
  STREAK_10: {
    id: 'streak_10',
    name: 'Unstoppable',
    description: 'Win 10 battles in a row',
    icon: '⚡',
  },
  STREAK_25: {
    id: 'streak_25',
    name: 'Legendary',
    description: 'Win 25 battles in a row',
    icon: '🌟',
  },
  ROUND_25: {
    id: 'round_25',
    name: 'Quarter Century',
    description: 'Reach Round 25',
    icon: '📈',
  },
  ROUND_50: {
    id: 'round_50',
    name: 'Halfway to Infinity',
    description: 'Reach Round 50',
    icon: '🎯',
  },
  ROUND_100: {
    id: 'round_100',
    name: 'Endless Warrior',
    description: 'Reach Round 100',
    icon: '♾️',
  },
  RICH_1000: {
    id: 'rich_1000',
    name: 'Treasure Hunter',
    description: 'Accumulate 1000 gold',
    icon: '💰',
  },
  RICH_10000: {
    id: 'rich_10000',
    name: 'Gold Hoarder',
    description: 'Accumulate 10000 gold',
    icon: '👑',
  },
  INVENTORY_FULL: {
    id: 'inventory_full',
    name: 'Pack Rat',
    description: 'Fill your inventory completely',
    icon: '🎒',
  },
  USE_ELIXIR: {
    id: 'use_elixir',
    name: 'Desperate Measures',
    description: 'Use an Elixir in battle',
    icon: '🏺',
  },
  PERFECT_BOSS: {
    id: 'perfect_boss',
    name: 'Flawless Victory',
    description: 'Defeat a boss without taking damage',
    icon: '💎',
  },
} as const;

// Check and unlock achievements based on current state
export function checkAchievements(): Achievement[] {
  const newlyUnlocked: Achievement[] = [];
  const round = getCurrentRound();
  const streak = getSurvivalStreak();
  const gold = getGold();
  const inventory = getInventory();
  const bosses = getBossesDefeated();
  
  // Round achievements
  if (round >= 25) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.ROUND_25);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.ROUND_25, unlockedAt: new Date().toISOString() });
  }
  if (round >= 50) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.ROUND_50);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.ROUND_50, unlockedAt: new Date().toISOString() });
  }
  if (round >= 100) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.ROUND_100);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.ROUND_100, unlockedAt: new Date().toISOString() });
  }
  
  // Streak achievements
  if (streak >= 5) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.STREAK_5);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.STREAK_5, unlockedAt: new Date().toISOString() });
  }
  if (streak >= 10) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.STREAK_10);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.STREAK_10, unlockedAt: new Date().toISOString() });
  }
  if (streak >= 25) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.STREAK_25);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.STREAK_25, unlockedAt: new Date().toISOString() });
  }
  
  // Gold achievements
  if (gold >= 1000) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.RICH_1000);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.RICH_1000, unlockedAt: new Date().toISOString() });
  }
  if (gold >= 10000) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.RICH_10000);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.RICH_10000, unlockedAt: new Date().toISOString() });
  }
  
  // Inventory achievement
  if (inventory.items.length >= inventory.maxSlots) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.INVENTORY_FULL);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.INVENTORY_FULL, unlockedAt: new Date().toISOString() });
  }
  
  // Boss achievements
  const defeatedBossRounds = bosses.filter(b => b.defeatedAt !== '').map(b => b.round);
  
  if (defeatedBossRounds.includes(10)) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.BOSS_SLAYER_1);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.BOSS_SLAYER_1, unlockedAt: new Date().toISOString() });
  }
  if (defeatedBossRounds.includes(20)) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.BOSS_SLAYER_2);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.BOSS_SLAYER_2, unlockedAt: new Date().toISOString() });
  }
  if (defeatedBossRounds.includes(30)) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.BOSS_SLAYER_3);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.BOSS_SLAYER_3, unlockedAt: new Date().toISOString() });
  }
  if (defeatedBossRounds.includes(40)) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.BOSS_SLAYER_4);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.BOSS_SLAYER_4, unlockedAt: new Date().toISOString() });
  }
  if (defeatedBossRounds.includes(50)) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.BOSS_SLAYER_5);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.BOSS_SLAYER_5, unlockedAt: new Date().toISOString() });
  }
  
  // All bosses
  if (defeatedBossRounds.length >= 5) {
    const unlocked = unlockAchievement(ACHIEVEMENTS_LIST.ALL_BOSSES);
    if (unlocked) newlyUnlocked.push({ ...ACHIEVEMENTS_LIST.ALL_BOSSES, unlockedAt: new Date().toISOString() });
  }
  
  return newlyUnlocked;
}

// ============================================
// BUFFS MANAGEMENT (Between Battles)
// ============================================

export function getActiveBuffs(): ActiveBuff[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEYS.PLAYER_BUFFS);
  return saved ? JSON.parse(saved) : [];
}

export function setActiveBuffs(buffs: ActiveBuff[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PLAYER_BUFFS, JSON.stringify(buffs));
}

export function addBuff(buff: ActiveBuff): void {
  const buffs = getActiveBuffs();
  // Remove existing buff of same type
  const filtered = buffs.filter(b => b.type !== buff.type);
  filtered.push(buff);
  setActiveBuffs(filtered);
}

export function decrementBuffTurns(): ActiveBuff[] {
  const buffs = getActiveBuffs();
  const updated = buffs
    .map(b => ({ ...b, remainingTurns: b.remainingTurns - 1 }))
    .filter(b => b.remainingTurns > 0);
  setActiveBuffs(updated);
  return updated;
}

export function clearBuffs(): void {
  localStorage.removeItem(STORAGE_KEYS.PLAYER_BUFFS);
}

// ============================================
// FULL PROGRESS EXPORT/IMPORT
// ============================================

export function exportProgress(): string {
  const progress = {
    round: getCurrentRound(),
    streak: getSurvivalStreak(),
    highestRound: getHighestRound(),
    gold: getGold(),
    inventory: getInventory(),
    bosses: getBossesDefeated(),
    achievements: getAchievements(),
    exportedAt: new Date().toISOString(),
  };
  return btoa(JSON.stringify(progress)); // Base64 encode
}

export function importProgress(data: string): boolean {
  try {
    const progress = JSON.parse(atob(data));
    
    setCurrentRound(progress.round || 1);
    setSurvivalStreak(progress.streak || 0);
    setHighestRound(progress.highestRound || 0);
    setGold(progress.gold || 0);
    if (progress.inventory) saveInventory(progress.inventory);
    if (progress.bosses) localStorage.setItem(STORAGE_KEYS.BOSSES_DEFEATED, JSON.stringify(progress.bosses));
    if (progress.achievements) localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(progress.achievements));
    
    return true;
  } catch {
    return false;
  }
}

// ============================================
// STATISTICS
// ============================================

export function getBattleStats() {
  return {
    currentRound: getCurrentRound(),
    survivalStreak: getSurvivalStreak(),
    highestRound: getHighestRound(),
    totalGold: getGold(),
    inventoryCount: getInventory().items.length,
    inventoryMax: getInventory().maxSlots,
    bossesDefeated: getBossesDefeated().filter(b => b.defeatedAt !== '').length,
    totalAchievements: getAchievements().length,
  };
}

// ============================================
// INITIALIZATION
// ============================================

export function initializeStorage(): void {
  if (typeof window === 'undefined') return;
  
  // Set default values if not present
  if (!localStorage.getItem(STORAGE_KEYS.BATTLE_ROUND)) {
    setCurrentRound(1);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BATTLE_STREAK)) {
    setSurvivalStreak(0);
  }
  if (!localStorage.getItem(STORAGE_KEYS.GOLD)) {
    setGold(0);
  }
  if (!localStorage.getItem(STORAGE_KEYS.INVENTORY)) {
    clearInventory();
  }
  if (!localStorage.getItem(STORAGE_KEYS.HIGHEST_ROUND)) {
    setHighestRound(0);
  }
}
