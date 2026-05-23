'use client';

import { useEffect, useRef, useState } from 'react';

const TILE = 32, COLS = 100, ROWS = 80;
function det(x: number, y: number, s: number) { return Math.abs((Math.sin(x * 12.9898 + y * 78.233 + s) * 43758.5453) % 1); }
const T = {
  GRASS: 0, DIRT: 1, PATH: 2, WATER: 3, TREE: 4, WALL: 5,
  BRIDGE_H: 6, BRIDGE_V: 7, FLOWER: 8, TALL_GRASS: 9,
  HOUSE_WALL: 10, HOUSE_ROOF: 11, HOUSE_DOOR: 12, FLOOR: 13,
  FENCE: 14, DEEP_WATER: 15, SAND: 16, STONE: 17, SIGN: 18,
  ROCK: 19, RUINS: 20,
};

function makeMap() {
  const m = Array.from({ length: ROWS }, () => new Array(COLS).fill(T.GRASS));
  const B = (x: number, y: number) => x >= 0 && x < COLS && y >= 0 && y < ROWS;
  const R = (c: number) => Math.random() < c;

  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++)
    if (x < 3 || x >= COLS - 3 || y < 3 || y >= ROWS - 3) m[y][x] = T.DEEP_WATER;

  function fill(x1: number, y1: number, x2: number, y2: number, t: number) {
    for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++)
      if (B(x, y)) m[y][x] = t;
  }

  function fillIf(x1: number, y1: number, x2: number, y2: number, t: number, cond: number) {
    for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++)
      if (B(x, y) && m[y][x] === cond) m[y][x] = t;
  }

  function path(pts: [number, number][]) {
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      const st = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1), 1);
      for (let s = 0; s <= st; s++) {
        const t = s / st, px = Math.round(x1 + (x2 - x1) * t), py = Math.round(y1 + (y2 - y1) * t);
        for (let dy = -1; dy <= 1; dy++) for (let dx = -2; dx <= 2; dx++)
          if (B(px + dx, py + dy) && m[py + dy][px + dx] !== T.DEEP_WATER && m[py + dy][px + dx] !== T.WATER)
            m[py + dy][px + dx] = T.DIRT;
      }
    }
  }

  function sprinkle(x1: number, y1: number, x2: number, y2: number, tiles: [number, number][]) {
    for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++) {
      if (!B(x, y) || m[y][x] !== T.GRASS) continue;
      for (const [t, c] of tiles) { if (R(c)) { m[y][x] = t; break; } }
    }
  }

  // ============ RIVER ============
  fill(33, 3, 36, 22, T.WATER);
  fill(34, 22, 38, 28, T.WATER);
  fill(35, 28, 37, 50, T.WATER);
  fill(34, 50, 36, 56, T.WATER);
  fill(32, 56, 37, 68, T.WATER);
  fill(34, 68, 36, 76, T.WATER);
  // Bridge
  fill(33, 27, 38, 28, T.DIRT);
  // Additional water bodies
  fill(60, 40, 65, 45, T.WATER); // village pond
  fill(40, 5, 42, 8, T.WATER); // northern spring

  // ============ SHADOW FOREST (NW) ============
  sprinkle(3, 3, 32, 28, [[T.TREE, 0.5], [T.TALL_GRASS, 0.2], [T.FLOWER, 0.08], [T.ROCK, 0.04]]);
  // Cave entrance
  fill(6, 10, 12, 16, T.ROCK);
  fill(7, 11, 11, 15, T.STONE);
  fill(8, 12, 10, 14, T.DEEP_WATER);
  // Secret flower clearing
  fill(20, 14, 25, 19, T.GRASS);
  fillIf(20, 14, 25, 19, T.FLOWER, T.GRASS);
  // Forest edge meadow
  sprinkle(30, 22, 33, 28, [[T.FLOWER, 0.3], [T.TALL_GRASS, 0.2]]);

  // ============ ROOKWOOD RUINS (NE) ============
  sprinkle(50, 5, 73, 22, [[T.TREE, 0.25], [T.ROCK, 0.1]]);
  fill(55, 7, 69, 20, T.RUINS);
  fill(57, 9, 67, 18, T.FLOOR);
  fill(58, 10, 62, 15, T.RUINS);
  fill(63, 10, 66, 15, T.RUINS);
  sprinkle(55, 7, 69, 20, [[T.ROCK, 0.2], [T.TALL_GRASS, 0.15]]);
  fill(57, 17, 67, 18, T.GRASS); // path through ruins
  // Fallen tree across ruins path
  m[16][62] = T.TREE;

  // ============ NORTHERN MEADOW (Gap fill between river & ruins) ============
  sprinkle(38, 3, 49, 24, [[T.FLOWER, 0.2], [T.TALL_GRASS, 0.15], [T.TREE, 0.1], [T.ROCK, 0.05]]);
  // Stone shrine
  fill(44, 12, 46, 14, T.STONE);
  m[13][45] = T.FLOWER;
  // Winding animal trail
  for (let y = 5; y <= 22; y++) { if (R(0.3) && m[y][38] === T.GRASS) m[y][38] = T.DIRT; }
  for (let x = 38; x <= 48; x++) { if (R(0.3) && m[12][x] === T.GRASS) m[12][x] = T.DIRT; }
  // Small pond
  fill(46, 6, 48, 8, T.WATER);

  // ============ EASTERN HILLS ============
  sprinkle(75, 3, 97, 45, [[T.ROCK, 0.25], [T.TREE, 0.2], [T.TALL_GRASS, 0.1]]);
  // Rocky ridge line
  fill(80, 8, 82, 40, T.ROCK);
  fill(85, 5, 87, 35, T.ROCK);
  fill(92, 10, 94, 30, T.ROCK);
  // Hilltop clearing with view
  fill(88, 20, 91, 24, T.GRASS);
  fillIf(88, 20, 91, 24, T.FLOWER, T.GRASS);

  // ============ VILLAGE OF ROOKWOOD ============
  // Rookwood Manor (preserved exactly from original)
  fill(45, 25, 60, 35, T.GRASS);
  fill(48, 25, 57, 25, T.HOUSE_WALL);
  fill(48, 26, 57, 26, T.HOUSE_ROOF);
  m[34][52] = T.HOUSE_DOOR;
  fill(49, 27, 56, 33, T.FLOOR);
  fill(48, 35, 57, 35, T.HOUSE_WALL);

  // House 2 ÔÇö West of Manor
  fill(34, 30, 42, 37, T.GRASS);
  fill(34, 30, 42, 30, T.HOUSE_ROOF);
  fill(34, 31, 42, 37, T.HOUSE_WALL);
  m[37][38] = T.HOUSE_DOOR;
  fill(35, 32, 41, 36, T.FLOOR);

  // House 3 ÔÇö South of Manor
  fill(46, 38, 54, 45, T.GRASS);
  fill(46, 38, 54, 38, T.HOUSE_ROOF);
  fill(46, 39, 54, 45, T.HOUSE_WALL);
  m[45][50] = T.HOUSE_DOOR;
  fill(47, 40, 53, 44, T.FLOOR);

  // House 4 ÔÇö Southwest
  fill(34, 40, 42, 47, T.GRASS);
  fill(34, 40, 42, 40, T.HOUSE_ROOF);
  fill(34, 41, 42, 47, T.HOUSE_WALL);
  m[47][38] = T.HOUSE_DOOR;
  fill(35, 42, 41, 46, T.FLOOR);

  // House 5 ÔÇö East edge of village
  fill(56, 32, 63, 38, T.GRASS);
  fill(56, 32, 63, 32, T.HOUSE_ROOF);
  fill(56, 33, 63, 38, T.HOUSE_WALL);
  m[38][60] = T.HOUSE_DOOR;
  fill(57, 34, 62, 37, T.FLOOR);

  // Village dirt roads
  path([[36, 28], [36, 30], [38, 32], [38, 37]]); // from bridge down into village
  path([[38, 37], [44, 37], [48, 37]]);
  path([[48, 37], [48, 38], [48, 45]]);
  path([[38, 30], [44, 30], [48, 30]]);
  path([[44, 37], [44, 28], [42, 28], [36, 28]]);
  path([[56, 35], [58, 35], [60, 35], [63, 34]]);
  path([[48, 45], [50, 47], [55, 47], [60, 45]]);

  // Village square
  fill(44, 34, 48, 36, T.FLOOR);
  m[36][49] = T.SIGN;
  m[28][42] = T.SIGN; // crossroads sign

  // Well in village square
  fill(45, 35, 47, 35, T.STONE);
  fill(46, 36, 46, 36, T.DEEP_WATER);

  // Fences around village gardens
  for (let x = 33; x <= 41; x++) { m[29][x] = T.FENCE; }
  for (let x = 55; x <= 63; x++) { m[31][x] = T.FENCE; }
  for (let y = 38; y <= 44; y++) { m[y][55] = T.FENCE; }
  for (let x = 34; x <= 42; x++) { m[48][x] = T.FENCE; }

  // Village decorations
  sprinkle(30, 28, 55, 47, [[T.FLOWER, 0.06], [T.TALL_GRASS, 0.04]]);
  // Trees in village
  m[28][34] = T.TREE; m[28][50] = T.TREE; m[30][54] = T.TREE;
  m[47][32] = T.TREE; m[43][55] = T.TREE; m[39][44] = T.TREE;
  m[35][50] = T.TREE;

  // ============ FARMLAND (SW) ============
  sprinkle(3, 50, 30, 76, [[T.FLOWER, 0.3], [T.TALL_GRASS, 0.2], [T.TREE, 0.04], [T.ROCK, 0.02]]);
  // Farmhouse
  fill(10, 54, 18, 61, T.GRASS);
  fill(10, 54, 18, 54, T.HOUSE_ROOF);
  fill(10, 55, 18, 61, T.HOUSE_WALL);
  m[61][14] = T.HOUSE_DOOR;
  fill(11, 56, 17, 60, T.FLOOR);
  // Farm fences
  for (let x = 6; x <= 22; x++) { m[53][x] = T.FENCE; }
  for (let x = 6; x <= 22; x++) { m[63][x] = T.FENCE; }
  for (let y = 53; y <= 63; y++) { m[y][6] = T.FENCE; m[y][22] = T.FENCE; }
  // Crops in field
  sprinkle(7, 54, 21, 62, [[T.TALL_GRASS, 0.5]]);

  // ============ LAKEBRINK MARSH (S-Center) ============
  sprinkle(32, 55, 55, 76, [[T.TALL_GRASS, 0.35], [T.TREE, 0.12], [T.ROCK, 0.05]]);
  // Marsh water pools
  fill(38, 58, 42, 63, T.WATER);
  fill(45, 60, 49, 66, T.WATER);
  fill(34, 67, 39, 73, T.WATER);
  fill(48, 70, 52, 74, T.WATER);
  // Boardwalk through marsh
  fill(37, 58, 42, 58, T.DIRT);
  path([[40, 58], [43, 60], [44, 64], [47, 66]]);
  path([[36, 69], [38, 67], [40, 65]]);
  fill(34, 69, 39, 69, T.DIRT);
  // Marsh trees
  m[57][40] = T.TREE; m[60][45] = T.TREE; m[64][42] = T.TREE;
  m[71][36] = T.TREE; m[73][50] = T.TREE; m[65][52] = T.TREE;
  m[58][50] = T.TREE; m[56][38] = T.TREE;

  // ============ DARKWOOD (SE) ============
  sprinkle(55, 50, 97, 76, [[T.TREE, 0.6], [T.ROCK, 0.1], [T.TALL_GRASS, 0.1]]);
  // Dense thicket ring
  for (let y = 55; y <= 74; y++) for (let x = 72; x <= 88; x++) {
    // ring-shaped dense tree wall around secret
    const dx = Math.abs(x - 80), dy = Math.abs(y - 64);
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 5 && dist < 9 && m[y][x] === T.GRASS) m[y][x] = T.TREE;
  }
  // Secret treasure clearing
  fill(77, 61, 83, 67, T.GRASS);
  fillIf(77, 61, 83, 67, T.FLOWER, T.GRASS);
  // Hidden entrance through tree wall
  m[65][75] = T.GRASS; m[65][76] = T.GRASS;
  // Boss lair circle
  fill(90, 55, 96, 60, T.STONE);
  sprinkle(90, 55, 96, 60, [[T.ROCK, 0.4]]);

  // ============ PATHS BETWEEN AREAS ============
  // Village ÔåÆ Forest (hidden path)
  path([[34, 29], [30, 26], [26, 23], [22, 20]]);
  // Forest ÔåÆ Cave
  path([[22, 20], [18, 18], [14, 15], [10, 13]]);
  // Village ÔåÆ Ruins
  path([[48, 29], [50, 27], [54, 24], [57, 21], [60, 18]]);
  // Village ÔåÆ Farmland
  path([[42, 47], [38, 50], [30, 52], [20, 55]]);
  // Village ÔåÆ Marsh
  path([[44, 47], [44, 50], [42, 55]]);
  // Village ÔåÆ Darkwood entrance
  path([[55, 47], [58, 50], [62, 53], [66, 55]]);
  // Darkwood ÔåÆ Secret clearing
  path([[66, 55], [70, 58], [74, 60], [77, 62]]);
  // Darkwood ÔåÆ Boss lair
  path([[82, 58], [85, 57], [88, 57]]);
  // Ruins ÔåÆ Eastern Hills
  path([[68, 19], [72, 22], [76, 25], [80, 28]]);
  // Hills ÔåÆ Darkwood
  path([[82, 38], [80, 42], [78, 48], [76, 52], [74, 55]]);
  // Marsh ÔåÆ Farmland
  path([[38, 73], [30, 73], [24, 69], [20, 63]]);

  // ============ SECONDARY PATHS & HIDDEN ROUTES ============
  // Forest secret route (narrow, one-tile)
  m[18][24] = T.DIRT; m[16][24] = T.DIRT;
  // Ruins hidden alcove
  m[12][65] = T.FLOOR;
  // Marsh shortcut
  m[62][44] = T.DIRT; m[64][46] = T.DIRT;

  // ============ DECORATIVE ELEMENTS ============
  // River sand banks
  for (let y = 5; y < 74; y++) for (let x = 30; x < 40; x++) {
    if (m[y][x] !== T.GRASS) continue;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (B(x + dx, y + dy) && (m[y + dy][x + dx] === T.WATER || m[y + dy][x + dx] === T.BRIDGE_H)) {
        if (R(0.35)) m[y][x] = T.SAND; break;
      }
    }
  }
  // Extra flowers along roads
  for (let y = 3; y < ROWS - 3; y++) for (let x = 3; x < COLS - 3; x++) {
    if (m[y][x] !== T.DIRT) continue;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (B(x + dx, y + dy) && m[y + dy][x + dx] === T.GRASS && R(0.08))
        m[y + dy][x + dx] = T.FLOWER;
    }
  }
  // Hedge rows (dense fence lines)
  for (let x = 60; x <= 68; x++) { m[24][x] = T.FENCE; }
  for (let y = 22; y <= 28; y++) { m[y][60] = T.FENCE; }

  return m;
}
const worldMap = makeMap();
const doorStates: boolean[] = new Array(ROWS * COLS).fill(false);
function tileKey(x: number, y: number) { return y * COLS + x; }
function isDoor(x: number, y: number) { return x >= 0 && y >= 0 && x < COLS && y < ROWS && worldMap[y][x] === T.HOUSE_DOOR; }
function isBlocked(x: number, y: number) {
  if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return true;
  const t = worldMap[y][x];
  if (t === T.HOUSE_DOOR && doorStates[tileKey(x, y)]) return false;
  return t === T.TREE || t === T.WALL || t === T.WATER || t === T.DEEP_WATER
    || t === T.HOUSE_WALL || t === T.HOUSE_ROOF || t === T.FENCE || t === T.SIGN || t === T.ROCK || t === T.RUINS;
}

const SHOP_COLS = 10, SHOP_ROWS = 11;
const SHOP_WALL = 1, SHOP_FLOOR = 0, SHOP_EXIT = 2;

function makeShopMap(): number[][] {
  const m: number[][] = [];
  for (let y = 0; y < SHOP_ROWS; y++) {
    m[y] = [];
    for (let x = 0; x < SHOP_COLS; x++) {
      if (y === 0 || y === SHOP_ROWS - 1 || x === 0 || x === SHOP_COLS - 1) m[y][x] = SHOP_WALL;
      else m[y][x] = SHOP_FLOOR;
    }
  }
  m[10][4] = SHOP_EXIT;
  return m;
}

function isShopBlocked(x: number, y: number, shopMap: number[][]) {
  if (x < 0 || y < 0 || x >= SHOP_COLS || y >= SHOP_ROWS) return true;
  return shopMap[y][x] === SHOP_WALL;
}

const CAVE_COLS = 25, CAVE_ROWS = 25;

function makeCaveMap(): number[][] {
  const m = Array.from({ length: CAVE_ROWS }, () => new Array(CAVE_COLS).fill(0));
  const det2 = (s: number) => Math.abs((Math.sin(s) * 43758.5453) % 1);
  for (let y = 0; y < CAVE_ROWS; y++) for (let x = 0; x < CAVE_COLS; x++) {
    if (x < 1 || x >= CAVE_COLS - 1 || y < 1 || y >= CAVE_ROWS - 1) m[y][x] = T.STONE;
    else if (det2(x * 12.9898 + y * 78.233) > 0.55) m[y][x] = T.STONE;
    else m[y][x] = T.FLOOR;
  }
  const rocks: [number, number][] = [[3,3],[3,4],[4,3],[7,5],[18,4],[20,10],[15,20],[5,18],[8,15],[6,12],[12,6],[14,8],[17,12],[19,15],[21,18],[13,17],[4,20],[10,22],[22,5],[2,12]];
  const torchStones: [number, number][] = [[4,5],[4,12],[4,20],[10,4],[18,4],[22,8],[22,14],[22,20],[14,22],[6,22]];
  for (const [rx, ry] of rocks) if (m[ry][rx] !== T.STONE) m[ry][rx] = T.ROCK;
  for (const [tx, ty] of torchStones) if (m[ty][tx] !== T.STONE) m[ty][tx] = T.STONE;
  m[12][12] = T.FLOOR; // Boss arena center
  return m;
}

function isCaveBlocked(x: number, y: number, caveMap: number[][]) {
  if (x < 0 || y < 0 || x >= CAVE_COLS || y >= CAVE_ROWS) return true;
  const t = caveMap[y][x];
  return t === T.STONE || t === T.ROCK;
}

const NW_COLS = 40, NW_ROWS = 40;
const NW_FLOOR = 0, NW_WALL = 1, NW_BUILDING = 2, NW_EXIT = 3;

function makeNewWorldMap(): number[][] {
  const m = Array.from({ length: NW_ROWS }, () => new Array(NW_COLS).fill(NW_FLOOR));
  for (let y = 0; y < NW_ROWS; y++) for (let x = 0; x < NW_COLS; x++)
    if (x < 1 || y < 1 || x >= NW_COLS - 1 || y >= NW_ROWS - 1) m[y][x] = NW_WALL;
  for (let i = 0; i < 12; i++) {
    const bx = 3 + Math.floor(Math.random() * (NW_COLS - 8));
    const by = 3 + Math.floor(Math.random() * (NW_ROWS - 8));
    for (let dy = -1; dy <= 4; dy++) for (let dx = -1; dx <= 4; dx++) {
      const xx = bx + dx, yy = by + dy;
      if (xx > 0 && xx < NW_COLS - 1 && yy > 0 && yy < NW_ROWS - 1) m[yy][xx] = NW_BUILDING;
    }
  }
  m[3][NW_COLS - 3] = NW_EXIT;
  return m;
}

