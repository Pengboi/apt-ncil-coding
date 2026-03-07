'use client';

import { ArmorSlot, Equipment } from '../types';
import { SLOT_LABELS, RARITY_INFO } from '../gameData';

interface EquipmentGridProps {
  equippedArmor: Record<ArmorSlot, Equipment | null>;
  onUnequip: (slot: ArmorSlot) => void;
}

const SLOT_ICONS: Record<ArmorSlot, string> = {
  head: '🪖',
  chest: '👕',
  legs: '👖',
  hands: '🧤',
  feet: '👢',
  ring1: '💍',
  ring2: '💎',
  amulet: '📿'
};

export function EquipmentGrid({ equippedArmor, onUnequip }: EquipmentGridProps) {
  const slots: ArmorSlot[] = ['head', 'chest', 'legs', 'hands', 'feet', 'ring1', 'ring2', 'amulet'];

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-bold text-white mb-4">Equipped Gear</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {slots.map((slot) => {
          const item = equippedArmor[slot];
          
          return (
            <div
              key={slot}
              className={`relative rounded-lg border p-3 min-h-[100px] ${
                item 
                  ? `bg-gradient-to-br from-gray-700 to-gray-800 border-${RARITY_INFO[item.rarity]?.bgColor.replace('bg-', '') || 'gray-600'}` 
                  : 'bg-gray-900/50 border-gray-700 border-dashed'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl">{SLOT_ICONS[slot]}</span>
                {item && (
                  <button
                    onClick={() => onUnequip(slot)}
                    className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                    title="Unequip"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              <div className="mt-2">
                <div className="text-xs text-gray-500 uppercase">{SLOT_LABELS[slot]}</div>
                {item ? (
                  <>
                    <div className="font-semibold text-sm" style={{ color: RARITY_INFO[item.rarity]?.color || '#fff' }}>
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-400">DEF: {Math.floor(item.defense * (RARITY_INFO[item.rarity]?.statMult || 1))}</div>
                    {item.passives.length > 0 && (
                      <div className="mt-1 text-xs text-green-400">
                        {item.passives.length} passive{item.passives.length > 1 ? 's' : ''}
                      </div>
                    )}
                    {item.uniquePassive && (
                      <div className="mt-1 text-xs text-amber-400">
                        [UNIQUE]
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-sm text-gray-600 italic">Empty</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Weight */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Weight:</span>
          <span className="text-white">
            {Object.values(equippedArmor)
              .reduce((sum, item) => sum + (item?.weight || 0), 0)
              .toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
