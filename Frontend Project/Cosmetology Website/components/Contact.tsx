'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './Contact.module.css';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['123 Beauty Lane', 'Barking, London IG11 8FA', 'United Kingdom'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+44 123 456 7890', '+44 123 456 7891'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['hello@bellabeauty.com', 'bookings@bellabeauty.com'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    lines: ['Mon - Fri: 9AM - 8PM', 'Sat - Sun: 10AM - 6PM'],
  },
];

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>Get In Touch</span>
          <h2 className={styles.title}>Contact Us</h2>
          <p className={styles.subtitle}>
            Visit us at our salon or reach out through any of our contact channels.
          </p>
        </div>

        <div className={styles.grid}>
          {contactInfo.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <item.icon className={styles.icon} />
              </div>
              <h3>{item.title}</h3>
              {item.lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
