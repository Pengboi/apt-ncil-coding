"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const services = [
    "Trims", "Layers", "Bobs", "Pixie Cuts", "Side Bangs", "Restyle",
    "Highlights", "Balayage", "Ombre", "Root Touch Up", "Full Head Colour",
    "Blow Dry", "Curls", "Straightening", "Deep Conditioning",
    "Bridal Hair", "Wedding Styling", "Prom Hair", "Updos"
  ];

  const filteredServices = services.filter(service =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5EDE0] flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white border-b-2 border-[#E8DDD0] px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="font-[family-name:var(--font-title)] text-4xl text-[#8B7355] hover:text-[#6B5344] transition-colors">
            Hair by Julieta
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#D4C4B0] text-[#8B7355] rounded-full font-medium hover:bg-[#D4C4B0] hover:text-white transition-all shadow-sm"
            >
              <span>🔍</span>
              Search
            </button>
            <Link 
              href="/booking"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#A0826D] to-[#8B7355] text-white rounded-full font-medium hover:shadow-lg hover:translate-y-[-2px] transition-all"
            >
              <span>✨</span>
              Book Now
            </Link>
            <Link 
              href="/prices"
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#8B7355] text-[#8B7355] rounded-full font-medium hover:bg-[#8B7355] hover:text-white transition-all shadow-sm"
            >
              <span>📋</span>
              Price List
            </Link>
            <Link 
              href="/events"
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#8B7355] text-[#8B7355] rounded-full font-medium hover:bg-[#8B7355] hover:text-white transition-all shadow-sm"
            >
              <span>🎉</span>
              Events
            </Link>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      {showSearch && (
        <div className="bg-[#E8DDD0] px-6 py-4 border-b-2 border-[#D4C4B0]">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 pl-12 bg-white border-2 border-[#D4C4B0] rounded-full text-[#5D4037] placeholder-[#A0826D] focus:outline-none focus:border-[#8B7355] focus:ring-2 focus:ring-[rgba(160,130,109,0.2)]"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A0826D] text-xl">🔍</span>
            </div>
            {searchQuery && (
              <div className="mt-3 bg-white rounded-2xl shadow-lg border border-[#E8DDD0] max-h-60 overflow-y-auto">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service, index) => (
                    <Link
                      key={index}
                      href="/prices"
                      className="block px-6 py-3 text-[#5D4037] hover:bg-[#F5EDE0] border-b border-[#E8DDD0] last:border-0 transition-colors"
                    >
                      {service}
                    </Link>
                  ))
                ) : (
                  <div className="px-6 py-4 text-[#8D6E63]">No services found</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-b from-[#E8DDD0] via-[#F5EDE0] to-[#FFFCF8]">
        {/* Main Content */}
        <div className="max-w-4xl">
          {/* Welcome Badge */}
          <div className="inline-block bg-white/80 backdrop-blur-sm border-2 border-[#D4C4B0] text-[#8B7355] px-8 py-3 rounded-full font-medium text-lg mb-8 shadow-lg">
            ✨ Welcome to Our Salon ✨
          </div>

          {/* Title - White Pastel Font */}
          <h1 className="font-[family-name:var(--font-title)] text-8xl md:text-[10rem] text-white mb-6 leading-tight drop-shadow-2xl"
              style={{textShadow: '0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4), 4px 4px 0px rgba(139,115,85,0.1)'}}>
            Hair by Julieta
          </h1>

          {/* Subtitle */}
          <p className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl text-[#8B7355] mb-8 font-light">
            Where Your Beauty Journey Begins
          </p>

          {/* Welcome Description */}
          <p className="text-lg md:text-xl text-[#6D4C41] max-w-2xl mx-auto mb-12 leading-relaxed bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#E8DDD0]">
            Step into a world of beauty and elegance at Hair by Julieta. We specialize in creating 
            stunning hairstyles that bring out your natural beauty. From precision cuts to vibrant colours, 
            from everyday styling to special occasion glamour – we're here to make you look and feel 
            absolutely fabulous! 💕
          </p>

          {/* Welcome Message */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-[#E8DDD0] p-8 mb-12 max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-title)] text-4xl text-[#8B7355] mb-4">
              Welcome!
            </h2>
            <p className="text-[#6D4C41] leading-relaxed mb-6">
              Whether you're preparing for a special event, need a fresh new look, or simply want to 
              treat yourself to some pampering, you've come to the right place. Browse our services, 
              check our prices, or book your appointment today!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/prices"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5EDE0] border-2 border-[#D4C4B0] text-[#8B7355] rounded-full font-medium hover:bg-[#D4C4B0] hover:text-white transition-all"
              >
                <span>📋</span>
                Browse Services
              </Link>
              <Link 
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#A0826D] to-[#8B7355] text-white rounded-full font-medium hover:shadow-lg transition-all"
              >
                <span>✨</span>
                Book Now
              </Link>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link 
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#A0826D] to-[#8B7355] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:translate-y-[-3px] transition-all"
            >
              <span className="text-2xl">✨</span>
              Book Appointment
            </Link>
            <Link 
              href="/prices"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#8B7355] text-[#8B7355] rounded-full font-semibold text-lg shadow-md hover:bg-[#8B7355] hover:text-white hover:shadow-lg hover:translate-y-[-3px] transition-all"
            >
              <span className="text-2xl">📋</span>
              View Prices
            </Link>
            <Link 
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#A0826D] text-[#A0826D] rounded-full font-semibold text-lg shadow-md hover:bg-[#A0826D] hover:text-white hover:shadow-lg hover:translate-y-[-3px] transition-all"
            >
              <span className="text-2xl">🎉</span>
              Events & Parties
            </Link>
          </div>

          {/* Service Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/prices" className="group">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-[#E8DDD0] hover:border-[#A0826D] hover:shadow-lg hover:translate-y-[-5px] transition-all text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">✂️</div>
                <h3 className="font-semibold text-[#5D4037]">Hair Cuts</h3>
                <p className="text-sm text-[#8D6E63] mt-1">From £25</p>
              </div>
            </Link>
            <Link href="/prices" className="group">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-[#E8DDD0] hover:border-[#8B7355] hover:shadow-lg hover:translate-y-[-5px] transition-all text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎨</div>
                <h3 className="font-semibold text-[#5D4037]">Colour & Dye</h3>
                <p className="text-sm text-[#8D6E63] mt-1">From £125</p>
              </div>
            </Link>
            <Link href="/prices" className="group">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-[#E8DDD0] hover:border-[#A0826D] hover:shadow-lg hover:translate-y-[-5px] transition-all text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💇‍♀️</div>
                <h3 className="font-semibold text-[#5D4037]">Styling</h3>
                <p className="text-sm text-[#8D6E63] mt-1">From £20</p>
              </div>
            </Link>
            <Link href="/events" className="group">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-[#E8DDD0] hover:border-[#8B7355] hover:shadow-lg hover:translate-y-[-5px] transition-all text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">👰</div>
                <h3 className="font-semibold text-[#5D4037]">Special Events</h3>
                <p className="text-sm text-[#8D6E63] mt-1">From £55</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-[#E8DDD0] px-6 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-[family-name:var(--font-title)] text-3xl text-[#8B7355] mb-4">
            Hair by Julieta
          </p>
          <p className="text-[#8D6E63] mb-4">
            📞 [Your Phone] | 📧 [Your Email] | 📍 [Your Location]
          </p>
          <p className="text-sm text-[#A0826D]">
            © 2026 Hair by Julieta. All rights reserved. | Open Mon-Sat 9am-6pm
          </p>
        </div>
      </footer>
    </div>
  );
}
