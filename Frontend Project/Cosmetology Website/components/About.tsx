'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle, ImageIcon } from 'lucide-react';
import styles from './About.module.css';

const features = [
  'Certified Professional Staff',
  'Premium Quality Products',
  'Relaxing Luxury Environment',
  'Personalized Treatment Plans',
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className="container">
        <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.images}>
            <div className={styles.mainImage}>
              <div className={styles.placeholder}>
                <ImageIcon className={styles.placeholderIcon} />
              </div>
            </div>
            
            <div className={styles.secondaryImage}>
              <div className={styles.placeholder}>
                <ImageIcon className={styles.placeholderIcon} />
              </div>
            </div>
            
            <div className={styles.experience}>
              <span className={styles.expNumber}>15</span>
              <span className={styles.expText}>Years of<br />Excellence</span>
            </div>
          </div>
          
          <div className={styles.content}>
            <span className={styles.tag}>About Us</span>
            
            <h2 className={styles.title}>Where Beauty Dreams Come True</h2>
            
            <p className={styles.text}>
              Founded in 2009, Bella Beauty has been at the forefront of the cosmetology industry, 
              combining traditional techniques with modern innovations to deliver exceptional results.
            </p>
            
            <p className={styles.text}>
              Our team of certified professionals is passionate about helping you look and feel your best. 
              We use only premium, cruelty-free products and maintain the highest standards of hygiene and safety.
            </p>
            
            <div className={styles.features}>
              {features.map((feature, index) => (
                <div key={index} className={styles.feature}>
                  <CheckCircle className={styles.checkIcon} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <a href="#contact" className={styles.btn}>
              Meet Our Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
