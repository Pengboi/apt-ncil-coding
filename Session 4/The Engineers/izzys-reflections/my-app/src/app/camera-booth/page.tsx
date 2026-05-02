'use client';

import { useState } from 'react';
import { Camera, Check, Star, Clock, Users, Sparkles, Calendar, MapPin, Phone, Mail, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { cameraBoothPackages } from '../data/cameraPackages';

export default function CameraBoothPage() {
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    guestCount: '',
    specialRequests: '',
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

  const faqs = [
    {
      question: 'How much space do I need for the 360° camera booth?',
      answer: 'We recommend a minimum of 10x10 feet of space. The booth itself takes up about 4 feet in diameter, but we need extra room for guests to enter and exit safely.',
    },
    {
      question: 'How long does setup take?',
      answer: 'Setup typically takes 30-45 minutes. We arrive 1 hour before your event start time to ensure everything is ready.',
    },
    {
      question: 'Can guests share their videos instantly?',
      answer: 'Yes! Our sharing station allows guests to immediately text or email their videos to themselves. Premium and Deluxe packages include instant social media sharing.',
    },
    {
      question: 'What props are included?',
      answer: 'We provide a variety of fun props including signs, hats, glasses, and more. Premium and Deluxe packages include additional premium props.',
    },
    {
      question: 'Do you travel to my location?',
      answer: 'We serve the greater metropolitan area. Travel fees may apply for locations outside 30 miles from our base. Contact us for a custom quote.',
    },
  ];

  if (isSubmitted) {
    return (
      <div className="py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="bg-gold-primary/10 border border-gold-primary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gold-primary mb-4">
              Booking Request Received!
            </h2>
            <p className="text-gray-300 mb-6">
              Thank you for your interest in our 360° camera booth! We&apos;ll review your event details and contact you within 24 hours to confirm availability and finalize your booking.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  eventType: '',
                  eventDate: '',
                  eventLocation: '',
                  guestCount: '',
                  specialRequests: '',
                });
                setSelectedPackage('');
              }}
              className="bg-gold-primary text-black-primary px-6 py-2 rounded-lg hover:bg-gold-light transition-colors font-semibold"
            >
              Make Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black-primary via-black-secondary to-black-tertiary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/5 via-transparent to-gold-primary/5" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gold-primary/10 border border-gold-primary/20 rounded-full mb-6">
              <Camera className="h-5 w-5 mr-2 text-gold-primary" />
              <span className="font-medium text-gold-primary">Now Booking for 2024 & 2025</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              360° Camera Booth Hire
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Create unforgettable memories at your next event. Our state-of-the-art 360° camera booth captures every angle of the fun.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center">
                <Check className="h-4 w-4 mr-1 text-gold-primary" /> Weddings
              </span>
              <span className="flex items-center">
                <Check className="h-4 w-4 mr-1 text-gold-primary" /> Corporate Events
              </span>
              <span className="flex items-center">
                <Check className="h-4 w-4 mr-1 text-gold-primary" /> Birthday Parties
              </span>
              <span className="flex items-center">
                <Check className="h-4 w-4 mr-1 text-gold-primary" /> Graduations
              </span>
              <span className="flex items-center">
                <Check className="h-4 w-4 mr-1 text-gold-primary" /> Proms
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-black-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400">Three simple steps to unforgettable memories</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-primary/10 border border-gold-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gold-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">1. Step On</h3>
              <p className="text-gray-400">Guests step onto our circular platform and strike a pose.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-primary/10 border border-gold-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-gold-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">2. Spin Around</h3>
              <p className="text-gray-400">Our camera arm rotates 360° around you, capturing every moment.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-primary/10 border border-gold-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-gold-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">3. Share Instantly</h3>
              <p className="text-gray-400">Videos are ready to share via text, email, or social media.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-black-primary" id="packages">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Package</h2>
            <p className="text-gray-400">Select the perfect package for your event</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cameraBoothPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-black-secondary rounded-xl shadow-lg border-2 p-8 transition-all hover:border-gold-primary/40 ${
                  pkg.popular
                    ? 'border-gold-primary scale-105 shadow-gold-primary/10'
                    : 'border-gold-primary/20'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gold-primary text-black-primary px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-gray-400 mb-4">{pkg.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gold-primary">${pkg.price}</span>
                  <span className="text-gray-500 ml-2">/ {pkg.duration}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-gold-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    selectedPackage === pkg.id
                      ? 'bg-gold-primary text-black-primary'
                      : 'bg-black-tertiary text-gray-300 hover:bg-gold-primary/20 border border-gold-primary/20'
                  } ${pkg.popular ? 'bg-gold-primary text-black-primary hover:bg-gold-light' : ''}`}
                >
                  {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Gallery Placeholder */}
      <section className="py-16 bg-black-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Event Gallery</h2>
            <p className="text-gray-400">See the magic in action</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-black-tertiary rounded-lg flex items-center justify-center border border-gold-primary/10">
                <Camera className="h-8 w-8 text-gold-primary/40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-black-secondary">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-black-tertiary rounded-lg border border-gold-primary/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gold-primary/5 transition-colors"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gold-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gold-primary" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-black-primary" id="booking">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Book Your 360° Experience</h2>
            <p className="text-gray-400">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-black-secondary p-8 rounded-lg shadow-lg border border-gold-primary/20">
            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black-tertiary border border-gold-primary/20 rounded-lg text-white focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black-tertiary border border-gold-primary/20 rounded-lg text-white focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black-tertiary border border-gold-primary/20 rounded-lg text-white focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  required
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black-tertiary border border-gold-primary/20 rounded-lg text-white focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="graduation">Graduation</option>
                  <option value="prom">Prom / Formal</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Event Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold-primary" />
                  <input
                    type="date"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-black-tertiary border border-gold-primary/20 rounded-lg text-white focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expected Guest Count *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold-primary" />
                  <input
                    type="number"
                    name="guestCount"
                    required
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-black-tertiary border border-gold-primary/20 rounded-lg text-white focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold-primary" />
                <input
                  type="text"
                  name="eventLocation"
                  required
                  value={formData.eventLocation}
                  onChange={handleInputChange}
                  placeholder="Venue name and address"
                  className="w-full pl-10 pr-4 py-2 bg-black-tertiary border border-gold-primary/20 rounded-lg text-white focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                rows={3}
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Any special requirements or questions?"
                className="w-full px-4 py-2 bg-black-tertiary border border-gold-primary/20 rounded-lg text-white focus:ring-2 focus:ring-gold-primary/50 focus:border-gold-primary"
              />
            </div>

            {/* Selected Package Display */}
            {selectedPackage && (
              <div className="bg-gold-primary/10 border border-gold-primary/30 rounded-lg p-4">
                <p className="text-sm text-gray-400">Selected Package:</p>
                <p className="font-semibold text-gold-primary">
                  {cameraBoothPackages.find((p) => p.id === selectedPackage)?.name}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gold-primary text-black-primary font-semibold rounded-lg hover:bg-gold-light disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black-primary border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Request Booking</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
