import { Player as IPlayer, InputState, Vector2, Weapon } from '../types';
import { 
  PLAYER_WIDTH, 
  PLAYER_HEIGHT, 
  PLAYER_START_HP, 
  PLAYER_START_SPEED,
  PLAYER_JUMP_FORCE,
  GRAVITY,
  FRICTION,
  AIR_RESISTANCE,
  STARTING_STATS,
  XP_BASE,
  XP_MULTIPLIER,
  WEAPONS,
} from '../constants';

export class Player implements IPlayer {
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
  isShooting: boolean;
  shootingTimer: number;
  
  // Health & Combat
  hp: number;
  maxHp: number;
  
  // Progression
  level: number;
  xp: number;
  xpToNextLevel: number;
  statPoints: number;
  stats: {
    maxHealth: number;
    damage: number;
    speed: number;
    fireRate: number;
  };
  
  // World
  currentAreaId: string;
  unlockedAreas: string[];
  
  // Weapons
  weapons: Weapon[];
  currentWeaponIndex: number;
  
  // Private movement values
  private moveSpeed: number;
  private jumpForce: number;
  
  constructor(spawnX: number = 100, spawnY: number = 300) {
    // Position
    this.x = spawnX;
    this.y = spawnY;
    this.vx = 0;
    this.vy = 0;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    
    // State
    this.isGrounded = false;
    this.isCrouching = false;
    this.isFacingRight = true;
    this.isShooting = false;
    this.shootingTimer = 0;
    
    // Health
    this.hp = PLAYER_START_HP;
    this.maxHp = PLAYER_START_HP;
    
    // Progression
    this.level = 1;
    this.xp = 0;
    this.xpToNextLevel = XP_BASE;
    this.statPoints = 0;
    this.stats = { ...STARTING_STATS };
    
    // World
    this.currentAreaId = 'bootcamp';
    this.unlockedAreas = ['bootcamp'];
    
    // Weapons - deep copy so we can modify
    this.weapons = WEAPONS.map(w => ({ ...w }));
    this.currentWeaponIndex = 0;
    
    // Movement
    this.moveSpeed = PLAYER_START_SPEED;
    this.jumpForce = PLAYER_JUMP_FORCE;
  }
  
  // ----------------------------------------------------------
  // Update - called every frame
  // ----------------------------------------------------------
  update(input: InputState, dt: number): void {
    this.handleInput(input, dt);
    this.applyPhysics(dt);
    this.updateFacing(input);
    this.updateAnimationState(input, dt);
  }

  // ----------------------------------------------------------
  // Animation State
  // ----------------------------------------------------------
  private updateAnimationState(input: InputState, dt: number): void {
    // Update shooting timer
    if (this.shootingTimer > 0) {
      this.shootingTimer -= dt;
      if (this.shootingTimer <= 0) {
        this.isShooting = false;
      }
    }

    // Set shooting state when firing
    if (input.shoot) {
      this.isShooting = true;
      this.shootingTimer = 0.15; // Show shooting sprite for 150ms
    }
  }

  getAnimationState(): 'idle' | 'walk' | 'jump' | 'shoot' {
    if (this.isShooting) return 'shoot';
    if (!this.isGrounded) return 'jump';
    if (Math.abs(this.vx) > 10) return 'walk';
    return 'idle';
  }
  
  // ----------------------------------------------------------
  // Input Handling
  // ----------------------------------------------------------
  private handleInput(input: InputState, dt: number): void {
    // Horizontal movement
    let targetVx = 0;
    
    if (input.left) {
      targetVx = -this.moveSpeed * this.stats.speed;
    } else if (input.right) {
      targetVx = this.moveSpeed * this.stats.speed;
    }
    
    // Crouching reduces speed
    if (input.down) {
      this.isCrouching = true;
      targetVx *= 0.5;
    } else {
      this.isCrouching = false;
    }
    
    // Smooth acceleration
    if (targetVx !== 0) {
      this.vx += (targetVx - this.vx) * 0.2;
    }
    
    // Jumping
    if (input.jump && this.isGrounded) {
      this.vy = -this.jumpForce;
      this.isGrounded = false;
    }
    
    // Weapon switching
    for (let i = 0; i < 5; i++) {
      if (input.weaponSlots[i] && this.weapons[i]?.isUnlocked) {
        this.currentWeaponIndex = i;
      }
    }
  }
  
  // ----------------------------------------------------------
  // Physics
  // ----------------------------------------------------------
  private applyPhysics(dt: number): void {
    // Apply gravity
    this.vy += GRAVITY * dt;
    
    // Apply friction/air resistance
    if (this.isGrounded) {
      this.vx *= FRICTION;
    } else {
      this.vx *= AIR_RESISTANCE;
    }
    
    // Stop if very slow
    if (Math.abs(this.vx) < 1) {
      this.vx = 0;
    }
    
    // Update position
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }
  
  // ----------------------------------------------------------
  // Update facing direction based on mouse or movement
  // ----------------------------------------------------------
  private updateFacing(input: InputState): void {
    // Face toward mouse when aiming
    const centerX = this.x + this.width / 2;
    if (input.mouseWorldX > centerX) {
      this.isFacingRight = true;
    } else if (input.mouseWorldX < centerX) {
      this.isFacingRight = false;
    }
  }
  
