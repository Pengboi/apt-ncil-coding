'use client';

import { LootDrop } from '../types';
import { RARITY_INFO } from '../gameData';

interface LootModalProps {
  loot: LootDrop;
  onClose: () => void;
}

export function LootModal({ loot, onClose }: LootModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-amber-500/50 shadow-2xl shadow-amber-500/20 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🎁</div>
            <h2 className="text-2xl font-bold text-white">Loot Acquired!</h2>
            <p className="text-amber-400">You found {loot.equipment.length} items</p>
          </div>

          {/* Gold */}
          {loot.gold > 0 && (
            <div className="bg-gradient-to-r from-yellow-600/20 to-amber-600/20 rounded-lg border border-yellow-500/30 p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  <span className="text-yellow-400 font-bold">Gold</span>
                </div>
                <span className="text-2xl font-bold text-yellow-400">{loot.gold}</span>
              </div>
            </div>
          )}

          {/* Equipment */}
          <div className="space-y-3 mb-6">
            {loot.equipment.map((item, idx) => {
              const rarity = RARITY_INFO[item.rarity];
              const effectiveDefense = Math.floor(item.defense * rarity.statMult);

              return (
                <div 
                  key={idx}
                  className="bg-gray-900 rounded-lg border p-4"
                  style={{ borderColor: rarity.color + '50' }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: rarity.color + '20' }}
                    >
                      {item.icon || '🛡️'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold" style={{ color: rarity.color }}>
                          {item.name}
                        </span>
                        <span 
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ backgroundColor: rarity.color + '30', color: rarity.color }}
                        >
                          {rarity.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                      
                      <div className="text-sm text-gray-500 mb-2">
                        Defense: <span className="text-white">{effectiveDefense}</span> • 
                        Weight: <span className="text-white">{item.weight}</span> •
                        Level Req: <span className="text-white">{item.levelRequirement}</span>
                      </div>

                      {item.passives.length > 0 && (
                        <div className="space-y-1">
                          {item.passives.map((passive, pidx) => (
                            <div key={pidx} className="text-sm text-green-400">
                              +{passive.value}{passive.unit} {passive.label}
                            </div>
                          ))}
                        </div>
                      )}

                      {item.uniquePassive && (
                        <div className="mt-2 text-sm text-amber-400 border-t border-gray-700 pt-2">
                          <span className="font-semibold">[UNIQUE]</span> {item.uniquePassive}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all"
          >
            Collect Loot
          </button>
        </div>
      </div>
    </div>
  );
}
