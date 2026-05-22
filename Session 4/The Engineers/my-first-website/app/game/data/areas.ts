import { Area, Platform, Enemy, Pickup, SavePoint } from '../types';
import { AREA_THEMES, ENEMY_CONFIGS } from '../constants';

// ============================================================
// AREA DEFINITIONS - All 8 Game Areas (5 original + 3 expansion)
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
function createEnemy(type: 'grunt' | 'soldier' | 'drone' | 'heavy' | 'boss', x: number, y: number): Enemy {
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
    createSavePoint(250, 640, 'city'),     // Moved forward from entrance
    createSavePoint(900, 640, 'city'),
    createSavePoint(1820, 640, 'city'),   // Adjusted: was 1900, now on platform 3 (ends at 1850)
    createSavePoint(2650, 640, 'city'),   // Adjusted: was 2700, now on platform 5 (starts at 2610)
  ],
  
  connections: [
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
    createPlatform(2210, 550, 180, 50), // Step up
    createPlatform(2430, 520, 200, 50), // 40px gap - rising
    createPlatform(2670, 500, 130, 50), // 40px gap - near exit level
    
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
    createSavePoint(100, 440, 'bunker'),      // Start save
    createSavePoint(1000, 560, 'bunker'),    // Lower tunnel midpoint
    createSavePoint(1350, 300, 'bunker'),    // Upper catwalk
    createSavePoint(2300, 520, 'bunker'),    // Pre-exit
  ],
  
  connections: [
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
    // BASE CAMP - Starting area
    // ============================================================
    createPlatform(0, 600, 280, 100),
    createPlatform(320, 600, 200, 100),   // 40px gap
    
    // ============================================================
    // MAIN ASCENT - Climbing the mountain
    // ============================================================
    // Stepping stones going up
    createPlatform(560, 550, 140, 30),    // Step up
    createPlatform(740, 500, 120, 25),    // 60px gap - higher
    createPlatform(920, 450, 160, 25),    // 60px gap - ridge level
    
    // Ridge traverse - main path across top
    createPlatform(1140, 450, 220, 30),
    createPlatform(1400, 420, 180, 25),   // 60px gap - slight climb
    createPlatform(1640, 380, 200, 30),   // 60px gap - near summit
    createPlatform(1880, 350, 240, 30),   // 60px gap - summit
    
    // Descent to exit
    createPlatform(2180, 380, 160, 25),   // 60px gap - going down
    createPlatform(2400, 420, 140, 30),   // 60px gap
    createPlatform(2620, 460, 180, 30),   // 60px gap - exit approach
    createPlatform(2860, 480, 120, 40),   // 60px gap
    
    // Exit
    createPlatform(3040, 500, 100, 50),
    
    // ============================================================
    // LOWER TRAIL - Safer but longer path
    // ============================================================
    createPlatform(540, 700, 200, 50),
    createPlatform(780, 720, 220, 50),    // 40px gap
    createPlatform(1060, 700, 180, 50),   // 60px gap
    createPlatform(1320, 680, 200, 50),   // 60px gap
    createPlatform(1580, 700, 160, 50),   // 60px gap
    createPlatform(1800, 720, 180, 50),   // 60px gap
    
    // Lower path rejoins at exit area
    createPlatform(2040, 680, 140, 50),   // 60px gap
    createPlatform(2260, 620, 120, 40),   // 60px gap - climbing back up
    
    // ============================================================
    // OPTIONAL LEDGES - Risk/Reward shortcuts
    // ============================================================
    // Tricky jumps for pickups
    createPlatform(660, 400, 60, 20),     // Floating ledge - early
    createPlatform(1280, 350, 70, 20),   // High ledge - mid
    createPlatform(2500, 350, 60, 20),   // Summit side ledge
    
    // Connection between upper and lower
    createPlatform(850, 600, 80, 20),
    createPlatform(1700, 550, 100, 20),
  ],
  
  enemies: [
    // Base camp
    createEnemy('grunt', 200, 560),
    createEnemy('grunt', 450, 560),
    
    // Upper ridge - main path guards
    createEnemy('soldier', 620, 510),
    createEnemy('drone', 800, 460),
    createEnemy('soldier', 1000, 410),
    createEnemy('drone', 1250, 410),
    createEnemy('soldier', 1490, 380),
    createEnemy('soldier', 1740, 340),
    
    // Summit heavy!
    createEnemy('heavy', 2000, 310),
    createEnemy('drone', 2260, 340),
    createEnemy('soldier', 2520, 430),
    
    // Exit guard
    createEnemy('soldier', 2920, 440),
    
    // Lower trail patrols
    createEnemy('grunt', 640, 650),
    createEnemy('grunt', 890, 670),
    createEnemy('soldier', 1160, 650),
    createEnemy('grunt', 1440, 630),
    createEnemy('soldier', 1680, 670),
    createEnemy('grunt', 1930, 670),
    createEnemy('soldier', 2160, 580),
    
    // Optional ledge sentries
    createEnemy('drone', 690, 360),
    createEnemy('drone', 1315, 310),
    createEnemy('drone', 2530, 310),
  ],
  
  pickups: [
    // Lower trail pickups
    createPickup('medkit', 890, 670),
    createWeaponPickup('shotgun', 1440, 630),
    createPickup('medkit', 1930, 670),
    
    // Main ridge pickups
    createPickup('medkit', 1000, 410),
    createWeaponPickup('sniper', 1530, 350),   // Sniper at ridge high point
    createPickup('medkit', 1960, 310),
    
    // Optional ledge rewards (tricky jumps)
    createWeaponPickup('rifle', 690, 360),     // Early shortcut reward
    createPickup('medkit', 1315, 310),         // Mid shortcut reward
    createWeaponPickup('lmg', 2530, 310),      // Late shortcut reward
    
    // Connector area
    createPickup('medkit', 1740, 550),
    
    // Exit area
    createPickup('medkit', 3090, 460),
  ],
  
  savePoints: [
    createSavePoint(150, 540, 'mountain'),      // Base camp - moved forward
    createSavePoint(1030, 410, 'mountain'),    // Ridge start
    createSavePoint(1760, 320, 'mountain'),    // Summit
    createSavePoint(2700, 430, 'mountain'),    // Exit approach
  ],
  
  connections: [
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
    // ============================================================
    // ENTRY - Infiltration point
    // ============================================================
    createPlatform(0, 600, 240, 80),
    createPlatform(300, 600, 180, 80),    // 60px gap
    
    // ============================================================
    // UPPER ASSAULT PATH - Direct but dangerous
    // ============================================================
    // Vertical climb to upper level
    createPlatform(540, 550, 100, 25),    // Step up
    createPlatform(700, 500, 80, 20),     // 60px gap - thin ledge
    createPlatform(860, 450, 120, 25),    // 80px gap - higher
    createPlatform(1060, 400, 100, 20),   // 80px gap - thin
    
    // Upper facility traverse
    createPlatform(1260, 380, 180, 30),
    createPlatform(1500, 360, 140, 25),  // 60px gap
    createPlatform(1720, 340, 160, 25),   // 60px gap - command deck
    createPlatform(1960, 360, 120, 20),   // 80px gap
    createPlatform(2160, 400, 100, 25),   // 80px gap - descending
    
    // ============================================================
    // BOSS ARENA - Final confrontation
    // ============================================================
    createPlatform(2320, 450, 80, 30),      // Arena entry
    createPlatform(2480, 480, 200, 40),   // 80px gap - main arena
    createPlatform(2760, 500, 140, 50),   // 80px gap - victory platform
    
    // Exit platform to Sky Fortress
    createPlatform(2980, 520, 120, 40),   // Exit connection platform
    
    // ============================================================
    // LOWER STEALTH PATH - Longer but safer
    // ============================================================
    createPlatform(500, 700, 200, 50),
    createPlatform(760, 720, 180, 50),   // 60px gap
    createPlatform(1000, 700, 220, 50),   // 60px gap
    createPlatform(1280, 720, 160, 50),    // 60px gap
    createPlatform(1520, 700, 200, 50),   // 60px gap
    
    // Lower path rejoins
    createPlatform(1780, 680, 140, 40),   // 60px gap
    createPlatform(1980, 620, 100, 30),   // 60px gap - climbing
    
    // ============================================================
    // VENT/MAINTENANCE LEDGES - Risk shortcuts
    // ============================================================
    createPlatform(620, 480, 50, 15),     // Early vent
    createPlatform(1380, 300, 60, 15),    // High vent - mid
    createPlatform(2260, 320, 50, 15),    // Pre-boss shortcut
    
    // Connection between paths
    createPlatform(1140, 550, 80, 20),
    createPlatform(1660, 580, 70, 20),
  ],
  
  enemies: [
    // Entry guards
    createEnemy('soldier', 200, 560),
    createEnemy('soldier', 400, 560),
    
    // Upper assault path - heavily fortified
    createEnemy('soldier', 590, 515),
    createEnemy('drone', 740, 460),
    createEnemy('soldier', 920, 410),
    createEnemy('drone', 1110, 360),
    createEnemy('soldier', 1350, 345),
    createEnemy('soldier', 1600, 325),
    createEnemy('drone', 1800, 315),
    createEnemy('soldier', 2100, 365),
    
    // Command deck elites
    createEnemy('heavy', 1800, 290),
    createEnemy('soldier', 2230, 365),
    
    // Boss arena - Final confrontation!
    createEnemy('heavy', 2550, 440),
    createEnemy('soldier', 2680, 450),
    createEnemy('soldier', 2450, 450),
    
    // Lower stealth path - lighter security
    createEnemy('grunt', 600, 650),
    createEnemy('grunt', 850, 670),
    createEnemy('soldier', 1120, 650),
    createEnemy('grunt', 1380, 670),
    createEnemy('soldier', 1640, 650),
    createEnemy('grunt', 1930, 590),
    
    // Vent sentries (flying drones)
    createEnemy('drone', 645, 445),
    createEnemy('drone', 1410, 275),
    createEnemy('drone', 2285, 295),
  ],
  
  pickups: [
    // Lower stealth path
    createPickup('medkit', 850, 670),
    createPickup('medkit', 1380, 670),
    createWeaponPickup('shotgun', 1650, 650),
    
    // Upper assault path
    createPickup('medkit', 920, 410),
    createPickup('medkit', 1600, 325),
    createWeaponPickup('lmg', 1350, 345),
    
    // Vent shortcuts - high risk rewards
    createWeaponPickup('rifle', 645, 445),
    createWeaponPickup('sniper', 1410, 275),
    
    // Command deck - before heavy fight
    createPickup('medkit', 1800, 290),
    
    // Boss arena
    createWeaponPickup('lmg', 2580, 440),
    createPickup('medkit', 2830, 460),
  ],
  
  savePoints: [
    createSavePoint(350, 540, 'hq'),         // After entry - moved forward
    createSavePoint(800, 460, 'hq'),      // Upper path checkpoint
    createSavePoint(1620, 310, 'hq'),     // Command deck
    createSavePoint(2400, 420, 'hq'),     // Pre-boss
  ],
  
  connections: [
    {
      toAreaId: 'skyfortress',
      fromX: 2380,
      fromY: 520,
      toSpawnX: 100,
      toSpawnY: 500,
    },
  ],
};

