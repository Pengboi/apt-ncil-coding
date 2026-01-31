'use client';

import { useEffect, useRef, useState } from 'react';

interface Enemy {
  x: number;
  y: number;
  size: number;
  hp: number;
  speed: number;
}

interface Player {
  x: number;
  y: number;
  size: number;
  speed: number;
  hp: number;
  maxHp: number;
  facing: number;
  attackCooldown: number;
  skillCooldown: number;
}

interface Camera {
  x: number;
  y: number;
}

const TILE_SIZE = 32;
const MAP_WIDTH = 40;
const MAP_HEIGHT = 40;

const TILES = {
  GRASS: 0,
  PATH: 1,
  WALL: 2,
};

const tileColors = {
  0: '#3a7d44',
  1: '#c2a36b',
  2: '#4a4a4a',
};

export default function TopDownRPG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState({ hp: 100, enemiesDefeated: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const keys: { [key: string]: boolean } = {};
    const mouse = { x: 0, y: 0, down: false };

    // Generate tilemap
    const generateMap = (): number[][] => {
      const map: number[][] = [];
      for (let y = 0; y < MAP_HEIGHT; y++) {
        map[y] = [];
        for (let x = 0; x < MAP_WIDTH; x++) {
          if (x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1) {
            map[y][x] = TILES.WALL;
          } else if (x > 18 && x < 22) {
            map[y][x] = TILES.PATH;
          } else {
            map[y][x] = TILES.GRASS;
          }
        }
      }
      return map;
    };

    const map = generateMap();
    let enemiesDefeated = 0;

    const player: Player = {
      x: 20 * TILE_SIZE,
      y: 20 * TILE_SIZE,
      size: 14,
      speed: 2.5,
      hp: 100,
      maxHp: 100,
      facing: 0,
      attackCooldown: 0,
      skillCooldown: 0,
    };

    const camera: Camera = {
      x: 0,
      y: 0,
    };

    const enemies: Enemy[] = [
      { x: 17 * TILE_SIZE, y: 15 * TILE_SIZE, size: 14, hp: 40, speed: 1.2 },
      { x: 23 * TILE_SIZE, y: 12 * TILE_SIZE, size: 14, hp: 40, speed: 1.2 },
      { x: 21 * TILE_SIZE, y: 25 * TILE_SIZE, size: 14, hp: 40, speed: 1.2 },
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
      player.attackCooldown = 20;

      enemies.forEach((e) => {
        const dist = Math.hypot(e.x - player.x, e.y - player.y);
        if (dist < 40) e.hp -= 20;
      });
    };

    const skillAttack = () => {
      if (player.skillCooldown > 0) return;
      player.skillCooldown = 120;

      enemies.forEach((e) => {
        const dist = Math.hypot(e.x - player.x, e.y - player.y);
        if (dist < 80) e.hp -= 35;
      });
    };

    const update = () => {
      let dx = 0,
        dy = 0;
      if (keys['w'] || keys['arrowup']) dy--;
      if (keys['s'] || keys['arrowdown']) dy++;
      if (keys['a'] || keys['arrowleft']) dx--;
      if (keys['d'] || keys['arrowright']) dx++;

      const len = Math.hypot(dx, dy);
      if (len > 0) {
        dx /= len;
        dy /= len;
      }

      player.x += dx * player.speed;
      player.y += dy * player.speed;

      player.facing = Math.atan2(mouse.y - canvas.height / 2, mouse.x - canvas.width / 2);

      if (mouse.down) lightAttack();
      if (keys['q']) skillAttack();

      player.attackCooldown--;
      player.skillCooldown--;

      enemies.forEach((e, i) => {
        const dx = player.x - e.x;
        const dy = player.y - e.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 200) {
          e.x += (dx / dist) * e.speed;
          e.y += (dy / dist) * e.speed;
        }

        if (dist < e.size + player.size) {
          player.hp -= 0.2;
        }

        if (e.hp <= 0) {
          enemies.splice(i, 1);
          enemiesDefeated++;
          setStats({ hp: Math.max(0, Math.floor(player.hp)), enemiesDefeated });
        }
      });

      camera.x = player.x - canvas.width / 2;
      camera.y = player.y - canvas.height / 2;

      setStats({ hp: Math.max(0, Math.floor(player.hp)), enemiesDefeated });
    };

    const drawMap = () => {
      for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
          ctx.fillStyle = tileColors[map[y][x] as keyof typeof tileColors];
          ctx.fillRect(x * TILE_SIZE - camera.x, y * TILE_SIZE - camera.y, TILE_SIZE, TILE_SIZE);
        }
      }
    };

    const drawEntities = () => {
      // Player
      ctx.fillStyle = '#f1c40f';
      ctx.fillRect(
        player.x - player.size - camera.x,
        player.y - player.size - camera.y,
        player.size * 2,
        player.size * 2
      );

      // Facing direction indicator
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(player.x - camera.x, player.y - camera.y);
      ctx.lineTo(
        player.x + Math.cos(player.facing) * 25 - camera.x,
        player.y + Math.sin(player.facing) * 25 - camera.y
      );
      ctx.stroke();

      // Enemies
      enemies.forEach((e) => {
        ctx.fillStyle = '#8b0000';
        ctx.fillRect(e.x - e.size - camera.x, e.y - e.size - camera.y, e.size * 2, e.size * 2);

        // Enemy HP bar
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(e.x - 15 - camera.x, e.y - 25 - camera.y, 30, 4);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(e.x - 15 - camera.x, e.y - 25 - camera.y, (e.hp / 40) * 30, 4);
      });
    };

    const drawUI = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(10, 10, 280, 80);

      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText('Left Click: Light Attack', 20, 30);
      ctx.fillText('Q: Skill Attack (Range)', 20, 50);
      ctx.fillText('WASD/Arrows: Move', 20, 70);

      // HP Bar
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(10, canvas.height - 50, 220, 40);

      ctx.fillStyle = '#fff';
      ctx.fillText(`HP: ${Math.max(0, Math.floor(player.hp))}/${player.maxHp}`, 20, canvas.height - 30);
      ctx.fillText(`Enemies: ${enemies.length}`, 20, canvas.height - 10);

      // HP bar visual
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(20, canvas.height - 40, (player.hp / player.maxHp) * 200, 12);
      ctx.strokeStyle = '#fff';
      ctx.strokeRect(20, canvas.height - 40, 200, 12);
    };

    const loop = () => {
      update();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMap();
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
    </div>
  );
}
