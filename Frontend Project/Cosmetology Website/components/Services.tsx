'use client';

import { useEffect, useRef, useState } from 'react';
import { Scissors, Sparkles, Hand, Eye, Droplets, SprayCan, ArrowRight } from 'lucide-react';
import styles from './Services.module.css';

const services = [
  {
    icon: Scissors,
    title: 'Hair Styling',
    description: 'From precision cuts to stunning color transformations, our expert stylists create looks that express your unique personality.',
    featured: false,
  },
  {
    icon: Sparkles,
    title: 'Facial Treatments',
    description: 'Rejuvenating facials using premium skincare products to cleanse, hydrate, and restore your skin\'s natural glow.',
    featured: true,
  },
  {
    icon: Hand,
    title: 'Nail Artistry',
    description: 'Luxurious manicures and pedicures with creative nail art designs. Gel, acrylic, and natural nail care.',
    featured: false,
  },
  {
    icon: Eye,
    title: 'Makeup Artistry',
    description: 'Professional makeup for any occasion. Bridal, editorial, special events, and everyday glamour looks.',
    featured: false,
  },
  {
    icon: Droplets,
    title: 'Body Treatments',
    description: 'Relaxing massages, body wraps, and exfoliation treatments to soothe your body and calm your mind.',
    featured: false,
  },
  {
    icon: SprayCan,
    title: 'Tanning & Waxing',
    description: 'Safe spray tanning and professional waxing services for smooth, radiant skin all year round.',
    featured: false,
  },
];

export default function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleCards((prev) => [...prev, index]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-service-card]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className={styles.services} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>What We Offer</span>
          <h2 className={styles.title}>Our Premium Services</h2>
          <p className={styles.subtitle}>
            Indulge in our wide range of beauty and wellness treatments designed to pamper and rejuvenate.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <div
              key={index}
              data-service-card
              data-index={index}
              className={`${styles.card} ${service.featured ? styles.featured : ''} ${
                visibleCards.includes(index) ? styles.visible : ''
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {service.featured && <span className={styles.badge}>Popular</span>}
              
              <div className={styles.iconWrapper}>
                <service.icon className={styles.icon} />
              </div>
              
              <h3 className={styles.cardTitle}>{service.title}</h3>
              
              <p className={styles.description}>{service.description}</p>
              
              <button onClick={scrollToBooking} className={styles.link}>
                Learn More <ArrowRight className={styles.arrow} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
