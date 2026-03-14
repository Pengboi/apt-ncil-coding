'use client';

import { useState } from 'react';
import { Sparkles, Facebook, Instagram, Twitter, Send, Heart } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}! You'll receive our latest beauty tips and offers.`);
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.brand}>
              <a href="#home" className={styles.logo}>
                <Sparkles className={styles.logoIcon} />
                <span>Bella Beauty</span>
              </a>
              <p>
                Experience luxury cosmetology services in a serene and welcoming environment. 
                Your beauty journey starts here.
              </p>
              <div className={styles.social}>
                <a href="#" aria-label="Facebook">
                  <Facebook className={styles.socialIcon} />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram className={styles.socialIcon} />
                </a>
                <a href="#" aria-label="Twitter">
                  <Twitter className={styles.socialIcon} />
                </a>
              </div>
            </div>

            <div className={styles.links}>
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className={styles.links}>
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Hair Styling</a></li>
                <li><a href="#services">Facial Treatments</a></li>
                <li><a href="#services">Nail Artistry</a></li>
                <li><a href="#services">Makeup Artistry</a></li>
                <li><a href="#services">Body Treatments</a></li>
              </ul>
            </div>

            <div className={styles.newsletter}>
              <h4>Newsletter</h4>
              <p>Subscribe to get special offers, free giveaways, and beauty tips.</p>
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">
                  <Send className={styles.sendIcon} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>
            &copy; 2024 Bella Beauty. All rights reserved. | Made with{' '}
            <Heart className={styles.heart} /> for APT Coding Camp
          </p>
        </div>
      </div>
    </footer>
  );
}