// ------------------------------------------------------------
// AREA 6: SKY FORTRESS - High above the clouds
// ------------------------------------------------------------
export const skyFortressArea: Area = {
  id: 'skyfortress',
  name: 'Sky Fortress',
  theme: 'skyfortress',
  width: 3000,
  height: 1000,
  backgroundColor: AREA_THEMES.skyfortress.backgroundColor,
  playerSpawn: { x: 100, y: 500 },
  
  platforms: [
    // Entry - Floating dock
    createPlatform(0, 600, 240, 80),
    createPlatform(300, 580, 180, 60),
    
    // Main ascent - Wind-swept platforms
    createPlatform(520, 520, 120, 25),
    createPlatform(700, 460, 100, 20),
    createPlatform(880, 400, 140, 25),
    createPlatform(1100, 340, 100, 20),
    createPlatform(1280, 280, 160, 30),
    
    // Upper fortress traverse
    createPlatform(1520, 260, 200, 25),
    createPlatform(1800, 240, 140, 20),
    createPlatform(2020, 280, 180, 30),
    createPlatform(2280, 320, 120, 25),
    
    // Exit approach
    createPlatform(2480, 360, 160, 30),
    createPlatform(2720, 400, 140, 40),
    createPlatform(2900, 450, 100, 50),
    
    // Lower cloud path (safer but longer)
    createPlatform(480, 700, 200, 50),
    createPlatform(740, 720, 180, 50),
    createPlatform(980, 700, 220, 50),
    createPlatform(1260, 680, 160, 50),
    createPlatform(1480, 700, 200, 50),
    createPlatform(1720, 680, 180, 50),
    
    // Rejoin point
    createPlatform(1960, 620, 140, 40),
    
    // Wind current shortcuts (small floating platforms)
    createPlatform(620, 450, 60, 15),
    createPlatform(1420, 200, 70, 15),
    createPlatform(2380, 280, 60, 15),
    
    // Connection bridges
    createPlatform(860, 600, 80, 20),
    createPlatform(1620, 580, 100, 20),
  ],
  
  enemies: [
    // Entry patrol
    createEnemy('soldier', 150, 560),
    createEnemy('drone', 400, 530),
    
    // Main ascent guards
    createEnemy('soldier', 580, 480),
    createEnemy('drone', 750, 420),
    createEnemy('soldier', 950, 360),
    createEnemy('drone', 1180, 300),
    createEnemy('soldier', 1400, 245),
    createEnemy('drone', 1660, 225),
    createEnemy('soldier', 1920, 215),
    
    // Fortress elite
    createEnemy('heavy', 2100, 235),
    createEnemy('soldier', 2340, 290),
    
    // Exit defense
    createEnemy('drone', 2640, 330),
    createEnemy('soldier', 2850, 410),
    
    // Lower path
    createEnemy('grunt', 580, 650),
    createEnemy('soldier', 830, 670),
    createEnemy('grunt', 1100, 650),
    createEnemy('soldier', 1380, 630),
    createEnemy('grunt', 1620, 650),
    createEnemy('soldier', 1860, 630),
    
    // Shortcut sentries
    createEnemy('drone', 650, 415),
    createEnemy('drone', 1455, 180),
    createEnemy('drone', 2410, 260),
  ],
  
  pickups: [
    // Lower path
    createPickup('medkit', 830, 670),
    createWeaponPickup('rifle', 1100, 650),
    createPickup('medkit', 1620, 650),
    
    // Upper ascent
    createPickup('medkit', 750, 420),
    createWeaponPickup('sniper', 1180, 300),
    createPickup('medkit', 1660, 225),
    
    // Shortcut rewards
    createWeaponPickup('lmg', 650, 415),
    createPickup('medkit', 1455, 180),
    
    // Fortress loot
    createWeaponPickup('shotgun', 2100, 235),
    createPickup('medkit', 2780, 400),
    
    // Pre-exit
    createPickup('medkit', 2960, 420),
  ],
  
  savePoints: [
    createSavePoint(150, 540, 'skyfortress'),   // Moved forward from entrance
    createSavePoint(980, 400, 'skyfortress'),
    createSavePoint(1680, 210, 'skyfortress'),
    createSavePoint(2580, 330, 'skyfortress'),
  ],
  
  connections: [
    {
      toAreaId: 'volcanolab',
      fromX: 2950,
      fromY: 450,
      toSpawnX: 100,
      toSpawnY: 500,
    },
  ],
};

