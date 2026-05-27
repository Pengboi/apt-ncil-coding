# 🎮 TACTICAL OPS: Platformer RPG
## Game Design & Implementation Plan

---

## 1. Game Overview

**Genre:** 2D Military Adventure Platformer RPG (Metroidvania-style)  
**Theme:** Military / Call of Duty-inspired  
**Tech Stack:** Next.js 16 + React 19 + TypeScript + HTML5 Canvas  

**Core Loop:**
```
Explore → Discover Areas → Fight Enemies → Collect XP → Level Up → Unlock New Areas
```

**Adventure Focus:**
- Multiple connected areas/levels to discover
- Backtracking with new abilities (optional stretch goal)
- Save points to record progress
- Death = restart from last save (roguelike death, but with persistence)

---

## 2. Core Features

### 2.1 Player Character
| Feature | Description |
|---------|-------------|
| **Movement** | Run left/right, jump (double jump?), crouch |
| **Health** | HP bar, takes damage from enemies/environment |
| **Combat** | Shoot guns with mouse aim / auto-aim |
| **Exploration** | Navigate through connected areas, find secrets |
| **Visual** | Military soldier sprite (or simple shape initially) |

### 2.2 Combat System
- **Shooting:** Click to shoot bullets toward mouse cursor
- **Weapons:** Different gun types (pistol, rifle, shotgun, etc.)
- **Aiming:** Mouse-based aiming with crosshair
- **Reload:** Optional reload mechanic for realism

### 2.3 Enemy System
| Enemy Type | Behavior | Difficulty |
|------------|----------|------------|
| **Grunt** | Walks back and forth, melee attack | Easy |
| **Soldier** | Shoots at player, takes cover | Medium |
| **Heavy** | Slow, high HP, high damage | Hard |
| **Drone** | Flies, fast but low HP | Medium |

### 2.4 Progression System (RPG Elements)
```
Kill Enemy → Gain XP → Level Up → Stat Points → Upgrade Character
```

**Stats to Upgrade:**
- **Max Health** - Survive longer
- **Damage** - Deal more damage
- **Speed** - Move faster
- **Fire Rate** - Shoot faster

**Level Up Rewards:**
- Stat points to distribute
- Maybe unlock new weapons at certain levels

### 2.5 Pickups & Collectibles
| Pickup | Effect | Duration |
|--------|--------|----------|
| **Medkit** | Heal 25/50/100 HP | Instant |
| **Ammo Crate** | Refill ammo | Instant |
| **Damage Boost** | 2x damage | 10 seconds |
| **Speed Boost** | 1.5x move speed | 10 seconds |
| **Shield** | Invincibility | 5 seconds |
| **Temporary Weapon** | Rare/OP weapon drop | Until ammo runs out |

### 2.6 Save System ✅ DECISION: Common Save Points
| Feature | Description |
|---------|-------------|
| **Save Points** | Interactive terminals at key locations (before/after fights, at exits) |
| **What Saves** | Position, level, XP, stats, current area, unlocked areas, weapons, inventory |
| **Death** | Return to last save point with ALL progress intact |
| **Manual Save** | Press 'E' at terminal to save |

### 2.7 World & Areas ✅ DECISION: All 5 Areas
| Area | Theme | Difficulty | Enemies | Save Points |
|------|-------|------------|---------|-------------|
| **Boot Camp** | Training grounds | Easy | Grunts only | 2 (start + end) |
| **Abandoned City** | Urban ruins | Easy-Medium | Grunts, Soldiers | 3 |
| **Underground Bunker** | Tunnels/base | Medium | Soldiers, Drones | 3 |
| **Mountain Outpost** | Snowy peaks | Medium-Hard | All types | 3 |
| **Enemy HQ** | Final fortress | Hard | All + Boss | 4 (before boss) |

**World Structure:**
- Areas are connected (like a map)
- Progression unlocks new areas
- Can backtrack to previous areas
- Each area is one large scrolling map
- Grunts respawn when re-entering, special enemies stay dead

