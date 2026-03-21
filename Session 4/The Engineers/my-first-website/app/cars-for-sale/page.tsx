'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
  };
}

const cars: Car[] = [
  {
    id: 1,
    name: 'Mercedes-Benz C-Class Saloon',
    class: 'C-Class',
    price: 42000,
    priceDisplay: '£42,000',
    category: ['cheap', 'performance'],
    bodyType: 'saloon',
    image: '/images/Mercedes C-Class saloon.webp',
    features: ['MBUX Infotainment', 'AMG Line Styling', 'LED Performance Lights', 'Active Brake Assist'],
    badge: 'C-CLASS',
    specs: { power: '255 HP', acceleration: '5.8s', topSpeed: '155 mph' },
  },
  {
    id: 2,
    name: 'C-Class Premium Plus',
    class: 'C-Class',
    price: 48000,
    priceDisplay: '£48,000',
    category: ['cheap', 'luxury'],
    bodyType: 'saloon',
    image: '/images/C-class.webp',
    features: ['Burmester Sound', 'Air Suspension', '360° Camera', 'Heads-Up Display'],
    badge: 'LUXURY',
    specs: { power: '272 HP', acceleration: '5.5s', topSpeed: '162 mph' },
  },
  {
    id: 3,
    name: 'Mercedes-Benz E-Class',
    class: 'E-Class',
    price: 55000,
    priceDisplay: '£55,000',
    category: ['performance', 'luxury'],
    bodyType: 'saloon',
    image: '/images/e class.jpg',
    features: ['Semi-Autonomous Drive', 'Massage Seats', 'Ambient Lighting', 'Wireless Charging'],
    badge: 'POPULAR',
    badgeType: 'popular',
    specs: { power: '362 HP', acceleration: '4.5s', topSpeed: '155 mph' },
  },
  {
    id: 4,
    name: 'Mercedes-Benz S-Class',
    class: 'S-Class',
    price: 95000,
    priceDisplay: '£95,000',
    category: ['expensive', 'luxury'],
    bodyType: 'saloon',
    image: '/images/S-class.jpg',
    features: ['Rear Entertainment', 'AR Navigation', 'E-Active Body', 'Chauffeur Package'],
    badge: 'FLAGSHIP',
    badgeType: 'premium',
    specs: { power: '496 HP', acceleration: '4.1s', topSpeed: '155 mph' },
  },
  {
    id: 5,
    name: 'S-Class Maybach',
    class: 'S-Class',
    price: 180000,
    priceDisplay: '£180,000',
    category: ['expensive', 'luxury', 'performance'],
    bodyType: 'saloon',
    image: '/images/s class maybach.webp',
    features: ['V12 Biturbo', 'Refrigerator', 'Silver Champagne Flutes', 'Magic Sky Control'],
    badge: 'MAYBACH',
    badgeType: 'premium',
    specs: { power: '621 HP', acceleration: '4.4s', topSpeed: '155 mph' },
  },
  {
    id: 6,
    name: 'Mercedes-Benz GLE SUV',
    class: 'SUV',
    price: 65000,
    priceDisplay: '£65,000',
    category: ['performance', 'luxury'],
    bodyType: 'suv',
    image: '/images/gle suv.jpg',
    features: ['7-Seater', '4MATIC AWD', 'Off-Road Package', 'Trailer Assist'],
    badge: 'GLE',
    specs: { power: '375 HP', acceleration: '5.3s', topSpeed: '155 mph' },
  },
  {
    id: 7,
    name: 'A-Class Hatchback',
    class: 'A-Class',
    price: 32000,
    priceDisplay: '£32,000',
    category: ['cheap', 'performance'],
    bodyType: 'hatchback',
    image: '/images/a class hatch back.webp',
    features: ['Compact Design', 'Sporty Handling', 'Urban Drive', 'Efficient Engine'],
    badge: 'HATCHBACK',
    specs: { power: '188 HP', acceleration: '6.8s', topSpeed: '146 mph' },
  },
  {
    id: 8,
    name: 'C-Class Coupe',
    class: 'C-Class',
    price: 48000,
    priceDisplay: '£48,000',
    category: ['performance', 'luxury'],
    bodyType: 'coupe',
    image: '/images/c class cope.jpg',
    features: ['Sleek 2-Door', 'Sport Suspension', 'Panoramic Roof', 'Dynamic Select'],
    badge: 'COUPE',
    specs: { power: '255 HP', acceleration: '5.6s', topSpeed: '155 mph' },
  },
  {
    id: 9,
    name: 'Mercedes-AMG GT',
    class: 'AMG',
    price: 120000,
    priceDisplay: '£120,000',
    category: ['expensive', 'performance', 'luxury'],
    bodyType: 'performance',
    image: '/images/mercdes GT.webp',
    features: ['Handcrafted Engine', 'Track Mode', 'Active Aero', 'Launch Control'],
    badge: 'AMG',
    badgeType: 'premium',
    specs: { power: '720 HP', acceleration: '3.1s', topSpeed: '202 mph' },
  },
  {
    id: 10,
    name: 'Mercedes-Benz GLC SUV',
    class: 'SUV',
    price: 52000,
    priceDisplay: '£52,000',
    category: ['cheap', 'luxury'],
    bodyType: 'suv',
    image: '/images/glc suv.webp',
    features: ['Mild Hybrid Tech', 'MBUX Navigation', 'Power Tailgate', 'Privacy Glass'],
    badge: 'GLC',
    specs: { power: '255 HP', acceleration: '6.2s', topSpeed: '149 mph' },
  },
  {
    id: 11,
    name: 'Mercedes-Benz GLS Maybach',
    class: 'SUV',
    price: 165000,
    priceDisplay: '£165,000',
    category: ['expensive', 'luxury'],
    bodyType: 'suv',
    image: '/images/gls 63.webp',
    features: ['Executive Rear Seats', 'Air Balance', 'Burmester 3D', 'Magic Body Control'],
    badge: 'GLS MAYBACH',
    badgeType: 'premium',
    specs: { power: '550 HP', acceleration: '4.8s', topSpeed: '155 mph' },
  },
  {
    id: 12,
    name: 'Mercedes-Benz CLS Coupe',
    class: 'CLS',
    price: 62000,
    priceDisplay: '£62,000',
    category: ['performance', 'luxury'],
    bodyType: 'coupe',
    image: '/images/s class.webp',
    features: ['Four-Door Coupe', 'Diamond Grille', 'Multibeam LED', 'Night Package'],
    badge: 'CLS',
    specs: { power: '362 HP', acceleration: '4.8s', topSpeed: '155 mph' },
  },
  {
    id: 13,
    name: 'Mercedes-Benz E-Class Estate',
    class: 'E-Class',
    price: 58000,
    priceDisplay: '£58,000',
    category: ['luxury'],
    bodyType: 'suv',
    image: '/images/e class estate.webp',
    features: ['640L Boot Space', 'Easy-Pack Tailgate', 'Split-Folding Seats', 'Load Sill Guard'],
    badge: 'ESTATE',
    specs: { power: '268 HP', acceleration: '6.0s', topSpeed: '149 mph' },
  },
  {
    id: 14,
    name: 'Mercedes-Benz G-Wagon G63',
    class: 'G-Class',
    price: 145000,
    priceDisplay: '£145,000',
    category: ['expensive', 'performance', 'luxury'],
    bodyType: 'suv',
    image: '/images/g63.webp',
    features: ['Iconic Design', 'Triple Diff Locks', 'Side-Exit Exhausts', 'Nappa Leather'],
    badge: 'G63 AMG',
    badgeType: 'premium',
    specs: { power: '577 HP', acceleration: '4.5s', topSpeed: '149 mph' },
  },
  {
    id: 15,
    name: 'Mercedes-Benz GLA Urban',
    class: 'SUV',
    price: 38000,
    priceDisplay: '£38,000',
    category: ['cheap', 'performance'],
    bodyType: 'suv',
    image: '/images/gla urban.webp',
    features: ['Compact SUV', 'City Brake Assist', 'Reversing Camera', 'Keyless Go'],
    badge: 'GLA',
    specs: { power: '221 HP', acceleration: '6.8s', topSpeed: '143 mph' },
  },
  {
    id: 16,
    name: 'Mercedes-Benz SL Roadster',
    class: 'SL',
    price: 105000,
    priceDisplay: '£105,000',
    category: ['expensive', 'performance', 'luxury'],
    bodyType: 'coupe',
    image: '/images/sl roadstar.jpg',
    features: ['Retractable Roof', '2+2 Seating', 'AirScarf Neck Warmer', 'Sports Exhaust'],
    badge: 'SL 55',
    badgeType: 'premium',
    specs: { power: '469 HP', acceleration: '3.8s', topSpeed: '183 mph' },
  },
  {
    id: 17,
    name: 'Mercedes-Benz C43 AMG',
    class: 'C-Class',
    price: 58000,
    priceDisplay: '£58,000',
    category: ['performance', 'luxury'],
    bodyType: 'saloon',
    image: '/images/c43 amg.jpg',
    features: ['AMG 4MATIC', 'Performance Exhaust', 'Drift Mode', 'Bucket Seats'],
    badge: 'C43 AMG',
    badgeType: 'popular',
    specs: { power: '402 HP', acceleration: '4.6s', topSpeed: '166 mph' },
  },
  {
    id: 18,
    name: 'Mercedes-Benz E53 AMG',
    class: 'E-Class',
    price: 78000,
    priceDisplay: '£78,000',
    category: ['expensive', 'performance'],
    bodyType: 'saloon',
    image: '/images/e 53 amg.jpg',
    features: ['EQ Boost Hybrid', 'Sport+ Mode', 'Performance Steering', 'Carbon Trim'],
    badge: 'E53 AMG',
    badgeType: 'popular',
    specs: { power: '429 HP', acceleration: '4.4s', topSpeed: '174 mph' },
  },
  {
    id: 19,
    name: 'Mercedes-Benz S63 AMG',
    class: 'S-Class',
    price: 135000,
    priceDisplay: '£135,000',
    category: ['expensive', 'performance', 'luxury'],
    bodyType: 'saloon',
    image: '/images/s63 mag.webp',
    features: ['V8 Hybrid Powertrain', 'Rear-Axle Steering', 'Active Noise Cancel', 'VIP Lounge'],
    badge: 'S63 AMG',
    badgeType: 'premium',
    specs: { power: '802 HP', acceleration: '3.2s', topSpeed: '180 mph' },
  },
  {
    id: 20,
    name: 'Mercedes-Benz GLC Coupe',
    class: 'SUV',
    price: 54000,
    priceDisplay: '£54,000',
    category: ['expensive', 'performance'],
    bodyType: 'suv',
    image: '/images/glc suc.avif',
    features: ['Coupe Styling', 'MBUX', '4MATIC', 'Sports Suspension'],
    badge: 'GLC COUPE',
    specs: { power: '288 HP', acceleration: '6.5s', topSpeed: '130 mph' },
  },
];

