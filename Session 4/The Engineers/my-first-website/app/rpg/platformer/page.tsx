'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import { getGold, addGold, incrementRound, incrementStreak, addItemToInventory } from '../data/storage';
import { rollItemDrops } from '../data/items';

type Turn = 'player' | 'enemy' | 'transition';
type MoveType = 'attack' | 'heavy' | 'defend' | 'special';

interface Move {
  name: string;
  type: MoveType;
  damage: number;
  description: string;
  manaCost: number;
}

const PLAYER_MOVES: Move[] = [
  { name: 'Quick Strike', type: 'attack', damage: 15, description: 'Fast attack', manaCost: 0 },
  { name: 'Power Slash', type: 'heavy', damage: 30, description: 'Heavy damage', manaCost: 10 },
  { name: 'Shield Block', type: 'defend', damage: 0, description: 'Block next attack', manaCost: 5 },
  { name: 'Fire Blade', type: 'special', damage: 50, description: 'Ultimate fire strike', manaCost: 25 }
];

export default function TurnBasedBattlePage() {
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [turn, setTurn] = useState<Turn>('player');
  const [round, setRound] = useState(1);
  
  // Player stats
  const [playerHp, setPlayerHp] = useState(100);
  const [playerMaxHp] = useState(100);
  const [playerMana, setPlayerMana] = useState(50);
  const [playerMaxMana] = useState(50);
  const [isDefending, setIsDefending] = useState(false);
  
  // Dragon stats
  const [dragonHp, setDragonHp] = useState(100);
  const [dragonMaxHp] = useState(100);
  const [dragonMana, setDragonMana] = useState(50);
  const [dragonMaxMana] = useState(50);
  
  // Battle log
  const [battleLog, setBattleLog] = useState<string[]>(['Battle Start! Your turn to attack!']);
  
  // Animation states
  const [playerAnim, setPlayerAnim] = useState<'idle' | 'attack' | 'hit'>('idle');
  const [dragonAnim, setDragonAnim] = useState<'idle' | 'attack' | 'hit'>('idle');
  const [damageDisplay, setDamageDisplay] = useState<{amount: number, target: 'player' | 'dragon'} | null>(null);

  const addLog = (message: string) => {
    setBattleLog(prev => [...prev.slice(-4), message]);
  };

  const handlePlayerMove = (move: Move) => {
    if (turn !== 'player' || gameState !== 'playing') return;
    
    if (playerMana < move.manaCost) {
      addLog(`Not enough mana! Need ${move.manaCost} MP`);
      return;
    }

    // Deduct mana
    setPlayerMana(prev => prev - move.manaCost);
    setIsDefending(false);
    
    // Perform move
    setTurn('transition');
    setPlayerAnim('attack');
    
    setTimeout(() => {
      let actualDamage = move.damage;
      
      if (move.type === 'defend') {
        setIsDefending(true);
        addLog('You raised your shield! Blocking next attack.');
      } else {
        // Critical hit chance (20%)
        const isCrit = Math.random() < 0.2;
        if (isCrit) {
          actualDamage = Math.floor(actualDamage * 1.5);
          addLog(`CRITICAL! ${move.name} deals ${actualDamage} damage!`);
        } else {
          addLog(`You used ${move.name}! ${actualDamage} damage!`);
        }
        
        setDragonHp(prev => {
          const newHp = Math.max(0, prev - actualDamage);
          return newHp;
        });
        setDragonAnim('hit');
        setDamageDisplay({ amount: actualDamage, target: 'dragon' });
      }
      
      setTimeout(() => {
        setPlayerAnim('idle');
        setDragonAnim('idle');
        setDamageDisplay(null);
        
        // Check win
        if (dragonHp - actualDamage <= 0 && move.type !== 'defend') {
          setGameState('won');
          addLog('VICTORY! Dragon defeated!');
          return;
        }
        
        // Dragon's turn
        setTurn('enemy');
        setRound(r => r + 1);
        
        // Dragon AI
        setTimeout(() => {
          dragonAttack();
        }, 1000);
      }, 500);
    }, 300);
  };

  const dragonAttack = () => {
    if (gameState !== 'playing') return;
    
    setDragonAnim('attack');
    
    setTimeout(() => {
      // Dragon move selection
      const moves = [
        { name: 'Claw', damage: 15, mana: 0 },
        { name: 'Fire Breath', damage: 30, mana: 15 },
        { name: 'Wing Slam', damage: 20, mana: 5 },
        { name: 'Inferno', damage: 45, mana: 25 }
      ];
      
      // Pick move based on mana
      const availableMoves = moves.filter(m => m.mana <= dragonMana);
      const move = availableMoves[Math.floor(Math.random() * availableMoves.length)] || moves[0];
      
      setDragonMana(prev => Math.max(0, prev - move.mana));
      
      let damage = move.damage;
      
      // Block damage if defending
      if (isDefending) {
        damage = Math.floor(damage * 0.3); // 70% blocked
        addLog(`Blocked! Dragon's ${move.name} only deals ${damage} damage!`);
        setIsDefending(false);
      } else {
        addLog(`Dragon uses ${move.name}! ${damage} damage!`);
      }
      
      setPlayerHp(prev => Math.max(0, prev - damage));
      setPlayerAnim('hit');
      setDamageDisplay({ amount: damage, target: 'player' });
      
      setTimeout(() => {
        setDragonAnim('idle');
        setPlayerAnim('idle');
        setDamageDisplay(null);
        
        // Regen mana each turn
        setPlayerMana(prev => Math.min(playerMaxMana, prev + 5));
        setDragonMana(prev => Math.min(dragonMaxMana, prev + 5));
        
        // Check lose
        if (playerHp - damage <= 0) {
          setGameState('lost');
          addLog('DEFEAT! You fell to the dragon...');
          return;
        }
        
        setTurn('player');
        addLog('Your turn! Choose a move.');
      }, 500);
    }, 300);
  };

  const collectRewards = () => {
    const goldEarned = 200 + (round * 10);
    const xpEarned = 500 + (round * 20);
    const itemDrops = rollItemDrops('boss', 20);
    
    addGold(goldEarned);
    incrementRound();
    incrementStreak();
    itemDrops.forEach(itemId => addItemToInventory(itemId));
    
    alert(`Victory! You earned:\n🪙 ${goldEarned} Gold\n⭐ ${xpEarned} XP\n🎁 ${itemDrops.length} items!`);
  };

  const resetGame = () => {
    setGameState('playing');
    setTurn('player');
    setRound(1);
    setPlayerHp(100);
    setPlayerMana(50);
    setDragonHp(100);
    setDragonMana(50);
    setIsDefending(false);
    setBattleLog(['Battle Start! Your turn to attack!']);
    setPlayerAnim('idle');
    setDragonAnim('idle');
  };

  return (
    <main className="min-h-screen bg-[var(--void)] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-50" />
      <div className="fixed inset-0 noise-overlay" />
      <div className="fixed inset-0 scanlines" />

      <section className="relative z-10 pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
              ⚔️ <span className="text-[var(--legendary-amber)]">Turn-Based Battle</span> 🐉
            </h1>
            <p className="font-body text-[var(--text-secondary)]">
              Round {round} - {turn === 'player' ? '🎯 Your Turn' : turn === 'enemy' ? '🔥 Dragon Attacking...' : '⏳ ...'}
            </p>
          </div>

          {/* Battle Arena - Dark Fantasy Theme */}
          <div className="relative bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 rounded-2xl overflow-hidden mb-6 border-4 border-purple-500/50 shadow-2xl shadow-purple-500/20" style={{ minHeight: '400px' }}>
            {/* Dark atmospheric effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-800/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,50,180,0.3),_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(50,100,150,0.2),_transparent_50%)]" />
            
            {/* Stars/particles effect */}
            <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse" />
            <div className="absolute top-20 left-1/4 w-1 h-1 bg-purple-300 rounded-full opacity-40 animate-pulse delay-75" />
            <div className="absolute top-16 right-20 w-1 h-1 bg-cyan-300 rounded-full opacity-50 animate-pulse delay-150" />
            <div className="absolute top-32 right-1/3 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse delay-300" />
            
            {/* Ground - Dark rocky terrain */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-purple-500/50" />
            </div>
            
            {/* Combatants */}
            <div className="relative h-96 flex justify-between items-end px-16 pb-20">
              {/* Player (Knight) */}
              <div className="relative">
                <div className={`w-40 h-48 transition-transform duration-300 ${playerAnim === 'attack' ? 'translate-x-20 scale-110' : playerAnim === 'hit' ? 'animate-shake' : ''}`}>
                  {/* Knight Pixel Art Image */}
                  <div className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-b from-slate-600 to-slate-700 shadow-lg shadow-slate-900/50">
                    <img 
                      src="/images/battle/knight.svg" 
                      alt="Knight"
                      className="w-full h-full object-contain drop-shadow-lg"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                  {/* Sword swing effect when attacking */}
                  {playerAnim === 'attack' && (
                    <div className="absolute top-1/2 -right-12 w-24 h-2 bg-yellow-400 rounded shadow-lg transform rotate-45 animate-pulse" />
                  )}
                </div>
                
                {/* Player Damage Number */}
                {damageDisplay?.target === 'player' && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-display font-bold text-3xl text-red-500 animate-bounce">
                    -{damageDisplay.amount}
                  </div>
                )}
              </div>

              {/* VS Badge */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-display font-bold px-6 py-3 rounded-full text-2xl border-4 border-white/20 shadow-lg shadow-purple-500/50">
                VS
              </div>

              {/* Dragon */}
              <div className="relative">
                <div className={`w-40 h-48 transition-transform duration-300 ${dragonAnim === 'attack' ? '-translate-x-20 scale-110' : dragonAnim === 'hit' ? 'animate-shake' : ''}`}>
                  {/* Dragon Pixel Art Image */}
                  <div className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-b from-slate-600 to-slate-700 shadow-lg shadow-slate-900/50">
                    <img 
                      src="/images/battle/dragon.svg" 
                      alt="Dragon"
                      className="w-full h-full object-contain drop-shadow-lg"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                  {/* Fire breath effect when attacking */}
                  {dragonAnim === 'attack' && (
                    <div className="absolute top-1/2 -left-12 w-24 h-8 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 rounded-full animate-pulse blur-sm" />
                  )}
                </div>
                
                {/* Dragon Damage Number */}
                {damageDisplay?.target === 'dragon' && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-display font-bold text-3xl text-yellow-400 animate-bounce">
                    -{damageDisplay.amount}
                  </div>
                )}
              </div>
            </div>

            {/* Defending Indicator */}
            {isDefending && (
              <div className="absolute bottom-24 left-16 bg-blue-500/80 text-white px-4 py-2 rounded-full font-body text-sm font-bold animate-pulse">
                🛡️ Shield Raised!
              </div>
            )}
          </div>

          {/* HP & Mana Bars */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Player Stats */}
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚔️</span>
                <span className="font-display font-bold text-white">Knight</span>
              </div>
              {/* HP Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--text-muted)]">HP</span>
                  <span className="text-white">{playerHp}/{playerMaxHp}</span>
                </div>
                <div className="h-3 bg-[var(--edge)] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(playerHp / playerMaxHp) * 100}%`,
                      backgroundColor: playerHp > 30 ? '#ff6b9d' : '#ff1744'
                    }}
                  />
                </div>
              </div>
              {/* Mana Bar */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--text-muted)]">MP</span>
                  <span className="text-white">{playerMana}/{playerMaxMana}</span>
                </div>
                <div className="h-2 bg-[var(--edge)] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-blue-400 transition-all duration-500"
                    style={{ width: `${(playerMana / playerMaxMana) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Dragon Stats */}
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2 justify-end">
                <span className="font-display font-bold text-white">Dragon</span>
                <span className="text-2xl">🐉</span>
              </div>
              {/* HP Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--text-muted)]">HP</span>
                  <span className="text-white">{dragonHp}/{dragonMaxHp}</span>
                </div>
                <div className="h-3 bg-[var(--edge)] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(dragonHp / dragonMaxHp) * 100}%`,
                      backgroundColor: dragonHp > 30 ? '#ffa726' : '#ff5722'
                    }}
                  />
                </div>
              </div>
              {/* Mana Bar */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--text-muted)]">MP</span>
                  <span className="text-white">{dragonMana}/{dragonMaxMana}</span>
                </div>
                <div className="h-2 bg-[var(--edge)] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-purple-400 transition-all duration-500"
                    style={{ width: `${(dragonMana / dragonMaxMana) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Battle Log */}
          <div className="glass-card rounded-xl p-4 mb-6 max-w-2xl mx-auto">
            <h3 className="font-display text-sm text-[var(--text-muted)] mb-2">📜 Battle Log</h3>
            <div className="space-y-1 font-body text-sm">
              {battleLog.map((log, i) => (
                <div key={i} className="text-[var(--text-secondary)]">{log}</div>
              ))}
            </div>
          </div>

          {/* Player Moves */}
          {turn === 'player' && gameState === 'playing' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-6">
              {PLAYER_MOVES.map((move) => {
                const canUse = playerMana >= move.manaCost;
                return (
                  <button
                    key={move.name}
                    onClick={() => handlePlayerMove(move)}
                    disabled={!canUse}
                    className={`p-4 rounded-xl font-display font-bold transition-all
                      ${canUse 
                        ? 'bg-gradient-to-br hover:scale-105 hover:shadow-lg' 
                        : 'bg-gray-700 opacity-50 cursor-not-allowed'}
                      ${move.type === 'attack' ? 'from-blue-500 to-blue-700 text-white border-2 border-blue-400' : ''}
                      ${move.type === 'heavy' ? 'from-red-500 to-red-700 text-white border-2 border-red-400' : ''}
                      ${move.type === 'defend' ? 'from-green-500 to-green-700 text-white border-2 border-green-400' : ''}
                      ${move.type === 'special' ? 'from-purple-500 to-purple-700 text-white border-2 border-purple-400' : ''}
                    `}
                  >
                    <div className="text-lg mb-1">
                      {move.type === 'attack' && '⚔️'}
                      {move.type === 'heavy' && '🔥'}
                      {move.type === 'defend' && '🛡️'}
                      {move.type === 'special' && '⚡'}
                    </div>
                    <div className="text-sm">{move.name}</div>
                    <div className="text-xs mt-1 opacity-80">
                      {move.damage > 0 ? `${move.damage} DMG` : 'Block'} • {move.manaCost} MP
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Waiting for Dragon */}
          {turn === 'enemy' && gameState === 'playing' && (
            <div className="text-center py-6">
              <div className="inline-flex items-center gap-3 glass-card rounded-xl px-6 py-3">
                <div className="w-8 h-8 border-4 border-[var(--mystic-magenta)] border-t-transparent rounded-full animate-spin" />
                <span className="font-display text-[var(--mystic-magenta)]">Dragon is attacking...</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {gameState === 'won' && (
              <button
                onClick={collectRewards}
                className="btn-primary text-lg px-8 py-4 animate-pulse"
              >
                🎁 Collect Rewards!
              </button>
            )}
            
            {gameState === 'lost' && (
              <button
                onClick={resetGame}
                className="btn-primary text-lg px-8 py-4 bg-gradient-to-r from-red-500 to-red-600"
              >
                🔄 Try Again
              </button>
            )}
            
            <Link href="/rpg">
              <button className="btn-secondary">
                ← Back to RPG
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
