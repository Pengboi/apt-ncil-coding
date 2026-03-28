'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link href="/" className="logo flex items-center gap-3">
          <Image
            src="/mercedes-logo.png"
            alt="Mercedes-Benz"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="font-semibold tracking-widest text-lg uppercase">Mercedes Benz</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium px-2 py-1 text-sm tracking-wide"
          >
            The Showroom
          </Link>
          <Link
            href="/cars-for-sale"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium px-2 py-1 text-sm tracking-wide"
          >
            Our Vehicles
          </Link>
          <Link
            href="/models"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium px-2 py-1 text-sm tracking-wide"
          >
            Model History
          </Link>
          <Link
            href="/f1-history"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium px-2 py-1 text-sm tracking-wide"
          >
            Racing Legacy
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/"
              className="block px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              The Showroom
            </Link>
            <Link
              href="/cars-for-sale"
              className="block px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Our Vehicles
            </Link>
            <Link
              href="/models"
              className="block px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Model History
            </Link>
            <Link
              href="/f1-history"
              className="block px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Racing Legacy
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
