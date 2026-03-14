'use client';

import { useState } from 'react';
import { CalendarCheck, Clock, Bell, Phone, Mail } from 'lucide-react';
import styles from './Booking.module.css';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    message: '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      message: '',
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className={styles.booking}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.info}>
            <span className={styles.tag}>Book Now</span>
            <h2 className={styles.title}>Schedule Your Visit</h2>
            <p className={styles.text}>
              Ready to transform your look? Book an appointment with our expert team 
              and experience luxury beauty services tailored just for you.
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <CalendarCheck className={styles.icon} />
                </div>
                <span>Easy Online Booking</span>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <Clock className={styles.icon} />
                </div>
                <span>Flexible Hours</span>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <Bell className={styles.icon} />
                </div>
                <span>Appointment Reminders</span>
              </div>
            </div>

            <div className={styles.contact}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Phone className={styles.icon} />
                </div>
                <div>
                  <span>Call Us</span>
                  <a href="tel:+441234567890">+44 123 456 7890</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Mail className={styles.icon} />
                </div>
                <div>
                  <span>Email Us</span>
                  <a href="mailto:hello@bellabeauty.com">hello@bellabeauty.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <h3>Make an Appointment</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="service">Select Service</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a service</option>
                    <option value="hair">Hair Styling</option>
                    <option value="facial">Facial Treatment</option>
                    <option value="nails">Nail Artistry</option>
                    <option value="makeup">Makeup Artistry</option>
                    <option value="body">Body Treatment</option>
                    <option value="tanning">Tanning & Waxing</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="date">Preferred Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Special Requests</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special requests or notes..."
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3>Booking Confirmed!</h3>
            <p>Thank you for booking with Bella Beauty. We will contact you shortly to confirm your appointment.</p>
            <button onClick={() => setShowModal(false)} className={styles.modalBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
