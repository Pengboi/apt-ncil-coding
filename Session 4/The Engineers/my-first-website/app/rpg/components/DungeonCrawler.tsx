'use client';

import { Dungeon, Room, RoomType } from '../types';
import { DUNGEONS } from '../gameData';

interface DungeonCrawlerProps {
  currentDungeon: Dungeon | null;
  playerLevel: number;
  onStartDungeon: (dungeonId: string) => void;
  onMoveToRoom: (roomId: string) => void;
  onExitDungeon: () => void;
}

const ROOM_ICONS: Record<RoomType, string> = {
  start: '🚪',
  combat: '⚔️',
  elite: '👹',
  boss: '👿',
  treasure: '💎',
  shop: '🏪',
  rest: '🔥',
  event: '❓',
  exit: '🏃'
};

const ROOM_COLORS: Record<RoomType, string> = {
  start: 'bg-green-500/20 border-green-500/50',
  combat: 'bg-red-500/20 border-red-500/50',
  elite: 'bg-orange-500/20 border-orange-500/50',
  boss: 'bg-purple-500/20 border-purple-500/50',
  treasure: 'bg-yellow-500/20 border-yellow-500/50',
  shop: 'bg-blue-500/20 border-blue-500/50',
  rest: 'bg-amber-500/20 border-amber-500/50',
  event: 'bg-pink-500/20 border-pink-500/50',
  exit: 'bg-gray-500/20 border-gray-500/50'
};

export function DungeonCrawler({ 
  currentDungeon, 
  playerLevel, 
  onStartDungeon, 
  onMoveToRoom, 
  onExitDungeon 
}: DungeonCrawlerProps) {
  if (!currentDungeon) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Dungeon Explorer</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DUNGEONS.map(dungeon => (
            <div 
              key={dungeon.id} 
              className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-colors"
            >
              <h4 className="font-bold text-white mb-2">{dungeon.name}</h4>
              <p className="text-sm text-gray-400 mb-3">{dungeon.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">
                  Difficulty: {Array(dungeon.difficulty).fill('⭐').join('')}
                </span>
                <button
                  onClick={() => onStartDungeon(dungeon.id)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm rounded transition-colors"
                >
                  Enter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentRoom = currentDungeon.rooms.find(r => r.id === currentDungeon.currentRoom);
  const connectedRooms = currentRoom?.connections
    .map(id => currentDungeon.rooms.find(r => r.id === id))
    .filter(Boolean) as Room[] || [];

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">{currentDungeon.name}</h3>
          <p className="text-sm text-gray-400">{currentDungeon.description}</p>
        </div>
        <button
          onClick={onExitDungeon}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
        >
          Exit Dungeon
        </button>
      </div>

      {/* Dungeon Map */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Map</h4>
        <div className="flex flex-wrap gap-2">
          {currentDungeon.rooms.map(room => (
            <div
              key={room.id}
              className={`w-12 h-12 rounded-lg border flex items-center justify-center text-xl ${
                room.id === currentDungeon.currentRoom
                  ? 'bg-amber-500/30 border-amber-500 ring-2 ring-amber-500/50'
                  : room.visited
                  ? 'bg-gray-800 border-gray-600'
                  : room.connections.includes(currentDungeon.currentRoom)
                  ? ROOM_COLORS[room.type]
                  : 'bg-gray-800/50 border-gray-700 opacity-50'
              }`}
              title={`${room.type}${room.id === currentDungeon.currentRoom ? ' (Current)' : ''}`}
            >
              {ROOM_ICONS[room.type]}
            </div>
          ))}
        </div>
      </div>

      {/* Current Room */}
      {currentRoom && (
        <div className={`rounded-lg border p-6 ${ROOM_COLORS[currentRoom.type]}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{ROOM_ICONS[currentRoom.type]}</span>
            <div>
              <h4 className="text-2xl font-bold text-white capitalize">{currentRoom.type} Room</h4>
              <p className="text-gray-300">
                {currentRoom.type === 'combat' && 'Enemies lurk in the shadows...'}
                {currentRoom.type === 'elite' && 'A powerful enemy awaits!'}
                {currentRoom.type === 'boss' && 'The final challenge!'}
                {currentRoom.type === 'treasure' && 'Riches await the brave!'}
                {currentRoom.type === 'shop' && 'A merchant offers their wares.'}
                {currentRoom.type === 'rest' && 'A safe place to recover.'}
                {currentRoom.type === 'start' && 'Your journey begins here.'}
              </p>
            </div>
          </div>

          {/* Connected Rooms */}
          <div className="mt-4">
            <h5 className="text-sm font-semibold text-gray-400 mb-2">Connected Rooms:</h5>
            <div className="flex gap-2 flex-wrap">
              {connectedRooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => onMoveToRoom(room.id)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    ROOM_COLORS[room.type]
                  } hover:brightness-110`}
                >
                  <span className="mr-2">{ROOM_ICONS[room.type]}</span>
                  <span className="text-white capitalize">{room.type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dungeon Progress */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-400">
          Progress: {currentDungeon.rooms.filter(r => r.visited).length} / {currentDungeon.rooms.length} rooms explored
        </span>
        {currentDungeon.completed && (
          <span className="text-green-400 font-bold">Dungeon Completed!</span>
        )}
      </div>
    </div>
  );
}
