import { CharacterClass } from '../types';

export const CHARACTER_CLASSES: CharacterClass[] = [
  {
    id: 'warrior',
    name: 'Code Warrior',
    description: 'Masters of brute force algorithms and raw processing power. They charge into battle with unmatched strength and durability.',
    icon: '⚔️',
    color: '#ff00a0',
    baseStats: {
      strength: 12,
      agility: 6,
      intelligence: 4,
      vitality: 10,
      luck: 5,
    },
    statGrowth: {
      strength: 3,
      agility: 1,
      intelligence: 0.5,
      vitality: 2.5,
      luck: 0.5,
    },
    specialAbility: 'Berserk Mode: Double damage for 10 seconds, but take 50% more damage',
    startingEquipment: ['Iron Sword', 'Leather Armor', 'Health Potion'],
  },
  {
    id: 'rogue',
    name: 'Shadow Coder',
    description: 'Stealthy hackers who strike from the shadows. Masters of backdoors, exploits, and critical hits.',
    icon: '🗡️',
    color: '#00f5ff',
    baseStats: {
      strength: 6,
      agility: 12,
      intelligence: 6,
      vitality: 5,
      luck: 8,
    },
    statGrowth: {
      strength: 1.5,
      agility: 3,
      intelligence: 1,
      vitality: 1,
      luck: 2,
    },
    specialAbility: 'Backdoor: Guaranteed critical hit with 3x damage',
    startingEquipment: ['Dagger', 'Cloak of Shadows', 'Lockpick'],
  },
  {
    id: 'mage',
    name: 'Algorithm Mage',
    description: 'Wielders of arcane algorithms and complex data structures. They bend reality with the power of logic.',
    icon: '🔮',
    color: '#8b5cf6',
    baseStats: {
      strength: 3,
      agility: 5,
      intelligence: 14,
      vitality: 4,
      luck: 7,
    },
    statGrowth: {
      strength: 0.5,
      agility: 1,
      intelligence: 3.5,
      vitality: 1,
      luck: 1.5,
    },
    specialAbility: 'Recursion Storm: Unleash a barrage of magical projectiles',
    startingEquipment: ['Staff of Python', 'Robe of Logic', 'Mana Potion'],
  },
  {
    id: 'engineer',
    name: 'System Engineer',
    description: 'Builders of fortresses and mechanical marvels. They excel at defense, automation, and problem-solving.',
    icon: '🔧',
    color: '#ffb800',
    baseStats: {
      strength: 7,
      agility: 5,
      intelligence: 10,
      vitality: 8,
      luck: 5,
    },
    statGrowth: {
      strength: 1.5,
      agility: 1,
      intelligence: 2.5,
      vitality: 2,
      luck: 1,
    },
    specialAbility: 'Deploy Turret: Place an automated defense turret for 30 seconds',
    startingEquipment: ['Wrench Hammer', 'Reinforced Vest', 'Repair Kit'],
  },
  {
    id: 'ranger',
    name: 'Network Ranger',
    description: 'Scouts of the digital frontier. They strike from afar with precision and have unmatched awareness.',
    icon: '🏹',
    color: '#2ecc71',
    baseStats: {
      strength: 6,
      agility: 10,
      intelligence: 6,
      vitality: 6,
      luck: 7,
    },
    statGrowth: {
      strength: 1.5,
      agility: 2.5,
      intelligence: 1,
      vitality: 1.5,
      luck: 1.5,
    },
    specialAbility: 'Ping Strike: Reveal all enemies and deal damage based on distance',
    startingEquipment: ['Packet Bow', 'Scout Vest', 'Tracking Module'],
  },
];

export function getClassById(id: string): CharacterClass | undefined {
  return CHARACTER_CLASSES.find(c => c.id === id);
}

export function getRandomClass(): CharacterClass {
  return CHARACTER_CLASSES[Math.floor(Math.random() * CHARACTER_CLASSES.length)];
}
