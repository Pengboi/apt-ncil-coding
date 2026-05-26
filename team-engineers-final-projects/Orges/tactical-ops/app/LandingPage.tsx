'use client';

import { useState, useEffect } from 'react';

interface LandingPageProps {
  onEnterGame: () => void;
}

const BOOT_TEXT = [
  '>>> ESTABLISHING SECURE CONNECTION...',
  '>>> ENCRYPTION: AES-256-GCM',
  '>>> HANDSHAKE VERIFIED',
  '>>> CLEARANCE LEVEL: CONFIRMED',
  '',
  '>>> LOADING TACTICAL OPERATIONS SYSTEM...',
  '>>> MOUNTING FILESYSTEMS...',
  '>>> INITIALIZING COMBAT MODULES...',
  '>>> LOADING ASSETS...',
  '>>> CALIBRATING WEAPON SYSTEMS...',
  '>>> SPAWNING ENEMY UNITS...',
  '>>> SYSTEM READY',
  '',
  '>>> ENTERING COMBAT ZONE...',
];

export default function LandingPage({ onEnterGame }: LandingPageProps) {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  // Boot sequence animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex(prev => {
        if (prev < BOOT_TEXT.length) {
          setTerminalLines(lines => [...lines, BOOT_TEXT[prev]]);
          return prev + 1;
        }
        return prev;
      });
    }, 350);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  // Auto transition when complete
  useEffect(() => {
    if (lineIndex >= BOOT_TEXT.length && progress >= 100) {
      const timeout = setTimeout(() => {
        onEnterGame();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, progress, onEnterGame]);

  const getLineColor = (line: string) => {
    if (line.includes('READY')) return 'text-[#00ff41] terminal-glow-green';
    if (line.includes('ERROR') || line.includes('FAILED')) return 'text-[#d93025]';
    if (line.includes('ENEMY') || line.includes('COMBAT')) return 'text-[#ff6b00]';
    if (line.includes('>>>')) return 'text-[#ffb000]';
    return 'text-[#8b8b8b]';
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] tactical-grid overflow-hidden relative flex items-center justify-center">
      {/* Corner HUD Elements */}
      <div className="corner-accent tl" />
      <div className="corner-accent tr" />
      <div className="corner-accent bl" />
      <div className="corner-accent br" />

      {/* Top Security Banner */}
      <div className="fixed top-0 left-0 right-0 h-8 bg-[#d93025] flex items-center justify-center z-50">
        <span className="font-[var(--font-display)] text-black text-sm font-bold tracking-[0.3em] animate-pulse">
          ⚠ TOP SECRET - TACTICAL OPS SYSTEM ⚠
        </span>
      </div>

      {/* Main Terminal Window */}
      <div className="w-full max-w-4xl mx-4 terminal-window p-8 animate-fade-in">
        {/* Terminal Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-[#00ff41] animate-pulse rounded-full" />
            <span className="font-[var(--font-terminal)] text-sm text-[#00ff41]">
              SECURE TERMINAL v4.2.1 // BLACK OPS DIVISION
            </span>
          </div>
          <div className="font-[var(--font-terminal)] text-xs text-[#8b8b8b]">
            {new Date().toISOString().replace('T', ' ').slice(0, 19)} UTC
          </div>
        </div>

        {/* Terminal Output */}
        <div className="min-h-[300px] font-[var(--font-terminal)] text-sm space-y-1">
          {terminalLines.map((line, index) => (
            <div
              key={index}
              className={`${getLineColor(line)} ${line.includes('READY') ? 'font-bold' : ''}`}
            >
              {line}
              {index === terminalLines.length - 1 && index < BOOT_TEXT.length && (
                <span className="blink-cursor" />
              )}
            </div>
          ))}
          {lineIndex >= BOOT_TEXT.length && (
            <div className="text-[#00ff41] terminal-glow-green mt-4 font-bold">
              {'>>> DEPLOYING TO COMBAT ZONE...'}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-xs font-[var(--font-terminal)] text-[#8b8b8b] mb-2">
            <span>SYSTEM INITIALIZATION</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="h-2 bg-[#0d1a0d] border border-[#1a3d1a]">
            <div
              className="h-full bg-[#ffb000] relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-r from-[#ffb000] to-transparent" />
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-6 flex justify-between text-xs font-[var(--font-terminal)] text-[#4a4a4a]">
          <span>MEM: 64TB OK</span>
          <span>CPU: 128-CORE ACTIVE</span>
          <span>GPU: TACTICAL RENDERING</span>
          <span>NET: QUANTUM ENCRYPTED</span>
          <span>ASSETS: {Math.floor(progress * 0.25)}% LOADED</span>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <div className="font-[var(--font-terminal)] text-xs text-[#4a4a4a] tracking-wider">
          TACTICAL OPS v4.2.1 // BARKING & DAGENHAM NCIL // APT CODING CAMP
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="fixed top-1/3 left-0 w-16 h-px bg-gradient-to-r from-transparent to-[#ffb000] opacity-20" />
      <div className="fixed top-2/3 right-0 w-16 h-px bg-gradient-to-l from-transparent to-[#ffb000] opacity-20" />
    </div>
  );
}
