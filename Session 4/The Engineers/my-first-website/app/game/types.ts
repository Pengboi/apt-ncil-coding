// ============================================================
// TACTICAL OPS - TypeScript Types & Interfaces
// ============================================================

// ------------------------------------------------------------
// Core Vector & Position Types
// ------------------------------------------------------------
export interface Vector2 {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

// ------------------------------------------------------------
// Player Types
// ------------------------------------------------------------
export interface PlayerStats {
  maxHealth: number;
  damage: number;
  speed: number;
  fireRate: number;
}

export interface Player {
  // Position & Physics
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  
  // State
  isGrounded: boolean;
  isCrouching: boolean;
  isFacingRight: boolean;
  
  // Health & Combat
  hp: number;
  maxHp: number;
  
  // Progression
  level: number;
  xp: number;
  xpToNextLevel: number;
  statPoints: number;
  stats: PlayerStats;
  
  // World
  currentAreaId: string;
  unlockedAreas: string[];
  
  // Weapons
  weapons: Weapon[];
  currentWeaponIndex: number;
}

// ------------------------------------------------------------
// Weapon Types
// ------------------------------------------------------------
export interface Weapon {
  id: string;
  name: string;
  damage: number;
  fireRate: number;      // Shots per second
  bulletSpeed: number;
  ammo: number;
  maxAmmo: number;
  reloadTime: number;    // Seconds
  isUnlocked: boolean;
  isTemporary: boolean;
  color: string;         // Bullet color
}

// ------------------------------------------------------------
// Enemy Types
// ------------------------------------------------------------
export type EnemyType = 'grunt' | 'soldier' | 'drone' | 'heavy';

export interface Enemy {
  // Position & Physics
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  
  // Stats
  type: EnemyType;
  hp: number;
  maxHp: number;
  damage: number;
  speed: number;
  xpValue: number;
  
  // State
  isFacingRight: boolean;
  isDead: boolean;
  respawnOnReenter: boolean;  // Grunts = true, specials = false
  
  // AI
  patrolStartX: number;
  patrolEndX: number;
  detectionRange: number;
  attackRange: number;
  lastAttackTime: number;
}

// ------------------------------------------------------------
// Bullet/Projectile Types
// ------------------------------------------------------------
export interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  damage: number;
  isPlayerBullet: boolean;
  color: string;
  lifeTime: number;      // Seconds remaining
}

// ------------------------------------------------------------
// Pickup Types
// ------------------------------------------------------------
export type PickupType = 'medkit' | 'ammo' | 'damageBoost' | 'speedBoost' | 'shield' | 'weapon';

export interface Pickup {
  x: number;
  y: number;
  width: number;
  height: number;
  type: PickupType;
  value: number;         // Heal amount, boost multiplier, etc.
  duration: number;      // 0 = instant, else seconds
  weaponId?: string;     // For weapon pickups
  isCollected: boolean;
}

// ------------------------------------------------------------
// World/Area Types
// ------------------------------------------------------------
export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface SavePoint {
  x: number;
  y: number;
  width: number;
  height: number;
  isActivated: boolean;
  areaId: string;
}

export interface AreaConnection {
  toAreaId: string;
  fromX: number;
  fromY: number;
  toSpawnX: number;
  toSpawnY: number;
}

export interface Area {
  id: string;
  name: string;
  theme: 'bootcamp' | 'city' | 'bunker' | 'mountain' | 'hq';
  width: number;
  height: number;
  backgroundColor: string;
  platforms: Platform[];
  enemies: Enemy[];
  pickups: Pickup[];
  savePoints: SavePoint[];
  connections: AreaConnection[];
  playerSpawn: Vector2;
}

// ------------------------------------------------------------
// Save System Types
// ------------------------------------------------------------
export interface SaveData {
  player: Player;
  timestamp: number;
  playTime: number;
  areasDiscovered: string[];
  enemiesKilled: number;
  currentAreaId: string;
}

// ------------------------------------------------------------
// Game State Types
// ------------------------------------------------------------
export type GameScreen = 'menu' | 'playing' | 'paused' | 'gameOver' | 'levelUp' | 'map';

export interface GameState {
  screen: GameScreen;
  lastSavePoint: SavePoint | null;
  isPaused: boolean;
  enemiesKilled: number;
  areasDiscovered: string[];
  playTime: number;
}

// ------------------------------------------------------------
// Input Types
// ------------------------------------------------------------
export interface InputState {
  // Movement
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  jump: boolean;
  
  // Combat
  shoot: boolean;
  reload: boolean;
  weaponSlots: boolean[];  // [0] = slot 1, etc.
  
  // Interaction
  interact: boolean;
  
  // Mouse
  mouseX: number;
  mouseY: number;
  mouseWorldX: number;
  mouseWorldY: number;
}

// ------------------------------------------------------------
// Camera Types
// ------------------------------------------------------------
export interface Camera {
  x: number;
  y: number;
  width: number;
  height: number;
  targetX: number;
  targetY: number;
  smoothness: number;
}
