'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
  Character, 
  CharacterStats, 
  ClassType, 
  Equipment, 
  ArmorSlot,
  LootDrop,
  EnemyTier,
  Dungeon,
  Room,
  SkillNode,
  GameSession,
  ChatMessage,
  EnchantmentRecipe,
  Weapon
} from '../types';
import { CLASSES, ENCHANTMENT_RECIPES, MATERIALS } from '../gameData';
import { 
  calculateDerivedStats, 
  calculateTotalStats,
  generateLoot,
  generateDungeon,
  xpForLevel,
  unlockSkill,
  upgradeItem,
  applyEnchantment,
  compareItems,
  generateSessionId,
  createSystemMessage
} from '../utils';

export function useGameState() {
  // Character State
  const [character, setCharacter] = useState<Character | null>(null);
  const [inventory, setInventory] = useState<(Weapon | Equipment)[]>([]);
  const [gameLog, setGameLog] = useState<string[]>([]);
  
  // UI State
  const [lastLoot, setLastLoot] = useState<LootDrop | null>(null);
  const [showLootModal, setShowLootModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'character' | 'skills' | 'dungeon' | 'enchant' | 'multiplayer'>('character');
  
  // Dungeon State
  const [currentDungeon, setCurrentDungeon] = useState<Dungeon | null>(null);
  const [dungeonHistory, setDungeonHistory] = useState<Dungeon[]>([]);
  
  // Skill State
  const [skillNodes, setSkillNodes] = useState<SkillNode[]>([]);
  
  // Enchanting State
  const [selectedRecipe, setSelectedRecipe] = useState<EnchantmentRecipe | null>(null);
  const [selectedItemForEnchant, setSelectedItemForEnchant] = useState<Weapon | Equipment | null>(null);
  
  // Upgrade State
  const [selectedItemForUpgrade, setSelectedItemForUpgrade] = useState<Weapon | Equipment | null>(null);
  
  // Multiplayer State
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isHost, setIsHost] = useState(false);

  // Initialize skill tree when character is created
  useEffect(() => {
    if (character) {
      const classData = CLASSES.find(c => c.id === character.classType);
      if (classData) {
        setSkillNodes(classData.skillTree.nodes);
      }
    }
  }, [character?.classType]);

  // Create new character
  const createCharacter = useCallback((name: string, classType: ClassType) => {
    const classData = CLASSES.find(c => c.id === classType);
    if (!classData) return;

    const newCharacter: Character = {
      id: `char_${Date.now()}`,
      name,
      classType,
      level: 1,
      stats: { ...classData.startingStats },
      equippedWeapon: classData.startingWeapon,
      equippedArmor: {
        head: null, chest: null, legs: null, hands: null,
        feet: null, ring1: null, ring2: null, amulet: null
      },
      inventory: [],
      experience: 0,
      skillPoints: 0,
      unlockedSkills: [],
      gold: 100,
      materials: {},
      dungeonProgress: {
        currentDungeon: null,
        completedDungeons: [],
        totalRuns: 0,
        bestRun: null
      }
    };

    setCharacter(newCharacter);
    setInventory([]);
    setGameLog([`Welcome, ${name} the ${classData.name}!`]);
    setActiveTab('character');
  }, []);

  // Level up with skill points
  const levelUp = useCallback((statIncreases: Partial<CharacterStats>) => {
    if (!character) return;

    const totalPoints = Object.values(statIncreases).reduce((a, b) => (a || 0) + (b || 0), 0);
    if (totalPoints !== 3) {
      console.error('Must distribute exactly 3 points');
      return;
    }

    const newStats = { ...character.stats };
    Object.entries(statIncreases).forEach(([stat, value]) => {
      if (value && value > 0) {
        newStats[stat as keyof CharacterStats] += value;
      }
    });

    setCharacter({
      ...character,
      level: character.level + 1,
      stats: newStats,
      experience: 0,
      skillPoints: character.skillPoints + 1 // Gain skill point on level up
    });

    addToLog(`Level up! You are now level ${character.level + 1}. Gained 1 skill point!`);
  }, [character]);

  // Add experience
  const addExperience = useCallback((amount: number) => {
    if (!character) return;

    const newExp = character.experience + amount;
    const xpNeeded = xpForLevel(character.level);

    setCharacter({ ...character, experience: newExp });
    
    if (newExp >= xpNeeded) {
      addToLog(`Level up available! You have enough XP to reach level ${character.level + 1}`);
    }
  }, [character]);

  // Add gold
  const addGold = useCallback((amount: number) => {
    if (!character) return;
    setCharacter({ ...character, gold: character.gold + amount });
  }, [character]);

  // Add materials
  const addMaterials = useCallback((materials: Record<string, number>) => {
    if (!character) return;
    
    const newMaterials = { ...character.materials };
    Object.entries(materials).forEach(([key, amount]) => {
      newMaterials[key] = (newMaterials[key] || 0) + amount;
    });
    
    setCharacter({ ...character, materials: newMaterials });
  }, [character]);

  // Equipment Management
  const equipArmor = useCallback((equipment: Equipment) => {
    if (!character) return;

    const oldItem = character.equippedArmor[equipment.slot];
    
    setCharacter({
      ...character,
      equippedArmor: {
        ...character.equippedArmor,
        [equipment.slot]: equipment
      }
    });

    if (oldItem) {
      setInventory(prev => [...prev, oldItem]);
    }

    setInventory(prev => prev.filter(item => item.id !== equipment.id));
    addToLog(`Equipped ${equipment.name}`);
  }, [character]);

  const unequipArmor = useCallback((slot: ArmorSlot) => {
    if (!character) return;

    const item = character.equippedArmor[slot];
    if (!item) return;

    setCharacter({
      ...character,
      equippedArmor: { ...character.equippedArmor, [slot]: null }
    });

    setInventory(prev => [...prev, item]);
    addToLog(`Unequipped ${item.name}`);
  }, [character]);

  const removeFromInventory = useCallback((itemId: string) => {
    setInventory(prev => prev.filter(item => item.id !== itemId));
  }, []);

  // ===== SKILL TREE =====
  const unlockSkillNode = useCallback((nodeId: string) => {
    if (!character || character.skillPoints <= 0) return;

    const result = unlockSkill(nodeId, skillNodes, character.unlockedSkills, character.skillPoints);
    
    if (result.success) {
      setSkillNodes(result.nodes);
      setCharacter({
        ...character,
        skillPoints: result.points,
        unlockedSkills: [...character.unlockedSkills, nodeId]
      });
      
      const node = skillNodes.find(n => n.id === nodeId);
      if (node) {
        addToLog(`Unlocked ${node.name}!`);
      }
    }
  }, [character, skillNodes]);

  // ===== DUNGEON SYSTEM =====
  const startDungeon = useCallback((dungeonId: string) => {
    if (!character) return;
    
    const dungeon = generateDungeon(dungeonId, character.level);
    setCurrentDungeon(dungeon);
    setCharacter({
      ...character,
      dungeonProgress: {
        ...character.dungeonProgress,
        currentDungeon: dungeonId
      }
    });
    addToLog(`Entered ${dungeon.name}!`);
  }, [character]);

  const moveToRoom = useCallback((roomId: string) => {
    if (!currentDungeon) return;
    
    const room = currentDungeon.rooms.find(r => r.id === roomId);
    if (!room) return;
    
    // Update current room
    setCurrentDungeon({
      ...currentDungeon,
      currentRoom: roomId,
      rooms: currentDungeon.rooms.map(r => 
        r.id === roomId ? { ...r, visited: true } : r
      )
    });
    
    // Handle room events
    if (room.type === 'combat' || room.type === 'elite') {
      const tier: EnemyTier = room.type === 'elite' ? 'elite' : 'soldier';
      const loot = generateLoot(character?.level || 1, tier);
      
      // Add loot
      loot.equipment.forEach(item => setInventory(prev => [...prev, item]));
      if (loot.gold) addGold(loot.gold);
      if (loot.materials) addMaterials(loot.materials);
      
      addToLog(`Cleared ${room.type} room! Found ${loot.equipment.length} items.`);
    } else if (room.type === 'treasure') {
      const loot = generateLoot(character?.level || 1, 'champion');
      loot.equipment.forEach(item => setInventory(prev => [...prev, item]));
      addToLog('Found treasure chest!');
    } else if (room.type === 'boss') {
      const bossNames = ['Iron Golem', 'Shadow Demon', 'Flame Tyrant'];
      const bossName = bossNames[Math.floor(Math.random() * bossNames.length)];
      const loot = generateLoot(character?.level || 1, 'boss', bossName);
      
      loot.equipment.forEach(item => setInventory(prev => [...prev, item]));
      addToLog(`Defeated ${bossName}! Legendary drop!`);
      
      // Complete dungeon
      setCurrentDungeon({ ...currentDungeon, completed: true });
      if (character) {
        setCharacter({
          ...character,
          dungeonProgress: {
            ...character.dungeonProgress,
            completedDungeons: [...character.dungeonProgress.completedDungeons, currentDungeon.id],
            totalRuns: character.dungeonProgress.totalRuns + 1
          }
        });
      }
    }
  }, [currentDungeon, character]);

  const exitDungeon = useCallback(() => {
    if (currentDungeon && character) {
      setDungeonHistory(prev => [...prev, currentDungeon]);
      setCurrentDungeon(null);
      setCharacter({
        ...character,
        dungeonProgress: { ...character.dungeonProgress, currentDungeon: null }
      });
      addToLog('Exited dungeon.');
    }
  }, [currentDungeon, character]);

  // ===== ENCHANTING =====
  const enchantItem = useCallback((item: Weapon | Equipment, recipe: EnchantmentRecipe): boolean => {
    if (!character) return false;
    
    // Check materials
    const hasMaterials = Object.entries(recipe.materials).every(
      ([mat, amount]) => (character.materials[mat] || 0) >= amount
    );
    
    if (!hasMaterials || character.gold < recipe.goldCost) {
      return false;
    }
    
    // Roll success
    const roll = Math.random();
    if (roll > recipe.successRate) {
      addToLog('Enchantment failed!');
      // Still consume materials
      const newMaterials = { ...character.materials };
      Object.entries(recipe.materials).forEach(([mat, amount]) => {
        newMaterials[mat] = (newMaterials[mat] || 0) - amount;
      });
      setCharacter({ ...character, gold: character.gold - recipe.goldCost, materials: newMaterials });
      return false;
    }
    
    // Apply enchantment
    const enchantedItem = applyEnchantment(item, recipe.result);
    
    // Update inventory or equipment
    if (inventory.find(i => i.id === item.id)) {
      setInventory(prev => prev.map(i => i.id === item.id ? enchantedItem : i));
    } else {
      // It's equipped
      const slot = Object.entries(character.equippedArmor).find(([_, eq]) => eq?.id === item.id)?.[0] as ArmorSlot;
      if (slot) {
        setCharacter({
          ...character,
          equippedArmor: { ...character.equippedArmor, [slot]: enchantedItem as Equipment }
        });
      }
    }
    
    // Consume materials
    const newMaterials = { ...character.materials };
    Object.entries(recipe.materials).forEach(([mat, amount]) => {
      newMaterials[mat] = (newMaterials[mat] || 0) - amount;
    });
    
    setCharacter({ 
      ...character, 
      gold: character.gold - recipe.goldCost,
      materials: newMaterials
    });
    
    addToLog(`Successfully applied ${recipe.name} to ${item.name}!`);
    return true;
  }, [character, inventory]);

  // ===== UPGRADING =====
  const upgradeEquipment = useCallback((item: Weapon | Equipment): { success: boolean; item: Weapon | Equipment } => {
    if (!character) return { success: false, item };
    
    const costs = {
      gold: 50 * Math.pow(2, item.upgradeLevel || 0),
      materials: { 'upgrade_shard': (item.upgradeLevel || 0) + 1 }
    };
    
    // Check resources
    if (character.gold < costs.gold || (character.materials['upgrade_shard'] || 0) < costs.materials['upgrade_shard']) {
      addToLog('Not enough resources to upgrade!');
      return { success: false, item };
    }
    
    const result = upgradeItem(item);
    
    if (result.success) {
      // Update item in inventory or equipment
      if (inventory.find(i => i.id === item.id)) {
        setInventory(prev => prev.map(i => i.id === item.id ? result.item : i));
      } else {
        const slot = Object.entries(character.equippedArmor).find(([_, eq]) => eq?.id === item.id)?.[0] as ArmorSlot;
        if (slot) {
          setCharacter({
            ...character,
            equippedArmor: { ...character.equippedArmor, [slot]: result.item as Equipment }
          });
        }
      }
      
      // Consume resources
      const newMaterials = { ...character.materials };
      newMaterials['upgrade_shard'] = (newMaterials['upgrade_shard'] || 0) - costs.materials['upgrade_shard'];
      
      setCharacter({
        ...character,
        gold: character.gold - costs.gold,
        materials: newMaterials
      });
      
      addToLog(`Upgraded ${item.name} to +${(result.item.upgradeLevel || 0)}!`);
    } else {
      // Still consume some resources on failure
      const newMaterials = { ...character.materials };
      newMaterials['upgrade_shard'] = Math.max(0, (newMaterials['upgrade_shard'] || 0) - Math.ceil(costs.materials['upgrade_shard'] / 2));
      
      setCharacter({
        ...character,
        materials: newMaterials
      });
      addToLog(`Upgrade failed for ${item.name}! Lost half materials.`);
    }
    
    return result;
  }, [character, inventory]);

  // ===== MULTIPLAYER =====
  const createSession = useCallback((sessionName: string, maxPlayers: number = 4) => {
    if (!character) return;
    
    const session: GameSession = {
      id: generateSessionId(),
      name: sessionName,
      hostId: character.id,
      players: [{
        id: character.id,
        name: character.name,
        character,
        isHost: true,
        isReady: true,
        connectionStatus: 'connected'
      }],
      maxPlayers,
      status: 'lobby',
      difficulty: 'normal'
    };
    
    setGameSession(session);
    setIsHost(true);
    setChatMessages([createSystemMessage('Session created! Share the code: ' + session.id)]);
  }, [character]);

  const joinSession = useCallback((sessionId: string) => {
    if (!character) return;
    
    // Simulate joining (in real implementation, this would connect to server)
    const mockSession: GameSession = {
      id: sessionId,
      name: 'Adventure Party',
      hostId: 'other_player',
      players: [
        {
          id: 'other_player',
          name: 'Host Player',
          character: character, // placeholder
          isHost: true,
          isReady: true,
          connectionStatus: 'connected'
        },
        {
          id: character.id,
          name: character.name,
          character,
          isHost: false,
          isReady: false,
          connectionStatus: 'connected'
        }
      ],
      maxPlayers: 4,
      status: 'lobby',
      difficulty: 'normal'
    };
    
    setGameSession(mockSession);
    setIsHost(false);
    setChatMessages([createSystemMessage(`Joined session ${sessionId}`)]);
  }, [character]);

  const sendChatMessage = useCallback((message: string) => {
    if (!character || !gameSession) return;
    
    const msg: ChatMessage = {
      id: `msg_${Date.now()}`,
      playerId: character.id,
      playerName: character.name,
      message,
      timestamp: Date.now(),
      type: 'chat'
    };
    
    setChatMessages(prev => [...prev, msg]);
  }, [character, gameSession]);

  const toggleReady = useCallback(() => {
    if (!gameSession || !character) return;
    
    setGameSession({
      ...gameSession,
      players: gameSession.players.map(p => 
        p.id === character.id ? { ...p, isReady: !p.isReady } : p
      )
    });
  }, [gameSession, character]);

  const startGame = useCallback(() => {
    if (!gameSession || !isHost) return;
    
    setGameSession({ ...gameSession, status: 'playing' });
    setChatMessages(prev => [...prev, createSystemMessage('Game starting!')]);
    
    // Start shared dungeon
    const dungeon = generateDungeon('multiplayer_dungeon', character?.level || 1);
    setCurrentDungeon(dungeon);
  }, [gameSession, isHost, character]);

  // ===== COMBAT =====
  const fightEnemy = useCallback((enemyLevel: number, tier: EnemyTier, bossName?: string) => {
    const loot = generateLoot(enemyLevel, tier, bossName);
    setLastLoot(loot);
    setShowLootModal(true);

    loot.equipment.forEach(item => setInventory(prev => [...prev, item]));
    if (loot.gold) addGold(loot.gold);
    if (loot.materials) addMaterials(loot.materials);

    const xpGain = Math.floor(enemyLevel * (tier === 'boss' ? 50 : tier === 'champion' ? 20 : 10));
    if (character) {
      addExperience(xpGain);
    }

    const enemyLabel = bossName || `${tier} enemy`;
    addToLog(`Defeated ${enemyLabel}! Gained ${xpGain} XP and found ${loot.equipment.length} items.`);

    return loot;
  }, [character, addExperience]);

  // Logging
  const addToLog = useCallback((message: string) => {
    setGameLog(prev => [message, ...prev].slice(0, 50));
  }, []);

  // Get character with calculated stats
  const getCharacterWithStats = useCallback(() => {
    if (!character) return null;

    const { stats, bonuses } = calculateTotalStats(
      character.stats,
      character.equippedArmor,
      character.unlockedSkills,
      skillNodes
    );

    const baseDerived = calculateDerivedStats(character.stats);
    const effectiveDerived = calculateDerivedStats(stats);

    return {
      ...character,
      effectiveStats: stats,
      derivedStats: {
        ...effectiveDerived,
        maxHp: Math.floor(effectiveDerived.maxHp * (1 + bonuses.hpBonus / 100)),
        critChance: effectiveDerived.critChance + bonuses.critChance,
        staminaRegen: effectiveDerived.staminaRegen * (1 + bonuses.staminaRegen / 100),
        defense: effectiveDerived.defense + bonuses.defense
      },
      bonuses,
      skillNodes
    };
  }, [character, skillNodes]);

  // Close loot modal
  const closeLootModal = useCallback(() => {
    setShowLootModal(false);
    setLastLoot(null);
  }, []);

  return {
    // State
    character,
    inventory,
    gameLog,
    lastLoot,
    showLootModal,
    activeTab,
    setActiveTab,
    currentDungeon,
    skillNodes,
    gameSession,
    chatMessages,
    isHost,
    
    // Character
    createCharacter,
    levelUp,
    addExperience,
    getCharacterWithStats,
    closeLootModal,
    
    // Equipment
    equipArmor,
    unequipArmor,
    removeFromInventory,
    
    // Skills
    unlockSkillNode,
    
    // Dungeon
    startDungeon,
    moveToRoom,
    exitDungeon,
    
    // Enchanting
    enchantItem,
    upgradeEquipment,
    ENCHANTMENT_RECIPES,
    
    // Multiplayer
    createSession,
    joinSession,
    sendChatMessage,
    toggleReady,
    startGame,
    
    // Combat
    fightEnemy,
    addToLog,
    
    // Utils
    compareItems
  };
}
