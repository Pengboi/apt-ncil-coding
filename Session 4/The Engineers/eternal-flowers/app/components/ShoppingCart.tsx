'use client';

import { useEffect } from 'react';
import { CartItem } from '../types';
import ProductImage from './ProductImage';

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-[var(--charcoal)]/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`cart-sidebar fixed top-0 right-0 h-full w-full max-w-md bg-[var(--cream)] z-50 shadow-2xl flex flex-col ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--linen)]">
          <h2 className="font-display text-2xl font-medium text-[var(--charcoal)]">Your Cart</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[var(--linen)] rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-12 h-12 text-[var(--taupe)] opacity-30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-[var(--taupe)] text-lg font-display italic mb-2">Your cart is empty</p>
              <p className="text-sm text-[var(--taupe)]/60 mb-6">Discover our eternal flower collections</p>
              <button 
                onClick={onClose}
                className="text-[var(--burgundy)] text-sm font-medium uppercase tracking-widest hover:text-[var(--burgundy-light)] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.selectedColor || 'default'}-${item.ribbonText || 'no-ribbon'}-${index}`} className="flex gap-4 bg-white p-4 rounded-lg border border-[var(--linen)]">
                  {/* Image */}
                  <ProductImage 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 rounded-lg flex-shrink-0 object-cover"
                  />
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-medium text-[var(--charcoal)] truncate">{item.name}</h3>
                    {item.selectedColor && (
                      <p className="text-xs text-[var(--taupe)] capitalize mt-0.5">
                        Colour: {item.selectedColor.replace('-', ' ')}
                      </p>
                    )}
                    {item.ribbonText && (
                      <p className="text-xs text-[var(--burgundy)] truncate mt-0.5 font-italic-display">
                        Ribbon: &ldquo;{item.ribbonText}&rdquo;
                      </p>
                    )}
                    {item.glitter && (
                      <p className="text-xs text-[var(--champagne)] truncate mt-0.5">
                        Glitter Finish (+£5)
                      </p>
                    )}
                    <p className="text-sm font-medium text-[var(--charcoal)] mt-1">£{item.price + (item.glitter ? 5 : 0)}</p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button 
                      onClick={() => onRemoveItem(item.id, item.selectedColor || '', item.ribbonText || '', item.glitter || false)}
                      className="text-[var(--taupe)] hover:text-[var(--burgundy)] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-2 bg-[var(--linen)] rounded-full">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedColor || '', item.ribbonText || '', Math.max(0, item.quantity - 1), item.glitter || false)}
                        className="w-8 h-8 flex items-center justify-center text-[var(--charcoal)] hover:text-[var(--burgundy)] transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedColor || '', item.ribbonText || '', item.quantity + 1, item.glitter || false)}
                        className="w-8 h-8 flex items-center justify-center text-[var(--charcoal)] hover:text-[var(--burgundy)] transition-colors text-sm"
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
          <div className="border-t border-[var(--linen)] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--taupe)] uppercase tracking-widest">Subtotal</span>
              <span className="font-display text-3xl font-medium text-[var(--charcoal)]">£{total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-[var(--taupe)]">Shipping calculated at checkout</p>
            <button 
              onClick={onCheckout}
              className="btn-primary w-full text-center"
            >
              Proceed to Checkout
            </button>
            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-3 text-[var(--burgundy)] text-xs font-medium uppercase tracking-widest hover:text-[var(--burgundy-light)] transition-colors text-center"
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
                  className="px-4 py-3 text-[var(--taupe)] hover:text-[var(--burgundy)] transition-colors"
                  title="Clear Cart"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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
