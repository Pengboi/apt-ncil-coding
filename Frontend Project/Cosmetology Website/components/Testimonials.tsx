'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "Absolutely love this place! The staff is incredibly talented and friendly. My hair has never looked better. I wouldn't trust anyone else with my color treatments!",
    name: 'Sarah Mitchell',
    role: 'Regular Client',
  },
  {
    id: 2,
    rating: 5,
    text: "I got my bridal makeup done here and it was absolutely perfect. The artist listened to exactly what I wanted and made me feel like a princess on my special day!",
    name: 'Emma Thompson',
    role: 'Bride',
  },
  {
    id: 3,
    rating: 5,
    text: "The facial treatments here are heavenly. My skin has improved so much since I started coming here. The ambiance is so relaxing too!",
    name: 'Jessica Chen',
    role: 'Skincare Client',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>Testimonials</span>
          <h2 className={styles.title}>What Our Clients Say</h2>
          <p className={styles.subtitle}>
            Real stories from our beloved clients who experienced the Bella Beauty difference.
          </p>
        </div>

        <div className={styles.slider}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`${styles.card} ${index === currentIndex ? styles.active : ''}`}
            >
              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className={styles.star} fill="#ffc107" />
                ))}
              </div>
              
              <p className={styles.text}>{testimonial.text}</p>
              
              <div className={styles.author}>
                <div className={styles.avatar}>
                  <User className={styles.avatarIcon} />
                </div>
                <div className={styles.authorInfo}>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.nav}>
            <button onClick={prevTestimonial} className={styles.navBtn}>
              <ChevronLeft className={styles.navIcon} />
            </button>
            
            <div className={styles.dots}>
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            
            <button onClick={nextTestimonial} className={styles.navBtn}>
              <ChevronRight className={styles.navIcon} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
