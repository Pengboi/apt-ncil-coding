'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-black-primary border-b border-gold-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gold-primary">Izzy&apos;s Reflections</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-gray-300 hover:text-gold-primary font-medium transition-colors"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-0 w-48 bg-black-secondary rounded-md shadow-lg py-2 border border-gold-primary/20"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <Link
                    href="/shop"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gold-primary/10 hover:text-gold-primary"
                  >
                    Shop Products
                  </Link>
                  <Link
                    href="/camera-booth"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gold-primary/10 hover:text-gold-primary"
                  >
                    360 Camera Booth
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/services"
              className="text-gray-300 hover:text-gold-primary font-medium transition-colors"
            >
              Our Services
            </Link>

            <Link
              href="/about"
              className="text-gray-300 hover:text-gold-primary font-medium transition-colors"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-gray-300 hover:text-gold-primary font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-300 hover:text-gold-primary transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-primary text-black-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-300 hover:text-gold-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black-secondary border-t border-gold-primary/20">
          <div className="px-4 py-4 space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gold-primary uppercase">Services</p>
              <Link
                href="/shop"
                className="block py-2 text-gray-300 hover:text-gold-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop Products
              </Link>
              <Link
                href="/camera-booth"
                className="block py-2 text-gray-300 hover:text-gold-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                360 Camera Booth
              </Link>
            </div>
            <div className="border-t border-gold-primary/20 pt-3">
              <Link
                href="/services"
                className="block py-2 text-gray-300 hover:text-gold-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Services
              </Link>
              <Link
                href="/about"
                className="block py-2 text-gray-300 hover:text-gold-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-gray-300 hover:text-gold-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
