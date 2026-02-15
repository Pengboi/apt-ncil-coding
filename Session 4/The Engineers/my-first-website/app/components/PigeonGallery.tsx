'use client';

import React, { useState, useRef, useMemo } from 'react';
import Image, { type StaticImageData } from 'next/image';
import greyPigeon from '../images/grey-pigeon.png';
import pinkPigeon from '../images/pink-pigeon.jpeg';
import sunburstPigeon from '../images/sunburst-pigeon.jpg';
import bluePigeon from '../images/blue-pigeon.jpg.webp';
import blackPigeon from '../images/black-pigeon.jpg.webp';
import crimsonRed from '../images/crimson-red.webp';
import purplePigeon from '../images/purple-pigeon.webp';
import rainbowPigeon from '../images/rainbow-pigeon.jpg.avif';
import tealPigeon from '../images/teal-life-pigeons-secret-mechanisms-exposed_1274913-36027.jpg.avif';
import specialCustom from '../images/specialcustom.jpeg';

type Pigeon = { 
  id: string; 
  name: string; 
  src: string | StaticImageData; 
  desc: string; 
  price?: string;
  accentColor: string;
  glowColor: string;
  personality: string[];
};

const PIGEONS: Pigeon[] = [
  { id: 'classic', name: 'Classic Grey', src: greyPigeon, desc: 'Friendly, dependable companion', price: '$79', accentColor: '#6b7280', glowColor: 'rgba(107, 114, 128, 0.4)', personality: ['Loyal', 'Calm'] },
  { id: 'sunburst', name: 'Sunburst', src: sunburstPigeon, desc: 'Bright and cheerful — stands out on any desk', price: '$129', accentColor: '#f59e0b', glowColor: 'rgba(245, 158, 11, 0.4)', personality: ['Energetic', 'Optimistic'] },
  { id: 'midnight', name: 'Midnight Blue', src: bluePigeon, desc: 'Sleek blue collector edition', price: '$199', accentColor: '#3b82f6', glowColor: 'rgba(59, 130, 246, 0.4)', personality: ['Mysterious', 'Wise'] },
  { id: 'pink', name: 'Pink Blossom', src: pinkPigeon, desc: 'Soft pink finish — adorable and playful', price: '$89', accentColor: '#ec4899', glowColor: 'rgba(236, 72, 153, 0.4)', personality: ['Playful', 'Affectionate'] },
  { id: 'rainbow', name: 'Rainbow', src: rainbowPigeon, desc: 'Vibrant multi-color finish', price: '$149', accentColor: '#8b5cf6', glowColor: 'rgba(139, 92, 246, 0.4)', personality: ['Creative', 'Unique'] },
  { id: 'custom', name: 'Special Custom', src: specialCustom, desc: 'One-of-a-kind custom paint — showpiece edition', price: '$179', accentColor: '#f97316', glowColor: 'rgba(249, 115, 22, 0.4)', personality: ['Rare', 'Exclusive'] },
  { id: 'teal', name: 'Teal', src: tealPigeon, desc: 'Calm teal sheen — stylish and modern', price: '$129', accentColor: '#14b8a6', glowColor: 'rgba(20, 184, 166, 0.4)', personality: ['Serene', 'Modern'] },
  { id: 'purple', name: 'Royal Purple', src: purplePigeon, desc: 'Rich purple finish — elegant and playful', price: '$119', accentColor: '#a855f7', glowColor: 'rgba(168, 85, 247, 0.4)', personality: ['Elegant', 'Regal'] },
  { id: 'red', name: 'Crimson Red', src: crimsonRed, desc: 'Bold red finish — eye-catching and energetic', price: '$99', accentColor: '#ef4444', glowColor: 'rgba(239, 68, 68, 0.4)', personality: ['Bold', 'Passionate'] },
  { id: 'black', name: 'Midnight Black', src: blackPigeon, desc: 'Glossy black collector model', price: '$199', accentColor: '#374151', glowColor: 'rgba(55, 65, 81, 0.4)', personality: ['Stealthy', 'Premium'] },
];

