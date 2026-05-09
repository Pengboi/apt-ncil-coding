// ============================================================
// TACTICAL OPS - Game Constants
// ============================================================

// ------------------------------------------------------------
// Canvas & Display
// ------------------------------------------------------------
export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 700;
export const FPS = 60;
export const DT = 1 / FPS;  // Delta time in seconds

// ------------------------------------------------------------
// Physics
// ------------------------------------------------------------
export const GRAVITY = 900;         // Pixels per second squared (reduced for easier jumping)
export const FRICTION = 0.88;       // Ground friction (0-1)
export const AIR_RESISTANCE = 0.99; // Air resistance (0-1)

// ------------------------------------------------------------
// Player Constants
// ------------------------------------------------------------
export const PLAYER_WIDTH = 32;
export const PLAYER_HEIGHT = 48;
export const PLAYER_START_HP = 100;
export const PLAYER_START_SPEED = 320;  // Faster movement
export const PLAYER_JUMP_FORCE = 420;   // Slightly lower but with less gravity = easier jumps
export const PLAYER_COLOR = '#2ecc71';  // Green

// Starting stats
export const STARTING_STATS = {
  maxHealth: 100,
  damage: 1,
  speed: 1.2,      // Slightly faster
  fireRate: 1,
};

// Level progression
export const XP_BASE = 100;
export const XP_MULTIPLIER = 1.5;

// ------------------------------------------------------------
// Camera Constants
// ------------------------------------------------------------
export const CAMERA_SMOOTHNESS = 0.1;
export const CAMERA_DEADZONE_X = 100;  // Don't move camera if player within this range
export const CAMERA_DEADZONE_Y = 50;

// ------------------------------------------------------------
// Weapon Definitions
// ------------------------------------------------------------
import { Weapon } from './types';

export const WEAPONS: Weapon[] = [
  {
    id: 'pistol',
    name: 'Pistol',
    damage: 15,
    fireRate: 4,
    bulletSpeed: 600,
    ammo: 12,
    maxAmmo: 12,
    reloadTime: 1.0,
    isUnlocked: true,
    isTemporary: false,
    color: '#f1c40f',
  },
  {
    id: 'rifle',
    name: 'Assault Rifle',
    damage: 25,
    fireRate: 8,
    bulletSpeed: 800,
    ammo: 30,
    maxAmmo: 30,
    reloadTime: 1.5,
    isUnlocked: false,
    isTemporary: false,
    color: '#f1c40f',
  },
  {
    id: 'shotgun',
    name: 'Shotgun',
    damage: 40,
    fireRate: 2,
    bulletSpeed: 500,
    ammo: 8,
    maxAmmo: 8,
    reloadTime: 2.0,
    isUnlocked: false,
    isTemporary: false,
    color: '#f1c40f',
  },
  {
    id: 'sniper',
    name: 'Sniper Rifle',
    damage: 80,
    fireRate: 1,
    bulletSpeed: 1200,
    ammo: 5,
    maxAmmo: 5,
    reloadTime: 2.5,
    isUnlocked: false,
    isTemporary: false,
    color: '#f1c40f',
  },
  {
    id: 'lmg',
    name: 'LMG',
    damage: 20,
    fireRate: 12,
    bulletSpeed: 700,
    ammo: 100,
    maxAmmo: 100,
    reloadTime: 3.0,
    isUnlocked: false,
    isTemporary: false,
    color: '#f1c40f',
  },
];

