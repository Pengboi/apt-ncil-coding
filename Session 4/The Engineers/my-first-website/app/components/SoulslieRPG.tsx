'use client';

import { useEffect, useRef, useState } from 'react';
import { SKILL_DEFS } from '../engine/skills';
import { SkillManager } from '../engine/skillManager';
import { ParticleSystem } from '../engine/particles';
import SoundManager from '../engine/sfx';
import { UPGRADE_DEFS, applyPurchasedUpgrades, purchaseUpgrade, isPurchased } from '../engine/progression';

interface Enemy {
  x: number;
  y: number;
  size: number;
  hp: number;
  speed: number;
}

interface Building {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Corpse {
  x: number;
  y: number;
  souls: number;
}

interface Bonfire {
  x: number;
  y: number;
  radius: number;
}

interface Projectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  damage: number;
}

type Message = { text: string; ttl: number };

interface Player {
  x: number;
  y: number;
  size: number;
  speed: number;
  hp: number;
  maxHp: number;
  stamina: number;
  maxStamina: number;
  facingAngle: number;
  attackCooldown: number;
  skillCooldown: number;
  dodgeCooldown: number;
  souls: number; // carried souls
  banked: number; // saved at bonfire
  invulnFrames: number; // invulnerability after respawn/dodge
  checkpointX: number;
  checkpointY: number;
  attackPower?: number; // light attack damage (upgradeable)
  appliedUpgrades?: Set<string>;
  soulMultiplier?: number; // increases enemy soul drops
  uiPack?: boolean; // toggles improved skill icons/UI
  vampiric?: number; // fraction of souls gained healed on kill
}

