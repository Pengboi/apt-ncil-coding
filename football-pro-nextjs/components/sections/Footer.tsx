'use client';

import React from 'react';
import { 
  FootballIcon, 
  InstagramIcon, 
  TwitterIcon, 
  YoutubeIcon, 
  TiktokIcon,
  EnvelopeIcon,
  MapMarkerIcon,
  HeartIcon
} from '@/components/ui/Icons';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Training Tips', href: '#tips' },
  { label: 'Healthy Lifestyle', href: '#lifestyle' },
  { label: 'Products', href: '#products' },
];

const resourceLinks = [
  { label: 'Training Plans', href: '#' },
  { label: 'Nutrition Guides', href: '#' },
  { label: 'Gear Reviews', href: '#' },
  { label: 'FAQ', href: '#' },
];

const socialLinks = [
  { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
  { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
  { icon: <YoutubeIcon />, href: '#', label: 'YouTube' },
  { icon: <TiktokIcon />, href: '#', label: 'TikTok' },
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#')) {
      const element = document.getElementById(sectionId.slice(1));
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="footer-logo" onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}>
              <FootballIcon />
              <span>Football Pro</span>
            </a>
            <p>Helping footballers of all levels improve their game through expert tips, nutrition advice, and quality gear recommendations.</p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><EnvelopeIcon /> hello@footballpro.com</p>
            <p><MapMarkerIcon /> London, UK</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Football Pro. Made with <HeartIcon /> for football lovers.</p>
        </div>
      </div>
    </footer>
  );
}
