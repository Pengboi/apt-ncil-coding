'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import greyPigeon from '../images/grey-pigeon.png';
import pinkPigeon from '../images/pink-pigeon.jpeg';
import sunburstPigeon from '../images/sunburst-pigeon.jpg';
import bluePigeon from '../images/blue-pigeon.jpg.webp';
import blackPigeon from '../images/black-pigeon.jpg.webp';
import crimsonRed from '../images/crimson-red.webp';
import purplePigeon from '../images/purple-pigeon.webp';
import rainbowPigeon from '../images/rainbow-pigeon.jpg';
import tealPigeon from '../images/teal-pigeon.jpg';
import specialCustom from '../images/specialcustom.jpeg';

type Pigeon = {
  id: string;
  name: string;
  src: string | StaticImageData;
  desc: string;
  price: string;
  tag?: string;
  color: string;
};

const PIGEONS: Pigeon[] = [
  { id: 'classic', name: 'Classic Grey', src: greyPigeon, desc: 'Friendly, dependable companion — the original that started it all', price: '$79', color: '#9ca3af' },
  { id: 'sunburst', name: 'Sunburst', src: sunburstPigeon, desc: 'Bright and cheerful — stands out on any desk', price: '$129', tag: 'Popular', color: '#fbbf24' },
  { id: 'midnight', name: 'Midnight Blue', src: bluePigeon, desc: 'Sleek blue collector edition with premium finish', price: '$199', tag: 'Premium', color: '#3b82f6' },
  { id: 'pink', name: 'Pink Blossom', src: pinkPigeon, desc: 'Soft pink finish — adorable and playful', price: '$89', color: '#ec4899' },
  { id: 'rainbow', name: 'Rainbow', src: rainbowPigeon, desc: 'Vibrant multi-color finish for the bold', price: '$149', tag: 'Limited', color: '#8b5cf6' },
  { id: 'custom', name: 'Special Custom', src: specialCustom, desc: 'One-of-a-kind custom paint — showpiece edition', price: '$179', tag: 'Unique', color: '#f97316' },
  { id: 'teal', name: 'Teal', src: tealPigeon, desc: 'Calm teal sheen — stylish and modern', price: '$129', color: '#14b8a6' },
  { id: 'purple', name: 'Royal Purple', src: purplePigeon, desc: 'Rich purple finish — elegant and playful', price: '$119', color: '#9333ea' },
  { id: 'red', name: 'Crimson Red', src: crimsonRed, desc: 'Bold red finish — eye-catching and energetic', price: '$99', color: '#ef4444' },
  { id: 'black', name: 'Midnight Black', src: blackPigeon, desc: 'Glossy black collector model with stealth aesthetic', price: '$199', tag: 'Premium', color: '#1f2937' },
];

export default function PigeonGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [suggest, setSuggest] = useState('');
  const [suggested, setSuggested] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const selected = PIGEONS[currentIndex];

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PIGEONS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + PIGEONS.length) % PIGEONS.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  function handleSuggest(e: React.FormEvent) {
    e.preventDefault();
    const s = suggest.trim();
    if (!s) return;
    setSuggested(s);
    setSuggest('');
  }

  return (
    <div className="gallery-container">
      {/* Main Showcase Area */}
      <div className="gallery-showcase">
        {/* Background Glow Effect */}
        <motion.div 
          className="gallery-glow"
          animate={{ 
            background: `radial-gradient(circle at 50% 50%, ${selected.color}40 0%, transparent 70%)` 
          }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="gallery-nav gallery-nav-prev" aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={nextSlide} className="gallery-nav gallery-nav-next" aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Main Image Display */}
        <div className="gallery-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="gallery-image-wrapper"
            >
              <div className="gallery-image-float">
                <Image
                  src={selected.src}
                  alt={selected.name}
                  width={450}
                  height={450}
                  className="gallery-image"
                  priority
                />
              </div>
              
              {/* Floating Tag */}
              {selected.tag && (
                <motion.div 
                  className="gallery-tag"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  style={{ background: selected.color }}
                >
                  {selected.tag}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Info Panel */}
        <div className="gallery-info">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Model Counter */}
              <div className="gallery-counter">
                <span className="gallery-counter-current">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="gallery-counter-divider" />
                <span className="gallery-counter-total">{String(PIGEONS.length).padStart(2, '0')}</span>
              </div>

              {/* Name & Description */}
              <h3 className="gallery-name">{selected.name}</h3>
              <p className="gallery-desc">{selected.desc}</p>

              {/* Price */}
              <div className="gallery-price-row">
                <span className="gallery-price">{selected.price}</span>
                <span className="gallery-price-original">${parseInt(selected.price.slice(1)) * 1.5}</span>
              </div>

              {/* Actions */}
              <div className="gallery-actions">
                <a href="/customize" className="gallery-btn gallery-btn-primary">
                  Buy Now
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </a>
                <button 
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`gallery-btn gallery-btn-secondary ${isAutoPlaying ? 'active' : ''}`}
                >
                  {isAutoPlaying ? 'Pause' : 'Play'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    {isAutoPlaying ? (
                      <path d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="gallery-thumbnails">
        {PIGEONS.map((pigeon, index) => (
          <motion.button
            key={pigeon.id}
            onClick={() => goToSlide(index)}
            className={`gallery-thumb ${index === currentIndex ? 'active' : ''}`}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0.6,
              scale: index === currentIndex ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
            style={{
              '--thumb-color': pigeon.color,
            } as React.CSSProperties}
          >
            <div className="gallery-thumb-image">
              <Image
                src={pigeon.src}
                alt={pigeon.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="gallery-thumb-name">{pigeon.name}</div>
            {index === currentIndex && (
              <motion.div 
                className="gallery-thumb-indicator"
                layoutId="thumbIndicator"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="gallery-progress">
        {PIGEONS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`gallery-progress-dot ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to pigeon ${index + 1}`}
          >
            {index === currentIndex && (
              <motion.div 
                className="gallery-progress-fill"
                layoutId="progressFill"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Suggestion Section */}
      <div className="gallery-suggest">
        <div className="gallery-suggest-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="gallery-suggest-content">
          <h4>Have an idea?</h4>
          <p>Suggest a new color and we might add it to our collection!</p>
          <form onSubmit={handleSuggest} className="gallery-suggest-form">
            <input
              value={suggest}
              onChange={(e) => setSuggest(e.target.value)}
              placeholder="e.g. Gold, Silver, Neon Green..."
              className="gallery-suggest-input"
            />
            <button type="submit" className="gallery-suggest-btn">
              Suggest
            </button>
          </form>
          {suggested && (
            <motion.div 
              className="gallery-suggest-thanks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 13l4 4L19 7" />
              </svg>
              Thanks! We&apos;ll consider adding &quot;{suggested}&quot;
            </motion.div>
          )}
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="gallery-hint">
        Use <kbd>←</kbd> <kbd>→</kbd> arrow keys to navigate
      </div>
    </div>
  );
}
