'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductImage from './components/ProductImage';
import ShoppingCart from './components/ShoppingCart';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import { products, categories, Product } from './data/products';

interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  ribbonText: string;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');

  // Filter products
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Add to cart - with safety check
  const addToCart = (product: Product, color: string, ribbonText: string) => {
    console.log('addToCart called:', product.id, product.name, 'Color:', color);
    
    // Safety check - ensure we're adding a valid product
    if (!product || !product.id) {
      console.error('Invalid product passed to addToCart:', product);
      return;
    }
    
    setCart(prev => {
      // Safety check - prevent adding if cart already has items from a different add
      if (prev.length > 0) {
        console.log('Cart already has', prev.length, 'items, adding one more');
      }
      
      const existing = prev.find(item => 
        item.id === product.id && 
        item.selectedColor === color && 
        item.ribbonText === ribbonText
      );
      
      if (existing) {
        console.log('Updating existing item quantity');
        return prev.map(item => 
          item.id === product.id && 
          item.selectedColor === color && 
          item.ribbonText === ribbonText
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      console.log('Adding new item to cart. Current cart length:', prev.length);
      // Only add the single product that was requested
      const newItem = { ...product, quantity: 1, selectedColor: color, ribbonText };
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  // Clear entire cart
  const clearCart = () => {
    console.log('Clearing cart');
    setCart([]);
  };

  // Update quantity
  const updateQuantity = (id: string, color: string, ribbonText: string, quantity: number) => {
    if (quantity === 0) {
      setCart(prev => prev.filter(item => 
        !(item.id === id && item.selectedColor === color && item.ribbonText === ribbonText)
      ));
    } else {
      setCart(prev => prev.map(item => 
        item.id === id && item.selectedColor === color && item.ribbonText === ribbonText
          ? { ...item, quantity } 
          : item
      ));
    }
  };

  // Remove from cart
  const removeFromCart = (id: string, color: string, ribbonText: string) => {
    setCart(prev => prev.filter(item => 
      !(item.id === id && item.selectedColor === color && item.ribbonText === ribbonText)
    ));
  };

  // Open checkout
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Handle order completion
  const handleOrderComplete = () => {
    setCart([]);
  };

  // Open product modal
  const openQuickView = (product: Product, color?: string) => {
    setSelectedProduct(product);
    setSelectedColor(color || product.colors[0]);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 hero-pattern overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-200/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <p className="text-emerald-600 font-semibold text-lg mb-4 animate-fade-in-up">
                ✨ Handcrafted with Love
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Eternal Beauty<br />
                <span className="bg-gradient-to-r from-emerald-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  That Lasts Forever
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Luxury preserved roses with sparkling crystals, golden butterflies, and personalized ribbons for life&apos;s most precious moments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <a href="#shop" className="btn-primary text-center">
                  Shop Now
                </a>
                <a href="#custom" className="btn-secondary text-center">
                  Custom Order
                </a>
              </div>
              
              {/* Stats */}
              <div className="flex gap-8 mt-12 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600">1+</p>
                  <p className="text-sm text-gray-500">Years of Beauty</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600">100%</p>
                  <p className="text-sm text-gray-500">Handcrafted</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600">100+</p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <ProductImage 
                  src="/images/home-page-image.JPG" 
                  alt="Girl holding beautiful pink eternal flower bouquet"
                  className="w-full h-full"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center shadow-lg animate-float">
                <span className="text-2xl">👑</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-xl">🦋</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '∞', title: 'Lasts 1+ Years', desc: 'Premium preserved roses that maintain their beauty' },
              { icon: '✋', title: 'Handcrafted', desc: 'Each arrangement made to order with care' },
              { icon: '🎁', title: 'Gift Ready', desc: 'Beautiful packaging with personalized messages' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Made to order and shipped within 3-5 days' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-semibold mb-2">Explore</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">Our Collections</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Birthday Collection */}
            <div 
              className="collection-card group cursor-pointer relative overflow-hidden rounded-2xl" 
              onClick={() => setActiveCategory('birthday')}
              style={{ minHeight: '320px' }}
            >
              <ProductImage 
                src="/images/pink-birthday-bouquet.jpg" 
                alt="Birthday Collection"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-display text-2xl font-bold mb-2">Birthday Collection</h3>
                <p className="text-white/90 mb-4">Celebrate with tiaras and custom age ribbons</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  Shop Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </div>

            {/* Valentine's Collection */}
            <div 
              className="collection-card group cursor-pointer relative overflow-hidden rounded-2xl" 
              onClick={() => setActiveCategory('valentine')}
              style={{ minHeight: '320px' }}
            >
              <ProductImage 
                src="/images/red-valentine-heart.jpg" 
                alt="Valentine's Collection"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-display text-2xl font-bold mb-2">Valentine&apos;s Collection</h3>
                <p className="text-white/90 mb-4">Heart boxes and romantic &quot;I Love You&quot; arrangements</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  Shop Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </div>

            {/* Flower Purses */}
            <div 
              className="collection-card group cursor-pointer relative overflow-hidden rounded-2xl" 
              onClick={() => setActiveCategory('purse')}
              style={{ minHeight: '320px' }}
            >
              <ProductImage 
                src="/images/purple-flower-purse.jpg" 
                alt="Flower Purses"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-display text-2xl font-bold mb-2">Flower Purses</h3>
                <p className="text-white/90 mb-4">Unique wearable floral art with chain straps</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  Shop Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-emerald-600 font-semibold mb-2">Discover</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">Shop All Products</h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-emerald-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={openQuickView}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🔍</span>
              <p className="text-xl text-gray-500">No products found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Order Section */}
      <section id="custom" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-emerald-600 font-semibold mb-2">Personalized</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Create Your Custom Arrangement
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Want something unique? Design your own eternal flower arrangement with custom colors, ribbon text, and special touches. Perfect for making your gift truly one-of-a-kind!
              </p>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                    <input type="text" className="input-field" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" className="input-field" placeholder="Enter your email" />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Type</label>
                    <select className="input-field">
                      <option>Select a type...</option>
                      <option>Bouquet</option>
                      <option>Letter Box (I ❤️ U)</option>
                      <option>Heart Box</option>
                      <option>Flower Purse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rose Color</label>
                    <select className="input-field">
                      <option>Choose color...</option>
                      <option>Royal Blue</option>
                      <option>Classic Red</option>
                      <option>Soft Pink</option>
                      <option>Royal Purple</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Ribbon Text (Optional)</label>
                  <input type="text" className="input-field" placeholder="e.g., Happy 16th Birthday" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
                  <textarea rows={4} className="input-field" placeholder="Tell us about any special requests..."></textarea>
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Submit Custom Order Request
                </button>
              </form>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <ProductImage 
                  src="/images/blue-letter-box.jpg" 
                  alt="Custom arrangement example"
                  className="w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-400 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-5xl">🎨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-gradient-to-br from-emerald-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <ProductImage 
                  src="/images/red-birthday-bouquet.jpg" 
                  alt="Handcrafted eternal flowers"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-emerald-600 font-semibold mb-2">Our Story</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Crafted with Love & Sparkle
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Each Eternal Bloom arrangement is handcrafted to order using premium preserved roses that last for years. We add sparkling crystals, delicate golden butterflies, and personalized touches to create unforgettable gifts.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From birthday celebrations with tiaras to romantic Valentine&apos;s surprises, every piece tells a story. Our signature Flower Purses combine fashion with floral art for a truly unique statement piece.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-3xl font-bold text-emerald-600">1+</p>
                  <p className="text-sm text-gray-500">Years of Beauty</p>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-3xl font-bold text-emerald-600">100%</p>
                  <p className="text-sm text-gray-500">Handcrafted</p>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-3xl font-bold text-emerald-600">100+</p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-semibold mb-2">Reviews</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">What Our Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stars: 5,
                text: "My daughter was thrilled with her 13th birthday bouquet! The tiara and custom ribbon made her feel like a princess.",
                author: "Sarah M.",
                product: "Birthday Bouquet"
              },
              {
                stars: 5,
                text: "The blue roses in the letter box were absolutely stunning. My wife cried when she saw the 'I Love You' arrangement!",
                author: "Michael R.",
                product: "Anniversary Gift"
              },
              {
                stars: 5,
                text: "The flower purse is such a unique piece! I get compliments everywhere I go. The craftsmanship is incredible.",
                author: "Jessica L.",
                product: "Flower Purse"
              }
            ].map((review, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="flex gap-1 mb-4">
                  {Array(review.stars).fill(null).map((_, i) => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&ldquo;{review.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-gray-900">{review.author}</p>
                  <p className="text-sm text-emerald-600">{review.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-purple-600 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Blooming Community
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Subscribe for exclusive offers, new collection previews, and floral inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button type="submit" className="btn-gold">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">💎</span>
                <span className="font-display text-2xl font-bold">Eternal Blooms</span>
              </div>
              <p className="text-gray-400 mb-6">
                Luxury preserved roses that last forever. Handcrafted with love, crystals, and golden butterflies.
              </p>
              <div className="flex gap-4">
                {['instagram', 'facebook', 'pinterest', 'tiktok'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <span className="text-lg">{social === 'instagram' ? '📸' : social === 'facebook' ? '👤' : social === 'pinterest' ? '📌' : '🎵'}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Birthday Collection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Valentine&apos;s Day</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Flower Purses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Orders</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Help</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Care Instructions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 hello@eternalblooms.com</li>
                <li>📞 +1 (555) 123-4567</li>
                <li>📍 Made with love worldwide</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; 2026 Eternal Blooms. All rights reserved.</p>
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