  // ----------------------------------------------------------
  // Collision Resolution
  // ----------------------------------------------------------
  resolvePlatformCollision(platformX: number, platformY: number, platformWidth: number, platformHeight: number): void {
    const playerLeft = this.x;
    const playerRight = this.x + this.width;
    const playerTop = this.y;
    const playerBottom = this.y + this.height;
    
    const platLeft = platformX;
    const platRight = platformX + platformWidth;
    const platTop = platformY;
    const platBottom = platformY + platformHeight;
    
    // Check collision
    if (playerRight > platLeft && playerLeft < platRight && 
        playerBottom > platTop && playerTop < platBottom) {
      
      // Calculate overlap on each side
      const overlapLeft = playerRight - platLeft;
      const overlapRight = platRight - playerLeft;
      const overlapTop = playerBottom - platTop;
      const overlapBottom = platBottom - playerTop;
      
      // Find smallest overlap
      const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
      
      if (minOverlap === overlapTop && this.vy >= 0) {
        // Landing on top
        this.y = platTop - this.height;
        this.vy = 0;
        this.isGrounded = true;
      } else if (minOverlap === overlapBottom && this.vy < 0) {
        // Hitting head on bottom
        this.y = platBottom;
        this.vy = 0;
      } else if (minOverlap === overlapLeft && this.vx > 0) {
        // Hitting left side
        this.x = platLeft - this.width;
        this.vx = 0;
      } else if (minOverlap === overlapRight && this.vx < 0) {
        // Hitting right side
        this.x = platRight;
        this.vx = 0;
      }
    }
  }
  
  // Check if player is above a platform (for ground detection)
  checkGrounded(platforms: Array<{x: number, y: number, width: number, height: number}>): void {
    let onGround = false;
    
    // Check if standing on any platform
    for (const plat of platforms) {
      const playerCenterX = this.x + this.width / 2;
      const playerBottom = this.y + this.height;
      
      // Player feet are near platform top
      const feetNearPlatform = Math.abs(playerBottom - plat.y) < 5;
      
      // Player is horizontally within platform
      const horizontallyAligned = playerCenterX >= plat.x && playerCenterX <= plat.x + plat.width;
      
      if (feetNearPlatform && horizontallyAligned && this.vy >= 0) {
        onGround = true;
        break;
      }
    }
    
    this.isGrounded = onGround;
  }
  
  // ----------------------------------------------------------
  // Combat
  // ----------------------------------------------------------
  takeDamage(amount: number): void {
    this.hp = Math.max(0, this.hp - amount);
  }
  
  heal(amount: number): void {
    this.hp = Math.min(this.maxHp, this.hp + amount);
  }
  
  isDead(): boolean {
    return this.hp <= 0;
  }
  
  // ----------------------------------------------------------
  // XP & Leveling
  // ----------------------------------------------------------
  gainXp(amount: number): boolean {
    this.xp += amount;
    
    let leveledUp = false;
    
    while (this.xp >= this.xpToNextLevel) {
      this.xp -= this.xpToNextLevel;
      this.levelUp();
      leveledUp = true;
    }
    
    return leveledUp;
  }
  
  private levelUp(): void {
    this.level++;
    this.statPoints += 2;  // 2 points per level
    this.xpToNextLevel = Math.floor(this.xpToNextLevel * XP_MULTIPLIER);
    
    // Slight max hp increase per level
    this.maxHp += 10;
    this.hp += 10;  // Heal on level up
  }
  
  upgradeStat(stat: 'maxHealth' | 'damage' | 'speed' | 'fireRate'): boolean {
    if (this.statPoints <= 0) return false;
    
    this.statPoints--;
    
    switch (stat) {
      case 'maxHealth':
        this.stats.maxHealth += 0.1;  // +10%
        this.maxHp = Math.floor(PLAYER_START_HP * this.stats.maxHealth);
        break;
      case 'damage':
        this.stats.damage += 0.1;  // +10%
        break;
      case 'speed':
        this.stats.speed += 0.1;  // +10%
        break;
      case 'fireRate':
        this.stats.fireRate += 0.1;  // +10%
        break;
    }
    
    return true;
  }
  
  // ----------------------------------------------------------
  // Weapons
  // ----------------------------------------------------------
  getCurrentWeapon(): Weapon {
    return this.weapons[this.currentWeaponIndex];
  }
  
  unlockWeapon(weaponId: string): boolean {
    const weapon = this.weapons.find(w => w.id === weaponId);
    if (weapon && !weapon.isUnlocked) {
      weapon.isUnlocked = true;
      return true;
    }
    return false;
  }
  
  // ----------------------------------------------------------
  // Respawn at save point
  // ----------------------------------------------------------
  respawn(saveX: number, saveY: number): void {
    this.x = saveX;
    this.y = saveY;
    this.vx = 0;
    this.vy = 0;
    this.hp = this.maxHp;
  }
  
  // ----------------------------------------------------------
  // Getters for UI
  // ----------------------------------------------------------
  getHpPercent(): number {
    return this.hp / this.maxHp;
  }
  
  getXpPercent(): number {
    return this.xp / this.xpToNextLevel;
  }
  
  getCenter(): Vector2 {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }
}
