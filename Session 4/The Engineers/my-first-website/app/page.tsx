export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="hero-bg min-h-[72vh] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1767175244779-aa7dc46ad7d8?auto=format&fit=crop&w=1600&q=60')",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="glass-card p-12 rounded-xl max-w-3xl">
            <h1 className="text-5xl font-extrabold mb-4 text-white">PigeonBot — Smart robotic companions</h1>
            <p className="text-lg text-white mb-6">Sleek design · Smart AI · Customizable</p>
            <div className="flex gap-3">
              <a className="btn-accent px-6 py-3 rounded-full text-white" href="#">Get Yours</a>
              <a className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white" href="#features">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Features</h2>
            <p className="muted max-w-2xl mx-auto">Precision pecking, silent soaring, and an AI brain that learns your routes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 glass-card">
              <div className="feature-icon mb-4">🪶</div>
              <h3 className="font-semibold">Sleek Design</h3>
              <p className="muted text-sm mt-2">A modern shell with durable materials and pleasant aesthetics.</p>
            </div>
            <div className="p-6 glass-card">
              <div className="feature-icon mb-4">🤖</div>
              <h3 className="font-semibold">Smart AI</h3>
              <p className="muted text-sm mt-2">On-device intelligence for navigation and adaptive behavior.</p>
            </div>
            <div className="p-6 glass-card">
              <div className="feature-icon mb-4">⚙️</div>
              <h3 className="font-semibold">Customizable</h3>
              <p className="muted text-sm mt-2">Tailor sounds, colors, and flight patterns to your taste.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA + Contact */}
      <section id="contact" className="section bg-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Questions? Get in touch</h3>
              <p className="muted">We'd love to hear from you — whether it's feedback, a custom order, or a question about specs.</p>
              <ul className="mt-6 muted text-sm">
                <li>FAQ · Shipping · Warranty</li>
              </ul>
            </div>

            <form className="p-6 glass-card">
              <div className="grid grid-cols-1 gap-3">
                <input className="p-3 rounded bg-white/5" placeholder="Your Name" />
                <input className="p-3 rounded bg-white/5" placeholder="Your Email" />
                <input className="p-3 rounded bg-white/5" placeholder="Company" />
                <textarea className="p-3 rounded bg-white/5" placeholder="Your Message" rows={4} />
                <div className="flex justify-end">
                  <button className="btn-accent px-5 py-2 rounded-full">Send Pigeon</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Customer: Henry */}
      <section id="customer" className="section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src="/customer-henry.jpeg"
              alt="Henry Dawson"
              className="w-40 h-40 rounded-full object-cover"
            />
            <div>
              <h3 className="text-2xl font-bold">Henry Dawson</h3>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex text-yellow-400" aria-hidden>
                  <span className="text-xl">★</span>
                  <span className="text-xl">★</span>
                  <span className="text-xl">★</span>
                  <span className="text-xl">★</span>
                  <span className="text-xl">★</span>
                </div>
                <span className="muted text-sm">5.0 · Verified buyer</span>
              </div>
              <p className="muted mt-2">Early adopter & prototype tester</p>
              <blockquote className="mt-4 text-white/90">“I tested the prototype extensively over two weeks. The navigation is dependable, the battery life comfortably lasts my daily runs, and the pecking precision is outstanding. Setup was straightforward and the support team replied quickly to questions. Highly recommended for field testing or fun automations.”</blockquote>
              <p className="mt-3 muted text-sm">Prototype: <strong>Model A1 Prototype</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Prototype */}
      <section id="prototype" className="section bg-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-3">Prototype</h3>
              <p className="muted">A working prototype demonstrating silent flight, basic navigation, and pecking precision. Below is a snapshot and a link to view details.</p>
              <div className="mt-4">
                <a className="btn-accent px-5 py-2 rounded-full text-white" href="#">View Prototype</a>
              </div>
            </div>
            <div>
              <div className="glass-card p-2">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=60"
                  alt="Prototype snapshot"
                  className="w-full rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review / Testimonial */}
      <section id="review" className="section">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-3">What people are saying</h3>
          <div className="max-w-2xl mx-auto glass-card p-6">
            <div className="flex items-center justify-center gap-2 text-yellow-400 mb-3">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <p className="muted">"The PigeonBot prototype exceeded expectations. Excellent build quality and thoughtful AI — it's exactly what our team needed for field trials." — Elena R.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
