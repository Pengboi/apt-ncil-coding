'use client';

import React, { useState } from 'react';
import './cars-for-sale.css';

interface Car {
  id: number;
  name: string;
  class: string;
  price: number;
  priceDisplay: string;
  category: ('cheap' | 'expensive' | 'performance' | 'luxury')[];
  bodyType: 'suv' | 'hatchback' | 'coupe' | 'saloon' | 'performance';
  image: string;
  features: string[];
  badge: string;
  badgeType?: 'popular' | 'premium';
}

const cars: Car[] = [
  {
    id: 1,
    name: 'Mercedes-Benz C-Class',
    class: 'C-Class',
    price: 42000,
    priceDisplay: 'From £42,000',
    category: ['cheap', 'performance'],
    bodyType: 'saloon',
    image: '/images/C-class.webp',
    features: ['Compact executive sedan', 'Sporty AMG Line available', 'Advanced MBUX system', 'Plug-in hybrid options'],
    badge: 'C-CLASS',
  },
  {
    id: 2,
    name: 'Mercedes-Benz C-Class Saloon',
    class: 'C-Class',
    price: 45000,
    priceDisplay: 'From £45,000',
    category: ['cheap', 'luxury'],
    bodyType: 'saloon',
    image: '/images/Mercedes C-Class saloon.webp',
    features: ['Luxury saloon design', 'Premium interior', 'Advanced safety features', 'Efficient engine options'],
    badge: 'C-CLASS',
  },
  {
    id: 3,
    name: 'Mercedes-Benz E-Class',
    class: 'E-Class',
    price: 55000,
    priceDisplay: 'From £55,000',
    category: ['performance', 'luxury'],
    bodyType: 'saloon',
    image: '/images/e class.jpg',
    features: ['Mid-size luxury sedan', 'Perfect for business & family', 'Semi-autonomous driving', 'Estate & Coupe versions'],
    badge: 'POPULAR',
    badgeType: 'popular',
  },
  {
    id: 4,
    name: 'Mercedes-Benz S-Class',
    class: 'S-Class',
    price: 95000,
    priceDisplay: 'From £95,000',
    category: ['expensive', 'luxury'],
    bodyType: 'saloon',
    image: '/images/S-class.jpg',
    features: ['Flagship luxury sedan', 'Rear-seat entertainment', 'Cutting-edge innovation', 'Maybach editions available'],
    badge: 'PREMIUM',
    badgeType: 'premium',
  },
  {
    id: 5,
    name: 'Mercedes-Benz S-Class (WebP)',
    class: 'S-Class',
    price: 105000,
    priceDisplay: 'From £105,000',
    category: ['expensive', 'luxury', 'performance'],
    bodyType: 'saloon',
    image: '/images/S-class.webp',
    features: ['Ultimate luxury experience', 'V8 Biturbo engine option', 'Burmester 4D sound system', 'Active ambient lighting'],
    badge: 'PREMIUM',
    badgeType: 'premium',
  },
  {
    id: 6,
    name: 'Mercedes-Benz GLE SUV',
    class: 'SUV',
    price: 65000,
    priceDisplay: 'From £65,000',
    category: ['performance', 'luxury'],
    bodyType: 'suv',
    image: '/images/C-class.webp',
    features: ['Spacious 5-seater SUV', '4MATIC all-wheel drive', 'Advanced off-road capability', 'Premium interior space'],
    badge: 'SUV',
  },
  {
    id: 7,
    name: 'Mercedes-Benz A-Class Hatchback',
    class: 'A-Class',
    price: 32000,
    priceDisplay: 'From £32,000',
    category: ['cheap', 'performance'],
    bodyType: 'hatchback',
    image: '/images/Mercedes C-Class saloon.webp',
    features: ['Compact city car', 'Sporty handling', 'Modern tech features', 'Fuel efficient'],
    badge: 'HATCHBACK',
  },
  {
    id: 8,
    name: 'Mercedes-Benz C-Class Coupe',
    class: 'C-Class',
    price: 48000,
    priceDisplay: 'From £48,000',
    category: ['performance', 'luxury'],
    bodyType: 'coupe',
    image: '/images/e class.jpg',
    features: ['Sleek 2-door design', 'Sporty driving dynamics', 'Premium coupe styling', 'Powerful engine options'],
    badge: 'COUPE',
  },
  {
    id: 9,
    name: 'Mercedes-AMG GT',
    class: 'AMG',
    price: 120000,
    priceDisplay: 'From £120,000',
    category: ['expensive', 'performance', 'luxury'],
    bodyType: 'performance',
    image: '/images/S-class.jpg',
    features: ['High-performance sports car', 'Handcrafted AMG engine', 'Track-ready dynamics', 'Race-inspired design'],
    badge: 'AMG',
    badgeType: 'premium',
  },
];

type FilterType = 'all' | 'cheap' | 'expensive' | 'performance' | 'luxury';
type BodyType = 'all' | 'suv' | 'hatchback' | 'coupe' | 'saloon' | 'performance';

