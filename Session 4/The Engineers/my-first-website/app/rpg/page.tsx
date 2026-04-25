'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import CharacterCreator from './components/CharacterCreator';
import CharacterSheet from './components/CharacterSheet';
import BattleArena from './components/BattleArena';
import { Character, calculateDerivedStats, POINTS_PER_LEVEL, BattleReward, Item } from './types';
import { getClassById } from './data/classes';
import { Monster, calculateRewards } from './data/monsters';
import { getItemById } from './data/items';
import { getInventory, addItemToInventory, removeItemFromInventory, getGold, getCurrentRound, getSurvivalStreak } from './data/storage';

export default function RPGPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [showCreator, setShowCreator] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [inBattle, setInBattle] = useState(false);
  const [battleResult, setBattleResult] = useState<{ won: boolean; rewards: BattleReward } | null>(null);

  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Storage-managed state (rounds, inventory, gold)
  const [currentRound, setCurrentRound] = useState(1);
  const [survivalStreak, setSurvivalStreak] = useState(0);
  const [storageGold, setStorageGold] = useState(0);
  const [storageInventory, setStorageInventory] = useState<{ itemId: string; quantity: number }[]>([]);

  // Load data from storage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem('rpg-characters');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCharacters(parsed);
        }
      }

      // Load storage-managed data
      setCurrentRound(getCurrentRound());
      setSurvivalStreak(getSurvivalStreak());
      setStorageGold(getGold());
      setStorageInventory(getInventory().items);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save characters when they change
  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('rpg-characters', JSON.stringify(characters));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save characters:', error);
      alert('Failed to save game! Local storage may be full or disabled.');
    }
  }, [characters, isLoaded]);

  // Manual save function
  function handleManualSave() {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('rpg-characters', JSON.stringify(characters));
      setLastSaved(new Date());
      alert('Game saved successfully! ✅');
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save game! Local storage may be full or disabled.');
    }
  }

  // Export save to file
  function handleExportSave() {
    const dataStr = JSON.stringify(characters, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rpg-save-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Import save from file
  function handleImportSave(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (Array.isArray(data)) {
          if (confirm(`Import ${data.length} character(s)? This will REPLACE your current save!`)) {
            setCharacters(data);
            setSelectedCharacter(null);
            alert('Save imported successfully! ✅');
          }
        } else {
          alert('Invalid save file format!');
        }
      } catch {
        alert('Failed to read save file!');
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  }

  // Clear all saves
  function handleClearSaves() {
    if (confirm('⚠️ WARNING: This will DELETE ALL your characters! Are you sure?')) {
      if (confirm('Really sure? This cannot be undone!')) {
        setCharacters([]);
        setSelectedCharacter(null);
        localStorage.removeItem('rpg-characters');
        alert('All saves cleared!');
      }
    }
  }

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
    if (!selectedCharacter || selectedCharacter.statPoints <= 0) {
      console.log('Cannot level up: no stat points available');
      return;
    }
    
    console.log('Opening level up modal for', selectedCharacter.name);
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

    // Update character with battle results (XP/level only - inventory/gold handled by storage system)
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
      };
    }));

    setBattleResult({ won, rewards });

    // Exit battle after delay and refresh storage data
    setTimeout(() => {
      setInBattle(false);
      refreshStorageData(); // Refresh round, streak, gold, inventory from storage
    }, 2000);
  }

  function handleFlee() {
    setInBattle(false);
    // Refresh storage data after fleeing
    refreshStorageData();
  }

  // Refresh storage-managed data (round, streak, gold, inventory)
  function refreshStorageData() {
    setCurrentRound(getCurrentRound());
    setSurvivalStreak(getSurvivalStreak());
    setStorageGold(getGold());
    setStorageInventory(getInventory().items);
  }

  // Dismiss battle result notification
  function dismissBattleResult() {
    setBattleResult(null);
  }

  // Inventory management functions
  function handleUseItem(item: Item) {
    if (!selectedCharacter) return;

    setCharacters(prev => prev.map(char => {
      if (char.id !== selectedCharacter.id) return char;

      // Remove item from inventory
      const itemIndex = char.inventory.findIndex(i => i.id === item.id);
      if (itemIndex === -1) return char;

      const newInventory = [...char.inventory];
      newInventory.splice(itemIndex, 1);

      // Apply item effects
      let newStats = { ...char.stats };
      let newGold = char.gold;

      if (item.effect?.startsWith('heal:')) {
        // Healing is handled in battle, not here
        // But we could add out-of-combat healing
      } else if (item.effect?.startsWith('permanent:')) {
        // Permanent stat boosts
        const parts = item.effect.split(':');
        if (parts.length === 3) {
          const stat = parts[1] as keyof typeof newStats;
          const value = parseInt(parts[2]);
          if (newStats[stat] !== undefined) {
            newStats[stat] += value;
          }
        }
      }

      return {
        ...char,
        stats: newStats,
        inventory: newInventory,
        derivedStats: calculateDerivedStats(newStats, char.level),
      };
    }));
  }

  function handleEquipItem(item: Item) {
    if (!selectedCharacter) return;

    setCharacters(prev => prev.map(char => {
      if (char.id !== selectedCharacter.id) return char;

      // Determine equipment slot
      const slot = item.type as 'weapon' | 'armor' | 'accessory';
      if (!['weapon', 'armor', 'accessory'].includes(slot)) return char;

      // Remove item from inventory
      const itemIndex = char.inventory.findIndex(i => i.id === item.id);
      if (itemIndex === -1) return char;

      const newInventory = [...char.inventory];
      newInventory.splice(itemIndex, 1);

      // If something is already equipped, unequip it first (add back to inventory)
      const currentEquipped = char.equipment[slot];
      if (currentEquipped) {
        newInventory.push(currentEquipped);
      }

      // Equip the new item
      const newEquipment = {
        ...char.equipment,
        [slot]: item,
      };

      // Recalculate derived stats with equipment bonuses
      const newDerivedStats = calculateDerivedStatsWithEquipment(char.stats, char.level, newEquipment);

      return {
        ...char,
        inventory: newInventory,
        equipment: newEquipment,
        derivedStats: newDerivedStats,
      };
    }));
  }

  function handleUnequipItem(slot: 'weapon' | 'armor' | 'accessory') {
    if (!selectedCharacter) return;

    setCharacters(prev => prev.map(char => {
      if (char.id !== selectedCharacter.id) return char;

      const item = char.equipment[slot];
      if (!item) return char;

      // Add item back to inventory
      const newInventory = [...char.inventory, item];

      // Remove from equipment
      const newEquipment = {
        ...char.equipment,
        [slot]: null,
      };

      // Recalculate derived stats
      const newDerivedStats = calculateDerivedStatsWithEquipment(char.stats, char.level, newEquipment);

      return {
        ...char,
        inventory: newInventory,
        equipment: newEquipment,
        derivedStats: newDerivedStats,
      };
    }));
  }

  function handleSellItem(item: Item) {
    if (!selectedCharacter) return;

    setCharacters(prev => prev.map(char => {
      if (char.id !== selectedCharacter.id) return char;

      // Remove item from inventory
      const itemIndex = char.inventory.findIndex(i => i.id === item.id);
      if (itemIndex === -1) return char;

      const newInventory = [...char.inventory];
      newInventory.splice(itemIndex, 1);

      // Add gold
      const newGold = char.gold + item.value;

      return {
        ...char,
        inventory: newInventory,
        gold: newGold,
      };
    }));
  }

  // Helper function to calculate derived stats with equipment bonuses
  function calculateDerivedStatsWithEquipment(
    stats: Character['stats'], 
    level: number, 
    equipment: Character['equipment']
  ) {
    const baseStats = calculateDerivedStats(stats, level);

    // Add equipment bonuses
    const bonuses = { attack: 0, defense: 0, maxHealth: 0, maxMana: 0 };
    
    Object.values(equipment).forEach(item => {
      if (item?.stats) {
        bonuses.attack += item.stats.attack || 0;
        bonuses.defense += item.stats.defense || 0;
        bonuses.maxHealth += item.stats.health || 0;
        bonuses.maxMana += item.stats.mana || 0;
      }
    });

    return {
      ...baseStats,
      attack: baseStats.attack + bonuses.attack,
      defense: baseStats.defense + bonuses.defense,
      maxHealth: baseStats.maxHealth + bonuses.maxHealth,
      maxMana: baseStats.maxMana + bonuses.maxMana,
    };
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

            {/* Battle Progress Stats */}
            <div className="flex justify-center gap-6 mt-6">
              <div className="glass-card rounded-xl px-6 py-3">
                <div className="font-body text-xs text-[var(--text-muted)] uppercase tracking-wider">Round</div>
                <div className="font-display text-2xl font-bold text-white">{currentRound}</div>
              </div>
              <div className="glass-card rounded-xl px-6 py-3">
                <div className="font-body text-xs text-[var(--text-muted)] uppercase tracking-wider">Streak</div>
                <div className="font-display text-2xl font-bold text-[var(--legendary-amber)]">{survivalStreak}</div>
              </div>
              <div className="glass-card rounded-xl px-6 py-3">
                <div className="font-body text-xs text-[var(--text-muted)] uppercase tracking-wider">Gold</div>
                <div className="font-display text-2xl font-bold text-[var(--arcane-cyan)]">{storageGold}</div>
              </div>
              <div className="glass-card rounded-xl px-6 py-3">
                <div className="font-body text-xs text-[var(--text-muted)] uppercase tracking-wider">Inventory</div>
                <div className="font-display text-2xl font-bold text-[var(--mystic-magenta)]">{storageInventory.length}</div>
              </div>
            </div>
          </div>

          {/* Battle Result Notification */}
          {battleResult && (
            <BattleResultNotification 
              battleResult={battleResult} 
              onDismiss={dismissBattleResult}
              getItemById={getItemById}
            />
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
                    

                    
                    {/* Save Button */}
                    <button 
                      onClick={handleManualSave}
                      className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#2ecc71] to-[#27ae60] font-display font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <span>💾</span> SAVE GAME
                      {lastSaved && (
                        <span className="text-xs font-normal opacity-75">
                          ({lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                        </span>
                      )}
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

                {/* Save Management */}
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <h4 className="font-display text-sm text-[var(--text-muted)]">SAVE MANAGEMENT</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {/* Export Save */}
                    <button 
                      onClick={handleExportSave}
                      className="py-2 px-3 rounded-lg bg-[var(--surface)] border border-[var(--edge)] font-body text-sm text-[var(--text-secondary)] hover:text-white hover:border-[var(--arcane-cyan)] transition-colors flex items-center justify-center gap-1"
                    >
                      <span>📤</span> Export
                    </button>
                    
                    {/* Import Save */}
                    <label className="py-2 px-3 rounded-lg bg-[var(--surface)] border border-[var(--edge)] font-body text-sm text-[var(--text-secondary)] hover:text-white hover:border-[var(--arcane-cyan)] transition-colors flex items-center justify-center gap-1 cursor-pointer">
                      <span>📥</span> Import
                      <input 
                        type="file" 
                        accept=".json" 
                        onChange={handleImportSave}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  {/* Clear All Saves */}
                  <button 
                    onClick={handleClearSaves}
                    className="w-full py-2 px-3 rounded-lg bg-red-500/10 border border-red-500/30 font-body text-sm text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    🗑️ Clear All Saves
                  </button>
                  
                  {/* Save Status */}
                  <div className="text-center">
                    <span className="font-body text-xs text-[var(--text-muted)]">
                      {characters.length} character(s) saved
                      {lastSaved && ` • Last save: ${lastSaved.toLocaleTimeString()}`}
                    </span>
                  </div>
                </div>
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
                    {showLevelUp && selectedCharData && (
                      <div 
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--void)]/90 backdrop-blur-sm"
                        onClick={(e) => {
                          if (e.target === e.currentTarget) {
                            setShowLevelUp(false);
                          }
                        }}
                      >
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
    { key: 'strength', name: 'Strength', icon: '💪', color: '#ff00a0' },
    { key: 'agility', name: 'Agility', icon: '⚡', color: '#00f5ff' },
    { key: 'intelligence', name: 'Intelligence', icon: '🧠', color: '#8b5cf6' },
    { key: 'vitality', name: 'Vitality', icon: '❤️', color: '#2ecc71' },
    { key: 'luck', name: 'Luck', icon: '🍀', color: '#ffb800' },
  ];

  const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0);

  return (
    <div 
      className="glass-card rounded-2xl p-8 max-w-md w-full corner-accent border-2 border-[var(--arcane-cyan)]/30 shadow-2xl shadow-[var(--arcane-cyan)]/20"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header with icon */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--arcane-cyan)] to-[var(--mystic-magenta)] mb-4">
          <span className="text-3xl">⭐</span>
        </div>
        <h2 className="font-display text-3xl font-bold text-white mb-2">Level Up!</h2>
        <p className="font-body text-[var(--text-secondary)]">
          {character.name} is growing stronger!
        </p>
      </div>

      {/* Points display */}
      <div className="bg-[var(--void)]/50 rounded-xl p-4 mb-6 text-center border border-[var(--edge)]">
        <span className="font-body text-sm text-[var(--text-muted)]">Points Remaining</span>
        <div className={`font-display text-4xl font-bold ${pointsRemaining === 0 ? 'text-[var(--arcane-cyan)]' : 'text-white'}`}>
          {pointsRemaining}
        </div>
        <div className="w-full h-2 bg-[var(--edge)] rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[var(--arcane-cyan)] to-[var(--mystic-magenta)] transition-all duration-300"
            style={{ width: `${(totalAllocated / character.statPoints) * 100}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.key} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--surface)]/50 transition-colors">
            <span className="text-2xl">{stat.icon}</span>
            <span className="font-body text-sm text-[var(--text-secondary)] w-28">{stat.name}</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => deallocate(stat.key)}
                disabled={allocations[stat.key] <= 0}
                className="w-10 h-10 rounded-lg bg-[var(--void)] border border-[var(--edge)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--arcane-cyan)] disabled:opacity-30 font-bold text-lg transition-all"
              >
                −
              </button>
              <div className="w-12 text-center">
                <span className="font-display font-bold text-xl text-white">
                  {character.stats[stat.key as keyof typeof character.stats] + allocations[stat.key]}
                </span>
                {allocations[stat.key] > 0 && (
                  <span className="block text-xs text-[var(--arcane-cyan)]">+{allocations[stat.key]}</span>
                )}
              </div>
              <button 
                onClick={() => allocate(stat.key)}
                disabled={pointsRemaining <= 0}
                className="w-10 h-10 rounded-lg bg-[var(--arcane-cyan)] text-[var(--void)] hover:bg-[var(--arcane-cyan)]/80 disabled:opacity-30 disabled:bg-[var(--edge)] font-bold text-lg transition-all"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button 
          onClick={onCancel}
          className="flex-1 py-3 px-4 rounded-xl bg-[var(--surface)] border border-[var(--edge)] font-display font-bold text-[var(--text-secondary)] hover:text-white hover:border-[var(--text-muted)] transition-all"
        >
          Cancel
        </button>
        <button 
          onClick={() => onConfirm(allocations)}
          disabled={pointsRemaining > 0}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[var(--arcane-cyan)] to-[var(--mystic-magenta)] font-display font-bold text-white hover:opacity-90 disabled:opacity-30 disabled:bg-[var(--edge)] disabled:bg-none transition-all"
        >
          {pointsRemaining > 0 ? `Allocate ${pointsRemaining} More` : 'Confirm'}
        </button>
      </div>
    </div>
  );
}

// Battle Result Notification Component with auto-dismiss
function BattleResultNotification({ 
  battleResult, 
  onDismiss,
  getItemById
}: { 
  battleResult: { won: boolean; rewards: BattleReward }; 
  onDismiss: () => void;
  getItemById: (id: string) => { icon: string; name: string } | undefined;
}) {
  const [progress, setProgress] = useState(100);
  const duration = 5000; // 5 seconds

  useEffect(() => {
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      } else {
        onDismiss();
      }
    };
    
    const animationFrame = requestAnimationFrame(updateProgress);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [onDismiss]);

  return (
    <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 rounded-xl border-2 overflow-hidden ${
      battleResult.won 
        ? 'border-[var(--arcane-cyan)] bg-[var(--arcane-cyan)]/20' 
        : 'border-[var(--mystic-magenta)] bg-[var(--mystic-magenta)]/20'
    } animate-pulse-glow`}>
      <div className="px-8 py-4">
        {/* Close button */}
        <button 
          onClick={onDismiss}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--void)]/50 text-[var(--text-muted)] hover:text-white flex items-center justify-center text-sm transition-colors"
        >
          ✕
        </button>
        
        <div className="font-display text-xl font-bold text-white text-center pr-4">
          {battleResult.won ? '⚔️ VICTORY!' : '💀 DEFEAT'}
        </div>
        
        {battleResult.won && (
          <div className="font-body text-sm text-center mt-1">
            <span className="text-[var(--legendary-amber)]">+{battleResult.rewards.experience} XP</span>
            {' • '}
            <span className="text-[var(--arcane-cyan)]">+{battleResult.rewards.gold} Gold</span>
            {battleResult.rewards.items && battleResult.rewards.items.length > 0 && (
              <div className="mt-2 pt-2 border-t border-[var(--edge)]">
                <span className="text-[var(--text-muted)] text-xs">Loot:</span>
                <div className="flex flex-wrap justify-center gap-1 mt-1">
                  {battleResult.rewards.items.map((itemId, i) => {
                    const item = getItemById(itemId);
                    return item ? (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-[var(--surface)] text-white">
                        {item.icon} {item.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Progress bar */}
      <div className="h-1 bg-[var(--void)]/50">
        <div 
          className="h-full bg-gradient-to-r from-[var(--arcane-cyan)] to-[var(--mystic-magenta)] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
