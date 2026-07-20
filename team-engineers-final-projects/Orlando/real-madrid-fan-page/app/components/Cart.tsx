"use client";

import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    totalItems,
    totalPrice,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1a0f2e]/60 backdrop-blur-sm z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[var(--surface)] shadow-2xl z-50 flex flex-col border-l border-[#d4af37]/30">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#d4af37]/20">
          <div>
            <h2 className="font-display text-2xl font-bold text-[var(--foreground)]">
              Your Cart
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--foreground)] hover:bg-[#d4af37]/20 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--background)] flex items-center justify-center">
                <svg className="w-10 h-10 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-[var(--text-muted)]">Your cart is empty</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary mt-4 text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-[var(--background)] rounded-lg border border-[#d4af37]/10"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[var(--surface)] flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-[var(--foreground)] truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">{item.category}</p>
                    <p className="font-display text-[#d4af37] font-bold mt-1">
                      £{item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-[var(--surface)] flex items-center justify-center text-[var(--foreground)] hover:bg-[#d4af37]/20 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-[var(--surface)] flex items-center justify-center text-[var(--foreground)] hover:bg-[#d4af37]/20 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[var(--text-muted)] hover:text-red-500 transition-colors self-start"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#d4af37]/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)]">Subtotal</span>
              <span className="font-display text-xl font-bold text-[#d4af37]">
                £{totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={clearCart}
              className="w-full py-3 text-sm text-[var(--text-muted)] hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
            <button className="btn-primary w-full">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
