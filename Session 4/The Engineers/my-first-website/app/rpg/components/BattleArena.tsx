'use client';

import { useState, useEffect, useCallback } from 'react';
import { Character } from '../types';
import {
  Monster,
  BattleReward,
  calculateRewards,
  RARITY_COLORS,
  RARITY_NAMES,
  getMonstersForRound,
  getDifficultyMultiplier,
  isBossRound,
  BOSS_WARNINGS
} from '../data/monsters';
import { getItemById } from '../data/items';
import { 
  getCurrentRound, 
  incrementRound, 
  decrementRound, 
  getSurvivalStreak, 
  incrementStreak, 
  resetStreak,
  addGold,
  getGold,
  addItemToInventory,
  recordBossDefeat,
  recordBossAttempt,
  checkAchievements,
  Achievement
} from '../data/storage';

interface BattleArenaProps {
  character: Character;
  onBattleEnd: (won: boolean, rewards: BattleReward, remainingHealth: number) => void;
  onFlee: () => void;
}

type BattleState = 'intro' | 'player-turn' | 'enemy-turn' | 'victory' | 'defeat' | 'fled' | 'boss-warning';
type AttackType = 'normal' | 'heavy' | 'special' | 'aoe';

interface BattleLog {
  id: number;
  text: string;
  type: 'player' | 'enemy' | 'system' | 'damage' | 'heal' | 'reward' | 'warning' | 'boss';
}

interface ActiveMonster extends Monster {
  currentHealth: number;
}