function isNWBlocked(x: number, y: number, nwMap: number[][]) {
  if (x < 0 || y < 0 || x >= NW_COLS || y >= NW_ROWS) return true;
  return nwMap[y][x] === NW_WALL;
}

worldMap[13][15] = T.STONE; // Magic door location

interface Firefly { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; twinkle: number; twinkleSpeed: number; }
interface Lantern { x: number; y: number; phase: number; }
interface Raindrop { x: number; y: number; speed: number; wind: number; length: number; }
interface FootstepParticle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string; }
interface LeafParticle { x: number; y: number; vx: number; vy: number; size: number; rotation: number; rotSpeed: number; life: number; maxLife: number; color: string; }
interface DustParticle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; }
interface EmberParticle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; hue: number; }

interface NpcData {
  id: string; x: number; y: number; name: string; color: string; hatColor: string;
  dialogue: string[]; isShop?: boolean; shopItems?: { id: string; name: string; icon: string; price: number }[];
  dir: number; patrol?: { x1: number; y1: number; x2: number; y2: number };
}
interface SignData { x: number; y: number; text: string; }
interface WorldEnemy {
  id: string; name: string; icon: string; color: string;
  x: number; y: number; level: number; hp: number; maxHp: number;
  atk: number; def: number; spd: number; xpReward: number; goldReward: number;
  aggroRange: number; dir: number; state: 'idle' | 'patrol' | 'chase' | 'return';
  patrol: { x1: number; y1: number; x2: number; y2: number };
  moveTimer: number; isBoss?: boolean; phase?: number; maxPhase?: number;
  abilities: string[];
}
interface Ability { id: string; name: string; icon: string; power: number; cost: number; desc: string; type: 'physical' | 'magical' | 'heal' | 'buff'; }
interface Quest { id: string; name: string; desc: string; objectives: { type: string; target: string; count: number; current: number }[]; rewards: { xp: number; gold: number; items?: string[] }; completed: boolean; }
interface Recipe { id: string; name: string; icon: string; ingredients: { itemId: string; count: number }[]; result: { itemId: string; count: number }; }

const ABILITIES: Ability[] = [
  { id: 'strike', name: 'Strike', icon: 'ÔÜö´©Å', power: 12, cost: 0, desc: 'A basic attack', type: 'physical' },
  { id: 'power_strike', name: 'Power Strike', icon: '­ƒÆÑ', power: 22, cost: 5, desc: 'A heavy blow', type: 'physical' },
  { id: 'heal', name: 'Heal', icon: 'ÔØñ´©Å', power: 20, cost: 8, desc: 'Restore HP', type: 'heal' },
  { id: 'flame', name: 'Flame', icon: '­ƒöÑ', power: 28, cost: 10, desc: 'Burns the foe', type: 'magical' },
  { id: 'shield_bash', name: 'Shield Bash', icon: '­ƒøí´©Å', power: 16, cost: 4, desc: 'Stuns the enemy', type: 'physical' },
];
const BOSS_ABILITIES: Ability[] = [
  { id: 'claw', name: 'Claw Swipe', icon: '­ƒÆó', power: 18, cost: 0, desc: 'A vicious swipe', type: 'physical' },
  { id: 'roar', name: 'Terrifying Roar', icon: '­ƒÆ¿', power: 14, cost: 3, desc: 'Shakes your resolve', type: 'magical' },
  { id: 'dark_blast', name: 'Dark Blast', icon: '­ƒîæ', power: 30, cost: 10, desc: 'Shadow energy erupts', type: 'magical' },
  { id: 'fury', name: 'Fury Swipes', icon: '­ƒîÇ', power: 8, cost: 0, desc: 'Rapid strikes', type: 'physical' },
];

const RECIPES: Recipe[] = [
  { id: 'health_potion', name: 'Health Potion', icon: '­ƒº¬', ingredients: [{ itemId: 'herb', count: 2 }], result: { itemId: 'potion', count: 1 } },
  { id: 'torch', name: 'Torch', icon: '­ƒöÑ', ingredients: [{ itemId: 'stick', count: 2 }, { itemId: 'herb', count: 1 }], result: { itemId: 'torch', count: 1 } },
];

const NPC_DATA: NpcData[] = [
  { id: 'old_man', x: 48, y: 37, name: 'Old Sage', color: '#4a6a8a', hatColor: '#2a2a4a', dir: 0, dialogue: ['Welcome, traveler...', 'Beyond these woods lies great danger.', 'Train well, and you may survive.'], patrol: { x1: 47, y1: 37, x2: 50, y2: 37 } },
  { id: 'merchant', x: 55, y: 38, name: 'Merchant Klang', color: '#8a6a3a', hatColor: '#5a3a1a', dir: 2, dialogue: ['Care to see my wares?', 'I have the finest goods!'], isShop: true, shopItems: [
    { id: 'potion', name: 'Health Potion', icon: '­ƒº¬', price: 50 }, { id: 'torch', name: 'Torch', icon: '­ƒöÑ', price: 30 },
    { id: 'compass', name: 'Compass', icon: '­ƒº¡', price: 100 }, { id: 'herb', name: 'Herb', icon: '­ƒî┐', price: 15 }, { id: 'stick', name: 'Stick', icon: '­ƒÑó', price: 5 },
  ] },
  { id: 'hermit', x: 65, y: 20, name: 'Hermit', color: '#5a7a5a', hatColor: '#2a3a1a', dir: 1, dialogue: ['Shh... the forest speaks.', 'Listen to the wind between the trees.', 'It carries secrets of old.'] },
  { id: 'traveler', x: 30, y: 45, name: 'Traveler Lynn', color: '#7a5a7a', hatColor: '#4a2a4a', dir: 3, dialogue: ['I\'ve walked many roads.', 'The house to the east is abandoned...', 'Or so they say.'], patrol: { x1: 28, y1: 45, x2: 33, y2: 45 } },
];
const SIGN_DATA: SignData[] = [
  { x: 49, y: 36, text: '~ Welcome to ~\nRookwood Manor\n~ Enter freely ~' },
  { x: 42, y: 28, text: 'Ôå£ Crossroads ÔåØ\nNorth: Shadow Forest / Ruins\nEast: Rookwood Village\nSouth: Lakebrink Marsh / Darkwood' },
];

function makeEnemies(): WorldEnemy[] {
  return [
    { id: 'e1', name: 'Shadow Wisp', icon: '­ƒæ¥', color: '#6a4a8a', x: 22, y: 18, level: 1, hp: 25, maxHp: 25, atk: 6, def: 3, spd: 4, xpReward: 15, goldReward: 5, aggroRange: 5, dir: 0, state: 'patrol', patrol: { x1: 18, y1: 14, x2: 26, y2: 22 }, moveTimer: 0, abilities: ['strike'] },
    { id: 'e2', name: 'Forest Grub', icon: '­ƒÉø', color: '#5a8a4a', x: 28, y: 24, level: 2, hp: 30, maxHp: 30, atk: 7, def: 4, spd: 3, xpReward: 20, goldReward: 7, aggroRange: 4, dir: 1, state: 'patrol', patrol: { x1: 25, y1: 22, x2: 31, y2: 27 }, moveTimer: 0, abilities: ['strike'] },
    { id: 'e3', name: 'Dark Hare', icon: '­ƒÉç', color: '#3a3a5a', x: 60, y: 42, level: 3, hp: 22, maxHp: 22, atk: 10, def: 2, spd: 7, xpReward: 25, goldReward: 8, aggroRange: 5, dir: 2, state: 'patrol', patrol: { x1: 57, y1: 40, x2: 63, y2: 45 }, moveTimer: 0, abilities: ['strike'] },
    { id: 'e4', name: 'Moss Golem', icon: '­ƒù┐', color: '#5a6a4a', x: 78, y: 28, level: 4, hp: 50, maxHp: 50, atk: 9, def: 8, spd: 2, xpReward: 35, goldReward: 12, aggroRange: 4, dir: 3, state: 'patrol', patrol: { x1: 75, y1: 25, x2: 82, y2: 32 }, moveTimer: 0, abilities: ['strike', 'shield_bash'] },
    { id: 'e5', name: 'Ember Fox', icon: '­ƒªè', color: '#8a5a2a', x: 26, y: 60, level: 5, hp: 35, maxHp: 35, atk: 14, def: 5, spd: 6, xpReward: 40, goldReward: 15, aggroRange: 5, dir: 0, state: 'patrol', patrol: { x1: 22, y1: 57, x2: 30, y2: 63 }, moveTimer: 0, abilities: ['strike', 'flame'] },
    { id: 'boss1', name: 'Ancient Treant', icon: '­ƒî│', color: '#2a4a2a', x: 92, y: 58, level: 8, hp: 120, maxHp: 120, atk: 18, def: 12, spd: 3, xpReward: 200, goldReward: 80, aggroRange: 6, dir: 1, state: 'patrol', patrol: { x1: 88, y1: 55, x2: 95, y2: 62 }, moveTimer: 0, isBoss: true, maxPhase: 2, abilities: ['claw', 'roar', 'dark_blast'] },
  ];
}

const QUESTS: Quest[] = [
  { id: 'q1', name: 'First Blood', desc: 'Defeat your first enemy in the wild.', objectives: [{ type: 'kill', target: 'any', count: 1, current: 0 }], rewards: { xp: 30, gold: 10 }, completed: false },
  { id: 'q2', name: 'Pest Control', desc: 'Defeat 3 forest creatures.', objectives: [{ type: 'kill', target: 'any', count: 3, current: 0 }], rewards: { xp: 60, gold: 25 }, completed: false },
  { id: 'q3', name: 'Craft Novice', desc: 'Craft any item at a campfire.', objectives: [{ type: 'craft', target: 'any', count: 1, current: 0 }], rewards: { xp: 40, gold: 15, items: ['herb'] }, completed: false },
  { id: 'q4', name: `Treant's Bane`, desc: 'Defeat the Ancient Treant boss.', objectives: [{ type: 'kill', target: 'boss1', count: 1, current: 0 }], rewards: { xp: 500, gold: 200, items: ['potion', 'potion'] }, completed: false },
];

