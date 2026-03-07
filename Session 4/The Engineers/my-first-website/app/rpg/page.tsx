'use client';

import { useState } from 'react';

export default function RPGPage() {
  const [character, setCharacter] = useState<string | null>(null);

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Adventure RPG</h1>
          <p className="text-gray-400 mb-6">Choose your hero</p>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setCharacter('knight')}
              className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-amber-500"
            >
              <div className="text-4xl mb-2">⚔️</div>
              <div className="text-white font-bold">Knight</div>
            </button>
            <button 
              onClick={() => setCharacter('mage')}
              className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-amber-500"
            >
              <div className="text-4xl mb-2">🔮</div>
              <div className="text-white font-bold">Mage</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-8">
      <h1 className="text-3xl font-bold text-white">Welcome, {character}!</h1>
      <p className="text-gray-400 mt-2">Full RPG features loading...</p>
      <button 
        onClick={() => setCharacter(null)}
        className="mt-4 px-4 py-2 bg-amber-600 text-white rounded"
      >
        Back
      </button>
    </div>
  );
}
