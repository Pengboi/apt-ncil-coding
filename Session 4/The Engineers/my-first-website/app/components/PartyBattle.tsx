'use client';

import { useState, useEffect } from 'react';
import { CLASSES } from '../data/classes';

interface PartyCharacter {
  name: string;
  class: 'knight' | 'orc' | 'tank';
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  mana: number;
  maxMana: number;
}

interface GoblinEnemy {
  id: number;
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
}

interface PartyBattleProps {
  onBack: () => void;
}

export default function PartyBattle({ onBack }: PartyBattleProps) {
  // Create the 3 party members
  const initialParty: PartyCharacter[] = [
    {
      name: 'Sir Galahad',
      class: 'knight',
      health: 100,
      maxHealth: 100,
      attack: 15,
      defense: 12,
      mana: 50,
      maxMana: 50,
    },
    {
      name: 'Gruk the Fierce',
      class: 'orc',
      health: 95,
      maxHealth: 95,
      attack: 18,
      defense: 8,
      mana: 40,
      maxMana: 40,
    },
    {
      name: 'Ironhide',
      class: 'tank',
      health: 130,
      maxHealth: 130,
      attack: 12,
      defense: 16,
      mana: 45,
      maxMana: 45,
    },
  ];

  const createGoblins = () => [
    { id: 1, name: 'Goblin Warrior', health: 30, maxHealth: 30, attack: 5, defense: 2 },
    { id: 2, name: 'Goblin Archer', health: 25, maxHealth: 25, attack: 6, defense: 1 },
    { id: 3, name: 'Goblin Shaman', health: 20, maxHealth: 20, attack: 4, defense: 1 },
  ];

  const [party, setParty] = useState<PartyCharacter[]>(initialParty);
  const [goblins, setGoblins] = useState<GoblinEnemy[]>(createGoblins());
  const [log, setLog] = useState<string[]>(['Battle Started! Party vs Goblins!']);
  const [inAction, setInAction] = useState(false);
  const [round, setRound] = useState(1);
  const [partyVictory, setPartyVictory] = useState(false);
  const [partyDefeated, setPartyDefeated] = useState(false);
  const [selectedGoblin, setSelectedGoblin] = useState<number | null>(null);

  // Handle keyboard input for character skills
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (inAction || partyVictory || partyDefeated || !selectedGoblin) return;

      const key = e.key.toLowerCase();
      const partyMemberIndex = parseInt(key) - 1; // Keys 1-3 for party members

      if (partyMemberIndex >= 0 && partyMemberIndex < 3) {
        e.preventDefault();
        handleAttack(partyMemberIndex, selectedGoblin);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inAction, selectedGoblin, party, goblins, partyVictory, partyDefeated]);

  const addLog = (message: string) => {
    setLog((prev) => [...prev, message]);
  };

  const calculateDamage = (attacker: number, defender: number, baseDamage: number) => {
    const variance = Math.random() * 0.3 - 0.15;
    const damage = Math.max(1, Math.floor(baseDamage * (1 + variance) - defender * 0.2));
    return damage;
  };

  const handleAttack = (partyMemberIndex: number, goblinId: number) => {
    if (inAction) return;
    setInAction(true);

    const attacker = party[partyMemberIndex];
    const goblin = goblins.find((g) => g.id === goblinId);

    if (!goblin) return;

    const damage = calculateDamage(attacker.attack, goblin.defense, attacker.attack + 5);
    addLog(`${attacker.name} attacks ${goblin.name} for ${damage} damage!`);

    const updatedGoblins = goblins.map((g) =>
      g.id === goblinId ? { ...g, health: Math.max(0, g.health - damage) } : g
    );
    setGoblins(updatedGoblins);

    if (updatedGoblins.every((g) => g.health <= 0)) {
      addLog('Party Victory! All goblins defeated!');
      setPartyVictory(true);
      setInAction(false);
      return;
    }

    setTimeout(goblinCounterAttack, 1500);
  };

  const goblinCounterAttack = () => {
    const aliveGoblins = goblins.filter((g) => g.health > 0);
    const aliveParty = party.filter((p) => p.health > 0);

    if (aliveGoblins.length === 0) {
      setPartyVictory(true);
      setInAction(false);
      return;
    }

    if (aliveParty.length === 0) {
      setPartyDefeated(true);
      setInAction(false);
      return;
    }

    let updatedParty = [...party];

    aliveGoblins.forEach((goblin) => {
      const targetIndex = Math.floor(Math.random() * aliveParty.length);
      const target = aliveParty[targetIndex];
      const damage = calculateDamage(goblin.attack, target.defense, goblin.attack + 3);

      addLog(`${goblin.name} attacks ${target.name} for ${damage} damage!`);

      updatedParty = updatedParty.map((p) =>
        p.name === target.name ? { ...p, health: Math.max(0, p.health - damage) } : p
      );
    });

    setParty(updatedParty);

    if (updatedParty.every((p) => p.health <= 0)) {
      addLog('Party Defeated! All members fell in battle!');
      setPartyDefeated(true);
    }

    setRound((prev) => prev + 1);
    setInAction(false);
  };

  if (partyVictory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-900 p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-green-300 mb-4">Party Victory!</h1>
          <p className="text-white text-2xl mb-6">The party defeated all goblins!</p>
          <div className="bg-gray-800 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Party Status:</h2>
            <div className="space-y-2">
              {party.map((member) => (
                <p key={member.name} className="text-white">
                  {member.name}: {member.health}/{member.maxHealth} HP
                </p>
              ))}
            </div>
          </div>
          <button
            onClick={onBack}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-bold"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  if (partyDefeated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-black p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-500 mb-4">Party Defeated!</h1>
          <p className="text-white text-2xl mb-6">The party was overwhelmed by the goblins!</p>
          <button
            onClick={onBack}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-xl font-bold"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Party Battle</h1>
          <p className="text-gray-300 text-lg">Round {round}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Party Members */}
          <div className="bg-blue-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Your Party</h2>
            <div className="space-y-4">
              {party.map((member, idx) => {
                const classData = CLASSES[member.class];
                return (
                  <div key={idx} className="bg-gray-800 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-white">{member.name}</h3>
                      <span className="text-sm text-gray-400">{classData.displayName}</span>
                    </div>
                    <div className="bg-gray-700 rounded h-4 mb-1 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          member.health > member.maxHealth * 0.5 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(member.health / member.maxHealth) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-white text-sm">
                      {member.health} / {member.maxHealth} HP
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Goblin Enemies */}
          <div className="bg-red-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Goblins</h2>
            <div className="space-y-4">
              {goblins.map((goblin) => (
                <div
                  key={goblin.id}
                  onClick={() => setSelectedGoblin(goblin.id)}
                  className={`bg-gray-800 rounded p-4 cursor-pointer transition ${
                    selectedGoblin === goblin.id ? 'border-4 border-yellow-400' : 'border-2 border-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-white">{goblin.name}</h3>
                    <span className="text-sm text-gray-400">#{goblin.id}</span>
                  </div>
                  <div className="bg-gray-700 rounded h-4 mb-1 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        goblin.health > 0 ? 'bg-orange-500' : 'bg-gray-600'
                      }`}
                      style={{ width: `${(goblin.health / goblin.maxHealth) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-white text-sm">
                    {goblin.health} / {goblin.maxHealth} HP
                  </p>
                  {goblin.health > 0 && selectedGoblin === goblin.id && (
                    <div className="mt-2 grid grid-cols-3 gap-1">
                      {party.map((member, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAttack(idx, goblin.id)}
                          disabled={inAction || member.health <= 0}
                          className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white py-1 rounded disabled:bg-gray-600"
                        >
                          [{idx + 1}] {member.class}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Battle Log */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6 border-2 border-yellow-600">
          <h2 className="text-xl font-bold text-yellow-400 mb-2">Round {round}</h2>
          <div className="h-32 overflow-y-auto">
            {log.map((entry, idx) => (
              <p key={idx} className="text-gray-300 text-sm mb-1">
                &gt; {entry}
              </p>
            ))}
          </div>
        </div>

        {/* Keybind Instructions */}
        <div className="bg-blue-900 rounded-lg p-4 border-2 border-blue-500">
          <p className="text-white font-bold mb-2">⌨️ Controls:</p>
          <p className="text-gray-300 text-sm mb-2">Click a goblin to select target • Press <span className="font-bold text-yellow-300">1, 2, 3</span> for party members</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 h-40 overflow-y-auto border border-yellow-600 mb-4">
          {log.map((entry, idx) => (
            <p key={idx} className="text-yellow-300 text-sm mb-1">
              &gt; {entry}
            </p>
          ))}
        </div>

        <button
          onClick={onBack}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold"
        >
          Exit Battle
        </button>
      </div>
    </div>
  );
}
