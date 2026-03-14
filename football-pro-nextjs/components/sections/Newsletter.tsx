'use client';

import React, { useState } from 'react';
import { PlaneIcon } from '@/components/ui/Icons';
import { useNotification } from '@/hooks/useNotification';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    showNotification('Successfully subscribed! Check your inbox for tips.', 'success');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2>Get Weekly Tips in Your Inbox</h2>
            <p>Join 10,000+ footballers receiving exclusive training tips, nutrition advice, and gear reviews.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              className="btn-subscribe"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><i className="fas fa-spinner fa-spin" /> Subscribing...</>
              ) : (
                <><PlaneIcon /> Subscribe</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
