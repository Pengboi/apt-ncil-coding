'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import CharacterCreator from './components/CharacterCreator';
import CharacterSheet from './components/CharacterSheet';
import BattleArena from './components/BattleArena';
import { Character, calculateDerivedStats, POINTS_PER_LEVEL, BattleReward } from './types';
import { getClassById } from './data/classes';
import { Monster, getRandomMonster, calculateRewards } from './data/monsters';

export default function RPGPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [showCreator, setShowCreator] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [inBattle, setInBattle] = useState(false);
  const [battleResult, setBattleResult] = useState<{ won: boolean; rewards: BattleReward } | null>(null);

  // Load characters from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('rpg-characters');
    if (saved) {
      try {
        setCharacters(JSON.parse(saved));
      } catch {
        console.error('Failed to load characters');
      }
    }
  }, []);

  // Save characters when they change
  useEffect(() => {
    localStorage.setItem('rpg-characters', JSON.stringify(characters));
  }, [characters]);

  function handleCreateCharacter(character: Character) {
    setCharacters(prev => [...prev, character]);
    setSelectedCharacter(character);
    setShowCreator(false);
  }

  function handleDeleteCharacter(id: string) {
    if (confirm('Are you sure you want to delete this character?')) {
      setCharacters(prev => prev.filter(c => c.id !== id));
      if (selectedCharacter?.id === id) {
        setSelectedCharacter(null);
      }
    }
  }

  function handleLevelUp() {
    if (!selectedCharacter || selectedCharacter.statPoints <= 0) return;
    
    setShowLevelUp(true);
  }

  function applyLevelUp(statIncreases: Record<string, number>) {
    if (!selectedCharacter) return;

    const newStats = { ...selectedCharacter.stats };
    let pointsSpent = 0;

    Object.entries(statIncreases).forEach(([stat, increase]) => {
      newStats[stat as keyof typeof newStats] += increase;
      pointsSpent += increase;
    });

    const updatedCharacter: Character = {
      ...selectedCharacter,
      stats: newStats,
      derivedStats: calculateDerivedStats(newStats, selectedCharacter.level),
      statPoints: selectedCharacter.statPoints - pointsSpent,
    };

    setCharacters(prev => 
      prev.map(c => c.id === updatedCharacter.id ? updatedCharacter : c)
    );
    setSelectedCharacter(updatedCharacter);
    setShowLevelUp(false);
  }

  function gainExperience(charId: string, amount: number) {
    setCharacters(prev => prev.map(char => {
      if (char.id !== charId) return char;

      let newExp = char.experience + amount;
      let newLevel = char.level;
      let newStatPoints = char.statPoints;
      let newSkillPoints = char.skillPoints;

      // Check for level up
      const expNeeded = char.level * 100;
      if (newExp >= expNeeded) {
        newExp -= expNeeded;
        newLevel++;
        newStatPoints += POINTS_PER_LEVEL;
        newSkillPoints += 1;
      }

      return {
        ...char,
        experience: newExp,
        level: newLevel,
        statPoints: newStatPoints,
        skillPoints: newSkillPoints,
      };
    }));
  }

  function handleStartBattle() {
    if (!selectedCharacter) return;
    setInBattle(true);
    setBattleResult(null);
  }

  function handleBattleEnd(won: boolean, rewards: BattleReward, remainingHealth: number) {
    if (!selectedCharacter) return;

    // Update character with battle results
    setCharacters(prev => prev.map(char => {
      if (char.id !== selectedCharacter.id) return char;

      let newExp = char.experience + rewards.experience;
      let newLevel = char.level;
      let newStatPoints = char.statPoints;
      let newSkillPoints = char.skillPoints;

      // Check for level up
      const expNeeded = char.level * 100;
      if (newExp >= expNeeded) {
        newExp -= expNeeded;
        newLevel++;
        newStatPoints += POINTS_PER_LEVEL;
        newSkillPoints += 1;
      }

      return {
        ...char,
        experience: newExp,
        level: newLevel,
        statPoints: newStatPoints,
        skillPoints: newSkillPoints,
        gold: char.gold + rewards.gold,
      };
    }));

    setBattleResult({ won, rewards });

    // Exit battle after delay
    setTimeout(() => {
      setInBattle(false);
    }, 2000);
  }

  function handleFlee() {
    setInBattle(false);
  }

  const selectedCharData = selectedCharacter ? characters.find(c => c.id === selectedCharacter.id) : null;

  return (
    <main className="min-h-screen bg-[var(--void)] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-50" />
      <div className="fixed inset-0 noise-overlay" />
      <div className="fixed inset-0 scanlines" />
      
      {/* Gradient orbs */}
      <div className="fixed top-1/4 -right-32 w-96 h-96 bg-[var(--mystic-magenta)] rounded-full blur-[150px] opacity-20" />
      <div className="fixed bottom-1/4 -left-32 w-96 h-96 bg-[var(--arcane-cyan)] rounded-full blur-[150px] opacity-20" />

      <section className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              RPG <span className="gradient-text">Character System</span>
            </h1>
            <p className="font-body text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Create heroes, distribute stats, battle monsters, and forge your legend.
            </p>
          </div>

          {/* Battle Result Notification */}
          {battleResult && (
            <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-xl border-2 ${
              battleResult.won 
                ? 'border-[var(--arcane-cyan)] bg-[var(--arcane-cyan)]/20' 
                : 'border-[var(--mystic-magenta)] bg-[var(--mystic-magenta)]/20'
            } animate-pulse-glow`}>
              <div className="font-display text-xl font-bold text-white text-center">
                {battleResult.won ? '⚔️ VICTORY!' : '💀 DEFEAT'}
              </div>
              {battleResult.won && (
                <div className="font-body text-sm text-center mt-1">
                  <span className="text-[var(--legendary-amber)]">+{battleResult.rewards.experience} XP</span>
                  {' • '}
                  <span className="text-[var(--arcane-cyan)]">+{battleResult.rewards.gold} Gold</span>
                </div>
              )}
            </div>
          )}

          {/* Main Content */}
          {showCreator ? (
            <CharacterCreator
              onCreate={handleCreateCharacter}
              onCancel={() => setShowCreator(false)}
            />
          ) : inBattle && selectedCharData ? (
            <BattleArena
              character={selectedCharData}
              onBattleEnd={handleBattleEnd}
              onFlee={handleFlee}
            />
          ) : characters.length === 0 ? (
            // Empty State
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--mystic-magenta)] to-[var(--ethereal-violet)] p-0.5 mb-6 animate-float">
                <div className="w-full h-full rounded-2xl bg-[var(--surface)] flex items-center justify-center text-4xl">
                  🎭
                </div>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-3">No Characters Yet</h2>
              <p className="font-body text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                Create your first hero to begin your adventure. Choose from 5 unique classes and customize your stats.
              </p>
              <button 
                onClick={() => setShowCreator(true)}
                className="btn-primary text-lg px-8 py-4">
                Create Character
              </button>
            </div>
          ) : (
            // Character Selection & Management
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Character List */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg text-white">Your Heroes</h3>
                  <button 
                    onClick={() => setShowCreator(true)}
                    className="btn-primary text-sm py-2 px-4">
                    + New
                  </button>
                </div>

                <div className="space-y-3">
                  {characters.map((char) => {
                    const charClass = getClassById(char.classId);
                    if (!charClass) return null;
                    
                    const isSelected = selectedCharacter?.id === char.id;
                    
                    return (
                      <button
                        key={char.id}
                        onClick={() => setSelectedCharacter(char)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all group
                          ${isSelected 
                            ? 'border-[var(--arcane-cyan)] bg-[var(--arcane-cyan)]/10' 
                            : 'border-[var(--edge)] hover:border-[var(--arcane-cyan)]/50 hover:bg-[var(--surface)]'}`}>
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                            style={{ backgroundColor: `${charClass.color}20` }}
                          >
                            {charClass.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-display font-bold text-white truncate">{char.name}</div>
                            <div className="font-body text-sm text-[var(--text-secondary)]">
                              Lv.{char.level} {charClass.name}
                            </div>
                          </div>
                          {char.statPoints > 0 && (
                            <div className="w-6 h-6 rounded-full bg-[var(--arcane-cyan)] flex items-center justify-center animate-pulse">
                              <span className="text-[var(--void)] text-xs font-bold">!</span>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                {selectedCharacter && (
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <h4 className="font-display text-sm text-[var(--text-muted)]">QUICK ACTIONS</h4>
                    
                    {/* Battle Button */}
                    <button 
                      onClick={handleStartBattle}
                      className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[var(--mystic-magenta)] to-[var(--ethereal-violet)] font-display font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <span>⚔️</span> FIND BATTLE
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => gainExperience(selectedCharacter.id, 50)}
                        className="py-2 px-3 rounded-lg bg-[var(--surface)] border border-[var(--edge)] font-body text-sm text-[var(--text-secondary)] hover:text-white hover:border-[var(--legendary-amber)]/50 transition-colors">
                        +50 XP
                      </button>
                      <button 
                        onClick={() => gainExperience(selectedCharacter.id, 200)}
                        className="py-2 px-3 rounded-lg bg-[var(--surface)] border border-[var(--edge)] font-body text-sm text-[var(--text-secondary)] hover:text-white hover:border-[var(--legendary-amber)]/50 transition-colors">
                        +200 XP
                      </button>
                    </div>
                    <button 
                      onClick={() => handleDeleteCharacter(selectedCharacter.id)}
                      className="w-full py-2 px-3 rounded-lg bg-[var(--mystic-magenta)]/10 border border-[var(--mystic-magenta)]/30 font-body text-sm text-[var(--mystic-magenta)] hover:bg-[var(--mystic-magenta)]/20 transition-colors"
                    >
                      Delete Character
                    </button>
                  </div>
                )}
              </div>

              {/* Character Detail */}
              <div className="lg:col-span-2">
                {selectedCharData ? (
                  <>
                    <CharacterSheet 
                      character={selectedCharData}
                      onLevelUp={selectedCharData.statPoints > 0 ? handleLevelUp : undefined}
                      isEditable={true}
                    />

                    {/* Level Up Modal */}
                    {showLevelUp && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--void)]/80 backdrop-blur-sm">
                        <LevelUpModal 
                          character={selectedCharData}
                          onConfirm={applyLevelUp}
                          onCancel={() => setShowLevelUp(false)}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center glass-card rounded-2xl p-12">
                    <div className="text-center">
                      <div className="text-6xl mb-4">👆</div>
                      <p className="font-body text-[var(--text-secondary)]">Select a character to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Monster Codex (always visible when not in battle/creator) */}
          {!showCreator && !inBattle && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-white text-center mb-8">Monster Codex</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[
                  { name: 'Bug Slime', icon: '🐛', level: 1, rarity: 'common', color: '#2ecc71' },
                  { name: 'Syntax Error', icon: '❌', level: 2, rarity: 'common', color: '#e74c3c' },
                  { name: 'Null Pointer', icon: '💀', level: 6, rarity: 'uncommon', color: '#34495e' },
                  { name: 'Deadlock', icon: '⛓️', level: 7, rarity: 'uncommon', color: '#7f8c8d' },
                  { name: 'Stack Overflow', icon: '📚', level: 11, rarity: 'rare', color: '#f1c40f' },
                  { name: 'Kernel Panic', icon: '😱', level: 16, rarity: 'epic', color: '#2980b9' },
                  { name: 'Merge Conflict', icon: '⚔️', level: 20, rarity: 'boss', color: '#c0392b' },
                  { name: 'Dark Lord Bug', icon: '👾', level: 25, rarity: 'boss', color: '#8e44ad' },
                ].map((monster) => (
                  <div key={monster.name} className="glass-card rounded-xl p-4 hover:bg-[var(--surface)]/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{monster.icon}</div>
                      <div className="flex-1">
                        <div className="font-display font-bold text-white text-sm">{monster.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-body text-xs text-[var(--text-muted)]">Lv.{monster.level}</span>
                          <span 
                            className="px-2 py-0.5 rounded text-xs font-bold"
                            style={{ 
                              backgroundColor: `${monster.color}20`,
                              color: monster.color
                            }}
                          >
                            {monster.rarity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// Level Up Modal Component
function LevelUpModal({ character, onConfirm, onCancel }: { 
  character: Character; 
  onConfirm: (stats: Record<string, number>) => void;
  onCancel: () => void;
}) {
  const [allocations, setAllocations] = useState<Record<string, number>>({
    strength: 0,
    agility: 0,
    intelligence: 0,
    vitality: 0,
    luck: 0,
  });
  const [pointsRemaining, setPointsRemaining] = useState(character.statPoints);

  function allocate(stat: string) {
    if (pointsRemaining <= 0) return;
    if (character.stats[stat as keyof typeof character.stats] + allocations[stat] >= 100) return;
    
    setAllocations(prev => ({ ...prev, [stat]: prev[stat] + 1 }));
    setPointsRemaining(prev => prev - 1);
  }

  function deallocate(stat: string) {
    if (allocations[stat] <= 0) return;
    
    setAllocations(prev => ({ ...prev, [stat]: prev[stat] - 1 }));
    setPointsRemaining(prev => prev + 1);
  }

  const stats = [
    { key: 'strength', name: 'Strength', icon: '💪' },
    { key: 'agility', name: 'Agility', icon: '⚡' },
    { key: 'intelligence', name: 'Intelligence', icon: '🧠' },
    { key: 'vitality', name: 'Vitality', icon: '❤️' },
    { key: 'luck', name: 'Luck', icon: '🍀' },
  ];

  return (
    <div className="glass-card rounded-2xl p-8 max-w-md w-full corner-accent">
      <h2 className="font-display text-2xl font-bold text-white text-center mb-2">Level Up!</h2>
      <p className="font-body text-[var(--text-secondary)] text-center mb-6">
        Allocate <span className="text-[var(--arcane-cyan)] font-bold">{pointsRemaining}</span> stat points
      </p>

      <div className="space-y-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.key} className="flex items-center gap-3">
            <span className="text-xl">{stat.icon}</span>
            <span className="font-body text-sm text-[var(--text-secondary)] w-28">{stat.name}</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => deallocate(stat.key)}
                disabled={allocations[stat.key] <= 0}
                className="w-8 h-8 rounded-lg bg-[var(--void)] border border-[var(--edge)] text-[var(--text-secondary)] hover:text-white disabled:opacity-30 font-bold"
              >
                -
              </button>
              <span className="font-display font-bold text-white w-8 text-center">
                {character.stats[stat.key as keyof typeof character.stats] + allocations[stat.key]}
              </span>
              <button 
                onClick={() => allocate(stat.key)}
                disabled={pointsRemaining <= 0}
                className="w-8 h-8 rounded-lg bg-[var(--arcane-cyan)] text-[var(--void)] hover:bg-[var(--arcane-cyan)]/80 disabled:opacity-30 font-bold"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button 
          onClick={onCancel}
          className="flex-1 btn-secondary py-3"
        >
          Cancel
        </button>
        <button 
          onClick={() => onConfirm(allocations)}
          disabled={pointsRemaining > 0}
          className="flex-1 btn-primary py-3 disabled:opacity-50"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
