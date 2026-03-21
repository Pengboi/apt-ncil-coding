'use client';

import React from 'react';
import './globals.css';

export default function Home() {
  React.useEffect(() => {
    // Smooth scroll for navigation links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleClick);

    // Add intersection observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all model cards and sections
    document.querySelectorAll('.model-card, .stat-item').forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      (el as HTMLElement).style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(el);
    });

    return () => {
      document.removeEventListener('click', handleClick);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-grid"></div>
        <div className="hero-content">
          <p className="hero-subtitle">Automotive Excellence Since 1926</p>
          <h1 className="hero-title">
            Mercedes<span className="hero-title-accent">-</span>Benz
          </h1>
          <p className="hero-tagline">The Best or Nothing</p>
          <p className="hero-description">
            Experience the pinnacle of luxury, performance, and innovation. From the refined C-Class to the exquisite S-Class, 
            discover a driving experience crafted without compromise.
          </p>
          <div className="hero-cta">
            <a href="/cars-for-sale" className="btn btn-primary">Browse Collection</a>
            <a href="#models" className="btn btn-secondary">Explore Models</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="models-section">
        <div className="section-header">
          <p className="section-label">The Collection</p>
          <h2 className="section-title">Signature Models</h2>
          <p className="section-description">
            Each Mercedes-Benz represents the perfect synthesis of innovative technology and timeless elegance.
          </p>
        </div>

        <div className="models-grid">
          <div className="model-card">
            <div className="model-letter">C</div>
            <div className="model-content">
              <h3 className="model-name">C-Class</h3>
              <p className="model-description">
                The compact executive sedan that delivers dynamic performance with refined sophistication. 
                Where sporty handling meets intelligent luxury.
              </p>
              <a href="/cars-for-sale" className="model-link">Discover C-Class →</a>
            </div>
          </div>

          <div className="model-card">
            <div className="model-letter">E</div>
            <div className="model-content">
              <h3 className="model-name">E-Class</h3>
              <p className="model-description">
                The executive choice for those who demand excellence. Intelligent technology 
                wrapped in unmistakable elegance for the discerning driver.
              </p>
              <a href="/cars-for-sale" className="model-link">Discover E-Class →</a>
            </div>
          </div>

          <div className="model-card">
            <div className="model-letter">S</div>
            <div className="model-content">
              <h3 className="model-name">S-Class</h3>
              <p className="model-description">
                The pinnacle of automotive excellence. Experience first-class comfort, 
                groundbreaking innovation, and the art of arriving.
              </p>
              <a href="/cars-for-sale" className="model-link">Discover S-Class →</a>
            </div>
          </div>
        </div>
      </section>

      {/* F1 Section */}
      <section className="f1-section" id="f1">
        <div className="f1-content">
          <div className="section-header">
            <p className="section-label">Formula One</p>
            <h2 className="section-title">Mercedes-AMG Petronas</h2>
          </div>

          <div className="f1-grid">
            <div className="f1-text">
              <h2 className="f1-heading">Legacy of<br />Excellence</h2>
              <p>
                From the dominance of the hybrid era to continuous innovation on the world's most demanding circuits, 
                Mercedes-AMG Petronas represents the relentless pursuit of perfection that defines our brand.
              </p>

              <div className="f1-stats">
                <div className="stat-item">
                  <div className="stat-number">8</div>
                  <div className="stat-label">Constructors&apos; Titles</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">125+</div>
                  <div className="stat-label">Race Victories</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">2010</div>
                  <div className="stat-label">Team Founded</div>
                </div>
              </div>

              <a href="/f1-history" className="btn btn-primary">Explore F1 Heritage</a>
            </div>

            <div className="f1-visual">
              <div className="f1-logo">F1</div>
              <div className="f1-tagline">Silver Arrows</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <p className="section-label cta-label">Begin Your Journey</p>
        <h2 className="cta-heading">Ready to Experience Excellence?</h2>
        <p className="cta-description">
          Whether you seek the comfort of our luxury sedans or wish to explore our racing heritage, 
          your journey begins here.
        </p>
        <div className="cta-buttons">
          <a href="/cars-for-sale" className="btn btn-light">View All Models</a>
          <a href="/f1-history" className="btn btn-outline-light">F1 History</a>
        </div>
      </section>
    </>
  );
}