export default function SoulslieRPG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState({ hp: 100, stamina: 100, kills: 0, souls: 0, banked: Number(localStorage.getItem('souls_banked') || '0') });
  const [messages, setMessages] = useState<Message[]>([]);

  // shop UI state (DOM overlay) + refs for use inside the canvas loop
  const [shopOpen, setShopOpen] = useState(false);
  const shopOpenRef = useRef(false);
  const playerRef = useRef<Player | null>(null);
  const [confirmUpgrade, setConfirmUpgrade] = useState<string | null>(null);
  const CONFIRM_THRESHOLD = 45; // cost >= this will show a confirm dialog

  const handlePurchase = (id: string) => {
    const upg = UPGRADE_DEFS.find((u) => u.id === id);
    if (!upg) return;
    const p = playerRef.current;
    if (!p) {
      setMessages((m) => [...m.slice(-4), { text: 'Game not ready', ttl: 120 }]);
      return;
    }

    // expensive purchases require confirmation via modal
    if (upg.cost >= CONFIRM_THRESHOLD) {
      setConfirmUpgrade(id);
      return;
    }

    const res = purchaseUpgrade(id, p);
    if (res.success) {
      // fire a DOM event so the canvas loop (which owns particles/sfx) can play effects
      try { window.dispatchEvent(new Event('game:purchase')); } catch (e) {}
      setStats((prev) => ({ ...prev, banked: p.banked }));
      setMessages((m) => [...m.slice(-4), { text: `Purchased ${upg.name}`, ttl: 240 }]);
    } else {
      setMessages((m) => [...m.slice(-4), { text: res.message || 'Cannot purchase', ttl: 160 }]);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const keys: { [key: string]: boolean } = {};
    const mouse = { x: 0, y: 0, down: false };

    const STAMINA_REGEN = 0.35;
    const LIGHT_COST = 8;
    const SKILL_COST = 30;
    const DODGE_COST = 20;
    const RESPAWN_INVULN = 60;

    const player: Player = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: 18,
      speed: 3,
      hp: 100,
      maxHp: 100,
      stamina: 100,
      maxStamina: 100,
      facingAngle: 0,
      attackCooldown: 0,
      skillCooldown: 0,
      dodgeCooldown: 0,
      souls: 0,
      banked: Number(localStorage.getItem('souls_banked') || '0'),
      invulnFrames: 0,
      checkpointX: canvas.width / 2,
      checkpointY: canvas.height / 2,
      attackPower: 28,
      appliedUpgrades: new Set<string>(),
      soulMultiplier: 1,
      uiPack: false,
      vampiric: 0,
    };
    // mirror to outer ref so DOM controls can access the live player
    playerRef.current = player;

    let corpse: Corpse | null = null;
    const bonfire: Bonfire = { x: 120, y: 120, radius: 48 };
    // shopOpen is managed by React state (`shopOpen`) and mirrored to `shopOpenRef` for the loop.

    // --- Skill system (hotbar + basic examples) ---------------------------------
    const skillSlots = ['fireball', 'dash', 'heal', 'soulBlast'];

    const skillManager = new SkillManager();
    const particles = new ParticleSystem();
    const sfx = new SoundManager();

    // DOM purchases dispatch a `game:purchase` event — play same effects here
    const onDomPurchase = () => {
      try {
        particles.emitPreset('pickup', bonfire.x, bonfire.y);
        sfx.play('pickup');
      } catch (err) {}
    };
    window.addEventListener('game:purchase', onDomPurchase);

    // apply any previously purchased upgrades (persisted in localStorage)
    applyPurchasedUpgrades(player);

    const projectiles: Projectile[] = [];
    const spawnProjectile = (x: number, y: number, vx: number, vy: number, dmg: number) => {
      projectiles.push({ x, y, vx, vy, life: 120, damage: dmg });
      particles.emit(x, y, { count: 6, spread: 6, speed: 1.8, life: 30, size: 4, color: '#ff8a65' });
      sfx.play('fire');
    };

    const useSkill = (slotIndex: number) => {
      const id = skillSlots[slotIndex];
      const res = skillManager.execute(id, { player, enemies, particles, sfx, spawnProjectile, pushMessage, setStats });
      if (!res.success) pushMessage(res.message || 'Failed to use skill');
    };

    const enemies: Enemy[] = [];
    for (let i = 0; i < 8; i++) {
      enemies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 16,
        hp: 40,
        speed: 1.4,
      });
    }

    const buildings: Building[] = [
      { x: 200, y: 200, w: 120, h: 80 },
      { x: 600, y: 300, w: 150, h: 100 },
      { x: 400, y: 600, w: 180, h: 120 },
    ];

    const pushMessage = (text: string, ttl = 180) => {
      setMessages((m) => [...m.slice(-4), { text, ttl }]);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseDown = () => {
      mouse.down = true;
    };

    const handleMouseUp = () => {
      mouse.down = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const canSpendStamina = (cost: number) => player.stamina >= cost;

    const lightAttack = () => {
      if (player.attackCooldown > 0) return;
      if (!canSpendStamina(LIGHT_COST)) { pushMessage('Not enough stamina'); return; }
      player.attackCooldown = 18;
      player.stamina -= LIGHT_COST;

      enemies.forEach((enemy) => {
        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;
        const dist = Math.hypot(dx, dy);
        const angleToEnemy = Math.atan2(dy, dx);
        const diff = Math.abs(angleToEnemy - player.facingAngle);
        if (dist < 50 && diff < 1) {
          enemy.hp -= (player.attackPower || 28);
          particles.emit(enemy.x, enemy.y, { count: 8, spread: 8, speed: 2, life: 30, size: 3, color: '#ffcc00' });
          sfx.play('hit');
        }
      });
    };

    const skillAttack = () => {
      if (player.skillCooldown > 0) return;
      if (!canSpendStamina(SKILL_COST)) { pushMessage('Not enough stamina'); return; }
      player.skillCooldown = 140;
      player.stamina -= SKILL_COST;

      enemies.forEach((enemy) => {
        const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
        if (dist < 110) {
          enemy.hp -= 48;
        }
      });
    };

    const dodgeRoll = () => {
      if (player.dodgeCooldown > 0) return;
      if (!canSpendStamina(DODGE_COST)) { pushMessage('Not enough stamina'); return; }
      player.dodgeCooldown = 48;
      player.stamina -= DODGE_COST;
      player.invulnFrames = 22;
      player.x += Math.cos(player.facingAngle) * 80;
      player.y += Math.sin(player.facingAngle) * 80;
      particles.emit(player.x, player.y, { count: 10, spread: 8, speed: 1.4, life: 36, size: 4, color: '#a0e7e5' });
      sfx.play('dash');
    };

    const restAtBonfire = () => {
      player.checkpointX = bonfire.x;
      player.checkpointY = bonfire.y;
      player.hp = player.maxHp;
      player.stamina = player.maxStamina;
      if (player.souls > 0) {
        player.banked += player.souls;
        player.souls = 0;
        localStorage.setItem('souls_banked', String(player.banked));
        pushMessage('Souls banked at bonfire');
        particles.emitPreset('bonfire', bonfire.x, bonfire.y);
        sfx.play('pickup');
      } else {
        pushMessage('Rested at bonfire');
        particles.emitPreset('bonfire', bonfire.x, bonfire.y);
        sfx.play('rest');
      }

      // open the bonfire shop UI so player can spend banked souls
      shopOpenRef.current = true;
      setShopOpen(true);
    };

    const tryPickupCorpse = () => {
      if (!corpse) return;
      const d = Math.hypot(player.x - corpse.x, player.y - corpse.y);
      if (d < 28) {
        player.souls += corpse.souls;
        pushMessage(`Recovered ${corpse.souls} souls`);
        particles.emit(player.x, player.y, { count: 10, spread: 8, speed: 1.5, life: 36, size: 3, color: '#b4f8c8' });
        sfx.play('pickup');
        corpse = null;
      }
    };

    const handleDeath = () => {
      if (player.souls > 0) {
        corpse = { x: player.x, y: player.y, souls: player.souls };
        pushMessage(`You dropped ${corpse.souls} souls`);
        particles.emit(player.x, player.y, { count: 24, spread: 24, speed: 2.4, life: 80, size: 5, color: '#6b5b95' });
      }
      sfx.play('death');
      player.souls = 0;
      player.x = player.checkpointX;
      player.y = player.checkpointY;
      player.hp = player.maxHp;
      player.invulnFrames = RESPAWN_INVULN;
    };

    const update = () => {
      let dx = 0, dy = 0;
      if (keys['w'] || keys['arrowup']) dy -= 1;
      if (keys['s'] || keys['arrowdown']) dy += 1;
      if (keys['a'] || keys['arrowleft']) dx -= 1;
      if (keys['d'] || keys['arrowright']) dx += 1;

      const len = Math.hypot(dx, dy);
      if (len > 0) { dx /= len; dy /= len; }
      player.x += dx * player.speed;
      player.y += dy * player.speed;

      player.facingAngle = Math.atan2(mouse.y - player.y, mouse.x - player.x);

      // legacy/simple attacks (blocked while shop is open)
      if (!shopOpenRef.current) {
        if (mouse.down) lightAttack();
        if (keys['q']) { skillAttack(); keys['q'] = false; }
        if (keys[' ']) { dodgeRoll(); keys[' '] = false; }
      }

      // skill hotbar (1-4) (blocked while shop is open)
      if (!shopOpenRef.current) {
        if (keys['1']) { useSkill(0); keys['1'] = false; }
        if (keys['2']) { useSkill(1); keys['2'] = false; }
        if (keys['3']) { useSkill(2); keys['3'] = false; }
        if (keys['4']) { useSkill(3); keys['4'] = false; }
      }

      // bonfire interaction / open shop
      if (keys['e']) {
        const distToBonfire = Math.hypot(player.x - bonfire.x, player.y - bonfire.y);
        if (distToBonfire < bonfire.radius + 12) {
          restAtBonfire();
        } else {
          tryPickupCorpse();
        }
        keys['e'] = false;
      }

      // shop input handling (when open)
      if (shopOpenRef.current) {
        for (let i = 0; i < UPGRADE_DEFS.length; i++) {
          const k = String(i + 1);
          if (keys[k]) {
            const upg = UPGRADE_DEFS[i];
            if (upg.cost >= CONFIRM_THRESHOLD) {
              setConfirmUpgrade(upg.id);
            } else {
              const res = purchaseUpgrade(upg.id, player);
              if (res.success) {
                sfx.play('pickup');
                particles.emitPreset('pickup', bonfire.x, bonfire.y);
                pushMessage(`Purchased ${upg.name}`);
                setStats((prev) => ({ ...prev, banked: player.banked }));
              } else {
                pushMessage(res.message || 'Cannot purchase');
              }
            }
            keys[k] = false;
          }
        }
        if (keys['e'] || keys['escape']) {
          shopOpenRef.current = false;
          setShopOpen(false);
          keys['e'] = false;
          keys['escape'] = false;
          pushMessage('Left bonfire');
        }
      }

      // cooldowns / stamina / invuln
      player.attackCooldown = Math.max(0, player.attackCooldown - 1);
      player.skillCooldown = Math.max(0, player.skillCooldown - 1);
      player.dodgeCooldown = Math.max(0, player.dodgeCooldown - 1);
      player.invulnFrames = Math.max(0, player.invulnFrames - 1);

      // skill cooldown timers
      skillManager.tick();

      // update particles
      particles.update();

      player.stamina = Math.min(player.maxStamina, player.stamina + STAMINA_REGEN);

      // update projectiles
      for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        // collision with enemies
        let hit = false;
        for (let j = enemies.length - 1; j >= 0; j--) {
          const e = enemies[j];
          const d = Math.hypot(e.x - p.x, e.y - p.y);
          if (d < e.size + 6) {
            e.hp -= p.damage;
            hit = true;

            particles.emit(p.x, p.y, { count: 6, spread: 6, speed: 1.6, life: 24, size: 3, color: '#ff6b6b' });
            sfx.play('hit');

            if (e.hp <= 0) {
              const soulGain = Math.floor(5 + Math.random() * 8);
              const scaled = Math.floor(soulGain * (player.soulMultiplier || 1));
              player.souls += scaled;
              // vampiric heal on kill (fraction of souls gained)
              if (player.vampiric && player.vampiric > 0) {
                const heal = Math.floor(scaled * (player.vampiric || 0));
                player.hp = Math.min(player.maxHp, player.hp + heal);
              }
              setStats((prev) => ({ ...prev, kills: prev.kills + 1 }));
              pushMessage(`+${scaled} souls`);
              particles.emit(e.x, e.y, { count: 12, spread: 10, speed: 2.2, life: 40, size: 4, color: '#ffd166' });
              sfx.play('pickup');
              enemies.splice(j, 1);
            }
            break;
          }
        }

        if (hit || p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          projectiles.splice(i, 1);
        }
      }

      enemies.forEach((e, i) => {
        const dx = player.x - e.x;
        const dy = player.y - e.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 300) {
          e.x += (dx / dist) * e.speed;
          e.y += (dy / dist) * e.speed;
        }

        if (dist < e.size + player.size && player.invulnFrames === 0) {
          player.hp -= 0.28;
        }

        // enemies killed by other effects handled below
      });

      // sweep and award souls for any enemies with hp <= 0 (handles light attacks / soulBlast)
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        if (e.hp <= 0) {
          const soulGain = Math.floor((5 + Math.random() * 8) * (player.soulMultiplier || 1));
          player.souls += soulGain;
          // vampiric heal on kill (fraction of souls gained)
          if (player.vampiric && player.vampiric > 0) {
            const heal = Math.floor(soulGain * (player.vampiric || 0));
            player.hp = Math.min(player.maxHp, player.hp + heal);
          }
          setStats((prev) => ({ ...prev, kills: prev.kills + 1 }));
          pushMessage(`+${soulGain} souls`);
          particles.emit(e.x, e.y, { count: 12, spread: 10, speed: 2.2, life: 40, size: 4, color: '#ffd166' });
          sfx.play('pickup');
          enemies.splice(i, 1);
        }
      }

      player.x = Math.max(20, Math.min(canvas.width - 20, player.x));
      player.y = Math.max(20, Math.min(canvas.height - 20, player.y));

      if (player.hp <= 0) {
        handleDeath();
      }

      setMessages((msgs) => msgs.map((m) => ({ ...m, ttl: m.ttl - 1 })).filter((m) => m.ttl > 0));

      setStats((prev) => ({ hp: Math.max(0, Math.floor(player.hp)), stamina: Math.floor(player.stamina), kills: prev.kills, souls: player.souls, banked: player.banked }));
    };

    const drawWorld = () => {
      ctx.fillStyle = '#162a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = '#1b4332';
        ctx.beginPath();
        ctx.arc((i * 200) % canvas.width, (i * 350) % canvas.height, 28, 0, Math.PI * 2);
        ctx.fill();
      }

      buildings.forEach((b) => {
        ctx.fillStyle = '#333';
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = '#444';
        ctx.fillRect(b.x + 8, b.y + 8, b.w - 16, b.h - 16);
      });

      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = '#ffb703';
      ctx.arc(bonfire.x, bonfire.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fb8500';
      ctx.beginPath();
      ctx.moveTo(bonfire.x - 6, bonfire.y + 2);
      ctx.lineTo(bonfire.x, bonfire.y - 12);
      ctx.lineTo(bonfire.x + 6, bonfire.y + 2);
      ctx.fill();
      ctx.restore();
    };

    const drawEntities = () => {
      ctx.save();
      ctx.globalAlpha = player.invulnFrames > 0 ? 0.6 : 1;
      ctx.fillStyle = '#f1c40f';
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(player.x, player.y);
      ctx.lineTo(player.x + Math.cos(player.facingAngle) * 30, player.y + Math.sin(player.facingAngle) * 30);
      ctx.stroke();

      enemies.forEach((e) => {
        ctx.fillStyle = '#8b0000';
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#222';
        ctx.fillRect(e.x - 18, e.y - 24, 36, 6);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(e.x - 18, e.y - 24, Math.max(0, (e.hp / 40) * 36), 6);
      });

      if (corpse) {
        ctx.save();
        ctx.fillStyle = '#6b5b95';
        ctx.fillRect(corpse.x - 10, corpse.y - 10, 20, 20);
        ctx.fillStyle = '#fff';
        ctx.fillText(`${corpse.souls}`, corpse.x - 8, corpse.y + 4);
        ctx.restore();
      }

      // projectiles (fireballs, etc.)
      projectiles.forEach((p) => {
        ctx.save();
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // particles
      particles.draw(ctx);
    };

    const drawUI = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.65)';
      ctx.fillRect(10, 10, 300, 120);
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText('Left Click: Light (stamina)', 20, 30);
      ctx.fillText('Q: Skill (big cost)', 20, 50);
      ctx.fillText('Space: Dodge (i-frames)', 20, 70);
      ctx.fillText('E: Rest at bonfire / Pickup corpse', 20, 90);

      // purchased upgrades (HUD)
      const purchased = UPGRADE_DEFS.filter((u) => isPurchased(u.id));
      if (purchased.length > 0) {
        ctx.fillStyle = '#ffd166';
        ctx.font = '14px serif';
        ctx.fillText('Upgrades:', 20, 110);
        for (let i = 0; i < purchased.length; i++) {
          const icon = purchased[i].icon || '•';
          ctx.fillText(icon, 100 + i * 20, 110);
        }
      }

      ctx.fillStyle = '#fff';
      ctx.fillText(`HP: ${stats.hp}/${player.maxHp}`, 20, canvas.height - 120);
      ctx.fillText(`Stamina: ${stats.stamina}/${player.maxStamina}`, 20, canvas.height - 100);
      ctx.fillText(`Souls: ${player.souls} (banked: ${player.banked})`, 20, canvas.height - 80);
      ctx.fillText(`Enemies left: ${enemies.length}`, 20, canvas.height - 60);

      ctx.fillStyle = '#ff0000';
      ctx.fillRect(20, canvas.height - 110, (player.hp / player.maxHp) * 260, 14);
      ctx.strokeStyle = '#fff';
      ctx.strokeRect(20, canvas.height - 110, 260, 14);

      ctx.fillStyle = '#00aaff';
      ctx.fillRect(20, canvas.height - 90, (player.stamina / player.maxStamina) * 260, 10);
      ctx.strokeStyle = '#fff';
      ctx.strokeRect(20, canvas.height - 90, 260, 10);

      // hotbar (1-4)
      const hotbarW = skillSlots.length * 56;
      const hotbarX = Math.floor(canvas.width / 2 - hotbarW / 2);
      const hotbarY = canvas.height - 150;
      for (let i = 0; i < skillSlots.length; i++) {
        const id = skillSlots[i];
        const def = SKILL_DEFS[id];
        const x = hotbarX + i * 56;
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.fillRect(x, hotbarY, 50, 50);
        ctx.strokeStyle = '#555';
        ctx.strokeRect(x, hotbarY, 50, 50);

        ctx.fillStyle = '#fff';
        ctx.font = '20px serif';
        ctx.fillText(def.icon || '', x + 16, hotbarY + 34);

        const cd = skillManager.getCooldown(id) || 0;
        if (cd > 0) {
          const ratio = cd / (SKILL_DEFS[id].cooldown || 1);
          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          ctx.fillRect(x, hotbarY + 50 * (1 - ratio), 50, 50 * ratio);
          ctx.fillStyle = '#fff';
          ctx.font = '12px monospace';
          ctx.fillText(String(Math.ceil(cd / 60)), x + 4, hotbarY + 12);
        }

        // key label
        ctx.fillStyle = '#aaa';
        ctx.font = '12px monospace';
        ctx.fillText(String(i + 1), x + 36, hotbarY + 48);
      }

      // bonfire shop overlay (canvas) — mirror of DOM shop
      if (shopOpenRef.current) {
        const w = 520;
        const h = 40 + UPGRADE_DEFS.length * 48;
        const x0 = Math.floor(canvas.width / 2 - w / 2);
        const y0 = Math.floor(canvas.height / 2 - h / 2);
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(x0, y0, w, h);
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(x0, y0, w, h);
        ctx.fillStyle = '#fff';
        ctx.font = '18px monospace';
        const keyRange = '1-' + UPGRADE_DEFS.length;
        ctx.fillText('Bonfire — Upgrades (press ' + keyRange + ' to buy)', x0 + 12, y0 + 28);

        for (let i = 0; i < UPGRADE_DEFS.length; i++) {
          const u = UPGRADE_DEFS[i];
          const iy = y0 + 44 + i * 48;
          const purchased = isPurchased(u.id);
          ctx.fillStyle = purchased ? 'rgba(120,120,120,0.9)' : '#222';
          ctx.fillRect(x0 + 12, iy, w - 24, 40);
          ctx.fillStyle = purchased ? '#888' : '#fff';
          ctx.font = '16px serif';
          ctx.fillText(`${i + 1}. ${u.name} — ${u.cost} souls`, x0 + 20, iy + 24);
          ctx.font = '12px monospace';
          ctx.fillStyle = '#ccc';
          ctx.fillText(u.description, x0 + 260, iy + 22);
          if (purchased) {
            ctx.fillStyle = '#7bed9f';
            ctx.fillText('Purchased', x0 + w - 110, iy + 24);
          }
        }

        ctx.fillStyle = '#aaa';
        ctx.font = '12px monospace';
        ctx.fillText('Press E / Esc to close', x0 + 12, y0 + h - 12);
      }

      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(canvas.width - 260, 10, 250, 120);
      ctx.fillStyle = '#fff';
      ctx.font = '13px monospace';
      messages.slice().reverse().forEach((m, i) => {
        ctx.fillText(m.text, canvas.width - 250, 30 + i * 20);
      });
    };

    const loop = () => {
      update();
      drawWorld();
      drawEntities();
      drawUI();
      requestAnimationFrame(loop);
    };

    loop();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <canvas ref={canvasRef} className="w-full h-screen block" />
      <a
        href="/"
        className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg transition z-10"
      >
        Back to Menu
      </a>

      {shopOpen && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto bg-gray-900/95 text-white p-6 rounded-lg shadow-lg" style={{ minWidth: 460 }}>
            <div className="flex justify-between items-center mb-3">
              <div className="text-lg font-bold">Bonfire Shop</div>
              <div className="text-sm">Banked: <strong>{stats.banked}</strong> souls</div>
            </div>
            <div className="space-y-2">
              {UPGRADE_DEFS.map((u, idx) => {
                const purchased = isPurchased(u.id);
                return (
                  <div key={u.id} className="flex items-center justify-between bg-gray-800/60 p-2 rounded">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{u.icon || '•'}</div>
                      <div>
                        <div className="font-semibold">{u.name}</div>
                        <div className="text-xs text-gray-300">{u.description}</div>
                      </div>
                    </div>
                    <div>
                      <button
                        title={purchased ? 'Already purchased' : `Cost: ${u.cost} souls${u.cost >= 45 ? ' — confirmation required' : ''}`}
                        onClick={() => handlePurchase(u.id)}
                        disabled={purchased || stats.banked < u.cost}
                        className={`px-3 py-1 rounded font-mono ${purchased ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                      >
                        {purchased ? 'Purchased' : `Buy (${u.cost})`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => { shopOpenRef.current = false; setShopOpen(false); }}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmUpgrade && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-[420px]">
            <div className="text-lg font-bold mb-2">Confirm Purchase</div>
            <div className="mb-4">{UPGRADE_DEFS.find((u) => u.id === confirmUpgrade)?.name} — cost: <strong>{UPGRADE_DEFS.find((u) => u.id === confirmUpgrade)?.cost}</strong> souls</div>
            <div className="text-sm text-gray-300 mb-4">{UPGRADE_DEFS.find((u) => u.id === confirmUpgrade)?.description}</div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmUpgrade(null)}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handlePurchase(confirmUpgrade);
                  // perform the confirmed purchase immediately
                  const p = playerRef.current;
                  if (p && purchaseUpgrade(confirmUpgrade, p).success) {
                    try { window.dispatchEvent(new Event('game:purchase')); } catch (e) {}
                    setStats((s) => ({ ...s, banked: p.banked }));
                    setMessages((m) => [...m.slice(-4), { text: `Purchased ${UPGRADE_DEFS.find((u) => u.id === confirmUpgrade)?.name}`, ttl: 240 }]);
                  }
                  setConfirmUpgrade(null);
                }}
                className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
