export interface Spell {
  name: string;
  damage: number;
  manaCost: number;
  accuracy: number;
  description: string;
}

export interface ClassType {
  name: 'knight' | 'orc' | 'tank';
  displayName: string;
  description: string;
  baseHealth: number;
  baseAttack: number;
  baseDefense: number;
  baseMana: number;
  spells: Spell[];
}

export const CLASSES: { [key: string]: ClassType } = {
  knight: {
    name: 'knight',
    displayName: 'Knight',
    description: 'A balanced warrior with strong attack and defense',
    baseHealth: 100,
    baseAttack: 15,
    baseDefense: 12,
    baseMana: 50,
    spells: [
      {
        name: 'Slash',
        damage: 20,
        manaCost: 0,
        accuracy: 95,
        description: 'Basic sword attack',
      },
      {
        name: 'Holy Strike',
        damage: 40,
        manaCost: 30,
        accuracy: 85,
        description: 'Powerful blessed attack',
      },
      {
        name: 'Shield Bash',
        damage: 15,
        manaCost: 20,
        accuracy: 90,
        description: 'Stun and damage enemy',
      },
      {
        name: 'Divine Protection',
        damage: 0,
        manaCost: 25,
        accuracy: 100,
        description: 'Reduce all damage for next turn',
      },
    ],
  },
  orc: {
    name: 'orc',
    displayName: 'Orc',
    description: 'A savage warrior with high attack but lower defense',
    baseHealth: 95,
    baseAttack: 18,
    baseDefense: 8,
    baseMana: 40,
    spells: [
      {
        name: 'Smash',
        damage: 25,
        manaCost: 0,
        accuracy: 90,
        description: 'Brutal melee attack',
      },
      {
        name: 'Rage',
        damage: 50,
        manaCost: 40,
        accuracy: 80,
        description: 'Devastating power attack',
      },
      {
        name: 'Battle Cry',
        damage: 5,
        manaCost: 20,
        accuracy: 100,
        description: 'Boost next attack power',
      },
      {
        name: 'Bloodlust',
        damage: 30,
        manaCost: 35,
        accuracy: 85,
        description: 'Attack twice in one turn',
      },
    ],
  },
  tank: {
    name: 'tank',
    displayName: 'Tank',
    description: 'A defensive warrior with high health and defense',
    baseHealth: 130,
    baseAttack: 12,
    baseDefense: 16,
    baseMana: 45,
    spells: [
      {
        name: 'Punch',
        damage: 15,
        manaCost: 0,
        accuracy: 95,
        description: 'Basic punch attack',
      },
      {
        name: 'Iron Skin',
        damage: 0,
        manaCost: 30,
        accuracy: 100,
        description: 'Reduce damage taken significantly',
      },
      {
        name: 'Thorns',
        damage: 10,
        manaCost: 25,
        accuracy: 100,
        description: 'Reflect damage back to attacker',
      },
      {
        name: 'Last Stand',
        damage: 0,
        manaCost: 50,
        accuracy: 100,
        description: 'Survive fatal damage once',
      },
    ],
  },
};
