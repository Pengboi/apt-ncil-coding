'use client';

import React, { useEffect, useRef } from 'react';
import { 
  HeartbeatIcon, 
  CarrotIcon, 
  UtensilsIcon, 
  ClockIcon, 
  BoltIcon, 
  RecycleIcon, 
  TintIcon, 
  GlassWaterIcon, 
  BedIcon, 
  MoonIcon, 
  CheckCircleIcon, 
  BrainIcon, 
  SpaIcon, 
  LungsIcon, 
  EyeIcon, 
  CommentsIcon, 
  TargetIcon 
} from '@/components/ui/Icons';

export default function Lifestyle() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('[data-aos]');
            elements.forEach((el) => {
              const delay = el.getAttribute('data-aos-delay');
              if (delay) {
                setTimeout(() => {
                  el.classList.add('aos-animate');
                }, parseInt(delay));
              } else {
                el.classList.add('aos-animate');
              }
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="lifestyle" className="section lifestyle-section" ref={sectionRef}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="sleepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00b894" />
            <stop offset="100%" stopColor="#0984e3" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="container">
        <div className="section-header light">
          <span className="section-badge">
            <HeartbeatIcon />
            Wellness
          </span>
          <h2 className="section-title">Healthy Lifestyle</h2>
          <p className="section-subtitle">
            Peak performance requires proper nutrition, recovery, and mental wellness
          </p>
        </div>

        <div className="lifestyle-grid">
          {/* Nutrition */}
          <div className="lifestyle-card nutrition" data-aos="fade-right">
            <div className="lifestyle-image">
              <div className="lifestyle-icon-circle">
                <CarrotIcon />
              </div>
            </div>
            <div className="lifestyle-content">
              <h3><UtensilsIcon /> Nutrition</h3>
              <p>Fuel your body with the right nutrients for optimal performance and recovery.</p>
              <div className="lifestyle-tips">
                <div className="lifestyle-tip">
                  <span className="tip-icon-small"><ClockIcon /></span>
                  <div>
                    <strong>Pre-Game (2-3 hours before)</strong>
                    <span>Carbs + lean protein: Pasta with chicken, brown rice with fish</span>
                  </div>
                </div>
                <div className="lifestyle-tip">
                  <span className="tip-icon-small"><BoltIcon /></span>
                  <div>
                    <strong>Quick Energy (30 mins before)</strong>
                    <span>Banana, energy bar, or small smoothie</span>
                  </div>
                </div>
                <div className="lifestyle-tip">
                  <span className="tip-icon-small"><RecycleIcon /></span>
                  <div>
                    <strong>Post-Game Recovery</strong>
                    <span>Protein shake within 30 mins, then balanced meal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hydration */}
          <div className="lifestyle-card hydration" data-aos="fade-left">
            <div className="lifestyle-image">
              <div className="lifestyle-icon-circle">
                <TintIcon />
              </div>
            </div>
            <div className="lifestyle-content">
              <h3><TintIcon /> Hydration</h3>
              <p>Stay hydrated to maintain peak performance and prevent injuries.</p>
              <div className="hydration-tracker">
                <div className="tracker-item">
                  <div className="tracker-glass">
                    <GlassWaterIcon />
                  </div>
                  <span>2-3L daily</span>
                </div>
                <div className="tracker-item">
                  <div className="tracker-glass active">
                    <GlassWaterIcon />
                  </div>
                  <span>500ml before game</span>
                </div>
                <div className="tracker-item">
                  <div className="tracker-glass">
                    <GlassWaterIcon />
                  </div>
                  <span>150ml every 15 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sleep & Recovery */}
          <div className="lifestyle-card recovery" data-aos="fade-right">
            <div className="lifestyle-image">
              <div className="lifestyle-icon-circle">
                <BedIcon />
              </div>
            </div>
            <div className="lifestyle-content">
              <h3><MoonIcon /> Sleep & Recovery</h3>
              <p>Your body repairs and grows stronger during rest. Prioritize quality sleep.</p>
              <div className="sleep-stats">
                <div className="sleep-ring">
                  <svg viewBox="0 0 100 100">
                    <circle className="bg" cx="50" cy="50" r="45"/>
                    <circle className="progress" cx="50" cy="50" r="45"/>
                  </svg>
                  <div className="ring-content">
                    <span className="ring-number">8-10</span>
                    <span className="ring-label">hours</span>
                  </div>
                </div>
                <div className="sleep-benefits">
                  <span><CheckCircleIcon /> Muscle recovery</span>
                  <span><CheckCircleIcon /> Mental focus</span>
                  <span><CheckCircleIcon /> Injury prevention</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mental Health */}
          <div className="lifestyle-card mental" data-aos="fade-left">
            <div className="lifestyle-image">
              <div className="lifestyle-icon-circle">
                <BrainIcon />
              </div>
            </div>
            <div className="lifestyle-content">
              <h3><SpaIcon /> Mental Wellness</h3>
              <p>Football is as much mental as physical. Develop mental toughness and focus.</p>
              <div className="mental-tips">
                <div className="mental-tip">
                  <LungsIcon />
                  <span>Deep breathing before matches</span>
                </div>
                <div className="mental-tip">
                  <EyeIcon />
                  <span>Visualize successful plays</span>
                </div>
                <div className="mental-tip">
                  <CommentsIcon />
                  <span>Positive self-talk</span>
                </div>
                <div className="mental-tip">
                  <TargetIcon />
                  <span>Set achievable goals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
