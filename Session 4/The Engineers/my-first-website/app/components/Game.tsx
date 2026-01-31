'use client';

import { useState, useEffect } from 'react';
import { Character } from '../page';
import { LEVELS } from '../data/levels';
import { CLASSES } from '../data/classes';
import CombatScreen from './CombatScreen';
import LevelUp from './LevelUp';

interface GameState {
  currentLevel: number;
  currentEnemy: any;
  inCombat: boolean;
  levelUp: boolean;
}

interface GameProps {
  character: Character;
  onBack?: () => void;
}

export default function Game({ initialCharacter, onBack }: GameProps) {
  const [character, setCharacter] = useState(initialCharacter);
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    currentEnemy: null,
    inCombat: false,
    levelUp: false,
  });
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    startLevel();
  }, []);

  const startLevel = () => {
    const level = LEVELS[gameState.currentLevel - 1];
    if (level && level.enemies && level.enemies.length > 0) {
      const enemy = { ...level.enemies[0] };
      setGameState((prev) => ({
        ...prev,
        currentEnemy: enemy,
        inCombat: true,
      }));
    }
  };

  const handleVictory = (damageDealt: number, experienceGained: number) => {
    const newExp = character.experience + experienceGained;
    const expNeeded = character.level * 100;
    let newChar = { ...character, experience: newExp };

    if (newExp >= expNeeded) {
      setGameState({ ...gameState, inCombat: false, levelUp: true });
    } else if (gameState.currentLevel === 10) {
      setVictory(true);
    } else {
      setGameState({ ...gameState, currentLevel: gameState.currentLevel + 1, inCombat: false });
      setCharacter(newChar);
    }
  };

  const handleDefeat = () => {
    setGameOver(true);
  };

  const handleLevelUp = (stats: { health: number; attack: number; defense: number; mana: number }) => {
    const updatedChar: Character = {
      ...character,
      level: character.level + 1,
      maxHealth: character.maxHealth + stats.health,
      health: character.maxHealth + stats.health,
      attack: character.attack + stats.attack,
      defense: character.defense + stats.defense,
      maxMana: character.maxMana + stats.mana,
      mana: character.maxMana + stats.mana,
      experience: 0,
    };

    setCharacter(updatedChar);

    if (gameState.currentLevel === 10) {
      setVictory(true);
    } else {
      setGameState({
        ...gameState,
        currentLevel: gameState.currentLevel + 1,
        levelUp: false,
      });
    }
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-black p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-500 mb-4">Game Over</h1>
          <p className="text-white text-2xl mb-6">
            You were defeated at Level {gameState.currentLevel}
          </p>
          <button
            onClick={() => onBack?.()}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-xl"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  if (victory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-600 to-purple-900 p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-yellow-300 mb-4">Victory!</h1>
          <p className="text-white text-2xl mb-6">
            You defeated the Ancient Dragon and conquered the dungeon!
          </p>
          <p className="text-white text-xl mb-6">
            Final Level: {character.level} | Final Experience: {character.experience}
          </p>
          <button
            onClick={() => onBack?.()}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg text-xl font-bold"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  if (gameState.levelUp) {
    return (
      <LevelUp
        character={character}
        onLevelUp={handleLevelUp}
      />
    );
  }

  if (gameState.inCombat && gameState.currentEnemy) {
    return (
      <CombatScreen
        character={character}
        enemy={gameState.currentEnemy}
        level={gameState.currentLevel}
        onVictory={handleVictory}
        onDefeat={handleDefeat}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-8 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white">Loading...</h1>
    </div>
  );
}
