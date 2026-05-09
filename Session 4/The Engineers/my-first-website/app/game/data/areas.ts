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
    animationState: 'idle',
    animationTimer: 0,
    isShooting: false,
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
    createWeaponPickup('sniper', 2570, 500),   // Sniper Rifle pickup - MOVED to top platform at y=500
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
    // ============================================================
    // ENTRY SECTION - Starting platform with safe zone
    // ============================================================
    // Entry platform - player starts here
    createPlatform(0, 500, 200, 80),
    createPlatform(240, 500, 150, 80),  // 40px gap - easy first jump
    
    // ============================================================
    // LOWER TUNNEL PATH - Main ground route
    // ============================================================
    // Lower tunnel - connected walkway at bottom
    createPlatform(430, 600, 250, 50),  // Step down
    createPlatform(720, 600, 200, 50),  // 40px gap
    createPlatform(960, 600, 180, 50),  // 40px gap
    createPlatform(1180, 600, 220, 50), // 40px gap
    createPlatform(1440, 600, 200, 50), // 40px gap
    createPlatform(1680, 600, 250, 50), // 40px gap
    createPlatform(1970, 600, 200, 50), // 40px gap
    
    // Lower path continues to exit
    createPlatform(2210, 580, 180, 50), // Step up slightly
    createPlatform(2430, 560, 200, 50), // 40px gap - rising
    createPlatform(2670, 560, 130, 50), // 40px gap - exit platform
    
    // ============================================================
    // UPPER CATWALK PATH - Alternative high route
    // ============================================================
    // Climb up to catwalks from entry
    createPlatform(350, 420, 120, 20),  // Elevated platform
    createPlatform(510, 380, 100, 20),  // 40px gap - higher
    createPlatform(650, 340, 120, 20),  // 40px gap - catwalk start
    
    // Upper catwalk - main elevated walkway
    createPlatform(810, 340, 200, 20),  // 40px gap
    createPlatform(1050, 340, 150, 20), // 40px gap
    createPlatform(1240, 360, 180, 20), // 40px gap - dips slightly
    createPlatform(1460, 380, 200, 20), // 40px gap - continues
    createPlatform(1700, 360, 150, 20),  // 40px gap
    createPlatform(1890, 340, 180, 20), // 40px gap
    
    // Catwalk merges back down
    createPlatform(2110, 380, 120, 20), // 40px gap - descending
    createPlatform(2270, 420, 100, 20), // 40px gap
    createPlatform(2390, 480, 120, 20), // 40px gap - connects to exit area
    
    // ============================================================
    // MID-LEVEL PLATFORMS - Connection between paths
    // ============================================================
    // Side platforms for vertical movement
    createPlatform(800, 480, 100, 20),  // Between lower and upper
    createPlatform(1100, 450, 80, 20),  // Small stepping stone
    createPlatform(1600, 480, 100, 20), // Mid-level rest
    createPlatform(2050, 480, 80, 20),  // Small platform
    
    // ============================================================
    // EXIT SECTION - Final area
    // ============================================================
    // Exit platform (high ground)
    createPlatform(2550, 480, 150, 50),
    createPlatform(2740, 500, 60, 50),  // Final exit step
  ],
  
  enemies: [
    // Entry area - easy grunts
    createEnemy('grunt', 500, 560),
    createEnemy('grunt', 800, 560),
    
    // Lower tunnel guards
    createEnemy('grunt', 1050, 560),
    createEnemy('soldier', 1300, 560),
    createEnemy('grunt', 1550, 560),
    createEnemy('soldier', 1850, 560),
    createEnemy('grunt', 2100, 540),
    
    // Upper catwalk sentries
    createEnemy('soldier', 900, 300),
    createEnemy('drone', 1125, 300),
    createEnemy('soldier', 1350, 320),
    createEnemy('drone', 1575, 340),
    createEnemy('soldier', 1800, 300),
    
    // Mid-level patrols
    createEnemy('drone', 850, 440),
    createEnemy('drone', 1650, 440),
    
    // Exit guards
    createEnemy('soldier', 2300, 520),
    createEnemy('drone', 2500, 430),
    createEnemy('heavy', 2700, 460),  // Boss-like enemy at exit
  ],
  
  pickups: [
    // Lower path pickups
    createPickup('medkit', 820, 560),
    createWeaponPickup('rifle', 1300, 560),   // Assault Rifle on lower path
    createPickup('medkit', 1900, 560),
    
    // Upper path pickups
    createWeaponPickup('lmg', 1125, 300),     // LMG on upper catwalk
    createPickup('medkit', 1575, 320),
    
    // Hidden mid-level pickup
    createPickup('medkit', 1100, 410),
    
    // Exit area pickup
    createWeaponPickup('shotgun', 2600, 430), // Shotgun before exit
  ],
  
  savePoints: [
    createSavePoint(50, 440, 'bunker'),      // Start save
    createSavePoint(1000, 560, 'bunker'),    // Lower tunnel midpoint
    createSavePoint(1350, 300, 'bunker'),    // Upper catwalk
    createSavePoint(2300, 520, 'bunker'),    // Pre-exit
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
      fromX: 2770,
      fromY: 500,
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
    // ============================================================
    // BASE CAMP - Starting area (safe zone)
    // ============================================================
    createPlatform(0, 600, 300, 100),     // Start platform
    createPlatform(340, 600, 200, 100),   // 40px gap
    
    // ============================================================
    // UPPER RIDGE PATH - High route across the mountain
    // ============================================================
    // First ascent - climbing up
    createPlatform(580, 550, 150, 20),    // Step up
    createPlatform(770, 500, 120, 20),    // 40px gap - higher
    createPlatform(930, 450, 150, 20),    // 40px gap - ridge start
    
    // Ridge walk - main high path
    createPlatform(1120, 450, 200, 20),   // 40px gap
    createPlatform(1360, 430, 180, 20),   // 40px gap - slight dip
    createPlatform(1580, 400, 200, 20),   // 40px gap - higher
    createPlatform(1820, 380, 250, 20),   // 40px gap - near summit
    createPlatform(2110, 350, 180, 20),   // 40px gap - summit area
    createPlatform(2330, 350, 200, 20),   // 40px gap
    createPlatform(2570, 380, 150, 20),   // 40px gap - descending
    createPlatform(2760, 420, 120, 20),   // 40px gap
    createPlatform(2920, 450, 150, 20),   // 40px gap - exit approach
    
    // Exit platform
    createPlatform(3110, 470, 90, 50),    // Final exit
    
    // ============================================================
    // LOWER CAVE PATH - Underground/lower route
    // ============================================================
    // Drop down to lower level
    createPlatform(560, 650, 180, 50),    // Down from base
    createPlatform(780, 700, 200, 50),    // 40px gap
    createPlatform(1020, 720, 180, 50),   // 40px gap - cave depths
    createPlatform(1240, 700, 220, 50),   // 40px gap
    createPlatform(1500, 680, 180, 50),   // 40px gap
    createPlatform(1700, 700, 200, 50),   // 40px gap
    createPlatform(1940, 720, 150, 50),   // 40px gap
    createPlatform(2130, 700, 180, 50),   // 40px gap - cave climb starts
    
    // Cave climb back up
    createPlatform(2350, 650, 120, 50),   // 40px gap - climbing
    createPlatform(2510, 600, 100, 50),   // 40px gap - back to mid level
    
    // ============================================================
    // ICE PLATFORMS - Tricky mid-level route
    // ============================================================
    // Ice bridge connecting routes (slippery platforms)
    createPlatform(480, 500, 80, 15),     // Small ice ledge
    createPlatform(600, 480, 60, 15),     // 40px gap
    createPlatform(720, 520, 80, 15),     // 40px gap - dips
    createPlatform(1300, 520, 100, 15),   // Ice section 2
    createPlatform(1450, 500, 70, 15),    // 40px gap
    createPlatform(2000, 500, 80, 15),    // Ice section 3
    createPlatform(2150, 480, 60, 15),    // 40px gap
    
    // ============================================================
    // MID-LEVEL CONNECTORS - Between upper and lower
    // ============================================================
    createPlatform(850, 580, 100, 20),    // Connector 1
    createPlatform(1200, 550, 80, 20),    // Connector 2
    createPlatform(1680, 550, 100, 20),   // Connector 3
    createPlatform(2400, 520, 80, 20),    // Connector 4
    
    // Shortcut ledges
    createPlatform(350, 480, 80, 20),     // Early shortcut
    createPlatform(1880, 450, 80, 20),     // Mid shortcut
    createPlatform(2650, 480, 70, 20),    // Late shortcut
  ],
  
  enemies: [
    // Base camp guards
    createEnemy('grunt', 400, 560),
    createEnemy('soldier', 650, 500),
    
    // Upper ridge sentries
    createEnemy('soldier', 920, 410),
    createEnemy('drone', 1220, 410),
    createEnemy('soldier', 1470, 390),
    createEnemy('drone', 1720, 360),
    createEnemy('soldier', 2020, 330),
    createEnemy('drone', 2340, 310),
    
    // Summit heavy guard!
    createEnemy('heavy', 2660, 330),
    createEnemy('soldier', 2900, 410),
    
    // Lower cave patrols
    createEnemy('grunt', 880, 650),
    createEnemy('soldier', 1120, 670),
    createEnemy('grunt', 1360, 650),
    createEnemy('soldier', 1600, 630),
    createEnemy('grunt', 1850, 670),
    createEnemy('soldier', 2090, 650),
    createEnemy('grunt', 2290, 600),
    
    // Ice platform drones (flying sentries)
    createEnemy('drone', 520, 460),
    createEnemy('drone', 640, 440),
    createEnemy('drone', 760, 480),
    createEnemy('drone', 1340, 480),
    createEnemy('drone', 1485, 460),
    createEnemy('drone', 2040, 460),
    createEnemy('drone', 2190, 440),
    
    // Mid-level guards
    createEnemy('soldier', 900, 540),
    createEnemy('drone', 1720, 520),
    createEnemy('soldier', 2440, 480),
  ],
  
  pickups: [
    // Lower cave pickups
    createPickup('medkit', 880, 650),
    createPickup('medkit', 1700, 630),
    createWeaponPickup('shotgun', 2200, 650),  // Shotgun in caves
    
    // Ridge path pickups
    createPickup('medkit', 1000, 410),
    createWeaponPickup('sniper', 1710, 350),   // Sniper on ridge
    createPickup('medkit', 2200, 310),
    
    // Ice platform pickup (tricky to reach)
    createPickup('medkit', 390, 440),
    
    // Summit/Exit area
    createWeaponPickup('lmg', 2850, 410),      // LMG before exit
    createPickup('medkit', 3060, 430),
  ],
  
  savePoints: [
    createSavePoint(50, 540, 'mountain'),      // Base camp
    createSavePoint(620, 500, 'mountain'),     // After first climb
    createSavePoint(1190, 400, 'mountain'),    // Ridge midpoint
    createSavePoint(2060, 310, 'mountain'),    // Near summit
    createSavePoint(2900, 390, 'mountain'),    // Exit area
  ],
  
  connections: [
    {
      toAreaId: 'bunker',
      fromX: 50,
      fromY: 600,
      toSpawnX: 2770,
      toSpawnY: 500,
    },
    {
      toAreaId: 'hq',
      fromX: 3150,
      fromY: 470,
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
