'use client';

import { useState } from 'react';
import CharacterCreation from './components/CharacterCreation';
import Game from './components/Game';
import PartyBattle from './components/PartyBattle';
import ClassSystem from './components/ClassSystem';
import ExplorationGame from './components/ExplorationGame';
import FantasyRPG from './components/FantasyRPG';
import SoulslieRPG from './components/SoulslieRPG';
import TopDownRPG from './components/TopDownRPG';
import ModularRPG from './components/ModularRPG';

export interface Character {
  name: string;
  class: 'knight' | 'orc' | 'tank';
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  level: number;
  experience: number;
  mana: number;
  maxMana: number;
}

type GameMode = 'menu' | 'dungeon' | 'party' | 'creation' | 'classes' | 'explore' | 'fantasy' | 'soulslike' | 'topdown' | 'modular';

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [character, setCharacter] = useState<Character | null>(null);

  const handleCharacterCreate = (newCharacter: Character) => {
    setCharacter(newCharacter);
    setGameMode('menu');
  };

  const handleStartDungeon = () => {
    setGameMode('dungeon');
  };

  const handleStartParty = () => {
    setGameMode('party');
  };

  const handleViewClasses = () => {
    setGameMode('classes');
  };

  const handleExplore = () => {
    setGameMode('explore');
  };

  const handleViewFantasyRPG = () => {
    setGameMode('fantasy');
  };

  const handlePlaySoulslike = () => {
    setGameMode('soulslike');
  };

  const handlePlayTopDown = () => {
    setGameMode('topdown');
  };

  const handlePlayModular = () => {
    setGameMode('modular');
  };

  if (gameMode === 'creation') {
    return <CharacterCreation onCharacterCreate={handleCharacterCreate} />;
  }

  if (gameMode === 'menu') {
    if (!character) {
      return <CharacterCreation onCharacterCreate={handleCharacterCreate} />;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <h1 className="text-6xl font-bold text-white mb-4 text-center">Dungeon Crawler</h1>
          <p className="text-white text-center mb-12 text-lg">
            Welcome back, {character.name}!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <button
              onClick={handleStartDungeon}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-12 rounded-lg text-center font-bold text-2xl transition transform hover:scale-105"
            >
              <div className="mb-4 text-5xl">🏰</div>
              <div>Single Player</div>
              <p className="text-sm mt-2 font-normal">Defeat 10 levels of enemies</p>
            </button>

            <button
              onClick={handleStartParty}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-12 rounded-lg text-center font-bold text-2xl transition transform hover:scale-105"
            >
              <div className="mb-4 text-5xl">⚔️</div>
              <div>Party Battle</div>
              <p className="text-sm mt-2 font-normal">Fight with Knight, Orc & Tank</p>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={handleViewClasses}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-8 rounded-lg text-center font-bold text-xl transition transform hover:scale-105"
            >
              <div className="mb-2 text-4xl">📚</div>
              <div>Class System</div>
              <p className="text-sm mt-2 font-normal">View abilities & progression</p>
            </button>

            <button
              onClick={handleExplore}
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-8 rounded-lg text-center font-bold text-xl transition transform hover:scale-105"
            >
              <div className="mb-2 text-4xl">🗺️</div>
              <div>World Explorer</div>
              <p className="text-sm mt-2 font-normal">Zelda-like exploration</p>
            </button>
          </div>

          <button
            onClick={handlePlaySoulslike}
            className="w-full mt-6 bg-red-800 hover:bg-red-900 text-white px-8 py-4 rounded-lg text-center font-bold text-xl transition transform hover:scale-105"
          >
            <div className="mb-2 text-4xl">⚔️</div>
            <div>Soulslike Combat</div>
            <p className="text-sm mt-2 font-normal">Real-time action combat</p>
          </button>

          <button
            onClick={handlePlayTopDown}
            className="w-full mt-6 bg-green-800 hover:bg-green-900 text-white px-8 py-4 rounded-lg text-center font-bold text-xl transition transform hover:scale-105"
          >
            <div className="mb-2 text-4xl">🎯</div>
            <div>Top-Down Action</div>
            <p className="text-sm mt-2 font-normal">Zelda-style tile-based RPG</p>
          </button>

          <button
            onClick={handlePlayModular}
            className="w-full mt-6 bg-indigo-800 hover:bg-indigo-900 text-white px-8 py-4 rounded-lg text-center font-bold text-xl transition transform hover:scale-105"
          >
            <div className="mb-2 text-4xl">⚙️</div>
            <div>Modular Engine</div>
            <p className="text-sm mt-2 font-normal">Professional game architecture</p>
          </button>

          <button
            onClick={() => setGameMode('creation')}
            className="w-full mt-6 bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-lg font-bold transition"
          >
            Create New Character
          </button>
        </div>
      </div>
    );
  }

  if (gameMode === 'dungeon' && character) {
    return (
      <Game 
        character={character} 
        onBack={() => setGameMode('menu')}
      />
    );
  }

  if (gameMode === 'party' && character) {
    return (
      <PartyBattle 
        onBack={() => setGameMode('menu')}
      />
    );
  }

  if (gameMode === 'classes') {
    return <ClassSystem />;
  }

  if (gameMode === 'explore') {
    return <ExplorationGame />;
  }

  if (gameMode === 'fantasy') {
    return <FantasyRPG />;
  }

  if (gameMode === 'soulslike') {
    return <SoulslieRPG />;
  }

  if (gameMode === 'topdown') {
    return <TopDownRPG />;
  }

  if (gameMode === 'modular') {
    return <ModularRPG />;
  }

  return null;
}
