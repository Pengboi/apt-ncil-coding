import Link from 'next/link';
import { Camera, Shirt, Sparkles, ArrowRight, Star, Check } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Welcome */}
      <section className="relative bg-gradient-to-br from-black-primary via-black-secondary to-black-tertiary overflow-hidden min-h-[40vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/5 via-transparent to-gold-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Welcome to <span className="text-gold-primary">Izzy&apos;s Reflections</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose your experience below. We offer premium custom printing and unforgettable 360° camera booth experiences.
          </p>
        </div>
      </section>

      {/* Choice Section - Two Large Cards */}
      <section className="py-16 bg-black-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Are You Looking For?</h2>
            <p className="text-gray-400">Select a service to get started</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Custom Printing Option */}
            <Link href="/shop" className="group">
              <div className="relative bg-black-tertiary rounded-2xl shadow-2xl border-2 border-gold-primary/20 p-10 hover:border-gold-primary hover:shadow-gold-primary/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute top-4 right-4">
                  <span className="bg-gold-primary/20 text-gold-primary text-sm px-3 py-1 rounded-full border border-gold-primary/30">
                    Shop & Order
                  </span>
                </div>
                
                <div className="w-24 h-24 bg-gold-primary/10 rounded-full flex items-center justify-center mb-6 border-2 border-gold-primary/30 group-hover:bg-gold-primary/20 transition-colors">
                  <Shirt className="h-12 w-12 text-gold-primary" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">Custom Printing</h3>
                <p className="text-gray-400 mb-6 text-lg">
                  Design and order custom shirts, hats, mugs, and more. Perfect for gifts, events, businesses, and personal style.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-gold-primary mr-3" />
                    T-Shirts, Long Sleeves & Hoodies
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-gold-primary mr-3" />
                    Polo Shirts, Shorts & Socks
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-gold-primary mr-3" />
                    Hats, Aprons & Tote Bags
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-gold-primary mr-3" />
                    Mugs, Cups & Plates
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-gold-primary mr-3" />
                    Baby Clothes & Dog Clothes
                  </li>
                </ul>

                <div className="flex items-center text-gold-primary font-semibold text-lg group-hover:text-gold-light">
                  Browse Products & Order
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* 360 Camera Booth Option */}
            <Link href="/camera-booth" className="group">
              <div className="relative bg-black-tertiary rounded-2xl shadow-2xl border-2 border-gold-primary/20 p-10 hover:border-gold-primary hover:shadow-gold-primary/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute top-4 right-4">
                  <span className="bg-gold-primary text-black-primary text-sm px-3 py-1 rounded-full font-semibold">
                    <Star className="h-3 w-3 inline mr-1" />
                    Popular
                  </span>
                </div>
                
                <div className="w-24 h-24 bg-gold-primary/10 rounded-full flex items-center justify-center mb-6 border-2 border-gold-primary/30 group-hover:bg-gold-primary/20 transition-colors">
                  <Camera className="h-12 w-12 text-gold-primary" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">360° Camera Booth</h3>
                <p className="text-gray-400 mb-6 text-lg">
                  Book our state-of-the-art 360° camera booth for your wedding, party, or corporate event. Create stunning videos.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-gold-primary mr-3" />
                    Weddings & Receptions
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-gold-primary mr-3" />
                    Birthday & Anniversary Parties
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-gold-primary mr-3" />
                    Corporate Events
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-gold-primary mr-3" />
                    Instant Social Sharing
                  </li>
                </ul>

                <div className="flex items-center text-gold-primary font-semibold text-lg group-hover:text-gold-light">
                  View Packages & Book
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 bg-black-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-primary/20">
                <Sparkles className="h-8 w-8 text-gold-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Quality</h3>
              <p className="text-gray-400">High-quality materials and professional-grade equipment</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-primary/20">
                <Check className="h-8 w-8 text-gold-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Easy Ordering</h3>
              <p className="text-gray-400">Simple process from selection to checkout</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-primary/20">
                <Star className="h-8 w-8 text-gold-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">5-Star Service</h3>
              <p className="text-gray-400">Rated excellent by our customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-black-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black-tertiary p-6 rounded-lg shadow-md border border-gold-primary/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center text-gold-primary font-bold border border-gold-primary/30">
                  JD
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-white">Jane D.</p>
                  <p className="text-sm text-gray-400">Custom Printing</p>
                </div>
              </div>
              <p className="text-gray-400 italic">
                &quot;The quality of the custom shirts exceeded my expectations! Perfect for our team uniforms. Will definitely order again.&quot;
              </p>
            </div>

            <div className="bg-black-tertiary p-6 rounded-lg shadow-md border border-gold-primary/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center text-gold-primary font-bold border border-gold-primary/30">
                  MT
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-white">Mike T.</p>
                  <p className="text-sm text-gray-400">360° Camera Booth</p>
                </div>
              </div>
              <p className="text-gray-400 italic">
                &quot;The 360 camera booth was the highlight of our corporate event! Everyone loved it and the videos turned out amazing.&quot;
              </p>
            </div>

            <div className="bg-black-tertiary p-6 rounded-lg shadow-md border border-gold-primary/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center text-gold-primary font-bold border border-gold-primary/30">
                  SK
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-white">Sarah K.</p>
                  <p className="text-sm text-gray-400">Custom Printing</p>
                </div>
              </div>
              <p className="text-gray-400 italic">
                &quot;We ordered custom mugs as wedding favors and they were perfect! The printing quality is outstanding and shipping was fast.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
