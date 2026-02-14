export type CostType = 'stamina' | 'souls';

export interface SkillMeta {
  id: string;
  name: string;
  description: string;
  icon?: string;
  costType: CostType;
  cost: number; // stamina or souls
  cooldown: number; // frames
  range?: number;
  power?: number; // generic number for damage/heal
}

export const SKILL_DEFS: Record<string, SkillMeta> = {
  fireball: {
    id: 'fireball',
    name: 'Fireball',
    description: 'Launch a flaming orb that pierces and damages enemies.',
    icon: '🔥',
    costType: 'stamina',
    cost: 20,
    cooldown: 90,
    range: 800,
    power: 28,
  },
  dash: {
    id: 'dash',
    name: 'Dash',
    description: 'Quick dash that grants short invulnerability and knocks through enemies.',
    icon: '➡️',
    costType: 'stamina',
    cost: 18,
    cooldown: 80,
    power: 8,
  },
  heal: {
    id: 'heal',
    name: 'Heal',
    description: 'Instantly heal a portion of health.',
    icon: '✨',
    costType: 'stamina',
    cost: 30,
    cooldown: 240,
    power: 40,
  },
  soulBlast: {
    id: 'soulBlast',
    name: 'Soul Blast',
    description: 'Consume banked souls to deal AoE damage (costs banked souls).',
    icon: '💀',
    costType: 'souls',
    cost: 10,
    cooldown: 360,
    power: 40,
    range: 120,
  },
};

export default SKILL_DEFS;