// ------------------------------------------------------------
// AREA 7: VOLCANO LAB - Beneath the burning mountain
// ------------------------------------------------------------
export const volcanoLabArea: Area = {
  id: 'volcanolab',
  name: 'Volcano Lab',
  theme: 'volcanolab',
  width: 3200,
  height: 900,
  backgroundColor: AREA_THEMES.volcanolab.backgroundColor,
  playerSpawn: { x: 100, y: 500 },
  
  platforms: [
    // Entry tunnel
    createPlatform(0, 600, 200, 80),
    createPlatform(280, 620, 160, 60),
    
    // Magma chamber crossing - thin precarious bridges
    createPlatform(500, 540, 100, 20),
    createPlatform(680, 480, 80, 15),
    createPlatform(860, 420, 120, 20),
    createPlatform(1060, 360, 80, 15),
    createPlatform(1240, 300, 140, 20),
    createPlatform(1460, 260, 100, 15),
    createPlatform(1640, 280, 160, 25),
    createPlatform(1880, 320, 120, 20),
    
    // Research facility upper deck
    createPlatform(2080, 300, 200, 20),
    createPlatform(2340, 340, 140, 20),
    createPlatform(2560, 380, 180, 25),
    createPlatform(2820, 420, 120, 30),
    
    // Exit chamber
    createPlatform(3000, 470, 200, 50),
    
    // Lower magma tunnel (safer ground route)
    createPlatform(460, 720, 220, 50),
    createPlatform(740, 740, 180, 50),
    createPlatform(1000, 720, 200, 50),
    createPlatform(1280, 700, 160, 50),
    createPlatform(1520, 680, 180, 50),
    createPlatform(1780, 700, 200, 50),
    createPlatform(2060, 680, 160, 50),
    
    // Climb back to upper
    createPlatform(2300, 620, 120, 40),
    createPlatform(2500, 560, 100, 30),
    
    // Lava rock shortcuts (tiny platforms over magma)
    createPlatform(600, 500, 50, 15),
    createPlatform(1380, 240, 60, 15),
    createPlatform(2200, 260, 50, 15),
    
    // Mid connections
    createPlatform(920, 640, 80, 20),
    createPlatform(1700, 600, 100, 20),
  ],
  
  enemies: [
    // Entry security
    createEnemy('soldier', 180, 560),
    createEnemy('soldier', 400, 580),
    
    // Bridge sentries (very dangerous positions)
    createEnemy('soldier', 550, 500),
    createEnemy('drone', 720, 445),
    createEnemy('soldier', 920, 385),
    createEnemy('drone', 1100, 325),
    createEnemy('soldier', 1320, 270),
    createEnemy('drone', 1540, 230),
    
    // Facility guards
    createEnemy('heavy', 1700, 240),
    createEnemy('soldier', 1980, 290),
    createEnemy('drone', 2180, 275),
    createEnemy('soldier', 2440, 315),
    createEnemy('drone', 2700, 355),
    
    // Exit defense
    createEnemy('heavy', 2920, 430),
    createEnemy('soldier', 3100, 430),
    
    // Lower tunnel patrols
    createEnemy('grunt', 570, 670),
    createEnemy('soldier', 830, 690),
    createEnemy('grunt', 1120, 670),
    createEnemy('soldier', 1400, 650),
    createEnemy('grunt', 1660, 630),
    createEnemy('soldier', 1920, 650),
    
    // Shortcut drones
    createEnemy('drone', 625, 475),
    createEnemy('drone', 1410, 215),
    createEnemy('drone', 2225, 235),
  ],
  
  pickups: [
    // Lower tunnel
    createPickup('medkit', 830, 690),
    createPickup('medkit', 1660, 630),
    createWeaponPickup('shotgun', 1920, 650),
    
    // Bridge crossing rewards
    createPickup('medkit', 720, 445),
    createWeaponPickup('sniper', 1100, 325),
    createPickup('medkit', 1540, 230),
    
    // Shortcut treasures
    createWeaponPickup('lmg', 625, 475),
    createPickup('medkit', 1410, 215),
    
    // Facility loot
    createWeaponPickup('rifle', 2180, 275),
    createPickup('medkit', 2620, 370),
    
    // Pre-boss
    createPickup('medkit', 3080, 430),
  ],
  
  savePoints: [
    createSavePoint(150, 540, 'volcanolab'),    // Moved forward from entrance
    createSavePoint(900, 400, 'volcanolab'),
    createSavePoint(1560, 230, 'volcanolab'),
    createSavePoint(2740, 350, 'volcanolab'),
  ],
  
  connections: [
    {
      toAreaId: 'voidcore',
      fromX: 3150,
      fromY: 470,
      toSpawnX: 100,
      toSpawnY: 500,
    },
  ],
};