function PigeonParticles({ color }: { color: string }) {
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => {
      const seed = i * 7919 + 13;
      const pseudoRandom1 = (seed * 16807 % 2147483647) / 2147483647;
      const pseudoRandom2 = ((seed * 48271) % 2147483647) / 2147483647;
      return {
        x: pseudoRandom1 * 100,
        duration: 3 + pseudoRandom2 * 2,
        delay: i * 0.4,
      };
    })
  , []);

  return (
    <div className="pigeon-particles">
      {particles.map((p, i) => (
        <div
          key={i}
          className="pigeon-particle"
          style={{
            '--particle-color': color,
            '--particle-delay': `${p.delay}s`,
            '--particle-x': `${p.x}%`,
            '--particle-duration': `${p.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function PigeonCard({ 
  pigeon, 
  isSelected, 
  onSelect,
  index
}: { 
  pigeon: Pigeon; 
  isSelected: boolean; 
  onSelect: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div
      className={`pigeon-card-wrapper ${isSelected ? 'selected' : ''}`}
      style={{ '--accent-color': pigeon.accentColor, '--glow-color': pigeon.glowColor } as React.CSSProperties}
    >
      <div
        ref={cardRef}
        className={`pigeon-card-3d ${isSelected ? 'is-selected' : ''}`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          '--animation-delay': `${index * 0.08}s`,
        } as React.CSSProperties}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onSelect}
      >
        <div className="pigeon-card-inner">
          <div className="pigeon-card-glow" />
          <div className="pigeon-card-shimmer" />
          <div className="pigeon-card-image">
            <Image src={pigeon.src} alt={pigeon.name} fill className="object-contain p-2" />
          </div>
          <div className="pigeon-card-info">
            <div className="pigeon-card-name">{pigeon.name}</div>
            <div className="pigeon-card-price">{pigeon.price}</div>
          </div>
          {isSelected && <div className="pigeon-card-badge">Selected</div>}
        </div>
      </div>
    </div>
  );
}

export default function PigeonGallery() {
  const [selected, setSelected] = useState<Pigeon>(PIGEONS[0]);
  const [suggest, setSuggest] = useState('');
  const [suggested, setSuggested] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleSelect(pigeon: Pigeon) {
    if (pigeon.id === selected.id) return;
    setIsAnimating(true);
    setTimeout(() => {
      setSelected(pigeon);
      setIsAnimating(false);
    }, 150);
  }

  function handleSuggest(e: React.FormEvent) {
    e.preventDefault();
    const s = suggest.trim();
    if (!s) return;
    setSuggested(s);
    setSuggest('');
  }

  return (
    <div className="pigeon-gallery">
      <div 
        className={`pigeon-hero visible ${isAnimating ? 'animating' : ''}`}
        style={{ '--hero-accent': selected.accentColor, '--hero-glow': selected.glowColor } as React.CSSProperties}
      >
        <div className="pigeon-hero-bg">
          <div className="pigeon-hero-gradient" />
          <PigeonParticles color={selected.accentColor} />
        </div>
        
        <div className="pigeon-hero-content">
          <div className="pigeon-hero-image-wrapper">
            <div className="pigeon-glow-ring" />
            <div className="pigeon-float">
              <Image 
                src={selected.src} 
                alt={selected.name} 
                width={280} 
                height={280} 
                className="pigeon-hero-image"
              />
            </div>
          </div>
          
          <div className="pigeon-hero-details">
            <div className="pigeon-hero-badge">Your Selection</div>
            <h3 className="pigeon-hero-name">{selected.name}</h3>
            <p className="pigeon-hero-desc">{selected.desc}</p>
            
            <div className="pigeon-hero-traits">
              {selected.personality.map((trait) => (
                <span key={trait} className="pigeon-trait">{trait}</span>
              ))}
            </div>
            
            <div className="pigeon-hero-footer">
              <div className="pigeon-hero-price">{selected.price}</div>
              <a href="#contact" className="btn btn-primary pigeon-buy-btn">
                <span>Buy Now</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pigeon-grid">
        {PIGEONS.map((p, index) => (
          <PigeonCard
            key={p.id}
            pigeon={p}
            isSelected={p.id === selected.id}
            onSelect={() => handleSelect(p)}
            index={index}
          />
        ))}
      </div>

      <div className="pigeon-suggest">
        <div className="pigeon-suggest-label">Want another color? Suggest one!</div>
        <form onSubmit={handleSuggest} className="pigeon-suggest-form">
          <input 
            value={suggest} 
            onChange={(e) => setSuggest(e.target.value)} 
            placeholder="e.g. Gold, Silver, Neon Green..." 
            className="form-input" 
          />
          <button type="submit" className="btn btn-outline">Suggest</button>
        </form>
        {suggested && (
          <div className="pigeon-suggest-success">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Thanks — we&apos;ll consider adding &ldquo;{suggested}&rdquo;!</span>
          </div>
        )}
      </div>
    </div>
  );
}
