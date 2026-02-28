'use client';

import { useEffect, useRef, useCallback } from 'react';
import { GameEngine } from './GameEngine';

// ============================================================
// GAME CANVAS - React Component Wrapper
// ============================================================

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameEngine | null>(null);
  
  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create game instance
    const game = new GameEngine(canvas);
    gameRef.current = game;
    
    // Start game loop
    game.start();
    
    // Cleanup on unmount
    return () => {
      game.stop();
      gameRef.current = null;
    };
  }, []);
  
  // Keyboard event handlers
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const game = gameRef.current;
    if (!game) return;
    
    // Prevent default for game keys to avoid page scrolling
    const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'];
    if (gameKeys.includes(e.key)) {
      e.preventDefault();
    }
    
    game.setKeyDown(e.key);
  }, []);
  
  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    const game = gameRef.current;
    if (!game) return;
    
    game.setKeyUp(e.key);
  }, []);
  
  // Mouse event handlers
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const game = gameRef.current;
    if (!game) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    game.setMousePosition(x, y);
  }, []);
  
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const game = gameRef.current;
    if (!game) return;
    
    // Left mouse button = shoot
    if (e.button === 0) {
      game.setMouseDown(true);
    }
  }, []);
  
  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    const game = gameRef.current;
    if (!game) return;
    
    if (e.button === 0) {
      game.setMouseDown(false);
    }
  }, []);
  
  // Focus canvas on click to capture keyboard input
  const handleClick = useCallback(() => {
    canvasRef.current?.focus();
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Game Title */}
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">TACTICAL OPS</h1>
        <p className="text-gray-400">Military Adventure Platformer</p>
      </div>
      
      {/* Game Canvas */}
      <div className="relative border-4 border-gray-700 rounded-lg overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          width={1200}
          height={700}
          className="block cursor-crosshair focus:outline-none focus:ring-2 focus:ring-blue-500"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}

          onClick={handleClick}
        />
        
        {/* Click to play overlay (shown when canvas not focused) */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="bg-black bg-opacity-70 px-6 py-4 rounded-lg">
            <p className="text-white text-lg font-bold">Click to Play</p>
          </div>
        </div>
      </div>
      
      {/* Controls Reference */}
      <div className="mt-6 grid grid-cols-2 gap-8 text-gray-300 text-sm">
        <div>
          <h3 className="font-bold text-white mb-2">Movement</h3>
          <ul className="space-y-1">
            <li><span className="text-blue-400">WASD</span> or <span className="text-blue-400">Arrow Keys</span> - Move</li>
            <li><span className="text-blue-400">SPACE</span> or <span className="text-blue-400">W/↑</span> - Jump</li>
            <li><span className="text-blue-400">S/↓</span> - Crouch</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Combat & Interaction</h3>
          <ul className="space-y-1">
            <li><span className="text-blue-400">Mouse</span> - Aim</li>
            <li><span className="text-blue-400">M</span> or <span className="text-blue-400">LMB</span> - Shoot</li>
            <li><span className="text-blue-400">1-5</span> - Switch Weapons</li>
            <li><span className="text-blue-400">E</span> - Save at Terminal</li>
          </ul>
        </div>
      </div>
      
      {/* Game Info */}
      <div className="mt-4 text-gray-500 text-xs">
        <p>Explore 5 areas • Find save points • Level up your character</p>
      </div>
    </div>
  );
}