type FilterType = 'all' | 'cheap' | 'expensive' | 'performance' | 'luxury';
type BodyType = 'all' | 'suv' | 'hatchback' | 'coupe' | 'saloon' | 'performance';

// Feature icons mapping
const featureIcons: Record<string, string> = {
  'MBUX Infotainment': '🖥️',
  'AMG Line Styling': '✨',
  'LED Performance Lights': '💡',
  'Active Brake Assist': '🛡️',
  'Burmester Sound': '🔊',
  'Air Suspension': '🌊',
  '360° Camera': '📷',
  'Heads-Up Display': '📊',
  'Semi-Autonomous Drive': '🤖',
  'Massage Seats': '💆',
  'Ambient Lighting': '🌈',
  'Wireless Charging': '🔋',
  'Rear Entertainment': '🎬',
  'AR Navigation': '🗺️',
  'E-Active Body': '⚡',
  'Chauffeur Package': '🎩',
  'V12 Biturbo': '🔥',
  'Refrigerator': '❄️',
  'Silver Champagne Flutes': '🥂',
  'Magic Sky Control': '☁️',
  '7-Seater': '👥',
  '4MATIC AWD': '⚙️',
  'Off-Road Package': '🏔️',
  'Trailer Assist': '🚛',
  'Compact Design': '🏙️',
  'Sporty Handling': '🏁',
  'Urban Drive': '🌆',
  'Efficient Engine': '🌱',
  'Sleek 2-Door': '🚗',
  'Sport Suspension': '🏎️',
  'Panoramic Roof': '☀️',
  'Dynamic Select': '🎯',
  'Handcrafted Engine': '⚒️',
  'Track Mode': '🏆',
  'Active Aero': '💨',
  'Launch Control': '🚀',
  'Iconic Design': '⭐',
  'Triple Diff Locks': '🔒',
  'Side-Exit Exhausts': '💨',
  'Nappa Leather': '🪑',
  'Coupe Styling': '🎯',
};

