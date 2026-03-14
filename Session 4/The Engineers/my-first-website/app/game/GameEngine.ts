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
    this.screen = 'playing';
    this.lastSavePoint = {
      x: this.currentArea.playerSpawn.x,
      y: this.currentArea.playerSpawn.y,
      areaId: this.currentArea.id,
    };
    this.enemiesKilled = 0;
    this.areasDiscovered = [this.currentArea.id];
    this.playTime = 0;
    
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
        enemy.x += (dx > 0 ? chaseSpeed : -chaseSpeed) * dt;
      }
      
      // Shooting (only soldiers and heavies for now)
      if ((enemy.type === 'soldier' || enemy.type === 'heavy') && distance <= enemy.attackRange) {
        // Fire rate: 1 shot per second for soldiers, 0.5 for heavies
        const fireRate = enemy.type === 'heavy' ? 2000 : 1000;
        
        if (now - enemy.lastAttackTime > fireRate) {
          this.enemyShoot(enemy, playerCenterX, playerCenterY);
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
    
    // Clear canvas
    ctx.fillStyle = this.currentArea.backgroundColor;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Apply camera transform
    ctx.save();
    ctx.translate(-this.camera.x, -this.camera.y);
    
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
    for (const enemy of this.currentArea.enemies) {
      if (enemy.isDead) continue;
      if (!this.camera.isVisible(enemy.x, enemy.y, enemy.width, enemy.height)) {
        continue;
      }
      
      // Draw enemy based on type
      let color = COLORS.enemyGrunt;
      switch (enemy.type) {
        case 'soldier': color = COLORS.enemySoldier; break;
        case 'drone': color = COLORS.enemyDrone; break;
        case 'heavy': color = COLORS.enemyHeavy; break;
      }
      
      ctx.fillStyle = color;
      
      // Different shapes for different enemies
      if (enemy.type === 'drone') {
        // Drone is circular
        ctx.beginPath();
        ctx.arc(
          enemy.x + enemy.width / 2,
          enemy.y + enemy.height / 2,
          enemy.width / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      } else {
        // Others are rectangular
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      }
      
      // Health bar
      const hpPercent = enemy.hp / enemy.maxHp;
      ctx.fillStyle = '#333';
      ctx.fillRect(enemy.x, enemy.y - 10, enemy.width, 6);
      ctx.fillStyle = hpPercent > 0.5 ? '#2ecc71' : '#e74c3c';
      ctx.fillRect(enemy.x, enemy.y - 10, enemy.width * hpPercent, 6);
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
  
  private renderPlayer(ctx: CanvasRenderingContext2D): void {
    // Draw player body
    ctx.fillStyle = COLORS.player;
    ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    
    // Draw direction indicator
    ctx.fillStyle = '#27ae60';
    if (this.player.isFacingRight) {
      ctx.fillRect(this.player.x + this.player.width - 5, this.player.y + 10, 5, 10);
    } else {
      ctx.fillRect(this.player.x, this.player.y + 10, 5, 10);
    }
    
    // Draw gun
    const weapon = this.player.getCurrentWeapon();
    ctx.fillStyle = '#34495e';
    const gunX = this.player.isFacingRight 
      ? this.player.x + this.player.width 
      : this.player.x - 20;
    ctx.fillRect(gunX, this.player.y + 20, 20, 8);
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
}
