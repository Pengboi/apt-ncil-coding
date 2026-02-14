import SKILL_DEFS from './skills';

export class SkillManager {
  cooldowns: Record<string, number>;

  constructor() {
    this.cooldowns = {};
    for (const id in SKILL_DEFS) this.cooldowns[id] = 0;
  }

  isReady(id: string) {
    return (this.cooldowns[id] || 0) <= 0;
  }

  startCooldown(id: string) {
    const def = SKILL_DEFS[id];
    if (!def) return;
    this.cooldowns[id] = def.cooldown || 0;
  }

  tick() {
    for (const id in this.cooldowns) {
      if (this.cooldowns[id] > 0) this.cooldowns[id] = Math.max(0, this.cooldowns[id] - 1);
    }
  }

  getCooldown(id: string) {
    return this.cooldowns[id] || 0;
  }

  /**
   * Execute a skill by id — scene supplies a lightweight context with the
   * player, enemies, particles, sfx, spawnProjectile and helper callbacks.
   * Returns { success, message } so callers can show feedback.
   */
  execute(id: string, ctx: any): { success: boolean; message?: string } {
    const def = SKILL_DEFS[id];
    if (!def) return { success: false, message: 'Unknown skill' };
    if (!this.isReady(id)) return { success: false, message: `${def.name} cooling down` };

    const player = ctx.player as any;
    const enemies = ctx.enemies as any[];
    const particles = ctx.particles as any;
    const sfx = ctx.sfx as any;
    const spawnProjectile = ctx.spawnProjectile as any;
    const pushMessage = ctx.pushMessage as any;
    const setStats = ctx.setStats as any;

    // cost checks
    if (def.costType === 'stamina' && player.stamina < def.cost) return { success: false, message: 'Not enough stamina' };
    if (def.costType === 'souls' && player.banked < def.cost) return { success: false, message: 'Not enough banked souls' };

    // pay cost
    if (def.costType === 'stamina') player.stamina -= def.cost;
    else { player.banked -= def.cost; localStorage.setItem('souls_banked', String(player.banked)); }

    this.startCooldown(id);
    pushMessage(`${def.name} used`);

    // effects
    switch (id) {
      case 'fireball': {
        const angle = player.facingAngle;
        const speed = 8;
        spawnProjectile(player.x + Math.cos(angle) * 20, player.y + Math.sin(angle) * 20, Math.cos(angle) * speed, Math.sin(angle) * speed, def.power || 20);
        if (particles) particles.emitPreset?.('fire', player.x, player.y);
        if (sfx) sfx.play('fire');
        break;
      }
      case 'dash': {
        player.x += Math.cos(player.facingAngle) * 120;
        player.y += Math.sin(player.facingAngle) * 120;
        player.invulnFrames = 20;
        if (particles) particles.emitPreset?.('dash', player.x, player.y);
        if (sfx) sfx.play('dash');
        break;
      }
      case 'heal': {
        player.hp = Math.min(player.maxHp, player.hp + (def.power || 30));
        if (particles) particles.emitPreset?.('heal', player.x, player.y);
        if (sfx) sfx.play('heal');
        break;
      }
      case 'soulBlast': {
        const dmg = def.power || 30;
        enemies.forEach((e: any) => {
          const d = Math.hypot(e.x - player.x, e.y - player.y);
          if (d < (def.range || 120)) {
            e.hp -= dmg;
            if (particles) particles.emit(e.x, e.y, { count: 8, spread: 8, speed: 1.8, life: 30, size: 4, color: '#ffd166' });
          }
        });
        if (sfx) sfx.play('soulblast');
        break;
      }
    }

    // update stats reactive state if provided
    if (setStats) setStats((prev: any) => ({ ...prev, banked: player.banked }));

    return { success: true };
  }
}

export default SkillManager;
