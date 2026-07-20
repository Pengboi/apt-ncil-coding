'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductImage from './components/ProductImage';
import ShoppingCart from './components/ShoppingCart';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import FloatingPetals from './components/FloatingPetals';
import { products, categories, Product } from './data/products';
import { CartItem } from './types';

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [customFormSubmitted, setCustomFormSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product: Product, color: string, ribbonText: string, glitter: boolean = false) => {
    if (!product || !product.id) return;
    
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        item.selectedColor === color && 
        item.ribbonText === ribbonText &&
        item.glitter === glitter
      );
      
      if (existing) {
        return prev.map(item => 
          item.id === product.id && 
          item.selectedColor === color && 
          item.ribbonText === ribbonText &&
          item.glitter === glitter
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      const newItem: CartItem = { ...product, quantity: 1, selectedColor: color, ribbonText, glitter };
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const clearCart = () => setCart([]);

  const updateQuantity = (id: string, color: string, ribbonText: string, quantity: number, glitter: boolean) => {
    if (quantity === 0) {
      setCart(prev => prev.filter(item => 
        !(item.id === id && item.selectedColor === color && item.ribbonText === ribbonText && item.glitter === glitter)
      ));
    } else {
      setCart(prev => prev.map(item => 
        item.id === id && item.selectedColor === color && item.ribbonText === ribbonText && item.glitter === glitter
          ? { ...item, quantity } 
          : item
      ));
    }
  };

  const removeFromCart = (id: string, color: string, ribbonText: string, glitter: boolean) => {
    setCart(prev => prev.filter(item => 
      !(item.id === id && item.selectedColor === color && item.ribbonText === ribbonText && item.glitter === glitter)
    ));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => setCart([]);

  const openQuickView = (product: Product, color?: string) => {
    setSelectedProduct(product);
    setSelectedColor(color || product.colors[0]);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[var(--cream)]">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/eternal_flowers.png)',
            backgroundPosition: '20% center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'min(80vw, 600px)',
            opacity: 0.15,
          }}
        />
        <FloatingPetals />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-5rem)]">
            {/* Content */}
            <div className="text-center lg:text-left py-12 lg:py-0">
              <ScrollReveal>
                <p className="text-[var(--charcoal)] text-sm uppercase tracking-[0.3em] mb-6 font-medium">
                  Handcrafted with Love
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={100}>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-medium text-[var(--charcoal)] leading-[1.1] mb-6">
                  <span className="text-[var(--charcoal)] italic">Eternal</span> Beauty,<br />
                  Crafted to Last
                </h1>
              </ScrollReveal>
              
              <ScrollReveal delay={200}>
                <p className="text-lg text-[var(--charcoal)] mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
                  Luxury artificial roses with sparkling crystals, golden butterflies, and personalised ribbons for life&apos;s most precious moments.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#collections" className="btn-primary">
                    Explore Collections
                  </a>
                  <a href="#custom" className="btn-secondary">
                    Custom Order
                  </a>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={400}>
                <div className="flex gap-8 mt-12 justify-center lg:justify-start">
                  <div className="text-center">
                    <p className="font-display text-3xl font-medium text-[var(--charcoal)]">1+</p>
                    <p className="text-xs text-[var(--charcoal)] uppercase tracking-widest mt-1">Years of Beauty</p>
                  </div>
                  <div className="w-px bg-[var(--champagne)]/30" />
                  <div className="text-center">
                    <p className="font-display text-3xl font-medium text-[var(--charcoal)]">100%</p>
                    <p className="text-xs text-[var(--charcoal)] uppercase tracking-widest mt-1">Handcrafted</p>
                  </div>
                  <div className="w-px bg-[var(--champagne)]/30" />
                  <div className="text-center">
                    <p className="font-display text-3xl font-medium text-[var(--charcoal)]">100+</p>
                    <p className="text-xs text-[var(--charcoal)] uppercase tracking-widest mt-1">Happy Customers</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Hero Image */}
            <ScrollReveal delay={300} className="relative">
              <div className="relative">
                {/* Offset frame decoration */}
                <div className="absolute -inset-4 border border-[var(--champagne)]/40 rounded-lg transform translate-x-4 translate-y-4" />
                
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl relative">
                  <ProductImage 
                    src="/images/home-page-image.JPG" 
                    alt="Girl holding beautiful pink eternal flower bouquet"
                    className="w-full h-full"
                  />
                </div>
                

              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-b from-[var(--cream)] to-[var(--linen)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                icon: (
                  <svg className="w-8 h-8 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                  </svg>
                ), 
                title: 'Lasts for Eternity', 
                desc: 'Premium artificial roses that maintain their beauty forever' 
              },
              { 
                icon: (
                  <svg className="w-8 h-8 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
                  </svg>
                ), 
                title: 'Handcrafted', 
                desc: 'Each arrangement made to order with care and attention' 
              },
              { 
                icon: (
                  <svg className="w-8 h-8 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V1.5m0 6.75V12m-3.75 0h7.5M12 15.75h.008v.008H12v-.008z" />
                  </svg>
                ), 
                title: 'Gift Ready', 
                desc: 'Beautiful packaging with personalised messages included' 
              },
              { 
                icon: (
                  <svg className="w-8 h-8 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                ), 
                title: 'Fast Delivery', 
                desc: 'Made to order and shipped within 3-5 business days' 
              },
            ].map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div className="text-center p-8 bg-white rounded-lg border border-[var(--linen)] hover:border-[var(--champagne)]/40 transition-colors">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="font-display text-lg font-medium text-[var(--charcoal)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--charcoal)] leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="section-padding bg-gradient-to-b from-[var(--linen)] to-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[10px] text-[var(--charcoal)] uppercase tracking-[0.3em] mb-3 font-medium">Explore</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-[var(--charcoal)]">Our Collections</h2>
              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="w-12 h-px bg-[var(--champagne)]" />
                <svg className="w-4 h-4 text-[var(--charcoal)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <div className="w-12 h-px bg-[var(--champagne)]" />
              </div>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Birthday Collection */}
            <ScrollReveal delay={0}>
              <div 
                className="collection-card group cursor-pointer relative overflow-hidden rounded-lg" 
                onClick={() => setActiveCategory('birthday')}
                style={{ minHeight: '420px' }}
              >
                <ProductImage 
                  src="/images/pink-birthday-bouquet.jpg" 
                  alt="Birthday Collection"
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/90 via-[var(--charcoal)]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="w-8 h-px bg-[var(--champagne)] mb-4" />
                  <h3 className="font-display text-2xl font-medium mb-2">Birthday Collection</h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">Celebrate with tiaras and custom age ribbons</p>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--charcoal)] font-medium">
                    Discover 
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Valentine's Collection */}
            <ScrollReveal delay={100}>
              <div 
                className="collection-card group cursor-pointer relative overflow-hidden rounded-lg md:-mt-4 md:mb-4" 
                onClick={() => setActiveCategory('valentine')}
                style={{ minHeight: '420px' }}
              >
                <ProductImage 
                  src="/images/red-valentine-heart.jpg" 
                  alt="Valentine's Collection"
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/90 via-[var(--charcoal)]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="w-8 h-px bg-[var(--champagne)] mb-4" />
                  <h3 className="font-display text-2xl font-medium mb-2">Valentine&apos;s Collection</h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">Heart boxes and romantic arrangements</p>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--charcoal)] font-medium">
                    Discover 
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Flower Purses */}
            <ScrollReveal delay={200}>
              <div 
                className="collection-card group cursor-pointer relative overflow-hidden rounded-lg" 
                onClick={() => setActiveCategory('purse')}
                style={{ minHeight: '420px' }}
              >
                <ProductImage 
                  src="/images/purple-flower-purse.jpg" 
                  alt="Flower Purses"
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/90 via-[var(--charcoal)]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="w-8 h-px bg-[var(--champagne)] mb-4" />
                  <h3 className="font-display text-2xl font-medium mb-2">Flower Purses</h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">Unique wearable floral art with chain straps</p>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--charcoal)] font-medium">
                    Discover 
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="section-padding bg-gradient-to-b from-[var(--cream)] to-[var(--linen)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[10px] text-[var(--charcoal)] uppercase tracking-[0.3em] mb-3 font-medium">Discover</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-[var(--charcoal)]">Shop All Products</h2>
            </div>
          </ScrollReveal>

          {/* Category Filters */}
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-[var(--burgundy)] text-[var(--charcoal)] shadow-lg shadow-[var(--burgundy)]/20'
                      : 'bg-white text-[var(--charcoal)] border border-[var(--taupe)]/20 hover:border-[var(--burgundy)]/40'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 50}>
                <ProductCard 
                  product={product} 
                  onQuickView={openQuickView}
                />
              </ScrollReveal>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-12 h-12 text-[var(--charcoal)] opacity-30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <p className="text-xl text-[var(--charcoal)] font-display italic">No products found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Order Section */}
      <section id="custom" className="section-padding bg-gradient-to-b from-[var(--linen)] to-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <ScrollReveal>
              <div className="relative flex justify-center">
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  {/* Decorative ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-[var(--champagne)]/30 animate-gentle-oscillate" />
                  <div className="absolute inset-4 rounded-full border border-[var(--blush)]/20" />
                  
                  <div className="absolute inset-8 rounded-full overflow-hidden">
                    <ProductImage 
                      src="/images/red-birthday-bouquet.jpg" 
                      alt="Handcrafted eternal flowers"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal delay={200}>
              <div>
                <p className="text-[10px] text-[var(--charcoal)] uppercase tracking-[0.3em] mb-3 font-medium">Personalised</p>
                <h2 className="font-display text-4xl md:text-5xl font-medium text-[var(--charcoal)] mb-6">
                  Create Your Custom Arrangement
                </h2>
                <p className="text-[var(--charcoal)] mb-10 leading-relaxed">
                  Want something unique? Design your own eternal flower arrangement with custom colours, ribbon text, and special touches. Perfect for making your gift truly one-of-a-kind.
                </p>

                {customFormSubmitted ? (
                  <div className="text-center py-12 animate-fade-in-up">
                    <div className="w-16 h-16 bg-[var(--burgundy)] rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-medium text-[var(--charcoal)] mb-3">Request Received</h3>
                    <p className="text-[var(--charcoal)] mb-6 leading-relaxed">
                      Thank you for your custom order request. We&apos;ll be in touch within 24 hours to discuss your perfect arrangement.
                    </p>
                    <button 
                      onClick={() => setCustomFormSubmitted(false)}
                      className="btn-secondary"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setCustomFormSubmitted(true); }}>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">Your Name</label>
                      <input type="text" className="input-field" placeholder="Enter your name" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">Email</label>
                      <input type="email" className="input-field" placeholder="Enter your email" required />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">Product Type</label>
                      <select className="select-field" required>
                        <option value="">Select a type...</option>
                        <option>Bouquet</option>
                        <option>Letter Box</option>
                        <option>Heart Box</option>
                        <option>Flower Purse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">Rose Colour</label>
                      <select className="select-field" required>
                        <option value="">Choose colour...</option>
                        <option>Pink</option>
                        <option>Red</option>
                        <option>White</option>
                        <option>Peach</option>
                        <option>Emerald Green</option>
                        <option>Purple</option>
                        <option>Pink with Gold</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">Custom Ribbon Text (Optional)</label>
                    <input type="text" className="input-field" placeholder="e.g., Happy 16th Birthday" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">Special Requests</label>
                    <textarea rows={4} className="input-field" placeholder="Tell us about any special requests..."></textarea>
                  </div>

                  <button type="submit" className="btn-primary">
                    Send Your Request
                  </button>
                </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-gradient-to-b from-[var(--cream)] to-[var(--linen)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
                  <ProductImage 
                    src="/images/blue-bouquet-elegant.jpg" 
                    alt="Handcrafted eternal flowers"
                    className="w-full h-full"
                  />
                </div>

              </div>
            </ScrollReveal>

            <div className="order-1 lg:order-2">
              <ScrollReveal>
                <p className="text-[10px] text-[var(--charcoal)] uppercase tracking-[0.3em] mb-3 font-medium">Our Story</p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="font-display text-4xl md:text-5xl font-medium text-[var(--charcoal)] mb-6">
                  Crafted with Love & Sparkle
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-[var(--charcoal)] mb-4 leading-relaxed">
                  Each Eternal Flowers arrangement is handcrafted to order using premium artificial roses that last for years. We add sparkling crystals, delicate golden butterflies, and personalised touches to create unforgettable gifts.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <p className="text-[var(--charcoal)] mb-10 leading-relaxed">
                  From birthday celebrations with tiaras to romantic Valentine&apos;s surprises, every piece tells a story. Our signature Flower Purses combine fashion with floral art for a truly unique statement piece.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={400}>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-5 bg-white rounded-lg border border-[var(--linen)]">
                    <p className="font-display text-3xl font-medium text-[var(--charcoal)]">1+</p>
                    <p className="text-[10px] text-[var(--charcoal)] uppercase tracking-wider mt-1">Years of Beauty</p>
                  </div>
                  <div className="text-center p-5 bg-white rounded-lg border border-[var(--linen)]">
                    <p className="font-display text-3xl font-medium text-[var(--charcoal)]">100%</p>
                    <p className="text-[10px] text-[var(--charcoal)] uppercase tracking-wider mt-1">Handcrafted</p>
                  </div>
                  <div className="text-center p-5 bg-white rounded-lg border border-[var(--linen)]">
                    <p className="font-display text-3xl font-medium text-[var(--charcoal)]">100+</p>
                    <p className="text-[10px] text-[var(--charcoal)] uppercase tracking-wider mt-1">Happy Customers</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-to-b from-[var(--linen)] to-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[10px] text-[var(--charcoal)] uppercase tracking-[0.3em] mb-3 font-medium">Reviews</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-[var(--charcoal)]">What Our Customers Say</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "My daughter was thrilled with her 13th birthday bouquet! The tiara and custom ribbon made her feel like a princess.",
                author: "Sarah M.",
                product: "Birthday Bouquet"
              },
              {
                text: "The purple roses in the letter box were absolutely stunning. My wife cried when she saw the beautiful arrangement!",
                author: "Michael R.",
                product: "Anniversary Gift"
              },
              {
                text: "The flower purse is such a unique piece! I get compliments everywhere I go. The craftsmanship is incredible.",
                author: "Jessica L.",
                product: "Flower Purse"
              }
            ].map((review, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div className={`testimonial-card ${idx === 1 ? 'md:-mt-4 md:mb-4' : ''}`}>
                  <svg className="w-8 h-8 text-[var(--charcoal)] opacity-20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <p className="text-[var(--charcoal)] mb-6 leading-relaxed italic font-display text-lg">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--burgundy)] flex items-center justify-center text-[var(--charcoal)] font-display font-medium">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--charcoal)]">{review.author}</p>
                      <p className="text-[10px] text-[var(--charcoal)] uppercase tracking-wider">{review.product}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-gradient-to-b from-[var(--cream)] via-[var(--burgundy-light)] to-[var(--burgundy)] relative overflow-hidden">
        {/* Decorative background pattern — repeating logo watermark */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'url(/images/eternal_flowers.png)',
            backgroundSize: '80px 80px',
            backgroundRepeat: 'repeat',
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[var(--charcoal)] mb-4">
              Join the Eternal Circle
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-[var(--charcoal)]/80 mb-10 text-lg leading-relaxed max-w-lg mx-auto">
              Subscribe for exclusive offers, new collection previews, and floral inspiration delivered to your inbox.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            {newsletterSubmitted ? (
              <div className="text-center animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-6 py-4 bg-[var(--charcoal)]/10 rounded-full">
                  <svg className="w-5 h-5 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-[var(--charcoal)] font-medium">Welcome to the Eternal Circle!</span>
                </div>
              </div>
            ) : (
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => { e.preventDefault(); setNewsletterSubmitted(true); }}>
              <input 
                type="email" 
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-transparent border-b-2 border-[var(--charcoal)]/40 text-[var(--charcoal)] placeholder-[var(--charcoal)]/60 focus:border-[var(--charcoal)] outline-none transition-colors font-body"
              />
              <button type="submit" className="btn-cream">
                Subscribe
              </button>
            </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--burgundy)] text-[var(--charcoal)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16">
            <img 
              src="/images/eternal_flowers.png" 
              alt="Eternal Flowers" 
              className="h-32 w-auto object-contain mb-6 opacity-90"
            />
            <p className="text-[var(--charcoal)]/80 text-center max-w-md leading-relaxed">
              Luxury artificial roses that last forever. Handcrafted with love, crystals, and golden butterflies in the United Kingdom.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] mb-6 text-[var(--charcoal)]">Shop</h4>
              <ul className="space-y-3 text-sm text-[var(--charcoal)]/80">
                <li><a href="#collections" className="hover:text-[var(--charcoal)] transition-colors">Birthday Collection</a></li>
                <li><a href="#collections" className="hover:text-[var(--charcoal)] transition-colors">Valentine&apos;s Day</a></li>
                <li><a href="#shop" className="hover:text-[var(--charcoal)] transition-colors">Flower Purses</a></li>
                <li><a href="#custom" className="hover:text-[var(--charcoal)] transition-colors">Custom Orders</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] mb-6 text-[var(--charcoal)]">Help</h4>
              <ul className="space-y-3 text-sm text-[var(--charcoal)]/80">
                <li><a href="#about" className="hover:text-[var(--charcoal)] transition-colors">Shipping Info</a></li>
                <li><a href="#about" className="hover:text-[var(--charcoal)] transition-colors">Care Instructions</a></li>
                <li><a href="#about" className="hover:text-[var(--charcoal)] transition-colors">FAQ</a></li>
                <li><a href="mailto:hello@eternalflowers.co.uk" className="hover:text-[var(--charcoal)] transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] mb-6 text-[var(--charcoal)]">Contact</h4>
              <ul className="space-y-3 text-sm text-[var(--charcoal)]/80">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  hello@eternalflowers.co.uk
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  +44 (0) 123 456 7890
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  United Kingdom
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] mb-6 text-[var(--charcoal)]">Follow Us</h4>
              <a
                href="https://instagram.com/chloe.eternal.flowers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 bg-[var(--cream)] rounded-lg hover:opacity-80 transition-all group"
              >
                <svg className="w-5 h-5 text-[var(--charcoal)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <span className="text-[var(--charcoal)] text-sm font-medium">@chloe.eternal.flowers</span>
              </a>
            </div>
          </div>
          
          <div className="border-t border-[var(--charcoal)]/20 pt-8 text-center">
            <p className="text-sm text-[var(--charcoal)]/60 font-italic-display">
              Handcrafted with love in the United Kingdom
            </p>
            <p className="text-xs text-[var(--charcoal)]/50 mt-2">
              &copy; 2026 Eternal Flowers. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onBackToCart={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
        onOrderComplete={handleOrderComplete}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
        initialColor={selectedColor}
      />
    </main>
  );
}