// ------------------------------------------------------------
// AREA 8: VOID CORE - The final dimension
// Final boss level
// ------------------------------------------------------------
export const voidCoreArea: Area = {
  id: 'voidcore',
  name: 'Void Core',
  theme: 'voidcore',
  width: 2800,
  height: 1000,
  backgroundColor: AREA_THEMES.voidcore.backgroundColor,
  playerSpawn: { x: 100, y: 500 },
  
  platforms: [
    // Entry void platform
    createPlatform(0, 600, 180, 80),
    createPlatform(260, 580, 140, 60),
    
    // Reality shards - floating platforms in void
    createPlatform(480, 500, 100, 20),
    createPlatform(660, 440, 80, 15),
    createPlatform(840, 380, 120, 20),
    createPlatform(1040, 320, 80, 15),
    createPlatform(1220, 260, 140, 20),
    createPlatform(1440, 220, 100, 15),
    
    // Boss arena approach
    createPlatform(1640, 240, 160, 25),
    createPlatform(1880, 280, 120, 20),
    createPlatform(2100, 340, 100, 25),
    
    // BOSS ARENA - Large platform for final battle
    createPlatform(2300, 400, 500, 60),
    
    // Lower void path (more stable but longer)
    createPlatform(440, 720, 200, 50),
    createPlatform(700, 740, 180, 50),
    createPlatform(960, 720, 220, 50),
    createPlatform(1220, 700, 180, 50),
    createPlatform(1480, 680, 200, 50),
    createPlatform(1740, 700, 160, 50),
    createPlatform(1960, 660, 140, 40),
    
    // Climb to boss arena
    createPlatform(2160, 600, 100, 30),
    createPlatform(2320, 520, 80, 25),
    
    // Void shortcuts (very risky tiny platforms)
    createPlatform(580, 480, 50, 15),
    createPlatform(1340, 190, 60, 15),
    createPlatform(2060, 310, 50, 15),
    
    // Emergency connections
    createPlatform(880, 640, 80, 20),
    createPlatform(1580, 620, 100, 20),
  ],
  
  enemies: [
    // Entry void sentries
    createEnemy('soldier', 140, 560),
    createEnemy('drone', 350, 540),
    
    // Shard guardians
    createEnemy('soldier', 530, 460),
    createEnemy('drone', 700, 405),
    createEnemy('soldier', 900, 345),
    createEnemy('drone', 1100, 285),
    createEnemy('soldier', 1300, 235),
    createEnemy('drone', 1520, 195),
    
    // Arena approach elites
    createEnemy('heavy', 1720, 210),
    createEnemy('soldier', 1960, 250),
    createEnemy('heavy', 2160, 310),
    
    // LOWER PATH GUARDIANS
    createEnemy('grunt', 540, 670),
    createEnemy('soldier', 790, 690),
    createEnemy('grunt', 1070, 670),
    createEnemy('soldier', 1350, 650),
    createEnemy('heavy', 1620, 630),
    createEnemy('soldier', 1880, 650),
    createEnemy('grunt', 2100, 620),
    
    // Shortcut sentries
    createEnemy('drone', 605, 455),
    createEnemy('drone', 1370, 165),
    createEnemy('drone', 2085, 285),
    
    // FINAL BOSS - Placed on boss arena
    createEnemy('boss', 2550, 300),
  ],
  
  pickups: [
    // Lower path supplies
    createPickup('medkit', 790, 690),
    createWeaponPickup('shotgun', 1350, 650),
    createPickup('medkit', 1880, 650),
    
    // Shard crossing rewards
    createPickup('medkit', 700, 405),
    createWeaponPickup('sniper', 1100, 285),
    createPickup('medkit', 1520, 195),
    
    // Shortcut treasures
    createWeaponPickup('rifle', 605, 455),
    createWeaponPickup('lmg', 1370, 165),
    createPickup('medkit', 2085, 285),
    
    // Pre-boss preparation
    createPickup('medkit', 1980, 250),
    createPickup('medkit', 2200, 310),
    
    // Arena supplies
    createWeaponPickup('lmg', 2400, 360),
    createPickup('medkit', 2700, 360),
  ],
  
  savePoints: [
    createSavePoint(150, 540, 'voidcore'),   // Moved forward from entrance
    createSavePoint(780, 360, 'voidcore'),
    createSavePoint(1380, 180, 'voidcore'),
    createSavePoint(2350, 340, 'voidcore'),  // Pre-boss save (on arena platform)
  ],
  
  connections: [
    // No back exit - no going back from the final dimension
    // No exit - boss must be defeated
  ],
  
  isBossLevel: true,
  bossDefeated: false,
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
  skyFortressArea,
  volcanoLabArea,
  voidCoreArea,
];

// Helper to get area by ID
export function getAreaById(id: string): Area | undefined {
  return ALL_AREAS.find(area => area.id === id);
}

// Helper to get starting area
export function getStartingArea(): Area {
  return bootCampArea;
}
