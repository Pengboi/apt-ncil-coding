import { Bullet as IBullet } from '../types';

export class Bullet implements IBullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  damage: number;
  isPlayerBullet: boolean;
  color: string;
  lifeTime: number;
  
  // Max lifetime before disappearing
  private readonly MAX_LIFETIME = 3; // seconds
  
  constructor(
    x: number,
    y: number,
    targetX: number,
    targetY: number,
    speed: number,
    damage: number,
    isPlayerBullet: boolean = true,
    color: string = '#f1c40f'
  ) {
    this.x = x;
    this.y = y;
    this.radius = 4;
    this.damage = damage;
    this.isPlayerBullet = isPlayerBullet;
    this.color = color;
    this.lifeTime = this.MAX_LIFETIME;
    
    // Calculate velocity toward target
    const dx = targetX - x;
    const dy = targetY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      this.vx = (dx / distance) * speed;
      this.vy = (dy / distance) * speed;
    } else {
      this.vx = speed;
      this.vy = 0;
    }
  }
  
  // ----------------------------------------------------------
  // Update bullet position
  // ----------------------------------------------------------
  update(dt: number): void {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.lifeTime -= dt;
  }
  
  // ----------------------------------------------------------
  // Check if bullet should be removed
  // ----------------------------------------------------------
  isExpired(): boolean {
    return this.lifeTime <= 0;
  }
  
  // ----------------------------------------------------------
  // Get bounding box for collision
  // ----------------------------------------------------------
  getBounds(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    };
  }
  
  // ----------------------------------------------------------
  // Check collision with a rectangle
  // ----------------------------------------------------------
  collidesWithRect(rectX: number, rectY: number, rectW: number, rectH: number): boolean {
    // Find closest point on rectangle to circle center
    const closestX = Math.max(rectX, Math.min(this.x, rectX + rectW));
    const closestY = Math.max(rectY, Math.min(this.y, rectY + rectH));
    
    // Calculate distance from circle center to closest point
    const dx = this.x - closestX;
    const dy = this.y - closestY;
    const distanceSquared = dx * dx + dy * dy;
    
    return distanceSquared < (this.radius * this.radius);
  }
  
  // ----------------------------------------------------------
  // Render the bullet
  // ----------------------------------------------------------
  render(ctx: CanvasRenderingContext2D): void {
    // Bullet trail effect
    const trailLength = 10;
    const normalizedVx = this.vx / Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const normalizedVy = this.vy / Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    
    // Draw trail
    const gradient = ctx.createLinearGradient(
      this.x - normalizedVx * trailLength,
      this.y - normalizedVy * trailLength,
      this.x,
      this.y
    );
    gradient.addColorStop(0, 'rgba(241, 196, 15, 0)');
    gradient.addColorStop(1, this.color);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.radius * 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.x - normalizedVx * trailLength, this.y - normalizedVy * trailLength);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    
    // Draw bullet core
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
    ctx.fill();
    
    // Glow effect
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