export default function CarsForSale() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedBodyType, setSelectedBodyType] = useState<BodyType>('all');

  const filteredCars = cars.filter((car) => {
    const matchesCategory = activeFilter === 'all' || car.category.includes(activeFilter);
    const matchesClass = selectedClass === 'all' || car.class === selectedClass;
    const matchesBodyType = selectedBodyType === 'all' || car.bodyType === selectedBodyType;
    return matchesCategory && matchesClass && matchesBodyType;
  });

  const filters: { id: FilterType; label: string; icon: string }[] = [
    { id: 'all', label: 'All Cars', icon: '🚗' },
    { id: 'cheap', label: 'Cheap Cars', icon: '💰' },
    { id: 'expensive', label: 'Expensive Cars', icon: '💎' },
    { id: 'performance', label: 'Performance', icon: '⚡' },
    { id: 'luxury', label: 'Luxury', icon: '✨' },
  ];

  const bodyTypes: { id: BodyType; label: string; icon: string }[] = [
    { id: 'all', label: 'All Body Types', icon: '🚙' },
    { id: 'suv', label: 'SUV', icon: '🚙' },
    { id: 'saloon', label: 'Saloon', icon: '🚗' },
    { id: 'coupe', label: 'Coupe', icon: '🏎️' },
    { id: 'hatchback', label: 'Hatchback', icon: '🚕' },
    { id: 'performance', label: 'Performance', icon: '🔥' },
  ];

  const carClasses = ['all', 'A-Class', 'C-Class', 'E-Class', 'S-Class', 'SUV', 'AMG'];

  const getBodyTypeLabel = (type: string) => {
    return bodyTypes.find(b => b.id === type)?.label || type;
  };

  return (
    <div className="cars-page">
      {/* Hero Section */}
      <section className="cars-hero">
        <div className="cars-hero-content">
          <p className="cars-hero-label">FIND YOUR PERFECT CAR</p>
          <h1 className="cars-hero-title">Cars for Sale</h1>
          <p className="cars-hero-description">
            Browse our exclusive collection of Mercedes-Benz vehicles. Filter by body type, price range, performance, or luxury level to find your dream car.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="filters-container">
          {/* Body Type Filters */}
          <div className="filter-group">
            <h3 className="filter-label">Filter by Body Type</h3>
            <div className="filter-buttons body-type-buttons">
              {bodyTypes.map((type) => (
                <button
                  key={type.id}
                  className={`filter-btn body-type-btn ${selectedBodyType === type.id ? 'active' : ''}`}
                  onClick={() => setSelectedBodyType(type.id)}
                >
                  <span className="filter-icon">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div className="filter-group">
            <h3 className="filter-label">Filter by Type</h3>
            <div className="filter-buttons">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <span className="filter-icon">{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Two Column Layout for Dropdowns */}
          <div className="filter-row">
            {/* Class Filter */}
            <div className="filter-group half">
              <h3 className="filter-label">Filter by Model Class</h3>
              <div className="class-selector">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="class-dropdown"
                >
                  {carClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls === 'all' ? 'All Classes' : cls}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          Showing <strong>{filteredCars.length}</strong> car{filteredCars.length !== 1 ? 's' : ''}
          {selectedBodyType !== 'all' && ` • ${getBodyTypeLabel(selectedBodyType)}`}
          {activeFilter !== 'all' && ` • ${filters.find(f => f.id === activeFilter)?.label}`}
          {selectedClass !== 'all' && ` • ${selectedClass}`}
        </div>
      </section>

      {/* Cars Grid */}
      <section className="cars-listing">
        {filteredCars.length > 0 ? (
          <div className="cars-grid-page">
            {filteredCars.map((car) => (
              <div key={car.id} className="car-card-page">
                <div className="car-image-wrapper-page">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="car-image-page"
                  />
                  <div className={`car-badge-page ${car.badgeType || ''}`}>
                    {car.badge}
                  </div>
                  <div className="car-categories">
                    <span className="category-tag body-type">
                      {getBodyTypeLabel(car.bodyType)}
                    </span>
                    {car.category.map((cat) => (
                      <span key={cat} className={`category-tag ${cat}`}>
                        {cat === 'cheap' && '💰'}
                        {cat === 'expensive' && '💎'}
                        {cat === 'performance' && '⚡'}
                        {cat === 'luxury' && '✨'}
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="car-content-page">
                  <h3 className="car-name-page">{car.name}</h3>
                  <p className="car-price-page">{car.priceDisplay}</p>
                  <ul className="car-features-page">
                    {car.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <button className="btn btn-primary car-btn-page">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No cars found</h3>
            <p>Try adjusting your filters to see more results.</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setActiveFilter('all');
                setSelectedClass('all');
                setSelectedBodyType('all');
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="cars-cta-section">
        <p className="section-label">CAN&apos;T FIND WHAT YOU&apos;RE LOOKING FOR?</p>
        <h2 className="cta-heading">Contact Our Sales Team</h2>
        <p className="cta-description">
          Our team can help you find the perfect Mercedes-Benz or notify you when new inventory arrives.
        </p>
        <div className="cta-buttons">
          <a href="mailto:sales@mercedes-fan.com" className="btn btn-primary">Contact Sales</a>
          <a href="/" className="btn btn-secondary">Back to Home</a>
        </div>
      </section>
    </div>
  );
}
