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
function createPickup(type: 'medkit' | 'ammo' | 'weapon', x: number, y: number, weaponId?: string): Pickup {
  return {
    x,
    y,
    width: 24,
    height: 24,
    type,
    value: type === 'medkit' ? 25 : 30,
    duration: 0,
    weaponId,
    isCollected: false,
  };
}

// Helper to create weapon pickups
function createWeaponPickup(weaponId: string, x: number, y: number): Pickup {
  return createPickup('weapon', x, y, weaponId);
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
    // Ground floor - CONNECTED with 40px gaps (wider than player width)
    createPlatform(0, 650, 700, 150),
    createPlatform(740, 650, 600, 150),  // 40px gap
    createPlatform(1380, 650, 500, 150), // 40px gap
    createPlatform(1920, 650, 600, 150), // 40px gap
    
    // Tutorial platforms - SMALL steps, easy jumps (40px gaps)
    createPlatform(300, 600, 150, 20),
    createPlatform(490, 580, 100, 20),   // 40px gap
    createPlatform(630, 560, 100, 20),   // 40px gap
    createPlatform(770, 540, 150, 20),   // 40px gap
    
    // Easy elevated platforms (40px gaps)
    createPlatform(1100, 580, 200, 20),
    createPlatform(1340, 560, 150, 20),  // 40px gap
    createPlatform(1530, 540, 200, 20),  // 40px gap
    createPlatform(1760, 520, 200, 20),  // 40px gap
    createPlatform(2000, 540, 200, 20),  // 40px gap
    createPlatform(2240, 560, 150, 20),  // 40px gap
  ],
  
  enemies: [
    // Easy grunts to practice on
    createEnemy('grunt', 900, 610),
    createEnemy('grunt', 1100, 610),       // Adjusted: was 1200, now on platform 2
    createEnemy('grunt', 1600, 610),
    createEnemy('grunt', 2100, 520),
  ],
  
  pickups: [
    createPickup('medkit', 375, 560),
    createWeaponPickup('rifle', 845, 520),   // Assault Rifle pickup
    createPickup('medkit', 1600, 500),
  ],
  
  savePoints: [
    createSavePoint(50, 590, 'bootcamp'),   // Start
    createSavePoint(1100, 590, 'bootcamp'), // Adjusted: was 1200, now on platform 2
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
    // Street level - CONNECTED (40px gaps to prevent player getting stuck)
    createPlatform(0, 700, 520, 100),
    createPlatform(560, 700, 700, 100),  // 40px gap
    createPlatform(1300, 700, 550, 100), // 40px gap
    createPlatform(1890, 700, 680, 100), // 40px gap
    createPlatform(2610, 700, 500, 100), // 40px gap
    
    // Building 1 - Easy stairs (40px gaps)
    createPlatform(500, 640, 150, 20),
    createPlatform(790, 600, 100, 20),   // 40px gap
    createPlatform(600, 560, 150, 20),   // Back left
    
    // Building 2 - Connected platforms (40px gaps)
    createPlatform(1400, 640, 220, 20),
    createPlatform(1660, 600, 100, 20),  // 40px gap
    createPlatform(1800, 560, 150, 20),  // 40px gap
    createPlatform(1400, 520, 200, 20),  // Back down
    createPlatform(1660, 480, 150, 20),  // 40px gap
    
    // Rooftop path - Easy stepping stones (40px gaps)
    createPlatform(2000, 640, 120, 20),
    createPlatform(2160, 600, 100, 20),  // 40px gap
    createPlatform(2300, 560, 120, 20),  // 40px gap
    createPlatform(2460, 520, 220, 20),  // 40px gap
    createPlatform(2720, 560, 150, 20),  // 40px gap
  ],
  
  enemies: [
    // Street level
    createEnemy('grunt', 700, 660),
    createEnemy('grunt', 900, 660),
    createEnemy('soldier', 1400, 660),
    
    // Building 1
    createEnemy('grunt', 675, 600),
    createEnemy('grunt', 675, 520),
    
    // Building 2
    createEnemy('soldier', 1510, 600),
    createEnemy('grunt', 1510, 490),
    createEnemy('soldier', 1855, 540),
    
    // Rooftop
    createEnemy('grunt', 2540, 490),
    createEnemy('grunt', 2755, 540),
  ],
  
  pickups: [
    createPickup('medkit', 810, 600),
    createWeaponPickup('shotgun', 650, 520),   // Shotgun pickup
    createPickup('medkit', 1800, 520),
    createWeaponPickup('sniper', 2550, 520),   // Sniper Rifle pickup
  ],
  
  savePoints: [
    createSavePoint(50, 640, 'city'),
    createSavePoint(900, 640, 'city'),
    createSavePoint(1820, 640, 'city'),   // Adjusted: was 1900, now on platform 3 (ends at 1850)
    createSavePoint(2650, 640, 'city'),   // Adjusted: was 2700, now on platform 5 (starts at 2610)
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
    // Entry tunnel - CONNECTED
    createPlatform(0, 500, 520, 100),
    createPlatform(540, 550, 320, 50),   // Small gap, slight step up
    
    // Main chamber - CONNECTED
    createPlatform(880, 500, 650, 100),  // Small gap
    createPlatform(1550, 500, 480, 100), // Small gap
    
    // Upper catwalks - Connected walkway
    createPlatform(800, 520, 220, 20),
    createPlatform(1040, 480, 100, 20),  // Small gap
    createPlatform(1180, 480, 220, 20),  // Small gap
    createPlatform(1440, 520, 220, 20),  // Small gap
    createPlatform(1700, 480, 200, 20),  // Small gap
    
    // Lower tunnels - CONNECTED
    createPlatform(500, 650, 830, 50),
    createPlatform(1350, 650, 470, 50),  // Small gap
    createPlatform(1840, 600, 580, 100), // Small gap
    
    // Exit tunnel
    createPlatform(2440, 550, 380, 50),  // Small gap
  ],
  
  enemies: [
    // Entry
    createEnemy('grunt', 650, 510),
    createEnemy('grunt', 750, 510),
    
    // Main chamber
    createEnemy('soldier', 1150, 460),
    createEnemy('soldier', 1750, 460),
    
    // Catwalks
    createEnemy('drone', 910, 500),
    createEnemy('drone', 1400, 460),
    createEnemy('drone', 1800, 460),
    
    // Lower tunnels
    createEnemy('grunt', 700, 610),
    createEnemy('soldier', 1000, 610),
    createEnemy('grunt', 1600, 610),
    
    // Exit
    createEnemy('soldier', 2200, 560),
    createEnemy('drone', 2600, 510),
  ],
  
  pickups: [
    createPickup('medkit', 900, 480),
    createWeaponPickup('lmg', 1300, 440),     // LMG pickup
    createPickup('medkit', 1900, 440),
    createWeaponPickup('rifle', 2100, 560),   // Extra Assault Rifle
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
    // Mountain base - CONNECTED
    createPlatform(0, 600, 520, 100),
    createPlatform(540, 550, 450, 50),   // Small gap
    
    // Climbing path - Easy steps
    createPlatform(1010, 580, 220, 50),  // Small gap
    createPlatform(1260, 580, 220, 50),  // Small gap
    createPlatform(1510, 560, 220, 50),  // Small gap
    
    // Upper ridge - Connected
    createPlatform(1760, 520, 650, 50),  // Small gap
    createPlatform(2430, 470, 400, 50),  // Small gap
    createPlatform(2850, 470, 380, 50),  // Small gap
    
    // Lower caves - Connected
    createPlatform(800, 700, 430, 50),
    createPlatform(1250, 750, 350, 50),  // Small gap
    createPlatform(2030, 700, 430, 50),  // Small gap
    
    // Ice platforms - Easy reach
    createPlatform(500, 580, 170, 20),
    createPlatform(690, 560, 120, 20),   // Small gap
    createPlatform(900, 560, 170, 20),   // Small gap
  ],
  
  enemies: [
    // Base
    createEnemy('grunt', 700, 510),
    createEnemy('soldier', 800, 510),
    
    // Climbing path
    createEnemy('drone', 1200, 540),
    createEnemy('soldier', 1500, 540),
    createEnemy('drone', 1800, 500),
    
    // Upper ridge - Heavy enemy!
    createEnemy('heavy', 2300, 444),
    createEnemy('soldier', 2600, 460),
    createEnemy('drone', 3000, 410),
    
    // Caves
    createEnemy('grunt', 1000, 660),
    createEnemy('soldier', 1200, 660),
    createEnemy('grunt', 1600, 710),
    createEnemy('soldier', 2200, 660),
    
    // Ice platforms
    createEnemy('drone', 550, 510),
    createEnemy('drone', 950, 490),
  ],
  
  pickups: [
    createPickup('medkit', 1120, 540),
    createWeaponPickup('shotgun', 1370, 540),  // Shotgun pickup
    createPickup('medkit', 2085, 470),
    createWeaponPickup('sniper', 3030, 420),   // Sniper pickup
  ],
  
  savePoints: [
    createSavePoint(50, 540, 'mountain'),
    createSavePoint(1120, 520, 'mountain'),
    createSavePoint(2085, 460, 'mountain'),
    createSavePoint(3040, 410, 'mountain'),
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
    // Entry hall - CONNECTED
    createPlatform(0, 600, 420, 100),
    createPlatform(440, 600, 380, 100),  // Small gap
    
    // Security checkpoint - CONNECTED
    createPlatform(840, 550, 430, 50),   // Small gap
    createPlatform(1290, 550, 330, 50),  // Small gap
    
    // Command center
    createPlatform(1640, 500, 550, 50),  // Small gap
    
    // Upper levels - Easy walkway
    createPlatform(600, 560, 220, 20),
    createPlatform(840, 560, 100, 20),   // Small gap
    createPlatform(960, 560, 220, 20),   // Small gap
    createPlatform(1200, 560, 220, 20),  // Small gap
    
    // Boss platform (final)
    createPlatform(1850, 520, 350, 50),  // Small gap
    
    // Side passages - CONNECTED
    createPlatform(300, 750, 430, 50),
    createPlatform(750, 750, 480, 50),   // Small gap
  ],
  
  enemies: [
    // Entry
    createEnemy('soldier', 630, 560),
    createEnemy('soldier', 730, 560),
    
    // Security
    createEnemy('drone', 1055, 510),
    createEnemy('heavy', 1365, 500),
    createEnemy('drone', 1555, 500),
    
    // Command center
    createEnemy('soldier', 1950, 450),
    createEnemy('soldier', 2050, 450),
    createEnemy('heavy', 2200, 470),
    
    // Upper levels
    createEnemy('drone', 710, 540),
    createEnemy('drone', 1070, 540),
    createEnemy('drone', 1310, 540),
    
    // Side passages
    createEnemy('grunt', 430, 710),
    createEnemy('soldier', 640, 710),
    createEnemy('grunt', 1050, 710),
  ],
  
  pickups: [
    createPickup('medkit', 1055, 510),
    createWeaponPickup('lmg', 1455, 510),      // LMG pickup
    createPickup('medkit', 1915, 540),
    createWeaponPickup('shotgun', 2025, 490), // Shotgun pickup
  ],
  
  savePoints: [
    createSavePoint(50, 540, 'hq'),
    createSavePoint(1100, 500, 'hq'),
    createSavePoint(1750, 450, 'hq'),
    createSavePoint(2025, 460, 'hq'),
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
