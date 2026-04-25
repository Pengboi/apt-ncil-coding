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

  // Update selected color when modal opens with new initialColor
  useEffect(() => {
    if (isOpen && initialColor) {
      setSelectedColor(initialColor);
    }
    // Reset adding state when modal opens
    if (isOpen) {
      setIsAdding(false);
    }
  }, [isOpen, initialColor]);

  if (!product) return null;

  const galleryImages = product.gallery || [product.image];

  const handleAddToCart = () => {
    if (isAdding || !product) return;
    
    setIsAdding(true);
    console.log('Adding to cart:', product.id, product.name, 'Color:', selectedColor, 'Glitter:', glitter);
    onAddToCart(product, selectedColor, ribbonText, glitter);
    setRibbonText('');
    setGlitter(false);
    setCurrentImageIndex(0);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? '' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="aspect-square bg-gray-100 relative">
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
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx ? 'border-emerald-500' : 'border-white'
                    }`}
                  >
                    <ProductImage src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Category */}
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              {product.category}
            </span>

            {/* Title */}
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
            
            {/* Price */}
            <p className="text-3xl font-bold text-emerald-600 mb-4">£{product.price}</p>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
              <ul className="space-y-1">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                    <span className="text-emerald-500">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block font-semibold text-gray-900 mb-2">
                Select Color: <span className="text-gray-500 font-normal capitalize">{selectedColor?.replace('-', ' ')}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => {
                  const colorInfo = colors.find(c => c.id === color);
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`color-swatch ${color} ${selectedColor === color ? 'active ring-2 ring-offset-2 ring-emerald-500' : ''}`}
                      title={colorInfo?.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Ribbon Customization */}
            {product.customizable && (
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 mb-2">
                  Custom Ribbon Text (Optional)
                </label>
                <input
                  type="text"
                  value={ribbonText}
                  onChange={(e) => setRibbonText(e.target.value)}
                  placeholder="e.g., Happy 16th Birthday"
                  className="input-field"
                  maxLength={30}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {ribbonText.length}/30 characters
                </p>
              </div>
            )}

            {/* Glitter Option */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={glitter}
                  onChange={(e) => setGlitter(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                />
                <span className="font-semibold text-gray-900">Add Sparkling Glitter Finish</span>
                <span className="text-purple-600 font-semibold">+£5</span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-8">
                Adds a beautiful glitter sparkle to your artificial roses
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`btn-primary w-full text-center ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isAdding ? 'Adding...' : `Add to Cart - £${product.price + (glitter ? 5 : 0)}`}
            </button>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span>🚚</span> Free shipping over £100
                </div>
                <div className="flex items-center gap-2">
                  <span>✨</span> Handcrafted to order
                </div>
                <div className="flex items-center gap-2">
                  <span>💎</span> Premium quality
                </div>
                <div className="flex items-center gap-2">
                  <span>🎁</span> Gift ready packaging
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
