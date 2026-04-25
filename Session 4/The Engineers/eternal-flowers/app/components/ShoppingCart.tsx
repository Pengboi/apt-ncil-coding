'use client';

import { useEffect } from 'react';
import { Product } from '../data/products';
import ProductImage from './ProductImage';

interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  ribbonText?: string;
  glitter?: boolean;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, color: string, ribbonText: string, quantity: number, glitter: boolean) => void;
  onRemoveItem: (id: string, color: string, ribbonText: string, glitter: boolean) => void;
  onClearCart?: () => void;
  onCheckout?: () => void;
}

export default function ShoppingCart({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart,
  onCheckout
}: ShoppingCartProps) {
  const total = cartItems.reduce((sum, item) => sum + (item.price + (item.glitter ? 5 : 0)) * item.quantity, 0);

  // Debug: Log cart items when they change
  useEffect(() => {
    console.log('Cart items updated:', cartItems.length, 'items');
    cartItems.forEach((item, i) => {
      console.log(`  ${i + 1}. ${item.name} (ID: ${item.id}, Color: ${item.selectedColor}, Qty: ${item.quantity})`);
    });
  }, [cartItems]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`cart-sidebar fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-display text-2xl font-bold">Your Cart</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🛒</span>
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="mt-4 text-emerald-600 font-semibold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.selectedColor || 'default'}-${item.ribbonText || 'no-ribbon'}-${index}`} className="flex gap-4 bg-gray-50 p-4 rounded-xl">
                  {/* Image */}
                  <ProductImage 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 rounded-lg flex-shrink-0"
                  />
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                    {item.selectedColor && (
                      <p className="text-sm text-gray-500 capitalize">
                        Color: {item.selectedColor.replace('-', ' ')}
                      </p>
                    )}
                    {item.ribbonText && (
                      <p className="text-sm text-emerald-600 truncate">
                        Ribbon: "{item.ribbonText}"
                      </p>
                    )}
                    {item.glitter && (
                      <p className="text-sm text-purple-600 truncate">
                        ✨ Glitter Finish (+£5)
                      </p>
                    )}
                    <p className="font-bold text-gray-900 mt-1">£{item.price + (item.glitter ? 5 : 0)}</p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button 
                      onClick={() => onRemoveItem(item.id, item.selectedColor || '', item.ribbonText || '', item.glitter || false)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-2 bg-white rounded-lg border">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedColor || '', item.ribbonText || '', Math.max(0, item.quantity - 1), item.glitter || false)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedColor || '', item.ribbonText || '', item.quantity + 1, item.glitter || false)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-2xl">£{total.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500">Shipping calculated at checkout</p>
            <button 
              onClick={onCheckout}
              className="btn-primary w-full text-center"
            >
              Proceed to Checkout
            </button>
            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-3 text-emerald-600 font-semibold hover:underline"
              >
                Continue Shopping
              </button>
              {onClearCart && (
                <button 
                  onClick={() => {
                    if (confirm('Are you sure you want to clear your cart?')) {
                      onClearCart();
                    }
                  }}
                  className="px-4 py-3 text-red-500 font-semibold hover:text-red-600 transition-colors"
                  title="Clear Cart"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
