'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import PigeonChat from './components/PigeonChat';
import PigeonGallery from './components/PigeonGallery';
import customerHenry from './images/customer-henry.jpg';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const shapes = heroRef.current.querySelectorAll('.geo-shape');
        shapes.forEach((shape, index) => {
          const speed = (index + 1) * 0.3;
          (shape as HTMLElement).style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* HERO SECTION - Neo-Brutalist with Memphis Geometrics */}
      <section ref={heroRef} className="hero-section">
        {/* Animated Geometric Background Shapes */}
        <div className="geo-shape shape-1">◆</div>
        <div className="geo-shape shape-2">▲</div>
        <div className="geo-shape shape-3">●</div>
        <div className="geo-shape shape-4">■</div>
        <div className="geo-shape shape-5">★</div>
        
        {/* Grid Pattern Overlay */}
        <div className="grid-overlay"></div>
        
        <div className="container hero-container">
          <div className="hero-content">
            {/* Brutalist Badge */}
            <div className="brutalist-badge">
              <span className="badge-text">AI-POWERED COMPANION</span>
              <div className="badge-line"></div>
            </div>
            
            {/* Massive Typography */}
            <h1 className="hero-title">
              <span className="title-line">MEET YOUR</span>
              <span className="title-line highlight">BEST FRIEND</span>
              <span className="title-emoji">🤖</span>
            </h1>
            
            {/* Description with heavy border */}
            <div className="hero-desc-box">
              <p className="hero-desc">
                The smartest, cutest AI companion that brings joy, intelligence, and endless fun to your life!
              </p>
            </div>
            
            {/* Brutalist Buttons */}
            <div className="hero-actions">
              <Link href="/customize" className="btn-brutalist btn-primary">
                <span className="btn-text">GET YOURS NOW</span>
                <div className="btn-arrow">→</div>
              </Link>
              <Link href="#features" className="btn-brutalist btn-secondary">
                <span className="btn-text">LEARN MORE</span>
              </Link>
            </div>
            
            {/* Stats with brutalist style */}
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">500+</span>
                <span className="stat-label">HAPPY OWNERS</span>
              </div>
              <div className="stat-divider">|</div>
              <div className="stat-item">
                <span className="stat-num">24/7</span>
                <span className="stat-label">ACTIVE</span>
              </div>
              <div className="stat-divider">|</div>
              <div className="stat-item">
                <span className="stat-num">5.0★</span>
                <span className="stat-label">RATING</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image with Brutalist Frame */}
          <div className="hero-visual">
            <div className="image-frame">
              <div className="frame-corner top-left"></div>
              <div className="frame-corner top-right"></div>
              <div className="frame-corner bottom-left"></div>
              <div className="frame-corner bottom-right"></div>
              <div className="image-container">
                <Image
                  src="/pigeonbot-hero.png"
                  alt="PigeonBot AI Companion"
                  width={600}
                  height={600}
                  className="hero-image"
                  priority
                />
              </div>
            </div>
            
            {/* Floating Label */}
            <div className="floating-label">
              <span className="label-tag">NEW</span>
              <span className="label-model">MODEL A1</span>
            </div>
            
            {/* Decorative Elements */}
            <div className="deco-circle"></div>
            <div className="deco-zigzag"></div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span className="scroll-text">SCROLL</span>
        </div>
      </section>

      {/* FEATURES SECTION - Grid Break with Memphis Colors */}
      <section id="features" className="features-section">
        <div className="container">
          {/* Section Header with Asymmetric Layout */}
          <div className="section-header-brutalist">
            <div className="header-accent"></div>
            <div className="header-content">
              <span className="section-tag">FEATURES</span>
              <h2 className="section-title-brutalist">
                WHY YOU&apos;LL
                <br />
                <span className="title-stroke">LOVE IT</span>
              </h2>
            </div>
            <div className="header-deco">💎</div>
          </div>
          
          {/* Asymmetric Feature Grid */}
          <div className="features-grid-brutalist">
            {[
              {icon: '⚡', title: 'LIGHTNING FAST', desc: 'Responds in milliseconds with powerful AI processing.', color: '#FF6B35'},
              {icon: '🎨', title: 'CUSTOMISABLE', desc: 'Choose colors, sounds, and personality traits.', color: '#00D9A5'},
              {icon: '🧠', title: 'SUPER SMART', desc: 'Learns and adapts to your preferences over time.', color: '#0066FF'},
              {icon: '🛡️', title: 'ULTRA SECURE', desc: 'Your data is encrypted with military‑grade security.', color: '#FF006E'},
              {icon: '🔋', title: 'LONG BATTERY', desc: 'Up to 48hrs of continuous operation.', color: '#FFD60A'},
              {icon: '💖', title: 'MADE WITH LOVE', desc: 'Crafted by passionate engineers.', color: '#9B5DE5'},
            ].map((item, index) => (
              <div 
                key={item.title} 
                className={`feature-card-brutalist card-${index % 3}`}
                style={{ '--card-color': item.color } as React.CSSProperties}
              >
                <div className="card-border"></div>
                <div className="card-content">
                  <span className="card-icon">{item.icon}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.desc}</p>
                </div>
                <div className="card-number">0{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION - Diagonal Layout */}
      <section id="gallery" className="gallery-section-brutalist">
        <div className="diagonal-bg"></div>
        <div className="container">
          <div className="gallery-header-brutalist">
            <h2 className="gallery-title">
              PICK YOUR
              <br />
              <span className="gallery-highlight">PIGEON</span>
            </h2>
            <div className="gallery-tag">🖼️ GALLERY</div>
          </div>
          <PigeonGallery />
        </div>
      </section>

      {/* PRICING SECTION - Bold Cards with Heavy Shadows */}
      <section id="prices" className="pricing-section-brutalist">
        <div className="container">
          <div className="pricing-header">
            <span className="pricing-tag">PRICING</span>
            <h2 className="pricing-title">
              SIMPLE PRICING
              <br />
              <span className="pricing-accent">NO HIDDEN FEES</span>
            </h2>
          </div>

          <div className="pricing-grid-brutalist">
            {[
              { name: 'SMALL', price: '$79', desc: 'Compact companion', features: ['Standard AI', '12hr battery', '1yr warranty'], color: '#00D9A5' },
              { name: 'MEDIUM', price: '$129', desc: 'Most popular', features: ['Enhanced AI', '24hr battery', '2yr warranty'], color: '#FF6B35', featured: true },
              { name: 'LARGE', price: '$199', desc: 'Premium model', features: ['All features', '48hr battery', '3yr warranty'], color: '#0066FF' },
            ].map((plan) => (
              <div 
                key={plan.name}
                className={`pricing-card-brutalist ${plan.featured ? 'featured' : ''}`}
                style={{ '--plan-color': plan.color } as React.CSSProperties}
              >
                {plan.featured && <div className="featured-badge">POPULAR</div>}
                <div className="pricing-card-border"></div>
                <div className="plan-header">
                  <span className="plan-name">{plan.name}</span>
                  <span className="plan-price">{plan.price}</span>
                </div>
                <p className="plan-desc">{plan.desc}</p>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature} className="feature-item">
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/customize" className="plan-btn">
                  BUY {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Magazine Layout */}
      <section id="reviews" className="testimonials-section-brutalist">
        <div className="container">
          <div className="testimonials-header">
            <span className="reviews-tag">⭐ REVIEWS</span>
            <h2 className="reviews-title">LOVED BY EVERYONE</h2>
          </div>
          
          <div className="testimonials-grid">
            {[
              {name: 'Sarah Johnson', role: 'Tech Enthusiast', quote: "PigeonBot is amazing! It's like having a smart, fun friend always there. The design is gorgeous and it works flawlessly!", avatar: 'SJ', color: '#FF6B35'},
              {name: 'Marcus Chen', role: 'Product Designer', quote: "Best purchase ever! The AI is impressively smart and learns my preferences. Plus, it looks incredible on my desk!", avatar: 'MC', color: '#00D9A5'},
            ].map((t) => (
              <div 
                key={t.name} 
                className="testimonial-card-brutalist"
                style={{ '--testimonial-color': t.color } as React.CSSProperties}
              >
                <div className="testimonial-quote-mark">"</div>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar" style={{ background: t.color }}>{t.avatar}</div>
                  <div className="author-info">
                    <span className="author-name">{t.name}</span>
                    <span className="author-role">{t.role}</span>
                  </div>
                </div>
                <div className="testimonial-rating">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAT SECTION - Terminal Style */}
      <section id="chat" className="chat-section-brutalist">
        <div className="container">
          <div className="chat-header">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <h2 className="chat-title">CHAT WITH PIGEON_AI.exe</h2>
          </div>
          <div className="chat-container-brutalist">
            <PigeonChat />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - Minimal Form */}
      <section id="contact" className="contact-section-brutalist">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info">
              <span className="contact-tag">💌 CONTACT</span>
              <h2 className="contact-title">GET IN TOUCH</h2>
              <p className="contact-desc">Have questions? We&apos;d love to hear from you!</p>
              <div className="contact-deco">→</div>
            </div>
            
            <div className="contact-form-brutalist">
              <form className="brutalist-form">
                <div className="form-row">
                  <input type="text" placeholder="FIRST NAME" className="form-input-brutalist" />
                  <input type="text" placeholder="LAST NAME" className="form-input-brutalist" />
                </div>
                <input type="email" placeholder="EMAIL ADDRESS" className="form-input-brutalist" />
                <textarea placeholder="YOUR MESSAGE..." rows={5} className="form-input-brutalist"></textarea>
                <button type="submit" className="form-submit-brutalist">
                  SEND MESSAGE →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
