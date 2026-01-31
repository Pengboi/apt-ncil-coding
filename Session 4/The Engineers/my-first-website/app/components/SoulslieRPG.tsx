'use client';

import { useEffect, useRef, useState } from 'react';

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
}

export default function SoulslieRPG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState({ hp: 100, stamina: 100, kills: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const keys: { [key: string]: boolean } = {};
    const mouse = { x: 0, y: 0, down: false };

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

    const lightAttack = () => {
      if (player.attackCooldown > 0) return;
      player.attackCooldown = 25;

      enemies.forEach((enemy) => {
        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;
        const dist = Math.hypot(dx, dy);

        const angleToEnemy = Math.atan2(dy, dx);
        const diff = Math.abs(angleToEnemy - player.facingAngle);

        if (dist < 50 && diff < 1) {
          enemy.hp -= 20;
        }
      });
    };

    const skillAttack = () => {
      if (player.skillCooldown > 0) return;
      player.skillCooldown = 120;

      enemies.forEach((enemy) => {
        const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
        if (dist < 90) {
          enemy.hp -= 30;
        }
      });
    };

    const dodgeRoll = () => {
      if (player.dodgeCooldown > 0) return;
      player.dodgeCooldown = 60;

      player.x += Math.cos(player.facingAngle) * 60;
      player.y += Math.sin(player.facingAngle) * 60;
    };

    const update = () => {
      let dx = 0,
        dy = 0;
      if (keys['w'] || keys['arrowup']) dy -= 1;
      if (keys['s'] || keys['arrowdown']) dy += 1;
      if (keys['a'] || keys['arrowleft']) dx -= 1;
      if (keys['d'] || keys['arrowright']) dx += 1;

      const len = Math.hypot(dx, dy);
      if (len > 0) {
        dx /= len;
        dy /= len;
      }

      player.x += dx * player.speed;
      player.y += dy * player.speed;

      player.facingAngle = Math.atan2(mouse.y - player.y, mouse.x - player.x);

      if (mouse.down) lightAttack();
      if (keys['q']) skillAttack();
      if (keys[' ']) dodgeRoll();

      player.attackCooldown--;
      player.skillCooldown--;
      player.dodgeCooldown--;

      enemies.forEach((e, i) => {
        const dx = player.x - e.x;
        const dy = player.y - e.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 300) {
          e.x += (dx / dist) * e.speed;
          e.y += (dy / dist) * e.speed;
        }

        if (dist < e.size + player.size) {
          player.hp -= 0.2;
        }

        if (e.hp <= 0) {
          enemies.splice(i, 1);
          setStats((prev) => ({ ...prev, kills: prev.kills + 1 }));
        }
      });

      setStats({ hp: Math.max(0, Math.floor(player.hp)), stamina: 100, kills: stats.kills });
    };

    const drawWorld = () => {
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Trees
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = '#1b4332';
        ctx.beginPath();
        ctx.arc((i * 200) % canvas.width, (i * 350) % canvas.height, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      // Buildings
      buildings.forEach((b) => {
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = '#555';
        ctx.fillRect(b.x + 10, b.y + 10, b.w - 20, b.h - 20);
      });
    };

    const drawEntities = () => {
      // Player
      ctx.fillStyle = '#f1c40f';
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
      ctx.fill();

      // Facing direction
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(player.x, player.y);
      ctx.lineTo(
        player.x + Math.cos(player.facingAngle) * 30,
        player.y + Math.sin(player.facingAngle) * 30
      );
      ctx.stroke();

      // Enemies
      enemies.forEach((e) => {
        ctx.fillStyle = '#8b0000';
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();

        // Enemy HP bar
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(e.x - 15, e.y - 25, 30, 4);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(e.x - 15, e.y - 25, (e.hp / 40) * 30, 4);
      });
    };

    const drawUI = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(10, 10, 250, 100);

      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText('Left Click: Light Attack', 20, 30);
      ctx.fillText('Q: Skill Attack (Range)', 20, 50);
      ctx.fillText('Space: Dodge Roll', 20, 70);
      ctx.fillText('WASD/Arrows: Move', 20, 90);

      // HP Bar
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(10, canvas.height - 60, 220, 50);

      ctx.fillStyle = '#fff';
      ctx.fillText(`HP: ${Math.max(0, Math.floor(player.hp))}/${player.maxHp}`, 20, canvas.height - 35);
      ctx.fillText(`Enemies: ${enemies.length}`, 20, canvas.height - 15);

      // HP bar visual
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(20, canvas.height - 45, (player.hp / player.maxHp) * 200, 12);
      ctx.strokeStyle = '#fff';
      ctx.strokeRect(20, canvas.height - 45, 200, 12);
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
  }, [stats.kills]);

  return (
    <div className="w-full h-screen">
      <canvas ref={canvasRef} className="w-full h-screen block" />
      <a
        href="/"
        className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg transition z-10"
      >
        Back to Menu
      </a>
    </div>
  );
}
