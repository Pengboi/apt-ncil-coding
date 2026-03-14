'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, Scissors, Sparkles, Users, Award } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '10k+', label: 'Happy Clients', icon: Users },
    { number: '50+', label: 'Beauty Awards', icon: Scissors },
  ];

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.overlay} />
      
      <div className={`${styles.content} ${mounted ? styles.animate : ''}`}>
        <h1 className={styles.title}>
          Reveal Your <span className={styles.highlight}>Natural Beauty</span>
        </h1>
        
        <p className={styles.subtitle}>
          Experience luxury cosmetology treatments in a serene, relaxing environment. 
          Where beauty meets artistry.
        </p>
        
        <div className={styles.buttons}>
          <button onClick={scrollToBooking} className={styles.btnPrimary}>
            Book Appointment
          </button>
          <button onClick={scrollToServices} className={styles.btnOutline}>
            Our Services
          </button>
        </div>
        
        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.stat}>
              <stat.icon className={styles.statIcon} />
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <span>Scroll Down</span>
        <ChevronDown className={styles.scrollIcon} />
      </div>
    </section>
  );
}
