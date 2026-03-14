'use client';

import { useState, useEffect } from 'react';
import { Character, CharacterStats, STARTING_POINTS, STAT_MIN, STAT_MAX, calculateDerivedStats } from '../types';
import { CHARACTER_CLASSES, getClassById } from '../data/classes';

interface CharacterCreatorProps {
  onCreate: (character: Character) => void;
  onCancel: () => void;
}

const STAT_NAMES: Record<keyof CharacterStats, { name: string; description: string }> = {
  strength: { name: 'Strength', description: 'Physical damage and carrying capacity' },
  agility: { name: 'Agility', description: 'Speed, dodge chance, and critical hit rate' },
  intelligence: { name: 'Intelligence', description: 'Magic damage, mana, and skill effectiveness' },
  vitality: { name: 'Vitality', description: 'Health points and stamina' },
  luck: { name: 'Luck', description: 'Drop rates, critical damage, and random events' },
};

export default function CharacterCreator({ onCreate, onCancel }: CharacterCreatorProps) {
  const [step, setStep] = useState<'class' | 'stats' | 'name'>('class');
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [name, setName] = useState('');
  const [allocatedStats, setAllocatedStats] = useState<CharacterStats>({
    strength: 0,
    agility: 0,
    intelligence: 0,
    vitality: 0,
    luck: 0,
  });
  const [pointsRemaining, setPointsRemaining] = useState(STARTING_POINTS);
  const [errors, setErrors] = useState<string[]>([]);

  const selectedClass = getClassById(selectedClassId);

  // Calculate final stats with allocation
  const finalStats: CharacterStats | null = selectedClass ? {
    strength: selectedClass.baseStats.strength + allocatedStats.strength,
    agility: selectedClass.baseStats.agility + allocatedStats.agility,
    intelligence: selectedClass.baseStats.intelligence + allocatedStats.intelligence,
    vitality: selectedClass.baseStats.vitality + allocatedStats.vitality,
    luck: selectedClass.baseStats.luck + allocatedStats.luck,
  } : null;

  // Calculate derived stats for preview
  const derivedStats = finalStats ? calculateDerivedStats(finalStats, 1) : null;

  function allocatePoint(stat: keyof CharacterStats) {
    if (pointsRemaining <= 0) return;
    if (allocatedStats[stat] >= STAT_MAX - (selectedClass?.baseStats[stat] || 0)) return;
    
    setAllocatedStats(prev => ({ ...prev, [stat]: prev[stat] + 1 }));
    setPointsRemaining(prev => prev - 1);
  }

  function deallocatePoint(stat: keyof CharacterStats) {
    if (allocatedStats[stat] <= 0) return;
    
    setAllocatedStats(prev => ({ ...prev, [stat]: prev[stat] - 1 }));
    setPointsRemaining(prev => prev + 1);
  }

  function validateStep(): boolean {
    const newErrors: string[] = [];
    
    if (step === 'class') {
      if (!selectedClassId) newErrors.push('Please select a character class');
    } else if (step === 'stats') {
      if (pointsRemaining > 0) newErrors.push('Allocate all your stat points');
    } else if (step === 'name') {
      if (!name.trim()) newErrors.push('Enter a character name');
      if (name.length < 2) newErrors.push('Name must be at least 2 characters');
      if (name.length > 20) newErrors.push('Name must be less than 20 characters');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  }

  function handleNext() {
    if (!validateStep()) return;
    
    if (step === 'class') setStep('stats');
    else if (step === 'stats') setStep('name');
    else if (step === 'name' && selectedClass && finalStats) {
      const character: Character = {
        id: Date.now().toString(),
        name: name.trim(),
        level: 1,
        experience: 0,
        classId: selectedClassId,
        stats: finalStats,
        derivedStats: calculateDerivedStats(finalStats, 1),
        statPoints: 0,
        skillPoints: 0,
        equipment: { weapon: null, armor: null, accessory: null },
        inventory: [],
        gold: 100,
        createdAt: Date.now(),
      };
      onCreate(character);
    }
  }

  function handleBack() {
    if (step === 'stats') {
      setStep('class');
      setAllocatedStats({ strength: 0, agility: 0, intelligence: 0, vitality: 0, luck: 0 });
      setPointsRemaining(STARTING_POINTS);
    } else if (step === 'name') {
      setStep('stats');
    }
    setErrors([]);
  }

  function getStatBarWidth(stat: keyof CharacterStats): string {
    if (!finalStats) return '0%';
    return `${(finalStats[stat] / STAT_MAX) * 100}%`;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {['class', 'stats', 'name'].map((s, i) => (
          <div key={s} className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold
              ${step === s ? 'bg-[var(--arcane-cyan)] text-[var(--void)]' : 
                ['stats', 'name'].includes(step) && i < ['class', 'stats', 'name'].indexOf(step) + 1
                  ? 'bg-[var(--mystic-magenta)] text-white' 
                  : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--edge)]'}`}>
              {i + 1}
            </div>
            {i < 2 && (
              <div className={`w-16 h-0.5 ${i < ['class', 'stats', 'name'].indexOf(step) ? 'bg-[var(--mystic-magenta)]' : 'bg-[var(--edge)]'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="glass-card rounded-2xl p-8 corner-accent min-h-[500px]">
        
        {/* STEP 1: Choose Class */}
        {step === 'class' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-2">Choose Your Class</h2>
              <p className="font-body text-[var(--text-secondary)]">Select a class that matches your playstyle</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CHARACTER_CLASSES.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClassId(cls.id)}
                  className={`relative p-6 rounded-xl border-2 text-left transition-all duration-300 group
                    ${selectedClassId === cls.id 
                      ? 'border-[var(--arcane-cyan)] bg-[var(--arcane-cyan)]/10' 
                      : 'border-[var(--edge)] hover:border-[var(--arcane-cyan)]/50 hover:bg-[var(--surface)]'}`}>
                  
                  <div className="text-4xl mb-3">{cls.icon}</div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">{cls.name}</h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] mb-4 line-clamp-2">{cls.description}</p>
                  
                  {/* Base Stats Preview */}
                  <div className="space-y-1">
                    {Object.entries(cls.baseStats).map(([stat, value]) => (
                      <div key={stat} className="flex items-center gap-2">
                        <span className="font-body text-xs text-[var(--text-muted)] capitalize w-20">{stat}</span>
                        <div className="flex-1 h-1.5 bg-[var(--edge)] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ width: `${(value / 20) * 100}%`, backgroundColor: cls.color }}
                          />
                        </div>
                        <span className="font-display text-xs text-white w-6 text-right">{value}</span>
                      </div>
                    ))}
                  </div>

                  {selectedClassId === cls.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--arcane-cyan)] flex items-center justify-center">
                      <span className="text-[var(--void)] text-sm">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Allocate Stats */}
        {step === 'stats' && selectedClass && finalStats && derivedStats && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-2">Distribute Stat Points</h2>
              <p className="font-body text-[var(--text-secondary)]">
                Allocate <span className="text-[var(--arcane-cyan)] font-bold">{pointsRemaining}</span> remaining points
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Stat Allocation */}
              <div className="space-y-4">
                <h3 className="font-display text-lg text-white mb-4">Base Stats</h3>
                
                {(Object.keys(STAT_NAMES) as Array<keyof CharacterStats>).map((stat) => (
                  <div key={stat} className="glass-card rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-body font-medium text-white">{STAT_NAMES[stat].name}</div>
                        <div className="font-body text-xs text-[var(--text-muted)]">{STAT_NAMES[stat].description}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => deallocatePoint(stat)}
                          disabled={allocatedStats[stat] <= 0}
                          className="w-8 h-8 rounded-lg bg-[var(--void)] border border-[var(--edge)] text-[var(--text-secondary)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed font-bold">
                          -
                        </button>
                        <div className="w-12 text-center">
                          <span className="font-display text-xl font-bold text-white">{finalStats[stat]}</span>
                          {allocatedStats[stat] > 0 && (
                            <span className="text-[var(--arcane-cyan)] text-sm ml-1">+{allocatedStats[stat]}</span>
                          )}
                        </div>
                        <button 
                          onClick={() => allocatePoint(stat)}
                          disabled={pointsRemaining <= 0 || finalStats[stat] >= STAT_MAX}
                          className="w-8 h-8 rounded-lg bg-[var(--arcane-cyan)] text-[var(--void)] hover:bg-[var(--arcane-cyan)]/80 disabled:opacity-30 disabled:cursor-not-allowed font-bold">
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Visual bar */}
                    <div className="h-2 bg-[var(--edge)] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: getStatBarWidth(stat),
                          backgroundColor: selectedClass.color,
                          opacity: 0.8
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Derived Stats Preview */}
              <div className="space-y-4">
                <h3 className="font-display text-lg text-white mb-4">Derived Stats</h3>
                
                <div className="glass-card rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <StatPreview label="Max Health" value={derivedStats.maxHealth} color="#e74c3c" icon="❤️" />
                    <StatPreview label="Max Mana" value={derivedStats.maxMana} color="#3498db" icon="💧" />
                    <StatPreview label="Attack" value={derivedStats.attack} color="#e67e22" icon="⚔️" />
                    <StatPreview label="Defense" value={derivedStats.defense} color="#95a5a6" icon="🛡️" />
                    <StatPreview label="Speed" value={derivedStats.speed} color="#2ecc71" icon="⚡" />
                    <StatPreview label="Crit Chance" value={`${derivedStats.critChance}%`} color="#f1c40f" icon="🎯" />
                    <StatPreview label="Crit Damage" value={`${derivedStats.critDamage}%`} color="#e74c3c" icon="💥" />
                    <StatPreview label="Dodge Chance" value={`${derivedStats.dodgeChance}%`} color="#9b59b6" icon="💨" />
                  </div>
                </div>

                {/* Class Info */}
                <div className="glass-card rounded-lg p-4 border-l-4" style={{ borderColor: selectedClass.color }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{selectedClass.icon}</span>
                    <span className="font-display font-bold text-white">{selectedClass.name}</span>
                  </div>
                  <p className="font-body text-sm text-[var(--text-secondary)] mb-3">{selectedClass.description}</p>
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--legendary-amber)]">✦</span>
                    <span className="font-body text-sm text-[var(--text-secondary)]">{selectedClass.specialAbility}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Reset */}
            {Object.values(allocatedStats).some(v => v > 0) && (
              <button 
                onClick={() => {
                  setAllocatedStats({ strength: 0, agility: 0, intelligence: 0, vitality: 0, luck: 0 });
                  setPointsRemaining(STARTING_POINTS);
                }}
                className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--mystic-magenta)] transition-colors">
                Reset Points
              </button>
            )}
          </div>
        )}

        {/* STEP 3: Name Character */}
        {step === 'name' && selectedClass && finalStats && derivedStats && (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-2">Name Your Hero</h2>
              <p className="font-body text-[var(--text-secondary)]">What shall the world call you?</p>
            </div>

            {/* Character Preview */}
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="text-6xl mb-3">{selectedClass.icon}</div>
              <div className="font-display text-2xl font-bold text-white mb-1">
                {name.trim() || '???'}
              </div>
              <div className="font-body text-sm text-[var(--text-secondary)] mb-4">
                Level 1 {selectedClass.name}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-[var(--void)]/50 rounded-lg p-2">
                  <span className="text-[var(--text-muted)]">HP</span>
                  <span className="ml-2 text-[#e74c3c] font-display font-bold">{derivedStats.maxHealth}</span>
                </div>
                <div className="bg-[var(--void)]/50 rounded-lg p-2">
                  <span className="text-[var(--text-muted)]">MP</span>
                  <span className="ml-2 text-[#3498db] font-display font-bold">{derivedStats.maxMana}</span>
                </div>
                <div className="bg-[var(--void)]/50 rounded-lg p-2">
                  <span className="text-[var(--text-muted)]">ATK</span>
                  <span className="ml-2 text-[#e67e22] font-display font-bold">{derivedStats.attack}</span>
                </div>
                <div className="bg-[var(--void)]/50 rounded-lg p-2">
                  <span className="text-[var(--text-muted)]">DEF</span>
                  <span className="ml-2 text-[#95a5a6] font-display font-bold">{derivedStats.defense}</span>
                </div>
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label className="font-body text-sm text-[var(--text-secondary)]">Character Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-4 py-3 bg-[var(--void)] border border-[var(--edge)] rounded-lg font-body text-white placeholder-[var(--text-muted)] focus:border-[var(--arcane-cyan)] focus:outline-none transition-colors"
                maxLength={20}
              />
              <div className="flex justify-between text-xs font-body text-[var(--text-muted)]">
                <span>2-20 characters</span>
                <span>{name.length}/20</span>
              </div>
            </div>
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-[var(--mystic-magenta)]/10 border border-[var(--mystic-magenta)]/30">
            {errors.map((error, i) => (
              <div key={i} className="font-body text-sm text-[var(--mystic-magenta)] flex items-center gap-2">
                <span>⚠</span> {error}
              </div>
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-[var(--edge)]">
          <button
            onClick={step === 'class' ? onCancel : handleBack}
            className="btn-secondary">
            {step === 'class' ? 'Cancel' : 'Back'}
          </button>
          
          <button
            onClick={handleNext}
            className="btn-primary">
            {step === 'name' ? 'Create Character' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatPreview({ label, value, color, icon }: { label: string; value: string | number; color: string; icon: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[var(--void)]/50 rounded-lg">
      <span className="text-xl">{icon}</span>
      <div>
        <div className="font-body text-xs text-[var(--text-muted)]">{label}</div>
        <div className="font-display font-bold" style={{ color }}>{value}</div>
      </div>
    </div>
  );
}
