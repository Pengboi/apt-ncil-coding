'use client';

import { Character } from '../page';
import { CLASSES } from '../data/classes';

interface CharacterCreationProps {
  onCharacterCreate: (character: Character) => void;
}

export default function CharacterCreation({
  onCharacterCreate,
}: CharacterCreationProps) {
  const handleClassSelect = (classType: 'knight' | 'orc' | 'tank') => {
    const selectedClass = CLASSES[classType];
    const character: Character = {
      name: `${selectedClass.displayName}`,
      class: classType,
      health: selectedClass.baseHealth,
      maxHealth: selectedClass.baseHealth,
      attack: selectedClass.baseAttack,
      defense: selectedClass.baseDefense,
      level: 1,
      experience: 0,
      mana: selectedClass.baseMana,
      maxMana: selectedClass.baseMana,
    };
    onCharacterCreate(character);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-6xl font-bold text-white mb-4 text-center">
          Dungeon Crawler
        </h1>
        <p className="text-white text-center mb-12 text-lg">
          Choose your class and embark on an epic adventure
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(CLASSES).map(([key, classData]) => (
            <button
              key={key}
              onClick={() => handleClassSelect(key as 'knight' | 'orc' | 'tank')}
              className="bg-gray-800 border-2 border-yellow-600 rounded-lg p-6 hover:bg-yellow-600 hover:text-black transition transform hover:scale-105 text-white hover:text-black"
            >
              <h2 className="text-2xl font-bold mb-4">{classData.displayName}</h2>
              <p className="mb-4 text-sm">{classData.description}</p>
              <div className="space-y-2 text-sm">
                <p>❤️ Health: {classData.baseHealth}</p>
                <p>⚔️ Attack: {classData.baseAttack}</p>
                <p>🛡️ Defense: {classData.baseDefense}</p>
                <p>✨ Mana: {classData.baseMana}</p>
              </div>
              <div className="mt-6 space-y-1">
                <p className="font-bold text-xs uppercase">Abilities:</p>
                {classData.spells.map((spell) => (
                  <p key={spell.name} className="text-xs">
                    • {spell.name}
                  </p>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
