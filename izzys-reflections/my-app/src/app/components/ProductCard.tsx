'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      product,
      quantity: 1,
      size: product.sizes?.[0],
      color: product.colors?.[0],
    });
  };

  return (
    <div className="group bg-black-secondary rounded-lg shadow-lg border border-gold-primary/20 overflow-hidden hover:border-gold-primary/40 hover:shadow-gold-primary/10 transition-all duration-300">
      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="aspect-square bg-black-tertiary flex items-center justify-center relative overflow-hidden border-b border-gold-primary/10">
          <span className="text-gray-500 text-sm">Product Image</span>
          
          {/* Quick Add Button - appears on hover */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-4 left-4 right-4 bg-gold-primary text-black-primary py-2 rounded-md font-medium 
                       opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 
                       transition-all duration-300 flex items-center justify-center space-x-2
                       hover:bg-gold-light"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Quick Add</span>
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-white mb-1 group-hover:text-gold-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Category Badge */}
        <span className="inline-block text-xs text-gray-400 capitalize mb-2">
          {product.category}
        </span>

        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gold-primary">
            ${product.price.toFixed(2)}
          </p>
          
          {product.featured && (
            <span className="inline-block bg-gold-primary/20 text-gold-primary text-xs px-2 py-1 rounded-full border border-gold-primary/30">
              Featured
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
