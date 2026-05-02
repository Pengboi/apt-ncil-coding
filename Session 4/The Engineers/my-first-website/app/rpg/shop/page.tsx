'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import { getGold, spendGold, addItemToInventory, getInventory } from '../data/storage';
import { EQUIPMENT_ITEMS, CONSUMABLE_ITEMS, Item, RARITY_COLORS, RARITY_NAMES } from '../data/items';

export default function ShopPage() {
  const [gold, setGold] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [maxSlots, setMaxSlots] = useState(20);
  const [activeCategory, setActiveCategory] = useState<'all' | 'weapons' | 'armor' | 'accessories' | 'consumables'>('all');
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

  // Load gold and inventory on mount
  useEffect(() => {
    refreshData();
  }, []);

  function refreshData() {
    setGold(getGold());
    const inv = getInventory();
    setInventoryCount(inv.items.reduce((sum, item) => sum + item.quantity, 0));
    setMaxSlots(inv.maxSlots);
  }

  function handleBuyItem(item: Item) {
    // Check if inventory is full
    if (inventoryCount >= maxSlots) {
      setPurchaseMessage(`❌ Inventory full! Sell or discard items first.`);
      setTimeout(() => setPurchaseMessage(null), 3000);
      return;
    }

    // Check if player has enough gold
    if (gold < item.buyPrice) {
      setPurchaseMessage(`❌ Not enough gold! Need 🪙${item.buyPrice}, have 🪙${gold}`);
      setTimeout(() => setPurchaseMessage(null), 3000);
      return;
    }

    // Spend gold and add item
    const success = spendGold(item.buyPrice);
    if (success) {
      addItemToInventory(item.id);
      refreshData();
      setPurchaseMessage(`✅ Purchased ${item.name} for 🪙${item.buyPrice}!`);
      setTimeout(() => setPurchaseMessage(null), 3000);
    }
  }

  // Get shop items (exclude boss drops)
  const shopItems = [...EQUIPMENT_ITEMS, ...CONSUMABLE_ITEMS];

  // Filter by category
  const filteredItems = shopItems.filter(item => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'weapons') return item.type === 'weapon';
    if (activeCategory === 'armor') return item.type === 'armor';
    if (activeCategory === 'accessories') return item.type === 'accessory';
    if (activeCategory === 'consumables') return item.type === 'consumable';
    return true;
  });

  // Sort by buy price (lowest first)
  const sortedItems = filteredItems.sort((a, b) => a.buyPrice - b.buyPrice);

  return (
    <main className="min-h-screen bg-[var(--void)] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-50" />
      <div className="fixed inset-0 noise-overlay" />
      <div className="fixed inset-0 scanlines" />
      
      {/* Gradient orbs */}
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-[var(--legendary-amber)] rounded-full blur-[150px] opacity-20" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-[var(--arcane-cyan)] rounded-full blur-[150px] opacity-20" />

      <section className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--legendary-amber)] to-[#d4ac0d] p-0.5 mb-6 animate-float">
              <div className="w-full h-full rounded-2xl bg-[var(--surface)] flex items-center justify-center text-5xl">
                🏪
              </div>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
              Merchant <span className="text-[var(--legendary-amber)]">Shop</span>
            </h1>
            <p className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto">
              Spend your gold on weapons, armor, and magical items to become stronger!
            </p>
          </div>

          {/* Gold & Inventory Status */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="glass-card rounded-xl px-8 py-4">
              <div className="font-body text-sm text-[var(--text-muted)] uppercase tracking-wider">Your Gold</div>
              <div className="font-display text-3xl font-bold text-[var(--legendary-amber)]">
                🪙 {gold}
              </div>
            </div>
            <div className="glass-card rounded-xl px-8 py-4">
              <div className="font-body text-sm text-[var(--text-muted)] uppercase tracking-wider">Inventory</div>
              <div className={`font-display text-3xl font-bold ${inventoryCount >= maxSlots ? 'text-red-400' : 'text-[var(--arcane-cyan)]'}`}>
                {inventoryCount} / {maxSlots}
              </div>
            </div>
          </div>

          {/* Purchase Message */}
          {purchaseMessage && (
            <div className={`max-w-md mx-auto mb-6 p-4 rounded-xl text-center font-body ${
              purchaseMessage.startsWith('✅') 
                ? 'bg-green-500/20 border border-green-500 text-green-400' 
                : 'bg-red-500/20 border border-red-500 text-red-400'
            }`}>
              {purchaseMessage}
            </div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'all', label: 'All Items', icon: '📦' },
              { id: 'weapons', label: 'Weapons', icon: '⚔️' },
              { id: 'armor', label: 'Armor', icon: '🛡️' },
              { id: 'accessories', label: 'Accessories', icon: '💍' },
              { id: 'consumables', label: 'Potions', icon: '🧪' },
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`px-4 py-2 rounded-xl font-body font-medium transition-all
                  ${activeCategory === category.id 
                    ? 'bg-[var(--arcane-cyan)] text-[var(--void)]' 
                    : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:text-white border border-[var(--edge)]'
                  }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Shop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedItems.map((item) => {
              const canAfford = gold >= item.buyPrice;
              const hasSpace = inventoryCount < maxSlots;
              
              return (
                <div
                  key={item.id}
                  className={`glass-card rounded-2xl p-5 transition-all hover:scale-105
                    ${!canAfford ? 'opacity-60' : ''}
                  `}
                >
                  {/* Item Icon & Rarity */}
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                      style={{ 
                        backgroundColor: `${RARITY_COLORS[item.rarity]}20`,
                        border: `2px solid ${RARITY_COLORS[item.rarity]}`
                      }}
                    >
                      {item.icon}
                    </div>
                    <div 
                      className="px-2 py-1 rounded-lg font-body text-xs font-bold"
                      style={{ 
                        backgroundColor: `${RARITY_COLORS[item.rarity]}20`,
                        color: RARITY_COLORS[item.rarity]
                      }}
                    >
                      {RARITY_NAMES[item.rarity]}
                    </div>
                  </div>

                  {/* Item Info */}
                  <h3 className="font-display text-lg font-bold text-white mb-1">{item.name}</h3>
                  <p className="font-body text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Stats */}
                  {item.stats && (
                    <div className="mb-3 space-y-1">
                      {Object.entries(item.stats).map(([stat, value]) => (
                        <div key={stat} className="flex justify-between font-body text-sm">
                          <span className="text-[var(--text-muted)] capitalize">{stat.replace('maxHealth', 'Max HP').replace('maxMana', 'Max MP')}</span>
                          <span className="text-[var(--arcane-cyan)]">+{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Effect for consumables */}
                  {item.effect && (
                    <div className="mb-3 p-2 rounded-lg bg-[var(--void)]/50">
                      <span className="font-body text-xs text-[var(--text-secondary)]">
                        Effect: {item.effect.type.replace('heal_hp', 'Heal HP').replace('heal_mp', 'Heal MP')} {item.effect.value}%
                        {item.effect.duration && ` (${item.effect.duration} turns)`}
                      </span>
                    </div>
                  )}

                  {/* Buy Button */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--edge)]">
                    <div className="font-display text-xl font-bold text-[var(--legendary-amber)]">
                      🪙 {item.buyPrice}
                    </div>
                    <button
                      onClick={() => handleBuyItem(item)}
                      disabled={!canAfford || !hasSpace}
                      className={`px-4 py-2 rounded-xl font-display font-bold transition-all
                        ${canAfford && hasSpace
                          ? 'bg-gradient-to-r from-[var(--legendary-amber)] to-[#d4ac0d] text-white hover:opacity-90'
                          : 'bg-[var(--surface)] text-[var(--text-muted)] cursor-not-allowed'
                        }`}
                    >
                      {!canAfford ? 'Too Expensive' : !hasSpace ? 'No Space' : 'Buy'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/rpg">
              <button className="btn-secondary">
                ← Back to RPG
              </button>
            </Link>
            <Link href="/rpg/inventory">
              <button className="btn-primary">
                🎒 View Inventory
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