export default function AdventurePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    px: 44, py: 37, vx: 0, vy: 0, speed: 3.2, dir: 0, frame: 0, frameTimer: 0,
    keys: { w: false, a: false, s: false, d: false, e: false }, ePressed: false,
    camX: 0, camY: 0, zoom: 1, targetZoom: 1, shakeX: 0, shakeY: 0, shakeIntensity: 0, time: 0, timeOfDay: 0.3,
    weatherTimer: 0, isRaining: false, rainIntensity: 0, lightningFlash: 0, lightningTimer: 200, footstepCooldown: 0, wasMoving: false,
    dialogueActive: false, dialogueLines: [] as string[], dialogueIndex: 0, dialogueNpc: '',
    shopActive: false, shopItems: [] as { id: string; name: string; icon: string; price: number }[], shopSelected: 0,
    signActive: false, signText: '', cutsceneActive: false, cutsceneQueue: [] as (() => void)[], cutsceneTimer: 0,
    interactCooldown: 0, playerGold: 200, inventory: [] as { id: string; name: string; icon: string }[],
    npcOffsets: NPC_DATA.map(() => ({ ox: 0, oy: 0, step: false })), hasDoneIntro: false,
    // RPG Systems
    level: 1, xp: 0, xpToNext: 100, hp: 60, maxHp: 60, atk: 8, def: 5, mp: 20, maxMp: 20,
    learnedAbilities: ['strike', 'heal'] as string[], sp: 0, // skill points
    battleActive: false, battleEnemy: null as WorldEnemy | null, battleTurn: 'player' as 'player' | 'enemy',
    battleLog: [] as string[], battleAnimating: false, battleAnimTimer: 0, battleFade: 0, battleChoice: 0,
    battleSubMenu: '' as '' | 'attack' | 'skills' | 'items' | 'flee', battleSubChoice: 0,
    battleEnemyDisplayHp: 0, battlePlayerDisplayHp: 0, battleEnemyFlash: 0, battlePlayerFlash: 0,
    inventoryOpen: false, inventoryChoice: 0, inventoryTab: 0,
    quests: JSON.parse(JSON.stringify(QUESTS)) as Quest[],
    craftOpen: false, craftChoice: 0,
    showLevelUp: false,
    menuOpen: false, menuChoice: 0, menuTab: 0,
    skillsOpen: false, skillChoice: 0,
    totalKills: 0, totalCrafts: 0,
    playerName: '', hasStarted: false,
    justDefeated: false,
    inShop: false,
    // Cave system
    caveActive: false, caveBossDefeated: false,
    caveBossHp: 150, caveBossMaxHp: 150,
    caveBossX: 12, caveBossY: 12, caveBossDir: -1,
    caveBossAggro: false, caveBossAttackCooldown: 0, playerCaveAttackCooldown: 0,
    caveKeyDropped: false, caveKeyPickedUp: false, caveKeyX: 0, caveKeyY: 0,
    hasCaveKey: false,
    caveBossRespawnTimer: 0,
    // New World (Kingdom of Eldoria)
    inNewWorld: false, nwPx: 0, nwPy: 0,
    dialogueNpcData: null as NpcData | null,
  });

  const firefliesRef = useRef<Firefly[]>([]);
  const fogRef = useRef<{ x: number; y: number; size: number; speed: number; opacity: number }[]>([]);
  const lanternsRef = useRef<Lantern[]>([]);
  const rainRef = useRef<Raindrop[]>([]);
  const footstepParticlesRef = useRef<FootstepParticle[]>([]);
  const npcTimersRef = useRef<number[]>(NPC_DATA.map(() => Math.random() * 200));
  const enemiesRef = useRef<WorldEnemy[]>(makeEnemies());
  const leafParticlesRef = useRef<LeafParticle[]>([]);
  const dustParticlesRef = useRef<DustParticle[]>([]);
  const emberParticlesRef = useRef<EmberParticle[]>([]);
  const [menuVisible, setMenuVisible] = useState(true);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('gopherKnightPlayer');
    if (savedName) setPlayerName(savedName);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d')!;
    const s = stateRef.current;

    function roundRect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      c.beginPath(); c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.arcTo(x + w, y, x + w, y + r, r); c.lineTo(x + w, y + h - r); c.arcTo(x + w, y + h, x + w - r, y + h, r); c.lineTo(x + r, y + h); c.arcTo(x, y + h, x, y + h - r, r); c.lineTo(x, y + r); c.arcTo(x, y, x + r, y, r); c.closePath(); c.fill();
    }
    function roundRectStroke(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      c.beginPath(); c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.arcTo(x + w, y, x + w, y + r, r); c.lineTo(x + w, y + h - r); c.arcTo(x + w, y + h, x + w - r, y + h, r); c.lineTo(x + r, y + h); c.arcTo(x, y + h, x, y + h - r, r); c.lineTo(x, y + r); c.arcTo(x, y, x + r, y, r); c.closePath(); c.stroke();
    }

    let audioCtx: AudioContext | null = null;
    let ambientOsc: OscillatorNode | null = null;
    let ambientGain: GainNode | null = null;
    let rainNoise: AudioBufferSourceNode | null = null;
    let rainGain: GainNode | null = null;

    function initAudio() {
      if (audioCtx) return;
      try {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        ambientGain = audioCtx.createGain(); ambientGain.gain.value = 0.04; ambientGain.connect(audioCtx.destination);
        ambientOsc = audioCtx.createOscillator(); ambientOsc.type = 'sine'; ambientOsc.frequency.value = 55; ambientOsc.connect(ambientGain); ambientOsc.start();
        rainGain = audioCtx.createGain(); rainGain.gain.value = 0; rainGain.connect(audioCtx.destination);
      } catch {}
    }

    function playTone(freq: number, dur: number, vol = 0.06, type: OscillatorType = 'sine', pitchEnd?: number) {
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
        osc.connect(gain); gain.connect(audioCtx.destination); const n = audioCtx.currentTime;
        osc.type = type; osc.frequency.setValueAtTime(freq, n);
        if (pitchEnd) osc.frequency.exponentialRampToValueAtTime(pitchEnd, n + dur);
        gain.gain.setValueAtTime(vol, n); gain.gain.exponentialRampToValueAtTime(0.001, n + dur);
        osc.start(n); osc.stop(n + dur);
      } catch {}
    }

    function playSound(type: string, pitch = 1) {
      if (!audioCtx) return;
      if (type === 'interact') playTone(400 * pitch, 0.1, 0.06, 'sine', 600 * pitch);
      else if (type === 'buy') { playTone(500, 0.06, 0.06); setTimeout(() => playTone(700, 0.06, 0.06), 60); setTimeout(() => playTone(900, 0.08, 0.06), 120); }
      else if (type === 'door') playTone(150 * pitch, 0.15, 0.08, 'triangle', 80 * pitch);
      else if (type === 'hit') playTone(80, 0.12, 0.1, 'square', 40);
      else if (type === 'crit') playTone(200, 0.08, 0.12, 'sawtooth', 100);
      else if (type === 'heal') playTone(300, 0.1, 0.06, 'sine', 500);
      else if (type === 'levelup') { [400, 500, 600, 800].forEach((f, i) => setTimeout(() => playTone(f, 0.12, 0.08), i * 80)); }
      else if (type === 'battle_start') { [200, 250, 180].forEach((f, i) => setTimeout(() => playTone(f, 0.15, 0.1, 'square'), i * 100)); }
      else if (type === 'victory') { [400, 500, 600, 900].forEach((f, i) => setTimeout(() => playTone(f, 0.15, 0.08), i * 100)); }
      else if (type === 'flee') playTone(600, 0.15, 0.06, 'sine', 300);
      else if (type === 'craft') playTone(350, 0.1, 0.06, 'triangle', 550);
    }

    function playFootstep(terrain: number) {
      if (!audioCtx) return;
      const t = terrain === T.GRASS || terrain === T.TALL_GRASS ? 'triangle' : terrain === T.FLOOR ? 'square' : 'sine';
      const f = terrain === T.GRASS || terrain === T.TALL_GRASS ? 60 + Math.random() * 20 : terrain === T.DIRT || terrain === T.PATH ? 90 + Math.random() * 30 : terrain === T.FLOOR ? 120 + Math.random() * 40 : 70 + Math.random() * 30;
      playTone(f, 0.06, 0.08, t as OscillatorType, f * 0.5);
    }

    function triggerShake(intensity: number) { s.shakeIntensity = Math.max(s.shakeIntensity, intensity); }
    function spawnFootstepParticles(tx: number, ty: number, terrain: number) {
      const fp = footstepParticlesRef.current;
      const color = terrain === T.DIRT || terrain === T.PATH ? '#6a5a3a' : terrain === T.FLOOR ? '#5a4a3a' : '#8a9a7a';
      for (let i = 0; i < 3; i++) fp.push({ x: tx * TILE + (Math.random() - 0.5) * 12, y: ty * TILE + TILE - 4, vx: (Math.random() - 0.5) * 1.5, vy: -Math.random() * 1.5 - 0.5, life: 20, maxLife: 20, size: 2 + Math.random() * 2, color });
    }
    function closeAllPanels() { s.dialogueActive = false; s.shopActive = false; s.signActive = false; s.cutsceneActive = false; s.inventoryOpen = false; s.craftOpen = false; s.menuOpen = false; s.skillsOpen = false; }
    function buyItemFromUI(idx: number) {
      const items = s.shopItems;
      if (idx < 0 || idx >= items.length) return;
      const item = items[idx];
      if (s.playerGold < item.price) return;
      s.playerGold -= item.price;
      s.inventory.push({ id: item.id, name: item.name, icon: item.icon });
      playSound('buy');
    }

    function saveGame() {
      try {
        const data = { px: s.px, py: s.py, level: s.level, xp: s.xp, hp: s.hp, maxHp: s.maxHp, atk: s.atk, def: s.def, mp: s.mp, maxMp: s.maxMp, gold: s.playerGold, inventory: s.inventory, abilities: s.learnedAbilities, sp: s.sp, quests: s.quests, kills: s.totalKills, crafts: s.totalCrafts, timeOfDay: s.timeOfDay };
        localStorage.setItem('adventure_save', JSON.stringify(data));
      } catch {}
    }

    function loadGame() {
      try {
        const raw = localStorage.getItem('adventure_save');
        if (!raw) return false;
        const d = JSON.parse(raw);
        s.px = d.px; s.py = d.py; s.level = d.level; s.xp = d.xp; s.hp = d.hp; s.maxHp = d.maxHp;
        s.atk = d.atk; s.def = d.def; s.mp = d.mp; s.maxMp = d.maxMp;
        s.playerGold = d.gold; s.inventory = d.inventory || []; s.learnedAbilities = d.abilities || ['strike', 'heal'];
        s.sp = d.sp || 0; s.quests = d.quests || JSON.parse(JSON.stringify(QUESTS));
        s.totalKills = d.kills || 0; s.totalCrafts = d.crafts || 0;
        if (d.timeOfDay !== undefined) s.timeOfDay = d.timeOfDay;
        return true;
      } catch { return false; }
    }

    function addXp(amount: number) {
      s.xp += amount; playSound('levelup');
      while (s.xp >= s.xpToNext) {
        s.xp -= s.xpToNext; s.level++; s.sp++;
        s.xpToNext = Math.floor(100 * Math.pow(1.15, s.level - 1));
        s.maxHp += 8; s.hp = s.maxHp; s.maxMp += 3; s.mp = s.maxMp;
        s.atk += 2; s.def += 1;
        s.showLevelUp = true;
        playSound('levelup');
      }
      saveGame();
    }

    function updateQuest(type: string, target: string) {
      for (const q of s.quests) {
        if (q.completed) continue;
        for (const o of q.objectives) {
          if (o.type === type && (o.target === target || o.target === 'any')) {
            o.current = Math.min(o.count, o.current + 1);
            if (o.current >= o.count) {
              q.completed = true;
              addXp(q.rewards.xp);
              s.playerGold += q.rewards.gold;
              if (q.rewards.items) for (const ii of q.rewards.items) s.inventory.push({ id: ii, name: ii.charAt(0).toUpperCase() + ii.slice(1), icon: '­ƒôª' });
              s.battleLog.push(`Quest complete: ${q.name}!`);
            }
          }
        }
      }
      saveGame();
    }

    function calcDamage(atk: number, def: number): { dmg: number; crit: boolean } {
      const base = Math.max(1, atk - Math.floor(def / 2));
      const variance = Math.floor(Math.random() * 4) - 2;
      const crit = Math.random() < 0.1;
      return { dmg: Math.max(1, base + variance) * (crit ? 2 : 1), crit };
    }

    function getAbility(id: string): Ability { return [...ABILITIES, ...BOSS_ABILITIES].find(a => a.id === id) || ABILITIES[0]; }

    function startBattle(enemy: WorldEnemy) {
      closeAllPanels(); s.battleActive = true; s.battleEnemy = { ...enemy, hp: enemy.maxHp };
      s.battleTurn = 'player'; s.battleLog = [`A wild ${enemy.name} appears!`];
      s.battleFade = 0; s.battleAnimating = true; s.battleAnimTimer = 0; s.battleChoice = 0; s.battleSubMenu = ''; s.battleSubChoice = 0;
      s.battleEnemyDisplayHp = enemy.maxHp; s.battlePlayerDisplayHp = s.hp; s.battleEnemyFlash = 0; s.battlePlayerFlash = 0;
      playSound('battle_start');
    }

    function playerAttack(abilityId: string) {
      const e = s.battleEnemy; if (!e) return;
      const ab = getAbility(abilityId);
      if (ab.type === 'heal') {
        const healAmt = ab.power + Math.floor(s.atk * 0.3);
        s.hp = Math.min(s.maxHp, s.hp + healAmt);
        s.battleLog.push(`You cast ${ab.name}! +${healAmt} HP`);
        playSound('heal');
      } else {
        const { dmg, crit } = calcDamage(s.atk + ab.power, e.def);
        e.hp = Math.max(0, e.hp - dmg);
        s.battleLog.push(crit ? `CRIT! ${ab.name} deals ${dmg} damage!` : `${ab.name} deals ${dmg} damage.`);
        s.battleEnemyFlash = 12;
        playSound(crit ? 'crit' : 'hit');
        if (crit) triggerShake(6);
        if (dmg > 15) triggerShake(4);
      }
      s.battleAnimating = true; s.battleAnimTimer = 20;
      setTimeout(() => {
        if (!s.battleEnemy) return;
        if (s.battleEnemy.hp <= 0) {
          s.battleLog.push(`${s.battleEnemy.name} defeated!`);
          s.totalKills++;
          updateQuest('kill', s.battleEnemy.id);
          updateQuest('kill', 'any');
          if (s.battleEnemy.isBoss) s.battleLog.push('Boss vanquished! Tremendous power surges through you!');
          addXp(s.battleEnemy.xpReward); s.playerGold += s.battleEnemy.goldReward;
          const dropChance = Math.random();
          if (dropChance < 0.3) { s.inventory.push({ id: 'herb', name: 'Herb', icon: '­ƒî┐' }); s.battleLog.push('Dropped: Herb'); }
          else if (dropChance < 0.4) { s.inventory.push({ id: 'potion', name: 'Health Potion', icon: '­ƒº¬' }); s.battleLog.push('Dropped: Potion'); }
          playSound('victory');
          setTimeout(() => { s.battleActive = false; s.battleEnemy = null; s.battleSubMenu = ''; saveGame(); }, 2000);
          return;
        }
        // Enemy turn
        s.battleTurn = 'enemy';
        setTimeout(() => {
          if (!s.battleEnemy || s.battleEnemy.hp <= 0) return;
          const eAb = s.battleEnemy.abilities[Math.floor(Math.random() * s.battleEnemy.abilities.length)];
          const ab2 = getAbility(eAb);
          const { dmg: eDmg, crit: eCrit } = calcDamage(s.battleEnemy.atk + ab2.power, s.def);
          s.hp = Math.max(0, s.hp - eDmg);
          s.battleLog.push(eCrit ? `CRIT! ${s.battleEnemy.name}'s ${ab2.name} hits for ${eDmg}!` : `${s.battleEnemy.name} uses ${ab2.name} for ${eDmg} damage.`);
          s.battlePlayerFlash = 12;
          playSound('hit');
          if (eCrit) triggerShake(8);
          triggerShake(4);
          if (s.hp <= 0) {
            s.battleLog.push('You have been defeated...');
            playSound('flee');
            setTimeout(() => { s.justDefeated = true; s.hp = 1; s.battleActive = false; s.battleEnemy = null; s.battleSubMenu = ''; }, 2000);
          } else {
            s.battleTurn = 'player'; s.battleSubMenu = '';
            if (s.battleEnemy?.isBoss && s.battleEnemy.hp < s.battleEnemy.maxHp * 0.5 && s.battleEnemy.phase === 1) {
              s.battleEnemy.phase = 2;
              s.battleLog.push(`The ${s.battleEnemy.name} enters phase 2! It grows stronger!`);
              s.battleEnemy.atk += 5; s.battleEnemy.def += 3;
            }
          }
        }, 800);
      }, 400 + (ab.type === 'heal' ? 0 : 200));
    }

    function playerFlee() {
      if (s.battleEnemy?.isBoss) { s.battleLog.push('Cannot flee from a boss!'); return; }
      if (Math.random() < 0.6) {
        s.battleLog.push('You fled successfully!');
        playSound('flee');
        setTimeout(() => { s.battleActive = false; s.battleEnemy = null; s.battleSubMenu = ''; }, 500);
      } else {
        s.battleLog.push('Failed to flee!');
        playSound('interact', 0.5);
        s.battleTurn = 'enemy';
        setTimeout(() => {
          if (!s.battleEnemy) return;
          const ab2 = getAbility(s.battleEnemy.abilities[Math.floor(Math.random() * s.battleEnemy.abilities.length)]);
          const { dmg } = calcDamage(s.battleEnemy.atk + ab2.power, s.def);
          s.hp = Math.max(0, s.hp - dmg);
          s.battleLog.push(`${s.battleEnemy.name} strikes as you flee! -${dmg} HP`);
          s.battlePlayerFlash = 12;
            if (s.hp <= 0) { s.justDefeated = true; s.hp = 1; s.battleActive = false; s.battleEnemy = null; s.battleSubMenu = ''; }
          else { s.battleTurn = 'player'; s.battleSubMenu = ''; }
        }, 600);
      }
    }

    function useItemInBattle(itemId: string) {
      if (itemId === 'potion') {
        const idx = s.inventory.findIndex(i => i.id === 'potion');
        if (idx >= 0) {
          s.inventory.splice(idx, 1);
          s.hp = Math.min(s.maxHp, s.hp + 30);
          s.battleLog.push('Used Health Potion! +30 HP');
          playSound('heal');
          s.battleTurn = 'enemy';
          setTimeout(() => {
            if (!s.battleEnemy || s.battleEnemy.hp <= 0) return;
            const ab2 = getAbility(s.battleEnemy.abilities[Math.floor(Math.random() * s.battleEnemy.abilities.length)]);
            const { dmg } = calcDamage(s.battleEnemy.atk + ab2.power, s.def);
            s.hp = Math.max(0, s.hp - dmg);
            s.battleLog.push(`${s.battleEnemy.name} uses ${ab2.name}! -${dmg} HP`);
          if (s.hp <= 0) { s.justDefeated = true; s.hp = 1; s.battleActive = false; s.battleEnemy = null; s.battleSubMenu = ''; }
            else { s.battleTurn = 'player'; s.battleSubMenu = ''; }
          }, 800);
        }
      }
    }

    function startDialogue(npc: NpcData) { closeAllPanels(); s.dialogueActive = true; s.dialogueLines = npc.dialogue; s.dialogueIndex = 0; s.dialogueNpc = npc.name; playSound('interact'); }
    function startShop(npc: NpcData) { closeAllPanels(); s.shopActive = true; s.shopItems = npc.shopItems || []; s.shopSelected = 0; s.dialogueNpc = npc.name; playSound('interact'); }
    function startSign(sign: SignData) { closeAllPanels(); s.signActive = true; s.signText = sign.text; playSound('interact', 0.7); }

    function checkInteraction() {
      if (s.interactCooldown > 0) return;
      const px = Math.round(s.px); const py = Math.round(s.py);
      for (const sign of SIGN_DATA) { if (Math.abs(sign.x - px) + Math.abs(sign.y - py) <= 1.5) { startSign(sign); s.interactCooldown = 20; return; } }
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { if (dx === 0 && dy === 0) continue; const nx = px + dx, ny = py + dy; if (isDoor(nx, ny)) { const k = tileKey(nx, ny); doorStates[k] = !doorStates[k]; playSound('door', doorStates[k] ? 1.2 : 0.8); s.interactCooldown = 20; return; } }
      for (const npc of NPC_DATA) { const dist = Math.abs(npc.x - px) + Math.abs(npc.y - py); if (dist <= 1.5) { if (npc.isShop) startShop(npc); else startDialogue(npc); s.interactCooldown = 20; return; } }
    }

    function startIntroCutscene() {
      if (s.hasDoneIntro) return; s.hasDoneIntro = true; s.cutsceneActive = true; closeAllPanels();
      const lines = ['A cold wind stirs the leaves...', 'You stand at the edge of the known world.', 'Beyond the treeline, ancient secrets wait.', 'Press E to continue your journey.'];
      s.dialogueLines = [lines[0]]; s.dialogueIndex = 0; s.dialogueActive = true; s.dialogueNpc = '';
      s.cutsceneQueue = [];
      for (let i = 1; i < lines.length; i++) { const idx = i; s.cutsceneQueue.push(() => { s.dialogueLines = [lines[idx]]; s.dialogueIndex = 0; }); }
    }

    function makeLeaf(cx: number, cy: number, w: number, h: number): LeafParticle {
      const colors = ['#6a8a4a','#7a9a5a','#8aaa6a','#5a7a3a','#9aba7a'];
      return { x: cx + Math.random() * w, y: cy - Math.random() * 40, vx: -0.3 - Math.random() * 0.5, vy: 0.3 + Math.random() * 0.5, size: 2 + Math.random() * 3, rotation: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.05, life: 200 + Math.random() * 200, maxLife: 400, color: colors[Math.floor(Math.random() * colors.length)] };
    }
    function makeDust(cx: number, cy: number, w: number, h: number): DustParticle {
      return { x: cx + Math.random() * w, y: cy + Math.random() * h, vx: (Math.random() - 0.5) * 0.2, vy: -0.1 - Math.random() * 0.15, life: 80 + Math.random() * 120, maxLife: 200, size: 1 + Math.random() * 2 };
    }
    function makeEmber(cx: number, cy: number, w: number, h: number): EmberParticle {
      return { x: cx + Math.random() * w, y: cy + Math.random() * h, vx: (Math.random() - 0.5) * 0.15, vy: -0.2 - Math.random() * 0.3, life: 60 + Math.random() * 100, maxLife: 160, size: 1 + Math.random() * 2, hue: 15 + Math.random() * 30 };
    }
    function advanceInteraction() {
      if (s.dialogueActive) {
        if (s.dialogueIndex < s.dialogueLines.length - 1) { s.dialogueIndex++; playSound('interact', 0.6); }
        else if (s.cutsceneActive && s.cutsceneQueue.length > 0) { const n = s.cutsceneQueue.shift(); if (n) n(); playSound('interact', 0.6); }
        else { closeAllPanels(); playSound('interact', 0.5); }
      } else if (s.signActive) { closeAllPanels(); playSound('interact', 0.5); }
    }

    function craftItem(idx: number) {
      if (idx < 0 || idx >= RECIPES.length) return;
      const r = RECIPES[idx];
      for (const ing of r.ingredients) {
        const count = s.inventory.filter(i => i.id === ing.itemId).length;
        if (count < ing.count) return;
      }
      for (const ing of r.ingredients) for (let i = 0; i < ing.count; i++) { const fi = s.inventory.findIndex(x => x.id === ing.itemId); if (fi >= 0) s.inventory.splice(fi, 1); }
      for (let i = 0; i < r.result.count; i++) s.inventory.push({ id: r.result.itemId, name: r.result.itemId.charAt(0).toUpperCase() + r.result.itemId.slice(1), icon: '­ƒôª' });
      s.totalCrafts++; updateQuest('craft', 'any'); playSound('craft');
    }

    function isEnemyBlocked(x: number, y: number) { return isBlocked(x, y) || NPC_DATA.some(n => Math.round(n.x) === x && Math.round(n.y) === y); }

    function resize() { const c = canvasRef.current; if (!c) return; c.width = window.innerWidth; c.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);

    const ff: Firefly[] = [];
    for (let i = 0; i < 60; i++) ff.push({ x: Math.random() * COLS * TILE, y: Math.random() * ROWS * TILE, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, life: 100 + Math.random() * 200, maxLife: 300, twinkle: Math.random() * Math.PI * 2, twinkleSpeed: 0.02 + Math.random() * 0.03 });
    firefliesRef.current = ff;
    const fog: typeof fogRef.current = [];
    for (let i = 0; i < 15; i++) fog.push({ x: Math.random() * COLS * TILE, y: Math.random() * ROWS * TILE, size: 100 + Math.random() * 200, speed: 0.1 + Math.random() * 0.2, opacity: 0.03 + Math.random() * 0.04 });
    fogRef.current = fog;
    const lr: Lantern[] = [{ x: 30 * TILE, y: 20 * TILE, phase: 0 }, { x: 50 * TILE, y: 15 * TILE, phase: 1 }, { x: 60 * TILE, y: 30 * TILE, phase: 2 }, { x: 40 * TILE, y: 45 * TILE, phase: 0.5 }, { x: 70 * TILE, y: 50 * TILE, phase: 1.5 }, { x: 25 * TILE, y: 55 * TILE, phase: 2.5 }];
    lanternsRef.current = lr;
    const rain: Raindrop[] = [];
    for (let i = 0; i < 400; i++) rain.push({ x: Math.random() * COLS * TILE, y: Math.random() * ROWS * TILE, speed: 6 + Math.random() * 4, wind: -1.5 - Math.random() * 2, length: 8 + Math.random() * 12 });
    rainRef.current = rain;
    const leafInit: LeafParticle[] = [];
    for (let i = 0; i < 50; i++) leafInit.push({ x: Math.random() * COLS * TILE, y: Math.random() * ROWS * TILE, vx: -0.3 - Math.random() * 0.5, vy: 0.3 + Math.random() * 0.5, size: 2 + Math.random() * 3, rotation: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.05, life: 200 + Math.random() * 200, maxLife: 400, color: ['#6a8a4a','#7a9a5a','#8aaa6a','#5a7a3a','#9aba7a'][Math.floor(Math.random() * 5)] });
    leafParticlesRef.current = leafInit;
    const dustInit: DustParticle[] = [];
    for (let i = 0; i < 30; i++) dustInit.push({ x: Math.random() * COLS * TILE, y: Math.random() * ROWS * TILE, vx: (Math.random() - 0.5) * 0.2, vy: -0.1 - Math.random() * 0.15, life: 80 + Math.random() * 120, maxLife: 200, size: 1 + Math.random() * 2 });
    dustParticlesRef.current = dustInit;
    const emberInit: EmberParticle[] = [];
    for (let i = 0; i < 20; i++) emberInit.push({ x: Math.random() * COLS * TILE, y: Math.random() * ROWS * TILE, vx: (Math.random() - 0.5) * 0.15, vy: -0.2 - Math.random() * 0.3, life: 60 + Math.random() * 100, maxLife: 160, size: 1 + Math.random() * 2, hue: 15 + Math.random() * 30 });
    emberParticlesRef.current = emberInit;

    const keys = s.keys;
    function handleKey(e: KeyboardEvent, down: boolean) {
      const k = e.key.toLowerCase();
      if (!s.hasStarted) return;
      if (s.battleActive && down) {
        if (s.battleAnimating) return;
        if (s.battleTurn === 'player') {
          if (!s.battleSubMenu) {
            if (k === 'arrowup') s.battleChoice = Math.max(0, s.battleChoice - 2);
            else if (k === 'arrowdown') s.battleChoice = Math.min(3, s.battleChoice + 2);
            else if (k === 'arrowleft') s.battleChoice = s.battleChoice % 2 === 1 ? s.battleChoice - 1 : s.battleChoice;
            else if (k === 'arrowright') s.battleChoice = s.battleChoice % 2 === 0 ? s.battleChoice + 1 : s.battleChoice;
          } else {
            if (k === 'arrowup') s.battleSubChoice = Math.max(0, s.battleSubChoice - 1);
            else if (k === 'arrowdown') { const max = s.battleSubMenu === 'skills' ? s.learnedAbilities.length : s.battleSubMenu === 'items' ? s.inventory.filter(i => i.id === 'potion').length : 0; s.battleSubChoice = Math.min(max - 1, s.battleSubChoice + 1); }
          }
          if (k === 'e' || k === 'enter') {
            if (s.battleSubMenu === '') {
              if (s.battleChoice === 0) s.battleSubMenu = 'skills';
              else if (s.battleChoice === 1) s.battleSubMenu = 'items';
              else if (s.battleChoice === 2) { if (s.inventory.some(i => i.id === 'potion')) { useItemInBattle('potion'); } else { s.battleLog.push('No potions!'); } }
              else if (s.battleChoice === 3) playerFlee();
            } else {
              if (s.battleSubMenu === 'skills') { const ab = s.learnedAbilities[s.battleSubChoice]; if (ab) playerAttack(ab); }
              else if (s.battleSubMenu === 'items') { /* handled by potion choice above */ }
            }
          }
          else if ((k === 'q' || k === 'escape') && s.battleSubMenu) s.battleSubMenu = '';
        }
        e.preventDefault();
        return;
      }
      if (s.craftOpen && down) {
        if (k === 'arrowup') s.craftChoice = Math.max(0, s.craftChoice - 1);
        else if (k === 'arrowdown') s.craftChoice = Math.min(RECIPES.length - 1, s.craftChoice + 1);
        else if (k === 'e') craftItem(s.craftChoice);
        else if (k === 'q' || k === 'escape') { closeAllPanels(); }
        e.preventDefault(); return;
      }
      if (s.skillsOpen && down) {
        if (k === 'q' || k === 'escape') { closeAllPanels(); }
        else if (k === 'arrowup') s.skillChoice = Math.max(0, s.skillChoice - 1);
        else if (k === 'arrowdown') s.skillChoice = Math.min(ABILITIES.length - 1, s.skillChoice + 1);
        else if (k === 'e' && s.sp > 0) {
          const ab = ABILITIES[s.skillChoice];
          if (ab && !s.learnedAbilities.includes(ab.id)) {
            s.learnedAbilities.push(ab.id);
            s.sp--;
            s.battleLog.push(`Learned ${ab.name}!`);
            playSound('levelup');
            saveGame();
          }
        }
        e.preventDefault(); return;
      }
      if (s.inventoryOpen && down) {
        if (k === 'q' || k === 'escape') { closeAllPanels(); }
        else if (k === 'tab') s.inventoryTab = s.inventoryTab === 0 ? 1 : 0;
        else if (k === 'arrowup') s.inventoryChoice = Math.max(0, s.inventoryChoice - 1);
        else if (k === 'arrowdown') s.inventoryChoice = Math.min(s.inventory.length - 1, s.inventoryChoice + 1);
        else if (k === 'e' && s.inventory.length > 0) {
          const item = s.inventory[s.inventoryChoice];
          if (item?.id === 'potion') { s.hp = Math.min(s.maxHp, s.hp + 30); s.inventory.splice(s.inventoryChoice, 1); playSound('heal'); }
        }
        e.preventDefault(); return;
      }
      if (k === 'e') {
        e.preventDefault();
        if (down && !s.ePressed) { s.ePressed = true; if (s.dialogueActive || s.signActive) advanceInteraction(); else if (s.shopActive) buyItemFromUI(s.shopSelected); else checkInteraction(); }
        if (!down) s.ePressed = false; (keys as Record<string, boolean>).e = down;
      }
      if (k === 'q') { e.preventDefault(); if (down && s.shopActive) { closeAllPanels(); playSound('interact', 0.5); } }
      if (k === 'i' && down && !s.battleActive) { s.inventoryOpen = !s.inventoryOpen; s.inventoryChoice = 0; if (!s.inventoryOpen) closeAllPanels(); }
      if (k === 'k' && down && !s.battleActive) { s.skillsOpen = !s.skillsOpen; s.skillChoice = 0; if (s.skillsOpen) { s.menuOpen = false; s.inventoryOpen = false; s.craftOpen = false; } else { closeAllPanels(); } }
      if (k === 'm' && down && !s.battleActive) { s.menuOpen = !s.menuOpen; if (!s.menuOpen) closeAllPanels(); }
      if (k === 'c' && down && !s.battleActive) { s.craftOpen = !s.craftOpen; s.craftChoice = 0; if (!s.craftOpen) closeAllPanels(); }
      if (k === 'l' && down && !s.battleActive) { const loaded = loadGame(); if (loaded) playSound('interact'); else playSound('interact', 0.5); }
      if (['w', 'a', 's', 'd'].includes(k)) { e.preventDefault(); (keys as Record<string, boolean>)[k] = down; }
    }
    function onKeyDown(e: KeyboardEvent) { handleKey(e, true); }
    function onKeyUp(e: KeyboardEvent) { handleKey(e, false); }
    window.addEventListener('keydown', onKeyDown); window.addEventListener('keyup', onKeyUp);
    function onFirstClick() { initAudio(); document.removeEventListener('click', onFirstClick); document.removeEventListener('keydown', onFirstClick); }
    document.addEventListener('click', onFirstClick); document.addEventListener('keydown', onFirstClick);

    loadGame(); s.px = 44; s.py = 37; s.hasDoneIntro = false; // always spawn at village center

    let lastTime = 0;
    function loop(time: number) {
      const c = canvasRef.current!;
      const dt = Math.min((time - lastTime) / 16.667, 3); lastTime = time; s.time += dt;

      s.timeOfDay += dt * 0.002; if (s.timeOfDay > 1) s.timeOfDay -= 1;
      const tod = s.timeOfDay, brightness = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin((tod - 0.25) * Math.PI * 2)), darkness = 1 - brightness, sunAngle = (tod - 0.25) * Math.PI * 2;

      s.weatherTimer += dt;
      if (s.weatherTimer > 600) { s.weatherTimer = 0; s.isRaining = !s.isRaining; s.rainIntensity = s.isRaining ? 0.3 + Math.random() * 0.5 : 0; }
      if (s.isRaining && s.rainIntensity < 0.8) s.rainIntensity = Math.min(0.8, s.rainIntensity + dt * 0.002);
      if (!s.isRaining && s.rainIntensity > 0) s.rainIntensity = Math.max(0, s.rainIntensity - dt * 0.003);

      if (rainGain && audioCtx) {
        const tr = s.rainIntensity * 0.12; rainGain.gain.value += (tr - rainGain.gain.value) * 0.01 * dt;
        if (rainGain.gain.value > 0.001 && !rainNoise) {
          try { rainNoise = audioCtx.createBufferSource(); const bs = audioCtx.sampleRate * 2; const b = audioCtx.createBuffer(1, bs, audioCtx.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < bs; i++) d[i] = Math.random() * 2 - 1; rainNoise.buffer = b; rainNoise.loop = true; rainNoise.connect(rainGain); rainNoise.start(); } catch {}
        }
        if (rainGain.gain.value < 0.001 && rainNoise) { try { rainNoise.stop(); rainNoise.disconnect(); } catch {} rainNoise = null; }
      }
      if (ambientOsc && audioCtx) ambientOsc.frequency.value += ((50 + darkness * 25) - ambientOsc.frequency.value) * 0.01 * dt;

      // Lightning
      if (s.isRaining && s.rainIntensity > 0.3) {
        s.lightningTimer -= dt;
        if (s.lightningTimer <= 0) {
          s.lightningTimer = 200 + Math.random() * 500;
          s.lightningFlash = 1.0 + Math.random() * 0.4;
          if (Math.random() < 0.35) playTone(28 + Math.random() * 8, 0.3 + Math.random() * 0.2, 0.12 + Math.random() * 0.08, 'sawtooth', 10 + Math.random() * 5);
        }
      }
      if (s.lightningFlash > 0) { s.lightningFlash -= dt * 0.035; if (s.lightningFlash < 0) s.lightningFlash = 0; }

      if (s.interactCooldown > 0) s.interactCooldown -= dt;
      if (s.hasStarted && !s.hasDoneIntro && Math.abs(s.px - 52) < 3 && Math.abs(s.py - 36) < 3) startIntroCutscene();

      if (s.battleAnimating) { s.battleAnimTimer -= dt; if (s.battleAnimTimer <= 0) s.battleAnimating = false; }
      if (s.battleFade < 1 && s.battleActive) s.battleFade = Math.min(1, s.battleFade + dt * 0.05);
      if (!s.battleActive && s.battleFade > 0) s.battleFade = Math.max(0, s.battleFade - dt * 0.05);
      if (s.battleActive && s.battleEnemy) {
        s.battleEnemyDisplayHp += (s.battleEnemy.hp - s.battleEnemyDisplayHp) * 0.06 * dt;
        s.battlePlayerDisplayHp += (s.hp - s.battlePlayerDisplayHp) * 0.06 * dt;
        if (s.battleEnemyFlash > 0) s.battleEnemyFlash -= dt;
        if (s.battlePlayerFlash > 0) s.battlePlayerFlash -= dt;
      }

      // Auto-save every 30s
      if (Math.floor(s.time) % 1800 < dt) saveGame();

      // Defeat recovery ÔÇö trigger Old Sage dialogue + penalties
      if (s.justDefeated && !s.battleActive && !s.dialogueActive && !s.shopActive && !s.signActive && !s.inventoryOpen && !s.craftOpen && !s.menuOpen) {
        s.justDefeated = false;
        const goldLost = Math.floor(s.playerGold * 0.25);
        s.playerGold = Math.max(0, s.playerGold - goldLost);
        s.hp = Math.floor(s.maxHp / 2);
        s.mp = Math.floor(s.maxMp / 2);
        s.px = 44; s.py = 37;
        s.camX = s.px * TILE - c.width / 2;
        s.camY = s.py * TILE - c.height / 2;
        enemiesRef.current = makeEnemies();
        closeAllPanels();
        s.dialogueActive = true;
        s.dialogueNpc = 'Old Sage';
        s.dialogueLines = [
          'You took quite a beating out there...',
          'I found you collapsed and brought you back to the village.',
          'Rest up. And try to be more careful next time.',
          `You lost ${goldLost} gold in the chaos...`,
        ];
        s.dialogueIndex = 0;
        playSound('interact');
        saveGame();
      }

      const { px, py } = s;
      const W = c.width, H = c.height;

      let dx = 0, dy = 0;
      if (s.hasStarted && !s.cutsceneActive && !s.dialogueActive && !s.shopActive && !s.signActive && !s.inventoryOpen && !s.craftOpen && !s.menuOpen && !s.battleActive) {
        if (keys.w) dy = -1; if (keys.s) dy = 1; if (keys.a) dx = -1; if (keys.d) dx = 1;
      }
      if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }
      const wasMoving = Math.abs(s.vx) > 0.1 || Math.abs(s.vy) > 0.1;
      s.vx += (dx * s.speed - s.vx) * 0.15 * dt; s.vy += (dy * s.speed - s.vy) * 0.15 * dt;
      if (Math.abs(s.vx) < 0.01) s.vx = 0; if (Math.abs(s.vy) < 0.01) s.vy = 0;
      const isMoving = Math.abs(s.vx) > 0.1 || Math.abs(s.vy) > 0.1;
      if (dx < 0) s.dir = 2; else if (dx > 0) s.dir = 3; else if (dy < 0) s.dir = 1; else if (dy > 0) s.dir = 0;
      if (isMoving) { s.frameTimer += dt; if (s.frameTimer > 8) { s.frame = (s.frame + 1) % 4; s.frameTimer = 0; } } else { s.frame = 0; s.frameTimer = 0; }
      const newX = px + s.vx * dt / TILE, newY = py + s.vy * dt / TILE;
      if (!isBlocked(Math.round(newX), Math.round(py))) s.px = newX; else s.vx = 0;
      if (!isBlocked(Math.round(px), Math.round(newY))) s.py = newY; else s.vy = 0;

      s.footstepCooldown -= dt;
      if (isMoving && s.footstepCooldown <= 0) {
        s.footstepCooldown = 14; const tx = Math.round(s.px), ty = Math.round(s.py);
        const t = (ty >= 0 && ty < ROWS && tx >= 0 && tx < COLS) ? worldMap[ty][tx] : T.GRASS;
        if (t !== T.WATER && t !== T.DEEP_WATER) { spawnFootstepParticles(tx, ty, t); playFootstep(t); }
      }

      // NPC patrol
      const offsets = s.npcOffsets; const npcTimers = npcTimersRef.current;
      for (let i = 0; i < NPC_DATA.length; i++) { const npc = NPC_DATA[i]; npcTimers[i] += dt; if (npc.patrol && npcTimers[i] > 120 + Math.random() * 80) { npcTimers[i] = 0; const dx_ = npc.patrol.x2 - npc.patrol.x1, dy_ = npc.patrol.y2 - npc.patrol.y1; if (Math.abs(dx_) > Math.abs(dy_)) { if (npc.x <= npc.patrol.x1) { npc.x = npc.patrol.x2; npc.dir = 2; } else { npc.x = npc.patrol.x1; npc.dir = 3; } } else { if (npc.y <= npc.patrol.y1) { npc.y = npc.patrol.y2; npc.dir = 1; } else { npc.y = npc.patrol.y1; npc.dir = 0; } } offsets[i].step = !offsets[i].step; playFootstep(T.DIRT); } }

      // Enemy AI
      const enemies = enemiesRef.current;
      for (const e of enemies) {
        if (e.hp <= 0) continue;
        const dist = Math.abs(s.px - e.x) + Math.abs(s.py - e.y);
        if (dist < e.aggroRange && !s.battleActive) {
          e.state = 'chase'; e.moveTimer += dt;
          const ex = e.x < s.px ? 1 : e.x > s.px ? -1 : 0;
          const ey = e.y < s.py ? 1 : e.y > s.py ? -1 : 0;
          if (e.moveTimer > 10) { e.moveTimer = 0; const nx = e.x + ex, ny = e.y + ey; if (!isEnemyBlocked(nx, ny) && !enemies.some(o => o !== e && o.x === nx && o.y === ny)) { e.x = nx; e.y = ny; } }
          if (dist <= 1.2) { startBattle(e); e.hp = 0; break; }
        } else if (e.state === 'chase' && dist >= e.aggroRange * 2) { e.state = 'patrol'; }
        else if (e.state === 'patrol') {
          e.moveTimer += dt;
          if (e.moveTimer > 60 + Math.random() * 40) { e.moveTimer = 0; const dx_ = e.patrol.x2 - e.patrol.x1, dy_ = e.patrol.y2 - e.patrol.y1; const nx = e.x + (Math.random() < 0.5 ? (dx_ > 0 ? 1 : -1) : 0), ny = e.y + (Math.random() < 0.5 ? 0 : (dy_ > 0 ? 1 : -1)); if (!isEnemyBlocked(nx, ny) && nx >= Math.min(e.patrol.x1, e.patrol.x2) && nx <= Math.max(e.patrol.x1, e.patrol.x2) && ny >= Math.min(e.patrol.y1, e.patrol.y2) && ny <= Math.max(e.patrol.y1, e.patrol.y2)) { e.x = nx; e.y = ny; } }
        }
        // Respawn defeated enemies
        if (e.hp <= 0 && s.time % 600 < dt && !s.battleActive) { e.hp = e.maxHp; }
      }

      // Camera
      const targetCX = s.px * TILE - W / 2, targetCY = s.py * TILE - H / 2;
      s.camX += (targetCX - s.camX) * 0.08 * dt; s.camY += (targetCY - s.camY) * 0.08 * dt;
      if (s.shakeIntensity > 0) { s.shakeX = (Math.random() - 0.5) * s.shakeIntensity; s.shakeY = (Math.random() - 0.5) * s.shakeIntensity; s.shakeIntensity *= 0.9 * dt * 0.1; if (s.shakeIntensity < 0.3) { s.shakeIntensity = 0; s.shakeX = 0; s.shakeY = 0; } }
      const camX = s.camX + s.shakeX, camY = s.camY + s.shakeY;
      const psx = s.px * TILE - camX, psy = s.py * TILE - camY;

      for (const f of ff) { f.x += f.vx * dt; f.y += f.vy * dt; f.life -= dt; f.twinkle += f.twinkleSpeed * dt; if (f.life <= 0 && brightness < 0.7) { f.x = camX + Math.random() * W; f.y = camY + Math.random() * H; f.life = 100 + Math.random() * 200; f.vx = (Math.random() - 0.5) * 0.3; f.vy = (Math.random() - 0.5) * 0.3; } }
      for (const f of fog) { f.x += f.speed * dt; if (f.x > camX + W + 200) f.x = camX - 200; }
      for (const r of rain) { r.x += r.wind * dt; r.y += r.speed * dt; if (r.y > camY + H + 20) { r.y = camY - 20; r.x = camX + Math.random() * W; } if (r.x < camX - 20) r.x = camX + W + 20; }
      const fp = footstepParticlesRef.current;
      for (let i = fp.length - 1; i >= 0; i--) { const p = fp[i]; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 0.1 * dt; p.life -= dt; if (p.life <= 0) fp.splice(i, 1); }
      // Leaf particles
      const leaves = leafParticlesRef.current;
      for (let i = leaves.length - 1; i >= 0; i--) {
        const l = leaves[i]; l.x += l.vx * dt; l.y += l.vy * dt; l.rotation += l.rotSpeed * dt; l.life -= dt;
        if (l.life <= 0) { leaves[i] = makeLeaf(camX, camY, W, H); }
      }
      // Dust particles
      const dust = dustParticlesRef.current;
      for (let i = dust.length - 1; i >= 0; i--) {
        const d = dust[i]; d.x += d.vx * dt; d.y += d.vy * dt; d.life -= dt;
        if (d.life <= 0) { dust[i] = makeDust(camX, camY, W, H); }
      }
      // Ember particles
      const embers = emberParticlesRef.current;
      for (let i = embers.length - 1; i >= 0; i--) {
        const eb = embers[i]; eb.x += eb.vx * dt; eb.y += eb.vy * dt; eb.life -= dt;
        if (eb.life <= 0) { embers[i] = makeEmber(camX, camY, W, H); }
      }
      // Camera zoom
      const zoomTarget = s.battleActive ? 1.3 : 1;
      s.targetZoom += (zoomTarget - s.targetZoom) * 0.05 * dt;
      s.zoom += (s.targetZoom - s.zoom) * 0.1 * dt;

      // --- Draw ---
      ctx.imageSmoothingEnabled = false;
      ctx.save();
      const zoom = s.zoom;
      ctx.translate(W / 2, H / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-W / 2, -H / 2);
      const skyTop = `hsl(${220 + darkness * 30}, ${40 + darkness * 30}%, ${8 + brightness * 18}%)`;
      const skyMid = `hsl(${220 + darkness * 20}, ${30 + darkness * 20}%, ${6 + brightness * 14}%)`;
      const skyBot = `hsl(${220 + darkness * 10}, ${20 + darkness * 10}%, ${4 + brightness * 10}%)`;
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
      skyGrad.addColorStop(0, skyTop); skyGrad.addColorStop(0.3, skyMid); skyGrad.addColorStop(0.7, skyBot); skyGrad.addColorStop(1, '#0a0e1a');
      ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, W, H);
      const sunX = W * 0.5 + Math.cos(sunAngle) * W * 0.4, sunY = H * 0.5 + Math.sin(sunAngle) * H * 0.35;
      if (brightness > 0.45) { const g = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 80); g.addColorStop(0, 'rgba(255,220,150,0.6)'); g.addColorStop(0.5, 'rgba(255,200,100,0.2)'); g.addColorStop(1, 'rgba(255,200,100,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sunX, sunY, 80, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#ffe8b0'; ctx.beginPath(); ctx.arc(sunX, sunY, 12, 0, Math.PI * 2); ctx.fill(); }
      else { const g = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 50); g.addColorStop(0, 'rgba(200,220,255,0.4)'); g.addColorStop(1, 'rgba(200,220,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sunX, sunY, 50, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#c8d8e8'; ctx.beginPath(); ctx.arc(sunX, sunY, 8, 0, Math.PI * 2); ctx.fill(); }

      const groundBase = `hsl(130, 40%, ${4 + brightness * 8}%)`;
      ctx.fillStyle = groundBase; ctx.fillRect(0, 0, W, H);
      const startTX = Math.max(0, Math.floor(camX / TILE) - 1), startTY = Math.max(0, Math.floor(camY / TILE) - 1);
      const endTX = Math.min(COLS, Math.ceil((camX + W) / TILE) + 1), endTY = Math.min(ROWS, Math.ceil((camY + H) / TILE) + 1);
      const windDir = Math.sin(s.time * 0.005) * 2, windStr = 1 + Math.sin(s.time * 0.003 + 1) * 0.5;
      const shDx = Math.cos(sunAngle) * 10 * brightness, shDy = (Math.sin(sunAngle) * 6 + 4) * brightness;
      const shAlpha = brightness * 0.2;

      for (let y = startTY; y < endTY; y++) for (let x = startTX; x < endTX; x++) {
        const t = worldMap[y][x], sx = x * TILE - camX, sy = y * TILE - camY;
        const dh = (p: number) => det(x, y, p); const dc = (p: number) => Math.sin(x * p + y * p * 1.7 + s.time * 0.04);
        switch (t) {
          case T.GRASS: {
            ctx.fillStyle = `hsl(130, 30%, ${7 + brightness * 6}%)`; ctx.fillRect(sx, sy, TILE, TILE);
            const bs = Math.sin(s.time * 0.04 + x * 0.5 + y * 0.3) * windStr * 1.5 + windDir * 0.5;
            for (let i = 0; i < 6; i++) { const bx = 4 + dh(i * 7 + 1) * 24, bh = 6 + dh(i * 11 + 3) * 12, bw = 1 + (dh(i * 13 + 5) > 0.5 ? 2 : 1); const sw = dc(i * 3 + 1) * 1.2 + windDir * 0.4; ctx.fillStyle = `hsl(${120 + dh(i * 5) * 20}, ${35 + dh(i * 3) * 15}%, ${10 + brightness * 6 + dh(i * 7) * 4}%)`; ctx.fillRect(sx + bx + sw, sy + 28 - bh, bw, bh); if (dh(i * 17 + 1) > 0.6) { ctx.fillStyle = `hsl(115, 45%, ${16 + brightness * 6}%)`; ctx.fillRect(sx + bx + sw - 0.5, sy + 28 - bh - 2, 1, 2); } }
            ctx.fillStyle = `hsl(130, 25%, ${6 + brightness * 4}%)`; for (let i = 0; i < 3; i++) { const px = 4 + dh(i * 23 + 7) * 24; ctx.fillRect(sx + px, sy + 24 + dh(i * 5) * 4, 2 + dh(i * 3) * 2, 1); }
            if (dh(99) > 0.7) { ctx.fillStyle = `rgba(180,220,150,${0.06 + brightness * 0.04})`; ctx.fillRect(sx + dh(55) * 26, sy + 4 + dh(33) * 22, 2, 2); }
            break;
          }
          case T.DIRT: case T.PATH: {
            ctx.fillStyle = `hsl(35, 18%, ${9 + brightness * 6}%)`; ctx.fillRect(sx, sy, TILE, TILE);
            ctx.fillStyle = `hsl(35, 15%, ${12 + brightness * 5}%)`; ctx.fillRect(sx + 2, sy + 4, 6, 3); ctx.fillRect(sx + 14, sy + 12, 6, 3); ctx.fillRect(sx + 4, sy + 22, 8, 3);
            for (let i = 0; i < 3; i++) { const px = 3 + dh(i * 13 + 1) * 26, py = 6 + dh(i * 17 + 3) * 20; ctx.fillStyle = `hsl(35, 20%, ${7 + dh(i * 5) * 4 + brightness * 4}%)`; ctx.beginPath(); ctx.arc(sx + px, sy + py, 2 + dh(i * 7) * 2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = `hsl(40, 15%, ${16 + brightness * 5}%)`; ctx.beginPath(); ctx.arc(sx + px - 1, sy + py - 1, 1, 0, Math.PI * 2); ctx.fill(); }
            if (t === T.PATH) { ctx.fillStyle = `hsl(30, 12%, ${11 + brightness * 5}%)`; ctx.fillRect(sx + 12, sy + 6, 4, 2); ctx.fillRect(sx + 18, sy + 18, 5, 2); ctx.fillRect(sx + 6, sy + 14, 3, 2); }
            break;
          }
          case T.WATER: {
            const w1 = Math.sin(s.time * 0.03 + x * 0.5 + y * 0.3) * 3, w2 = Math.sin(s.time * 0.05 + x * 0.7 + y * 0.2) * 2, w3 = Math.sin(s.time * 0.02 + x * 0.3 + y * 0.5 + 1) * 2;
            ctx.fillStyle = `hsl(210, ${50 + brightness * 20}%, ${5 + brightness * 7}%)`; ctx.fillRect(sx, sy, TILE, TILE);
            const flow = Math.sin(s.time * 0.015 + x * 0.2 + y * 0.15) * 4;
            ctx.fillStyle = `hsla(200, 50%, ${35 + brightness * 20}%, ${0.12 + brightness * 0.08})`; ctx.fillRect(sx + w1 + flow, sy + 4, TILE, 1.5); ctx.fillRect(sx - w2 + flow, sy + 14, TILE, 1); ctx.fillRect(sx + w3 + flow, sy + 24, TILE, 1.5);
            ctx.fillStyle = `hsla(195, 40%, ${30 + brightness * 15}%, ${0.06 + brightness * 0.04})`; ctx.fillRect(sx + w1 * 0.5 + flow * 2, sy + 9, TILE, 0.8); ctx.fillRect(sx - w2 * 0.8 + flow, sy + 19, TILE, 0.8);
            if (y > 0) { const a = worldMap[y - 1][x]; if (a !== T.WATER && a !== T.DEEP_WATER) { ctx.fillStyle = `rgba(200,230,240,${0.1 + brightness * 0.06})`; ctx.fillRect(sx, sy, TILE, 2); for (let i = 0; i < 4; i++) { ctx.fillStyle = `rgba(220,240,250,${0.08 + dh(i * 13) * 0.06})`; ctx.beginPath(); ctx.arc(sx + 4 + i * 8 + dh(i * 7) * 3, sy + dh(i * 11) * 2, 1.5, 0, Math.PI * 2); ctx.fill(); } } }
            if (x > 0) { const l = worldMap[y][x - 1]; if (l !== T.WATER && l !== T.DEEP_WATER) { ctx.fillStyle = `rgba(180,210,230,${0.06 + brightness * 0.04})`; ctx.fillRect(sx, sy, 2, TILE); } }
            const sh = Math.sin(s.time * 0.04 + x * 1.2 + y * 0.8) * 0.5 + 0.5; ctx.fillStyle = `rgba(180,220,255,${sh * 0.04 * brightness})`; ctx.fillRect(sx + w1 * 0.5 + flow, sy + 6, 4, 2); ctx.fillRect(sx - w2 * 0.5 + flow, sy + 18, 3, 2);
            const sp = Math.sin(s.time * 0.06 + x * 3.7 + y * 2.9) * 0.5 + 0.5; if (sp > 0.85 && brightness > 0.4) { ctx.fillStyle = `rgba(220,240,255,${sp * 0.2 * brightness})`; ctx.beginPath(); ctx.arc(sx + 6 + Math.sin(x * 2.3 + y * 1.7) * 10 + flow, sy + 10 + Math.cos(x * 1.3 + y * 2.7) * 12, 2, 0, Math.PI * 2); ctx.fill(); }
            break;
          }
          case T.DEEP_WATER: ctx.fillStyle = `hsl(210, 35%, ${3 + brightness * 3}%)`; ctx.fillRect(sx, sy, TILE, TILE);
            if (dh(55) > 0.6) { ctx.fillStyle = `hsla(200, 30%, 20%, ${0.05 + dh(33) * 0.04})`; ctx.fillRect(sx + dh(77) * 28, sy + dh(99) * 28, 6, 0.8); } break;
          case T.TREE: {
            ctx.fillStyle = groundBase; ctx.fillRect(sx, sy, TILE, TILE);
            const d = det(x, y, 42), sw2 = Math.sin(s.time * 0.02 + x * 2.1 + y * 1.7) * 1.5 + windDir * 0.3, ll2 = brightness * 15 + 8, trunkX = 14 + d * 4;
            ctx.fillStyle = `rgba(0,0,0,${shAlpha})`; ctx.beginPath(); ctx.ellipse(sx + 16 + shDx * 0.6, sy + 28 + shDy * 0.3, 16, 5, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(25, 25%, ${7 + brightness * 5}%)`; ctx.fillRect(sx + trunkX, sy + 22, 5, 10);
            ctx.fillStyle = `hsl(30, 20%, ${11 + brightness * 5}%)`; ctx.fillRect(sx + trunkX + 1, sy + 24, 1, 6); ctx.fillRect(sx + trunkX + 3, sy + 26, 1, 4);
            ctx.fillStyle = `hsl(25, 20%, ${12 + brightness * 4}%)`; ctx.fillRect(sx + trunkX + 3, sy + 22, 2, 3);
            ctx.fillStyle = `hsl(130, 35%, ${ll2 - 3}%)`; ctx.beginPath(); ctx.arc(sx + 16 + sw2, sy + 20, 14, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(135, 32%, ${ll2}%)`; ctx.beginPath(); ctx.arc(sx + 14 + sw2 * 1.1, sy + 16, 11, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(130, 38%, ${ll2 + 2}%)`; ctx.beginPath(); ctx.arc(sx + 18 + sw2 * 0.9, sy + 13, 9, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(120, 40%, ${ll2 + 4}%)`; ctx.beginPath(); ctx.arc(sx + 15 + sw2, sy + 10, 7, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(120, 35%, ${ll2 + 6}%)`; ctx.beginPath(); ctx.arc(sx + 13 + sw2 * 0.8, sy + 12, 5, 0, Math.PI * 2); ctx.fill();
            if (brightness > 0.4) for (let i = 0; i < 3; i++) { ctx.fillStyle = `rgba(200,255,180,${0.08 + dh(i * 17 + 1) * 0.1})`; ctx.beginPath(); ctx.arc(sx + 8 + dh(i * 23 + 3) * 16 + sw2 * dh(i * 7), sy + 8 + dh(i * 13 + 5) * 14, 1.5 + dh(i * 5) * 0.5, 0, Math.PI * 2); ctx.fill(); }
            break;
          }
          case T.ROCK: {
            ctx.fillStyle = groundBase; ctx.fillRect(sx, sy, TILE, TILE);
            ctx.fillStyle = `rgba(0,0,0,${shAlpha})`; ctx.beginPath(); ctx.ellipse(sx + 16 + shDx * 0.6, sy + 30, 14, 4, 0, 0, Math.PI * 2); ctx.fill();
            const rx = 6 + dh(11) * 16, ry = 8 + dh(23) * 14, rw = 6 + dh(37) * 10, rh = 5 + dh(53) * 7;
            ctx.fillStyle = `hsl(0, 0%, ${12 + brightness * 5}%)`; ctx.beginPath(); ctx.ellipse(sx + rx, sy + ry, rw, rh, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(0, 0%, ${16 + brightness * 5}%)`; ctx.beginPath(); ctx.ellipse(sx + rx - 2, sy + ry - 2, rw - 2, rh - 2, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(0, 0%, ${9 + brightness * 4}%)`; ctx.beginPath(); ctx.ellipse(sx + rx + 1, sy + ry + 2, rw - 3, rh - 3, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `rgba(180,200,180,${0.04 + brightness * 0.04})`; ctx.beginPath(); ctx.ellipse(sx + rx - 3, sy + ry - 3, 2, 1.5, 0, 0, Math.PI * 2); ctx.fill();
            if (dh(71) > 0.5) { ctx.fillStyle = `hsl(130, 30%, ${6 + brightness * 4}%)`; ctx.beginPath(); ctx.ellipse(sx + rx + 2, sy + ry - 1, 2, 1, 0, 0, Math.PI * 2); ctx.fill(); }
            break;
          }
          case T.RUINS: {
            ctx.fillStyle = groundBase; ctx.fillRect(sx, sy, TILE, TILE);
            ctx.fillStyle = `rgba(0,0,0,${shAlpha * 0.8})`; ctx.beginPath(); ctx.ellipse(sx + 16 + shDx * 0.5, sy + 30, 16, 5, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(30, 5%, ${10 + brightness * 5}%)`; ctx.fillRect(sx + 4, sy + 10, 24, 18);
            ctx.fillStyle = `hsl(30, 8%, ${13 + brightness * 5}%)`; ctx.fillRect(sx + 4, sy + 10, 24, 1); ctx.fillRect(sx + 4, sy + 16, 24, 1); ctx.fillRect(sx + 4, sy + 22, 24, 1);
            ctx.fillStyle = `hsl(30, 3%, ${6 + brightness * 4}%)`; ctx.fillRect(sx + 6, sy + 12, 3, 10); ctx.fillRect(sx + 18, sy + 14, 4, 6);
            ctx.fillStyle = `hsl(130, 30%, ${6 + brightness * 4}%)`; ctx.fillRect(sx + 10, sy + 11, 2, 4); ctx.fillRect(sx + 14, sy + 18, 3, 3);
            ctx.fillStyle = `hsl(130, 20%, ${8 + brightness * 3}%)`; ctx.beginPath(); ctx.arc(sx + 12 + dh(33) * 8, sy + 12 + dh(55) * 8, 3, 0, Math.PI * 2); ctx.fill();
            break;
          }
          case T.SIGN: {
            ctx.fillStyle = groundBase; ctx.fillRect(sx, sy, TILE, TILE);
            ctx.fillStyle = `rgba(0,0,0,${shAlpha})`; ctx.beginPath(); ctx.ellipse(sx + 16 + shDx * 0.5, sy + 30, 12, 4, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(25, 25%, ${10 + brightness * 5}%)`; ctx.fillRect(sx + 13, sy + 20, 4, 10);
            ctx.fillStyle = `hsl(25, 20%, ${13 + brightness * 5}%)`; ctx.fillRect(sx + 14, sy + 22, 1, 6);
            ctx.fillStyle = `hsl(30, 20%, ${14 + brightness * 6}%)`; ctx.fillRect(sx + 6, sy + 6, 18, 14);
            ctx.fillStyle = `hsl(25, 25%, 4%)`; ctx.fillRect(sx + 6, sy + 6, 18, 2); ctx.fillRect(sx + 6, sy + 18, 18, 2);
            ctx.fillStyle = `hsl(25, 20%, 8%)`; ctx.fillRect(sx + 6, sy + 6, 2, 14); ctx.fillRect(sx + 22, sy + 6, 2, 14);
            ctx.fillStyle = `hsl(25, 15%, 6%)`; ctx.fillRect(sx + 12, sy + 10, 8, 1); ctx.fillRect(sx + 10, sy + 14, 10, 1);
            break;
          }
          case T.HOUSE_WALL: {
            ctx.fillStyle = `hsl(20, 15%, ${10 + brightness * 5}%)`; ctx.fillRect(sx, sy, TILE, TILE);
            ctx.fillStyle = `rgba(0,0,0,${shAlpha * 0.8})`; ctx.beginPath(); ctx.ellipse(sx + 16 + shDx * 0.4, sy + 30, 18, 5, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(20, 10%, ${13 + brightness * 5}%)`; for (let i = 0; i < 3; i++) { ctx.fillRect(sx + 2, sy + 3 + i * 10, TILE - 4, 1); }
            ctx.fillStyle = `hsl(20, 5%, ${7 + brightness * 4}%)`; for (let i = 0; i < 3; i++) { ctx.fillRect(sx + 5 + i * 11, sy + 6, 7, 7); }
            ctx.fillStyle = `hsl(45, 40%, ${60 + brightness * 10}%)`; for (let i = 0; i < 3; i++) { ctx.fillRect(sx + 7 + i * 11, sy + 8, 3, 3); }
            break;
          }
          case T.HOUSE_ROOF: {
            ctx.fillStyle = `hsl(30, 30%, ${8 + brightness * 4}%)`; ctx.fillRect(sx, sy, TILE, TILE);
            ctx.fillStyle = `rgba(0,0,0,${shAlpha * 0.5})`; ctx.beginPath(); ctx.ellipse(sx + 16 + shDx * 0.3, sy + 30, 18, 5, 0, 0, Math.PI * 2); ctx.fill();
            for (let i = 0; i < 4; i++) { ctx.fillStyle = `hsl(30, 25%, ${9 + i * 2 + brightness * 4}%)`; ctx.fillRect(sx + 2, sy + 2 + i * 7, TILE - 4, 5); ctx.fillStyle = `hsl(30, 20%, ${6 + brightness * 3}%)`; ctx.fillRect(sx + 2, sy + 2 + i * 7, TILE - 4, 1); }
            ctx.fillStyle = `hsl(30, 35%, ${12 + brightness * 5}%)`; ctx.fillRect(sx + 6, sy + 1, TILE - 12, 2);
            break;
          }
          case T.HOUSE_DOOR: {
            const open = doorStates[tileKey(x, y)]; ctx.fillStyle = `hsl(20, 15%, ${10 + brightness * 5}%)`; ctx.fillRect(sx, sy, TILE, TILE);
            ctx.fillStyle = `rgba(0,0,0,${shAlpha * 0.6})`; ctx.beginPath(); ctx.ellipse(sx + 16 + shDx * 0.5, sy + 30, 14, 4, 0, 0, Math.PI * 2); ctx.fill();
            if (open) { ctx.fillStyle = `hsla(0,0%,0%,0.6)`; ctx.fillRect(sx + 4, sy + 2, TILE - 8, TILE - 6); ctx.fillStyle = '#ffd36b'; ctx.fillRect(sx + 4, sy + 16, 3, 3); } else { ctx.fillStyle = `hsl(25, 20%, ${7 + brightness * 5}%)`; ctx.fillRect(sx + 6, sy + 4, TILE - 12, TILE - 6); ctx.fillStyle = `hsl(25, 15%, ${10 + brightness * 5}%)`; ctx.fillRect(sx + 8, sy + 6, TILE - 16, 1); ctx.fillRect(sx + 8, sy + 14, TILE - 16, 1); ctx.fillStyle = '#ffd36b'; ctx.fillRect(sx + 20, sy + 17, 3, 3); }
            ctx.fillStyle = `hsl(20, 15%, ${13 + brightness * 5}%)`; ctx.fillRect(sx, sy, TILE, 1); ctx.fillRect(sx, sy + TILE - 1, TILE, 1); ctx.fillRect(sx, sy, 1, TILE); ctx.fillRect(sx + TILE - 1, sy, 1, TILE);
            break;
          }
          case T.FLOOR: {
            ctx.fillStyle = `hsl(20, 10%, ${10 + brightness * 5}%)`; ctx.fillRect(sx, sy, TILE, TILE);
            for (let i = 0; i < 4; i++) { const py = 3 + i * 8; ctx.fillStyle = `hsl(20, 8%, ${12 + brightness * 5}%)`; ctx.fillRect(sx + 2, sy + py, TILE - 4, 5); ctx.fillStyle = `hsl(20, 6%, ${8 + brightness * 4}%)`; ctx.fillRect(sx + 2, sy + py + 5, TILE - 4, 1); ctx.fillStyle = `hsl(20, 5%, 5%)`; ctx.fillRect(sx + 6 + i * 8, sy + py + 1, 1, 1); }
            break;
          }
          case T.FLOWER: {
            ctx.fillStyle = `hsl(130, 35%, ${8 + brightness * 6}%)`; ctx.fillRect(sx, sy, TILE, TILE);
            const fs = Math.sin(s.time * 0.03 + x + y * 0.5) * 1.5 + windDir * 0.5, hue = 280 + dh(13) * 120, hue2 = 40 + dh(7) * 40;
            ctx.fillStyle = `hsl(125, 30%, ${10 + brightness * 5}%)`; ctx.fillRect(sx + 16 + fs, sy + 18, 1, 10);
            for (let p = 0; p < 5; p++) { const a = p / 5 * Math.PI * 2 + dh(31) * 0.3; ctx.fillStyle = `hsl(${hue + p * 10}, 50%, ${22 + brightness * 10}%)`; ctx.beginPath(); ctx.ellipse(sx + 16 + fs + Math.cos(a) * 4, sy + 16 + Math.sin(a) * 4, 2.5, 2, a, 0, Math.PI * 2); ctx.fill(); }
            ctx.fillStyle = `hsl(${hue2}, 60%, ${30 + brightness * 10}%)`; ctx.beginPath(); ctx.arc(sx + 16 + fs, sy + 16, 2, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(130, 20%, ${8 + brightness * 4}%)`; ctx.beginPath(); ctx.ellipse(sx + 14 + fs, sy + 24, 3, 1.5, 0.3, 0, Math.PI * 2); ctx.fill();
            break;
          }
          case T.TALL_GRASS: {
            ctx.fillStyle = `hsl(130, 30%, ${7 + brightness * 5}%)`; ctx.fillRect(sx, sy, TILE, TILE);
            const gs = Math.sin(s.time * 0.04 + x * 0.7 + y) * 2.5 + windDir;
            for (let i = 0; i < 6; i++) { const bx = 3 + dh(i * 11 + 1) * 26, bh = 10 + dh(i * 7 + 3) * 16, bw = 2 + dh(i * 5 + 7) * 1, sway = dc(i * 4 + 2) * 2.5 + windDir * 0.6 + gs * dh(i * 3); ctx.fillStyle = `hsl(${120 + dh(i * 17) * 20}, ${35 + dh(i * 13) * 15}%, ${10 + brightness * 6 + dh(i * 19) * 3}%)`; ctx.fillRect(sx + bx + sway, sy + 28 - bh, bw, bh); if (dh(i * 23 + 5) > 0.5) { ctx.fillStyle = `hsl(115, 40%, ${16 + brightness * 6}%)`; ctx.fillRect(sx + bx + sway, sy + 28 - bh - 2, 1, 2); } }
            break;
          }
          case T.FENCE: {
            ctx.fillStyle = `hsl(130, 35%, ${8 + brightness * 6}%)`; ctx.fillRect(sx, sy, TILE, TILE);
            ctx.fillStyle = `rgba(0,0,0,${shAlpha * 0.6})`; ctx.beginPath(); ctx.ellipse(sx + 16 + shDx * 0.5, sy + 28, 18, 4, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `hsl(25, 20%, ${10 + brightness * 5}%)`; ctx.fillRect(sx + 5, sy, 4, 24); ctx.fillRect(sx + 21, sy, 4, 24);
            ctx.fillStyle = `hsl(25, 15%, ${14 + brightness * 5}%)`; ctx.fillRect(sx + 6, sy + 1, 2, 22); ctx.fillRect(sx + 22, sy + 1, 2, 22);
            ctx.fillStyle = `hsl(25, 25%, ${8 + brightness * 4}%)`; ctx.fillRect(sx + 4, sy + 19, TILE - 8, 3); ctx.fillRect(sx + 4, sy + 11, TILE - 8, 3);
            ctx.fillStyle = `hsl(25, 20%, ${5 + brightness * 3}%)`; ctx.fillRect(sx + 4, sy + 11, TILE - 8, 1); ctx.fillRect(sx + 4, sy + 19, TILE - 8, 1);
            ctx.fillStyle = `hsl(30, 15%, ${12 + brightness * 4}%)`; ctx.fillRect(sx + 5, sy, 4, 2); ctx.fillRect(sx + 21, sy, 4, 2);
            break;
          }
          default: ctx.fillStyle = groundBase; ctx.fillRect(sx, sy, TILE, TILE);
        }
      }

      // --- Y-sorted entity rendering ---
      type EntityDraw = { y: number; draw: () => void };
      const entities: EntityDraw[] = [];

      for (const e of enemies) {
        if (e.hp <= 0) continue;
        const ex = e.x * TILE - camX, ey = e.y * TILE - camY;
        if (ex < -TILE || ex > W + TILE || ey < -TILE || ey > H + TILE) continue;
        const epulse = Math.sin(s.time * 0.08 + e.x + e.y) * 0.5;
        const eyIdx = e.y;
        entities.push({ y: eyIdx, draw: () => {
          ctx.fillStyle = `rgba(0,0,0,${Math.max(0.1, brightness * 0.35)})`; ctx.beginPath(); ctx.ellipse(ex + TILE / 2 + shDx * 0.3, ey + TILE - 2 + shDy * 0.2, 9, 3.5, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = e.color; ctx.fillRect(ex + 8, ey + 10 + epulse, 16, 12);
          ctx.font = '12px monospace'; ctx.textAlign = 'center'; ctx.fillText(e.icon, ex + 16, ey + 22 + epulse);
          if (e.isBoss) { ctx.fillStyle = 'rgba(255,200,0,0.4)'; ctx.beginPath(); ctx.arc(ex + 16, ey + 16, 18, 0, Math.PI * 2); ctx.fill(); }
        }});
      }

      for (const npc of NPC_DATA) {
        const nx = npc.x * TILE - camX, ny = npc.y * TILE - camY;
        if (nx < -TILE || nx > W + TILE || ny < -TILE || ny > H + TILE) continue;
        const nb = Math.sin(s.time * 0.1 + npc.x + npc.y) * 0.5;
        const nidx = NPC_DATA.indexOf(npc);
        entities.push({ y: npc.y, draw: () => {
          ctx.fillStyle = `rgba(0,0,0,${Math.max(0.1, brightness * 0.35)})`; ctx.beginPath(); ctx.ellipse(nx + TILE / 2 + shDx * 0.3, ny + TILE - 2 + shDy * 0.2, 10, 3.5, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = npc.color; ctx.fillRect(nx + 8, ny + 10 + nb, 16, 13);
          ctx.fillStyle = '#e0b890'; ctx.fillRect(nx + 10, ny + 3 + nb, 12, 9);
          ctx.fillStyle = npc.hatColor; ctx.fillRect(nx + 8, ny - 1 + nb, 16, 5); ctx.fillRect(nx + 6, ny + 2 + nb, 20, 2);
          const eo = npc.dir === 2 ? -1 : npc.dir === 3 ? 1 : 0;
          ctx.fillStyle = '#fff'; ctx.fillRect(nx + 12 + eo, ny + 6 + nb, 2, 2); ctx.fillRect(nx + 17 + eo, ny + 6 + nb, 2, 2);
          ctx.fillStyle = '#222'; ctx.fillRect(nx + 12 + eo, ny + 6 + nb, 1, 1); ctx.fillRect(nx + 17 + eo, ny + 6 + nb, 1, 1);
          ctx.fillStyle = '#2a2a3a'; const st = offsets[nidx].step ? 2 : 0;
          ctx.fillRect(nx + 10 + st, ny + 23 + nb, 5, 5); ctx.fillRect(nx + 17 - st, ny + 23 + nb, 5, 5);
          ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(nx - 4, ny - 22, 40, 16);
          ctx.fillStyle = '#fff'; ctx.font = '14px monospace'; ctx.textAlign = 'center'; ctx.fillText(npc.name, nx + 16, ny - 10);
        }});
      }

      entities.push({ y: s.py, draw: () => {
        ctx.fillStyle = `rgba(0,0,0,${Math.max(0.1, brightness * 0.4)})`; ctx.beginPath(); ctx.ellipse(psx + TILE / 2 + shDx * 0.3, psy + TILE - 2 + shDy * 0.2, 11, 4.5, 0, 0, Math.PI * 2); ctx.fill();
        const bounce = Math.abs(Math.sin(s.time * 0.15)) * 1.5;
        ctx.fillStyle = '#3a6a8a'; ctx.fillRect(psx + 8, psy + 10 - bounce, 16, 14);
        ctx.fillStyle = '#e8c090'; ctx.fillRect(psx + 10, psy + 2 - bounce, 12, 10);
        ctx.fillStyle = '#2a1a0a'; ctx.fillRect(psx + 10, psy + 0 - bounce, 12, 4);
        const eyeOff = s.dir === 2 ? -2 : s.dir === 3 ? 2 : 0;
        ctx.fillStyle = '#fff'; ctx.fillRect(psx + 12 + eyeOff, psy + 5 - bounce, 3, 3); ctx.fillRect(psx + 17 + eyeOff, psy + 5 - bounce, 3, 3);
        ctx.fillStyle = '#111'; ctx.fillRect(psx + 13 + eyeOff, psy + 6 - bounce, 1, 1); ctx.fillRect(psx + 18 + eyeOff, psy + 6 - bounce, 1, 1);
        const legAnim = s.frame % 2 === 0 ? 0 : 2; ctx.fillStyle = '#2a2a3a';
        if (isMoving) { const bob = Math.abs(Math.sin(s.time * 0.2)) * 1.5; ctx.fillRect(psx + 10 + legAnim, psy + 24 - bounce + bob, 5, 6 - bob * 0.5); ctx.fillRect(psx + 17 - legAnim, psy + 24 - bounce + bob, 5, 6 - bob * 0.5); }
        else { ctx.fillRect(psx + 10 + legAnim, psy + 24 - bounce, 5, 6); ctx.fillRect(psx + 17 - legAnim, psy + 24 - bounce, 5, 6); }
        ctx.shadowColor = 'rgba(200,230,255,0.15)'; ctx.shadowBlur = 15; ctx.fillStyle = 'rgba(200,230,255,0.03)'; ctx.beginPath(); ctx.arc(psx + TILE / 2, psy + TILE / 2, 24, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
      }});

      entities.sort((a, b) => a.y - b.y);
      for (const ent of entities) ent.draw();

      for (const p of fp) { ctx.globalAlpha = p.life / p.maxLife; ctx.fillStyle = p.color; ctx.fillRect(p.x - camX, p.y - camY, p.size, p.size); } ctx.globalAlpha = 1;

      const lanternBrightness = Math.max(0.2, 1 - darkness * 1.5);
      for (const l of lr) { const lx = l.x - camX, ly = l.y - camY; if (lx < -50 || lx > W + 50 || ly < -50 || ly > H + 50) continue; const gi = (0.3 + Math.sin(s.time * 0.03 + l.phase) * 0.15) * lanternBrightness; const gr = 60 + darkness * 60; const g = ctx.createRadialGradient(lx, ly, 2, lx, ly, gr); g.addColorStop(0, `rgba(255,200,100,${gi * 0.7})`); g.addColorStop(0.3, `rgba(255,180,80,${gi * 0.3})`); g.addColorStop(1, 'rgba(255,180,80,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(lx, ly, gr, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#1a1410'; ctx.fillRect(lx - 1, ly + 4, 3, 20); ctx.fillStyle = '#ffd36b'; ctx.shadowColor = '#ffd36b'; ctx.shadowBlur = 20 * gi; ctx.beginPath(); ctx.arc(lx, ly, 4, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; }

      if (brightness < 0.7) for (const f of ff) { const fx = f.x - camX, fy = f.y - camY; if (fx < -20 || fx > W + 20 || fy < -20 || fy > H + 20) continue; const b = 0.3 + Math.sin(f.twinkle) * 0.7; ctx.fillStyle = `rgba(180,255,200,${b * 0.6})`; ctx.shadowColor = '#90ffb0'; ctx.shadowBlur = 10 * b; ctx.beginPath(); ctx.arc(fx, fy, 2, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; }

      if (s.rainIntensity > 0.01) { const ri = Math.min(1, s.rainIntensity * 1.2); ctx.strokeStyle = `rgba(160,190,220,${ri * 0.35})`; ctx.lineWidth = ri * 1.5; for (const r of rain) { const rx = r.x - camX, ry = r.y - camY; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx + r.wind * 2, ry + r.length); ctx.stroke(); } if (ri > 0.5 && !s.battleActive) { for (let i = 0; i < 8; i++) { const spx = psx + (Math.random() - 0.5) * 100, spy = psy + 32; ctx.fillStyle = `rgba(160,200,230,${ri * 0.08 * (1 - Math.random() * 0.5)})`; ctx.beginPath(); ctx.arc(spx + (Math.random() - 0.5) * 8, spy - Math.random() * 6, 1.5, 0, Math.PI * 2); ctx.fill(); } } }
      for (const f of fog) { const fx = f.x - camX, fy = f.y - camY; ctx.fillStyle = `rgba(180,200,180,${f.opacity * (0.5 + darkness * 0.5)})`; ctx.beginPath(); ctx.arc(fx, fy, f.size, 0, Math.PI * 2); ctx.fill(); }

      // Tree shadows - cast long shadows from trees onto tiles below
      const shadowLen = Math.min(3, Math.floor(shDy * 0.3 + 1));
      for (let y = startTY; y < endTY; y++) for (let x = startTX; x < endTX; x++) {
        if (worldMap[y][x] !== T.TREE) continue;
        const sx = x * TILE - camX, sy = y * TILE - camY;
        for (let i = 1; i <= shadowLen; i++) {
          const ty = y + i; if (ty >= ROWS) break;
          const tsx = x * TILE - camX, tsy = ty * TILE - camY;
          ctx.fillStyle = `rgba(0,0,0,${0.12 * (1 - i / (shadowLen + 1))})`;
          ctx.beginPath(); ctx.ellipse(tsx + 16, tsy + 8 + i * 4, 14 - i * 2, 4, 0, 0, Math.PI * 2); ctx.fill();
        }
      }

      // Foreground leaf canopy - animated leaves at top of screen
      const leafParts = leafParticlesRef.current;
      for (const l of leafParts) {
        const lx = l.x - camX, ly = l.y - camY;
        if (lx < -20 || lx > W + 20 || ly < -40 || ly > 50) continue;
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(l.rotation);
        ctx.globalAlpha = 0.5 + Math.sin(l.life * 0.02) * 0.2;
        ctx.fillStyle = l.color;
        ctx.shadowColor = l.color; ctx.shadowBlur = 4;
        ctx.fillRect(-l.size / 2, -l.size / 4, l.size, l.size / 2);
        ctx.restore();
        ctx.shadowBlur = 0;
      }

      // Lightmap - per-tile shadow under trees
      for (let y = startTY; y < endTY; y++) for (let x = startTX; x < endTX; x++) {
        if (worldMap[y][x] !== T.TREE) continue;
        const sx = x * TILE - camX, sy = y * TILE - camY;
        const gradient = ctx.createRadialGradient(sx + 16, sy + 16, 2, sx + 16, sy + 16, 32);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, `rgba(0,0,0,${0.2 + darkness * 0.2})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(sx - 16, sy - 16, 64, 64);
      }

      // Second fog layer (foreground, faster parallax)
      for (const f of fog) {
        const fx = (f.x * 1.3 + s.time * 0.2) - camX * 0.3, fy = (f.y * 0.7 + Math.sin(f.x * 0.01 + s.time * 0.01) * 40) - camY * 0.2;
        ctx.fillStyle = `rgba(180,200,180,${f.opacity * 0.3 * (0.3 + darkness * 0.4)})`;
        ctx.beginPath(); ctx.arc(fx % (W + 200) - 100, fy % (H + 200) - 100, f.size * 0.8, 0, Math.PI * 2); ctx.fill();
      }

      // Ember particles - warm glow near fire/lantern areas
      for (const eb of emberParticlesRef.current) {
        const ebx = eb.x - camX, eby = eb.y - camY;
        if (ebx < -20 || ebx > W + 20 || eby < -20 || eby > H + 20) continue;
        const ebAlpha = (eb.life / eb.maxLife) * 0.6;
        ctx.fillStyle = `hsla(${eb.hue}, 80%, 60%, ${ebAlpha})`;
        ctx.shadowColor = `hsla(${eb.hue}, 80%, 60%, 0.8)`; ctx.shadowBlur = 6;
        ctx.beginPath(); ctx.arc(ebx, eby, eb.size, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }

      // E prompt
      if (!s.dialogueActive && !s.shopActive && !s.signActive && !s.cutsceneActive && !s.battleActive && !s.inventoryOpen && !s.craftOpen && !s.menuOpen) {
        let showE = false, label = ''; const pxi = Math.round(s.px), pyi = Math.round(s.py);
        for (const sign of SIGN_DATA) { if (Math.abs(sign.x - pxi) + Math.abs(sign.y - pyi) <= 1.5) { showE = true; label = 'Read'; break; } }
        if (!showE) for (let dy = -1; dy <= 1 && !showE; dy++) for (let dx = -1; dx <= 1 && !showE; dx++) if (isDoor(pxi + dx, pyi + dy)) { showE = true; label = 'Door'; }
        if (!showE) for (const npc of NPC_DATA) { if (Math.abs(npc.x - pxi) + Math.abs(npc.y - pyi) <= 1.5) { showE = true; label = npc.isShop ? 'Shop' : 'Talk'; break; } }
        if (showE) { const pulse = 0.6 + Math.sin(s.time * 0.1) * 0.4; ctx.fillStyle = `rgba(0,0,0,${0.5 * pulse})`; ctx.fillRect(psx - 8, psy - 38, 48, 22); ctx.fillStyle = `rgba(255,255,200,${pulse})`; ctx.font = '14px monospace'; ctx.textAlign = 'center'; ctx.fillText(`[E] ${label}`, psx + 16, psy - 24); }
      }

      ctx.restore();

      ctx.fillStyle = `rgba(5,8,20,${darkness * 0.4})`; ctx.fillRect(0, 0, W, H);
      if (s.rainIntensity > 0.01) { ctx.fillStyle = `rgba(10,15,30,${s.rainIntensity * 0.1})`; ctx.fillRect(0, 0, W, H); }

      // Screen glow - warm during day, cool at twilight, moonlight glow at night
      if (brightness > 0.55) {
        const glow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 300);
        glow.addColorStop(0, 'rgba(255,220,150,0.04)'); glow.addColorStop(1, 'rgba(255,220,150,0)');
        ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
      } else if (darkness > 0.5) {
        const glow = ctx.createRadialGradient(sunX, sunY, 5, sunX, sunY, 180);
        glow.addColorStop(0, 'rgba(180,200,255,0.03)'); glow.addColorStop(1, 'rgba(180,200,255,0)');
        ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
      }
      // Golden hour warm tint
      const golden = Math.max(0, 1 - Math.abs(brightness - 0.5) * 6);
      if (golden > 0.01) { ctx.fillStyle = `rgba(255,180,80,${golden * 0.06})`; ctx.fillRect(0, 0, W, H); }

      // Lightning flash
      if (s.lightningFlash > 0) {
        ctx.fillStyle = `rgba(255,255,255,${s.lightningFlash * 0.45})`; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = `rgba(200,220,255,${s.lightningFlash * 0.15})`; ctx.fillRect(0, 0, W, H);
      }

      const vigGrad = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.8);
      vigGrad.addColorStop(0, 'rgba(0,0,0,0)'); vigGrad.addColorStop(1, `rgba(0,0,0,${0.4 + darkness * 0.3})`);
      ctx.fillStyle = vigGrad; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = `rgba(10,14,26,${0.15 + darkness * 0.2})`; ctx.fillRect(0, 0, W, H);

      // --- HUD ---
      if (!s.battleActive) {
        ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(W - 280, 8, 272, 96);
        ctx.fillStyle = '#fff'; ctx.font = '16px monospace'; ctx.textAlign = 'left';
        ctx.fillText(`Lv.${s.level}  HP:${s.hp}/${s.maxHp}`, W - 268, 28);
        ctx.fillStyle = '#4a8'; ctx.fillRect(W - 268, 36, Math.max(0, (s.hp / s.maxHp) * 180), 10);
        ctx.fillStyle = '#888'; ctx.fillRect(W - 88, 36, 72, 10);
        ctx.fillStyle = `hsl(0, 0%, ${50 + (s.xp / s.xpToNext) * 30}%)`; ctx.fillRect(W - 268, 52, Math.max(0, (s.xp / s.xpToNext) * 180), 8);
        ctx.fillStyle = '#888'; ctx.font = '14px monospace'; ctx.fillText(`Gold:${s.playerGold}`, W - 268, 74);
        ctx.fillStyle = '#666'; ctx.font = '12px monospace'; ctx.fillText('I=Inv  C=Craft  K=Skills  M=Menu  L=Load', W - 268, 94);
      }

      // --- Battle overlay ---
      if (s.battleActive && s.battleEnemy) {
        const e = s.battleEnemy;
        const bf = s.battleFade;

        // Battle arena background
        const arenaTop = H * 0.02, arenaBot = H * 0.65;
        const skyGrad = ctx.createLinearGradient(0, arenaTop, 0, arenaBot);
        skyGrad.addColorStop(0, `rgba(8,12,25,${bf * 0.95})`);
        skyGrad.addColorStop(0.4, `rgba(12,20,35,${bf * 0.92})`);
        skyGrad.addColorStop(1, `rgba(15,25,20,${bf * 0.9})`);
        ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, W, arenaBot);

        const groundY = arenaBot - H * 0.18;
        const groundGrad = ctx.createLinearGradient(0, groundY, 0, arenaBot);
        groundGrad.addColorStop(0, `rgba(20,35,25,${bf * 0.9})`);
        groundGrad.addColorStop(1, `rgba(12,20,15,${bf * 0.95})`);
        ctx.fillStyle = groundGrad; ctx.fillRect(0, groundY, W, arenaBot - groundY);

        // Horizon line glow
        ctx.fillStyle = `rgba(60,120,80,${bf * 0.15})`; ctx.fillRect(0, groundY - 2, W, 4);

        // Dim overlay for remaining screen
        ctx.fillStyle = `rgba(0,0,0,${bf * 0.7})`; ctx.fillRect(0, arenaBot, W, H - arenaBot);

        // --- Enemy platform (top-right) ---
        const ePlatX = W * 0.68, ePlatY = groundY - H * 0.04;
        ctx.fillStyle = `rgba(30,50,40,${bf * 0.6})`;
        ctx.beginPath(); ctx.ellipse(ePlatX, ePlatY, 70, 16, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(50,80,60,${bf * 0.3})`;
        ctx.beginPath(); ctx.ellipse(ePlatX, ePlatY - 2, 65, 12, 0, 0, Math.PI * 2); ctx.fill();

        // Enemy icon
        const eIconX = ePlatX, eIconY = ePlatY - 56;
        if (e.isBoss) {
          ctx.fillStyle = `rgba(255,200,0,${(0.25 + Math.sin(s.time * 0.05) * 0.15) * bf})`;
          ctx.beginPath(); ctx.arc(eIconX, eIconY, 50, 0, Math.PI * 2); ctx.fill();
        }
        ctx.font = '52px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const eOpacity = e.hp <= 0 ? Math.max(0, bf * 0.3) : bf;
        ctx.globalAlpha = eOpacity;
        ctx.fillText(e.icon, eIconX, eIconY);
        ctx.textBaseline = 'alphabetic';

        // Enemy flash overlay
        if (s.battleEnemyFlash > 0) {
          const flashAlpha = (s.battleEnemyFlash / 12) * 0.6 * bf;
          ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;
          ctx.beginPath(); ctx.arc(eIconX, eIconY, 36, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;

        // --- Enemy info box (top-left) ---
        const eBoxX = W * 0.04, eBoxY = H * 0.06, eBoxW = W * 0.38, eBoxH = 72;
        ctx.fillStyle = `rgba(15,20,30,${bf * 0.85})`; roundRect(ctx, eBoxX, eBoxY, eBoxW, eBoxH, 12);
        ctx.strokeStyle = `rgba(180,200,220,${bf * 0.25})`; ctx.lineWidth = 2;
        roundRectStroke(ctx, eBoxX, eBoxY, eBoxW, eBoxH, 12);

        ctx.textAlign = 'left';
        ctx.fillStyle = '#c88'; ctx.font = 'bold 18px monospace';
        ctx.fillText(e.name, eBoxX + 16, eBoxY + 24);
        ctx.fillStyle = '#8a8'; ctx.font = '14px monospace';
        ctx.fillText(`Lv.${e.level}`, eBoxX + eBoxW - 70, eBoxY + 24);

        // Enemy HP bar (smooth)
        const eHpPct = Math.max(0, s.battleEnemyDisplayHp / e.maxHp);
        const eBarX = eBoxX + 16, eBarY = eBoxY + 36, eBarW = eBoxW - 32, eBarH = 16;
        const eHpColor = eHpPct > 0.5 ? '#4a8' : eHpPct > 0.25 ? '#ca8' : '#c44';
        ctx.fillStyle = 'rgba(60,60,60,0.5)'; roundRect(ctx, eBarX, eBarY, eBarW, eBarH, 4);
        ctx.fillStyle = eHpColor; roundRect(ctx, eBarX, eBarY, Math.max(0, eBarW * eHpPct), eBarH, 4);
        // HP bar shine
        ctx.fillStyle = `rgba(255,255,255,${0.1 * bf})`;
        roundRect(ctx, eBarX, eBarY, Math.max(0, eBarW * eHpPct), eBarH / 2, 4);
        ctx.fillStyle = '#fff'; ctx.font = '12px monospace'; ctx.textAlign = 'right';
        ctx.fillText(`${Math.round(s.battleEnemyDisplayHp)}/${e.maxHp}`, eBarX + eBarW, eBarY + eBarH + 16);

        if (e.isBoss && e.maxPhase !== undefined && e.phase !== undefined && e.maxPhase > 1) {
          ctx.fillStyle = '#fa0'; ctx.font = '14px monospace'; ctx.textAlign = 'left';
          ctx.fillText(`Phase ${e.phase}/${e.maxPhase}`, eBoxX + 16, eBoxY + eBoxH + 14);
        }

        // --- Player platform (bottom-left) ---
        const pPlatX = W * 0.28, pPlatY = arenaBot + H * 0.02;
        ctx.fillStyle = `rgba(25,40,35,${bf * 0.6})`;
        ctx.beginPath(); ctx.ellipse(pPlatX, pPlatY, 80, 18, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(40,70,55,${bf * 0.3})`;
        ctx.beginPath(); ctx.ellipse(pPlatX, pPlatY - 2, 75, 14, 0, 0, Math.PI * 2); ctx.fill();

        // Player sprite (from behind)
        const pSprX = pPlatX, pSprY = pPlatY - 60;
        ctx.globalAlpha = bf;
        // Body
        ctx.fillStyle = '#3a6a8a'; ctx.fillRect(pSprX - 14, pSprY + 8, 28, 24);
        // Shoulders
        ctx.fillStyle = '#4a7a9a'; ctx.fillRect(pSprX - 18, pSprY + 8, 36, 10);
        // Head (back of head - dark hair)
        ctx.fillStyle = '#2a1a0a'; ctx.fillRect(pSprX - 10, pSprY - 8, 20, 18);
        ctx.fillStyle = '#1a0a00'; ctx.fillRect(pSprX - 8, pSprY - 6, 16, 14);
        // Ears hint
        ctx.fillStyle = '#e8c090'; ctx.fillRect(pSprX - 10, pSprY + 2, 3, 4);
        ctx.fillRect(pSprX + 7, pSprY + 2, 3, 4);
        // Cape hint
        ctx.fillStyle = '#2a4a6a'; ctx.fillRect(pSprX - 12, pSprY + 14, 24, 8);
        // Legs
        ctx.fillStyle = '#2a2a3a';
        ctx.fillRect(pSprX - 10, pSprY + 32, 8, 14);
        ctx.fillRect(pSprX + 2, pSprY + 32, 8, 14);
        // Sword on back
        ctx.fillStyle = '#8a8a9a'; ctx.fillRect(pSprX + 16, pSprY - 4, 3, 30);
        ctx.fillStyle = '#c8a848'; ctx.fillRect(pSprX + 14, pSprY + 12, 7, 4);

        // Player flash overlay
        if (s.battlePlayerFlash > 0) {
          const pFlashAlpha = (s.battlePlayerFlash / 12) * 0.5 * bf;
          ctx.fillStyle = `rgba(255,255,255,${pFlashAlpha})`;
          ctx.fillRect(pSprX - 20, pSprY - 10, 40, 58);
        }
        ctx.globalAlpha = 1;

        // --- Player info box (bottom-right of arena) ---
        const pBoxX = W * 0.48, pBoxY = arenaBot - H * 0.08, pBoxW = W * 0.38, pBoxH = 80;
        ctx.fillStyle = `rgba(15,20,30,${bf * 0.85})`; roundRect(ctx, pBoxX, pBoxY, pBoxW, pBoxH, 12);
        ctx.strokeStyle = `rgba(180,200,220,${bf * 0.25})`; ctx.lineWidth = 2;
        roundRectStroke(ctx, pBoxX, pBoxY, pBoxW, pBoxH, 12);

        ctx.textAlign = 'left';
        const pName = s.playerName || 'Hero';
        ctx.fillStyle = '#8af'; ctx.font = 'bold 18px monospace';
        ctx.fillText(pName, pBoxX + 16, pBoxY + 24);
        ctx.fillStyle = '#8a8'; ctx.font = '14px monospace';
        ctx.fillText(`Lv.${s.level}`, pBoxX + pBoxW - 70, pBoxY + 24);

        // Player HP bar (smooth)
        const pHpPct = Math.max(0, s.battlePlayerDisplayHp / s.maxHp);
        const pBarX = pBoxX + 16, pBarY = pBoxY + 36, pBarW = pBoxW - 32, pBarH = 14;
        const pHpColor = pHpPct > 0.5 ? '#4a8' : pHpPct > 0.25 ? '#ca8' : '#c44';
        ctx.fillStyle = 'rgba(60,60,60,0.5)'; roundRect(ctx, pBarX, pBarY, pBarW, pBarH, 4);
        ctx.fillStyle = pHpColor; roundRect(ctx, pBarX, pBarY, Math.max(0, pBarW * pHpPct), pBarH, 4);
        ctx.fillStyle = `rgba(255,255,255,${0.1 * bf})`;
        roundRect(ctx, pBarX, pBarY, Math.max(0, pBarW * pHpPct), pBarH / 2, 4);

        // Player MP bar
        const pMpPct = Math.max(0, s.mp / s.maxMp);
        const pMpY = pBarY + pBarH + 6;
        ctx.fillStyle = 'rgba(60,60,60,0.5)'; roundRect(ctx, pBarX, pMpY, pBarW, 10, 3);
        ctx.fillStyle = '#48f'; roundRect(ctx, pBarX, pMpY, Math.max(0, pBarW * pMpPct), 10, 3);
        ctx.fillStyle = `rgba(255,255,255,${0.08 * bf})`;
        roundRect(ctx, pBarX, pMpY, Math.max(0, pBarW * pMpPct), 5, 3);

        ctx.fillStyle = '#aaa'; ctx.font = '12px monospace'; ctx.textAlign = 'right';
        ctx.fillText(`HP ${Math.round(s.battlePlayerDisplayHp)}/${s.maxHp}  MP ${s.mp}/${s.maxMp}`, pBoxX + pBoxW - 16, pBoxY + pBoxH - 6);

        // --- Bottom panel ---
        const panelH = H * 0.22, panelY = H - panelH;
        ctx.fillStyle = `rgba(12,15,25,${bf * 0.92})`; ctx.fillRect(0, panelY, W, panelH);
        ctx.strokeStyle = `rgba(120,160,180,${bf * 0.3})`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, panelY); ctx.lineTo(W, panelY); ctx.stroke();

        // Battle message (left side of panel)
        const msgX = 24, msgY = panelY + 24;
        ctx.textAlign = 'left';
        const latestMsg = s.battleLog.length > 0 ? s.battleLog[s.battleLog.length - 1] : '';
        ctx.fillStyle = '#ddd'; ctx.font = '18px monospace';

        // Typewriter effect for current message
        const twSpeed = 0.8;
        const twLen = Math.min(latestMsg.length, Math.floor(s.time * twSpeed) % (latestMsg.length + 10));
        ctx.fillText(latestMsg.substring(0, twLen), msgX, msgY);

        // Battle menu (right side of panel)
        if (s.battleTurn === 'player' && !s.battleAnimating) {
          const menuX = W * 0.5, menuW = W * 0.48;
          const menuY = panelY + 8;

          if (s.battleSubMenu === '') {
            // 2x2 grid: FIGHT(top-left), SKILLS(top-right), ITEMS(bottom-left), FLEE(bottom-right)
            const opts = [
              { label: 'FIGHT', icon: 'ÔÜö´©Å', row: 0, col: 0 },
              { label: 'SKILLS', icon: 'Ô£¿', row: 0, col: 1 },
              { label: 'ITEMS', icon: '­ƒº¬', row: 1, col: 0 },
              { label: 'FLEE', icon: '­ƒÆ¿', row: 1, col: 1 },
            ];
            const optW = menuW / 2, optH = (panelH - 16) / 2;
            for (let i = 0; i < opts.length; i++) {
              const o = opts[i];
              const ox = menuX + o.col * optW, oy = menuY + o.row * optH;
              const sel = s.battleChoice === i;
              if (sel) {
                ctx.fillStyle = 'rgba(60,140,220,0.15)';
                roundRect(ctx, ox + 4, oy + 2, optW - 8, optH - 4, 8);
              }
              ctx.textAlign = 'left';
              ctx.fillStyle = sel ? '#6cf' : '#aaa';
              ctx.font = sel ? 'bold 20px monospace' : '20px monospace';
              const cursor = sel && Math.sin(s.time * 0.12) > 0 ? 'Ôû© ' : '  ';
              ctx.fillText(`${cursor}${o.icon} ${o.label}`, ox + 14, oy + optH / 2 + 6);
            }
          } else if (s.battleSubMenu === 'skills') {
            const optH = Math.min(36, (panelH - 20) / Math.max(1, s.learnedAbilities.length + 1));
            for (let i = 0; i < s.learnedAbilities.length; i++) {
              const ab = getAbility(s.learnedAbilities[i]);
              const oy = menuY + 4 + i * optH;
              const sel = s.battleSubChoice === i;
              if (sel) {
                ctx.fillStyle = 'rgba(60,220,100,0.12)';
                roundRect(ctx, menuX + 4, oy, menuW - 8, optH - 2, 6);
              }
              ctx.textAlign = 'left';
              ctx.fillStyle = sel ? '#4f4' : '#aaa';
              ctx.font = sel ? 'bold 18px monospace' : '18px monospace';
              const cursor = sel && Math.sin(s.time * 0.12) > 0 ? 'Ôû© ' : '  ';
              const mpColor = ab.cost > s.mp ? '#c66' : '#88f';
              ctx.fillText(`${cursor}${ab.icon} ${ab.name}`, menuX + 14, oy + optH - 8);
              ctx.fillStyle = mpColor; ctx.font = '14px monospace'; ctx.textAlign = 'right';
              ctx.fillText(`${ab.cost}MP  PWR:${ab.power}`, menuX + menuW - 14, oy + optH - 8);
            }
            // Back option
            const backY = menuY + 4 + s.learnedAbilities.length * optH;
            ctx.fillStyle = '#666'; ctx.font = '16px monospace'; ctx.textAlign = 'left';
            ctx.fillText('  Ôùé Back (Q)', menuX + 14, backY + optH - 6);
          } else if (s.battleSubMenu === 'items') {
            const optH = 36;
            const oy = menuY + 4;
            const potionCount = s.inventory.filter(i => i.id === 'potion').length;
            ctx.textAlign = 'left';
            if (potionCount > 0) {
              const sel = s.battleSubChoice === 0;
              ctx.fillStyle = sel ? 'rgba(60,220,100,0.12)' : 'transparent';
              if (sel) roundRect(ctx, menuX + 4, oy, menuW - 8, optH - 2, 6);
              ctx.fillStyle = sel ? '#4f4' : '#aaa';
              ctx.font = sel ? 'bold 18px monospace' : '18px monospace';
              const cursor = sel && Math.sin(s.time * 0.12) > 0 ? 'Ôû© ' : '  ';
              ctx.fillText(`${cursor}­ƒº¬ Health Potion`, menuX + 14, oy + optH - 8);
              ctx.fillStyle = '#8a8'; ctx.font = '14px monospace'; ctx.textAlign = 'right';
              ctx.fillText(`x${potionCount}`, menuX + menuW - 14, oy + optH - 8);
            } else {
              ctx.fillStyle = '#666'; ctx.font = '18px monospace';
              ctx.fillText('  No items...', menuX + 14, oy + optH - 8);
            }
            const backY = oy + optH;
            ctx.fillStyle = '#666'; ctx.font = '16px monospace'; ctx.textAlign = 'left';
            ctx.fillText('  Ôùé Back (Q)', menuX + 14, backY + optH - 6);
          }
        }

        if (s.battleTurn === 'enemy' && !s.battleAnimating) {
          const dots = '.'.repeat(1 + Math.floor(s.time * 0.04) % 3);
          ctx.fillStyle = '#c66'; ctx.font = '18px monospace'; ctx.textAlign = 'left';
          ctx.fillText(`Enemy is acting${dots}`, 24, panelY + 24);
        }

        // Defeat overlay
        if (s.hp <= 0 && s.battleActive) {
          ctx.fillStyle = `rgba(0,0,0,${0.6 + Math.sin(s.time * 0.03) * 0.1})`; ctx.fillRect(0, 0, W, H);
          ctx.fillStyle = '#c66'; ctx.font = 'bold 28px monospace'; ctx.textAlign = 'center';
          ctx.fillText('You have been defeated...', W / 2, H / 2);
        }
      }

      // --- Battle transition flash ---
      if (s.battleFade > 0 && s.battleActive) { ctx.fillStyle = `rgba(255,255,255,${(1 - s.battleFade) * 0.3})`; ctx.fillRect(0, 0, W, H); }

      // --- Inventory overlay ---
      if (s.inventoryOpen) {
        ctx.fillStyle = 'rgba(0,0,0,0.88)'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#ddd'; ctx.font = '20px monospace'; ctx.textAlign = 'center';
        ctx.fillText('INVENTORY', W / 2, 40);

        ctx.fillStyle = '#888'; ctx.font = '14px monospace';
        ctx.fillText(`[Tab: ${s.inventoryTab === 0 ? 'Items' : 'Quests'}]`, W / 2, 60);

        if (s.inventoryTab === 0) {
          ctx.fillStyle = '#aaa'; ctx.font = '14px monospace'; ctx.textAlign = 'left';
          const startY = 80;
          if (s.inventory.length === 0) { ctx.fillText('(empty)', 40, startY); }
          for (let i = 0; i < Math.min(s.inventory.length, 15); i++) {
            const item = s.inventory[i];
            ctx.fillStyle = s.inventoryChoice === i ? 'rgba(80,170,255,0.3)' : 'transparent';
            ctx.fillRect(30, startY + i * 32, W - 60, 30);
            ctx.fillStyle = s.inventoryChoice === i ? '#4af' : '#bbb';
            ctx.font = s.inventoryChoice === i ? 'bold 16px monospace' : '16px monospace';
            ctx.fillText(`${item.icon || '­ƒôª'} ${item.name}`, 40, startY + i * 32 + 22);
            if (item.id === 'potion') { ctx.fillStyle = '#484'; ctx.font = '12px monospace'; ctx.fillText('[E] use', W - 120, startY + i * 32 + 22); }
          }
          ctx.fillStyle = '#666'; ctx.font = '12px monospace'; ctx.textAlign = 'center'; ctx.fillText('E=use  Q=close  Tab=switch', W / 2, H - 20);
        } else {
          ctx.fillStyle = '#aaa'; ctx.font = '14px monospace'; ctx.textAlign = 'left';
          for (let i = 0; i < s.quests.length; i++) {
            const q = s.quests[i];
            ctx.fillStyle = q.completed ? '#484' : '#da8';
            ctx.fillText(`${q.completed ? 'Ô£ô' : 'Ôùï'} ${q.name}`, 40, 80 + i * 50);
            ctx.fillStyle = q.completed ? '#464' : '#986';
            ctx.font = '12px monospace';
            ctx.fillText(q.desc, 40, 80 + i * 50 + 20);
            for (const o of q.objectives) {
              ctx.fillText(`  ${o.current}/${o.count}`, 40, 80 + i * 50 + 38);
            }
          }
          ctx.fillStyle = '#666'; ctx.font = '12px monospace'; ctx.textAlign = 'center'; ctx.fillText('Q=close  Tab=switch', W / 2, H - 20);
        }
      }

      // --- Craft overlay ---
      if (s.craftOpen) {
        ctx.fillStyle = 'rgba(0,0,0,0.88)'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#ddd'; ctx.font = '20px monospace'; ctx.textAlign = 'center'; ctx.fillText('CRAFTING', W / 2, 40);
        ctx.fillStyle = '#aaa'; ctx.font = '16px monospace'; ctx.textAlign = 'left';
        for (let i = 0; i < RECIPES.length; i++) {
          const r = RECIPES[i]; const canCraft = r.ingredients.every(ing => s.inventory.filter(x => x.id === ing.itemId).length >= ing.count);
          ctx.fillStyle = s.craftChoice === i ? 'rgba(80,170,255,0.3)' : 'transparent';
          ctx.fillRect(30, 60 + i * 70, W - 60, 66);
          ctx.fillStyle = s.craftChoice === i ? '#4af' : canCraft ? '#4a4' : '#666';
          ctx.font = s.craftChoice === i ? 'bold 16px monospace' : '16px monospace';
          ctx.fillText(`${r.icon} ${r.name}`, 40, 60 + i * 70 + 24);
          ctx.fillStyle = canCraft ? '#4a4' : '#866';
          ctx.font = '12px monospace';
          const parts = r.ingredients.map(ing => `${ing.count}x ${ing.itemId} (${s.inventory.filter(x => x.id === ing.itemId).length})`).join(' ');
          ctx.fillText(parts, 40, 60 + i * 70 + 44);
          if (canCraft) { ctx.fillStyle = '#484'; ctx.font = '12px monospace'; ctx.fillText('[E] craft', W - 120, 60 + i * 70 + 24); }
        }
        ctx.fillStyle = '#666'; ctx.font = '12px monospace'; ctx.textAlign = 'center'; ctx.fillText('E=craft  Q=close', W / 2, H - 20);
      }

      // --- Level up popup ---
      if (s.showLevelUp) {
        ctx.fillStyle = 'rgba(0,0,0,0.9)'; ctx.fillRect(W / 2 - 200, H / 2 - 100, 400, 200);
        ctx.fillStyle = '#ff0'; ctx.font = 'bold 24px monospace'; ctx.textAlign = 'center';
        ctx.fillText('LEVEL UP!', W / 2, H / 2 - 60);
        ctx.fillStyle = '#fff'; ctx.font = '18px monospace';
        ctx.fillText(`You are now Lv.${s.level}!`, W / 2, H / 2 - 28);
        ctx.fillStyle = '#aaa'; ctx.font = '14px monospace';
        ctx.fillText('HP+8  ATK+2  DEF+1  MP+3', W / 2, H / 2 + 4);
        ctx.fillStyle = '#4af'; ctx.font = '14px monospace';
        ctx.fillText(`+${s.sp} skill point${s.sp > 1 ? 's' : ''} available!`, W / 2, H / 2 + 32);
        ctx.fillStyle = '#888'; ctx.font = '14px monospace';
        const blink = Math.sin(s.time * 0.08) > 0;
        if (blink) ctx.fillText('Press E to continue', W / 2, H / 2 + 72);
        if (s.ePressed) s.showLevelUp = false;
      }

      // --- Menu overlay ---
      if (s.menuOpen) {
        ctx.fillStyle = 'rgba(0,0,0,0.88)'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#ddd'; ctx.font = '20px monospace'; ctx.textAlign = 'center'; ctx.fillText('MENU', W / 2, 40);
        ctx.fillStyle = '#aaa'; ctx.font = '16px monospace'; ctx.textAlign = 'left';
        const items = [
          `Level: ${s.level}  XP: ${s.xp}/${s.xpToNext}`,
          `HP: ${s.hp}/${s.maxHp}  MP: ${s.mp}/${s.maxMp}`,
          `ATK: ${s.atk}  DEF: ${s.def}`,
          `Gold: ${s.playerGold}  Kills: ${s.totalKills}`,
          `Abilities: ${s.learnedAbilities.map(id => getAbility(id).name).join(', ')}`,
          `SP Available: ${s.sp}`,
          ``,
          `[K] Skills  [S] Save  [L] Load`,
        ];
        for (let i = 0; i < items.length; i++) {
          ctx.fillStyle = i >= 7 ? '#8a8' : '#ccc';
          ctx.fillText(items[i], 40, 80 + i * 36);
        }
        ctx.fillStyle = '#666'; ctx.font = '12px monospace'; ctx.textAlign = 'center'; ctx.fillText('K=Skills  M=close', W / 2, H - 20);
      }

      // --- Skills overlay ---
      if (s.skillsOpen) {
        ctx.fillStyle = 'rgba(0,0,0,0.88)'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#ddd'; ctx.font = '20px monospace'; ctx.textAlign = 'center';
        ctx.fillText('SKILLS', W / 2, 40);
        ctx.fillStyle = '#4af'; ctx.font = '16px monospace';
        ctx.fillText(`Skill Points: ${s.sp}`, W / 2, 64);
        const sy = 90;
        for (let i = 0; i < ABILITIES.length; i++) {
          const ab = ABILITIES[i], learned = s.learnedAbilities.includes(ab.id), canLearn = !learned && s.sp > 0;
          ctx.fillStyle = s.skillChoice === i ? 'rgba(80,170,255,0.25)' : 'transparent';
          ctx.fillRect(40, sy + i * 80, W - 80, 76);
          ctx.textAlign = 'left';
          ctx.fillStyle = s.skillChoice === i ? '#4af' : learned ? '#4a4' : '#aaa';
          ctx.font = s.skillChoice === i ? 'bold 18px monospace' : '18px monospace';
          ctx.fillText(`${ab.icon} ${ab.name}${learned ? ' Ô£ô' : ''}`, 50, sy + i * 80 + 26);
          ctx.fillStyle = '#888'; ctx.font = '14px monospace';
          ctx.fillText(ab.desc, 50, sy + i * 80 + 48);
          ctx.fillStyle = '#666'; ctx.font = '12px monospace';
          ctx.fillText(`MP: ${ab.cost}  Power: ${ab.power}  Type: ${ab.type}`, 50, sy + i * 80 + 66);
          if (canLearn) { ctx.fillStyle = '#4af'; ctx.font = '12px monospace'; ctx.textAlign = 'right'; ctx.fillText('[E] Learn (1 SP)', W - 50, sy + i * 80 + 26); }
          if (learned) { ctx.fillStyle = '#484'; ctx.font = '12px monospace'; ctx.textAlign = 'right'; ctx.fillText('LEARNED', W - 50, sy + i * 80 + 26); }
        }
        ctx.fillStyle = '#666'; ctx.font = '12px monospace'; ctx.textAlign = 'center';
        ctx.fillText('E=learn  Q=close', W / 2, H - 20);
      }

      // --- Dialogue ---
      if (s.dialogueActive) {
        const bh = 140, bw = Math.min(W - 80, 600), bx = (W - bw) / 2, by = H - bh - 40;
        ctx.fillStyle = 'rgba(10,10,20,0.92)'; ctx.fillRect(bx, by, bw, bh);
        ctx.strokeStyle = 'rgba(180,200,220,0.3)'; ctx.lineWidth = 1; ctx.strokeRect(bx, by, bw, bh);
        if (s.dialogueNpc) { ctx.fillStyle = '#8ab8d0'; ctx.font = 'bold 16px monospace'; ctx.textAlign = 'left'; ctx.fillText(s.dialogueNpc, bx + 16, by + 26); }
        ctx.fillStyle = '#c8d8e0'; ctx.font = '16px monospace'; ctx.textAlign = 'left';
        const line = s.dialogueLines[s.dialogueIndex] || '';
        const words = line.split(' ');
        let lx = bx + 16, ly = by + (s.dialogueNpc ? 52 : 32);
        for (const word of words) { const w = word.length * 10; if (lx + w > bx + bw - 24) { lx = bx + 16; ly += 26; } ctx.fillText(word, lx, ly); lx += w + 12; }
        if (s.dialogueIndex < s.dialogueLines.length - 1 || s.cutsceneActive) { if (Math.sin(s.time * 0.1) > 0) { ctx.fillStyle = '#8ab8d0'; ctx.font = '16px monospace'; ctx.textAlign = 'right'; ctx.fillText('[E]', bx + bw - 16, by + bh - 14); } }
        else { ctx.fillStyle = '#8ab8d0'; ctx.font = '16px monospace'; ctx.textAlign = 'right'; ctx.fillText('[E] close', bx + bw - 16, by + bh - 14); }
      }

      // --- Sign ---
      if (s.signActive) {
        const bh = 140, bw = Math.min(W - 80, 500), bx = (W - bw) / 2, by = (H - bh) / 2;
        ctx.fillStyle = 'rgba(20,15,10,0.92)'; ctx.fillRect(bx, by, bw, bh);
        ctx.strokeStyle = 'rgba(200,180,140,0.3)'; ctx.lineWidth = 1; ctx.strokeRect(bx, by, bw, bh);
        ctx.fillStyle = '#c8b890'; ctx.font = '16px monospace'; ctx.textAlign = 'center';
        const lines = s.signText.split('\n');
        for (let i = 0; i < lines.length; i++) ctx.fillText(lines[i], bx + bw / 2, by + 40 + i * 32);
        if (Math.sin(s.time * 0.1) > 0) { ctx.fillStyle = '#c8b890'; ctx.font = '16px monospace'; ctx.textAlign = 'right'; ctx.fillText('[E] close', bx + bw - 16, by + bh - 14); }
      }

      // --- Shop ---
      if (s.shopActive) {
        const sw = Math.min(W - 80, 500), sh = Math.min(H - 80, 400), sx_ = (W - sw) / 2, sy_ = (H - sh) / 2;
        ctx.fillStyle = 'rgba(15,12,20,0.95)'; ctx.fillRect(sx_, sy_, sw, sh);
        ctx.strokeStyle = 'rgba(200,180,100,0.3)'; ctx.lineWidth = 1; ctx.strokeRect(sx_, sy_, sw, sh);
        ctx.fillStyle = '#d8c878'; ctx.font = 'bold 18px monospace'; ctx.textAlign = 'left'; ctx.fillText(`${s.dialogueNpc}'s Wares`, sx_ + 16, sy_ + 30);
        ctx.fillStyle = '#889898'; ctx.font = '14px monospace'; ctx.fillText(`Gold: ${s.playerGold}`, sx_ + sw - 140, sy_ + 30);
        let iy = sy_ + 54;
        for (let i = 0; i < s.shopItems.length; i++) {
          const item = s.shopItems[i], sel = i === s.shopSelected;
          ctx.fillStyle = sel ? 'rgba(100,180,200,0.2)' : 'transparent'; ctx.fillRect(sx_ + 10, iy, sw - 20, 44);
          if (sel) { ctx.strokeStyle = 'rgba(100,180,200,0.5)'; ctx.lineWidth = 1; ctx.strokeRect(sx_ + 10, iy, sw - 20, 44); }
          ctx.font = '24px monospace'; ctx.textAlign = 'left'; ctx.fillText(item.icon, sx_ + 20, iy + 32);
          ctx.font = '16px monospace'; ctx.fillStyle = '#c8d8e0'; ctx.fillText(item.name, sx_ + 52, iy + 22);
          ctx.fillStyle = sel ? '#e8d878' : '#889898'; ctx.fillText(`${item.price}g`, sx_ + 52, iy + 40);
          const owned = s.inventory.filter(inv => inv.id === item.id).length;
          ctx.fillStyle = '#687878'; ctx.font = '14px monospace'; ctx.textAlign = 'right'; ctx.fillText(`x${owned}`, sx_ + sw - 24, iy + 22);
          iy += 50;
        }
        ctx.fillStyle = 'rgba(200,200,200,0.4)'; ctx.font = '14px monospace'; ctx.textAlign = 'center'; ctx.fillText('E buy  |  arrow keys  |  Q close', sx_ + sw / 2, sy_ + sh - 16);
      }

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('resize', resize); window.removeEventListener('keydown', onKeyDown); window.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('click', onFirstClick); document.removeEventListener('keydown', onFirstClick);
      if (ambientOsc) { try { ambientOsc.stop(); ambientOsc.disconnect(); } catch {} }
      if (rainNoise) { try { rainNoise.stop(); rainNoise.disconnect(); } catch {} }
      if (audioCtx) { try { audioCtx.close(); } catch {} }
    };
  }, []);

  const s = stateRef.current;
  function buyItemFromComponent(idx: number) {
    const items = s.shopItems;
    if (idx < 0 || idx >= items.length) return;
    const item = items[idx];
    if (s.playerGold < item.price) return;
    s.playerGold -= item.price; s.inventory.push({ id: item.id, name: item.name, icon: item.icon });
  }

  function startGame() {
    if (!playerName.trim()) return;
    s.playerName = playerName;
    s.hasStarted = true;
    localStorage.setItem('gopherKnightPlayer', playerName);
    setMenuVisible(false);
  }

  function savePlayerName() {
    if (!playerName.trim()) return;
    localStorage.setItem('gopherKnightPlayer', playerName);
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden bg-black">
      <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />

      {menuVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at center, rgba(30,60,40,0.7), rgba(5,10,15,0.95))'
          }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8))', backdropFilter: 'blur(3px)' }} />
          <div className="relative w-[420px] p-10 rounded-[20px] text-center text-white z-10"
            style={{
              background: 'rgba(10,20,30,0.7)',
              border: '2px solid rgba(120,255,180,0.2)',
              boxShadow: '0 0 40px rgba(0,255,150,0.15)'
            }}>
            <h1 className="text-[42px] mb-[10px] font-mono" style={{ color: '#8df9ff', textShadow: '0 0 20px #00e1ff' }}>
              GOPHER KNIGHT
            </h1>
            <p className="text-[#b8ffd8] mb-[30px] opacity-80 font-mono">
              Begin your legendary adventure
            </p>
            <input
              type="text"
              placeholder="Write Player Name..."
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              className="w-full p-4 mb-5 rounded-xl text-white text-base outline-none font-mono"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            />
            <button
              onClick={startGame}
              className="w-full p-4 mb-4 rounded-xl text-white text-base cursor-pointer font-mono border-none"
              style={{
                background: 'linear-gradient(45deg, #00c896, #00e1ff)',
                transition: '0.3s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,225,255,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
              START ADVENTURE
            </button>
            <button
              onClick={savePlayerName}
              className="w-full p-4 mb-4 rounded-xl text-white text-base cursor-pointer font-mono border-none"
              style={{
                background: 'linear-gradient(45deg, #00c896, #00e1ff)',
                transition: '0.3s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,225,255,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
              SAVE GAME
            </button>
            <div className="mt-6 pt-5 font-mono" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <h2 className="text-[#8df9ff] mb-[10px] text-base">CONTROLS</h2>
              <p className="opacity-80 my-1.5 text-sm">W A S D = Move</p>
              <p className="opacity-80 my-1.5 text-sm">SHIFT = Dash</p>
              <p className="opacity-80 my-1.5 text-sm">E = Interact</p>
              <p className="opacity-80 my-1.5 text-sm">SPACE = Attack</p>
              <p className="opacity-80 my-1.5 text-sm">ESC = Pause Menu</p>
            </div>
          </div>
        </div>
      )}

      {!menuVisible && (
        <>
          <div className="fixed top-4 left-4 z-10 px-4 py-2 bg-black/60 rounded text-sm text-white/60 font-mono">
            WASD ┬À E interact ┬À I inv ┬À C craft ┬À K skills ┬À M menu ┬À L load
          </div>
          <div className="fixed bottom-4 left-4 z-10 flex gap-3 text-sm text-white/30 font-mono">
            <span>Lv.{s.level}</span><span>HP {s.hp}/{s.maxHp}</span><span>Gold {s.playerGold}</span><span>{s.isRaining ? 'Rain' : 'Clear'}</span>
          </div>
          {s.shopActive && (
            <div className="fixed bottom-4 right-4 z-10 flex gap-2 text-sm text-white/40 font-mono">
              <button className="px-2 py-1 bg-black/60 rounded hover:bg-black/80" onClick={() => { if (s.shopSelected > 0) s.shopSelected--; }}>Ôû▓</button>
              <button className="px-2 py-1 bg-black/60 rounded hover:bg-black/80" onClick={() => { if (s.shopSelected < s.shopItems.length - 1) s.shopSelected++; }}>Ôû╝</button>
              <button className="px-3 py-1 bg-black/60 rounded hover:bg-black/80" onClick={() => buyItemFromComponent(s.shopSelected)}>Buy</button>
              <button className="px-3 py-1 bg-black/60 rounded hover:bg-black/80" onClick={() => { s.shopActive = false; }}>Close</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
