import { Player } from './entities/Player';
import { Bullet } from './entities/Bullet';
import { Camera } from './world/Camera';
import { Area, InputState, GameScreen, SaveData, Enemy } from './types';
import { getStartingArea, getAreaById, ALL_AREAS } from './data/areas';
import { CANVAS_WIDTH, CANVAS_HEIGHT, DT, COLORS } from './constants';

// ============================================================
// GAME ENGINE - Core Game Loop & State Management
// ============================================================

export class GameEngine {
  // Canvas & Context
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  
  // Game Objects
  player: Player;
  camera: Camera;
  currentArea: Area;
  
  // Game State
  screen: GameScreen;
  lastSavePoint: { x: number; y: number; areaId: string } | null;
  enemiesKilled: number;
  areasDiscovered: string[];
  playTime: number;
  respawnCount: number;
  bossDefeated: boolean;
  victoryStats: { finalTime: number; totalRespawns: number; totalKills: number; completionDate: string } | null;
  
  // Input
  input: InputState;
  
  // Timing
  private lastTime: number;
  private accumulator: number;
  
  // Rendering
  private animationFrameId: number | null;
  
  // Combat
  private bullets: Bullet[];
  private enemyBullets: Bullet[];
  private lastShotTime: number;
  private damageMultiplier: number;
  private damageBoostTimer: number;
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = ctx;
    
    // Initialize game objects
    this.currentArea = getStartingArea();
    this.player = new Player(
      this.currentArea.playerSpawn.x,
      this.currentArea.playerSpawn.y
    );
    this.camera = new Camera(this.currentArea.width, this.currentArea.height);
    this.camera.centerOn(this.player.x, this.player.y, this.player.width, this.player.height);
    
    // Initialize state
    this.screen = 'menu';
    this.lastSavePoint = {
      x: this.currentArea.playerSpawn.x,
      y: this.currentArea.playerSpawn.y,
      areaId: this.currentArea.id,
    };
    this.enemiesKilled = 0;
    this.areasDiscovered = [this.currentArea.id];
    this.playTime = 0;
    this.respawnCount = 0;
    this.bossDefeated = false;
    this.victoryStats = null;
    
    // Initialize input
    this.input = this.getDefaultInput();
    
    // Initialize timing
    this.lastTime = 0;
    this.accumulator = 0;
    this.animationFrameId = null;
    
    // Initialize combat
    this.bullets = [];
    this.enemyBullets = [];
    this.lastShotTime = 0;
    this.damageMultiplier = 1;
    this.damageBoostTimer = 0;
    