### 2.8 Weapon System ✅ DECISION: Multiple Weapons
| Slot | Weapon | How to Unlock |
|------|--------|---------------|
| **1** | Pistol | Starting weapon |
| **2** | Assault Rifle | Find in Boot Camp |
| **3** | Shotgun | Enemy drop or find in City |
| **4** | Sniper Rifle | Find in Bunker |
| **5** | LMG / Special | Find in Outpost or HQ |

**Weapon Switching:** Press 1-5 to switch, or scroll wheel

---

## 3. Game Architecture

### 3.1 Folder Structure
```
app/
├── page.tsx                    # Main page
├── layout.tsx                  # Root layout
├── globals.css                 # Global styles
├── game/
│   ├── GameCanvas.tsx          # Main game component
│   ├── GameEngine.ts           # Core game loop
│   ├── types.ts                # TypeScript interfaces
│   ├── constants.ts            # Game constants
│   ├── data/
│   │   ├── areas.ts            # Area definitions (levels)
│   │   ├── enemies.ts          # Enemy type definitions
│   │   └── weapons.ts          # Weapon definitions
│   ├── entities/
│   │   ├── Player.ts           # Player class
│   │   ├── Enemy.ts            # Base enemy class
│   │   ├── Bullet.ts           # Bullet/projectile
│   │   ├── Pickup.ts           # Power-ups
│   │   ├── SavePoint.ts        # Checkpoint terminal
│   │   └── Particle.ts         # Visual effects
│   ├── world/
│   │   ├── Area.ts             # Area/level class
│   │   ├── Camera.ts           # Camera following player
│   │   ├── Platform.ts         # Terrain/platforms
│   │   └── WorldMap.ts         # World connection logic
│   ├── systems/
│   │   ├── CombatSystem.ts     # Shooting & damage
│   │   ├── SpawnSystem.ts      # Enemy spawning
│   │   ├── XpSystem.ts         # XP & leveling
│   │   ├── PickupSystem.ts     # Power-up management
│   │   ├── SaveSystem.ts       # Save/load game state
│   │   └── CollisionSystem.ts  # Hit detection
│   └── ui/
│       ├── HUD.tsx             # Health, XP, Level, Area name
│       ├── LevelUpModal.tsx    # Level up screen
│       ├── GameOverScreen.tsx  # Death screen
│       ├── PauseMenu.tsx       # Pause with save option
│       ├── MainMenu.tsx        # Start screen
│       └── MapScreen.tsx       # World map overview
└── hooks/
    └── useGameLoop.ts          # Custom hook for game loop
```

### 3.2 Core Classes

```typescript
// Player
interface Player {
  x, y: number;           // Position
  vx, vy: number;         // Velocity
  width, height: number;  // Size
  hp, maxHp: number;      // Health
  level: number;          // Current level
  xp: number;             // Current XP
  xpToNextLevel: number;  // XP needed
  weapon: Weapon;         // Current weapon
  stats: PlayerStats;     // Upgradable stats
  currentAreaId: string;  // Which area they're in
  unlockedAreas: string[];// Areas accessible
}

// Enemy
interface Enemy {
  x, y: number;
  hp, maxHp: number;
  type: EnemyType;
  xpValue: number;        // XP awarded on kill
  behavior: AIBehavior;
  respawnOnReenter: boolean; // Respawn when player returns?
}

// Weapon
interface Weapon {
  name: string;
  damage: number;
  fireRate: number;       // Shots per second
  bulletSpeed: number;
  ammo: number;
  maxAmmo: number;
  isTemporary: boolean;   // From pickup?
}

// Area/Level
interface Area {
  id: string;             // Unique identifier
  name: string;           // Display name
  theme: AreaTheme;       // Visual theme
  width, height: number;  // Total area size
  platforms: Platform[];  // Terrain
  enemies: Enemy[];       // Initial enemy placements
  pickups: Pickup[];      // Items to collect
  savePoints: SavePoint[];// Checkpoint locations
  connections: Connection[];// Exits to other areas
}

// Save Data
interface SaveData {
  player: Player;
  timestamp: number;
  playTime: number;       // Total play time
  areasDiscovered: string[];
  enemiesKilled: number;
}
```

