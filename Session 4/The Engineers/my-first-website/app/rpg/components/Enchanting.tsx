'use client';

import { useState } from 'react';
import { Weapon, Equipment, EnchantmentRecipe } from '../types';
import { ENCHANTMENT_RECIPES, MATERIALS, getUpgradeCosts } from '../gameData';
import { RARITY_INFO } from '../gameData';

interface EnchantingProps {
  inventory: (Weapon | Equipment)[];
  equippedWeapon: Weapon;
  equippedArmor: Record<string, Equipment | null>;
  materials: Record<string, number>;
  gold: number;
  onEnchant: (item: Weapon | Equipment, recipe: EnchantmentRecipe) => boolean;
  onUpgrade: (item: Weapon | Equipment) => { success: boolean; item: Weapon | Equipment };
}

export function Enchanting({ 
  inventory, 
  equippedWeapon,
  equippedArmor,
  materials, 
  gold, 
  onEnchant, 
  onUpgrade 
}: EnchantingProps) {
  const [selectedTab, setSelectedTab] = useState<'enchant' | 'upgrade'>('enchant');
  const [selectedItem, setSelectedItem] = useState<Weapon | Equipment | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<EnchantmentRecipe | null>(null);
  const [enchantResult, setEnchantResult] = useState<string | null>(null);

  const allItems = [
    equippedWeapon,
    ...Object.values(equippedArmor).filter(Boolean),
    ...inventory
  ].filter(Boolean) as (Weapon | Equipment)[];

  const handleEnchant = () => {
    if (!selectedItem || !selectedRecipe) return;
    
    onEnchant(selectedItem, selectedRecipe);
    // Result is shown through state changes in parent
    setTimeout(() => setEnchantResult(null), 2000);
  };

  const handleUpgrade = (item: Weapon | Equipment) => {
    const result = onUpgrade(item);
    if (result.success) {
      setEnchantResult('upgrade_success');
    } else {
      setEnchantResult('upgrade_fail');
    }
    setTimeout(() => setEnchantResult(null), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedTab('enchant')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            selectedTab === 'enchant'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
          }`}
        >
          ✨ Enchant
        </button>
        <button
          onClick={() => setSelectedTab('upgrade')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            selectedTab === 'upgrade'
              ? 'bg-amber-600 text-white'
              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
          }`}
        >
          ⬆️ Upgrade
        </button>
      </div>

      {/* Resources */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="bg-gray-900 rounded-lg p-3 text-center">
          <div className="text-2xl mb-1">💰</div>
          <div className="text-sm text-gray-400">Gold</div>
          <div className="font-bold text-yellow-400">{gold}</div>
        </div>
        {Object.entries(materials).slice(0, 3).map(([key, amount]) => (
          <div key={key} className="bg-gray-900 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">{MATERIALS[key]?.icon || '📦'}</div>
            <div className="text-sm text-gray-400">{MATERIALS[key]?.name || key}</div>
            <div className="font-bold text-white">{amount}</div>
          </div>
        ))}
      </div>

      {/* Enchant Tab */}
      {selectedTab === 'enchant' && (
        <div className="space-y-4">
          {/* Recipe Selection */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Select Enchantment
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {ENCHANTMENT_RECIPES.map(recipe => (
                <button
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedRecipe?.id === recipe.id
                      ? 'bg-purple-500/20 border-purple-500'
                      : 'bg-gray-900 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="font-semibold text-white">{recipe.name}</div>
                  <div className="text-sm text-gray-400">{recipe.description}</div>
                  <div className="mt-2 text-xs">
                    <div className="text-yellow-400">💰 {recipe.goldCost} gold</div>
                    <div className="text-blue-400">{Math.floor(recipe.successRate * 100)}% success</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Item Selection */}
          {selectedRecipe && (
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Select Item to Enchant
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                {allItems
                  .filter(item => 
                    selectedRecipe.targetSlot === 'any' || 
                    ('baseDamage' in item && selectedRecipe.targetSlot === 'weapon') ||
                    ('slot' in item && selectedRecipe.targetSlot === 'armor')
                  )
                  .map(item => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`p-2 rounded-lg border text-left ${
                        selectedItem?.id === item.id
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-gray-900 border-gray-700'
                      }`}
                    >
                      <div className="text-sm font-medium text-white truncate">{item.name}</div>
                      {'slot' in item && (
                        <div className="text-xs text-gray-500">{item.slot}</div>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Enchant Button */}
          {selectedItem && selectedRecipe && (
            <div className="p-4 bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-400">Enchant </span>
                  <span className="text-white font-semibold">{selectedItem.name}</span>
                  <span className="text-gray-400"> with </span>
                  <span className="text-purple-400 font-semibold">{selectedRecipe.name}</span>
                </div>
                <button
                  onClick={handleEnchant}
                  disabled={
                    gold < selectedRecipe.goldCost ||
                    Object.entries(selectedRecipe.materials).some(
                      ([mat, amount]) => (materials[mat] || 0) < amount
                    )
                  }
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Enchant
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upgrade Tab */}
      {selectedTab === 'upgrade' && (
        <div>
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Select Item to Upgrade
          </h4>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {allItems.map(item => {
              const costs = getUpgradeCosts(item.upgradeLevel || 0);
              const canAfford = gold >= costs.gold && (materials['upgrade_shard'] || 0) >= costs.materials['upgrade_shard'];

              return (
                <div key={item.id} className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{'baseDamage' in item ? '⚔️' : '🛡️'}</span>
                      <div>
                        <div className="font-semibold text-white">{item.name}</div>
                        <div className="text-sm text-amber-400">+{item.upgradeLevel || 0}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        <span className="text-yellow-400">💰 {costs.gold}</span>
                        <span className="text-blue-400 ml-2">💎 {costs.materials['upgrade_shard']}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.floor(costs.successRate * 100)}% success
                      </div>
                      <button
                        onClick={() => handleUpgrade(item)}
                        disabled={!canAfford}
                        className="mt-2 px-4 py-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
                      >
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Result Message */}
      {enchantResult && (
        <div className={`mt-4 p-3 rounded-lg text-center font-semibold ${
          enchantResult.includes('success')
            ? 'bg-green-500/20 text-green-400 border border-green-500/50'
            : 'bg-red-500/20 text-red-400 border border-red-500/50'
        }`}>
          {enchantResult === 'success' && 'Enchantment successful!'}
          {enchantResult === 'fail' && 'Enchantment failed!'}
          {enchantResult === 'upgrade_success' && 'Upgrade successful!'}
          {enchantResult === 'upgrade_fail' && 'Upgrade failed!'}
        </div>
      )}
    </div>
  );
}
