'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question or need a custom quote? We&apos;d love to hear from you. Reach out and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-gold-primary/20">
                  <MapPin className="h-6 w-6 text-gold-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Visit Us</h3>
                  <p className="text-gray-400">
                    123 Creative Street<br />
                    Design District, CA 90210
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-gold-primary/20">
                  <Phone className="h-6 w-6 text-gold-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Call Us</h3>
                  <p className="text-gray-400">
                    <a href="tel:+1234567890" className="hover:text-gold-primary transition-colors">
                      (123) 456-7890
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-gold-primary/20">
                  <Mail className="h-6 w-6 text-gold-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Email Us</h3>
                  <p className="text-gray-400">
                    <a href="mailto:hello@izzysreflections.com" className="hover:text-gold-primary transition-colors">
                      hello@izzysreflections.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-gold-primary/20">
                  <Clock className="h-6 w-6 text-gold-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Business Hours</h3>
                  <p className="text-gray-400">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 aspect-video bg-black-secondary rounded-lg flex items-center justify-center border border-gold-primary/20">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gold-primary mx-auto mb-2" />
                <p className="text-gray-400">Map Location</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Send Us a Message</h2>

            {isSubmitted ? (
              <div className="bg-gold-primary/10 border border-gold-primary/30 rounded-lg p-8 text-center">
                <CheckCircle className="h-16 w-16 text-gold-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gold-primary mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-300 mb-6">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="bg-gold-primary text-black-primary px-6 py-2 rounded-lg hover:bg-gold-light transition-colors font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black-tertiary border border-gold-primary/20 rounded-lg text-white focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black-tertiary border border-gold-primary/20 rounded-lg text-white focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black-tertiary border border-gold-primary/20 rounded-lg text-white focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
                  >
                    <option value="">Select a subject</option>
                    <option value="custom-order">Custom Order Inquiry</option>
                    <option value="camera-booth">360 Camera Booth Booking</option>
                    <option value="bulk-order">Bulk Order Quote</option>
                    <option value="general">General Question</option>
                    <option value="support">Order Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black-tertiary border border-gold-primary/20 rounded-lg text-white focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gold-primary text-black-primary font-semibold rounded-lg hover:bg-gold-light disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black-primary border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
