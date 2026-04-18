'use client';

import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-50"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-black-secondary shadow-2xl shadow-gold-primary/10 z-50 flex flex-col border-l border-gold-primary/20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gold-primary/20">
          <h2 className="text-xl font-bold text-white">Your Cart ({items.length})</h2>
          <button
            onClick={closeCart}
            className="p-2 text-gray-400 hover:text-gold-primary transition-colors"
            aria-label="Close cart"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="inline-block bg-gold-primary text-black-primary px-6 py-2 rounded-md hover:bg-gold-light transition-colors font-semibold"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center space-x-4 bg-black-tertiary p-4 rounded-lg border border-gold-primary/10"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-black-primary rounded-md flex items-center justify-center flex-shrink-0 border border-gold-primary/20">
                    <span className="text-xs text-gray-500">No Image</span>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate text-white">{item.product.name}</h3>
                    {item.size && (
                      <p className="text-xs text-gray-400">Size: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="text-xs text-gray-400">Color: {item.color}</p>
                    )}
                    <p className="text-sm font-semibold mt-1 text-gold-primary">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 text-gray-400 hover:text-gold-primary hover:bg-gold-primary/10 rounded"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 text-gray-400 hover:text-gold-primary hover:bg-gold-primary/10 rounded"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gold-primary/20 p-4 space-y-4 bg-black-tertiary">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Subtotal:</span>
              <span className="text-xl font-bold text-gold-primary">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400">Shipping and taxes calculated at checkout</p>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full bg-gold-primary/20 text-gold-primary text-center py-3 rounded-md font-semibold hover:bg-gold-primary hover:text-black-primary transition-colors border border-gold-primary"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-gold-primary text-black-primary text-center py-3 rounded-md font-semibold hover:bg-gold-light transition-colors"
            >
              Checkout
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-gray-400 text-center py-2 text-sm hover:text-gold-primary transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