export default function BattleArena({ character, onBattleEnd, onFlee }: BattleArenaProps) {
  // Core State
  const [round, setRound] = useState(getCurrentRound());
  const [streak, setStreak] = useState(getSurvivalStreak());
  const [enemies, setEnemies] = useState<ActiveMonster[]>([]);
  const [selectedTarget, setSelectedTarget] = useState(0);
  const [battleState, setBattleState] = useState<BattleState>('intro');
  const [playerHealth, setPlayerHealth] = useState(character.derivedStats.maxHealth);
  const [playerMana, setPlayerMana] = useState(character.derivedStats.maxMana);
  const [battleLog, setBattleLog] = useState<BattleLog[]>([]);
  const [turnCount, setTurnCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [playerShake, setPlayerShake] = useState(false);
  const [enemiesShake, setEnemiesShake] = useState<boolean[]>([]);
  const [damageNumbers, setDamageNumbers] = useState<{ 
    id: number; 
    amount: number; 
    isPlayer: boolean; 
    enemyIndex?: number;
    isCrit?: boolean 
  }[]>([]);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [showItemMenu, setShowItemMenu] = useState(false);
  
  // Initialize battle
  useEffect(() => {
    initializeBattle();
  }, []);

  const initializeBattle = () => {
    const currentRound = getCurrentRound();
    setRound(currentRound);
    setStreak(getSurvivalStreak());
    
    // Check for boss warning (rounds 9, 19, 29, 39, 49)
    if (isBossRound(currentRound + 1) && BOSS_WARNINGS[currentRound + 1]) {
      setBattleState('boss-warning');
      addLog(BOSS_WARNINGS[currentRound + 1], 'warning');
      setTimeout(() => {
        spawnEnemies(currentRound);
      }, 3000);
    } else {
      spawnEnemies(currentRound);
    }
  };

  const spawnEnemies = (currentRound: number) => {
    // NEW: Pass player level so enemies scale with you!
    const monsterData = getMonstersForRound(currentRound, character.level);
    const activeMonsters = monsterData.map(m => ({
      ...m,
      currentHealth: m.maxHealth,
    }));
    
    setEnemies(activeMonsters);
    setEnemiesShake(new Array(activeMonsters.length).fill(false));
    setSelectedTarget(0);
    
    // Log enemy stats for debugging
    activeMonsters.forEach(m => {
      console.log(`Enemy spawned: ${m.name} (HP: ${m.maxHealth}, ATK: ${m.attack}, DEF: ${m.defense})`);
    });
    
    if (isBossRound(currentRound)) {
      addLog(`⚠️ BOSS BATTLE: ${activeMonsters[0].name} appears!`, 'boss');
      addLog(`BOSS HP: ${activeMonsters[0].maxHealth} | ATK: ${activeMonsters[0].attack}`, 'boss');
      recordBossAttempt(currentRound);
    } else {
      if (activeMonsters.length === 1) {
        addLog(`A wild ${activeMonsters[0].name} appears! (HP: ${activeMonsters[0].maxHealth})`, 'system');
      } else {
        addLog(`${activeMonsters.length} enemies appear!`, 'system');
      }
    }
    
    const timer = setTimeout(() => {
      setBattleState('player-turn');
      addLog(`Round ${currentRound} - Your turn! Choose an action.`, 'system');
    }, 1500);
    
    return () => clearTimeout(timer);
  };

  const addLog = useCallback((text: string, type: BattleLog['type']) => {
    setBattleLog(prev => [...prev.slice(-9), { id: Date.now() + Math.random(), text, type }]);
  }, []);

  const addDamageNumber = useCallback((amount: number, isPlayer: boolean, enemyIndex?: number, isCrit = false) => {
    const id = Date.now() + Math.random();
    setDamageNumbers(prev => [...prev, { id, amount, isPlayer, enemyIndex, isCrit }]);
    setTimeout(() => {
      setDamageNumbers(prev => prev.filter(d => d.id !== id));
    }, 1500);
  }, []);

  // Calculate damage
  function calculateDamage(
    attacker: { attack: number }, 
    defender: { defense: number }, 
    isCrit = false,
    isAOE = false
  ): number {
    const baseDamage = attacker.attack;
    const defenseReduction = defender.defense * 0.5;
    const variance = 0.8 + Math.random() * 0.4;
    let damage = Math.max(1, Math.floor((baseDamage - defenseReduction) * variance));
    
    if (isCrit) {
      damage = Math.floor(damage * 1.5);
    }
    
    if (isAOE) {
      damage = Math.floor(damage * (0.7 + Math.random() * 0.3)); // 70-100% for AOE
    }
    
    return damage;
  }

  function checkCrit(chance: number): boolean {
    return Math.random() * 100 < chance;
  }

  function checkDodge(chance: number): boolean {
    return Math.random() * 100 < chance;
  }

  // Player attacks
  async function playerAttack(attackType: AttackType) {
    if (battleState !== 'player-turn' || isAnimating || enemies.length === 0) return;
    
    setIsAnimating(true);
    setTurnCount(prev => prev + 1);

    if (attackType === 'aoe') {
      // AOE Attack - hits all enemies
      await performAOEAttack();
    } else {
      // Single target attack
      await performSingleAttack(attackType, selectedTarget);
    }

    // Check victory (all enemies dead)
    const remainingEnemies = enemies.filter(e => e.currentHealth > 0);
    if (remainingEnemies.length === 0) {
      setTimeout(() => {
        handleVictory();
      }, 1000);
      return;
    }

    // Enemy turn
    setBattleState('enemy-turn');
    setTimeout(() => {
      performEnemyTurn();
    }, 1500);
  }

  async function performSingleAttack(attackType: AttackType, targetIndex: number) {
    const target = enemies[targetIndex];
    if (!target || target.currentHealth <= 0) return;

    let damage = 0;
    let isCrit = false;
    let actionName = '';

    switch (attackType) {
      case 'normal':
        actionName = 'Attack';
        damage = calculateDamage(
          { attack: character.derivedStats.attack },
          { defense: target.defense }
        );
        isCrit = checkCrit(character.derivedStats.critChance);
        if (isCrit) damage = Math.floor(damage * character.derivedStats.critDamage / 100);
        break;
        
      case 'heavy':
        actionName = 'Heavy Strike';
        damage = calculateDamage(
          { attack: Math.floor(character.derivedStats.attack * 1.5) },
          { defense: target.defense }
        );
        isCrit = checkCrit(character.derivedStats.critChance * 0.7);
        break;
        
      case 'special':
        actionName = getSpecialAttackName();
        damage = calculateDamage(
          { attack: Math.floor(character.derivedStats.attack * 2) },
          { defense: Math.floor(target.defense * 0.5) }
        );
        isCrit = checkCrit(character.derivedStats.critChance * 1.5);
        
        // Consume mana for special
        setPlayerMana(prev => Math.max(0, prev - 20));
        break;
    }

    // Check for enemy dodge
    const enemyDodgeChance = target.speed * 0.5;
    if (checkDodge(enemyDodgeChance)) {
      addLog(`${target.name} dodged your ${actionName}!`, 'enemy');
      setEnemiesShake(prev => {
        const newShake = [...prev];
        newShake[targetIndex] = true;
        return newShake;
      });
      setTimeout(() => {
        setEnemiesShake(prev => {
          const newShake = [...prev];
          newShake[targetIndex] = false;
          return newShake;
        });
      }, 300);
    } else {
      // Apply damage
      const actualDamage = Math.floor(damage * (0.9 + Math.random() * 0.2));
      
      setEnemies(prev => {
        const newEnemies = [...prev];
        newEnemies[targetIndex] = {
          ...newEnemies[targetIndex],
          currentHealth: Math.max(0, newEnemies[targetIndex].currentHealth - actualDamage)
        };
        return newEnemies;
      });
      
      addLog(`You used ${actionName} on ${target.name} for ${actualDamage}${isCrit ? ' CRITICAL' : ''} damage!`, isCrit ? 'damage' : 'player');
      addDamageNumber(actualDamage, false, targetIndex, isCrit);
      
      // Visual effects
      setEnemiesShake(prev => {
        const newShake = [...prev];
        newShake[targetIndex] = true;
        return newShake;
      });
      setTimeout(() => {
        setEnemiesShake(prev => {
          const newShake = [...prev];
          newShake[targetIndex] = false;
          return newShake;
        });
      }, 300);
    }
  }

  async function performAOEAttack() {
    const actionName = 'Area Strike';
    addLog(`You unleash ${actionName} on all enemies!`, 'player');

    // Hit all enemies with reduced damage
    enemies.forEach((enemy, index) => {
      if (enemy.currentHealth > 0) {
        const damage = calculateDamage(
          { attack: Math.floor(character.derivedStats.attack * 1.2) },
          { defense: enemy.defense },
          false,
          true // AOE flag
        );
        
        const actualDamage = Math.floor(damage * (0.9 + Math.random() * 0.2));
        
        setEnemies(prev => {
          const newEnemies = [...prev];
          newEnemies[index] = {
            ...newEnemies[index],
            currentHealth: Math.max(0, newEnemies[index].currentHealth - actualDamage)
          };
          return newEnemies;
        });
        
        addLog(`${enemy.name} takes ${actualDamage} damage!`, 'damage');
        addDamageNumber(actualDamage, false, index, false);
        
        // Shake all enemies
        setEnemiesShake(prev => {
          const newShake = [...prev];
          newShake[index] = true;
          return newShake;
        });
      }
    });

    setTimeout(() => {
      setEnemiesShake(new Array(enemies.length).fill(false));
    }, 300);

    // Consume more mana for AOE
    setPlayerMana(prev => Math.max(0, prev - 30));
  }

  function getSpecialAttackName(): string {
    switch (character.classId) {
      case 'warrior': return 'Berserk Slash';
      case 'rogue': return 'Backstab';
      case 'mage': return 'Fireball';
      case 'engineer': return 'Turret Strike';
      case 'ranger': return 'Precision Shot';
      default: return 'Special Attack';
    }
  }

  // Enemy turn
  function performEnemyTurn() {
    let totalDamage = 0;
    let playerStillAlive = true;

    enemies.forEach((enemy, index) => {
      if (enemy.currentHealth <= 0 || !playerStillAlive) return;

      // Small delay between enemy attacks
      setTimeout(() => {
        if (!playerStillAlive) return;

        // Choose ability
        const availableAbilities = enemy.abilities.filter(a => turnCount % (a.cooldown + 1) === 0);
        const ability = availableAbilities[Math.floor(Math.random() * availableAbilities.length)] || enemy.abilities[0];
        
        // Check for player dodge
        if (checkDodge(character.derivedStats.dodgeChance)) {
          addLog(`You dodged ${enemy.name}'s ${ability.name}!`, 'player');
          setPlayerShake(true);
          setTimeout(() => setPlayerShake(false), 300);
        } else {
          const isAOE = ability.aoe;
          const damage = calculateDamage(
            { attack: ability.damage || enemy.attack },
            { defense: character.derivedStats.defense }
          );
          
          const actualDamage = Math.floor(damage * (0.9 + Math.random() * 0.2));
          
          setPlayerHealth(prev => {
            const newHealth = Math.max(0, prev - actualDamage);
            if (newHealth <= 0) playerStillAlive = false;
            return newHealth;
          });
          
          totalDamage += actualDamage;
          
          addLog(`${enemy.name} used ${ability.name} for ${actualDamage} damage!`, 'enemy');
          addDamageNumber(actualDamage, true, undefined, false);
          
          // Visual effects
          setPlayerShake(true);
          setTimeout(() => setPlayerShake(false), 300);
          
          // Apply effects
          if (ability.effect === 'healing' && ability.healing) {
            setEnemies(prev => {
              const newEnemies = [...prev];
              newEnemies[index] = {
                ...newEnemies[index],
                currentHealth: Math.min(newEnemies[index].maxHealth, newEnemies[index].currentHealth + ability.healing!)
              };
              return newEnemies;
            });
            addLog(`${enemy.name} healed for ${ability.healing} HP!`, 'heal');
          }
          
          if (ability.effect === 'regenerate') {
            addLog(`${enemy.name} is regenerating health!`, 'heal');
          }
        }

        // Check defeat after each enemy attack
        if (!playerStillAlive) {
          setTimeout(() => {
            handleDefeat();
          }, 500);
        }
      }, index * 800); // Stagger enemy attacks
    });

    // Return to player turn if still alive
    setTimeout(() => {
      if (playerHealth > 0) {
        setBattleState('player-turn');
        addLog('Your turn! Choose an action.', 'system');
        setIsAnimating(false);
      }
    }, enemies.length * 800 + 500);
  }

  function handleVictory() {
    setBattleState('victory');

    const rewards = calculateRewards(enemies[0], character.level, character.stats.luck || 0);

    // Update storage with rewards - THESE WERE MISSING!
    incrementRound();           // Advance round in storage
    incrementStreak();          // Increase survival streak
    addGold(rewards.gold);      // Add gold to storage

    // Add items to storage inventory
    if (rewards.items && rewards.items.length > 0) {
      rewards.items.forEach(itemId => {
        addItemToInventory(itemId);  // Add to storage inventory
      });
    }

    // Record boss defeat if applicable
    if (isBossRound(round)) {
      recordBossDefeat(round);
    }

    // Check for new achievements
    const unlockedAchievements = checkAchievements();
    if (unlockedAchievements.length > 0) {
      setNewAchievements(unlockedAchievements);
    }

    addLog(`Victory! You defeated ${enemies.length > 1 ? 'all enemies' : enemies[0].name}!`, 'system');
    addLog(`Gained ${rewards.experience} XP and ${rewards.gold} gold!`, 'reward');

    // Show item drops in battle log
    if (rewards.items && rewards.items.length > 0) {
      rewards.items.forEach(itemId => {
        const item = getItemById(itemId);
        if (item) {
          addLog(`Found: ${item.name}!`, 'reward');
        }
      });
    }

    // Update local state to reflect new values
    setRound(getCurrentRound());
    setStreak(getSurvivalStreak());

    setTimeout(() => {
      onBattleEnd(true, rewards, playerHealth);
    }, 3000);
  }

  function handleDefeat() {
    setBattleState('defeat');

    if (isBossRound(round)) {
      // Boss punishment: -3 rounds
      const newRound = decrementRound(3);
      setRound(newRound);
      addLog(`Defeated by boss! Returning to Round ${newRound}...`, 'warning');
    } else {
      // Regular defeat: -1 round (minimum 1)
      const newRound = decrementRound(1);
      setRound(newRound);
      addLog(`Defeated! Returning to Round ${newRound}...`, 'warning');
    }

    resetStreak();
    setStreak(0);

    setTimeout(() => {
      onBattleEnd(false, { experience: 0, gold: 0, items: [] }, 0);
    }, 3000);
  }

  function attemptFlee() {
    if (battleState !== 'player-turn' || isAnimating) return;
    
    setIsAnimating(true);
    const fleeChance = 50 + (character.stats.agility - enemies[0].stats.agility);
    
    // Can't flee from bosses!
    if (isBossRound(round)) {
      addLog('Cannot flee from a boss battle!', 'warning');
      setIsAnimating(false);
      return;
    }
    
    if (Math.random() * 100 < fleeChance) {
      addLog('You successfully fled!', 'system');
      setBattleState('fled');
      setTimeout(() => {
        onFlee();
      }, 1500);
    } else {
      addLog('Failed to flee!', 'system');
      setBattleState('enemy-turn');
      setTimeout(() => {
        performEnemyTurn();
      }, 1000);
    }
  }

  // Calculate percentages
  const playerHealthPercent = (playerHealth / character.derivedStats.maxHealth) * 100;
  const playerManaPercent = (playerMana / character.derivedStats.maxMana) * 100;
  const difficultyMultiplier = getDifficultyMultiplier(round);
  const nextBossRound = Math.ceil(round / 10) * 10;
  const isNextBossSoon = nextBossRound - round <= 2 && !isBossRound(round);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Battle Header */}
      <div className="glass-card rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="font-display text-xs text-[var(--text-muted)]">ROUND</div>
              <div className="font-display text-3xl font-bold text-white">{round}</div>
            </div>
            <div className="text-center">
              <div className="font-display text-xs text-[var(--text-muted)]">MULTIPLIER</div>
              <div className="font-display text-xl font-bold text-[var(--arcane-cyan)]">
                {difficultyMultiplier.toFixed(1)}x
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-xs text-[var(--text-muted)]">STREAK</div>
              <div className="font-display text-xl font-bold text-[var(--legendary-amber)]">
                {streak}
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-display text-xs text-[var(--text-muted)]">GOLD</div>
            <div className="font-display text-xl font-bold text-[var(--mystic-magenta)]">
              {getGold()}
            </div>
          </div>
        </div>
        
        {/* Boss Warning */}
        {isNextBossSoon && (
          <div className="mt-3 p-2 rounded-lg bg-[var(--mystic-magenta)]/20 border border-[var(--mystic-magenta)]">
            <div className="font-body text-sm text-[var(--mystic-magenta)] text-center">
              ⚠️ Boss Battle in {nextBossRound - round} rounds! Prepare yourself!
            </div>
          </div>
        )}
      </div>

      {/* Battle Scene */}
      <div className="glass-card rounded-2xl p-6 mb-4 relative overflow-hidden min-h-[400px]">
        {/* Background effect based on enemy rarity */}
        {enemies.length > 0 && (
          <div 
            className="absolute inset-0 opacity-10"
            style={{ 
              background: `radial-gradient(circle at 50% 50%, ${RARITY_COLORS[enemies[0].rarity]}, transparent 70%)` 
            }}
          />
        )}
        
        {/* Player Stats */}
        <div className="relative mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--arcane-cyan)] to-[var(--ethereal-violet)] flex items-center justify-center text-3xl">
              🎭
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-bold text-white">{character.name}</span>
                <span className="font-display text-sm text-[var(--text-muted)]">
                  Lv.{character.level}
                </span>
              </div>
              
              {/* HP Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-body text-[var(--text-muted)]">HP</span>
                  <span className="font-display text-white">{playerHealth}/{character.derivedStats.maxHealth}</span>
                </div>
                <div className="h-2 bg-[var(--edge)] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${playerHealthPercent}%`,
                      backgroundColor: playerHealthPercent > 50 ? '#2ecc71' : playerHealthPercent > 25 ? '#f39c12' : '#e74c3c'
                    }}
                  />
                </div>
              </div>
              
              {/* MP Bar */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-body text-[var(--text-muted)]">MP</span>
                  <span className="font-display text-white">{playerMana}/{character.derivedStats.maxMana}</span>
                </div>
                <div className="h-2 bg-[var(--edge)] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300 bg-[var(--mystic-magenta)]"
                    style={{ width: `${playerManaPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enemies */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {enemies.map((enemy, index) => {
            const enemyHealthPercent = (enemy.currentHealth / enemy.maxHealth) * 100;
            const isSelected = selectedTarget === index && enemy.currentHealth > 0;
            const isDead = enemy.currentHealth <= 0;
            
            return (
              <div 
                key={enemy.id + index}
                onClick={() => enemy.currentHealth > 0 && setSelectedTarget(index)}
                className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer
                  ${isSelected ? 'border-[var(--arcane-cyan)] bg-[var(--arcane-cyan)]/10' : 'border-[var(--edge)]'}
                  ${isDead ? 'opacity-50 grayscale' : ''}
                  ${enemiesShake[index] ? 'animate-pulse' : ''}
                `}
              >
                {/* Damage numbers */}
                {damageNumbers.filter(d => d.enemyIndex === index && !d.isPlayer).map(d => (
                  <div 
                    key={d.id}
                    className={`absolute -top-2 left-1/2 -translate-x-1/2 font-display font-bold text-2xl animate-bounce
                      ${d.isCrit ? 'text-[var(--legendary-amber)] text-3xl' : 'text-white'}`}
                  >
                    -{d.amount}
                  </div>
                ))}
                
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--arcane-cyan)] rounded-full" />
                )}
                
                {/* Enemy Icon */}
                <div className="text-center mb-2">
                  <div 
                    className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center text-3xl"
                    style={{ 
                      backgroundColor: `${RARITY_COLORS[enemy.rarity]}20`,
                      border: `2px solid ${RARITY_COLORS[enemy.rarity]}`
                    }}
                  >
                    {enemy.icon}
                  </div>
                </div>
                
                {/* Enemy Info */}
                <div className="text-center mb-2">
                  <div className="font-display font-bold text-white text-sm">{enemy.name}</div>
                  <div className="font-body text-xs text-[var(--text-secondary)]">
                    Lv.{enemy.level} {RARITY_NAMES[enemy.rarity]}
                  </div>
                </div>
                
                {/* HP Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-body text-[var(--text-muted)]">HP</span>
                    <span className="font-display text-white">{enemy.currentHealth}/{enemy.maxHealth}</span>
                  </div>
                  <div className="h-2 bg-[var(--edge)] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${enemyHealthPercent}%`,
                        backgroundColor: RARITY_COLORS[enemy.rarity]
                      }}
                    />
                  </div>
                </div>
                
                {/* Target indicator for dead enemies */}
                {isDead && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-[var(--mystic-magenta)]">DEFEATED</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        {battleState === 'player-turn' && (
          <div className="relative grid grid-cols-5 gap-2">
            <button
              onClick={() => playerAttack('normal')}
              disabled={isAnimating}
              className="py-3 px-2 rounded-xl bg-[var(--surface)] border border-[var(--arcane-cyan)]/30 hover:border-[var(--arcane-cyan)] hover:bg-[var(--arcane-cyan)]/10 transition-colors disabled:opacity-50"
            >
              <div className="font-display text-sm text-white mb-1">Attack</div>
              <div className="font-body text-xs text-[var(--text-muted)]">Target</div>
            </button>
            
            <button
              onClick={() => playerAttack('heavy')}
              disabled={isAnimating}
              className="py-3 px-2 rounded-xl bg-[var(--surface)] border border-[var(--legendary-amber)]/30 hover:border-[var(--legendary-amber)] hover:bg-[var(--legendary-amber)]/10 transition-colors disabled:opacity-50"
            >
              <div className="font-display text-sm text-white mb-1">Heavy</div>
              <div className="font-body text-xs text-[var(--text-muted)]">1.5x DMG</div>
            </button>
            
            <button
              onClick={() => playerAttack('special')}
              disabled={isAnimating || playerMana < 20}
              className="py-3 px-2 rounded-xl bg-[var(--surface)] border border-[var(--mystic-magenta)]/30 hover:border-[var(--mystic-magenta)] hover:bg-[var(--mystic-magenta)]/10 transition-colors disabled:opacity-50"
            >
              <div className="font-display text-sm text-white mb-1">Special</div>
              <div className="font-body text-xs text-[var(--text-muted)]">2x DMG (20 MP)</div>
            </button>
            
            <button
              onClick={() => playerAttack('aoe')}
              disabled={isAnimating || playerMana < 30 || enemies.length <= 1}
              className="py-3 px-2 rounded-xl bg-[var(--surface)] border border-[var(--epic)]/30 hover:border-[var(--epic)] hover:bg-[var(--epic)]/10 transition-colors disabled:opacity-50"
            >
              <div className="font-display text-sm text-white mb-1">AOE</div>
              <div className="font-body text-xs text-[var(--text-muted)]">All (30 MP)</div>
            </button>
            
            <button
              onClick={attemptFlee}
              disabled={isAnimating || isBossRound(round)}
              className="py-3 px-2 rounded-xl bg-[var(--surface)] border border-[var(--text-muted)]/30 hover:border-[var(--text-muted)] hover:bg-[var(--text-muted)]/10 transition-colors disabled:opacity-50"
            >
              <div className="font-display text-sm text-white mb-1">Flee</div>
              <div className="font-body text-xs text-[var(--text-muted)]">
                {isBossRound(round) ? 'No escape!' : 'Escape'}
              </div>
            </button>
          </div>
        )}

        {/* Turn Indicator */}
        {battleState === 'enemy-turn' && (
          <div className="relative text-center py-4">
            <div className="inline-block px-6 py-3 rounded-xl bg-[var(--mystic-magenta)]/20 border border-[var(--mystic-magenta)]">
              <span className="font-display text-[var(--mystic-magenta)]">Enemies are attacking...</span>
            </div>
          </div>
        )}

        {/* Boss Warning Overlay */}
        {battleState === 'boss-warning' && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--void)]/90 backdrop-blur-sm z-20">
            <div className="text-center p-8 rounded-2xl border-2 border-[var(--mystic-magenta)] bg-[var(--mystic-magenta)]/10 animate-pulse">
              <div className="text-6xl mb-4">⚠️</div>
              <div className="font-display text-3xl font-bold text-[var(--mystic-magenta)] mb-2">
                BOSS APPROACHING
              </div>
              <div className="font-body text-[var(--text-secondary)]">
                Prepare for battle...
              </div>
            </div>
          </div>
        )}

        {/* Victory Overlay */}
        {battleState === 'victory' && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--void)]/80 backdrop-blur-sm z-10">
            <div className="text-center p-8 rounded-2xl border-2 border-[var(--arcane-cyan)] bg-[var(--arcane-cyan)]/10">
              <div className="text-6xl mb-4">🏆</div>
              <div className="font-display text-4xl font-bold text-[var(--arcane-cyan)] mb-2">
                VICTORY!
              </div>
              <div className="font-body text-[var(--text-secondary)] mb-4">
                Round {round} Complete
              </div>
              
              {/* Achievements */}
              {newAchievements.length > 0 && (
                <div className="space-y-2 mb-4">
                  {newAchievements.map(ach => (
                    <div key={ach.id} className="px-4 py-2 rounded-lg bg-[var(--legendary-amber)]/20 border border-[var(--legendary-amber)]">
                      <span className="font-body text-sm text-[var(--legendary-amber)]">
                        🏆 {ach.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="font-body text-sm text-[var(--text-muted)]">
                Advancing to Round {round + 1}...
              </div>
            </div>
          </div>
        )}

        {/* Defeat Overlay */}
        {battleState === 'defeat' && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--void)]/80 backdrop-blur-sm z-10">
            <div className="text-center p-8 rounded-2xl border-2 border-[var(--mystic-magenta)] bg-[var(--mystic-magenta)]/10">
              <div className="text-6xl mb-4">💀</div>
              <div className="font-display text-4xl font-bold text-[var(--mystic-magenta)] mb-2">
                DEFEAT
              </div>
              <div className="font-body text-[var(--text-secondary)]">
                {isBossRound(round) 
                  ? `Returning to Round ${round - 3}...` 
                  : 'Rest and try again.'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Battle Log */}
      <div className="glass-card rounded-2xl p-4 h-48 overflow-hidden">
        <h3 className="font-display text-sm text-[var(--text-muted)] mb-3">BATTLE LOG</h3>
        <div className="space-y-2 overflow-y-auto h-32">
          {battleLog.map((log) => (
            <div 
              key={log.id} 
              className={`font-body text-sm ${
                log.type === 'player' ? 'text-[var(--arcane-cyan)]' :
                log.type === 'enemy' ? 'text-[var(--mystic-magenta)]' :
                log.type === 'damage' ? 'text-[var(--legendary-amber)] font-bold' :
                log.type === 'heal' ? 'text-[#2ecc71]' :
                log.type === 'reward' ? 'text-[var(--arcane-cyan)] font-bold' :
                log.type === 'warning' ? 'text-[var(--mystic-magenta)]' :
                log.type === 'boss' ? 'text-[var(--mystic-magenta)] font-bold' :
                'text-[var(--text-secondary)]'
              }`}
            >
              {log.type === 'damage' && '⚔️ '}
              {log.type === 'heal' && '💚 '}
              {log.type === 'reward' && '🎁 '}
              {log.type === 'warning' && '⚠️ '}
              {log.type === 'boss' && '🐉 '}
              {log.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
