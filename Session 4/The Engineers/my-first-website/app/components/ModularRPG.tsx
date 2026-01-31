'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '../engine/input';
import { Camera } from '../engine/camera';
import { Player } from '../engine/player';
import { Enemy } from '../engine/enemy';
import { Scene } from '../engine/scene';
import { createHitbox, checkOverlap } from '../engine/combat';

const TILE_SIZE = 32;
const MAP_WIDTH = 50;
const MAP_HEIGHT = 50;

export default function ModularRPG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState({ hp: 100, kills: 0, enemiesRemaining: 3 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize input
    Input.init();

    // Create camera
    const camera = new Camera(canvas.width, canvas.height);

    // Create scene
    const scene = new Scene('ForestScene');

    // Create player
    const player = new Player(MAP_WIDTH * TILE_SIZE / 2, MAP_HEIGHT * TILE_SIZE / 2);
    scene.addEntity(player);

    // Create enemies
    const enemies: Enemy[] = [
      new Enemy(10 * TILE_SIZE, 10 * TILE_SIZE, 40),
      new Enemy(40 * TILE_SIZE, 15 * TILE_SIZE, 40),
      new Enemy(25 * TILE_SIZE, 35 * TILE_SIZE, 40),
    ];

    enemies.forEach((e) => scene.addEntity(e));

    let kills = 0;
    let hitboxes: any[] = [];

    // Generate tilemap
    const generateTilemap = (): number[] => {
      const tiles: number[] = [];
      for (let i = 0; i < MAP_WIDTH * MAP_HEIGHT; i++) {
        // 0 = grass, 1 = path, 2 = wall
        const x = i % MAP_WIDTH;
        const y = Math.floor(i / MAP_WIDTH);

        if (x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1) {
          tiles[i] = 2; // wall
        } else if (x > 22 && x < 28) {
          tiles[i] = 1; // path
        } else {
          tiles[i] = 0; // grass
        }
      }
      return tiles;
    };

    const tilemap = generateTilemap();
    const tileColors = { 0: '#3a7d44', 1: '#c2a36b', 2: '#4a4a4a' };

    const update = (dt: number) => {
      // Update scene with player reference for enemies
      scene.update(dt, player);

      // Player attacking
      if (Input.mouse.clicked && player.attack()) {
        const attackHitbox = createHitbox(
          player.x + Math.cos(player.facing) * 20,
          player.y + Math.sin(player.facing) * 20,
          40,
          40,
          15
        );
        hitboxes.push(attackHitbox);
      }

      // Skill attack with Q
      if (Input.isKeyPressed('q') && player.canAttack()) {
        player.attackCooldown = 1.0;
        for (const enemy of enemies) {
          const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
          if (dist < 150) {
            enemy.takeDamage(25);
          }
        }
      }

      // Update enemy AI
      enemies.forEach((e) => e.update(dt, player));
      hitboxes = hitboxes.filter((hb) => {
        let hit = false;
        enemies.forEach((e) => {
          if (checkOverlap(hb, { x: e.x, y: e.y, width: e.width, height: e.height })) {
            e.takeDamage(hb.damage);
            hit = true;
          }
        });
        return !hit;
      });

      // Check enemy collisions with player
      enemies.forEach((e) => {
        const dist = Math.hypot(e.x - player.x, e.y - player.y);
        if (dist < 32) {
          player.hp -= 0.15 * dt;
        }
      });

      // Remove dead enemies
      const aliveEnemies = enemies.filter((e) => e.isAlive());
      if (aliveEnemies.length < enemies.length) {
        kills += enemies.length - aliveEnemies.length;
        enemies.length = 0;
        aliveEnemies.forEach((e) => enemies.push(e));
      }

      // Update camera
      camera.follow(player);

      setStats({
        hp: Math.max(0, Math.floor(player.hp)),
        kills,
        enemiesRemaining: enemies.length,
      });
    };

    const draw = () => {
      // Clear
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw tilemap
      for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
          const tileIndex = y * MAP_WIDTH + x;
          const tileType = tilemap[tileIndex];
          ctx.fillStyle = tileColors[tileType as keyof typeof tileColors];
          ctx.fillRect(x * TILE_SIZE - camera.x, y * TILE_SIZE - camera.y, TILE_SIZE, TILE_SIZE);

          // Grid
          ctx.strokeStyle = 'rgba(255,255,255,0.1)';
          ctx.strokeRect(x * TILE_SIZE - camera.x, y * TILE_SIZE - camera.y, TILE_SIZE, TILE_SIZE);
        }
      }

      // Draw scene entities
      scene.draw(ctx, camera);

      // Draw hitboxes (debug)
      ctx.fillStyle = 'rgba(255,0,0,0.3)';
      hitboxes.forEach((hb) => {
        ctx.fillRect(hb.x - camera.x, hb.y - camera.y, hb.width, hb.height);
      });

      // Draw UI
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(10, 10, 300, 100);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText('⌨️ Controls:', 20, 30);
      ctx.fillText('WASD - Move | Left Click - Attack | Q - Skill', 20, 50);
      ctx.fillText(`HP: ${Math.max(0, Math.floor(player.hp))}/${player.maxHp}`, 20, 70);
      ctx.fillText(`Enemies: ${enemies.length} | Kills: ${kills}`, 20, 90);
    };

    const gameLoop = () => {
      update(0.016); // ~60fps
      draw();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Input.reset();
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <canvas ref={canvasRef} className="w-full h-screen block bg-black" />
      <a
        href="/"
        className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg transition z-10"
      >
        Back to Menu
      </a>
    </div>
  );
}
