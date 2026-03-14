'use client';

import { useState } from 'react';
import { Expand, Scissors, Eye, Hand, Sparkles } from 'lucide-react';
import styles from './Gallery.module.css';

const categories = ['all', 'hair', 'makeup', 'nails', 'facial'];

const galleryItems = [
  { id: 1, category: 'hair', title: 'Hair Styling', icon: Scissors, image: '/hair-styling.webp' },
  { id: 2, category: 'makeup', title: 'Bridal Makeup', icon: Eye, image: '/bridal-makeup.webp' },
  { id: 3, category: 'nails', title: 'Nail Art', icon: Hand, image: '/nail-art.webp' },
  { id: 4, category: 'facial', title: 'Facial Treatment', icon: Sparkles, image: '/facial-treatments.webp' },
  { id: 5, category: 'hair', title: 'Color Treatment', icon: Scissors, image: '/hair-treatment.webp' },
  { id: 6, category: 'makeup', title: 'Lash Extensions', icon: Eye, image: '/lashes.webp' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className={styles.gallery}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>Our Work</span>
          <h2 className={styles.title}>Beauty Gallery</h2>
          <p className={styles.subtitle}>
            Browse through our portfolio of stunning transformations and creative designs.
          </p>
        </div>

        <div className={styles.filter}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterBtn} ${activeFilter === category ? styles.active : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.placeholder}>
                {item.image ? (
                  <>
                    <img src={item.image} alt={item.title} className={styles.galleryImage} />
                    <span className={styles.imageTitle}>{item.title}</span>
                  </>
                ) : (
                  <>
                    <item.icon className={styles.placeholderIcon} />
                    <span>{item.title}</span>
                  </>
                )}
              </div>
              <div className={styles.overlay}>
                <Expand className={styles.expandIcon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
