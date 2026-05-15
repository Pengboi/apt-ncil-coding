'use client';

import { useState, useEffect } from 'react';
import { Product, colors } from '../data/products';
import ProductImage from './ProductImage';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, color: string, ribbonText: string, glitter: boolean) => void;
  initialColor?: string;
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart, initialColor }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState(initialColor || product?.colors[0] || '');
  const [ribbonText, setRibbonText] = useState('');
  const [glitter, setGlitter] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isOpen && initialColor) {
      setSelectedColor(initialColor);
    }
    if (isOpen) {
      setIsAdding(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, initialColor]);

  if (!product) return null;

  const galleryImages = product.gallery || [product.image];

  const handleAddToCart = () => {
    if (isAdding || !product) return;
    
    setIsAdding(true);
    onAddToCart(product, selectedColor, ribbonText, glitter);
    setRibbonText('');
    setGlitter(false);
    setCurrentImageIndex(0);
    onClose();
  };

  const glitterPrice = glitter ? 5 : 0;
  const totalPrice = product.price + glitterPrice;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? '' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-[var(--charcoal)]/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-500 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-[var(--linen)] transition-colors"
        >
          <svg className="w-5 h-5 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="aspect-square bg-[var(--linen)] relative">
            <ProductImage 
              src={galleryImages[currentImageIndex]} 
              alt={product.name}
              className="w-full h-full"
            />
            
            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-14 h-14 rounded overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx ? 'border-[var(--burgundy)]' : 'border-white'
                    }`}
                  >
                    <ProductImage src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-10">
            {/* Category */}
            <span className="inline-block text-[10px] font-medium text-[var(--taupe)] uppercase tracking-[0.2em] mb-3">
              {product.category}
            </span>

            {/* Title */}
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[var(--charcoal)] mb-3 leading-tight">{product.name}</h2>
            
            {/* Price */}
            <p className="flex items-baseline gap-1 mb-6">
              <span className="text-lg text-[var(--taupe)]">£</span>
              <span className="text-3xl font-display font-medium text-[var(--burgundy)]">{totalPrice}</span>
              {glitterPrice > 0 && (
                <span className="text-sm text-[var(--taupe)] ml-2">(includes glitter)</span>
              )}
            </p>

            {/* Description */}
            <p className="text-[var(--taupe)] mb-6 leading-relaxed text-sm">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-[var(--taupe)]">
                    <span className="w-1 h-1 rounded-full bg-[var(--champagne)] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-3">
                Colour: <span className="text-[var(--taupe)] font-normal normal-case tracking-normal">{selectedColor?.replace('-', ' ')}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => {
                  const colorInfo = colors.find(c => c.id === color);
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`color-swatch ${color} ${selectedColor === color ? 'active' : ''}`}
                      title={colorInfo?.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Ribbon Customization */}
            {product.customizable && (
              <div className="mb-6">
                <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                  Personalised Ribbon (Optional)
                </label>
                <input
                  type="text"
                  value={ribbonText}
                  onChange={(e) => setRibbonText(e.target.value)}
                  placeholder="e.g., Happy 16th Birthday"
                  className="input-field"
                  maxLength={30}
                />
                <p className="text-[10px] text-[var(--taupe)] mt-1">
                  {ribbonText.length}/30 characters
                </p>
              </div>
            )}

            {/* Glitter Option */}
            <div className="mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${glitter ? 'bg-[var(--burgundy)] border-[var(--burgundy)]' : 'border-[var(--taupe)]'}`}>
                  {glitter && (
                    <svg className="w-3 h-3 text-[var(--cream)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={glitter}
                  onChange={(e) => setGlitter(e.target.checked)}
                  className="hidden"
                />
                <span className="text-sm font-medium text-[var(--charcoal)]">Add Sparkling Glitter Finish</span>
                <span className="text-sm text-[var(--burgundy)] font-display italic">+£5</span>
              </label>
              <p className="text-[10px] text-[var(--taupe)] mt-1 ml-8">
                Adds a beautiful glitter sparkle to your artificial roses
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`btn-primary w-full text-center ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isAdding ? 'Adding...' : `Add to Cart — £${totalPrice}`}
            </button>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-[var(--linen)]">
              <div className="grid grid-cols-2 gap-4 text-xs text-[var(--taupe)]">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--champagne)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  Free shipping over £50
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--champagne)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.048 4.025a3 3 0 01-4.243-4.243m4.242-4.242L12 12m-8.486 8.485a9 9 0 1112.728 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Handcrafted to order
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--champagne)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  Premium quality
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--champagne)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V1.5m0 6.75V12m-3.75 0h7.5M12 15.75h.008v.008H12v-.008z" />
                  </svg>
                  Gift ready packaging
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
