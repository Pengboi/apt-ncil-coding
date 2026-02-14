import SKILL_DEFS from './skills';

export interface UpgradeDef {
  id: string;
  name: string;
  description: string;
  icon?: string;
  cost: number; // in banked souls
  apply: (player: any) => void;
}

export const UPGRADE_DEFS: UpgradeDef[] = [
  {
    id: 'hp_boost',
    name: 'Max HP +30',
    icon: '❤️',
    description: 'Increase maximum HP by 30.',
    cost: 40,
    apply: (player) => {
      player.maxHp += 30;
      player.hp = Math.min(player.maxHp, player.hp + 30);
    },
  },
  {
    id: 'stamina_boost',
    name: 'Max Stamina +30',
    icon: '⚡',
    description: 'Increase maximum stamina by 30.',
    cost: 30,
    apply: (player) => {
      player.maxStamina += 30;
      player.stamina = Math.min(player.maxStamina, player.stamina + 30);
    },
  },
  {
    id: 'sword_upgrade',
    name: 'Sword Upgrade',
    icon: '🗡️',
    description: 'Light attack deals more damage.',
    cost: 50,
    apply: (player) => {
      player.attackPower = (player.attackPower || 28) + 12;
    },
  },
  {
    id: 'fireball_upgrade',
    name: 'Fireball Power',
    icon: '🔥',
    description: 'Fireball deals more damage.',
    cost: 55,
    apply: (player) => {
      // mutate the skill definition so all scenes benefit
      if (SKILL_DEFS.fireball) SKILL_DEFS.fireball.power = (SKILL_DEFS.fireball.power || 20) + 18;
    },
  },
  {
    id: 'drop_rate',
    name: 'Increased Soul Drops',
    icon: '💰',
    description: 'Enemies drop more souls (×1.75).',
    cost: 45,
    apply: (player) => {
      player.soulMultiplier = (player.soulMultiplier || 1) + 0.75;
    },
  },
  {
    id: 'cooldown_reduction',
    name: 'Cooldown Reduction',
    icon: '⏱️',
    description: 'Reduce all skill cooldowns by 20%.',
    cost: 60,
    apply: (player) => {
      for (const k in SKILL_DEFS) {
        const s = (SKILL_DEFS as any)[k];
        if (s && typeof s.cooldown === 'number') s.cooldown = Math.max(1, Math.floor(s.cooldown * 0.8));
      }
    },
  },
  {
    id: 'ui_pack',
    name: 'Hotbar Icons Pack',
    icon: '🎨',
    description: 'Improves skill icons and UI polish.',
    cost: 20,
    apply: (player) => {
      player.uiPack = true;
      if (SKILL_DEFS.fireball) SKILL_DEFS.fireball.icon = '💥';
      if (SKILL_DEFS.dash) SKILL_DEFS.dash.icon = '🌪️';
      if (SKILL_DEFS.heal) SKILL_DEFS.heal.icon = '✨';
      if (SKILL_DEFS.soulBlast) SKILL_DEFS.soulBlast.icon = '💀';
    },
  },
  {
    id: 'vampiric_blade',
    name: 'Vampiric Blade',
    icon: '🩸',
    description: 'Heal a fraction of souls gained on enemy kill.',
    cost: 38,
    apply: (player) => {
      player.vampiric = (player.vampiric || 0) + 0.25;
    },
  },
];

const STORAGE_KEY = 'souls_upgrades';

export function loadPurchasedUpgrades(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch (e) {
    return [];
  }
}

export function savePurchasedUpgrades(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function isPurchased(id: string) {
  return loadPurchasedUpgrades().includes(id);
}

export function applyPurchasedUpgrades(player: any) {
  const ids = loadPurchasedUpgrades();
  if (!player.appliedUpgrades) player.appliedUpgrades = new Set<string>();
  ids.forEach((id) => {
    if (player.appliedUpgrades.has(id)) return;
    const def = UPGRADE_DEFS.find((u) => u.id === id);
    if (def) {
      def.apply(player);
      player.appliedUpgrades.add(id);
    }
  });
}

export function purchaseUpgrade(id: string, player: any): { success: boolean; message?: string } {
  if (isPurchased(id)) return { success: false, message: 'Already purchased' };
  const def = UPGRADE_DEFS.find((u) => u.id === id);
  if (!def) return { success: false, message: 'Unknown upgrade' };
  if (player.banked < def.cost) return { success: false, message: 'Not enough banked souls' };
  // deduct and save
  player.banked -= def.cost;
  localStorage.setItem('souls_banked', String(player.banked));
  const prev = loadPurchasedUpgrades();
  const next = [...prev, id];
  savePurchasedUpgrades(next);
  // apply immediately
  if (!player.appliedUpgrades) player.appliedUpgrades = new Set<string>();
  def.apply(player);
  player.appliedUpgrades.add(id);
  return { success: true };
}

export default {
  UPGRADE_DEFS,
  loadPurchasedUpgrades,
  savePurchasedUpgrades,
  isPurchased,
  applyPurchasedUpgrades,
  purchaseUpgrade,
};
