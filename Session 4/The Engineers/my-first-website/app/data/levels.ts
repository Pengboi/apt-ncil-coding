export interface Enemy {
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  experience: number;
  spells: string[];
}

export interface Level {
  levelNumber: number;
  name: string;
  description: string;
  enemies: Enemy[];
  isBoss: boolean;
}

export const LEVELS: Level[] = [
  {
    levelNumber: 1,
    name: 'Goblin Caves',
    description: 'Face the weakest enemies in the dungeon',
    isBoss: false,
    enemies: [
      {
        name: 'Goblin',
        health: 30,
        maxHealth: 30,
        attack: 5,
        defense: 2,
        experience: 50,
        spells: ['Stab', 'Poison'],
      },
    ],
  },
  {
    levelNumber: 2,
    name: 'Skeleton Hall',
    description: 'Undead warriors guard these halls',
    isBoss: false,
    enemies: [
      {
        name: 'Skeleton',
        health: 45,
        maxHealth: 45,
        attack: 8,
        defense: 4,
        experience: 100,
        spells: ['Bone Strike', 'Curse'],
      },
    ],
  },
  {
    levelNumber: 3,
    name: 'Wolf Den',
    description: 'Savage beasts protect their territory',
    isBoss: false,
    enemies: [
      {
        name: 'Shadow Wolf',
        health: 55,
        maxHealth: 55,
        attack: 10,
        defense: 3,
        experience: 150,
        spells: ['Bite', 'Howl'],
      },
    ],
  },
  {
    levelNumber: 4,
    name: 'Demon Tower',
    description: 'Demonic forces grow stronger here',
    isBoss: false,
    enemies: [
      {
        name: 'Lesser Demon',
        health: 70,
        maxHealth: 70,
        attack: 12,
        defense: 6,
        experience: 200,
        spells: ['Fireball', 'Dark Touch', 'Summon'],
      },
    ],
  },
  {
    levelNumber: 5,
    name: 'Fire Cavern',
    description: 'The heat intensifies as you descend',
    isBoss: false,
    enemies: [
      {
        name: 'Fire Elemental',
        health: 85,
        maxHealth: 85,
        attack: 13,
        defense: 7,
        experience: 250,
        spells: ['Inferno', 'Burn', 'Melt'],
      },
    ],
  },
  {
    levelNumber: 6,
    name: 'Fallen Temple',
    description: 'Ancient corrupted sanctuaries',
    isBoss: false,
    enemies: [
      {
        name: 'Corrupted Priest',
        health: 100,
        maxHealth: 100,
        attack: 14,
        defense: 8,
        experience: 300,
        spells: ['Dark Ritual', 'Smite', 'Curse'],
      },
    ],
  },
  {
    levelNumber: 7,
    name: 'Abyssal Depths',
    description: 'Strange creatures from the void',
    isBoss: false,
    enemies: [
      {
        name: 'Void Entity',
        health: 115,
        maxHealth: 115,
        attack: 15,
        defense: 9,
        experience: 350,
        spells: ['Void Tear', 'Entropy', 'Consume'],
      },
    ],
  },
  {
    levelNumber: 8,
    name: 'Lich\'s Chamber',
    description: 'The undead sorcerer\'s domain',
    isBoss: false,
    enemies: [
      {
        name: 'Lich',
        health: 130,
        maxHealth: 130,
        attack: 16,
        defense: 10,
        experience: 400,
        spells: ['Death Bolt', 'Soul Drain', 'Undeath'],
      },
    ],
  },
  {
    levelNumber: 9,
    name: 'Dragon\'s Threshold',
    description: 'The final chamber before the ultimate battle',
    isBoss: false,
    enemies: [
      {
        name: 'Dragon Knight',
        health: 150,
        maxHealth: 150,
        attack: 17,
        defense: 11,
        experience: 450,
        spells: ['Dragon Strike', 'Fire Breath', 'Roar'],
      },
    ],
  },
  {
    levelNumber: 10,
    name: 'The Dragon\'s Lair',
    description: 'Face the ultimate evil - the Ancient Dragon',
    isBoss: true,
    enemies: [
      {
        name: 'Ancient Dragon',
        health: 250,
        maxHealth: 250,
        attack: 20,
        defense: 13,
        experience: 1000,
        spells: ['Flame Breath', 'Tail Sweep', 'Dragon Roar', 'Meteor Strike'],
      },
    ],
  },
];
