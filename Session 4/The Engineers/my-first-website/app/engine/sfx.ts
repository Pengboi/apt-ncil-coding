export default class SoundManager {
  private ctx: AudioContext | null = null;
  private ensure() {
    if (!this.ctx) this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  play(name: string) {
    try {
      this.ensure();
      const ctx = this.ctx!;
      const now = ctx.currentTime;
      switch (name) {
        case 'fire': {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sawtooth';
          o.frequency.setValueAtTime(700, now);
          g.gain.setValueAtTime(0.0001, now);
          g.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          o.connect(g); g.connect(ctx.destination);
          o.start(now); o.stop(now + 0.25);
          break;
        }
        case 'hit': {
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = 'square'; o.frequency.setValueAtTime(140, now);
          g.gain.setValueAtTime(0.0001, now);
          g.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          o.connect(g); g.connect(ctx.destination);
          o.start(now); o.stop(now + 0.12);
          break;
        }
        case 'heal': {
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = 'sine'; o.frequency.setValueAtTime(420, now); o.frequency.linearRampToValueAtTime(900, now + 0.16);
          g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(0.18, now + 0.02); g.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          o.connect(g); g.connect(ctx.destination);
          o.start(now); o.stop(now + 0.28);
          break;
        }
        case 'pickup': {
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = 'triangle'; o.frequency.setValueAtTime(880, now);
          g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(0.16, now + 0.005); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          o.connect(g); g.connect(ctx.destination);
          o.start(now); o.stop(now + 0.12);
          break;
        }
        case 'death': {
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = 'sine'; o.frequency.setValueAtTime(120, now);
          g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(0.2, now + 0.02); g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          o.connect(g); g.connect(ctx.destination);
          o.start(now); o.stop(now + 0.6);
          break;
        }
        case 'dash': {
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = 'sawtooth'; o.frequency.setValueAtTime(520, now); o.frequency.linearRampToValueAtTime(220, now + 0.18);
          g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(0.18, now + 0.02); g.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
          o.connect(g); g.connect(ctx.destination);
          o.start(now); o.stop(now + 0.22);
          break;
        }
        case 'soulblast': {
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = 'sine'; o.frequency.setValueAtTime(260, now);
          g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(0.18, now + 0.01); g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          o.connect(g); g.connect(ctx.destination);
          o.start(now); o.stop(now + 0.4);
          break;
        }
        case 'rest': {
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = 'sine'; o.frequency.setValueAtTime(320, now); o.frequency.linearRampToValueAtTime(480, now + 0.22);
          g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(0.12, now + 0.02); g.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
          o.connect(g); g.connect(ctx.destination);
          o.start(now); o.stop(now + 0.36);
          break;
        }
        default:
          break;
      }
    } catch (err) {
      // fail silently if audio is unavailable
      return;
    }
  }
}
