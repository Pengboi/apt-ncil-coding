'use client';

import { useState } from 'react';

interface CharacterClass {
  name: string;
  description: string;
  icon: string;
  abilities: string[];
  level: number;
}

export default function ClassSystem() {
  const initialClasses: CharacterClass[] = [
    {
      name: 'Warrior',
      description: 'A master of weapons and physical combat.',
      icon: '⚔️',
      abilities: ['Power Strike', 'Shield Block', 'Battle Cry', 'Whirlwind Attack', 'Unbreakable Defense'],
      level: 1,
    },
    {
      name: 'Mage',
      description: 'A wielder of arcane magic and elemental spells.',
      icon: '🔮',
      abilities: ['Firebolt', 'Ice Shield', 'Lightning Chain', 'Mana Surge', 'Meteor Storm'],
      level: 1,
    },
    {
      name: 'Rogue',
      description: 'A stealthy assassin who strikes from the shadows.',
      icon: '🗡️',
      abilities: ['Backstab', 'Smoke Bomb', 'Poisoned Blade', 'Shadow Step', 'Death Mark'],
      level: 1,
    },
  ];

  const [classes, setClasses] = useState<CharacterClass[]>(initialClasses);

  const levelUpClass = (index: number) => {
    setClasses((prevClasses) =>
      prevClasses.map((charClass, i) =>
        i === index && charClass.level < charClass.abilities.length
          ? { ...charClass, level: charClass.level + 1 }
          : charClass
      )
    );
  };

  const resetClasses = () => {
    setClasses(initialClasses);
  };

  const getUnlockedAbilities = (charClass: CharacterClass) => {
    return charClass.abilities.slice(0, charClass.level);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center text-yellow-400 mb-4">Fantasy RPG Class System</h1>
        <p className="text-center text-gray-300 text-lg mb-12">
          A Dungeons & Dragons inspired leveling and ability system
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {classes.map((charClass, index) => (
            <div
              key={index}
              className="bg-slate-800 border-2 border-purple-500 rounded-lg p-6 shadow-2xl hover:border-yellow-400 transition"
            >
              <div className="text-5xl mb-4 text-center">{charClass.icon}</div>
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">{charClass.name}</h2>
              <p className="text-gray-300 mb-4">{charClass.description}</p>

              <div className="bg-slate-700 rounded p-3 mb-4">
                <p className="text-blue-300 font-bold text-lg">Level: {charClass.level}</p>
                <div className="bg-slate-600 rounded-full h-2 mt-2 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full transition-all"
                    style={{ width: `${(charClass.level / charClass.abilities.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-white mb-3">Unlocked Abilities:</h3>
                <ul className="space-y-2">
                  {getUnlockedAbilities(charClass).map((ability, abilityIndex) => (
                    <li
                      key={abilityIndex}
                      className="bg-purple-900 rounded p-2 text-green-300 flex items-center"
                    >
                      <span className="text-green-400 mr-2">✓</span>
                      {ability}
                    </li>
                  ))}
                  {charClass.level < charClass.abilities.length && (
                    <>
                      <li className="text-gray-500 italic text-sm">Locked abilities:</li>
                      {charClass.abilities.slice(charClass.level).map((ability, abilityIndex) => (
                        <li
                          key={abilityIndex + charClass.level}
                          className="bg-slate-700 rounded p-2 text-gray-500 opacity-50 flex items-center"
                        >
                          <span className="text-gray-600 mr-2">🔒</span>
                          {ability}
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div>

              <button
                onClick={() => levelUpClass(index)}
                disabled={charClass.level >= charClass.abilities.length}
                className={`w-full py-3 rounded font-bold text-lg transition ${
                  charClass.level >= charClass.abilities.length
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-yellow-400 text-black hover:text-black'
                }`}
              >
                {charClass.level >= charClass.abilities.length ? 'Max Level Reached' : 'Level Up'}
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={resetClasses}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition"
          >
            Reset All Classes
          </button>
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition inline-block"
          >
            Back to Game
          </a>
        </div>
      </div>
    </div>
  );
}
