'use client';

import { useState } from 'react';

interface Monster {
  name: string;
  hp: number;
  attack: number;
}

interface Character {
  name: string;
  charClass: string;
  level: number;
  hp: number;
  attackPower: number;
}

interface Biome {
  name: string;
  monsters: () => Monster[];
}

const BIOMES: Record<number, Biome> = {
  1: {
    name: '🌲 Enchanted Forest',
    monsters: () => [
      { name: 'Slime', hp: 30, attack: 5 },
      { name: 'Goblin', hp: 40, attack: 8 },
    ],
  },
  2: {
    name: '🏜️ Sunken Ruins',
    monsters: () => [
      { name: 'Goblin Warrior', hp: 60, attack: 12 },
      { name: 'Dark Slime', hp: 50, attack: 10 },
    ],
  },
  3: {
    name: '🔥 Volcanic Depths',
    monsters: () => [
      { name: 'Fire Wizard', hp: 80, attack: 15 },
      { name: 'Lava Slime', hp: 70, attack: 14 },
    ],
  },
};

export default function FantasyRPG() {
  const [player, setPlayer] = useState<Character>({
    name: 'Hero',
    charClass: 'Warrior',
    level: 1,
    hp: 100,
    attackPower: 10,
  });

  const [currentMonsters, setCurrentMonsters] = useState<Monster[]>([]);

  const handleLevelUp = () => {
    setPlayer((prev) => ({
      ...prev,
      level: prev.level + 1,
      hp: prev.hp + 20,
      attackPower: prev.attackPower + 5,
    }));
    setCurrentMonsters([]);
  };

  const handleSpawnMonsters = () => {
    const biome = BIOMES[player.level] || BIOMES[3];
    const monsters = biome.monsters();
    setCurrentMonsters(monsters);
  };

  const handleAttackMonster = (index: number) => {
    setCurrentMonsters((prev) => {
      const updated = [...prev];
      updated[index].hp -= player.attackPower;

      if (updated[index].hp <= 0) {
        updated.splice(index, 1);
      }

      return updated;
    });
  };

  const currentBiome = BIOMES[player.level] || BIOMES[3];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold text-yellow-400 mb-8 text-center">Fantasy RPG System</h1>

        {/* Character Panel */}
        <div className="bg-slate-800 border-2 border-blue-500 rounded-lg p-6 mb-6">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Character</h2>
          <div className="space-y-2 text-white mb-6">
            <p>
              <strong>Name:</strong> {player.name}
            </p>
            <p>
              <strong>Class:</strong> {player.charClass}
            </p>
            <p>
              <strong>Level:</strong> {player.level}
            </p>
            <p className="text-blue-300">
              <strong>HP:</strong> {player.hp}
            </p>
            <p>
              <strong>Attack:</strong> {player.attackPower}
            </p>
          </div>
          <button
            onClick={handleLevelUp}
            className="w-full bg-orange-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition"
          >
            Level Up
          </button>
        </div>

        {/* Biome Panel */}
        <div className="bg-slate-800 border-2 border-green-500 rounded-lg p-6 mb-6">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Current Biome</h2>
          <p className="text-white text-xl mb-6">{currentBiome.name}</p>
          <button
            onClick={handleSpawnMonsters}
            className="w-full bg-orange-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition"
          >
            Explore
          </button>
        </div>

        {/* Monsters Panel */}
        <div className="bg-slate-800 border-2 border-red-500 rounded-lg p-6 mb-6">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Monsters</h2>

          {currentMonsters.length === 0 ? (
            <p className="text-gray-300">No enemies present.</p>
          ) : (
            <div className="space-y-3">
              {currentMonsters.map((monster, index) => (
                <div key={index} className="bg-slate-700 p-4 rounded border border-slate-600">
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-white">{monster.name}</strong>
                    <span className="text-blue-300 font-bold">HP: {monster.hp}</span>
                  </div>
                  <button
                    onClick={() => handleAttackMonster(index)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                  >
                    Attack
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <a
          href="/"
          className="block text-center bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition"
        >
          Back to Main Menu
        </a>
      </div>
    </div>
  );
}