// 3D Tilt Card Component
function CarCard3D({ car, index }: { car: Car; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'cheap': return '💰';
      case 'expensive': return '💎';
      case 'performance': return '⚡';
      case 'luxury': return '👑';
      default: return '✨';
    }
  };

  return (
    <div
      ref={cardRef}
      className="car-card-3d"
      style={{ 
        transform,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="card-glow" />
      <div className="car-card-inner">
        {/* Image Section */}
        <div className="car-image-section">
          <img
            src={car.image}
            alt={car.name}
            className="car-image-3d"
          />
          <div className="image-overlay" />
          
          {/* Quick Actions */}
          <div className="quick-actions">
            <button className="action-btn" title="Add to favorites">♡</button>
            <button className="action-btn" title="Compare">⇄</button>
          </div>
          
          {/* Badge */}
          <div className={`car-badge-float ${car.badgeType || 'standard'}`}>
            {car.badge}
          </div>
          
          {/* Price Tag */}
          <div className="price-tag">
            <div className="price-tag-label">Starting from</div>
            <div className="price-tag-value">{car.priceDisplay}</div>
          </div>
        </div>

        {/* Content Section */}
        <div className="car-content-3d">
          <div className="car-header">
            <h3 className="car-name-3d">{car.name}</h3>
            <span className="car-class-tag">{car.class}</span>
          </div>

          {/* Category Pills */}
          <div className="car-categories-3d">
            {car.category.map((cat) => (
              <span key={cat} className={`category-pill ${cat}`}>
                {getCategoryIcon(cat)} {cat}
              </span>
            ))}
          </div>

          {/* Feature Pills */}
          <div className="car-features-3d">
            {car.features.slice(0, 4).map((feature) => (
              <span key={feature} className="feature-pill">
                <span className="icon">{featureIcons[feature] || '✓'}</span>
                {feature}
              </span>
            ))}
          </div>

          {/* Specs */}
          <div className="car-specs">
            <div className="spec-item">
              <div className="spec-value">{car.specs.power}</div>
              <div className="spec-label">Power</div>
            </div>
            <div className="spec-item">
              <div className="spec-value">{car.specs.acceleration}</div>
              <div className="spec-label">0-60 mph</div>
            </div>
            <div className="spec-item">
              <div className="spec-value">{car.specs.topSpeed}</div>
              <div className="spec-label">Top Speed</div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="car-cta-3d">
            <span>View Details →</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Particle Background
function ParticleBackground() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 20}s`,
    animationDuration: `${15 + Math.random() * 10}s`,
  }));

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }}
        />
      ))}
    </div>
  );
}

// Main Component
export default function CarsForSale() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedBodyType, setSelectedBodyType] = useState<BodyType>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesCategory = activeFilter === 'all' || car.category.includes(activeFilter);
    const matchesClass = selectedClass === 'all' || car.class === selectedClass;
    const matchesBodyType = selectedBodyType === 'all' || car.bodyType === selectedBodyType;
    return matchesCategory && matchesClass && matchesBodyType;
  });

  const filterTabs: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All Vehicles' },
    { id: 'cheap', label: 'Under £50k' },
    { id: 'expensive', label: 'Premium' },
    { id: 'performance', label: 'Performance' },
    { id: 'luxury', label: 'Luxury' },
  ];

  const carClasses = ['all', 'A-Class', 'C-Class', 'CLA', 'CLS', 'E-Class', 'S-Class', 'G-Class', 'SL', 'SUV', 'AMG'];
  const bodyTypes: { id: BodyType; label: string }[] = [
    { id: 'all', label: 'All Body Types' },
    { id: 'saloon', label: 'Saloon' },
    { id: 'suv', label: 'SUV' },
    { id: 'coupe', label: 'Coupe' },
    { id: 'hatchback', label: 'Hatchback' },
    { id: 'performance', label: 'Performance' },
  ];

  const activeFilters = [
    ...(activeFilter !== 'all' ? [{ label: filterTabs.find(f => f.id === activeFilter)?.label, onRemove: () => setActiveFilter('all') }] : []),
    ...(selectedClass !== 'all' ? [{ label: selectedClass, onRemove: () => setSelectedClass('all') }] : []),
    ...(selectedBodyType !== 'all' ? [{ label: bodyTypes.find(b => b.id === selectedBodyType)?.label, onRemove: () => setSelectedBodyType('all') }] : []),
  ];

  if (!mounted) return null;

  return (
    <div className="cars-page">
      {/* Hero Section */}
      <section className="cars-hero">
        <ParticleBackground />
        <div className="cars-hero-content">
          <span className="cars-hero-label">Premium Selection</span>
          <h1 className="cars-hero-title">The Collection</h1>
          <p className="cars-hero-description">
            Discover our curated selection of exceptional Mercedes-Benz vehicles. 
            Each car represents the pinnacle of automotive engineering and luxury craftsmanship.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">{cars.length}</div>
              <div className="hero-stat-label">Models Available</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">£32k</div>
              <div className="hero-stat-label">Starting Price</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">0%</div>
              <div className="hero-stat-label">Finance Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="filters-container">
          {/* Tab Filters */}
          <div className="filter-tabs">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                className={`filter-tab ${activeFilter === tab.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dropdown Filters */}
          <div className="filter-row">
            <div className="filter-dropdown-wrapper" data-label="Model Class">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="filter-dropdown"
              >
                {carClasses.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls === 'all' ? 'All Model Classes' : cls}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-dropdown-wrapper" data-label="Body Type">
              <select
                value={selectedBodyType}
                onChange={(e) => setSelectedBodyType(e.target.value as BodyType)}
                className="filter-dropdown"
              >
                {bodyTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Bar */}
      <div className="results-bar">
        <div className="results-text">
          Showing <strong>{filteredCars.length}</strong> vehicles
        </div>
        {activeFilters.length > 0 && (
          <div className="active-filters">
            {activeFilters.map((filter, i) => (
              <button key={i} className="filter-chip" onClick={filter.onRemove}>
                {filter.label} <span className="remove">×</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Cars Grid */}
      <section className="cars-listing">
        {filteredCars.length > 0 ? (
          <div className="cars-grid-3d">
            {filteredCars.map((car, index) => (
              <CarCard3D key={car.id} car={car} index={index} />
            ))}
          </div>
        ) : (
          <div className="no-results-artistic">
            <div className="no-results-icon">🔍</div>
            <h3>No matches found</h3>
            <p>Try adjusting your filters to explore more vehicles</p>
            <button
              className="reset-btn"
              onClick={() => {
                setActiveFilter('all');
                setSelectedClass('all');
                setSelectedBodyType('all');
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="cta-section-new">
        <div className="cta-content">
          <span className="cta-label-new">Need Assistance?</span>
          <h2 className="cta-title">Can&apos;t Find Your Dream Car?</h2>
          <p className="cta-description">
            Our dedicated team of Mercedes-Benz specialists is here to help you 
            find the perfect vehicle or notify you when new inventory arrives.
          </p>
          <div className="cta-buttons-new">
            <a href="mailto:sales@mercedes-fan.com" className="btn-primary-new">
              Contact Sales
            </a>
            <a href="/" className="btn-secondary-new">
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
