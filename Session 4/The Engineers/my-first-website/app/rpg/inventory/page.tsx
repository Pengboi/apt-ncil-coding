'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import { getInventory, removeItemFromInventory, getItemQuantity, getGold, spendGold, addGold } from '../data/storage';
import { getItemById, Item, RARITY_COLORS, RARITY_NAMES } from '../data/items';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<{ itemId: string; quantity: number }[]>([]);
  const [gold, setGold] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Load inventory on mount
  useEffect(() => {
    refreshInventory();
  }, []);

  function refreshInventory() {
    const inv = getInventory();
    setInventory(inv.items);
    setGold(getGold());
  }

  function handleRemoveItem(itemId: string, quantity: number = 1) {
    const success = removeItemFromInventory(itemId, quantity);
    if (success) {
      refreshInventory();
      setSelectedItem(null);
    }
  }

  function getItemDetails(itemId: string): Item | undefined {
    return getItemById(itemId);
  }

  function getTotalItems(): number {
    return inventory.reduce((sum, item) => sum + item.quantity, 0);
  }

  return (
    <main className="min-h-screen bg-[var(--void)] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-50" />
      <div className="fixed inset-0 noise-overlay" />
      <div className="fixed inset-0 scanlines" />
      
      {/* Gradient orbs */}
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-[var(--mystic-magenta)] rounded-full blur-[150px] opacity-20" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-[var(--arcane-cyan)] rounded-full blur-[150px] opacity-20" />

      <section className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                Inventory <span className="gradient-text">System</span>
              </h1>
              <p className="font-body text-[var(--text-secondary)]">
                Manage your items, equipment, and treasures
              </p>
            </div>
            
            {/* Gold Display */}
            <div className="glass-card rounded-xl px-6 py-4">
              <div className="font-body text-sm text-[var(--text-muted)] uppercase tracking-wider">Gold</div>
              <div className="font-display text-3xl font-bold text-[var(--legendary-amber)]">
                🪙 {gold}
              </div>
            </div>
          </div>

          {/* Inventory Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="font-body text-sm text-[var(--text-muted)]">Total Items</div>
              <div className="font-display text-2xl font-bold text-white">{getTotalItems()}</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="font-body text-sm text-[var(--text-muted)]">Unique Items</div>
              <div className="font-display text-2xl font-bold text-[var(--arcane-cyan)]">{inventory.length}</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="font-body text-sm text-[var(--text-muted)]">Max Slots</div>
              <div className="font-display text-2xl font-bold text-[var(--mystic-magenta)]">{getInventory().maxSlots}</div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Item List */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="font-display text-xl text-white mb-4 flex items-center gap-2">
                  <span>🎒</span> Your Items
                </h2>
                
                {inventory.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="font-body text-[var(--text-secondary)]">
                      Your inventory is empty. Win battles to collect items!
                    </p>
                    <Link href="/rpg">
                      <button className="btn-primary mt-4">
                        Go Battle!
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {inventory.map((invItem) => {
                      const item = getItemDetails(invItem.itemId);
                      if (!item) return null;
                      
                      const isSelected = selectedItem?.id === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedItem(item);
                            setSelectedQuantity(1);
                          }}
                          className={`relative p-4 rounded-xl border-2 text-left transition-all
                            ${isSelected 
                              ? 'border-[var(--arcane-cyan)] bg-[var(--arcane-cyan)]/10' 
                              : 'border-[var(--edge)] hover:border-[var(--arcane-cyan)]/50 hover:bg-[var(--surface)]/50'
                            }`}
                        >
                          {/* Quantity Badge */}
                          {invItem.quantity > 1 && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--mystic-magenta)] flex items-center justify-center">
                              <span className="font-display text-xs text-white font-bold">
                                {invItem.quantity}
                              </span>
                            </div>
                          )}
                          
                          {/* Item Icon */}
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
                            style={{ 
                              backgroundColor: `${RARITY_COLORS[item.rarity]}20`,
                              border: `2px solid ${RARITY_COLORS[item.rarity]}`
                            }}
                          >
                            {item.icon}
                          </div>
                          
                          {/* Item Info */}
                          <div className="font-display text-sm text-white truncate">{item.name}</div>
                          <div 
                            className="font-body text-xs mt-1"
                            style={{ color: RARITY_COLORS[item.rarity] }}
                          >
                            {RARITY_NAMES[item.rarity]}
                          </div>
                          <div className="font-body text-xs text-[var(--text-muted)] mt-1 capitalize">
                            {item.type}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Item Details Panel */}
            <div className="lg:col-span-1">
              {selectedItem ? (
                <div className="glass-card rounded-2xl p-6 sticky top-24">
                  {/* Item Header */}
                  <div className="text-center mb-6">
                    <div 
                      className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-4"
                      style={{ 
                        backgroundColor: `${RARITY_COLORS[selectedItem.rarity]}20`,
                        border: `2px solid ${RARITY_COLORS[selectedItem.rarity]}`
                      }}
                    >
                      {selectedItem.icon}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">{selectedItem.name}</h3>
                    <div 
                      className="font-body text-sm mt-1"
                      style={{ color: RARITY_COLORS[selectedItem.rarity] }}
                    >
                      {RARITY_NAMES[selectedItem.rarity]} {selectedItem.type}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm text-[var(--text-secondary)] mb-6">
                    {selectedItem.description}
                  </p>

                  {/* Stats */}
                  {selectedItem.stats && (
                    <div className="mb-6">
                      <h4 className="font-display text-sm text-[var(--text-muted)] mb-2">STATS</h4>
                      <div className="space-y-2">
                        {Object.entries(selectedItem.stats).map(([stat, value]) => (
                          <div key={stat} className="flex justify-between font-body text-sm">
                            <span className="text-[var(--text-secondary)] capitalize">{stat}</span>
                            <span className="text-[var(--arcane-cyan)]">+{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Effect */}
                  {selectedItem.effect && (
                    <div className="mb-6">
                      <h4 className="font-display text-sm text-[var(--text-muted)] mb-2">EFFECT</h4>
                      <p className="font-body text-sm text-[var(--text-secondary)]">
                        {selectedItem.effect.type}: {selectedItem.effect.value}
                        {selectedItem.effect.duration && ` (${selectedItem.effect.duration} turns)`}
                      </p>
                    </div>
                  )}

                  {/* Value */}
                  <div className="mb-6 p-3 rounded-lg bg-[var(--void)]/50">
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-[var(--text-secondary)]">Sell Value</span>
                      <span className="text-[var(--legendary-amber)]">🪙 {selectedItem.sellPrice}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm mt-1">
                      <span className="text-[var(--text-secondary)]">Buy Price</span>
                      <span className="text-[var(--arcane-cyan)]">🪙 {selectedItem.buyPrice}</span>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  {getItemQuantity(selectedItem.id) > 1 && (
                    <div className="mb-4">
                      <label className="font-body text-sm text-[var(--text-secondary)] mb-2 block">
                        Quantity: {selectedQuantity}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max={getItemQuantity(selectedItem.id)}
                        value={selectedQuantity}
                        onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        // Sell item logic
                        const totalValue = selectedItem.sellPrice * selectedQuantity;
                        addGold(totalValue);
                        handleRemoveItem(selectedItem.id, selectedQuantity);
                        alert(`Sold ${selectedQuantity}x ${selectedItem.name} for 🪙${totalValue}!`);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[var(--legendary-amber)] to-[#d4ac0d] font-display font-bold text-white hover:opacity-90 transition-opacity"
                    >
                      Sell for 🪙{selectedItem.sellPrice * selectedQuantity}
                    </button>
                    
                    <button 
                      onClick={() => handleRemoveItem(selectedItem.id, selectedQuantity)}
                      className="w-full py-3 px-4 rounded-xl bg-[var(--surface)] border border-[var(--edge)] font-display font-bold text-[var(--text-secondary)] hover:text-white hover:border-red-500/50 transition-colors"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-6 text-center sticky top-24">
                  <div className="text-6xl mb-4">👆</div>
                  <p className="font-body text-[var(--text-secondary)]">
                    Select an item to view details and manage it
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/rpg">
              <button className="btn-secondary">
                ← Back to RPG
              </button>
            </Link>
            <Link href="/rpg/shop">
              <button className="btn-primary">
                🏪 Visit Merchant
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
