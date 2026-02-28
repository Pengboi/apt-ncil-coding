import { Area, Platform, Enemy, Pickup, SavePoint } from '../types';
import { AREA_THEMES, ENEMY_CONFIGS } from '../constants';

// ============================================================
// AREA DEFINITIONS - All 5 Game Areas
// ============================================================

// Helper to create platforms
function createPlatform(x: number, y: number, width: number, height: number, color?: string): Platform {
  return {
    x,
    y,
    width,
    height,
    color: color || '#7f8c8d',
  };
}

// Helper to create enemies
function createEnemy(type: 'grunt' | 'soldier' | 'drone' | 'heavy', x: number, y: number): Enemy {
  const config = ENEMY_CONFIGS[type];
  return {
    x,
    y,
    vx: 0,
    vy: 0,
    width: config.width,
    height: config.height,
    type,
    hp: config.hp,
    maxHp: config.hp,
    damage: config.damage,
    speed: config.speed,
    xpValue: config.xpValue,
    isFacingRight: false,
    isDead: false,
    respawnOnReenter: config.respawnOnReenter,
    patrolStartX: x - 100,
    patrolEndX: x + 100,
    detectionRange: config.detectionRange,
    attackRange: config.attackRange,
    lastAttackTime: 0,
  };
}

// Helper to create pickups
function createPickup(type: 'medkit' | 'ammo', x: number, y: number): Pickup {
  return {
    x,
    y,
    width: 24,
    height: 24,
    type,
    value: type === 'medkit' ? 25 : 30,
    duration: 0,
    isCollected: false,
  };
}

// Helper to create save points
function createSavePoint(x: number, y: number, areaId: string): SavePoint {
  return {
    x,
    y,
    width: 40,
    height: 60,
    isActivated: false,
    areaId,
  };
}

// ------------------------------------------------------------
// AREA 1: BOOT CAMP (Tutorial Area)
// ------------------------------------------------------------
export const bootCampArea: Area = {
  id: 'bootcamp',
  name: 'Boot Camp',
  theme: 'bootcamp',
  width: 2400,
  height: 800,
  backgroundColor: AREA_THEMES.bootcamp.backgroundColor,
  playerSpawn: { x: 100, y: 500 },
  
  platforms: [
    // Ground floor
    createPlatform(0, 650, 600, 150),
    createPlatform(700, 650, 500, 150),
    createPlatform(1300, 650, 400, 150),
    createPlatform(1900, 650, 500, 150),
    
    // Tutorial platforms
    createPlatform(300, 500, 150, 20),   // First jump
    createPlatform(550, 400, 150, 20),   // Second jump
    createPlatform(850, 350, 150, 20),   // Third jump
    
    // Elevated sections
    createPlatform(1200, 450, 200, 20),
    createPlatform(1600, 350, 200, 20),
    createPlatform(2100, 450, 200, 20),
  ],
  
  enemies: [
    // Easy grunts to practice on
    createEnemy('grunt', 800, 610),
    createEnemy('grunt', 1100, 610),
    createEnemy('grunt', 1500, 610),
    createEnemy('grunt', 2000, 410),  // On elevated platform
  ],
  
  pickups: [
    createPickup('medkit', 375, 460),
    createPickup('ammo', 925, 310),
    createPickup('medkit', 1700, 310),
  ],
  
  savePoints: [
    createSavePoint(50, 590, 'bootcamp'),   // Start
    createSavePoint(1200, 590, 'bootcamp'), // Middle
    createSavePoint(2200, 590, 'bootcamp'), // End - before exit
  ],
  
  connections: [
    {
      toAreaId: 'city',
      fromX: 2350,
      fromY: 650,
      toSpawnX: 100,
      toSpawnY: 500,
    },
  ],
};

