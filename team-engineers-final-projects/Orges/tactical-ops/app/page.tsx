'use client';

import { useState } from 'react';
import LandingPage from './LandingPage';
import GameCanvas from './game/GameCanvas';

export default function Home() {
  const [showGame, setShowGame] = useState(false);

  const handleEnterGame = () => {
    setShowGame(true);
  };

  return (
    <main className="min-h-screen bg-[#050505]">
      {showGame ? (
        <GameCanvas />
      ) : (
        <LandingPage onEnterGame={handleEnterGame} />
      )}
    </main>
  );
}
