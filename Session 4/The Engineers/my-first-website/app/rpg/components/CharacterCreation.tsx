'use client';

import { useState } from 'react';
import { ClassType } from '../types';
import { CLASSES, RARITY_INFO } from '../gameData';
import { calculateDerivedStats } from '../utils';

interface CharacterCreationProps {
  onCreate: (name: string, classType: ClassType) => void;
}

export function CharacterCreation({ onCreate }: CharacterCreationProps) {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState<ClassType>('knight');
  const [step, setStep] = useState(1);

  const classData = CLASSES.find(c => c.id === selectedClass);
  const previewStats = classData ? calculateDerivedStats(classData.startingStats) : null;

  const handleCreate = () => {
    if (name.trim()) {
      onCreate(name.trim(), selectedClass);
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Adventure RPG
          </h1>
          <p className="text-gray-400 text-center mb-8">Create your hero</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hero Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                maxLength={20}
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!name.trim()}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Choose Class
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Choose Your Class
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {CLASSES.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={`p-6 rounded-xl border-2 text-left transition-all ${
                selectedClass === cls.id
                  ? 'border-amber-500 bg-gray-800 shadow-lg shadow-amber-500/20'
                  : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-gray-600'
              }`}
            >
              <div className="text-4xl mb-3">{cls.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{cls.name}</h3>
              <p className="text-sm text-gray-400">{cls.description}</p>
            </button>
          ))}
        </div>

        {classData && previewStats && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>{classData.icon}</span>
              {classData.name} Preview
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatBox label="Max HP" value={previewStats.maxHp} color="red" />
              <StatBox label="Stamina" value={previewStats.maxStamina} color="yellow" />
              <StatBox label="Defense" value={previewStats.defense} color="blue" />
              <StatBox label="Crit %" value={`${previewStats.critChance.toFixed(1)}%`} color="purple" />
            </div>

            <h3 className="text-lg font-semibold text-gray-300 mb-3">Starting Stats</h3>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
              {Object.entries(classData.startingStats).map(([stat, value]) => (
                <div key={stat} className="bg-gray-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-500 uppercase">{stat.slice(0, 3)}</div>
                  <div className="text-xl font-bold text-amber-400">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-900 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚔️</span>
                <span className="font-bold text-white">{classData.startingWeapon.name}</span>
                <span className={`px-2 py-1 rounded text-xs ${RARITY_INFO.epic.bgColor}`}>
                  Starting Weapon
                </span>
              </div>
              <p className="text-sm text-gray-400">{classData.startingWeapon.description}</p>
              {classData.startingWeapon.ability && (
                <div className="mt-2 text-sm">
                  <span className="text-amber-400 font-semibold">{classData.startingWeapon.ability.name}:</span>
                  <span className="text-gray-400 ml-2">{classData.startingWeapon.ability.description}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => setStep(1)}
            className="flex-1 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all"
          >
            Back
          </button>
          <button
            onClick={handleCreate}
            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all"
          >
            Create Character
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: string | number; color: string }) {
  const colors: Record<string, string> = {
    red: 'bg-red-500/20 border-red-500/50 text-red-400',
    yellow: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
    blue: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
    purple: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
  };

  return (
    <div className={`rounded-lg border p-4 text-center ${colors[color]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wider opacity-80">{label}</div>
    </div>
  );
}