### 3.3 Game Loop (60 FPS)
```
1. Process Input (keyboard, mouse)
2. Update Physics (gravity, collisions)
3. Update Entities (player, enemies, bullets)
4. Check Collisions
5. Spawn/Despawn entities
6. Render everything
```

---

## 4. Controls

| Key | Action |
|-----|--------|
| **A / ←** | Move left |
| **D / →** | Move right |
| **W / ↑ / Space** | Jump |
| **S / ↓** | Crouch |
| **Mouse** | Aim |
| **Left Click** | Shoot |
| **R** | Reload |
| **E** | Interact / Pickup |

---

## 5. Visual Design (Military Theme)

### Color Palette
```
Background: #1a1a2e (Dark military blue)
Platforms:  #4a4a5a (Concrete gray)
Player:     #2ecc71 (Friendly green) or camo pattern
Enemies:    #e74c3c (Enemy red) or dark camo
Bullets:    #f1c40f (Tracer yellow)
Pickups:    #9b59b6 (Power-up purple)
UI:         #ecf0f1 (Clean white)
```

### Visual Elements
- **Soldier sprites** (simplified geometric shapes for MVP)
- **Gun effects** (muzzle flash, bullet trails)
- **Particle effects** (explosions on death, hit sparks)
- **UI panels** (tactical/military style)

---

## 6. Implementation Phases

### Phase 1: Core Foundation ✅ MUST HAVE
- [ ] Canvas setup with game loop
- [ ] Player movement (run, jump)
- [ ] Basic platform collision
- [ ] Shooting mechanics
- [ ] Simple enemy (walks, dies)
- [ ] Camera following player

### Phase 2: Combat & Enemies ✅ MUST HAVE
- [ ] Multiple enemy types
- [ ] Enemy AI (chase, shoot)
- [ ] Damage system
- [ ] Health/Death mechanics

### Phase 3: Progression System ✅ MUST HAVE
- [ ] XP gain on kills
- [ ] Level up system
- [ ] Stat upgrades
- [ ] Save/load progress (localStorage)

### Phase 4: Pickups, Saves & Weapons ✅ MUST HAVE
- [ ] Medkit pickups
- [ ] Power-ups (damage, speed)
- [ ] Weapon pickups
- [ ] Spawn system for pickups
- [ ] Save point terminals
- [ ] Save/load system (localStorage)
- [ ] Death and respawn mechanics

### Phase 5: World Expansion 🗺️ MUST HAVE
- [ ] Build all 5 areas
- [ ] Area transitions/connections
- [ ] World map screen
- [ ] Area discovery notifications

### Phase 6: Polish & Juice 🎨 NICE TO HAVE
- [ ] Particle effects
- [ ] Screen shake on hit
- [ ] Sound effects
- [ ] Better sprites/animations
- [ ] Secret areas
- [ ] Boss battles

---

## 7. Technical Considerations

### Performance
- Use `requestAnimationFrame` for smooth rendering
- Object pooling for bullets/particles (reuse objects)
- Spatial hashing for collision detection (if many entities)

### State Management
- React state for UI (menus, HUD)
- Plain JS/TS objects for game state (updated in game loop)
- Sync between game state and React only when needed

### Canvas vs DOM
- **Canvas:** Better for many moving objects, precise collision
- We'll use **HTML5 Canvas** for the game rendering

---

## 8. Design Decisions ✅ FINALIZED

Based on discussion, here are the locked-in design choices:

| Question | Decision |
|----------|----------|
| **1. Enemy Respawn** | **MIX** — Grunts respawn for XP grinding, special enemies/bosses stay dead |
| **2. Save Frequency** | **COMMON** — Save points before major fights and at key locations |
| **3. Weapon Inventory** | **MULTIPLE** — Carry multiple weapons, switch with 1-5 keys |
| **4. MVP Scope** | **ALL 5 AREAS** — Build all areas but keep them simple |

