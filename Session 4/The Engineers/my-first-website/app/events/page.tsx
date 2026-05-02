"use client";

import { useState } from "react";
import Link from "next/link";

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [success, setSuccess] = useState(false);

  const events = [
    { 
      id: "birthday", 
      name: "Birthday Party", 
      icon: "🎂", 
      price: "From £45",
      description: "Make your special day even more memorable with a stunning birthday hairstyle!" 
    },
    { 
      id: "prom", 
      name: "Prom Night", 
      icon: "👗", 
      price: "From £60",
      description: "Turn heads at your prom with an elegant updo or glamorous curls!" 
    },
    { 
      id: "wedding", 
      name: "Wedding Party", 
      icon: "💍", 
      price: "From £65",
      description: "Bridal hair, bridesmaids styles, and mother of the bride looks!" 
    },
    { 
      id: "graduation", 
      name: "Graduation", 
      icon: "🎓", 
      price: "From £50",
      description: "Celebrate your achievement with a sophisticated style for your big day!" 
    },
    { 
      id: "sweet16", 
      name: "Sweet 16", 
      icon: "🎉", 
      price: "From £55",
      description: "Fabulous styles for the most important birthday of your teenage years!" 
    },
    { 
      id: "group", 
      name: "Group Party", 
      icon: "👯‍♀️", 
      price: "From £40/person",
      description: "Hen parties, girls night out, or any group celebration - special group rates!" 
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelectedEvent("");
      (e.target as HTMLFormElement).reset();
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Navigation */}
      <nav className="bg-[#F5EDE0] border-b-2 border-[#E8DDD0] px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="font-[family-name:var(--font-title)] text-4xl text-[#6B5344] hover:text-[#8B7355] transition-colors">
            Hair by Julieta
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <Link 
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#A0826D] text-[#6B5344] rounded-full font-medium hover:bg-[#A0826D] hover:text-white transition-all"
            >
              ← Back Home
            </Link>
            <Link 
              href="/booking"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#A0826D] to-[#8B7355] text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              ✨ Book Regular
            </Link>
            <Link 
              href="/prices"
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#8B7355] text-[#8B7355] rounded-full font-medium hover:bg-[#8B7355] hover:text-white transition-all"
            >
              📋 Prices
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#A0826D] via-[#C4B5A5] to-[#8B7355] px-6 py-12 text-center">
        <h1 className="font-[family-name:var(--font-title)] text-6xl md:text-7xl text-[#FFFBF5] mb-2">
          Hair by Julieta
        </h1>
        <p className="text-xl md:text-2xl text-[#FFFBF5] font-light">
          Special Events & Party Bookings
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event.name)}
              className={`bg-[#FFFBF5] rounded-3xl p-8 text-center border-4 cursor-pointer transition-all hover:translate-y-[-10px] hover:shadow-2xl ${
                selectedEvent === event.name 
                  ? 'border-[#6B5344] bg-[#F5EDE0] shadow-xl' 
                  : 'border-[#E8DDD0] hover:border-[#A0826D]'
              }`}
            >
              <div className="text-6xl mb-4">{event.icon}</div>
              <h3 className="font-[family-name:var(--font-title)] text-3xl text-[#3E2723] mb-2">
                {event.name}
              </h3>
              <p className="text-[#6D4C41] text-sm mb-3">{event.description}</p>
              <p className="font-[family-name:var(--font-title)] text-2xl text-[#8B7355] font-bold">
                {event.price}
              </p>
              <button 
                className={`mt-4 px-6 py-2 rounded-full font-medium transition-all ${
                  selectedEvent === event.name
                    ? 'bg-[#6B5344] text-white'
                    : 'bg-gradient-to-r from-[#A0826D] to-[#8B7355] text-white hover:shadow-lg'
                }`}
              >
                {selectedEvent === event.name ? 'Selected ✓' : 'Select'}
              </button>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        {selectedEvent && (
          <div className="bg-[#FFFBF5] rounded-3xl shadow-2xl border-4 border-[#E8DDD0] overflow-hidden animate-[fadeIn_0.5s_ease]">
            <div className="bg-gradient-to-r from-[#A0826D] to-[#8B7355] p-8 text-center">
              <h2 className="font-[family-name:var(--font-title)] text-4xl text-[#FFFBF5]">
                ✨ Complete Your Booking ✨
              </h2>
              <p className="text-[#FFFBF5] mt-2">Fill in your details and we'll confirm your event booking!</p>
            </div>

            <div className="p-8 md:p-12">
              {success && (
                <div className="bg-gradient-to-r from-[#6B5344] to-[#5D4037] text-white p-6 rounded-2xl text-center mb-8">
                  <h3 className="font-[family-name:var(--font-title)] text-3xl mb-2">🎉 Booking Request Sent!</h3>
                  <p>Thank you! We'll contact you shortly to confirm your event booking.</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Selected Event Display */}
                <div className="mb-6">
                  <label className="block font-semibold text-[#3E2723] mb-2 text-lg">
                    Selected Event
                  </label>
                  <input 
                    type="text" 
                    value={selectedEvent}
                    readOnly
                    className="w-full p-4 bg-[#F5EDE0] border-2 border-[#A0826D] rounded-2xl text-lg font-semibold text-[#6B5344]"
                  />
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-semibold text-[#3E2723] mb-2">
                      Full Name <span className="text-[#A0826D]">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter your full name"
                      className="w-full p-4 bg-white border-2 border-[#E8DDD0] rounded-2xl text-[#3E2723] focus:outline-none focus:border-[#A0826D] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#3E2723] mb-2">
                      Phone Number <span className="text-[#A0826D]">*</span>
                    </label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="Enter your phone number"
                      className="w-full p-4 bg-white border-2 border-[#E8DDD0] rounded-2xl text-[#3E2723] focus:outline-none focus:border-[#A0826D] transition-all"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-semibold text-[#3E2723] mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="Enter your email (optional)"
                    className="w-full p-4 bg-white border-2 border-[#E8DDD0] rounded-2xl text-[#3E2723] focus:outline-none focus:border-[#A0826D] transition-all"
                  />
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block font-semibold text-[#3E2723] mb-2">
                      Number of People
                    </label>
                    <select className="w-full p-4 bg-white border-2 border-[#E8DDD0] rounded-2xl text-[#3E2723] focus:outline-none focus:border-[#A0826D] transition-all">
                      <option value="1">Just me</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5">5 people</option>
                      <option value="6+">6+ people</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#3E2723] mb-2">
                      Event Date <span className="text-[#A0826D]">*</span>
                    </label>
                    <input 
                      type="date" 
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-4 bg-white border-2 border-[#E8DDD0] rounded-2xl text-[#3E2723] focus:outline-none focus:border-[#A0826D] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#3E2723] mb-2">
                      Preferred Time <span className="text-[#A0826D]">*</span>
                    </label>
                    <select 
                      required
                      className="w-full p-4 bg-white border-2 border-[#E8DDD0] rounded-2xl text-[#3E2723] focus:outline-none focus:border-[#A0826D] transition-all"
                    >
                      <option value="">Select time...</option>
                      <option value="8:00 AM">8:00 AM</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Location & Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-semibold text-[#3E2723] mb-2">
                      Event Location
                    </label>
                    <select className="w-full p-4 bg-white border-2 border-[#E8DDD0] rounded-2xl text-[#3E2723] focus:outline-none focus:border-[#A0826D] transition-all">
                      <option value="salon">At the Salon</option>
                      <option value="venue">At Your Venue (+£50 fee)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#3E2723] mb-2">
                      Preferred Style
                    </label>
                    <select className="w-full p-4 bg-white border-2 border-[#E8DDD0] rounded-2xl text-[#3E2723] focus:outline-none focus:border-[#A0826D] transition-all">
                      <option value="">Select style...</option>
                      <option value="updo">Elegant Updo</option>
                      <option value="curls">Glamorous Curls</option>
                      <option value="straight">Sleek & Straight</option>
                      <option value="halfup">Half Up Half Down</option>
                      <option value="braids">Braided Style</option>
                      <option value="custom">Custom (discuss with stylist)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="mb-8">
                  <label className="block font-semibold text-[#3E2723] mb-2">
                    Additional Details
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your event, theme, dress colour, or any special requests..."
                    className="w-full p-4 bg-white border-2 border-[#E8DDD0] rounded-2xl text-[#3E2723] placeholder-[#A0826D] focus:outline-none focus:border-[#A0826D] transition-all resize-y"
                  />
                </div>

                {/* Submit */}
                <div className="text-center">
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-[#A0826D] to-[#8B7355] text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl hover:translate-y-[-3px] transition-all"
                  >
                    ✨ Confirm Event Booking ✨
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="mt-12 bg-gradient-to-r from-[#E8DDD0] to-[#F5EDE0] p-8 rounded-3xl text-center">
          <h3 className="font-[family-name:var(--font-title)] text-3xl text-[#3E2723] mb-4">
            Questions About Your Event?
          </h3>
          <p className="text-[#6D4C41] leading-relaxed">
            Call or WhatsApp: [Your Phone Number]<br/>
            Email: [Your Email]<br/>
            We specialize in making your special day perfect!
          </p>
        </div>
      </div>
    </div>
  );
}
