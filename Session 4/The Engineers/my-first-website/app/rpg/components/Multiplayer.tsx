'use client';

import { useState } from 'react';
import { GameSession, ChatMessage, Character } from '../types';

interface MultiplayerProps {
  gameSession: GameSession | null;
  chatMessages: ChatMessage[];
  isHost: boolean;
  currentCharacter: Character | null;
  onCreateSession: (name: string, maxPlayers: number) => void;
  onJoinSession: (sessionId: string) => void;
  onSendMessage: (message: string) => void;
  onToggleReady: () => void;
  onStartGame: () => void;
}

export function Multiplayer({
  gameSession,
  chatMessages,
  isHost,
  currentCharacter,
  onCreateSession,
  onJoinSession,
  onSendMessage,
  onToggleReady,
  onStartGame
}: MultiplayerProps) {
  const [sessionName, setSessionName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [joinCode, setJoinCode] = useState('');
  const [message, setMessage] = useState('');

  // Lobby Screen
  if (!gameSession) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Multiplayer</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Session */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-4">Create Session</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Session Name</label>
                <input
                  type="text"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  placeholder="My Adventure"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Max Players</label>
                <select
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                >
                  <option value={2}>2 Players</option>
                  <option value={3}>3 Players</option>
                  <option value={4}>4 Players</option>
                </select>
              </div>
              <button
                onClick={() => onCreateSession(sessionName || 'Adventure Party', maxPlayers)}
                className="w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded transition-colors"
              >
                Create Session
              </button>
            </div>
          </div>

          {/* Join Session */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-4">Join Session</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Session Code</label>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="ABC1234"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white uppercase"
                  maxLength={7}
                />
              </div>
              <button
                onClick={() => onJoinSession(joinCode)}
                disabled={joinCode.length < 6}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors"
              >
                Join Session
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <h5 className="text-blue-400 font-semibold mb-2">💡 Multiplayer Tips</h5>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Share loot equally among party members</li>
            <li>• Tanks should lead, Mages stay back</li>
            <li>• Coordinate ultimates for tough bosses</li>
            <li>• Dungeons scale difficulty with party size</li>
          </ul>
        </div>
      </div>
    );
  }

  // Game Session Screen
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      {/* Session Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">{gameSession.name}</h3>
          <p className="text-sm text-gray-400">Code: <span className="text-amber-400 font-mono">{gameSession.id}</span></p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">
            {gameSession.players.filter(p => p.isReady).length} / {gameSession.players.length} Ready
          </div>
          <div className="text-xs text-gray-500">
            {gameSession.players.length} / {gameSession.maxPlayers} Players
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player List */}
        <div className="lg:col-span-1 space-y-2">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Players</h4>
          {gameSession.players.map(player => (
            <div 
              key={player.id}
              className={`p-3 rounded-lg border ${
                player.isReady 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-gray-900 border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {player.id === currentCharacter?.id ? '👤' : '👥'}
                  </span>
                  <div>
                    <div className="font-semibold text-white">{player.name}</div>
                    <div className="text-xs text-gray-500">
                      Lv.{player.character.level} {player.character.classType}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {player.isHost && (
                    <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded">HOST</span>
                  )}
                  {player.isReady ? (
                    <span className="text-green-400">✓</span>
                  ) : (
                    <span className="text-gray-600">○</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Ready Button */}
          <button
            onClick={onToggleReady}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              gameSession.players.find(p => p.id === currentCharacter?.id)?.isReady
                ? 'bg-green-600 hover:bg-green-500 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {gameSession.players.find(p => p.id === currentCharacter?.id)?.isReady ? 'Ready!' : 'Mark Ready'}
          </button>

          {/* Start Button (Host only) */}
          {isHost && (
            <button
              onClick={onStartGame}
              disabled={!gameSession.players.every(p => p.isReady)}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            >
              Start Game
            </button>
          )}
        </div>

        {/* Chat */}
        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Party Chat</h4>
          
          {/* Messages */}
          <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto mb-3">
            {chatMessages.length === 0 ? (
              <p className="text-gray-600 text-center italic">No messages yet...</p>
            ) : (
              <div className="space-y-2">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`text-sm ${
                    msg.type === 'system' ? 'text-amber-400 italic' : 'text-gray-300'
                  }`}>
                    {msg.type !== 'system' && (
                      <span className="font-semibold text-blue-400">{msg.playerName}: </span>
                    )}
                    {msg.message}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && message.trim()) {
                  onSendMessage(message);
                  setMessage('');
                }
              }}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
            />
            <button
              onClick={() => {
                if (message.trim()) {
                  onSendMessage(message);
                  setMessage('');
                }
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
