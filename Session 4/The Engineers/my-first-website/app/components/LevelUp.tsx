'use client';

import { useState } from 'react';
import { Character } from '../page';

interface LevelUpProps {
  character: Character;
  onLevelUp: (stats: {
    health: number;
    attack: number;
    defense: number;
    mana: number;
  }) => void;
}

export default function LevelUp({ character, onLevelUp }: LevelUpProps) {
  const [selectedStats, setSelectedStats] = useState({
    health: 0,
    attack: 0,
    defense: 0,
    mana: 0,
  });

  const pointsRemaining =
    5 - (selectedStats.health + selectedStats.attack + selectedStats.defense + selectedStats.mana);

  const handleAddPoint = (stat: 'health' | 'attack' | 'defense' | 'mana') => {
    if (pointsRemaining > 0) {
      setSelectedStats({
        ...selectedStats,
        [stat]: selectedStats[stat] + 1,
      });
    }
  };

  const handleRemovePoint = (stat: 'health' | 'attack' | 'defense' | 'mana') => {
    if (selectedStats[stat] > 0) {
      setSelectedStats({
        ...selectedStats,
        [stat]: selectedStats[stat] - 1,
      });
    }
  };

  const handleConfirm = () => {
    onLevelUp(selectedStats);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-800 border-2 border-yellow-500 rounded-lg p-8">
          <h1 className="text-5xl font-bold text-yellow-400 mb-2 text-center">Level Up!</h1>
          <p className="text-white text-center mb-8 text-lg">
            You reached Level {character.level + 1}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Health */}
            <div className="bg-red-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">❤️ Health</h2>
              <p className="text-gray-300 mb-4">
                Current: {character.maxHealth} → {character.maxHealth + selectedStats.health}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRemovePoint('health')}
                  className="flex-1 bg-red-700 hover:bg-red-600 text-white py-2 rounded"
                >
                  -
                </button>
                <div className="flex-1 bg-gray-700 text-white py-2 rounded text-center font-bold">
                  {selectedStats.health}
                </div>
                <button
                  onClick={() => handleAddPoint('health')}
                  disabled={pointsRemaining === 0}
                  className="flex-1 bg-green-700 hover:bg-green-600 text-white py-2 rounded disabled:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Attack */}
            <div className="bg-orange-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">⚔️ Attack</h2>
              <p className="text-gray-300 mb-4">
                Current: {character.attack} → {character.attack + selectedStats.attack}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRemovePoint('attack')}
                  className="flex-1 bg-red-700 hover:bg-red-600 text-white py-2 rounded"
                >
                  -
                </button>
                <div className="flex-1 bg-gray-700 text-white py-2 rounded text-center font-bold">
                  {selectedStats.attack}
                </div>
                <button
                  onClick={() => handleAddPoint('attack')}
                  disabled={pointsRemaining === 0}
                  className="flex-1 bg-green-700 hover:bg-green-600 text-white py-2 rounded disabled:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Defense */}
            <div className="bg-blue-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">🛡️ Defense</h2>
              <p className="text-gray-300 mb-4">
                Current: {character.defense} → {character.defense + selectedStats.defense}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRemovePoint('defense')}
                  className="flex-1 bg-red-700 hover:bg-red-600 text-white py-2 rounded"
                >
                  -
                </button>
                <div className="flex-1 bg-gray-700 text-white py-2 rounded text-center font-bold">
                  {selectedStats.defense}
                </div>
                <button
                  onClick={() => handleAddPoint('defense')}
                  disabled={pointsRemaining === 0}
                  className="flex-1 bg-green-700 hover:bg-green-600 text-white py-2 rounded disabled:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Mana */}
            <div className="bg-purple-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">✨ Mana</h2>
              <p className="text-gray-300 mb-4">
                Current: {character.maxMana} → {character.maxMana + selectedStats.mana}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRemovePoint('mana')}
                  className="flex-1 bg-red-700 hover:bg-red-600 text-white py-2 rounded"
                >
                  -
                </button>
                <div className="flex-1 bg-gray-700 text-white py-2 rounded text-center font-bold">
                  {selectedStats.mana}
                </div>
                <button
                  onClick={() => handleAddPoint('mana')}
                  disabled={pointsRemaining === 0}
                  className="flex-1 bg-green-700 hover:bg-green-600 text-white py-2 rounded disabled:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-yellow-400 font-bold mb-6 text-lg">
            Points Remaining: {pointsRemaining}
          </p>

          <button
            onClick={handleConfirm}
            disabled={pointsRemaining !== 0}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-4 rounded-lg text-xl disabled:bg-gray-600 disabled:text-gray-400"
          >
            Continue to Next Level
          </button>
        </div>
      </div>
    </div>
  );
}