// ------------------------------------------------------------
// Enemy Definitions
// ------------------------------------------------------------
export const ENEMY_CONFIGS = {
  grunt: {
    width: 28,
    height: 40,
    hp: 40,
    damage: 10,
    speed: 80,
    xpValue: 20,
    color: '#e74c3c',
    respawnOnReenter: true,
    detectionRange: 200,
    attackRange: 30,
  },
  soldier: {
    width: 30,
    height: 44,
    hp: 70,
    damage: 15,
    speed: 100,
    xpValue: 40,
    color: '#c0392b',
    respawnOnReenter: true,
    detectionRange: 300,
    attackRange: 200,
  },
  drone: {
    width: 24,
    height: 24,
    hp: 30,
    damage: 12,
    speed: 150,
    xpValue: 35,
    color: '#e67e22',
    respawnOnReenter: true,
    detectionRange: 250,
    attackRange: 50,
  },
  heavy: {
    width: 40,
    height: 56,
    hp: 150,
    damage: 25,
    speed: 60,
    xpValue: 100,
    color: '#8e44ad',
    respawnOnReenter: false,
    detectionRange: 250,
    attackRange: 40,
  },
  boss: {
    width: 80,
    height: 100,
    hp: 800,
    damage: 40,
    speed: 90,
    xpValue: 1000,
    color: '#c0392b',
    respawnOnReenter: false,
    detectionRange: 400,
    attackRange: 100,
  },
};

// ------------------------------------------------------------
// Pickup Definitions
// ------------------------------------------------------------
export const PICKUP_CONFIGS = {
  medkit: {
    width: 24,
    height: 24,
    color: '#2ecc71',
    healAmount: 25,
  },
  medkitLarge: {
    width: 32,
    height: 32,
    color: '#27ae60',
    healAmount: 50,
  },
  ammo: {
    width: 20,
    height: 20,
    color: '#f39c12',
    refillAmount: 30,
  },
  damageBoost: {
    width: 28,
    height: 28,
    color: '#e74c3c',
    multiplier: 2,
    duration: 10,
  },
  speedBoost: {
    width: 28,
    height: 28,
    color: '#3498db',
    multiplier: 1.5,
    duration: 10,
  },
  shield: {
    width: 28,
    height: 28,
    color: '#9b59b6',
    duration: 5,
  },
};

// ------------------------------------------------------------
// Save Point
// ------------------------------------------------------------
export const SAVE_POINT_WIDTH = 40;
export const SAVE_POINT_HEIGHT = 60;
export const SAVE_POINT_COLOR = '#3498db';
export const SAVE_POINT_COLOR_ACTIVE = '#2ecc71';

// ------------------------------------------------------------
// Area Themes
// ------------------------------------------------------------
export const AREA_THEMES = {
  bootcamp: {
    backgroundColor: '#87CEEB',
    platformColor: '#7f8c8d',
    groundColor: '#2ecc71',
  },
  city: {
    backgroundColor: '#34495e',
    platformColor: '#7f8c8d',
    groundColor: '#2c3e50',
  },
  bunker: {
    backgroundColor: '#2c3e50',
    platformColor: '#5d6d7e',
    groundColor: '#1a252f',
  },
  mountain: {
    backgroundColor: '#85c1e9',
    platformColor: '#aeb6bf',
    groundColor: '#ecf0f1',
  },
  hq: {
    backgroundColor: '#1a1a2e',
    platformColor: '#4a4a5a',
    groundColor: '#16213e',
  },
  skyfortress: {
    backgroundColor: '#4a69bd',
    platformColor: '#95a5a6',
    groundColor: '#576574',
  },
  volcanolab: {
    backgroundColor: '#5c1919',
    platformColor: '#8b4513',
    groundColor: '#3d0e0e',
  },
  voidcore: {
    backgroundColor: '#0c0c1a',
    platformColor: '#2d1b4e',
    groundColor: '#1a0b2e',
  },
};

// ------------------------------------------------------------
// Colors
// ------------------------------------------------------------
export const COLORS = {
  // UI
  uiBackground: 'rgba(0, 0, 0, 0.7)',
  uiText: '#ecf0f1',
  uiHealth: '#e74c3c',
  uiHealthBg: '#2c3e50',
  uiXp: '#3498db',
  uiXpBg: '#2c3e50',
  
  // Effects
  muzzleFlash: '#f39c12',
  bulletTracer: '#f1c40f',
  explosion: '#e74c3c',
  
  // Entities
  player: '#2ecc71',
  enemyGrunt: '#e74c3c',
  enemySoldier: '#c0392b',
  enemyDrone: '#e67e22',
  enemyHeavy: '#8e44ad',
  enemyBoss: '#c0392b',
  platform: '#7f8c8d',
  savePoint: '#3498db',
  savePointActive: '#2ecc71',
};