// ------------------------------------------------------------
// AREA 2: ABANDONED CITY
// ------------------------------------------------------------
export const cityArea: Area = {
  id: 'city',
  name: 'Abandoned City',
  theme: 'city',
  width: 3000,
  height: 1000,
  backgroundColor: AREA_THEMES.city.backgroundColor,
  playerSpawn: { x: 100, y: 500 },
  
  platforms: [
    // Street level
    createPlatform(0, 700, 400, 100),
    createPlatform(500, 700, 600, 100),
    createPlatform(1200, 700, 400, 100),
    createPlatform(1800, 700, 500, 100),
    createPlatform(2500, 700, 500, 100),
    
    // Building 1 - Lower floors
    createPlatform(600, 550, 150, 20),
    createPlatform(800, 450, 150, 20),
    createPlatform(600, 350, 150, 20),
    
    // Building 2 - Ruined building
    createPlatform(1400, 550, 200, 20),
    createPlatform(1700, 450, 200, 20),
    createPlatform(1400, 350, 200, 20),
    createPlatform(1700, 250, 200, 20),
    
    // Rooftop path
    createPlatform(2000, 500, 100, 20),
    createPlatform(2200, 400, 100, 20),
    createPlatform(2400, 300, 200, 20),
    createPlatform(2700, 400, 150, 20),
  ],
  
  enemies: [
    // Street level
    createEnemy('grunt', 700, 660),
    createEnemy('grunt', 900, 660),
    createEnemy('soldier', 1400, 660),
    
    // Building 1
    createEnemy('grunt', 650, 510),
    createEnemy('grunt', 650, 310),
    
    // Building 2
    createEnemy('soldier', 1500, 510),
    createEnemy('grunt', 1500, 310),
    createEnemy('soldier', 1800, 210),
    
    // Rooftop
    createEnemy('grunt', 2450, 260),
    createEnemy('grunt', 2750, 360),
  ],
  
  pickups: [
    createPickup('medkit', 875, 410),
    createPickup('ammo', 650, 310),
    createPickup('medkit', 1800, 210),
    createPickup('ammo', 2500, 260),
  ],
  
  savePoints: [
    createSavePoint(50, 640, 'city'),
    createSavePoint(900, 640, 'city'),
    createSavePoint(1900, 640, 'city'),
    createSavePoint(2700, 640, 'city'),
  ],
  
  connections: [
    {
      toAreaId: 'bootcamp',
      fromX: 50,
      fromY: 700,
      toSpawnX: 2300,
      toSpawnY: 500,
    },
    {
      toAreaId: 'bunker',
      fromX: 2950,
      fromY: 700,
      toSpawnX: 100,
      toSpawnY: 400,
    },
  ],
};

// ------------------------------------------------------------
// AREA 3: UNDERGROUND BUNKER
// ------------------------------------------------------------
export const bunkerArea: Area = {
  id: 'bunker',
  name: 'Underground Bunker',
  theme: 'bunker',
  width: 2800,
  height: 800,
  backgroundColor: AREA_THEMES.bunker.backgroundColor,
  playerSpawn: { x: 100, y: 400 },
  
  platforms: [
    // Entry tunnel
    createPlatform(0, 500, 400, 100),
    createPlatform(500, 550, 300, 50),
    
    // Main chamber
    createPlatform(900, 500, 600, 100),
    createPlatform(1600, 500, 400, 100),
    
    // Upper catwalks
    createPlatform(800, 350, 200, 20),
    createPlatform(1100, 250, 200, 20),
    createPlatform(1400, 350, 200, 20),
    createPlatform(1700, 250, 200, 20),
    
    // Lower tunnels
    createPlatform(500, 650, 800, 50),
    createPlatform(1400, 650, 400, 50),
    createPlatform(2000, 600, 400, 100),
    
    // Exit tunnel
    createPlatform(2500, 550, 300, 50),
  ],
  
  enemies: [
    // Entry
    createEnemy('grunt', 600, 510),
    createEnemy('grunt', 700, 510),
    
    // Main chamber
    createEnemy('soldier', 1100, 460),
    createEnemy('soldier', 1400, 460),
    
    // Catwalks
    createEnemy('drone', 900, 310),
    createEnemy('drone', 1300, 210),
    createEnemy('drone', 1600, 310),
    
    // Lower tunnels
    createEnemy('grunt', 700, 610),
    createEnemy('soldier', 1000, 610),
    createEnemy('grunt', 1600, 610),
    
    // Exit
    createEnemy('soldier', 2200, 560),
    createEnemy('drone', 2600, 510),
  ],
  
  pickups: [
    createPickup('medkit', 850, 310),
    createPickup('ammo', 1200, 210),
    createPickup('medkit', 1800, 210),
    createPickup('ammo', 2200, 560),
  ],
  
  savePoints: [
    createSavePoint(50, 440, 'bunker'),
    createSavePoint(1100, 440, 'bunker'),
    createSavePoint(2200, 540, 'bunker'),
  ],
  
  connections: [
    {
      toAreaId: 'city',
      fromX: 50,
      fromY: 500,
      toSpawnX: 2900,
      toSpawnY: 500,
    },
    {
      toAreaId: 'mountain',
      fromX: 2750,
      fromY: 550,
      toSpawnX: 100,
      toSpawnY: 500,
    },
  ],
};

