'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  StarIcon, 
  PlayIcon, 
  ShoppingIcon, 
  ChevronDownIcon 
} from '@/components/ui/Icons';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [countersAnimated, setCountersAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      if (scrolled < windowHeight) {
        contentRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
        contentRef.current.style.opacity = String(1 - scrolled / 700);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Trigger counter animation when stats are visible
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated) {
            setCountersAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsSection);
    return () => observer.disconnect();
  }, [countersAnimated]);

  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach((counter) => {
      const element = counter as HTMLElement;
      const text = element.textContent || '';
      const number = parseInt(text);
      const suffix = text.replace(/[0-9]/g, '');
      
      let current = 0;
      const increment = number / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          element.textContent = number + suffix;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + suffix;
        }
      }, 30);
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-overlay"></div>
      <div className="hero-content" ref={contentRef}>
        <div className="hero-badge">
          <StarIcon />
          <span>Elite Training Guide</span>
        </div>
        <h1 className="hero-title">
          Master Your <span className="highlight">Game</span>,<br />
          Transform Your <span className="highlight">Life</span>
        </h1>
        <p className="hero-subtitle">
          Professional football tips, nutrition advice, and gear recommendations 
          to help you reach your full potential on and off the pitch.
        </p>
        <div className="hero-buttons">
          <a 
            href="#tips" 
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('tips');
            }}
          >
            <PlayIcon />
            Start Training
          </a>
          <a 
            href="#products" 
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('products');
            }}
          >
            <ShoppingIcon />
            View Gear
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Training Tips</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">30+</span>
            <span className="stat-label">Nutrition Guides</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100+</span>
            <span className="stat-label">Product Reviews</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <a 
          href="#tips"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('tips');
          }}
        >
          <ChevronDownIcon />
        </a>
      </div>
    </section>
  );
}
