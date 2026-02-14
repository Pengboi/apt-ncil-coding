'use client';

import Image from 'next/image';
import Link from 'next/link';
import PigeonChat from './components/PigeonChat';
import PigeonGallery from './components/PigeonGallery';
import customerHenry from './images/customer-henry.jpg';

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="section bg-gradient bg-dots min-h-screen flex items-center">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="badge">
              <span className="inline-block mr-2">✨</span>
              <span>AI‑Powered Companion</span>
            </div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Meet Your New <br />
              <span className="text-gradient">Best Friend</span>{' '}
              <span>🤖</span>
            </h1>
            <p className="text-lg text-muted max-w-lg">
              PigeonBot is the smartest, cutest AI companion that brings joy, intelligence, and endless fun to your life!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#contact" className="btn btn-primary glow">
                Get Your PigeonBot
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="#about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="stat">
                <div className="stat-value">500+</div>
                <div className="stat-label">Happy Owners</div>
              </div>
              <div className="stat">
                <div className="stat-value">24/7</div>
                <div className="stat-label">Active</div>
              </div>
              <div className="stat">
                <div className="stat-value">5.0</div>
                <div className="stat-label">★ Rating</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl blur-3xl opacity-30"></div>
            <Image
              src="/pigeonbot-hero.png"
              alt="PigeonBot AI Companion"
              width={600}
              height={600}
              className="relative rounded-2xl shadow-2xl"
            />
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-pink-500 to-purple-600 text-white px-5 py-3 rounded-2xl shadow-xl">
              <div className="text-xs font-semibold opacity-80">NEW</div>
              <div className="text-xl font-bold">Model A1</div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVERT SECTION */}
      <section id="advert" className="section bg-gradient bg-dots">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="badge">
              <span>🎬</span>
              <span>In Use</span>
            </div>
            <h2 className="text-4xl font-bold">PigeonBot — Seen in Real Homes</h2>
            <p className="text-muted max-w-xl">
              Watch how PigeonBot helps around the house: plays with kids, manages reminders, and adds personality to your workspace. Compact, friendly, and smart — designed to fit into everyday life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#chat" className="btn btn-primary glow">Try the Live Demo</Link>
              <Link href="#gallery" className="btn btn-secondary">View Skins</Link>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted">
              <div className="avatar bg-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center">SJ</div>
              <div>“PigeonBot brightened our mornings — a perfect desk companion.” — Sarah J.</div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/5 border border-white/5 h-72 lg:h-auto">
            <Image src={customerHenry} alt="PigeonBot in use" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/10 text-white px-4 py-2 rounded-full backdrop-blur">▶ Play demo</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="section">
        <div className="container">
          <div className="section-header text-center mb-12">
            <div className="badge mb-4">
              <span>💎</span>
              <span>Features</span>
            </div>
            <h2 className="text-4xl font-bold">
              Why You’ll <span className="text-gradient">Love It</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Packed with incredible features that make PigeonBot the perfect companion.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {icon: '⚡', title: 'Lightning Fast', desc: 'Responds in milliseconds with powerful AI processing.'},
              {icon: '🎨', title: 'Customisable', desc: 'Choose colors, sounds, and personality traits to match your style.'},
              {icon: '🧠', title: 'Super Smart', desc: 'Learns and adapts to your preferences over time.'},
              {icon: '🛡️', title: 'Ultra Secure', desc: 'Your data is encrypted with military‑grade security.'},
              {icon: '🔋', title: 'Long Battery', desc: 'Up to 48 hrs of continuous operation on a single charge.'},
              {icon: '💖', title: 'Made with Love', desc: 'Crafted by passionate engineers who care about every detail.'},
            ].map((item) => (
              <div key={item.title} className="card text-center p-6">
                <div className="icon-box text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="section">
        <div className="container">
          <div className="section-header text-center mb-8">
            <div className="badge mb-4">
              <span>🖼️</span>
              <span>Gallery</span>
            </div>
            <h2 className="text-4xl font-bold">Pick Your <span className="text-gradient">Pigeon</span></h2>
            <p className="text-muted max-w-2xl mx-auto">Choose a pigeon skin and preview it live — click a thumbnail to select.</p>
          </div>

          <PigeonGallery />
        </div>
      </section>

      {/* PRICES SECTION */}
      <section id="prices" className="section">
        <div className="container">
          <div className="section-header text-center mb-12">
            <div className="badge mb-4">
              <span>💲</span>
              <span>Prices</span>
            </div>
            <h2 className="text-4xl font-bold">
              Simple Pricing — Choose Your <span className="text-gradient">Size</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Pick the PigeonBot size that fits your needs. No hidden fees — just delightful company.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card text-center p-6">
              <div className="text-sm font-semibold text-muted mb-2">Small</div>
              <div className="text-3xl font-extrabold">$79</div>
              <div className="text-muted mt-2">Compact companion — perfect for casual users</div>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Standard AI features</li>
                <li>12‑hr battery</li>
                <li>1‑year warranty</li>
              </ul>
              <Link href="#contact" className="btn btn-primary mt-6">Buy Small</Link>
            </div>

            <div className="card text-center p-6 ring-2 ring-pink-200/30">
              <div className="text-sm font-semibold text-muted mb-2">Medium</div>
              <div className="text-3xl font-extrabold">$129</div>
              <div className="text-muted mt-2">Our most popular choice — balanced performance</div>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Enhanced AI + personalization</li>
                <li>24‑hr battery</li>
                <li>2‑year warranty</li>
              </ul>
              <Link href="#contact" className="btn btn-primary mt-6">Buy Medium</Link>
            </div>

            <div className="card text-center p-6">
              <div className="text-sm font-semibold text-muted mb-2">Large</div>
              <div className="text-3xl font-extrabold">$199</div>
              <div className="text-muted mt-2">Premium model — best for power users and collectors</div>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>All premium features</li>
                <li>48‑hr battery</li>
                <li>3‑year warranty + priority support</li>
              </ul>
              <Link href="#contact" className="btn btn-primary mt-6">Buy Large</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section bg-gradient bg-dots">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="/pigeonbot-prototype.png"
              alt="PigeonBot Prototype"
              width={600}
              height={600}
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="badge">
              <span>🔬</span>
              <span>Technology</span>
            </div>
            <h2 className="text-4xl font-bold">
              Innovation Meets <span className="text-gradient">Design</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              Built with cutting‑edge AI technology and wrapped in a gorgeous design. Experience the perfect fusion of form and function.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white">
                  ⚙️
                </div>
                <div>
                  <h4 className="font-semibold">Advanced AI Brain</h4>
                  <p className="text-muted">Neural networks for intelligent responses.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white">
                  🏆
                </div>
                <div>
                  <h4 className="font-semibold">Premium Materials</h4>
                  <p className="text-muted">Aerospace‑grade construction for durability.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white">
                  ☁️
                </div>
                <div>
                  <h4 className="font-semibold">Cloud Connected</h4>
                  <p className="text-muted">Seamless updates and improvements.</p>
                </div>
              </li>
            </ul>
            <Link href="#features" className="btn btn-primary inline-flex items-center mt-4 ml-6">
              Explore Features
              <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="reviews" className="section">
        <div className="container">
          <div className="section-header text-center mb-12">
            <div className="badge mb-4">
              <span>⭐</span>
              <span>Reviews</span>
            </div>
            <h2 className="text-4xl font-bold">
              Loved by <span className="text-gradient">Everyone</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              See what our happy customers have to say about PigeonBot.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[{name: 'Sarah Johnson', role: 'Tech Enthusiast', quote: "PigeonBot is amazing! It's like having a smart, fun friend always there. The design is gorgeous and it works flawlessly!", avatar: 'SJ'},
              {name: 'Marcus Chen', role: 'Product Designer', quote: "Best purchase ever! The AI is impressively smart and learns my preferences. Plus, it looks incredible on my desk!", avatar: 'MC'}].map((t) => (
              <div key={t.name} className="testimonial">
                <div className="stars mb-4 text-pink-400 text-2xl">★★★★★</div>
                <p className="text-lg mb-6 leading-relaxed">“{t.quote}”</p>
                <div className="flex items-center gap-4">
                  <div className="avatar bg-pink-500 text-white flex items-center justify-center rounded-full w-14 h-14 text-xl font-bold">{t.avatar}</div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-muted text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAT SECTION */}
      <section id="chat" className="section">
        <div className="container max-w-3xl">
          <div className="section-header text-center mb-8">
            <div className="badge mb-4">
              <span>🐦</span>
              <span>Chat</span>
            </div>
            <h2 className="text-4xl font-bold">
              Chat with <span className="text-gradient">Pigeon AI</span>
            </h2>
            <p className="text-muted">Ask questions about PigeonBot — instant, playful answers.</p>
          </div>

          <PigeonChat />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section bg-gradient bg-dots">
        <div className="container max-w-3xl">
          <div className="section-header text-center mb-8">
            <div className="badge mb-4">
              <span>💌</span>
              <span>Contact</span>
            </div>
            <h2 className="text-4xl font-bold">
              Get in <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-muted text-lg">Have questions? We'd love to hear from you!</p>
          </div>
          <div className="card">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="form-input" />
                <input type="text" placeholder="Last Name" className="form-input" />
              </div>
              <input type="email" placeholder="Email" className="form-input" />
              <textarea placeholder="Your message..." rows={5} className="form-input"></textarea>
              <button type="submit" className="btn btn-primary w-full glow">
                Send Message
                <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
              <p className="text-center text-muted text-sm">
                We typically respond within 24 hours ⚡
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
