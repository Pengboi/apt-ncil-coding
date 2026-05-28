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

// Types
type Pigeon = {
  id: string;
  name: string;
  src: string | StaticImageData;
  price: number;
  color: string;
};

type Size = {
  id: string;
  name: string;
  price: number;
  features: string[];
  battery: string;
  warranty: string;
};

type Personality = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

type Accessory = {
  id: string;
  name: string;
  price: number;
  icon: string;
};

// Data
const PIGEONS: Pigeon[] = [
  { id: 'classic', name: 'Classic Grey', src: greyPigeon, price: 79, color: '#9ca3af' },
  { id: 'sunburst', name: 'Sunburst', src: sunburstPigeon, price: 129, color: '#fbbf24' },
  { id: 'midnight', name: 'Midnight Blue', src: bluePigeon, price: 199, color: '#3b82f6' },
  { id: 'pink', name: 'Pink Blossom', src: pinkPigeon, price: 89, color: '#ec4899' },
  { id: 'rainbow', name: 'Rainbow', src: rainbowPigeon, price: 149, color: '#8b5cf6' },
  { id: 'custom', name: 'Special Custom', src: specialCustom, price: 179, color: '#f97316' },
  { id: 'teal', name: 'Teal', src: tealPigeon, price: 129, color: '#14b8a6' },
  { id: 'purple', name: 'Royal Purple', src: purplePigeon, price: 119, color: '#9333ea' },
  { id: 'red', name: 'Crimson Red', src: crimsonRed, price: 99, color: '#ef4444' },
  { id: 'black', name: 'Midnight Black', src: blackPigeon, price: 199, color: '#1f2937' },
];

const SIZES: Size[] = [
  { 
    id: 'small', 
    name: 'Small', 
    price: 0, 
    features: ['Standard AI features', 'Compact size', 'Desk-friendly'],
    battery: '12 hours',
    warranty: '1 year'
  },
  { 
    id: 'medium', 
    name: 'Medium', 
    price: 50, 
    features: ['Enhanced AI', 'Personalization', 'Balanced size'],
    battery: '24 hours',
    warranty: '2 years'
  },
  { 
    id: 'large', 
    name: 'Large', 
    price: 120, 
    features: ['Premium AI', 'All features', 'Showpiece size'],
    battery: '48 hours',
    warranty: '3 years + priority'
  },
];

const PERSONALITIES: Personality[] = [
  { id: 'playful', name: 'Playful', icon: '🎮', description: 'Energetic and fun-loving companion' },
  { id: 'calm', name: 'Calm', icon: '😌', description: 'Peaceful and soothing presence' },
  { id: 'energetic', name: 'Energetic', icon: '⚡', description: 'Always ready for adventure' },
  { id: 'wise', name: 'Wise', icon: '📚', description: 'Thoughtful and knowledgeable guide' },
];

const ACCESSORIES: Accessory[] = [
  { id: 'tophat', name: 'Top Hat', price: 5, icon: '🎩' },
  { id: 'sunglasses', name: 'Sunglasses', price: 3, icon: '🕶️' },
  { id: 'bowtie', name: 'Bow Tie', price: 4, icon: '🎀' },
  { id: 'backpack', name: 'Mini Backpack', price: 8, icon: '🎒' },
];

