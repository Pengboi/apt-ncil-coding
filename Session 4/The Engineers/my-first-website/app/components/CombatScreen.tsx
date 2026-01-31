'use client';

import { useState, useEffect } from 'react';
import { Character } from '../page';
import { CLASSES } from '../data/classes';

interface CombatScreenProps {
  character: Character;
  enemy: any;
  level: number;
  onVictory: (damageDealt: number, experienceGained: number) => void;
  onDefeat: () => void;
}

export default function CombatScreen({
  character,
  enemy: initialEnemy,
  level,
  onVictory,
  onDefeat,
}: CombatScreenProps) {
  // Guard against undefined props
  if (!character || !initialEnemy) {
    return null;
  }

  const [charHp, setCharHp] = useState(character.health || 100);
  const [charMana, setCharMana] = useState(character.mana || 50);
  const [enemyHp, setEnemyHp] = useState(initialEnemy.health || 50);
  const [enemyMana, setEnemyMana] = useState(50);
  const [log, setLog] = useState<string[]>(['Battle started!']);
  const [inAction, setInAction] = useState(false);
  const classData = character ? CLASSES[character.class] : null;

  // Handle keyboard input for skills
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!classData) return;

      const key = e.key.toLowerCase();
      const spellIndex = parseInt(key) - 1; // Keys 1-4 map to spells 0-3

      if (spellIndex >= 0 && spellIndex < classData.spells.length) {
        e.preventDefault();
        useSpell(classData.spells[spellIndex].name);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [charMana, charHp, inAction, classData]);

  const addLog = (message: string) => {
    setLog((prev) => [...prev, message]);
  };

  const calculateDamage = (attacker: number, defender: number, baseDamage: number) => {
    const variance = Math.random() * 0.3 - 0.15;
    const damage = Math.max(1, Math.floor(baseDamage * (1 + variance) - defender * 0.2));
    return damage;
  };

  // AI Decision making for enemies
  const enemyAIAttack = () => {
    const healthPercent = enemyHp / initialEnemy.maxHealth;
    const shouldHeal = healthPercent < 0.4;
    const shouldAttack = Math.random() > 0.3;

    // Enemy has various attack patterns
    let damage: number;
    let attackName: string;

    if (shouldHeal && shouldAttack === false) {
      attackName = 'Heal';
      damage = 0;
      addLog(`${initialEnemy.name} uses ${attackName} to recover!`);
      const healAmount = Math.floor(initialEnemy.maxHealth * 0.2);
      setEnemyHp((prev) => Math.min(prev + healAmount, initialEnemy.maxHealth));
    } else {
      // Random attack between light, medium, and heavy
      const attackType = Math.random();
      if (attackType < 0.4) {
        attackName = 'Light Attack';
        damage = calculateDamage(initialEnemy.attack, character.defense, initialEnemy.attack + 2);
      } else if (attackType < 0.7) {
        attackName = 'Power Attack';
        damage = calculateDamage(initialEnemy.attack, character.defense, initialEnemy.attack + 8);
      } else {
        attackName = 'Desperate Strike';
        damage = calculateDamage(initialEnemy.attack, character.defense, initialEnemy.attack + 5);
      }

      addLog(`${initialEnemy.name} uses ${attackName} for ${damage} damage!`);
      const newCharHp = Math.max(0, charHp - damage);
      setCharHp(newCharHp);

      if (newCharHp <= 0) {
        setInAction(false);
        addLog('You have been defeated!');
        setTimeout(onDefeat, 800);
        return;
      }
    }

    setInAction(false);
  };

  const useSpell = (spellName: string) => {
    if (inAction) return;
    if (!classData) return;
    setInAction(true);

    const spell = classData.spells.find((s) => s.name === spellName);
    if (!spell) return;

    if (charMana < spell.manaCost) {
      addLog('Not enough mana!');
      setInAction(false);
      return;
    }

    if (Math.random() * 100 > spell.accuracy) {
      addLog(`${spellName} missed!`);
      setCharMana(Math.max(0, charMana - spell.manaCost));
      setTimeout(enemyAIAttack, 1000);
      return;
    }

    const damage = calculateDamage(character.attack, initialEnemy.defense, spell.damage);

    if (spell.damage > 0) {
      addLog(`You used ${spellName} for ${damage} damage!`);
      const newEnemyHp = Math.max(0, enemyHp - damage);
      setEnemyHp(newEnemyHp);

      if (newEnemyHp <= 0) {
        setInAction(false);
        addLog(`${initialEnemy.name} defeated!`);
        setTimeout(() => onVictory(damage, initialEnemy.experience), 800);
        return;
      }
    } else {
      addLog(`You cast ${spellName}! Defense increased!`);
    }

    setCharMana(Math.max(0, charMana - spell.manaCost));
    setTimeout(enemyAIAttack, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Level {level}</h1>
          <p className="text-gray-300">{initialEnemy.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Player Stats */}
          <div className="bg-blue-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">{character.name}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 mb-1">HP</p>
                <div className="bg-gray-700 rounded h-6 overflow-hidden">
                  <div
                    className="bg-green-500 h-full transition-all"
                    style={{
                      width: `${(charHp / character.maxHealth) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-white text-sm">
                  {charHp} / {character.maxHealth}
                </p>
              </div>
              <div>
                <p className="text-gray-300 mb-1">Mana</p>
                <div className="bg-gray-700 rounded h-6 overflow-hidden">
                  <div
                    className="bg-blue-400 h-full transition-all"
                    style={{
                      width: `${(charMana / character.maxMana) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-white text-sm">
                  {charMana} / {character.maxMana}
                </p>
              </div>
              <p className="text-white">Lvl: {character.level}</p>
              <p className="text-white">Attack: {character.attack}</p>
              <p className="text-white">Defense: {character.defense}</p>
            </div>
          </div>

          {/* Enemy Stats */}
          <div className="bg-red-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">{initialEnemy.name}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 mb-1">HP</p>
                <div className="bg-gray-700 rounded h-6 overflow-hidden">
                  <div
                    className="bg-red-500 h-full transition-all"
                    style={{
                      width: `${(enemyHp / initialEnemy.maxHealth) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-white text-sm">
                  {enemyHp} / {initialEnemy.maxHealth}
                </p>
              </div>
              <div>
                <p className="text-gray-300 mb-1">Mana</p>
                <div className="bg-gray-700 rounded h-4 overflow-hidden">
                  <div
                    className="bg-purple-400 h-full transition-all"
                    style={{
                      width: `${(enemyMana / 50) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <p className="text-white">Attack: {initialEnemy.attack}</p>
              <p className="text-white">Defense: {initialEnemy.defense}</p>
              <p className="text-white">Exp Reward: {initialEnemy.experience}</p>
            </div>
          </div>
        </div>

        {/* Combat Log */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8 h-32 overflow-y-auto border border-yellow-600">
          {log.map((entry, idx) => (
            <p key={idx} className="text-yellow-300 text-sm mb-1">
              &gt; {entry}
            </p>
          ))}
        </div>

        {/* Keybind Instructions */}
        <div className="bg-blue-900 rounded-lg p-4 mb-6 border border-blue-500">
          <p className="text-white font-bold mb-2">⌨️ Keybinds:</p>
          <p className="text-gray-300 text-sm">Press <span className="font-bold text-yellow-300">1, 2, 3, 4</span> to use skills</p>
        </div>

        {/* Spell Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {classData.spells.map((spell, index) => (
            <button
              key={spell.name}
              onClick={() => useSpell(spell.name)}
              disabled={inAction || charMana < spell.manaCost || charHp <= 0}
              className={`p-4 rounded-lg font-bold text-white transition ${
                charMana < spell.manaCost || inAction
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-yellow-600 hover:bg-yellow-700'
              }`}
            >
              <p className="text-lg mb-1">[{index + 1}] {spell.name}</p>
              <p className="text-xs">
                {spell.damage > 0 ? `Dmg: ${spell.damage}` : 'Buff'} | Mana: {spell.manaCost}
              </p>
              <p className="text-xs">{spell.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
