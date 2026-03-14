'use client';

import { useState, useEffect, useCallback } from 'react';
import { Character } from '../types';
import { Monster, BattleReward, getRandomMonster, calculateRewards, RARITY_COLORS, RARITY_NAMES } from '../data/monsters';

interface BattleArenaProps {
  character: Character;
  onBattleEnd: (won: boolean, rewards: BattleReward, remainingHealth: number) => void;
  onFlee: () => void;
}

type BattleState = 'intro' | 'player-turn' | 'enemy-turn' | 'victory' | 'defeat' | 'fled';

interface BattleLog {
  id: number;
  text: string;
  type: 'player' | 'enemy' | 'system' | 'damage' | 'heal' | 'reward';
}

export default function BattleArena({ character, onBattleEnd, onFlee }: BattleArenaProps) {
  const [monster, setMonster] = useState<Monster>(() => getRandomMonster(character.level));
  const [battleState, setBattleState] = useState<BattleState>('intro');
  const [playerHealth, setPlayerHealth] = useState(character.derivedStats.maxHealth);
  const [monsterHealth, setMonsterHealth] = useState(monster.maxHealth);
  const [battleLog, setBattleLog] = useState<BattleLog[]>([]);
  const [turnCount, setTurnCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [playerShake, setPlayerShake] = useState(false);
  const [monsterShake, setMonsterShake] = useState(false);
  const [damageNumbers, setDamageNumbers] = useState<{ id: number; amount: number; isPlayer: boolean; isCrit?: boolean }[]>([]);

  const logIdRef = 0;
  const damageIdRef = 0;

  const addLog = useCallback((text: string, type: BattleLog['type']) => {
    setBattleLog(prev => [...prev.slice(-9), { id: Date.now() + Math.random(), text, type }]);
  }, []);

  const addDamageNumber = useCallback((amount: number, isPlayer: boolean, isCrit = false) => {
    const id = Date.now() + Math.random();
    setDamageNumbers(prev => [...prev, { id, amount, isPlayer, isCrit }]);
    setTimeout(() => {
      setDamageNumbers(prev => prev.filter(d => d.id !== id));
    }, 1500);
  }, []);

  // Initialize battle
  useEffect(() => {
    addLog(`A wild ${monster.name} appears!`, 'system');
    const timer = setTimeout(() => {
      setBattleState('player-turn');
      addLog('Your turn! Choose an action.', 'system');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate damage
  function calculateDamage(attacker: { attack: number }, defender: { defense: number }, isCrit = false): number {
    const baseDamage = attacker.attack;
    const defenseReduction = defender.defense * 0.5;
    const variance = 0.8 + Math.random() * 0.4; // 80-120% damage
    let damage = Math.max(1, Math.floor((baseDamage - defenseReduction) * variance));
    
    if (isCrit) {
      damage = Math.floor(damage * 1.5);
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
  async function playerAttack(attackType: 'normal' | 'heavy' | 'special') {
    if (battleState !== 'player-turn' || isAnimating) return;
    
    setIsAnimating(true);
    setTurnCount(prev => prev + 1);

    let damage = 0;
    let isCrit = false;
    let actionName = '';

    switch (attackType) {
      case 'normal':
        actionName = 'Attack';
        damage = calculateDamage(
          { attack: character.derivedStats.attack },
          { defense: monster.defense }
        );
        isCrit = checkCrit(character.derivedStats.critChance);
        if (isCrit) damage = Math.floor(damage * character.derivedStats.critDamage / 100);
        break;
        
      case 'heavy':
        actionName = 'Heavy Strike';
        damage = calculateDamage(
          { attack: Math.floor(character.derivedStats.attack * 1.5) },
          { defense: monster.defense }
        );
        isCrit = checkCrit(character.derivedStats.critChance * 0.7);
        break;
        
      case 'special':
        actionName = character.classId === 'warrior' ? 'Berserk Slash' :
                     character.classId === 'rogue' ? 'Backstab' :
                     character.classId === 'mage' ? 'Fireball' :
                     character.classId === 'engineer' ? 'Turret Strike' :
                     'Precision Shot';
        damage = calculateDamage(
          { attack: Math.floor(character.derivedStats.attack * 2) },
          { defense: Math.floor(monster.defense * 0.5) }
        );
        isCrit = checkCrit(character.derivedStats.critChance * 1.5);
        break;
    }

    // Check for monster dodge
    const monsterDodgeChance = monster.speed * 0.5;
    if (checkDodge(monsterDodgeChance)) {
      addLog(`${monster.name} dodged your ${actionName}!`, 'enemy');
      setMonsterShake(true);
      setTimeout(() => setMonsterShake(false), 300);
    } else {
      // Apply damage
      const actualDamage = Math.floor(damage * (0.9 + Math.random() * 0.2));
      setMonsterHealth(prev => {
        const newHealth = Math.max(0, prev - actualDamage);
        return newHealth;
      });
      
      addLog(`You used ${actionName} for ${actualDamage}${isCrit ? ' CRITICAL' : ''} damage!`, isCrit ? 'damage' : 'player');
      addDamageNumber(actualDamage, false, isCrit);
      
      // Visual effects
      setMonsterShake(true);
      setTimeout(() => setMonsterShake(false), 300);
    }

    // Check victory
    if (monsterHealth - damage <= 0) {
      setTimeout(() => {
        handleVictory();
      }, 1000);
      return;
    }

    // Enemy turn
    setBattleState('enemy-turn');
    setTimeout(() => {
      enemyTurn();
    }, 1500);
  }

  // Enemy attacks
  function enemyTurn() {
    // Choose ability
    const availableAbilities = monster.abilities.filter(a => turnCount % (a.cooldown + 1) === 0);
    const ability = availableAbilities[Math.floor(Math.random() * availableAbilities.length)] || monster.abilities[0];
    
    // Check for player dodge
    if (checkDodge(character.derivedStats.dodgeChance)) {
      addLog(`You dodged ${monster.name}'s ${ability.name}!`, 'player');
      setPlayerShake(true);
      setTimeout(() => setPlayerShake(false), 300);
    } else {
      const damage = calculateDamage(
        { attack: ability.damage || monster.attack },
        { defense: character.derivedStats.defense }
      );
      
      const actualDamage = Math.floor(damage * (0.9 + Math.random() * 0.2));
      setPlayerHealth(prev => Math.max(0, prev - actualDamage));
      
      addLog(`${monster.name} used ${ability.name} for ${actualDamage} damage!`, 'enemy');
      addDamageNumber(actualDamage, true);
      
      // Visual effects
      setPlayerShake(true);
      setTimeout(() => setPlayerShake(false), 300);
      
      // Apply effects
      if (ability.effect === 'healing' && ability.healing) {
        setMonsterHealth(prev => Math.min(monster.maxHealth, prev + ability.healing!));
        addLog(`${monster.name} healed for ${ability.healing} HP!`, 'heal');
      }
    }

    // Check defeat
    if (playerHealth - (ability.damage || monster.attack) <= 0) {
      setTimeout(() => {
        handleDefeat();
      }, 1000);
      return;
    }

    setBattleState('player-turn');
    addLog('Your turn! Choose an action.', 'system');
    setIsAnimating(false);
  }

  function handleVictory() {
    setBattleState('victory');
    const rewards = calculateRewards(monster, character.level);
    
    addLog(`Victory! You defeated ${monster.name}!`, 'system');
    addLog(`Gained ${rewards.experience} XP and ${rewards.gold} gold!`, 'reward');
    
    setTimeout(() => {
      onBattleEnd(true, rewards, playerHealth);
    }, 2000);
  }

  function handleDefeat() {
    setBattleState('defeat');
    addLog('You were defeated...', 'system');
    
    setTimeout(() => {
      onBattleEnd(false, { experience: 0, gold: 0 }, 0);
    }, 2000);
  }

  function attemptFlee() {
    if (battleState !== 'player-turn' || isAnimating) return;
    
    setIsAnimating(true);
    const fleeChance = 50 + (character.stats.agility - monster.stats.agility);
    
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
        enemyTurn();
      }, 1000);
    }
  }

  const playerHealthPercent = (playerHealth / character.derivedStats.maxHealth) * 100;
  const monsterHealthPercent = (monsterHealth / monster.maxHealth) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Battle Scene */}
      <div className="glass-card rounded-2xl p-8 mb-6 relative overflow-hidden min-h-[400px]">
        {/* Background effect based on monster rarity */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            background: `radial-gradient(circle at 50% 50%, ${RARITY_COLORS[monster.rarity]}, transparent 70%)` 
          }}
        />
        
        {/* Battle Header */}
        <div className="relative flex justify-between items-center mb-8">
          <div className="text-center">
            <div className="font-display text-sm text-[var(--text-muted)]">TURN</div>
            <div className="font-display text-2xl font-bold text-white">{turnCount}</div>
          </div>
          <div 
            className="px-4 py-2 rounded-full font-display text-sm font-bold"
            style={{ 
              backgroundColor: `${RARITY_COLORS[monster.rarity]}20`,
              border: `1px solid ${RARITY_COLORS[monster.rarity]}`,
              color: RARITY_COLORS[monster.rarity]
            }}
          >
            {RARITY_NAMES[monster.rarity]}
          </div>
        </div>

        {/* Combatants */}
        <div className="relative flex justify-between items-end px-8 mb-8">
          {/* Player */}
          <div className={`text-center transition-transform ${playerShake ? 'animate-pulse translate-x-2' : ''}`}>
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--arcane-cyan)] to-[var(--ethereal-violet)] flex items-center justify-center text-4xl mb-3">
                🎭
              </div>
              {/* Damage numbers */}
              {damageNumbers.filter(d => d.isPlayer).map(d => (
                <div 
                  key={d.id}
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 font-display font-bold text-2xl animate-bounce
                    ${d.isCrit ? 'text-[var(--mystic-magenta)] text-3xl' : 'text-[#e74c3c]'}`}
                >
                  -{d.amount}
                </div>
              ))}
            </div>
            <div className="font-display font-bold text-white mb-2">{character.name}</div>
            
            {/* Health Bar */}
            <div className="w-32 mx-auto">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-body text-[var(--text-muted)]">HP</span>
                <span className="font-display text-white">{playerHealth}/{character.derivedStats.maxHealth}</span>
              </div>
              <div className="h-3 bg-[var(--edge)] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    width: `${playerHealthPercent}%`,
                    backgroundColor: playerHealthPercent > 50 ? '#2ecc71' : playerHealthPercent > 25 ? '#f39c12' : '#e74c3c'
                  }}
                />
              </div>
            </div>
          </div>

          {/* VS */}
          <div className="font-display text-4xl font-bold text-[var(--text-muted)] opacity-50">VS</div>

          {/* Monster */}
          <div className={`text-center transition-transform ${monsterShake ? 'animate-pulse -translate-x-2' : ''}`}>
            <div className="relative inline-block">
              <div 
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl mb-3"
                style={{ 
                  backgroundColor: `${RARITY_COLORS[monster.rarity]}20`,
                  border: `2px solid ${RARITY_COLORS[monster.rarity]}`
                }}
              >
                {monster.icon}
              </div>
              {/* Damage numbers */}
              {damageNumbers.filter(d => !d.isPlayer).map(d => (
                <div 
                  key={d.id}
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 font-display font-bold text-2xl animate-bounce
                    ${d.isCrit ? 'text-[var(--legendary-amber)] text-3xl' : 'text-white'}`}
                >
                  -{d.amount}
                </div>
              ))}
            </div>
            <div className="font-display font-bold text-white mb-1">{monster.name}</div>
            <div className="font-body text-xs text-[var(--text-secondary)] mb-2">Lv.{monster.level}</div>
            
            {/* Health Bar */}
            <div className="w-32 mx-auto">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-body text-[var(--text-muted)]">HP</span>
                <span className="font-display text-white">{monsterHealth}/{monster.maxHealth}</span>
              </div>
              <div className="h-3 bg-[var(--edge)] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    width: `${monsterHealthPercent}%`,
                    backgroundColor: RARITY_COLORS[monster.rarity]
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Monster Description */}
        <div className="relative text-center mb-6">
          <p className="font-body text-sm text-[var(--text-secondary)] italic">&quot;{monster.description}&quot;</p>
        </div>

        {/* Action Buttons */}
        {battleState === 'player-turn' && (
          <div className="relative grid grid-cols-4 gap-3">
            <button
              onClick={() => playerAttack('normal')}
              disabled={isAnimating}
              className="py-3 px-4 rounded-xl bg-[var(--surface)] border border-[var(--arcane-cyan)]/30 hover:border-[var(--arcane-cyan)] hover:bg-[var(--arcane-cyan)]/10 transition-colors disabled:opacity-50"
            >
              <div className="font-display text-sm text-white mb-1">Attack</div>
              <div className="font-body text-xs text-[var(--text-muted)]">Standard</div>
            </button>
            
            <button
              onClick={() => playerAttack('heavy')}
              disabled={isAnimating}
              className="py-3 px-4 rounded-xl bg-[var(--surface)] border border-[var(--legendary-amber)]/30 hover:border-[var(--legendary-amber)] hover:bg-[var(--legendary-amber)]/10 transition-colors disabled:opacity-50"
            >
              <div className="font-display text-sm text-white mb-1">Heavy</div>
              <div className="font-body text-xs text-[var(--text-muted)]">1.5x DMG</div>
            </button>
            
            <button
              onClick={() => playerAttack('special')}
              disabled={isAnimating}
              className="py-3 px-4 rounded-xl bg-[var(--surface)] border border-[var(--mystic-magenta)]/30 hover:border-[var(--mystic-magenta)] hover:bg-[var(--mystic-magenta)]/10 transition-colors disabled:opacity-50"
            >
              <div className="font-display text-sm text-white mb-1">Special</div>
              <div className="font-body text-xs text-[var(--text-muted)]">2x DMG</div>
            </button>
            
            <button
              onClick={attemptFlee}
              disabled={isAnimating}
              className="py-3 px-4 rounded-xl bg-[var(--surface)] border border-[var(--text-muted)]/30 hover:border-[var(--text-muted)] hover:bg-[var(--text-muted)]/10 transition-colors disabled:opacity-50"
            >
              <div className="font-display text-sm text-white mb-1">Flee</div>
              <div className="font-body text-xs text-[var(--text-muted)]">Escape</div>
            </button>
          </div>
        )}

        {/* Turn Indicator */}
        {battleState === 'enemy-turn' && (
          <div className="relative text-center py-4">
            <div className="inline-block px-6 py-3 rounded-xl bg-[var(--mystic-magenta)]/20 border border-[var(--mystic-magenta)]">
              <span className="font-display text-[var(--mystic-magenta)]">Enemy is attacking...</span>
            </div>
          </div>
        )}

        {/* Victory/Defeat Overlay */}
        {(battleState === 'victory' || battleState === 'defeat') && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--void)]/80 backdrop-blur-sm">
            <div className={`text-center p-8 rounded-2xl border-2 ${
              battleState === 'victory' 
                ? 'border-[var(--arcane-cyan)] bg-[var(--arcane-cyan)]/10' 
                : 'border-[var(--mystic-magenta)] bg-[var(--mystic-magenta)]/10'
            }`}>
              <div className="text-6xl mb-4">{battleState === 'victory' ? '🏆' : '💀'}</div>
              <div className={`font-display text-4xl font-bold mb-2 ${
                battleState === 'victory' ? 'text-[var(--arcane-cyan)]' : 'text-[var(--mystic-magenta)]'
              }`}>
                {battleState === 'victory' ? 'VICTORY!' : 'DEFEAT'}
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
                'text-[var(--text-secondary)]'
              }`}
            >
              {log.type === 'damage' && '⚔️ '}
              {log.type === 'heal' && '💚 '}
              {log.type === 'reward' && '🎁 '}
              {log.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
