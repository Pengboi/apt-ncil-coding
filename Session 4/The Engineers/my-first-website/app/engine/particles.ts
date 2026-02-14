type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
  alpha: number;
  gravity?: number;
};

export class ParticleSystem {
  particles: Particle[] = [];

  emit(x: number, y: number, opts?: { count?: number; spread?: number; speed?: number; life?: number; size?: number; color?: string; gravity?: number }) {
    const { count = 8, spread = 6, speed = 2, life = 40, size = 3, color = '#fff', gravity = 0 } = opts || {};
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const m = (Math.random() * 0.8 + 0.4) * speed;
      const vx = Math.cos(a) * m + (Math.random() - 0.5) * spread * 0.3;
      const vy = Math.sin(a) * m + (Math.random() - 0.5) * spread * 0.3;
      this.particles.push({ x, y, vx, vy, life: Math.floor(life * (0.6 + Math.random() * 0.8)), size: size * (0.6 + Math.random() * 0.8), color, alpha: 1, gravity });
    }
  }

  // Convenience presets for common effects
  emitPreset(name: string, x: number, y: number, overrides?: any) {
    switch (name) {
      case 'fire':
        return this.emit(x, y, { count: 10, spread: 10, speed: 1.8, life: 32, size: 4, color: '#ff8a65', ...overrides });
      case 'heal':
        return this.emit(x, y, { count: 12, spread: 8, speed: 0.6, life: 42, size: 4, color: '#b4f8c8', ...overrides });
      case 'pickup':
        return this.emit(x, y, { count: 8, spread: 6, speed: 1.2, life: 30, size: 3.5, color: '#ffd166', ...overrides });
      case 'spark':
        return this.emit(x, y, { count: 6, spread: 6, speed: 2.2, life: 20, size: 2.5, color: '#fff', ...overrides });
      case 'dash':
        return this.emit(x, y, { count: 14, spread: 12, speed: 1.6, life: 36, size: 4.5, color: '#a0e7e5', ...overrides });
      case 'bonfire':
        return this.emit(x, y, { count: 18, spread: 18, speed: 1.6, life: 48, size: 6, color: '#ffb703', ...overrides });
      default:
        return this.emit(x, y, overrides);
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      if (p.gravity) p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1;
      p.alpha = Math.max(0, p.life / 60);
      if (p.life <= 0) this.particles.splice(i, 1);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.particles.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }
}

export default ParticleSystem;