### Additional Decisions Needed During Development:

| Question | Options | Status |
|----------|---------|--------|
| **Area Structure** | One large scrolling map per area | TBD during Phase 1 |
| **Map Discovery** | Fog of war — discover as you explore | TBD during Phase 5 |
| **Death Penalty** | Return to save, keep all XP/progress | TBD during Phase 4 |
| **Weapon Unlocking** | Find in areas + enemy drops + level rewards | TBD during Phase 4 |
| **Camera Style** | Smooth follow player | TBD during Phase 1 |
| **Art Style** | Simple colored shapes (MVP), upgrade to sprites later | TBD during Phase 6 |

---

## 9. MVP Features (Phase 1-4) ✅ DECISION: Build All 5 Areas Simple

### Phase 1-4 Goals:
1. ✅ All 5 areas with basic layouts
2. ✅ Player movement + camera following
3. ✅ Multiple weapons (1-5 switching)
4. ✅ All enemy types (Grunt, Soldier, Drone, Heavy)
5. ✅ XP + leveling + stat upgrades
6. ✅ All pickups (medkit, boosts, temp weapons)
7. ✅ Save system at terminals
8. ✅ Death = respawn at last save
9. ✅ Area transitions
10. ✅ Complete HUD

### Simplified Visuals (MVP):
- Player: Green rectangle
- Enemies: Red/orange shapes (different sizes per type)
- Bullets: Yellow circles
- Platforms: Gray rectangles
- Pickups: Colored circles
- Save Points: Blue pulsing circles

### Area Layout Examples:

**Boot Camp (Simple):**
```
[Spawn]====[Platform]====[Grunt]====[Platform]====[Save]====[Rifle Pickup]====[Exit to City]
```

**City (Slightly more complex):**
```
                    [Building 2]
                         |
[Entrance]====[Street]====[Save]====[Street]====[Building 1]====[Exit to Bunker]
                |                              |
             [Grunts]                      [Soldiers]
```

**Estimated time:** 6-8 coding sessions for full MVP

---

---

## 10. Implementation Roadmap

### Pre-Coding Setup
- [ ] Review this plan together
- [ ] Set up Canvas and basic rendering
- [ ] Create TypeScript interfaces

### Coding Sessions Breakdown

**Session 1: Foundation** (Phase 1)
- Canvas setup + game loop
- Player movement (run, jump)
- Camera following player
- Basic platform collision

**Session 2: Combat Basics** (Phase 2)
- Shooting mechanics + bullets
- 3 weapons (pistol, rifle, shotgun)
- Weapon switching (1-3 keys)
- First enemy type (Grunt)

**Session 3: Enemies & XP** (Phase 2-3)
- All 4 enemy types
- Enemy AI (patrol, chase, shoot)
- XP gain on kills
- Level up system
- Stat upgrades

**Session 4: Pickups & Saves** (Phase 4)
- All pickup types
- Save point terminals
- Save/load to localStorage
- Death and respawn

**Session 5: World Building** (Phase 5)
- Build all 5 areas
- Area transitions
- World connections
- Fog of war / discovery

**Session 6: Polish** (Phase 6)
- Particle effects
- Screen shake
- UI polish
- Bug fixes
- Testing

---

## ✅ PLAN APPROVED — Ready to Code!

**Summary of what we're building:**
- 🎮 **5-area military adventure platformer**
- 💀 **Death = respawn at last save point** (progress saved)
- 💾 **Common save terminals** throughout areas
- 🔫 **5 switchable weapons** (keys 1-5)
- 👾 **Mixed enemy respawn** (grunts respawn, bosses don't)
- 📊 **RPG progression** (XP, levels, stat upgrades)

**Next step:** Start coding Phase 1 — want to begin now or review anything first?

---

*Plan created: 2026-02-28*
*Ready for implementation* 🚀