    // Set canvas size
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
  }
  
  // ----------------------------------------------------------
  // Menu / Save Game Logic
  // ----------------------------------------------------------
  
  hasSavedGame(): boolean {
    try {
      return localStorage.getItem('tacticalOps_save') !== null;
    } catch (e) {
      return false;
    }
  }
  
  startNewGame(): void {
    // Reset everything to default
    this.currentArea = getStartingArea();
    this.player = new Player(
      this.currentArea.playerSpawn.x,
      this.currentArea.playerSpawn.y
    );
    this.camera = new Camera(this.currentArea.width, this.currentArea.height);
    this.camera.centerOn(this.player.x, this.player.y, this.player.width, this.player.height);
    
    this.lastSavePoint = {
      x: this.currentArea.playerSpawn.x,
      y: this.currentArea.playerSpawn.y,
      areaId: this.currentArea.id,
    };
    this.enemiesKilled = 0;
    this.areasDiscovered = [this.currentArea.id];
    this.playTime = 0;
    this.bullets = [];
    this.enemyBullets = [];
    this.damageMultiplier = 1;
    this.damageBoostTimer = 0;
    
    this.screen = 'playing';
  }
  
  loadSavedGame(): boolean {
    const success = this.loadGame();
    if (success) {
      this.screen = 'playing';
    }
    return success;
  }
  
  handleMenuClick(mouseX: number, mouseY: number): void {
    if (this.screen === 'victory') {
      // Click anywhere on victory screen returns to menu
      this.returnToMenu();
      return;
    }

    if (this.screen !== 'menu') return;

    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;

    // Button dimensions
    const btnWidth = 250;
    const btnHeight = 50;

    // New Game button position
    const newGameY = centerY - 20;
    const newGameX = centerX - btnWidth / 2;

    // Load Game button position
    const loadGameY = centerY + 50;
    const loadGameX = centerX - btnWidth / 2;

    // Check New Game button click
    if (mouseX >= newGameX && mouseX <= newGameX + btnWidth &&
        mouseY >= newGameY && mouseY <= newGameY + btnHeight) {
      this.startNewGame();
      return;
    }

    // Check Load Game button click
    if (mouseX >= loadGameX && mouseX <= loadGameX + btnWidth &&
        mouseY >= loadGameY && mouseY <= loadGameY + btnHeight) {
      if (this.hasSavedGame()) {
        this.loadSavedGame();
      }
    }
  }

  private returnToMenu(): void {
    this.screen = 'menu';
    this.victoryStats = null;
    this.bossDefeated = false;
  }
  
  // ----------------------------------------------------------
  // Input Setup
  // ----------------------------------------------------------
  private getDefaultInput(): InputState {
    return {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      shoot: false,
      reload: false,
      weaponSlots: [false, false, false, false, false],
      interact: false,
      mouseX: 0,
      mouseY: 0,
      mouseWorldX: 0,
      mouseWorldY: 0,
    };
  }
  
  // ----------------------------------------------------------
  // Game Loop
  // ----------------------------------------------------------
  start(): void {
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);
  }
  
  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  
  private gameLoop = (currentTime: number): void => {
    // Calculate delta time
    const frameTime = (currentTime - this.lastTime) / 1000;  // Convert to seconds
    this.lastTime = currentTime;
    
    // Cap frame time to prevent spiral of death
    const deltaTime = Math.min(frameTime, 0.1);
    
    // Update play time
    this.playTime += deltaTime;
    
    // Fixed time step update
    this.accumulator += deltaTime;
    while (this.accumulator >= DT) {
      this.update(DT);
      this.accumulator -= DT;
    }
    
    // Render
    this.render();
    
    // Schedule next frame
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };
  
  // ----------------------------------------------------------
  // Update
  // ----------------------------------------------------------
  private update(dt: number): void {
    if (this.screen !== 'playing') return;
    
    // Update mouse world position
    this.updateMouseWorldPosition();
    
    // Update player
    this.player.update(this.input, dt);
    
    // Check platform collisions
    this.handlePlatformCollisions();
    
    // Check if player fell off world
    if (this.player.y > this.currentArea.height + 200) {
      this.handlePlayerDeath();
    }
    
    // Check save point collisions
    this.handleSavePointCollisions();
    
    // Check area transitions
    this.handleAreaTransitions();
    
    // Update camera
    this.camera.follow(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );
    
    // Handle shooting
    this.handleShooting();
    
    // Update enemies (AI and shooting)
    this.updateEnemies(dt);
    
    // Update bullets
    this.updateBullets(dt);
    this.updateEnemyBullets(dt);
    
    // Check bullet collisions
    this.handleBulletCollisions();
    this.handleEnemyBulletCollisions();
    
    // Check pickup collisions
    this.handlePickupCollisions();
    
    // Update damage boost timer
    if (this.damageBoostTimer > 0) {
      this.damageBoostTimer -= dt;
      if (this.damageBoostTimer <= 0) {
        this.damageMultiplier = 1;
      }
    }
    
    // Check for death
    if (this.player.isDead()) {
      this.handlePlayerDeath();
    }
  }
  
  // ----------------------------------------------------------
  // Mouse Position Conversion
  // ----------------------------------------------------------
  private updateMouseWorldPosition(): void {
    const worldPos = this.camera.screenToWorld(this.input.mouseX, this.input.mouseY);
    this.input.mouseWorldX = worldPos.x;
    this.input.mouseWorldY = worldPos.y;
  }
  
  // ----------------------------------------------------------
  // Platform Collisions
  // ----------------------------------------------------------
  private handlePlatformCollisions(): void {
    // Reset grounded state
    this.player.isGrounded = false;
    
    // Check each platform
    for (const platform of this.currentArea.platforms) {
      this.player.resolvePlatformCollision(
        platform.x,
        platform.y,
        platform.width,
        platform.height
      );
    }
    
    // Additional ground check for platforms
    this.player.checkGrounded(this.currentArea.platforms);
  }
  
  // ----------------------------------------------------------
  // Save Point Collisions
  // ----------------------------------------------------------
  private handleSavePointCollisions(): void {
    for (const savePoint of this.currentArea.savePoints) {
      const dx = (this.player.x + this.player.width / 2) - (savePoint.x + savePoint.width / 2);
      const dy = (this.player.y + this.player.height / 2) - (savePoint.y + savePoint.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Activate save point when nearby
      if (distance < 50) {
        savePoint.isActivated = true;
        
        // Update last save point
        this.lastSavePoint = {
          x: savePoint.x,
          y: savePoint.y - 20,  // Spawn slightly above
          areaId: this.currentArea.id,
        };
        
        // Auto-save (optional - can change to manual with 'E' key)
        // this.saveGame();
      }
    }
    
    // Manual save with E key
    if (this.input.interact) {
      this.saveGame();
      this.input.interact = false;  // Consume input
    }
  }
  
  // ----------------------------------------------------------
  // Pickup Collisions
  // ----------------------------------------------------------
  private handlePickupCollisions(): void {
    for (const pickup of this.currentArea.pickups) {
      if (pickup.isCollected) continue;
      
      // Check collision with player
      if (
        this.player.x < pickup.x + pickup.width &&
        this.player.x + this.player.width > pickup.x &&
        this.player.y < pickup.y + pickup.height &&
        this.player.y + this.player.height > pickup.y
      ) {
        // Collect the pickup!
        pickup.isCollected = true;
        this.applyPickupEffect(pickup);
      }
    }
  }
  
  private applyPickupEffect(pickup: { type: string; value: number; duration: number; weaponId?: string }): void {
    switch (pickup.type) {
      case 'medkit':
        this.player.heal(pickup.value);
        console.log(`Healed ${pickup.value} HP!`);
        break;
      case 'ammo':
        // Refill current weapon ammo
        const weapon = this.player.getCurrentWeapon();
        weapon.ammo = Math.min(weapon.maxAmmo, weapon.ammo + pickup.value);
        console.log(`Refilled ${pickup.value} ammo!`);
        break;
      case 'damageBoost':
        this.damageMultiplier = pickup.value;
        this.damageBoostTimer = pickup.duration;
        console.log(`Damage boost activated! ${pickup.duration}s`);
        break;
      case 'speedBoost':
        // Speed boost would modify player stats temporarily
        console.log('Speed boost picked up!');
        break;
      case 'weapon':
        if (pickup.weaponId) {
          this.player.unlockWeapon(pickup.weaponId);
          // Get weapon name for better notification
          const weaponNames: Record<string, string> = {
            'rifle': 'Assault Rifle',
            'shotgun': 'Shotgun',
            'sniper': 'Sniper Rifle',
            'lmg': 'Light Machine Gun',
          };
          const weaponName = weaponNames[pickup.weaponId] || pickup.weaponId;
          console.log(`🎉 UNLOCKED: ${weaponName}! Press ${this.player.weapons.findIndex(w => w.id === pickup.weaponId) + 1} to equip`);
        }
        break;
    }
  }
  
  // ----------------------------------------------------------
  // Area Transitions
  // ----------------------------------------------------------
  private handleAreaTransitions(): void {
    const playerCenterX = this.player.x + this.player.width / 2;
    const playerCenterY = this.player.y + this.player.height / 2;
    
    for (const connection of this.currentArea.connections) {
      const dx = playerCenterX - connection.fromX;
      const dy = playerCenterY - connection.fromY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 50) {
        this.transitionToArea(connection.toAreaId, connection.toSpawnX, connection.toSpawnY);
        break;
      }
    }
  }
  
  private transitionToArea(areaId: string, spawnX: number, spawnY: number): void {
    const newArea = getAreaById(areaId);
    if (!newArea) return;
    
    // Clear bullets when changing areas
    this.bullets = [];
    this.enemyBullets = [];
    
    // Respawn grunts that should respawn
    for (const enemy of newArea.enemies) {
      if (enemy.respawnOnReenter && enemy.isDead) {
        enemy.isDead = false;
        enemy.hp = enemy.maxHp;
      }
    }
    
    // Respawn pickups
    for (const pickup of newArea.pickups) {
      pickup.isCollected = false;
    }
    
    // Update current area
    this.currentArea = newArea;
    
    // Move player to spawn
    this.player.x = spawnX;
    this.player.y = spawnY;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.currentAreaId = areaId;
    
    // Update camera bounds
    this.camera.setWorldBounds(newArea.width, newArea.height);
    this.camera.centerOn(spawnX, spawnY, this.player.width, this.player.height);
    
    // Track discovered areas
    if (!this.areasDiscovered.includes(areaId)) {
      this.areasDiscovered.push(areaId);
      this.player.unlockedAreas.push(areaId);
    }
  }
  
  // ----------------------------------------------------------
  // Death Handling
  // ----------------------------------------------------------
  private handlePlayerDeath(): void {
    if (!this.lastSavePoint) return;

    // Increment respawn counter
    this.respawnCount++;

    // Clear enemy bullets
    this.enemyBullets = [];
    this.bullets = [];

    // Load last save point area
    const saveArea = getAreaById(this.lastSavePoint.areaId);
    if (saveArea) {
      this.currentArea = saveArea;
      this.camera.setWorldBounds(saveArea.width, saveArea.height);
    }

    // Respawn player
    this.player.respawn(this.lastSavePoint.x, this.lastSavePoint.y);
    this.camera.centerOn(this.player.x, this.player.y, this.player.width, this.player.height);
  }
  
  // ----------------------------------------------------------
  // Shooting System
  // ----------------------------------------------------------
  private handleShooting(): void {
    if (!this.input.shoot) return;
    
    const weapon = this.player.getCurrentWeapon();
    if (!weapon || !weapon.isUnlocked) return;
    
    // Check fire rate (cooldown)
    const now = performance.now();
    const fireInterval = 1000 / (weapon.fireRate * this.player.stats.fireRate);
    
    if (now - this.lastShotTime < fireInterval) return;
    
    // Fire! (Unlimited ammo - no ammo check)
    this.fireBullet(weapon);
    // weapon.ammo--;  // Unlimited ammo - don't decrement
    this.lastShotTime = now;
  }
  
  private fireBullet(weapon: { damage: number; bulletSpeed: number; color: string }): void {
    // Get gun position (at player's gun hand)
    const gunOffsetX = this.player.isFacingRight ? this.player.width + 5 : -25;
    const gunOffsetY = 20;
    
    const startX = this.player.x + gunOffsetX + 10;
    const startY = this.player.y + gunOffsetY;
    
    // Calculate damage with multipliers
    const damage = weapon.damage * this.player.stats.damage * this.damageMultiplier;
    
    // Create bullet toward mouse position
    const bullet = new Bullet(
      startX,
      startY,
      this.input.mouseWorldX,
      this.input.mouseWorldY,
      weapon.bulletSpeed,
      damage,
      true,
      weapon.color
    );
    
    this.bullets.push(bullet);
  }
  
  // ----------------------------------------------------------
  // Bullet Update & Collision
  // ----------------------------------------------------------
  private updateBullets(dt: number): void {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.update(dt);
      
      // Remove expired bullets
      if (bullet.isExpired()) {
        this.bullets.splice(i, 1);
        continue;
      }
      
      // Check platform collision
      for (const platform of this.currentArea.platforms) {
        if (bullet.collidesWithRect(platform.x, platform.y, platform.width, platform.height)) {
          this.bullets.splice(i, 1);
          break;
        }
      }
    }
  }
  
  private handleBulletCollisions(): void {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      if (!bullet.isPlayerBullet) continue;
      
      // Check collision with enemies
      for (const enemy of this.currentArea.enemies) {
        if (enemy.isDead) continue;
        
        if (bullet.collidesWithRect(enemy.x, enemy.y, enemy.width, enemy.height)) {
          // Hit!
          enemy.hp -= bullet.damage;
          this.bullets.splice(i, 1);
          
          // Check enemy death
          if (enemy.hp <= 0) {
            this.killEnemy(enemy);
          }
          
          break;  // Bullet hit one enemy, stop checking
        }
      }
    }
  }
  
  private killEnemy(enemy: Enemy): void {
    enemy.isDead = true;
    this.enemiesKilled++;

    // Check if boss was defeated
    if (enemy.type === 'boss') {
      this.bossDefeated = true;
      this.currentArea.bossDefeated = true;

      // Store victory stats
      this.victoryStats = {
        finalTime: this.playTime,
        totalRespawns: this.respawnCount,
        totalKills: this.enemiesKilled,
        completionDate: new Date().toLocaleString(),
      };

      // Switch to victory screen
      this.screen = 'victory';
      console.log('BOSS DEFEATED! Victory screen triggered.');
    }

    // Give XP
    const leveledUp = this.player.gainXp(enemy.xpValue);

    if (leveledUp) {
      // Could show level up notification here
      console.log(`Level Up! Now level ${this.player.level}`);
    }
  }
  
  // ----------------------------------------------------------
  // Enemy AI & Shooting
  // ----------------------------------------------------------
  private updateEnemies(dt: number): void {
    const now = performance.now();

    for (const enemy of this.currentArea.enemies) {
      if (enemy.isDead) continue;

      const playerCenterX = this.player.x + this.player.width / 2;
      const playerCenterY = this.player.y + this.player.height / 2;
      const enemyCenterX = enemy.x + enemy.width / 2;
      const enemyCenterY = enemy.y + enemy.height / 2;

      // Distance to player
      const dx = playerCenterX - enemyCenterX;
      const dy = playerCenterY - enemyCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Face player
      enemy.isFacingRight = dx > 0;

      // Basic patrol movement
      if (distance > enemy.detectionRange) {
        // Patrol between patrol points
        if (enemy.x <= enemy.patrolStartX) {
          enemy.vx = enemy.speed * 0.5;
        } else if (enemy.x >= enemy.patrolEndX) {
          enemy.vx = -enemy.speed * 0.5;
        }

        // If not moving, start moving
        if (enemy.vx === 0) {
          enemy.vx = enemy.speed * 0.5;
        }

        enemy.x += enemy.vx * dt;
      } else if (distance > enemy.attackRange) {
        // Chase player
        const chaseSpeed = enemy.speed * 0.3;
        enemy.vx = dx > 0 ? chaseSpeed : -chaseSpeed;
        enemy.x += enemy.vx * dt;
      } else {
        // In attack range, stop moving
        enemy.vx = 0;
      }

      // Shooting (soldiers, heavies, and boss)
      if ((enemy.type === 'soldier' || enemy.type === 'heavy' || enemy.type === 'boss') && distance <= enemy.attackRange) {
        // Fire rate: 1 shot per second for soldiers, 0.5 for heavies, 0.8 for boss
        let fireRate = 1000;
        if (enemy.type === 'heavy') fireRate = 2000;
        if (enemy.type === 'boss') fireRate = 800;

        if (now - enemy.lastAttackTime > fireRate) {
          // Boss fires a burst of 3 shots
          if (enemy.type === 'boss') {
            this.enemyBossShoot(enemy, playerCenterX, playerCenterY);
          } else {
            this.enemyShoot(enemy, playerCenterX, playerCenterY);
          }
          enemy.lastAttackTime = now;
        }
      }

      // Melee damage for grunts (contact)
      if (enemy.type === 'grunt' && distance < 30) {
        // Damage player every second when touching
        if (now - enemy.lastAttackTime > 1000) {
          this.player.takeDamage(enemy.damage);
          enemy.lastAttackTime = now;
        }
      }
    }
  }

  private enemyBossShoot(enemy: Enemy, targetX: number, targetY: number): void {
    // Boss fires in BOTH directions - forward and backward spray
    const leftGunX = enemy.x;
    const rightGunX = enemy.x + enemy.width;
    const gunY = enemy.y + enemy.height / 2;

    // Determine which direction is "forward" (toward player)
    const playerIsRight = targetX > enemy.x + enemy.width / 2;
    const forwardDir = playerIsRight ? 1 : -1;
    const backDir = -forwardDir;

    // === FORWARD SHOTS (toward player) ===
    // Left cannon forward
    const bullet1 = new Bullet(
      leftGunX,
      gunY,
      targetX,
      targetY - 50, // Aim slightly up
      500,
      enemy.damage,
      false,
      '#ff0000'
    );

    // Center/core forward
    const bullet2 = new Bullet(
      enemy.x + enemy.width / 2,
      gunY,
      targetX,
      targetY,
      500,
      enemy.damage,
      false,
      '#ff0000'
    );

    // Right cannon forward
    const bullet3 = new Bullet(
      rightGunX,
      gunY,
      targetX,
      targetY + 50, // Aim slightly down
      500,
      enemy.damage,
      false,
      '#ff0000'
    );

    // === BACKWARD SHOTS (opposite direction) ===
    // Calculate opposite target point
    const backTargetX = enemy.x + enemy.width / 2 - (targetX - (enemy.x + enemy.width / 2));
    const backTargetY = targetY;

    // Left cannon backward (becomes right from back perspective)
    const bullet4 = new Bullet(
      rightGunX,
      gunY - 10,
      backTargetX,
      backTargetY - 50,
      500,
      enemy.damage,
      false,
      '#ff5500'  // Orange-red for back shots
    );

    // Center/core backward
    const bullet5 = new Bullet(
      enemy.x + enemy.width / 2,
      gunY - 10,
      backTargetX,
      backTargetY,
      500,
      enemy.damage,
      false,
      '#ff5500'
    );

    // Right cannon backward (becomes left from back perspective)
    const bullet6 = new Bullet(
      leftGunX,
      gunY - 10,
      backTargetX,
      backTargetY + 50,
      500,
      enemy.damage,
      false,
      '#ff5500'
    );

    this.enemyBullets.push(bullet1, bullet2, bullet3, bullet4, bullet5, bullet6);

    // Trigger shooting animation
    enemy.isShooting = true;
    enemy.animationTimer = 0;
    enemy.animationState = 'shoot';
  }
  
  private enemyShoot(enemy: Enemy, targetX: number, targetY: number): void {
    const gunX = enemy.x + enemy.width / 2;
    const gunY = enemy.y + enemy.height / 2;

    // Add some inaccuracy
    const inaccuracy = 20;
    const targetXWithSpread = targetX + (Math.random() - 0.5) * inaccuracy;
    const targetYWithSpread = targetY + (Math.random() - 0.5) * inaccuracy;

    const bullet = new Bullet(
      gunX,
      gunY,
      targetXWithSpread,
      targetYWithSpread,
      400,  // Enemy bullets are slower
      enemy.damage,
      false,  // Not player bullet
      '#e74c3c'  // Red for enemy bullets
    );

    this.enemyBullets.push(bullet);

    // Trigger shooting animation for grunt, soldier, and heavy types
    if (enemy.type !== 'drone') {
      enemy.isShooting = true;
      enemy.animationTimer = 0;
      enemy.animationState = 'shoot';
    }
  }
  
  private updateEnemyBullets(dt: number): void {
    for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
      const bullet = this.enemyBullets[i];
      bullet.update(dt);
      
      // Remove expired bullets
      if (bullet.isExpired()) {
        this.enemyBullets.splice(i, 1);
        continue;
      }
      
      // Check platform collision
      for (const platform of this.currentArea.platforms) {
        if (bullet.collidesWithRect(platform.x, platform.y, platform.width, platform.height)) {
          this.enemyBullets.splice(i, 1);
          break;
        }
      }
    }
  }
  
  private handleEnemyBulletCollisions(): void {
    for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
      const bullet = this.enemyBullets[i];
      
      // Check collision with player
      if (bullet.collidesWithRect(this.player.x, this.player.y, this.player.width, this.player.height)) {
        this.player.takeDamage(bullet.damage);
        this.enemyBullets.splice(i, 1);
        
        // Screen shake effect could go here
      }
    }
  }
  
  // ----------------------------------------------------------
  // Save/Load System
  // ----------------------------------------------------------
  saveGame(): void {
    const saveData: SaveData = {
      player: this.player,
      timestamp: Date.now(),
      playTime: this.playTime,
      areasDiscovered: this.areasDiscovered,
      enemiesKilled: this.enemiesKilled,
      currentAreaId: this.currentArea.id,
    };
    
    try {
      localStorage.setItem('tacticalOps_save', JSON.stringify(saveData));
      console.log('Game saved!');
    } catch (e) {
      console.error('Failed to save game:', e);
    }
  }
  
  loadGame(): boolean {
    try {
      const saveString = localStorage.getItem('tacticalOps_save');
      if (!saveString) return false;
      
      const saveData: SaveData = JSON.parse(saveString);
      
      // Load area
      const area = getAreaById(saveData.currentAreaId);
      if (area) {
        this.currentArea = area;
        this.camera.setWorldBounds(area.width, area.height);
      }
      
      // Load player (need to reconstruct methods)
      this.player = new Player(saveData.player.x, saveData.player.y);
      Object.assign(this.player, saveData.player);
      
      // Load stats
      this.areasDiscovered = saveData.areasDiscovered;
      this.enemiesKilled = saveData.enemiesKilled;
      this.playTime = saveData.playTime;
      
      // Update last save
      this.lastSavePoint = {
        x: this.player.x,
        y: this.player.y,
        areaId: this.currentArea.id,
      };
      
      this.camera.centerOn(this.player.x, this.player.y, this.player.width, this.player.height);
      
      console.log('Game loaded!');
      return true;
    } catch (e) {
      console.error('Failed to load game:', e);
      return false;
    }
  }
  
  // ----------------------------------------------------------
  // Rendering
  // ----------------------------------------------------------
  private render(): void {
    const ctx = this.ctx;

    // Render different screens based on game state
    if (this.screen === 'menu') {
      this.renderMenu(ctx);
    } else if (this.screen === 'victory') {
      this.renderVictoryScreen(ctx);
    } else {
      // Render themed background
      this.renderBackground(ctx);

      // Apply camera transform
      ctx.save();
      ctx.translate(-this.camera.x, -this.camera.y);

      // Render parallax background layers
      this.renderParallaxBackground(ctx);

      // Render world
      this.renderPlatforms(ctx);
      this.renderSavePoints(ctx);
      this.renderPickups(ctx);
      this.renderEnemies(ctx);
      this.renderBullets(ctx);
      this.renderEnemyBullets(ctx);
      this.renderPlayer(ctx);
      this.renderAreaConnections(ctx);

      // Restore transform
      ctx.restore();

      // Render UI (screen space)
      this.renderUI(ctx);
    }
  }
  
  // ----------------------------------------------------------
  // Background Rendering - Themed by area
  // ----------------------------------------------------------
  private renderBackground(ctx: CanvasRenderingContext2D): void {
    const theme = this.currentArea.theme;
    
    // Base gradient based on theme
    switch (theme) {
      case 'bootcamp':
        this.renderBootCampBackground(ctx);
        break;
      case 'city':
        this.renderCityBackground(ctx);
        break;
      case 'bunker':
        this.renderBunkerBackground(ctx);
        break;
      case 'mountain':
        this.renderMountainBackground(ctx);
        break;
      case 'hq':
        this.renderHQBackground(ctx);
        break;
      case 'skyfortress':
        this.renderSkyFortressBackground(ctx);
        break;
      case 'volcanolab':
        this.renderVolcanoLabBackground(ctx);
        break;
      case 'voidcore':
        this.renderVoidCoreBackground(ctx);
        break;
      default:
        ctx.fillStyle = this.currentArea.backgroundColor;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }
  
  private renderBootCampBackground(ctx: CanvasRenderingContext2D): void {
    // Sunny training ground - sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.6, '#B8E6F0');
    gradient.addColorStop(1, '#E8F8F5');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Sun
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH - 100, 80, 40, 0, Math.PI * 2);
    ctx.fill();
    
    // Distant training obstacles (silhouettes)
    ctx.fillStyle = 'rgba(100, 150, 100, 0.3)';
    // Obstacle course elements in distance
    ctx.fillRect(200, 400, 20, 60);
    ctx.fillRect(350, 380, 60, 20);
    ctx.fillRect(500, 420, 30, 40);
    ctx.fillRect(700, 390, 80, 15);
    
    // Ground/horizon line
    ctx.fillStyle = 'rgba(76, 175, 80, 0.4)';
    ctx.fillRect(0, 500, CANVAS_WIDTH, 200);
    
    // Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.drawCloud(ctx, 150, 100, 40);
    this.drawCloud(ctx, 450, 70, 50);
    this.drawCloud(ctx, 800, 120, 35);
    this.drawCloud(ctx, 1050, 90, 45);
  }
  
  private renderCityBackground(ctx: CanvasRenderingContext2D): void {
    // Abandoned city - overcast/dusk atmosphere
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#2C3E50');
    gradient.addColorStop(0.5, '#34495E');
    gradient.addColorStop(1, '#4A5F7A');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Distant city skyline (silhouettes)
    ctx.fillStyle = 'rgba(30, 40, 50, 0.8)';
    // Building silhouettes
    const buildings = [
      { x: 50, w: 60, h: 200 },
      { x: 120, w: 80, h: 280 },
      { x: 210, w: 50, h: 180 },
      { x: 270, w: 100, h: 320 },
      { x: 380, w: 70, h: 240 },
      { x: 460, w: 90, h: 300 },
      { x: 560, w: 60, h: 190 },
      { x: 630, w: 110, h: 350 },
      { x: 750, w: 80, h: 260 },
      { x: 840, w: 50, h: 170 },
      { x: 900, w: 120, h: 310 },
      { x: 1030, w: 70, h: 220 },
      { x: 1110, w: 90, h: 280 },
    ];
    
    for (const b of buildings) {
      ctx.fillRect(b.x, CANVAS_HEIGHT - b.h, b.w, b.h);
      // Windows (some lit, some dark)
      for (let wy = CANVAS_HEIGHT - b.h + 20; wy < CANVAS_HEIGHT - 20; wy += 30) {
        for (let wx = b.x + 10; wx < b.x + b.w - 10; wx += 20) {
          if (Math.random() > 0.7) {
            ctx.fillStyle = 'rgba(255, 200, 100, 0.6)'; // Lit window
            ctx.fillRect(wx, wy, 12, 18);
            ctx.fillStyle = 'rgba(30, 40, 50, 0.8)';
          }
        }
      }
    }
    
    // Smog/fog overlay
    const fogGradient = ctx.createLinearGradient(0, CANVAS_HEIGHT - 100, 0, CANVAS_HEIGHT);
    fogGradient.addColorStop(0, 'rgba(100, 110, 120, 0)');
    fogGradient.addColorStop(1, 'rgba(100, 110, 120, 0.4)');
    ctx.fillStyle = fogGradient;
    ctx.fillRect(0, CANVAS_HEIGHT - 150, CANVAS_WIDTH, 150);
  }
  
  private renderBunkerBackground(ctx: CanvasRenderingContext2D): void {
    // Underground bunker - industrial/concrete
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#1A252F');
    gradient.addColorStop(0.5, '#2C3E50');
    gradient.addColorStop(1, '#34495E');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Concrete wall texture - horizontal lines
    ctx.strokeStyle = 'rgba(100, 110, 120, 0.3)';
    ctx.lineWidth = 2;
    for (let y = 50; y < CANVAS_HEIGHT; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }
    
    // Vertical structural beams
    ctx.fillStyle = 'rgba(60, 70, 80, 0.5)';
    for (let x = 0; x < CANVAS_WIDTH; x += 200) {
      ctx.fillRect(x, 0, 15, CANVAS_HEIGHT);
    }
    
    // Pipes along ceiling
    ctx.strokeStyle = 'rgba(80, 90, 100, 0.6)';
    ctx.lineWidth = 8;
    for (let x = 0; x < CANVAS_WIDTH; x += 150) {
      ctx.beginPath();
      ctx.moveTo(x, 30);
      ctx.lineTo(x + 100, 30);
      ctx.stroke();
      // Pipe connectors
      ctx.fillStyle = 'rgba(100, 110, 120, 0.8)';
      ctx.fillRect(x + 100, 26, 8, 8);
    }
    
    // Emergency lights (red glow)
    for (let x = 100; x < CANVAS_WIDTH; x += 300) {
      // Light fixture
      ctx.fillStyle = '#444';
      ctx.fillRect(x - 10, 60, 20, 8);
      // Red glow
      const glowGradient = ctx.createRadialGradient(x, 100, 0, x, 120, 80);
      glowGradient.addColorStop(0, 'rgba(255, 50, 50, 0.4)');
      glowGradient.addColorStop(1, 'rgba(255, 50, 50, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, 80, 60, 0, Math.PI / 2);
      ctx.fill();
    }
    
    // Floor grating shadows
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    for (let y = CANVAS_HEIGHT - 100; y < CANVAS_HEIGHT; y += 10) {
      ctx.fillRect(0, y, CANVAS_WIDTH, 2);
    }
  }
  
  private renderMountainBackground(ctx: CanvasRenderingContext2D): void {
    // Mountain outpost - cold, snowy environment
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#85C1E9');
    gradient.addColorStop(0.5, '#AED6F1');
    gradient.addColorStop(1, '#D6EAF8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Distant mountains (layers for depth)
    // Far mountains
    ctx.fillStyle = 'rgba(100, 130, 160, 0.4)';
    ctx.beginPath();
    ctx.moveTo(0, 400);
    ctx.lineTo(100, 300);
    ctx.lineTo(250, 350);
    ctx.lineTo(400, 280);
    ctx.lineTo(600, 320);
    ctx.lineTo(800, 260);
    ctx.lineTo(1000, 310);
    ctx.lineTo(1200, 250);
    ctx.lineTo(CANVAS_WIDTH, 350);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.lineTo(0, CANVAS_HEIGHT);
    ctx.fill();
    
    // Mid mountains
    ctx.fillStyle = 'rgba(130, 160, 190, 0.5)';
    ctx.beginPath();
    ctx.moveTo(0, 450);
    ctx.lineTo(150, 380);
    ctx.lineTo(300, 420);
    ctx.lineTo(500, 360);
    ctx.lineTo(750, 400);
    ctx.lineTo(950, 350);
    ctx.lineTo(1150, 390);
    ctx.lineTo(CANVAS_WIDTH, 420);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.lineTo(0, CANVAS_HEIGHT);
    ctx.fill();
    
    // Near snow-covered peaks
    ctx.fillStyle = 'rgba(200, 220, 240, 0.6)';
    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(200, 450);
    ctx.lineTo(400, 480);
    ctx.lineTo(600, 440);
    ctx.lineTo(800, 470);
    ctx.lineTo(1000, 430);
    ctx.lineTo(CANVAS_WIDTH, 460);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.lineTo(0, CANVAS_HEIGHT);
    ctx.fill();
    
    // Snowflakes falling
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 50; i++) {
      const x = (Math.sin(i * 1.5) * 1000 + i * 30) % CANVAS_WIDTH;
      const y = (i * 15 + (performance.now() / 50)) % CANVAS_HEIGHT;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Wind/snow drift effect at bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let x = 0; x < CANVAS_WIDTH; x += 50) {
      ctx.fillRect(x, CANVAS_HEIGHT - 80, 30, 3);
      ctx.fillRect(x + 20, CANVAS_HEIGHT - 70, 20, 2);
    }
  }
  
  private renderHQBackground(ctx: CanvasRenderingContext2D): void {
    // Enemy HQ - dark high-tech facility
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#0A0A15');
    gradient.addColorStop(0.5, '#151525');
    gradient.addColorStop(1, '#202035');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Tech grid pattern
    ctx.strokeStyle = 'rgba(200, 50, 50, 0.2)';
    ctx.lineWidth = 1;
    const gridSize = 60;
    for (let x = 0; x < CANVAS_WIDTH; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y < CANVAS_HEIGHT; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }
    
    // Warning stripes
    ctx.fillStyle = 'rgba(200, 50, 50, 0.6)';
    for (let x = 0; x < CANVAS_WIDTH; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, CANVAS_HEIGHT - 50);
      ctx.lineTo(x + 20, CANVAS_HEIGHT - 30);
      ctx.lineTo(x + 15, CANVAS_HEIGHT - 30);
      ctx.lineTo(x - 5, CANVAS_HEIGHT - 50);
      ctx.fill();
    }
    
    // Red alert lights pulsing
    const pulse = Math.sin(performance.now() / 500) * 0.3 + 0.7;
    for (let x = 100; x < CANVAS_WIDTH; x += 250) {
      // Light beam
      const beamGradient = ctx.createRadialGradient(x, 0, 0, x, 200, 100);
      beamGradient.addColorStop(0, `rgba(255, 0, 0, ${0.3 * pulse})`);
      beamGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
      ctx.fillStyle = beamGradient;
      ctx.beginPath();
      ctx.moveTo(x - 30, 0);
      ctx.lineTo(x + 30, 0);
      ctx.lineTo(x + 80, 200);
      ctx.lineTo(x - 80, 200);
      ctx.fill();
    }
    
    // Holographic displays (faint screens)
    ctx.fillStyle = 'rgba(0, 200, 255, 0.1)';
    ctx.fillRect(100, 100, 150, 100);
    ctx.fillRect(900, 150, 120, 80);
    // Screen glow
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 100, 150, 100);
    ctx.strokeRect(900, 150, 120, 80);
    
    // Random data lines on screens
    ctx.strokeStyle = 'rgba(0, 255, 200, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(110, 120 + i * 15);
      ctx.lineTo(240, 120 + i * 15);
      ctx.stroke();
    }
  }
  
  private renderSkyFortressBackground(ctx: CanvasRenderingContext2D): void {
    // Sky fortress - high altitude with clouds below
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#4a69bd');
    gradient.addColorStop(0.4, '#6c5ce7');
    gradient.addColorStop(0.7, '#a29bfe');
    gradient.addColorStop(1, '#dfe6e9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Cloud layer below (sea of clouds)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    for (let x = -50; x < CANVAS_WIDTH + 50; x += 80) {
      const cloudY = CANVAS_HEIGHT - 100 + Math.sin(x * 0.01) * 30;
      this.drawCloud(ctx, x, cloudY, 35 + Math.sin(x * 0.02) * 10);
    }
    
    // Wind streaks
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 15; i++) {
      const y = 50 + i * 40;
      const offset = (performance.now() / 20 + i * 30) % (CANVAS_WIDTH + 100);
      ctx.beginPath();
      ctx.moveTo(offset - 100, y);
      ctx.lineTo(offset, y);
      ctx.stroke();
    }
    
    // Sun glow
    const sunGradient = ctx.createRadialGradient(CANVAS_WIDTH - 150, 100, 0, CANVAS_WIDTH - 150, 100, 150);
    sunGradient.addColorStop(0, 'rgba(255, 223, 0, 0.4)');
    sunGradient.addColorStop(1, 'rgba(255, 223, 0, 0)');
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH - 150, 100, 150, 0, Math.PI * 2);
    ctx.fill();
  }
  
  private renderVolcanoLabBackground(ctx: CanvasRenderingContext2D): void {
    // Volcano lab - magma chamber with industrial equipment
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#2c0a0a');
    gradient.addColorStop(0.5, '#5c1919');
    gradient.addColorStop(1, '#8b2631');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Magma/lava flow at bottom
    const magmaGradient = ctx.createLinearGradient(0, CANVAS_HEIGHT - 200, 0, CANVAS_HEIGHT);
    magmaGradient.addColorStop(0, 'rgba(255, 69, 0, 0.3)');
    magmaGradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.6)');
    magmaGradient.addColorStop(1, 'rgba(255, 140, 0, 0.9)');
    ctx.fillStyle = magmaGradient;
    ctx.fillRect(0, CANVAS_HEIGHT - 200, CANVAS_WIDTH, 200);
    
    // Bubbles in magma
    ctx.fillStyle = 'rgba(255, 200, 100, 0.8)';
    for (let i = 0; i < 10; i++) {
      const x = (i * 130 + performance.now() / 50) % CANVAS_WIDTH;
      const y = CANVAS_HEIGHT - 50 - Math.sin(performance.now() / 1000 + i) * 30;
      const size = 5 + Math.sin(performance.now() / 500 + i) * 3;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Industrial pipes silhouettes
    ctx.fillStyle = 'rgba(30, 10, 10, 0.6)';
    for (let x = 100; x < CANVAS_WIDTH; x += 300) {
      // Vertical pipes
      ctx.fillRect(x, 50, 20, CANVAS_HEIGHT - 150);
      // Horizontal connectors
      ctx.fillRect(x, 100, 100, 15);
      ctx.fillRect(x, 250, 150, 15);
    }
    
    // Heat distortion shimmer lines
    ctx.strokeStyle = 'rgba(255, 100, 50, 0.1)';
    ctx.lineWidth = 1;
    for (let y = 50; y < CANVAS_HEIGHT - 100; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x < CANVAS_WIDTH; x += 50) {
        ctx.lineTo(x + 25, y + Math.sin(x * 0.02 + performance.now() / 1000) * 5);
      }
      ctx.stroke();
    }
  }
  
  private renderVoidCoreBackground(ctx: CanvasRenderingContext2D): void {
    // Void core - shattered dimension
    // Dark void background
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#050510');
    gradient.addColorStop(0.5, '#0c0c1a');
    gradient.addColorStop(1, '#1a0b2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Reality cracks - jagged lines across screen
    ctx.strokeStyle = `rgba(100, 50, 200, ${0.2 + Math.sin(performance.now() / 1000) * 0.1})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(300, 150);
    ctx.lineTo(500, 80);
    ctx.lineTo(800, 200);
    ctx.lineTo(CANVAS_WIDTH, 120);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_HEIGHT - 150);
    ctx.lineTo(400, CANVAS_HEIGHT - 200);
    ctx.lineTo(700, CANVAS_HEIGHT - 100);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - 180);
    ctx.stroke();
    
    // Floating geometric fragments
    ctx.fillStyle = 'rgba(150, 100, 255, 0.15)';
    for (let i = 0; i < 8; i++) {
      const x = (i * 160 + performance.now() / 50) % (CANVAS_WIDTH + 100) - 50;
      const y = 100 + i * 80 + Math.sin(performance.now() / 2000 + i) * 30;
      const rotation = performance.now() / 3000 + i;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillRect(-20, -20, 40, 40);
      ctx.restore();
    }
    
    // Distant stars/worlds
    ctx.fillStyle = 'rgba(200, 200, 255, 0.8)';
    for (let i = 0; i < 30; i++) {
      const x = (i * 47) % CANVAS_WIDTH;
      const y = (i * 23) % CANVAS_HEIGHT;
      const twinkle = Math.sin(performance.now() / 500 + i) * 0.5 + 0.5;
      ctx.globalAlpha = twinkle;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    
    // Energy pulsing from center
    const pulse = Math.sin(performance.now() / 1500) * 0.3 + 0.7;
    const energyGradient = ctx.createRadialGradient(
      CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 0,
      CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 300
    );
    energyGradient.addColorStop(0, `rgba(100, 0, 200, ${0.2 * pulse})`);
    energyGradient.addColorStop(0.5, `rgba(100, 0, 200, ${0.1 * pulse})`);
    energyGradient.addColorStop(1, 'rgba(100, 0, 200, 0)');
    ctx.fillStyle = energyGradient;
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 300, 0, Math.PI * 2);
    ctx.fill();
  }
  
  private renderParallaxBackground(ctx: CanvasRenderingContext2D): void {
    // Parallax effect - background elements move slower than foreground
    const parallaxX = this.camera.x * 0.3;
    
    switch (this.currentArea.theme) {
      case 'bootcamp':
        // Distant trees
        ctx.fillStyle = 'rgba(100, 150, 100, 0.2)';
        for (let x = -parallaxX % 300; x < CANVAS_WIDTH + this.camera.x; x += 300) {
          // Tree trunk
          ctx.fillRect(x + 50, 350, 15, 100);
          // Tree top (triangle)
          ctx.beginPath();
          ctx.moveTo(x + 20, 380);
          ctx.lineTo(x + 95, 380);
          ctx.lineTo(x + 57, 300);
          ctx.fill();
        }
        break;
        
      case 'city':
        // Distant building details
        ctx.fillStyle = 'rgba(50, 60, 70, 0.3)';
        for (let x = -parallaxX % 400; x < CANVAS_WIDTH + this.camera.x; x += 400) {
          ctx.fillRect(x + 100, 200, 80, 300);
          ctx.fillRect(x + 250, 250, 60, 250);
        }
        break;
        
      case 'bunker':
        // Deeper wall sections
        ctx.fillStyle = 'rgba(40, 50, 60, 0.4)';
        for (let x = -parallaxX % 500; x < CANVAS_WIDTH + this.camera.x; x += 500) {
          ctx.fillRect(x + 50, 100, 20, 400);
          // Wall panels
          ctx.fillRect(x + 200, 150, 150, 200);
          ctx.fillRect(x + 400, 200, 100, 150);
        }
        break;
        
      case 'mountain':
        // Snow drifts
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        for (let x = -parallaxX % 600; x < CANVAS_WIDTH + this.camera.x; x += 600) {
          ctx.beginPath();
          ctx.arc(x + 100, CANVAS_HEIGHT - 50, 80, Math.PI, 0);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + 400, CANVAS_HEIGHT - 40, 60, Math.PI, 0);
          ctx.fill();
        }
        break;
        
      case 'hq':
        // Distant machinery
        ctx.fillStyle = 'rgba(100, 50, 50, 0.2)';
        for (let x = -parallaxX % 600; x < CANVAS_WIDTH + this.camera.x; x += 600) {
          // Server racks
          ctx.fillRect(x + 150, 200, 40, 200);
          ctx.fillRect(x + 220, 220, 40, 180);
          // Blinking lights
          ctx.fillStyle = `rgba(255, 0, 0, ${Math.random() > 0.5 ? 0.5 : 0.2})`;
          ctx.fillRect(x + 155, 210, 5, 5);
          ctx.fillRect(x + 155, 230, 5, 5);
          ctx.fillStyle = 'rgba(100, 50, 50, 0.2)';
        }
        break;
        
      case 'skyfortress':
        // Floating debris and distant clouds
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        for (let x = -parallaxX % 500; x < CANVAS_WIDTH + this.camera.x; x += 500) {
          this.drawCloud(ctx, x + 100, 150, 30);
          this.drawCloud(ctx, x + 300, 200, 25);
        }
        // Distant floating islands
        ctx.fillStyle = 'rgba(100, 120, 150, 0.3)';
        for (let x = -parallaxX % 800; x < CANVAS_WIDTH + this.camera.x; x += 800) {
          ctx.beginPath();
          ctx.moveTo(x + 100, 300);
          ctx.lineTo(x + 200, 300);
          ctx.lineTo(x + 150, 250);
          ctx.fill();
        }
        break;
        
      case 'volcanolab':
        // Heat shimmer effect - distant magma glow
        const magmaGlow = ctx.createRadialGradient(
          CANVAS_WIDTH / 2, CANVAS_HEIGHT, 0,
          CANVAS_WIDTH / 2, CANVAS_HEIGHT, 400
        );
        magmaGlow.addColorStop(0, 'rgba(255, 80, 0, 0.2)');
        magmaGlow.addColorStop(1, 'rgba(255, 80, 0, 0)');
        ctx.fillStyle = magmaGlow;
        ctx.fillRect(0, CANVAS_HEIGHT - 400, CANVAS_WIDTH, 400);
        
        // Floating embers
        ctx.fillStyle = 'rgba(255, 100, 50, 0.6)';
        for (let i = 0; i < 20; i++) {
          const x = (Math.sin(i * 2.3) * 500 + i * 60 - parallaxX * 0.5) % CANVAS_WIDTH;
          const y = (i * 30 + performance.now() / 30) % CANVAS_HEIGHT;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      case 'voidcore':
        // Reality tears - glitchy distortions
        ctx.fillStyle = `rgba(100, 0, 200, ${0.1 + Math.sin(performance.now() / 1000) * 0.05})`;
        for (let x = -parallaxX % 300; x < CANVAS_WIDTH + this.camera.x; x += 300) {
          ctx.fillRect(x + 50, 100, 5, CANVAS_HEIGHT - 200);
          ctx.fillRect(x + 150, 50, 3, CANVAS_HEIGHT - 100);
        }
        
        // Floating geometric shapes
        ctx.strokeStyle = 'rgba(150, 50, 255, 0.2)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
          const x = (i * 250 - parallaxX * 0.3) % CANVAS_WIDTH;
          const y = 200 + Math.sin(performance.now() / 2000 + i) * 50;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + 40, y + 30);
          ctx.lineTo(x + 20, y + 60);
          ctx.closePath();
          ctx.stroke();
        }
        break;
    }
  }

  private drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.arc(x + size * 0.8, y, size * 0.7, 0, Math.PI * 2);
    ctx.arc(x - size * 0.8, y, size * 0.7, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y - size * 0.4, size * 0.6, 0, Math.PI * 2);
    ctx.arc(x - size * 0.4, y - size * 0.4, size * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  
  private renderMenu(ctx: CanvasRenderingContext2D): void {
    // Background
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Title
    ctx.fillStyle = '#ecf0f1';
    ctx.font = 'bold 64px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TACTICAL OPS', CANVAS_WIDTH / 2, 120);
    
    // Subtitle
    ctx.font = '24px Arial';
    ctx.fillStyle = '#95a5a6';
    ctx.fillText('Military Adventure Platformer', CANVAS_WIDTH / 2, 170);
    
    // Button dimensions
    const btnWidth = 250;
    const btnHeight = 50;
    const centerX = CANVAS_WIDTH / 2;
    
    // New Game Button
    const newGameY = CANVAS_HEIGHT / 2 - 20;
    this.renderButton(ctx, centerX - btnWidth / 2, newGameY, btnWidth, btnHeight, 'NEW GAME', '#2ecc71');
    
    // Load Game Button (disabled if no save)
    const loadGameY = CANVAS_HEIGHT / 2 + 50;
    const hasSave = this.hasSavedGame();
    this.renderButton(ctx, centerX - btnWidth / 2, loadGameY, btnWidth, btnHeight, 'LOAD GAME', hasSave ? '#3498db' : '#7f8c8d', !hasSave);
    
    // Save info if exists
    if (hasSave) {
      try {
        const saveString = localStorage.getItem('tacticalOps_save');
        if (saveString) {
          const saveData: SaveData = JSON.parse(saveString);
          const date = new Date(saveData.timestamp);
          const dateStr = date.toLocaleDateString();
          const timeStr = date.toLocaleTimeString();
          
          ctx.font = '14px Arial';
          ctx.fillStyle = '#7f8c8d';
          ctx.fillText(`Last saved: ${dateStr} ${timeStr}`, centerX, loadGameY + btnHeight + 25);
          ctx.fillText(`Level ${saveData.player.level} • ${Math.floor(saveData.playTime / 60)}m played`, centerX, loadGameY + btnHeight + 45);
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
    
    // Controls hint at bottom
    ctx.font = '16px Arial';
    ctx.fillStyle = '#7f8c8d';
    ctx.fillText('WASD / Arrow Keys to Move • Mouse to Aim • Click to Shoot', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 60);
    ctx.fillText('Press 1-5 to Switch Weapons • E to Save', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 40);
    
    // Version
    ctx.font = '12px Arial';
    ctx.fillStyle = '#555';
    ctx.fillText('v1.0', CANVAS_WIDTH - 30, CANVAS_HEIGHT - 20);
  }

  private renderVictoryScreen(ctx: CanvasRenderingContext2D): void {
    // Animated victory background - golden celebration
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#2d1b4e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Animated confetti particles
    const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22'];
    for (let i = 0; i < 50; i++) {
      const x = (i * 73 + performance.now() / 20) % CANVAS_WIDTH;
      const y = (i * 47 + performance.now() / 10) % CANVAS_HEIGHT;
      const size = 4 + (i % 6);
      ctx.fillStyle = colors[i % colors.length];
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Victory title with glow
    const titleY = 100;

    // Glow effect
    ctx.shadowColor = '#f1c40f';
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#f1c40f';
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('VICTORY!', CANVAS_WIDTH / 2, titleY);
    ctx.shadowBlur = 0;

    // Subtitle
    ctx.fillStyle = '#ecf0f1';
    ctx.font = 'bold 28px Arial';
    ctx.fillText('BOSS DEFEATED', CANVAS_WIDTH / 2, titleY + 60);

    // Mission complete text
    ctx.fillStyle = '#95a5a6';
    ctx.font = '20px Arial';
    ctx.fillText('Mission Accomplished', CANVAS_WIDTH / 2, titleY + 100);

    // Stats box background
    const boxWidth = 450;
    const boxHeight = 280;
    const boxX = (CANVAS_WIDTH - boxWidth) / 2;
    const boxY = 220;

    // Box shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(boxX + 8, boxY + 8, boxWidth, boxHeight);

    // Box background
    ctx.fillStyle = 'rgba(30, 40, 60, 0.9)';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    // Box border
    ctx.strokeStyle = '#f1c40f';
    ctx.lineWidth = 3;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Stats title
    ctx.fillStyle = '#f1c40f';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('MISSION STATS', CANVAS_WIDTH / 2, boxY + 40);

    // Divider line
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(boxX + 50, boxY + 60);
    ctx.lineTo(boxX + boxWidth - 50, boxY + 60);
    ctx.stroke();

    // Stats
    const stats = this.victoryStats || {
      finalTime: this.playTime,
      totalRespawns: this.respawnCount,
      totalKills: this.enemiesKilled,
      completionDate: new Date().toLocaleString(),
    };

    // Format time
    const minutes = Math.floor(stats.finalTime / 60);
    const seconds = Math.floor(stats.finalTime % 60);
    const timeString = `${minutes}m ${seconds.toString().padStart(2, '0')}s`;

    const statItems = [
      { label: 'Total Time', value: timeString },
      { label: 'Respawns', value: stats.totalRespawns.toString() },
      { label: 'Enemies Defeated', value: stats.totalKills.toString() },
      { label: 'Completion', value: stats.completionDate },
    ];

    ctx.font = '18px Arial';
    let currentY = boxY + 100;

    for (const item of statItems) {
      // Label
      ctx.fillStyle = '#95a5a6';
      ctx.textAlign = 'left';
      ctx.fillText(item.label + ':', boxX + 40, currentY);

      // Value
      ctx.fillStyle = '#ecf0f1';
      ctx.textAlign = 'right';
      ctx.fillText(item.value, boxX + boxWidth - 40, currentY);

      currentY += 45;
    }

    // Rank/Grade based on respawns
    let rank = 'S';
    let rankColor = '#f1c40f'; // Gold
    if (stats.totalRespawns > 20) {
      rank = 'C';
      rankColor = '#e67e22'; // Bronze
    } else if (stats.totalRespawns > 10) {
      rank = 'B';
      rankColor = '#95a5a6'; // Silver
    } else if (stats.totalRespawns > 5) {
      rank = 'A';
      rankColor = '#3498db'; // Blue
    }

    // Rank display
    ctx.textAlign = 'center';
    ctx.fillStyle = '#95a5a6';
    ctx.font = '20px Arial';
    ctx.fillText('RANK', CANVAS_WIDTH / 2, currentY + 20);

    ctx.fillStyle = rankColor;
    ctx.font = 'bold 72px Arial';
    ctx.shadowColor = rankColor;
    ctx.shadowBlur = 20;
    ctx.fillText(rank, CANVAS_WIDTH / 2, currentY + 80);
    ctx.shadowBlur = 0;

    // Continue hint
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '16px Arial';
    ctx.fillText('Press ENTER or CLICK to return to Menu', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 40);
  }

  private renderButton(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, text: string, color: string, disabled: boolean = false): void {
    // Button shadow
    if (!disabled) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(x + 4, y + 4, width, height);
    }
    
    // Button background
    ctx.fillStyle = disabled ? '#2c3e50' : color;
    ctx.fillRect(x, y, width, height);
    
    // Button border
    ctx.strokeStyle = disabled ? '#34495e' : '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // Button text
    ctx.fillStyle = disabled ? '#7f8c8d' : '#fff';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + width / 2, y + height / 2);
  }
  
  private renderPlatforms(ctx: CanvasRenderingContext2D): void {
    for (const platform of this.currentArea.platforms) {
      // Skip if not visible
      if (!this.camera.isVisible(platform.x, platform.y, platform.width, platform.height)) {
        continue;
      }
      
      ctx.fillStyle = platform.color;
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      
      // Add a subtle border
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 2;
      ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
    }
  }
  
  private renderSavePoints(ctx: CanvasRenderingContext2D): void {
    for (const savePoint of this.currentArea.savePoints) {
      if (!this.camera.isVisible(savePoint.x, savePoint.y, savePoint.width, savePoint.height)) {
        continue;
      }
      
      // Pulsing effect
      const pulse = Math.sin(performance.now() / 200) * 0.2 + 0.8;
      
      ctx.fillStyle = savePoint.isActivated ? COLORS.savePointActive : COLORS.savePoint;
      ctx.globalAlpha = pulse;
      
      // Draw terminal shape
      ctx.fillRect(savePoint.x, savePoint.y, savePoint.width, savePoint.height);
      
      // Screen glow
      ctx.fillStyle = savePoint.isActivated ? '#aaffaa' : '#aaddff';
      ctx.fillRect(savePoint.x + 5, savePoint.y + 5, savePoint.width - 10, 20);
      
      ctx.globalAlpha = 1;
      
      // Label
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('SAVE', savePoint.x + savePoint.width / 2, savePoint.y - 5);
    }
  }
  
  private renderPickups(ctx: CanvasRenderingContext2D): void {
    for (const pickup of this.currentArea.pickups) {
      if (pickup.isCollected) continue;
      if (!this.camera.isVisible(pickup.x, pickup.y, pickup.width, pickup.height)) {
        continue;
      }
      
      // Floating animation
      const float = Math.sin(performance.now() / 300) * 3;
      const centerX = pickup.x + pickup.width / 2;
      const centerY = pickup.y + pickup.height / 2 + float;
      
      // Determine color based on pickup type
      let color = '#f39c12';  // Default orange
      let label = '';
      
      if (pickup.type === 'medkit') {
        color = '#2ecc71';  // Green for health
        label = '+';
      } else if (pickup.type === 'weapon' && pickup.weaponId) {
        // Different colors for different weapons
        switch (pickup.weaponId) {
          case 'rifle':
            color = '#e74c3c';  // Red for Assault Rifle
            label = 'AR';
            break;
          case 'shotgun':
            color = '#9b59b6';  // Purple for Shotgun
            label = 'SG';
            break;
          case 'sniper':
            color = '#3498db';  // Blue for Sniper
            label = 'SR';
            break;
          case 'lmg':
            color = '#f39c12';  // Orange for LMG
            label = 'LMG';
            break;
          default:
            color = '#e67e22';
            label = 'WPN';
        }
      }
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pickup.width / 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Glow
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw label
      if (label) {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, centerX, centerY);
      }
    }
  }
  
  private renderEnemies(ctx: CanvasRenderingContext2D): void {
    // Generate sprites on first render
    if (!this.enemySpritesGenerated) {
      this.generateEnemySprites();
    }

    for (const enemy of this.currentArea.enemies) {
      if (enemy.isDead) continue;
      if (!this.camera.isVisible(enemy.x, enemy.y, enemy.width, enemy.height)) {
        continue;
      }

      // Update animation state based on enemy behavior
      this.updateEnemyAnimation(enemy);

      // Get the appropriate sprite
      let spriteKey: string;
      if (enemy.type === 'drone') {
        // Drones use simple circle rendering (no sprite)
        ctx.fillStyle = COLORS.enemyDrone;
        ctx.beginPath();
        ctx.arc(
          enemy.x + enemy.width / 2,
          enemy.y + enemy.height / 2,
          enemy.width / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      } else if (enemy.type === 'boss') {
        // BOSS - Special large rendering with effects
        this.renderBoss(ctx, enemy);
      } else {
        // Human enemies use sprites
        const typeKey = enemy.type as 'grunt' | 'soldier' | 'heavy';

        if (enemy.animationState === 'shoot' && enemy.isShooting) {
          // Shooting animation - cycle through 4 frames
          const shootFrame = Math.floor(enemy.animationTimer * 8) % 4;
          spriteKey = `${typeKey}_shoot${shootFrame}`;
        } else if (enemy.animationState === 'walk') {
          // Walking animation - alternate between walk frames
          const walkFrame = Math.floor(enemy.animationTimer * 6) % 2;
          spriteKey = `${typeKey}_walk${walkFrame + 1}`;
        } else {
          // Idle
          spriteKey = `${typeKey}_idle`;
        }

        const sprite = this.enemySprites.get(spriteKey);
        const spriteSize = typeKey === 'heavy' ? 48 : 36;

        ctx.save();

        if (!enemy.isFacingRight) {
          // Flip sprite when facing left
          ctx.translate(enemy.x + enemy.width, enemy.y);
          ctx.scale(-1, 1);
          if (sprite) {
            ctx.drawImage(sprite, 0, 0, enemy.width, enemy.height);
          }
        } else {
          if (sprite) {
            ctx.drawImage(sprite, enemy.x, enemy.y, enemy.width, enemy.height);
          }
        }

        ctx.restore();

        // Fallback if sprite not found
        if (!sprite) {
          ctx.fillStyle = COLORS.enemyGrunt;
          ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }
      }

      // Health bar
      const hpPercent = enemy.hp / enemy.maxHp;
      ctx.fillStyle = '#333';
      ctx.fillRect(enemy.x, enemy.y - 10, enemy.width, 6);
      ctx.fillStyle = hpPercent > 0.5 ? '#2ecc71' : '#e74c3c';
      ctx.fillRect(enemy.x, enemy.y - 10, enemy.width * hpPercent, 6);
    }
  }

  private renderBoss(ctx: CanvasRenderingContext2D, enemy: Enemy): void {
    const centerX = enemy.x + enemy.width / 2;
    const centerY = enemy.y + enemy.height / 2;

    // Boss aura/pulse effect
    const pulse = Math.sin(performance.now() / 300) * 0.2 + 0.8;
    const auraGradient = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 80);
    auraGradient.addColorStop(0, `rgba(192, 57, 43, ${0.4 * pulse})`);
    auraGradient.addColorStop(0.5, `rgba(192, 57, 43, ${0.2 * pulse})`);
    auraGradient.addColorStop(1, 'rgba(192, 57, 43, 0)');
    ctx.fillStyle = auraGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
    ctx.fill();

    // Boss body - larger and more menacing
    ctx.fillStyle = '#2c0a0a';
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    // Armor plates
    ctx.fillStyle = '#5c1919';
    ctx.fillRect(enemy.x + 10, enemy.y + 10, enemy.width - 20, enemy.height - 20);

    // Glowing core
    const corePulse = Math.sin(performance.now() / 200) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(255, 50, 50, ${corePulse})`;
    ctx.beginPath();
    ctx.arc(centerX, centerY + 10, 15, 0, Math.PI * 2);
    ctx.fill();

    // Boss helmet/head
    ctx.fillStyle = '#1a0505';
    ctx.fillRect(enemy.x + 15, enemy.y - 15, enemy.width - 30, 25);

    // Glowing eyes
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(enemy.x + 25, enemy.y - 5, 4, 0, Math.PI * 2);
    ctx.arc(enemy.x + enemy.width - 25, enemy.y - 5, 4, 0, Math.PI * 2);
    ctx.fill();

    // Shoulder cannons
    ctx.fillStyle = '#3d0e0e';
    ctx.fillRect(enemy.x - 10, enemy.y + 15, 15, 25);
    ctx.fillRect(enemy.x + enemy.width - 5, enemy.y + 15, 15, 25);

    // BOSS label
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('BOSS', centerX, enemy.y - 25);

    // Enhanced health bar - longer and with segments
    const hpPercent = enemy.hp / enemy.maxHp;
    const barWidth = enemy.width + 20;
    const barX = enemy.x - 10;

    // Bar background
    ctx.fillStyle = '#333';
    ctx.fillRect(barX, enemy.y - 15, barWidth, 10);

    // Health segments (10 segments)
    ctx.fillStyle = hpPercent > 0.5 ? '#e74c3c' : '#ff0000';
    ctx.fillRect(barX, enemy.y - 15, barWidth * hpPercent, 10);

    // Segment dividers
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    for (let i = 1; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(barX + (barWidth / 10) * i, enemy.y - 15);
      ctx.lineTo(barX + (barWidth / 10) * i, enemy.y - 5);
      ctx.stroke();
    }

    // HP text
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.ceil(enemy.hp)}/${enemy.maxHp}`, centerX, enemy.y - 8);
  }

  private updateEnemyAnimation(enemy: Enemy): void {
    // Increment animation timer
    enemy.animationTimer += 0.016; // ~60fps

    // Determine animation state based on velocity and shooting
    if (enemy.isShooting) {
      enemy.animationState = 'shoot';
      // Reset shooting flag after animation completes (4 frames at 8fps = 0.5s)
      if (enemy.animationTimer > 0.5) {
        enemy.isShooting = false;
        enemy.animationTimer = 0;
      }
    } else if (Math.abs(enemy.vx) > 1) {
      enemy.animationState = 'walk';
    } else {
      enemy.animationState = 'idle';
    }
  }
  
  private renderBullets(ctx: CanvasRenderingContext2D): void {
    for (const bullet of this.bullets) {
      // Only render if visible
      if (!this.camera.isVisible(bullet.x - 10, bullet.y - 10, 20, 20)) {
        continue;
      }
      
      bullet.render(ctx);
    }
  }
  
  private renderEnemyBullets(ctx: CanvasRenderingContext2D): void {
    for (const bullet of this.enemyBullets) {
      // Only render if visible
      if (!this.camera.isVisible(bullet.x - 10, bullet.y - 10, 20, 20)) {
        continue;
      }
      
      // Enemy bullets are red
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Red glow
      ctx.fillStyle = 'rgba(231, 76, 60, 0.3)';
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.radius * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ============================================================
  // ENEMY SPRITE GENERATION - Procedural Pixel Art Soldiers
  // ============================================================
  private enemySprites: Map<string, HTMLCanvasElement> = new Map();
  private enemySpritesGenerated: boolean = false;

  private generateEnemySprites(): void {
    if (this.enemySpritesGenerated) return;

    // Generate sprites for each enemy type
    const types: Array<'grunt' | 'soldier' | 'heavy'> = ['grunt', 'soldier', 'heavy'];

    for (const type of types) {
      // Idle sprite
      this.enemySprites.set(`${type}_idle`, this.createEnemySprite(type, 'idle'));
      // Walk sprite 1
      this.enemySprites.set(`${type}_walk1`, this.createEnemySprite(type, 'walk1'));
      // Walk sprite 2
      this.enemySprites.set(`${type}_walk2`, this.createEnemySprite(type, 'walk2'));
      // Shoot frames (4 frames like in the reference image)
      for (let i = 0; i < 4; i++) {
        this.enemySprites.set(`${type}_shoot${i}`, this.createEnemySprite(type, 'shoot', i));
      }
    }

    this.enemySpritesGenerated = true;
  }

  private createEnemySprite(
    type: 'grunt' | 'soldier' | 'heavy',
    pose: 'idle' | 'walk1' | 'walk2' | 'shoot',
    shootFrame: number = 0
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const size = type === 'heavy' ? 48 : 36;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Color scheme based on type
    const colors = {
      grunt: { body: '#2c3e50', vest: '#34495e', helmet: '#1a252f', skin: '#d4a574' },
      soldier: { body: '#1e3a5f', vest: '#2c4a6e', helmet: '#152a3f', skin: '#c4956a' },
      heavy: { body: '#2d132c', vest: '#4a2349', helmet: '#1a0f19', skin: '#b0855a' },
    }[type];

    // Scale factor for pixel art look
    const pixelSize = size <= 36 ? 2 : 3;

    // Helper to draw a pixel rectangle
    const drawPixel = (x: number, y: number, w: number, h: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * pixelSize, y * pixelSize, w * pixelSize, h * pixelSize);
    };

    // Animation offsets for WALKING (forward/back motion, not up/down)
    let bodyY = 8;
    let leftLegX = 0;
    let rightLegX = 0;
    let legBend = 0;
    let armOffset = 0;
    let gunFlash = false;

    if (pose === 'walk1') {
      // Left leg forward, right leg back
      leftLegX = 2;
      rightLegX = -2;
      bodyY = 7; // Slight bob
      legBend = 1;
    } else if (pose === 'walk2') {
      // Left leg back, right leg forward
      leftLegX = -2;
      rightLegX = 2;
      bodyY = 7; // Slight bob
      legBend = 1;
    } else if (pose === 'shoot') {
      armOffset = -2;
      gunFlash = shootFrame >= 2;
    }

    // LEGS (dark tactical pants) - proper marching animation
    const legColor = '#1a1a2e';
    const bootColor = '#0f0f1a';

    if (pose === 'walk1' || pose === 'walk2') {
      // Walking: legs extend forward/back with slight knee bend
      // Left leg
      drawPixel(6 + leftLegX, 22, 4, 4, legColor); // Thigh
      drawPixel(6 + leftLegX * 0.5, 26, 4, 4, legColor); // Knee/shin
      drawPixel(6, 30, 4, 2, bootColor); // Boot (stays planted or lifts slightly)

      // Right leg
      drawPixel(14 + rightLegX, 22, 4, 4, legColor); // Thigh
      drawPixel(14 + rightLegX * 0.5, 26, 4, 4, legColor); // Knee/shin
      drawPixel(14, 30, 4, 2, bootColor); // Boot
    } else {
      // Idle/Shoot: standing position
      // Left leg
      drawPixel(6, 22, 4, 10, legColor);
      drawPixel(6, 30, 4, 2, bootColor);
      // Right leg
      drawPixel(14, 22, 4, 10, legColor);
      drawPixel(14, 30, 4, 2, bootColor);
    }

    // BODY (tactical vest)
    drawPixel(4, bodyY + 2, 16, 14, colors.body);
    // Vest details
    drawPixel(5, bodyY + 4, 14, 10, colors.vest);
    // Vest pouches
    drawPixel(6, bodyY + 6, 3, 3, '#1a1a2e');
    drawPixel(14, bodyY + 6, 3, 3, '#1a1a2e');

    // HEAD
    const headY = bodyY - 6;
    // Helmet
    drawPixel(5, headY, 14, 8, colors.helmet);
    // Helmet rim
    drawPixel(4, headY + 2, 16, 2, '#0f0f1a');
    // Face
    drawPixel(8, headY + 3, 8, 4, colors.skin);
    // Goggles/Visor
    drawPixel(7, headY + 3, 10, 3, '#0f3460');
    drawPixel(8, headY + 4, 8, 1, '#1a5fb4');
    // Helmet detail
    drawPixel(11, headY, 2, 2, '#4a4a5a');

    // ARMS and GUN
    const armY = bodyY + 5;
    // Left arm (holding gun foregrip)
    drawPixel(2, armY, 4, 8, colors.body);
    drawPixel(1, armY + 2, 3, 4, colors.skin);

    // Gun (tan/beige rifle like in the image)
    const gunColor = '#c4a574';
    const gunDark = '#8b7355';
    const gunY = armY + 1;

    if (pose === 'shoot') {
      // Gun recoils up slightly
      const recoil = shootFrame === 2 ? -1 : shootFrame === 3 ? 0 : 0;
      // Main rifle body
      drawPixel(0, gunY + recoil, 20, 3, gunColor);
      // Handguard
      drawPixel(2, gunY + recoil, 8, 3, gunDark);
      // Barrel
      drawPixel(18, gunY + 1 + recoil, 6, 1, '#5a4a3a');
      // Magazine
      drawPixel(6, gunY + 3 + recoil, 3, 5, gunDark);
      // Stock
      drawPixel(-4, gunY + recoil, 4, 3, gunDark);

      // Muzzle flash (when shooting)
      if (gunFlash) {
        const flashColors = ['#ffff00', '#ff8800', '#ff4400'];
        const flashColor = flashColors[shootFrame - 2];
        // Flash bursts
        drawPixel(24, gunY + recoil, 4, 3, flashColor);
        drawPixel(26, gunY - 1 + recoil, 3, 2, '#ffffaa');
        drawPixel(26, gunY + 3 + recoil, 3, 2, '#ffffaa');
        // Bullet tracer
        drawPixel(28, gunY + 1 + recoil, 8, 1, '#ffff00');
      }
    } else {
      // Idle/walk gun position
      drawPixel(0, gunY, 18, 3, gunColor);
      drawPixel(2, gunY, 8, 3, gunDark);
      drawPixel(16, gunY + 1, 4, 1, '#5a4a3a');
      drawPixel(6, gunY + 3, 3, 4, gunDark);
      drawPixel(-2, gunY, 3, 3, gunDark);
    }

    // Right arm (holding gun stock)
    drawPixel(16 + armOffset, armY, 4, 6, colors.body);
    drawPixel(17 + armOffset, armY + 1, 2, 3, colors.skin);

    return canvas;
  }

  // ============================================================
  // PLAYER SPRITES
  // ============================================================
  private playerSprites: Map<string, HTMLImageElement> = new Map();
  private playerSpritesLoaded: Set<string> = new Set();
  private walkAnimationTimer: number = 0;

  private loadPlayerSprites(): void {
    const spriteNames = ['idle', 'walk', 'jump', 'shoot'];
    
    for (const name of spriteNames) {
      if (this.playerSprites.has(name)) continue;
      
      const img = new Image();
      img.src = `/images/player-${name}.svg`;
      img.onload = () => {
        this.playerSpritesLoaded.add(name);
      };
      this.playerSprites.set(name, img);
    }
  }

  private getCurrentSprite(): HTMLImageElement | null {
    const state = this.player.getAnimationState();
    
    // Walk animation alternates between idle and walk for simple animation
    if (state === 'walk') {
      this.walkAnimationTimer += 0.1;
      const walkFrame = Math.floor(this.walkAnimationTimer) % 2;
      const spriteName = walkFrame === 0 ? 'walk' : 'idle';
      return this.playerSprites.get(spriteName) || null;
    }
    
    return this.playerSprites.get(state) || null;
  }

  private renderPlayer(ctx: CanvasRenderingContext2D): void {
    // Load sprites on first render
    if (this.playerSprites.size === 0) {
      this.loadPlayerSprites();
    }

    const sprite = this.getCurrentSprite();
    const state = this.player.getAnimationState();
    const spriteLoaded = this.playerSpritesLoaded.has(state === 'walk' ? 'walk' : state);

    ctx.save();
    
    // Shooting sprite is wider (48px), needs special positioning
    if (state === 'shoot') {
      const spriteWidth = 48;
      const spriteHeight = 48;
      const offsetX = (spriteWidth - this.player.width) / 2; // Center the wider sprite
      
      if (!this.player.isFacingRight) {
        // When facing left, flip and adjust position
        ctx.translate(this.player.x + this.player.width + offsetX, this.player.y);
        ctx.scale(-1, 1);
        if (sprite && spriteLoaded) {
          ctx.drawImage(sprite, 0, 0, spriteWidth, spriteHeight);
        }
      } else {
        if (sprite && spriteLoaded) {
          ctx.drawImage(sprite, this.player.x - offsetX, this.player.y, spriteWidth, spriteHeight);
        }
      }
    } else {
      // Normal sprites (32x48)
      if (!this.player.isFacingRight) {
        ctx.translate(this.player.x + this.player.width, this.player.y);
        ctx.scale(-1, 1);
        if (sprite && spriteLoaded) {
          ctx.drawImage(sprite, 0, 0, this.player.width, this.player.height);
        }
      } else {
        if (sprite && spriteLoaded) {
          ctx.drawImage(sprite, this.player.x, this.player.y, this.player.width, this.player.height);
        }
      }
    }
    
    ctx.restore();

    // Fallback to green box if sprite not loaded yet
    if (!sprite || !spriteLoaded) {
      ctx.fillStyle = COLORS.player;
      ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
      
      // Draw direction indicator
      ctx.fillStyle = '#27ae60';
      if (this.player.isFacingRight) {
        ctx.fillRect(this.player.x + this.player.width - 5, this.player.y + 10, 5, 10);
      } else {
        ctx.fillRect(this.player.x, this.player.y + 10, 5, 10);
      }
    }
  }
  
  private renderAreaConnections(ctx: CanvasRenderingContext2D): void {
    for (const connection of this.currentArea.connections) {
      // Draw exit marker
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(connection.fromX, connection.fromY, 30, 0, Math.PI * 2);
      ctx.fill();
      
      // Arrow
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('→ EXIT', connection.fromX, connection.fromY - 35);
    }
  }
  
  private renderUI(ctx: CanvasRenderingContext2D): void {
    // Health bar
    const hpPercent = this.player.getHpPercent();
    ctx.fillStyle = COLORS.uiHealthBg;
    ctx.fillRect(20, 20, 200, 24);
    ctx.fillStyle = hpPercent > 0.3 ? COLORS.uiHealth : '#c0392b';
    ctx.fillRect(20, 20, 200 * hpPercent, 24);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, 200, 24);
    
    // Health text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${Math.ceil(this.player.hp)}/${this.player.maxHp}`,
      120,
      37
    );
    
    // XP bar
    const xpPercent = this.player.getXpPercent();
    ctx.fillStyle = COLORS.uiXpBg;
    ctx.fillRect(20, 50, 200, 16);
    ctx.fillStyle = COLORS.uiXp;
    ctx.fillRect(20, 50, 200 * xpPercent, 16);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 50, 200, 16);
    
    // Level text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`LEVEL ${this.player.level}`, 20, 85);
    ctx.fillText(`XP: ${this.player.xp}/${this.player.xpToNextLevel}`, 20, 100);
    
    // Weapon info
    const weapon = this.player.getCurrentWeapon();
    ctx.fillStyle = weapon.isUnlocked ? '#fff' : '#666';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(weapon.name, 20, 125);
    
    // Ammo counter (UNLIMITED)
    ctx.fillStyle = '#2ecc71';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('∞', 20, 145);
    
    // Current area
    ctx.textAlign = 'right';
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(this.currentArea.name.toUpperCase(), CANVAS_WIDTH - 20, 35);
    
    // Controls hint
    ctx.textAlign = 'left';
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('WASD = Move | SPACE = Jump | M / LMB = Shoot | E = Save | 1-5 = Weapons', 20, CANVAS_HEIGHT - 20);
  }
  
  // ----------------------------------------------------------
  // Input Handlers (called from React component)
  // ----------------------------------------------------------
  setKeyDown(key: string): void {
    // Handle victory screen Enter key
    if (key === 'Enter' && this.screen === 'victory') {
      this.returnToMenu();
      return;
    }

    // F-keys for level skipping (dev mode)
    const levelKeys: Record<string, string> = {
      'F1': 'bootcamp',
      'F2': 'city',
      'F3': 'bunker',
      'F4': 'mountain',
      'F5': 'hq',
      'F6': 'skyfortress',
      'F7': 'volcanolab',
      'F8': 'voidcore',
    };

    if (levelKeys[key] && this.screen === 'playing') {
      this.warpToArea(levelKeys[key]);
      console.log(`[DEV] Warped to ${levelKeys[key]}`);
      return;
    }

    switch (key.toLowerCase()) {
      case 'a':
      case 'arrowleft':
        this.input.left = true;
        break;
      case 'd':
      case 'arrowright':
        this.input.right = true;
        break;
      case 'w':
      case 'arrowup':
        this.input.up = true;
        this.input.jump = true;
        break;
      case 's':
      case 'arrowdown':
        this.input.down = true;
        break;
      case ' ':
        this.input.jump = true;
        break;
      case 'e':
        this.input.interact = true;
        break;
      case 'r':
        this.input.reload = true;
        break;
      case 'm':
        this.input.shoot = true;
        break;
      case '1':
        this.input.weaponSlots[0] = true;
        break;
      case '2':
        this.input.weaponSlots[1] = true;
        break;
      case '3':
        this.input.weaponSlots[2] = true;
        break;
      case '4':
        this.input.weaponSlots[3] = true;
        break;
      case '5':
        this.input.weaponSlots[4] = true;
        break;
    }
  }
  
  setKeyUp(key: string): void {
    switch (key.toLowerCase()) {
      case 'a':
      case 'arrowleft':
        this.input.left = false;
        break;
      case 'd':
      case 'arrowright':
        this.input.right = false;
        break;
      case 'w':
      case 'arrowup':
        this.input.up = false;
        this.input.jump = false;
        break;
      case 's':
      case 'arrowdown':
        this.input.down = false;
        break;
      case ' ':
        this.input.jump = false;
        break;
      case 'e':
        this.input.interact = false;
        break;
      case 'r':
        this.input.reload = false;
        break;
      case 'm':
        this.input.shoot = false;
        break;
      case '1':
        this.input.weaponSlots[0] = false;
        break;
      case '2':
        this.input.weaponSlots[1] = false;
        break;
      case '3':
        this.input.weaponSlots[2] = false;
        break;
      case '4':
        this.input.weaponSlots[3] = false;
        break;
      case '5':
        this.input.weaponSlots[4] = false;
        break;
    }
  }
  
  setMousePosition(x: number, y: number): void {
    this.input.mouseX = x;
    this.input.mouseY = y;
  }
  
  setMouseDown(down: boolean): void {
    this.input.shoot = down;
  }
  
  // ----------------------------------------------------------
  // Developer Mode - Quick Area Warp
  // ----------------------------------------------------------
  warpToArea(areaId: string): boolean {
    const area = getAreaById(areaId);
    if (!area) {
      console.warn(`Area "${areaId}" not found`);
      return false;
    }
    
    // Clear bullets
    this.bullets = [];
    this.enemyBullets = [];
    
    // Update current area
    this.currentArea = area;
    this.player.currentAreaId = areaId;
    
    // Move player to spawn
    this.player.x = area.playerSpawn.x;
    this.player.y = area.playerSpawn.y;
    this.player.vx = 0;
    this.player.vy = 0;
    
    // Update camera
    this.camera.setWorldBounds(area.width, area.height);
    this.camera.centerOn(this.player.x, this.player.y, this.player.width, this.player.height);
    
    // Track discovered
    if (!this.areasDiscovered.includes(areaId)) {
      this.areasDiscovered.push(areaId);
      this.player.unlockedAreas.push(areaId);
    }
    
    console.log(`🎮 Warped to: ${area.name}`);
    return true;
  }
  
  // Quick warp shortcuts for development
  warpToBootCamp(): void { this.warpToArea('bootcamp'); }
  warpToCity(): void { this.warpToArea('city'); }
  warpToBunker(): void { this.warpToArea('bunker'); }
  warpToMountain(): void { this.warpToArea('mountain'); }
  warpToHQ(): void { this.warpToArea('hq'); }
  warpToSkyFortress(): void { this.warpToArea('skyfortress'); }
  warpToVolcanoLab(): void { this.warpToArea('volcanolab'); }
  warpToVoidCore(): void { this.warpToArea('voidcore'); }
}
