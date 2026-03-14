'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCartIcon, 
  ThLargeIcon, 
  ShoePrintsIcon, 
  TshirtIcon, 
  BallIcon, 
  StarIcon, 
  StarHalfIcon, 
  ExternalLinkIcon,
  ShieldIcon,
  BottleWaterIcon
} from '@/components/ui/Icons';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  rating: number;
  description: string;
  category: 'boots' | 'gear' | 'accessories';
  badge?: string;
  image: string;
  icon: React.ReactNode;
}

// Product images using football-specific photos
const products: Product[] = [
  {
    id: 1,
    name: 'Mercurial Superfly 9',
    brand: 'Nike',
    price: '£249.99',
    rating: 4.9,
    description: 'Elite speed boots with Zoom Air technology for explosive acceleration.',
    category: 'boots',
    badge: 'Top Rated',
    // Soccer cleats on grass
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    icon: <ShoePrintsIcon />,
  },
  {
    id: 2,
    name: 'Predator Accuracy.1',
    brand: 'Adidas',
    price: '£229.99',
    rating: 4.7,
    description: 'Superior ball control with High Definition Grip technology.',
    category: 'boots',
    // Football boots on field
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=300&fit=crop',
    icon: <ShoePrintsIcon />,
  },
  {
    id: 3,
    name: 'Training Kit Bundle',
    brand: 'Under Armour',
    price: '£59.99',
    rating: 4.8,
    description: 'Breathable, moisture-wicking training top and shorts set.',
    category: 'gear',
    badge: 'Best Value',
    // Sports jersey/shirt
    image: 'https://images.unsplash.com/photo-1580231680660-26a7f7e8c3b7?w=400&h=300&fit=crop',
    icon: <TshirtIcon />,
  },
  {
    id: 4,
    name: 'Brilliant Super TB',
    brand: 'Select',
    price: '£89.99',
    rating: 4.9,
    description: 'FIFA Quality Pro match ball with zero-wing bladder.',
    category: 'accessories',
    // Classic soccer ball
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop',
    icon: <BallIcon />,
  },
  {
    id: 5,
    name: 'Pro-S Shin Guards',
    brand: 'G-Form',
    price: '£44.99',
    rating: 4.6,
    description: 'Lightweight, flexible guards that harden on impact.',
    category: 'gear',
    // Football socks/shin guards on player
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=300&fit=crop',
    icon: <ShieldIcon />,
  },
  {
    id: 6,
    name: 'Insulated Water Bottle',
    brand: 'HydraCell',
    price: '£24.99',
    rating: 4.8,
    description: '32oz stainless steel, keeps drinks cold for 24 hours.',
    category: 'accessories',
    badge: 'Essential',
    // Sports water bottle
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop',
    icon: <BottleWaterIcon />,
  },
];

const categories = [
  { id: 'all', label: 'All', icon: <ThLargeIcon /> },
  { id: 'boots', label: 'Boots', icon: <ShoePrintsIcon /> },
  { id: 'gear', label: 'Training Gear', icon: <TshirtIcon /> },
  { id: 'accessories', label: 'Accessories', icon: <BallIcon /> },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('[data-aos]');
            elements.forEach((el) => {
              const delay = el.getAttribute('data-aos-delay');
              if (delay) {
                setTimeout(() => {
                  el.classList.add('aos-animate');
                }, parseInt(delay));
              } else {
                el.classList.add('aos-animate');
              }
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageError = (productId: number) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half" />);
    }
    return stars;
  };

  return (
    <section id="products" className="section products-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">
            <ShoppingCartIcon />
            Gear
          </span>
          <h2 className="section-title">Best Football Products</h2>
          <p className="section-subtitle">
            Curated recommendations for boots, training gear, and accessories
          </p>
        </div>

        {/* Category Tabs */}
        <div className="product-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`tab-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {product.badge && <div className="product-badge">{product.badge}</div>}
              <div className="product-image">
                {imageErrors[product.id] ? (
                  <div className={`product-placeholder ${product.category === 'boots' ? 'boots-gradient' : product.category === 'gear' ? 'gear-gradient' : 'acc-gradient'}`}>
                    {product.icon}
                  </div>
                ) : (
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.name}`}
                    className="product-img"
                    loading="lazy"
                    onError={() => handleImageError(product.id)}
                  />
                )}
              </div>
              <div className="product-info">
                <span className="product-brand">{product.brand}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  {renderStars(product.rating)}
                  <span>{product.rating}</span>
                </div>
                <p className="product-desc">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button className="btn-view">
                    <ExternalLinkIcon /> View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
