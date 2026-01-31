import { Entity } from './entity';
import { Input } from './input';
import { Camera } from './camera';

export class Player extends Entity {
  speed: number = 150;
  attackCooldown: number = 0;
  facing: number = 0;

  constructor(x: number, y: number) {
    super(x, y);
    this.hp = 100;
    this.maxHp = 100;
  }

  update(dt: number) {
    let dx = 0,
      dy = 0;

    if (Input.isKeyPressed('w') || Input.isKeyPressed('arrowup')) dy -= 1;
    if (Input.isKeyPressed('s') || Input.isKeyPressed('arrowdown')) dy += 1;
    if (Input.isKeyPressed('a') || Input.isKeyPressed('arrowleft')) dx -= 1;
    if (Input.isKeyPressed('d') || Input.isKeyPressed('arrowright')) dx += 1;

    const mag = Math.hypot(dx, dy);
    if (mag > 0) {
      dx /= mag;
      dy /= mag;
    }

    this.vx = dx * this.speed;
    this.vy = dy * this.speed;
    this.facing = Math.atan2(dy || 1, dx || 1);

    this.attackCooldown = Math.max(0, this.attackCooldown - dt);

    super.update(dt);
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera) {
    // Player body
    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(this.x - camera.x, this.y - camera.y, this.width, this.height);

    // Direction indicator
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2 - camera.x, this.y + this.height / 2 - camera.y);
    ctx.lineTo(
      this.x + this.width / 2 + Math.cos(this.facing) * 20 - camera.x,
      this.y + this.height / 2 + Math.sin(this.facing) * 20 - camera.y
    );
    ctx.stroke();

    // HP bar
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.x - camera.x, this.y - 10 - camera.y, 32, 4);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(this.x - camera.x, this.y - 10 - camera.y, (this.hp / this.maxHp) * 32, 4);
  }

  canAttack(): boolean {
    return this.attackCooldown <= 0;
  }

  attack() {
    if (this.canAttack()) {
      this.attackCooldown = 0.3;
      return true;
    }
    return false;
  }
}
