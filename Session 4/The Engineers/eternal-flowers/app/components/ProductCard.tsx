'use client';

import { Product } from '../data/products';
import ProductImage from './ProductImage';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product, color?: string) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <div className="product-card rounded-lg overflow-hidden group">
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
            <span className="px-3 py-1 bg-[var(--burgundy)] text-[var(--cream)] text-[10px] font-semibold uppercase tracking-widest rounded-sm">
              Bestseller
            </span>
          )}
          {product.new && (
            <span className="px-3 py-1 bg-transparent border border-[var(--champagne)] text-[var(--burgundy)] text-[10px] font-semibold uppercase tracking-widest rounded-sm">
              New
            </span>
          )}
        </div>

        {/* Customizable Badge */}
        {product.customizable && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-3 py-1 bg-white/90 backdrop-blur text-[var(--taupe)] text-[10px] font-medium uppercase tracking-widest rounded-sm">
              Customizable
            </span>
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-8 py-3 bg-[var(--burgundy)] text-[var(--cream)] text-xs font-medium uppercase tracking-widest rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-[var(--burgundy-light)] z-10"
        >
          Quick View
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Tag */}
        <span className="text-[10px] font-medium text-[var(--taupe)] uppercase tracking-[0.2em]">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="font-display text-xl font-medium text-[var(--charcoal)] mt-1 mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.slice(0, 3).map((feature, idx) => (
            <span key={idx} className="text-[10px] text-[var(--taupe)] bg-[var(--linen)] px-2 py-1 rounded-sm uppercase tracking-wider">
              {feature}
            </span>
          ))}
        </div>

        {/* Colors */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] text-[var(--taupe)] uppercase tracking-wider">Colours:</span>
          <div className="flex gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => onQuickView(product, color)}
                className={`color-swatch ${color} hover:scale-125 transition-transform cursor-pointer`}
                title={color.replace('-', ' ')}
              />
            ))}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--linen)]">
          <span className="flex items-baseline gap-0.5">
            <span className="text-sm text-[var(--taupe)]">£</span>
            <span className="text-2xl font-display font-medium text-[var(--charcoal)]">{product.price}</span>
          </span>
          <button
            onClick={() => onQuickView(product)}
            className="text-[11px] font-medium text-[var(--burgundy)] uppercase tracking-widest hover:text-[var(--burgundy-light)] transition-colors flex items-center gap-1"
          >
            Add to Cart
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
