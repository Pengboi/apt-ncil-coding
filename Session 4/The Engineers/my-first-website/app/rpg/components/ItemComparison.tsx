'use client';

import { useState } from 'react';
import { Equipment, Weapon } from '../types';
import { RARITY_INFO } from '../gameData';

interface ItemComparisonProps {
  newItem: Equipment | Weapon;
  equippedItem: Equipment | Weapon | null;
  onEquip: () => void;
  onClose: () => void;
}

export function ItemComparison({ newItem, equippedItem, onEquip, onClose }: ItemComparisonProps) {
  const isEquipment = 'slot' in newItem;
  const isWeapon = 'baseDamage' in newItem;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-amber-500/50 shadow-2xl max-w-2xl w-full">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white text-center mb-6">Compare Equipment</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Currently Equipped */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Currently Equipped</div>
              {equippedItem ? (
                <ItemDisplay item={equippedItem} isNew={false} />
              ) : (
                <div className="text-gray-600 italic">Nothing equipped</div>
              )}
            </div>

            {/* New Item */}
            <div className="bg-gradient-to-b from-amber-500/10 to-orange-500/10 rounded-lg p-4 border border-amber-500/30">
              <div className="text-sm text-amber-400 uppercase tracking-wider mb-2">New Item</div>
              <ItemDisplay item={newItem} isNew={true} compareTo={equippedItem} />
            </div>
          </div>

          {/* Comparison Summary */}
          {equippedItem && (
            <div className="mt-4 p-3 bg-gray-900 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Stat Changes:</div>
              <ComparisonStats newItem={newItem} oldItem={equippedItem} />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Keep Current
            </button>
            <button
              onClick={onEquip}
              className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-lg transition-colors"
            >
              Equip New Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemDisplay({ 
  item, 
  isNew, 
  compareTo 
}: { 
  item: Equipment | Weapon; 
  isNew: boolean;
  compareTo?: Equipment | Weapon | null;
}) {
  const isEquipment = 'slot' in item;
  const isWeapon = 'baseDamage' in item;
  const rarity = isEquipment 
    ? RARITY_INFO[(item as Equipment).rarity] || RARITY_INFO.common
    : RARITY_INFO.epic; // Weapons don't have rarity, default to epic for display

  const getStatDiff = (stat: number, compareStat?: number) => {
    if (!compareTo) return null;
    const diff = stat - (compareStat || 0);
    if (diff === 0) return null;
    return {
      value: diff > 0 ? `+${diff}` : `${diff}`,
      color: diff > 0 ? 'text-green-400' : 'text-red-400'
    };
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{item.icon || (isWeapon ? '⚔️' : '🛡️')}</span>
        <span className="font-bold" style={{ color: rarity.color }}>
          {item.name}
        </span>
      </div>

      <div className="text-xs mb-3" style={{ color: rarity.color }}>
        {rarity.label}
      </div>

      {isWeapon && (
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Damage:</span>
            <div>
              <span className="text-white">{item.baseDamage}</span>
              {compareTo && 'baseDamage' in compareTo && (
                <ComparisonDiff 
                  value={item.baseDamage} 
                  compare={compareTo.baseDamage}
                  higherIsBetter={true}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Type:</span>
            <span className="text-white capitalize">{item.damageType}</span>
          </div>
        </div>
      )}

      {isEquipment && (
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Defense:</span>
            <div>
              <span className="text-white">
                {Math.floor(item.defense * rarity.statMult)}
              </span>
              {compareTo && 'defense' in compareTo && (
                <ComparisonDiff 
                  value={item.defense * rarity.statMult} 
                  compare={(compareTo as Equipment).defense * (RARITY_INFO[compareTo.rarity]?.statMult || 1)}
                  higherIsBetter={true}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Weight:</span>
            <div>
              <span className="text-white">{item.weight}</span>
              {compareTo && 'weight' in compareTo && (
                <ComparisonDiff 
                  value={item.weight} 
                  compare={(compareTo as Equipment).weight}
                  higherIsBetter={false}
                />
              )}
            </div>
          </div>
          {item.passives.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-700">
              {item.passives.map((passive, idx) => (
                <div key={idx} className="text-xs text-green-400">
                  +{passive.value}{passive.unit} {passive.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isWeapon && (item as Weapon).ability && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="text-xs text-amber-400 font-semibold">{(item as Weapon).ability!.name}</div>
          <div className="text-xs text-gray-400">{(item as Weapon).ability!.description.slice(0, 60)}...</div>
        </div>
      )}

      {(item.upgradeLevel || 0) > 0 && (
        <div className="mt-2 text-amber-400 text-sm">
          +{item.upgradeLevel}
        </div>
      )}
    </div>
  );
}

function ComparisonDiff({ 
  value, 
  compare, 
  higherIsBetter 
}: { 
  value: number; 
  compare: number;
  higherIsBetter: boolean;
}) {
  const diff = value - compare;
  if (Math.abs(diff) < 0.1) return null;

  const isPositive = higherIsBetter ? diff > 0 : diff < 0;
  const color = isPositive ? 'text-green-400' : 'text-red-400';
  const sign = diff > 0 ? '+' : '';

  return (
    <span className={`ml-2 text-xs ${color}`}>
      ({sign}{diff.toFixed(1)})
    </span>
  );
}

function ComparisonStats({ newItem, oldItem }: { newItem: Equipment | Weapon; oldItem: Equipment | Weapon }) {
  const comparisons: { label: string; new: string; old: string; better: boolean }[] = [];

  if ('baseDamage' in newItem && 'baseDamage' in oldItem) {
    comparisons.push({
      label: 'Damage',
      new: newItem.baseDamage.toString(),
      old: oldItem.baseDamage.toString(),
      better: newItem.baseDamage > oldItem.baseDamage
    });
  }

  if ('defense' in newItem && 'defense' in oldItem) {
    comparisons.push({
      label: 'Defense',
      new: Math.floor(newItem.defense * RARITY_INFO[newItem.rarity].statMult).toString(),
      old: Math.floor((oldItem as Equipment).defense * RARITY_INFO[oldItem.rarity].statMult).toString(),
      better: newItem.defense > (oldItem as Equipment).defense
    });
  }

  if ('weight' in newItem && 'weight' in oldItem) {
    comparisons.push({
      label: 'Weight',
      new: newItem.weight.toString(),
      old: (oldItem as Equipment).weight.toString(),
      better: newItem.weight < (oldItem as Equipment).weight
    });
  }

  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
      {comparisons.map(comp => (
        <div key={comp.label} className="text-center">
          <div className="text-gray-500 text-xs">{comp.label}</div>
          <div className={`font-bold ${comp.better ? 'text-green-400' : 'text-red-400'}`}>
            {comp.better ? '▲' : '▼'} {Math.abs(parseInt(comp.new) - parseInt(comp.old))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Hook for showing comparison
export function useItemComparison() {
  const [comparingItem, setComparingItem] = useState<{
    newItem: Equipment | Weapon;
    equippedItem: Equipment | Weapon | null;
    onEquip: () => void;
  } | null>(null);

  const showComparison = (
    newItem: Equipment | Weapon,
    equippedItem: Equipment | Weapon | null,
    onEquip: () => void
  ) => {
    setComparingItem({ newItem, equippedItem, onEquip });
  };

  const closeComparison = () => {
    setComparingItem(null);
  };

  return { comparingItem, showComparison, closeComparison };
}
