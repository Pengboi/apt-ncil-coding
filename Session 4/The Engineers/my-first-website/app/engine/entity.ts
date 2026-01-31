import { Camera } from './camera';

export abstract class Entity {
  x: number;
  y: number;
  width: number = 32;
  height: number = 32;
  vx: number = 0;
  vy: number = 0;
  hp: number = 100;
  maxHp: number = 100;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(dt: number) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  draw(ctx: CanvasRenderingContext2D, camera: Camera) {
    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(this.x - camera.x, this.y - camera.y, this.width, this.height);
  }

  isAlive(): boolean {
    return this.hp > 0;
  }
}
