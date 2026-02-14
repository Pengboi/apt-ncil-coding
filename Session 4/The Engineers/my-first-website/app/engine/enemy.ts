import { Entity } from './entity';
import { Camera } from './camera';

export class Enemy extends Entity {
  speed: number;
  chaseRange: number = 150;
  detectionRange: number = 200;

  constructor(x: number, y: number, hp: number = 30) {
    super(x, y);
    this.hp = hp;
    this.maxHp = hp;
    this.speed = 80;
  }

  update(dt: number, player?: Entity) {
    if (player) {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist < this.detectionRange) {
        const nx = dx / dist;
        const ny = dy / dist;
        this.vx = nx * this.speed;
        this.vy = ny * this.speed;
      } else {
        this.vx = 0;
        this.vy = 0;
      }
    }

    super.update(dt);
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera) {
    if (this.sprite) {
      ctx.drawImage(this.sprite, this.x - camera.x, this.y - camera.y, this.width, this.height);
    } else {
      // Enemy body fallback
      ctx.fillStyle = '#8b0000';
      ctx.fillRect(this.x - camera.x, this.y - camera.y, this.width, this.height);
    }

    // HP bar (scaled to entity width)
    const barWidth = Math.min(32, this.width);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.x - camera.x, this.y - 10 - camera.y, barWidth, 4);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(this.x - camera.x, this.y - 10 - camera.y, (this.hp / this.maxHp) * barWidth, 4);
  }

  takeDamage(amount: number) {
    this.hp -= amount;
  }
}
