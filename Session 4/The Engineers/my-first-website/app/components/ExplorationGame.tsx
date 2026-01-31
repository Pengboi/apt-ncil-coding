'use client';

import { useEffect, useRef, useState } from 'react';

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  vx: number;
  vy: number;
}

interface GameTile {
  type: 'grass' | 'water' | 'mountain' | 'forest' | 'sand';
  x: number;
  y: number;
}

const TILE_SIZE = 40;
const MAP_WIDTH = 30;
const MAP_HEIGHT = 20;

export default function ExplorationGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [biome, setBiome] = useState('Forest');
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const playerRef = useRef<Player>({
    x: MAP_WIDTH * TILE_SIZE / 2,
    y: MAP_HEIGHT * TILE_SIZE / 2,
    width: 30,
    height: 30,
    speed: 4,
    vx: 0,
    vy: 0,
  });

  // Generate tilemap based on biome
  const generateMap = (): GameTile[] => {
    const tiles: GameTile[] = [];
    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        let type: 'grass' | 'water' | 'mountain' | 'forest' | 'sand' = 'grass';

        const noise = Math.sin(x * 0.1) * Math.cos(y * 0.1);

        if (biome === 'Forest') {
          if (noise > 0.5) type = 'forest';
          else if (noise < -0.3 && Math.random() > 0.7) type = 'water';
        } else if (biome === 'Mountain') {
          if (noise > 0.4) type = 'mountain';
          else if (noise < -0.2) type = 'grass';
        } else if (biome === 'Desert') {
          type = 'sand';
          if (Math.sin(x * 0.05) * Math.cos(y * 0.05) > 0.6) type = 'water';
        }

        tiles.push({ type, x, y });
      }
    }
    return tiles;
  };

  const getTileColor = (type: string): string => {
    switch (type) {
      case 'grass':
        return '#2d5016';
      case 'forest':
        return '#1a3a0f';
      case 'water':
        return '#1e5a96';
      case 'mountain':
        return '#6b4423';
      case 'sand':
        return '#c9a961';
      default:
        return '#2d5016';
    }
  };

  const isWalkable = (tile: string): boolean => {
    return tile === 'grass' || tile === 'sand' || tile === 'forest';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const map = generateMap();
    const player = playerRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationId: number;

    const gameLoop = () => {
      // Update player velocity
      player.vx = 0;
      player.vy = 0;

      if (keysPressed.current['arrowup'] || keysPressed.current['w']) player.vy = -player.speed;
      if (keysPressed.current['arrowdown'] || keysPressed.current['s']) player.vy = player.speed;
      if (keysPressed.current['arrowleft'] || keysPressed.current['a']) player.vx = -player.speed;
      if (keysPressed.current['arrowright'] || keysPressed.current['d']) player.vx = player.speed;

      // Calculate new position
      let newX = player.x + player.vx;
      let newY = player.y + player.vy;

      // Collision detection with boundaries and unwalkable tiles
      const checkCollision = (x: number, y: number): boolean => {
        if (x < 0 || x + player.width > MAP_WIDTH * TILE_SIZE) return true;
        if (y < 0 || y + player.height > MAP_HEIGHT * TILE_SIZE) return true;

        const tileX = Math.floor(x / TILE_SIZE);
        const tileY = Math.floor(y / TILE_SIZE);
        const tile = map.find((t) => t.x === tileX && t.y === tileY);

        return tile ? !isWalkable(tile.type) : false;
      };

      if (!checkCollision(newX, player.y)) player.x = newX;
      if (!checkCollision(player.x, newY)) player.y = newY;

      // Clear canvas
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate camera offset
      const cameraX = player.x - canvas.width / 2;
      const cameraY = player.y - canvas.height / 2;

      // Draw tiles
      map.forEach((tile) => {
        const screenX = tile.x * TILE_SIZE - cameraX;
        const screenY = tile.y * TILE_SIZE - cameraY;

        ctx.fillStyle = getTileColor(tile.type);
        ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

        // Draw grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

        // Draw forest decorations
        if (tile.type === 'forest') {
          ctx.fillStyle = '#0d6e1f';
          ctx.fillRect(screenX + 5, screenY + 5, 8, 8);
          ctx.fillRect(screenX + 25, screenY + 25, 8, 8);
        }

        // Draw mountain decorations
        if (tile.type === 'mountain') {
          ctx.fillStyle = '#8b6434';
          ctx.beginPath();
          ctx.moveTo(screenX + 20, screenY + 5);
          ctx.lineTo(screenX + 35, screenY + 35);
          ctx.lineTo(screenX + 5, screenY + 35);
          ctx.closePath();
          ctx.fill();
        }
      });

      // Draw player
      const screenPlayerX = player.x - cameraX;
      const screenPlayerY = player.y - cameraY;

      ctx.fillStyle = '#ff6b35';
      ctx.fillRect(screenPlayerX, screenPlayerY, player.width, player.height);

      // Draw player outline
      ctx.strokeStyle = '#ffaa00';
      ctx.lineWidth = 2;
      ctx.strokeRect(screenPlayerX, screenPlayerY, player.width, player.height);

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [biome]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-yellow-400 mb-2">World Explorer</h1>
          <p className="text-gray-300 text-lg">Use Arrow Keys or WASD to move around</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Canvas */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900 border-4 border-yellow-500 rounded-lg overflow-hidden shadow-2xl">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="text-gray-400 text-center mt-4 text-sm">
              Position: ({Math.round(playerRef.current.x / TILE_SIZE)}, {Math.round(playerRef.current.y / TILE_SIZE)})
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Biome Selector */}
            <div className="bg-slate-800 border-2 border-purple-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Biome</h2>
              <p className="text-white font-bold text-lg mb-4 text-center">{biome}</p>
              <div className="space-y-2">
                <button
                  onClick={() => setBiome('Forest')}
                  className={`w-full py-2 rounded font-bold transition ${
                    biome === 'Forest'
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  🌲 Forest
                </button>
                <button
                  onClick={() => setBiome('Mountain')}
                  className={`w-full py-2 rounded font-bold transition ${
                    biome === 'Mountain'
                      ? 'bg-gray-600 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  ⛰️ Mountain
                </button>
                <button
                  onClick={() => setBiome('Desert')}
                  className={`w-full py-2 rounded font-bold transition ${
                    biome === 'Desert'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  🏜️ Desert
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-slate-800 border-2 border-blue-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-800"></div>
                  <span className="text-gray-300">Grass</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-900"></div>
                  <span className="text-gray-300">Forest</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-700"></div>
                  <span className="text-gray-300">Water</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-700"></div>
                  <span className="text-gray-300">Sand</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-600"></div>
                  <span className="text-gray-300">Player</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-slate-800 border-2 border-green-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Controls</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>
                  <span className="font-bold text-white">↑↓←→</span> or <span className="font-bold text-white">WASD</span>
                </p>
                <p>Move around the world</p>
              </div>
            </div>
          </div>
        </div>

        <a
          href="/"
          className="block text-center bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition mt-8"
        >
          Back to Main Menu
        </a>
      </div>
    </div>
  );
}
