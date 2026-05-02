'use client';

import { useState } from 'react';
import { products, getAllCategories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { ShoppingBag, Filter } from 'lucide-react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Product['category'] | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const categories = getAllCategories();

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const getCategoryName = (id: string) => {
    if (id === 'all') return 'All Products';
    const cat = categories.find(c => c.id === id);
    return cat?.name || id;
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <ShoppingBag className="h-16 w-16 text-gold-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Custom Printing Shop</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our collection of customizable products. From apparel to drinkware, find the perfect item for your design.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-black-tertiary border border-gold-primary/20 rounded-lg text-gray-300 hover:text-gold-primary transition-colors"
          >
            <Filter className="h-5 w-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters Section */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block mb-8`}>
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-gold-primary text-black-primary'
                    : 'bg-black-tertiary text-gray-300 hover:bg-gold-primary/20 hover:text-gold-primary border border-gold-primary/20'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-gold-primary text-black-primary'
                      : 'bg-black-tertiary text-gray-300 hover:bg-gold-primary/20 hover:text-gold-primary border border-gold-primary/20'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort and Results Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gold-primary/20">
            <p className="text-gray-400">
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
              {selectedCategory !== 'all' && ` in ${getCategoryName(selectedCategory)}`}
            </p>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 bg-black-tertiary border border-gold-primary/20 rounded-lg text-sm text-gray-300 focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">No products found in this category.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-6 py-3 bg-gold-primary text-black-primary rounded-lg font-semibold hover:bg-gold-light transition-colors"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Bulk Order CTA */}
        <div className="mt-16 bg-black-secondary rounded-2xl p-8 border border-gold-primary/20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Need a Custom Order?</h2>
            <p className="text-gray-400 mb-6">
              Looking for bulk orders, special designs, or custom products not listed here? We can help!
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gold-primary text-black-primary font-semibold rounded-lg hover:bg-gold-light transition-colors"
            >
              Contact Us for Custom Orders
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