// ------------------------------------------------------------
// AREA 4: MOUNTAIN OUTPOST
// ------------------------------------------------------------
export const mountainArea: Area = {
  id: 'mountain',
  name: 'Mountain Outpost',
  theme: 'mountain',
  width: 3200,
  height: 1000,
  backgroundColor: AREA_THEMES.mountain.backgroundColor,
  playerSpawn: { x: 100, y: 500 },
  
  platforms: [
    // Mountain base
    createPlatform(0, 600, 500, 100),
    createPlatform(600, 550, 400, 50),
    
    // Climbing path
    createPlatform(1100, 500, 200, 50),
    createPlatform(1400, 450, 200, 50),
    createPlatform(1700, 400, 200, 50),
    
    // Upper ridge
    createPlatform(2000, 350, 600, 50),
    createPlatform(2800, 300, 400, 50),
    
    // Lower caves
    createPlatform(800, 700, 400, 50),
    createPlatform(1400, 750, 300, 50),
    createPlatform(2000, 700, 400, 50),
    
    // Ice platforms
    createPlatform(500, 400, 150, 20),
    createPlatform(900, 300, 150, 20),
  ],
  
  enemies: [
    // Base
    createEnemy('grunt', 700, 510),
    createEnemy('soldier', 800, 510),
    
    // Climbing path
    createEnemy('drone', 1200, 460),
    createEnemy('soldier', 1500, 410),
    createEnemy('drone', 1800, 360),
    
    // Upper ridge - Heavy enemy!
    createEnemy('heavy', 2300, 294),
    createEnemy('soldier', 2600, 310),
    createEnemy('drone', 3000, 260),
    
    // Caves
    createEnemy('grunt', 1000, 660),
    createEnemy('soldier', 1200, 660),
    createEnemy('grunt', 1600, 710),
    createEnemy('soldier', 2200, 660),
    
    // Ice platforms
    createEnemy('drone', 550, 360),
    createEnemy('drone', 950, 260),
  ],
  
  pickups: [
    createPickup('medkit', 1200, 460),
    createPickup('ammo', 1500, 410),
    createPickup('medkit', 2400, 310),
    createPickup('ammo', 3000, 260),
  ],
  
  savePoints: [
    createSavePoint(50, 540, 'mountain'),
    createSavePoint(1200, 440, 'mountain'),
    createSavePoint(2300, 290, 'mountain'),
    createSavePoint(3000, 240, 'mountain'),
  ],
  
  connections: [
    {
      toAreaId: 'bunker',
      fromX: 50,
      fromY: 600,
      toSpawnX: 2700,
      toSpawnY: 500,
    },
    {
      toAreaId: 'hq',
      fromX: 3150,
      fromY: 300,
      toSpawnX: 100,
      toSpawnY: 500,
    },
  ],
};

// ------------------------------------------------------------
// AREA 5: ENEMY HQ (Final Area)
// ------------------------------------------------------------
export const hqArea: Area = {
  id: 'hq',
  name: 'Enemy HQ',
  theme: 'hq',
  width: 2400,
  height: 900,
  backgroundColor: AREA_THEMES.hq.backgroundColor,
  playerSpawn: { x: 100, y: 500 },
  
  platforms: [
    // Entry hall
    createPlatform(0, 600, 400, 100),
    createPlatform(500, 600, 300, 100),
    
    // Security checkpoint
    createPlatform(900, 550, 400, 50),
    createPlatform(1400, 550, 200, 50),
    
    // Command center
    createPlatform(1700, 500, 500, 50),
    
    // Upper levels
    createPlatform(600, 400, 200, 20),
    createPlatform(900, 350, 200, 20),
    createPlatform(1200, 400, 200, 20),
    
    // Boss platform (final)
    createPlatform(1900, 400, 300, 50),
    
    // Side passages
    createPlatform(300, 750, 400, 50),
    createPlatform(800, 750, 400, 50),
  ],
  
  enemies: [
    // Entry
    createEnemy('soldier', 600, 560),
    createEnemy('soldier', 700, 560),
    
    // Security
    createEnemy('drone', 1000, 510),
    createEnemy('heavy', 1200, 504),
    createEnemy('drone', 1500, 510),
    
    // Command center
    createEnemy('soldier', 1900, 460),
    createEnemy('soldier', 2000, 460),
    createEnemy('heavy', 2100, 454),
    
    // Upper levels
    createEnemy('drone', 700, 360),
    createEnemy('drone', 1000, 310),
    createEnemy('drone', 1300, 360),
    
    // Side passages
    createEnemy('grunt', 400, 710),
    createEnemy('soldier', 600, 710),
    createEnemy('grunt', 1000, 710),
  ],
  
  pickups: [
    createPickup('medkit', 1000, 510),
    createPickup('ammo', 1400, 510),
    createPickup('medkit', 2000, 460),
    createPickup('ammo', 2100, 360),
  ],
  
  savePoints: [
    createSavePoint(50, 540, 'hq'),
    createSavePoint(1100, 490, 'hq'),
    createSavePoint(1800, 440, 'hq'),
    createSavePoint(2100, 340, 'hq'),  // Before boss
  ],
  
  connections: [
    {
      toAreaId: 'mountain',
      fromX: 50,
      fromY: 600,
      toSpawnX: 3100,
      toSpawnY: 300,
    },
  ],
};

// ------------------------------------------------------------
// Export all areas
// ------------------------------------------------------------
export const ALL_AREAS: Area[] = [
  bootCampArea,
  cityArea,
  bunkerArea,
  mountainArea,
  hqArea,
];

// Helper to get area by ID
export function getAreaById(id: string): Area | undefined {
  return ALL_AREAS.find(area => area.id === id);
}

// Helper to get starting area
export function getStartingArea(): Area {
  return bootCampArea;
}
