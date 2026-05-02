"use client";

import { useState } from "react";
import Link from "next/link";

export default function Booking() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      (e.target as HTMLFormElement).reset();
    }, 5000);
  };

  const cuts = [
    { name: "Side Bangs / Fringe", price: "£25" },
    { name: "Clipper Cut", price: "£25" },
    { name: "Split Ends Trim", price: "£28" },
    { name: "Men's Cut", price: "£30" },
    { name: "Trims", price: "£30" },
    { name: "Pixie Cut", price: "£35" },
    { name: "Children's Cut", price: "£32" },
    { name: "Bob Cut", price: "£38" },
    { name: "Layers", price: "£40" },
    { name: "Textured Cut", price: "£42" },
    { name: "Long Layers", price: "£45" },
    { name: "Restyle / Transformation", price: "£55" },
  ];

  const colours = [
    { name: "Toner / Gloss", price: "£35" },
    { name: "Root Touch Up", price: "£125" },
    { name: "Full Head Colour", price: "£155" },
    { name: "Highlights (Half Head)", price: "£170" },
    { name: "Ombre", price: "£185" },
    { name: "Balayage", price: "£220" },
    { name: "Highlights (Full Head)", price: "£240" },
    { name: "Bleach & Tone", price: "£260" },
    { name: "Fashion Colour", price: "£275+" },
    { name: "Colour Correction", price: "£300+" },
  ];

  const styling = [
    { name: "Wash & Blow Dry", price: "£20" },
    { name: "Blow Dry", price: "£25" },
    { name: "Straightening", price: "£30" },
    { name: "Curls", price: "£35" },
    { name: "Deep Conditioning", price: "£25" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6E6FA] via-[#FFB6C1] to-[#98FF98] p-8">
      {/* Header */}
      <div className="text-center mb-12 p-8">
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold text-white mb-2 tracking-wider"
            style={{textShadow: '4px 4px 0px #FF69B4, 8px 8px 0px rgba(147, 112, 219, 0.3)'}}>
          HAIR BY JULIETA
        </h1>
        <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-[#2C2C2C]"
           style={{textShadow: '1px 1px 0px rgba(255,255,255,0.8)'}}>
          Book Your Appointment
        </p>
      </div>

      {/* Booking Form Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-[30px] shadow-2xl overflow-hidden border-4 border-[#FFB6C1]">
        <div className="bg-gradient-to-r from-[#FF69B4] to-[#9370DB] p-8 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-white" style={{textShadow: '2px 2px 0px rgba(0,0,0,0.1)'}}>
            ✨ Schedule Your Visit ✨
          </h2>
          <p className="text-white/90 mt-2">Fill in your details and we'll confirm your booking soon!</p>
        </div>

        <div className="p-8 md:p-12">
          {success && (
            <div className="bg-gradient-to-r from-[#3CB371] to-[#2E8B57] text-white p-6 rounded-[15px] text-center mb-8">
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl mb-2">🎉 Booking Request Sent!</h3>
              <p>Thank you! We'll contact you shortly to confirm your appointment.</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Personal Details */}
            <div className="mb-6">
              <label className="block font-semibold text-[#2C2C2C] mb-2 text-lg">
                Full Name <span className="text-[#FF69B4]">*</span>
              </label>
              <input 
                type="text" 
                required 
                placeholder="Enter your full name"
                className="w-full p-4 border-2 border-[#E6E6FA] rounded-[15px] text-lg focus:outline-none focus:border-[#FF69B4] focus:ring-4 focus:ring-[rgba(255,105,180,0.1)] transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-[#2C2C2C] mb-2 text-lg">
                Phone Number <span className="text-[#FF69B4]">*</span>
              </label>
              <input 
                type="tel" 
                required 
                placeholder="Enter your phone number"
                className="w-full p-4 border-2 border-[#E6E6FA] rounded-[15px] text-lg focus:outline-none focus:border-[#FF69B4] focus:ring-4 focus:ring-[rgba(255,105,180,0.1)] transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-[#2C2C2C] mb-2 text-lg">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="Enter your email (optional)"
                className="w-full p-4 border-2 border-[#E6E6FA] rounded-[15px] text-lg focus:outline-none focus:border-[#FF69B4] focus:ring-4 focus:ring-[rgba(255,105,180,0.1)] transition-all"
              />
            </div>

            {/* Services */}
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#FF69B4] mb-6 pb-2 border-b-4 border-[#FFB6C1]">
              ✂️ Choose Your Services
            </h3>

            <h4 className="text-[#FF69B4] font-semibold mb-4">Cuts</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {cuts.map((service) => (
                <label key={service.name} className="flex items-center p-4 bg-gradient-to-r from-[rgba(255,182,193,0.1)] to-[rgba(230,230,250,0.1)] rounded-[12px] cursor-pointer hover:border-2 hover:border-[#FF69B4] transition-all">
                  <input type="checkbox" className="w-5 h-5 mr-3 accent-[#FF69B4]" />
                  <span className="flex-1 font-medium text-[#2C2C2C]">{service.name}</span>
                  <span className="font-[family-name:var(--font-playfair)] font-bold text-[#FF69B4] text-lg">{service.price}</span>
                </label>
              ))}
            </div>

            <h4 className="text-[#FF69B4] font-semibold mb-4">🎨 Colour & Dye</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {colours.map((service) => (
                <label key={service.name} className="flex items-center p-4 bg-gradient-to-r from-[rgba(255,182,193,0.1)] to-[rgba(230,230,250,0.1)] rounded-[12px] cursor-pointer hover:border-2 hover:border-[#FF69B4] transition-all">
                  <input type="checkbox" className="w-5 h-5 mr-3 accent-[#FF69B4]" />
                  <span className="flex-1 font-medium text-[#2C2C2C]">{service.name}</span>
                  <span className="font-[family-name:var(--font-playfair)] font-bold text-[#FF69B4] text-lg">{service.price}</span>
                </label>
              ))}
            </div>

            <h4 className="text-[#FF69B4] font-semibold mb-4">💇‍♀️ Styling & Washes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {styling.map((service) => (
                <label key={service.name} className="flex items-center p-4 bg-gradient-to-r from-[rgba(255,182,193,0.1)] to-[rgba(230,230,250,0.1)] rounded-[12px] cursor-pointer hover:border-2 hover:border-[#FF69B4] transition-all">
                  <input type="checkbox" className="w-5 h-5 mr-3 accent-[#FF69B4]" />
                  <span className="flex-1 font-medium text-[#2C2C2C]">{service.name}</span>
                  <span className="font-[family-name:var(--font-playfair)] font-bold text-[#FF69B4] text-lg">{service.price}</span>
                </label>
              ))}
            </div>

            {/* Date & Time */}
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#FF69B4] mb-6 pb-2 border-b-4 border-[#FFB6C1]">
              📅 Select Date & Time
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block font-semibold text-[#2C2C2C] mb-2 text-lg">
                  Preferred Date <span className="text-[#FF69B4]">*</span>
                </label>
                <input 
                  type="date" 
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-4 border-2 border-[#E6E6FA] rounded-[15px] text-lg focus:outline-none focus:border-[#FF69B4] focus:ring-4 focus:ring-[rgba(255,105,180,0.1)] transition-all"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#2C2C2C] mb-2 text-lg">
                  Preferred Time <span className="text-[#FF69B4]">*</span>
                </label>
                <select 
                  required
                  className="w-full p-4 border-2 border-[#E6E6FA] rounded-[15px] text-lg focus:outline-none focus:border-[#FF69B4] focus:ring-4 focus:ring-[rgba(255,105,180,0.1)] transition-all"
                >
                  <option value="">Select a time...</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <label className="block font-semibold text-[#2C2C2C] mb-2 text-lg">
                Additional Notes
              </label>
              <textarea 
                placeholder="Tell us about your hair, any allergies, or special requests..."
                rows={4}
                className="w-full p-4 border-2 border-[#E6E6FA] rounded-[15px] text-lg focus:outline-none focus:border-[#FF69B4] focus:ring-4 focus:ring-[rgba(255,105,180,0.1)] transition-all resize-y"
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-6 border-t-4 border-[#FFB6C1]">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-[#FF69B4] to-[#9370DB] text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg hover:translate-y-[-3px] hover:shadow-xl transition-all"
              >
                ✨ Book My Appointment ✨
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="mt-12 bg-gradient-to-r from-[#E6E6FA] to-[#FFB6C1] p-8 rounded-[20px] text-center">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#2C2C2C] mb-4">📞 Questions?</h3>
            <p className="text-[#666666] leading-relaxed">
              Call or WhatsApp: [Your Phone Number]<br/>
              Email: [Your Email]<br/>
              Location: [Your Address]<br/>
              Open: Monday - Saturday, 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Back Links */}
      <div className="text-center mt-8">
        <Link href="/" className="inline-block mx-2 px-6 py-3 bg-white text-[#FF69B4] rounded-full font-semibold border-2 border-[#FF69B4] hover:bg-[#FF69B4] hover:text-white transition-all">
          ← Back to Home
        </Link>
        <Link href="/events" className="inline-block mx-2 px-6 py-3 bg-white text-[#FF69B4] rounded-full font-semibold border-2 border-[#FF69B4] hover:bg-[#FF69B4] hover:text-white transition-all">
          🎉 Book Events & Parties
        </Link>
      </div>
    </div>
  );
}
