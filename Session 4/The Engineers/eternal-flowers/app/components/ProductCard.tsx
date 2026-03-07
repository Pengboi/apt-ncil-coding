'use client';

import { Product } from '../data/products';
import ProductImage from './ProductImage';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <div className="product-card bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <ProductImage 
          src={product.image} 
          alt={product.name}
          className="w-full h-full"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.bestseller && (
            <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
              ⭐ Bestseller
            </span>
          )}
          {product.new && (
            <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
              ✨ New
            </span>
          )}
        </div>

        {/* Customizable Badge */}
        {product.customizable && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-3 py-1 bg-white/90 backdrop-blur text-violet-600 text-xs font-semibold rounded-full shadow-md">
              🎨 Customizable
            </span>
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-4 left-4 right-4 py-3 bg-white/95 backdrop-blur text-violet-600 font-semibold rounded-xl shadow-lg 
                     opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
                     transition-all duration-300 hover:bg-violet-600 hover:text-white z-10"
        >
          Quick View
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Tag */}
        <span className="text-xs font-medium text-violet-500 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-gray-900 mt-1 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.slice(0, 3).map((feature, idx) => (
            <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              {feature}
            </span>
          ))}
        </div>

        {/* Colors */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-gray-500">Colors:</span>
          <div className="flex gap-1">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color}
                className={`color-swatch ${color}`}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <button
            onClick={() => onQuickView(product)}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-sm font-semibold rounded-full
                       hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
