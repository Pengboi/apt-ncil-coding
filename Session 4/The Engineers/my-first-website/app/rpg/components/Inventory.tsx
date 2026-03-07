'use client';

import { useState } from 'react';
import { Equipment, ArmorSlot, Weapon } from '../types';
import { RARITY_INFO, SLOT_LABELS } from '../gameData';

interface InventoryProps {
  items: (Equipment | Weapon)[];
  onEquip: (item: Equipment) => void;
  onDiscard: (itemId: string) => void;
}

type SortOption = 'rarity' | 'slot' | 'defense';
type FilterOption = 'all' | ArmorSlot | 'ring';

export function Inventory({ items, onEquip, onDiscard }: InventoryProps) {
  const [sortBy, setSortBy] = useState<SortOption>('rarity');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const rarityOrder = ['mythic', 'legendary', 'epic', 'rare', 'uncommon', 'common'];

  // Filter out weapons (only show equipment) and apply slot filter
  const equipmentItems = items.filter((item): item is Equipment => 'slot' in item);
  
  const filteredItems = equipmentItems.filter(item => {
    if (filterBy === 'all') return true;
    if (filterBy === 'ring') return item.slot === 'ring1' || item.slot === 'ring2';
    return item.slot === filterBy;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'rarity':
        return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
      case 'defense':
        return b.defense - a.defense;
      case 'slot':
        return a.slot.localeCompare(b.slot);
      default:
        return 0;
    }
  });

  if (equipmentItems.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
        <div className="text-4xl mb-4">🎒</div>
        <h3 className="text-lg font-semibold text-gray-400">Inventory Empty</h3>
        <p className="text-sm text-gray-500">Defeat enemies to find loot!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-bold text-white">Inventory ({equipmentItems.length})</h3>
        
        <div className="flex gap-2">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as FilterOption)}
            className="px-3 py-1 bg-gray-900 border border-gray-600 rounded text-sm text-white"
          >
            <option value="all">All Slots</option>
            <option value="head">Head</option>
            <option value="chest">Chest</option>
            <option value="legs">Legs</option>
            <option value="hands">Hands</option>
            <option value="feet">Feet</option>
            <option value="ring">Rings</option>
            <option value="amulet">Amulet</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-1 bg-gray-900 border border-gray-600 rounded text-sm text-white"
          >
            <option value="rarity">Sort by Rarity</option>
            <option value="defense">Sort by Defense</option>
            <option value="slot">Sort by Slot</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {sortedItems.map((item) => (
          <InventoryItem 
            key={item.id} 
            item={item} 
            onEquip={() => onEquip(item)}
            onDiscard={() => onDiscard(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

function InventoryItem({ 
  item, 
  onEquip, 
  onDiscard 
}: { 
  item: Equipment; 
  onEquip: () => void;
  onDiscard: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const rarity = RARITY_INFO[item.rarity];
  const effectiveDefense = Math.floor(item.defense * rarity.statMult);

  return (
    <div 
      className={`bg-gray-900 rounded-lg border p-3 cursor-pointer transition-all hover:bg-gray-800`}
      style={{ borderColor: rarity.color + '40' }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded flex items-center justify-center text-xl"
            style={{ backgroundColor: rarity.color + '20' }}
          >
            {item.icon || '🛡️'}
          </div>
          <div>
            <div className="font-semibold" style={{ color: rarity.color }}>
              {item.name}
            </div>
            <div className="text-xs text-gray-500">
              {SLOT_LABELS[item.slot]} • DEF {effectiveDefense} • Lv.{item.levelRequirement}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span 
            className="px-2 py-1 rounded text-xs font-medium"
            style={{ 
              backgroundColor: rarity.color + '20', 
              color: rarity.color 
            }}
          >
            {rarity.label}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onEquip(); }}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white text-xs rounded transition-colors"
          >
            Equip
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDiscard(); }}
            className="px-2 py-1 text-gray-500 hover:text-red-400 text-xs transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-2">{item.description}</p>
          
          {item.passives.length > 0 && (
            <div className="mb-2">
              <div className="text-xs text-gray-500 uppercase mb-1">Passives</div>
              {item.passives.map((passive, idx) => (
                <div key={idx} className="text-sm text-green-400">
                  +{passive.value}{passive.unit} {passive.label}
                </div>
              ))}
            </div>
          )}

          {item.uniquePassive && (
            <div className="text-sm text-amber-400">
              <span className="font-semibold">[UNIQUE]</span> {item.uniquePassive}
            </div>
          )}

          <div className="text-xs text-gray-600 mt-2">Weight: {item.weight}</div>
        </div>
      )}
    </div>
  );
}