export default function PigeonCustomizer() {
  // State
  const [selectedPigeon, setSelectedPigeon] = useState<Pigeon>(PIGEONS[0]);
  const [selectedSize, setSelectedSize] = useState<Size>(SIZES[1]); // Medium default
  const [selectedPersonality, setSelectedPersonality] = useState<Personality>(PERSONALITIES[0]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [pigeonName, setPigeonName] = useState('');
  const [step, setStep] = useState(1);
  const [savedToStorage, setSavedToStorage] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pigeonCustomization');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const pigeon = PIGEONS.find(p => p.id === data.pigeonId);
        const size = SIZES.find(s => s.id === data.sizeId);
        const personality = PERSONALITIES.find(p => p.id === data.personalityId);
        
        if (pigeon) setSelectedPigeon(pigeon);
        if (size) setSelectedSize(size);
        if (personality) setSelectedPersonality(personality);
        if (data.accessories) setSelectedAccessories(data.accessories);
        if (data.name) setPigeonName(data.name);
      } catch (e) {
        console.error('Failed to load saved customization');
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const data = {
      pigeonId: selectedPigeon.id,
      sizeId: selectedSize.id,
      personalityId: selectedPersonality.id,
      accessories: selectedAccessories,
      name: pigeonName,
    };
    localStorage.setItem('pigeonCustomization', JSON.stringify(data));
    setSavedToStorage(true);
  }, [selectedPigeon, selectedSize, selectedPersonality, selectedAccessories, pigeonName]);

  // Calculate total price
  const calculateTotal = useCallback(() => {
    const basePrice = selectedPigeon.price;
    const sizePrice = selectedSize.price;
    const accessoriesPrice = selectedAccessories.reduce((sum, accId) => {
      const acc = ACCESSORIES.find(a => a.id === accId);
      return sum + (acc?.price || 0);
    }, 0);
    return basePrice + sizePrice + accessoriesPrice;
  }, [selectedPigeon, selectedSize, selectedAccessories]);

  // Toggle accessory
  const toggleAccessory = (id: string) => {
    setSelectedAccessories(prev => 
      prev.includes(id) 
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  // Handle next step
  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  // Handle previous step
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Handle submit
  const handleSubmit = () => {
    const orderData = {
      pigeon: selectedPigeon,
      size: selectedSize,
      personality: selectedPersonality,
      accessories: selectedAccessories.map(id => ACCESSORIES.find(a => a.id === id)),
      name: pigeonName,
      total: calculateTotal(),
    };
    
    // Store order data and redirect to contact
    localStorage.setItem('pigeonOrder', JSON.stringify(orderData));
    window.location.href = '/#contact';
  };

  // Get current accessories objects
  const currentAccessories = selectedAccessories.map(id => 
    ACCESSORIES.find(a => a.id === id)
  ).filter(Boolean) as Accessory[];

  return (
    <div className="customize-container">
      {/* Progress Bar */}
      <div className="customize-progress">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`progress-step ${s === step ? 'active' : s < step ? 'completed' : ''}`}>
            <div className="step-number">{s < step ? '✓' : s}</div>
            <div className="step-label">
              {s === 1 && 'Choose Pigeon'}
              {s === 2 && 'Pick Size'}
              {s === 3 && 'Personality'}
              {s === 4 && 'Accessories'}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="customize-content">
        <AnimatePresence mode="wait">
          {/* Step 1: Choose Pigeon */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="step-content"
            >
              <h2 className="step-title">Choose Your Pigeon</h2>
              <p className="step-subtitle">Select the perfect companion for you</p>
              
              <div className="pigeon-grid">
                {PIGEONS.map((pigeon) => (
                  <motion.button
                    key={pigeon.id}
                    onClick={() => setSelectedPigeon(pigeon)}
                    className={`pigeon-option ${selectedPigeon.id === pigeon.id ? 'selected' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ '--pigeon-color': pigeon.color } as React.CSSProperties}
                  >
                    <div className="pigeon-image-container">
                      <Image
                        src={pigeon.src}
                        alt={pigeon.name}
                        fill
                        className="pigeon-preview-image"
                      />
                    </div>
                    <div className="pigeon-info">
                      <h3 className="pigeon-name">{pigeon.name}</h3>
                      <p className="pigeon-price">${pigeon.price}</p>
                    </div>
                    {selectedPigeon.id === pigeon.id && (
                      <motion.div 
                        className="selected-indicator"
                        layoutId="selectedIndicator"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Choose Size */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="step-content"
            >
              <h2 className="step-title">Select Size</h2>
              <p className="step-subtitle">Choose the perfect size for your space</p>
              
              <div className="size-grid">
                {SIZES.map((size) => (
                  <motion.button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`size-option ${selectedSize.id === size.id ? 'selected' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="size-header">
                      <h3 className="size-name">{size.name}</h3>
                      <p className="size-price">
                        {size.price === 0 ? 'Included' : `+$${size.price}`}
                      </p>
                    </div>
                    <ul className="size-features">
                      {size.features.map((feature, idx) => (
                        <li key={idx} className="feature-item">
                          <span className="check-icon">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="size-specs">
                      <div className="spec-item">
                        <span className="spec-label">Battery:</span>
                        <span className="spec-value">{size.battery}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Warranty:</span>
                        <span className="spec-value">{size.warranty}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Personality */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="step-content"
            >
              <h2 className="step-title">Choose Personality</h2>
              <p className="step-subtitle">How should your pigeon behave?</p>
              
              <div className="personality-grid">
                {PERSONALITIES.map((personality) => (
                  <motion.button
                    key={personality.id}
                    onClick={() => setSelectedPersonality(personality)}
                    className={`personality-option ${selectedPersonality.id === personality.id ? 'selected' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="personality-icon">{personality.icon}</div>
                    <h3 className="personality-name">{personality.name}</h3>
                    <p className="personality-desc">{personality.description}</p>
                  </motion.button>
                ))}
              </div>

              <div className="name-input-section">
                <label className="name-label">Give your pigeon a name (optional)</label>
                <input
                  type="text"
                  value={pigeonName}
                  onChange={(e) => setPigeonName(e.target.value)}
                  placeholder="e.g., Feathers, Bob, Captain..."
                  className="name-input"
                  maxLength={20}
                />
                {pigeonName && (
                  <motion.p 
                    className="name-preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Your pigeon will be called: <strong>{pigeonName}</strong>
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: Accessories */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="step-content"
            >
              <h2 className="step-title">Add Accessories</h2>
              <p className="step-subtitle">Customize your pigeon&apos;s style</p>
              
              <div className="accessories-grid">
                {ACCESSORIES.map((accessory) => (
                  <motion.button
                    key={accessory.id}
                    onClick={() => toggleAccessory(accessory.id)}
                    className={`accessory-option ${selectedAccessories.includes(accessory.id) ? 'selected' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="accessory-icon">{accessory.icon}</div>
                    <h3 className="accessory-name">{accessory.name}</h3>
                    <p className="accessory-price">+${accessory.price}</p>
                    {selectedAccessories.includes(accessory.id) && (
                      <div className="selected-badge">✓</div>
                    )}
                  </motion.button>
                ))}
              </div>

              {currentAccessories.length > 0 && (
                <motion.div 
                  className="selected-accessories"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4>Selected Accessories:</h4>
                  <div className="selected-list">
                    {currentAccessories.map(acc => (
                      <span key={acc.id} className="selected-tag">
                        {acc.icon} {acc.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live Preview Sidebar */}
      <div className="customize-preview">
        <h3 className="preview-title">Your Pigeon</h3>
        
        <div className="preview-image-container">
          <motion.div 
            className="preview-pigeon"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Image
              src={selectedPigeon.src}
              alt={selectedPigeon.name}
              width={250}
              height={250}
              className="preview-image"
            />
            
            {/* Accessories overlay */}
            <div className="accessories-overlay">
              {selectedAccessories.includes('tophat') && (
                <span className="overlay-item tophat">🎩</span>
              )}
              {selectedAccessories.includes('sunglasses') && (
                <span className="overlay-item sunglasses">🕶️</span>
              )}
              {selectedAccessories.includes('bowtie') && (
                <span className="overlay-item bowtie">🎀</span>
              )}
              {selectedAccessories.includes('backpack') && (
                <span className="overlay-item backpack">🎒</span>
              )}
            </div>
          </motion.div>
        </div>

        <div className="preview-details">
          <div className="preview-item">
            <span className="preview-label">Base:</span>
            <span className="preview-value">{selectedPigeon.name}</span>
          </div>
          <div className="preview-item">
            <span className="preview-label">Size:</span>
            <span className="preview-value">{selectedSize.name}</span>
          </div>
          <div className="preview-item">
            <span className="preview-label">Personality:</span>
            <span className="preview-value">{selectedPersonality.icon} {selectedPersonality.name}</span>
          </div>
          {pigeonName && (
            <div className="preview-item">
              <span className="preview-label">Name:</span>
              <span className="preview-value highlight">{pigeonName}</span>
            </div>
          )}
          {currentAccessories.length > 0 && (
            <div className="preview-item">
              <span className="preview-label">Extras:</span>
              <span className="preview-value">{currentAccessories.length} items</span>
            </div>
          )}
        </div>

        <div className="preview-price">
          <div className="price-breakdown">
            <div className="price-row">
              <span>{selectedPigeon.name}</span>
              <span>${selectedPigeon.price}</span>
            </div>
            {selectedSize.price > 0 && (
              <div className="price-row">
                <span>{selectedSize.name} upgrade</span>
                <span>+${selectedSize.price}</span>
              </div>
            )}
            {currentAccessories.map(acc => (
              <div key={acc.id} className="price-row small">
                <span>{acc.name}</span>
                <span>+${acc.price}</span>
              </div>
            ))}
          </div>
          <div className="price-total">
            <span className="total-label">Total</span>
            <span className="total-value">${calculateTotal()}</span>
          </div>
        </div>

        {savedToStorage && (
          <motion.div 
            className="autosave-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span>✓</span> Auto-saved
          </motion.div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="customize-nav">
        <button 
          onClick={prevStep}
          disabled={step === 1}
          className={`nav-btn ${step === 1 ? 'disabled' : ''}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        
        {step < 4 ? (
          <button onClick={nextStep} className="nav-btn primary">
            Next Step
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button onClick={handleSubmit} className="nav-btn primary checkout">
            Add to Cart
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
