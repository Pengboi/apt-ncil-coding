'use client';

import { useState } from 'react';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const products = [
    { id: 1, name: 'Rose Eternity', price: '£49', image: '🌹', color: 'from-rose-400 to-rose-600', desc: 'Preserved red roses that last 3+ years' },
    { id: 2, name: 'Golden Bloom', price: '£59', image: '🌻', color: 'from-amber-400 to-amber-600', desc: 'Eternal sunflowers in golden hues' },
    { id: 3, name: 'Lavender Dreams', price: '£45', image: '🪻', color: 'from-purple-400 to-purple-600', desc: 'Forever lavender, calming and serene' },
    { id: 4, name: 'Blush Peony', price: '£65', image: '🌸', color: 'from-pink-400 to-pink-600', desc: 'Soft pink peonies, endlessly beautiful' },
    { id: 5, name: 'White Elegance', price: '£55', image: '🤍', color: 'from-slate-300 to-slate-500', desc: 'Pure white roses, timeless sophistication' },
    { id: 6, name: 'Orchid Forever', price: '£75', image: '🌺', color: 'from-fuchsia-400 to-fuchsia-600', desc: 'Exotic orchids preserved to perfection' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌹</span>
            <span className="text-xl font-bold text-rose-800">Eternal Flowers</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-rose-700">
            <a href="#home" className="hover:text-rose-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-rose-500 transition-colors">About</a>
            <a href="#products" className="hover:text-rose-500 transition-colors">Collections</a>
            <a href="#contact" className="hover:text-rose-500 transition-colors">Contact</a>
          </div>
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full transition-all hover:scale-105">
            Shop Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold text-rose-900 mb-6 leading-tight">
                Flowers That{' '}
                <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
                  Last Forever
                </span>
              </h1>
              <p className="text-xl text-rose-700 mb-8 leading-relaxed">
                Real flowers, preserved to maintain their beauty for years. 
                No water needed, no maintenance required — just eternal elegance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Explore Collection 🌸
                </button>
                <button className="border-2 border-rose-400 text-rose-600 hover:bg-rose-50 text-lg px-8 py-4 rounded-full transition-all">
                  Learn More
                </button>
              </div>
              <div className="flex items-center gap-8 mt-10 justify-center md:justify-start">
                <div className="text-center">
                  <p className="text-3xl font-bold text-rose-800">3+</p>
                  <p className="text-rose-600 text-sm">Years of Beauty</p>
                </div>
                <div className="w-px h-12 bg-rose-200"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-rose-800">100%</p>
                  <p className="text-rose-600 text-sm">Real Flowers</p>
                </div>
                <div className="w-px h-12 bg-rose-200"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-rose-800">10k+</p>
                  <p className="text-rose-600 text-sm">Happy Customers</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-amber-200 rounded-full blur-3xl opacity-50"></div>
              <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="text-9xl text-center animate-pulse">🌹</div>
                <div className="absolute -top-4 -right-4 bg-amber-400 text-amber-900 px-4 py-2 rounded-full font-bold shadow-lg">
                  ✨ Lasts 3+ Years
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-rose-900 mb-4">Why Choose Eternal Flowers?</h2>
          <p className="text-center text-rose-600 mb-12 max-w-2xl mx-auto">
            Our preserved flowers offer the beauty of fresh blooms without the hassle
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-rose-50 to-white border border-rose-100 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-xl font-bold text-rose-800 mb-2">Long Lasting</h3>
              <p className="text-rose-600">Enjoy their beauty for 3 years or more with proper care</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-rose-50 to-white border border-rose-100 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-5xl mb-4">💧</div>
              <h3 className="text-xl font-bold text-rose-800 mb-2">No Water Needed</h3>
              <p className="text-rose-600">Zero maintenance required. Just place and enjoy!</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-rose-50 to-white border border-rose-100 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-rose-800 mb-2">100% Natural</h3>
              <p className="text-rose-600">Made from real flowers using eco-friendly preservation</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-rose-50 to-white border border-rose-100 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-rose-800 mb-2">Perfect Gift</h3>
              <p className="text-rose-600">A meaningful present that keeps on giving</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-rose-900 mb-4">Our Collection</h2>
          <p className="text-center text-rose-600 mb-12 max-w-2xl mx-auto">
            Each arrangement is handcrafted with love and preserved to last
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer group"
                onClick={() => setSelectedProduct(product.name)}
              >
                <div className={`h-48 bg-gradient-to-br ${product.color} flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-8xl group-hover:scale-110 transition-transform">{product.image}</span>
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-gray-800">
                    {product.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.desc}</p>
                  <button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-semibold transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-rose-100 to-rose-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-rose-800 mb-4">Our Preservation Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-gray-800">Hand Selection</h4>
                      <p className="text-gray-600">We choose only the finest blooms at peak beauty</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-gray-800">Eco-Friendly Treatment</h4>
                      <p className="text-gray-600">Natural preservation liquid replaces sap</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-gray-800">Artful Arrangement</h4>
                      <p className="text-gray-600">Expert florists create stunning displays</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-rose-900 mb-6">The Art of Eternal Beauty</h2>
              <p className="text-lg text-rose-700 mb-6 leading-relaxed">
                At Eternal Flowers, we believe that beauty shouldn't fade. Our preservation technique 
                captures flowers at their most stunning moment, allowing you to enjoy their elegance 
                for years to come.
              </p>
              <p className="text-lg text-rose-700 mb-6 leading-relaxed">
                Founded in 2020, we've helped thousands of people celebrate their special moments 
                with flowers that truly last — from weddings to anniversaries, birthdays to just because.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <span className="w-10 h-10 rounded-full bg-rose-300 flex items-center justify-center text-lg">😊</span>
                  <span className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center text-lg">🥰</span>
                  <span className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-lg">😍</span>
                </div>
                <p className="text-rose-600 font-medium">Join 10,000+ happy customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-rose-900 mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-rose-50 to-white p-8 rounded-3xl border border-rose-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Received these for my anniversary 2 years ago and they still look as beautiful as day one! Absolutely magical."</p>
              <p className="font-bold text-rose-800">— Sarah M.</p>
            </div>
            <div className="bg-gradient-to-b from-rose-50 to-white p-8 rounded-3xl border border-rose-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"The perfect gift for my mom. She was amazed that they're real flowers that last forever. Will definitely order again!"</p>
              <p className="font-bold text-rose-800">— James K.</p>
            </div>
            <div className="bg-gradient-to-b from-rose-50 to-white p-8 rounded-3xl border border-rose-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Used them as centerpieces for my wedding. A year later, my bouquet still sits on my dresser. So special!"</p>
              <p className="font-bold text-rose-800">— Emma T.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-rose-500 to-amber-500 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">Give the Gift of Eternal Beauty</h2>
            <p className="text-xl mb-8 text-white/90">
              Order today and enjoy free delivery on all arrangements
            </p>
            <button className="bg-white text-rose-600 hover:bg-rose-50 text-lg px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Shop the Collection 🌹
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-rose-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-rose-900 mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white text-xl">📧</div>
                <div>
                  <p className="text-rose-600 text-sm">Email Us</p>
                  <p className="text-rose-900 font-semibold">hello@eternalflowers.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white text-xl">📞</div>
                <div>
                  <p className="text-rose-600 text-sm">Call Us</p>
                  <p className="text-rose-900 font-semibold">+44 20 1234 5678</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white text-xl">📍</div>
                <div>
                  <p className="text-rose-600 text-sm">Visit Us</p>
                  <p className="text-rose-900 font-semibold">123 Bloom Street, London</p>
                </div>
              </div>
            </div>
            <form className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:outline-none"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:outline-none"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:outline-none resize-none"
                ></textarea>
                <button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-semibold transition-colors">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌹</span>
              <span className="text-xl font-bold">Eternal Flowers</span>
            </div>
            <p className="text-rose-300">© 2025 Eternal Flowers. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📸</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">🐦</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📘</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
