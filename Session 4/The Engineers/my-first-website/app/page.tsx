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
      rootMargin: '0px 0px -100px 0px'
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
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">MERCEDES-BENZ</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#models">Models</a></li>
            <li><a href="#f1">F1 History</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-grid"></div>
        <div className="hero-content">
          <p className="hero-subtitle">AUTOMOTIVE EXCELLENCE SINCE 1926</p>
          <h1 className="hero-title">MERCEDES-BENZ</h1>
          <p className="hero-tagline">The Best or Nothing</p>
          <p className="hero-description">
            Experience luxury, performance, and innovation. From the C-Class to the S-Class, and the dominance of Mercedes-AMG Petronas in Formula 1.
          </p>
          <div className="hero-cta">
            <a href="#models" className="btn btn-primary">Explore Models</a>
            <a href="#f1" className="btn btn-secondary">F1 History</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="models-section">
        <div className="section-header">
          <p className="section-label">LUXURY COLLECTION</p>
          <h2 className="section-title">Featured Models</h2>
          <p className="section-description">
            Discover our range of luxury vehicles, from sporty sedans to the pinnacle of automotive excellence.
          </p>
        </div>

        <div className="models-grid">
          <div className="model-card">
            <div className="model-letter">C</div>
            <div className="model-content">
              <h3 className="model-name">C-Class</h3>
              <p className="model-description">
                Compact executive sedan with sporty design and advanced technology.
              </p>
              <a href="#" className="model-link">Learn More →</a>
            </div>
          </div>

          <div className="model-card">
            <div className="model-letter">E</div>
            <div className="model-content">
              <h3 className="model-name">E-Class</h3>
              <p className="model-description">
                Mid-size luxury sedan perfect for business and comfort.
              </p>
              <a href="#" className="model-link">Learn More →</a>
            </div>
          </div>

          <div className="model-card">
            <div className="model-letter">S</div>
            <div className="model-content">
              <h3 className="model-name">S-Class</h3>
              <p className="model-description">
                The flagship luxury sedan with cutting-edge innovation.
              </p>
              <a href="#" className="model-link">Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* F1 Section */}
      <section className="f1-section" id="f1">
        <div className="f1-content">
          <div className="section-header">
            <p className="section-label">FORMULA 1</p>
            <h2 className="section-title">Mercedes-AMG Petronas</h2>
          </div>

          <div className="f1-grid">
            <div className="f1-text">
              <h2 className="f1-heading">Silver Arrows<br />Legacy of Excellence</h2>
              <p>
                Experience the dominance of Mercedes-AMG Petronas in Formula 1. From 2014 to 2020, we achieved 7 consecutive Constructors&apos; Championships, establishing ourselves as one of the most successful teams in F1 history.
              </p>

              <div className="f1-stats">
                <div className="stat-item">
                  <div className="stat-number">7</div>
                  <div className="stat-label">Constructors&apos; Titles</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Race Wins</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">2010</div>
                  <div className="stat-label">Team Founded</div>
                </div>
              </div>

              <a href="#" className="btn btn-primary">Explore F1 History</a>
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
        <p className="section-label cta-label">GET STARTED</p>
        <h2 className="cta-heading">Ready to Experience Excellence?</h2>
        <p className="cta-description">
          Whether you&apos;re interested in our luxury vehicles or our racing heritage, there&apos;s something for everyone.
        </p>
        <div className="cta-buttons">
          <a href="#models" className="btn btn-primary">View All Models</a>
          <a href="#f1" className="btn btn-secondary">F1 History</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <div className="footer-brand">MERCEDES-BENZ</div>
            <p className="footer-tagline">The best or nothing. Experience luxury, performance, and innovation.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#models">Models</a></li>
              <li><a href="#f1">F1 History</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Model Series</h4>
            <ul className="footer-links">
              <li><a href="#">C-Class</a></li>
              <li><a href="#">E-Class</a></li>
              <li><a href="#">S-Class</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Mercedes-Benz Fan Website. Not affiliated with Daimler AG.</p>
          <p className="footer-links-bottom">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </p>
        </div>
      </footer>
    </>
  );
}