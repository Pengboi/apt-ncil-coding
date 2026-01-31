export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1767175244779-aa7dc46ad7d8?auto=format&fit=crop&w=1600&q=60')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/60 via-purple-600/50 to-pink-500/60" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-pink-300/30">
              <span className="text-2xl">🤖</span>
              <span className="text-sm font-medium text-white">Next-Gen AI Companion</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black">
              <span className="block text-white drop-shadow-2xl">PigeonBot</span>
              <span className="block bg-gradient-to-r from-pink-200 via-pink-100 to-white bg-clip-text text-transparent">
                Smart Robotics
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-pink-50 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the future of AI companionship with sleek design, 
              intelligent navigation, and fully customizable behavior
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a 
                href="#features" 
                className="group btn-accent px-10 py-4 rounded-full text-white text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                Get Started
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a 
                href="#prototype" 
                className="px-10 py-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/30 text-lg font-semibold transition-all duration-300"
              >
                View Demo
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">99%</div>
                <div className="text-pink-200 text-sm mt-1">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">24/7</div>
                <div className="text-pink-200 text-sm mt-1">Active</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">1000+</div>
                <div className="text-pink-200 text-sm mt-1">Users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a0a1e] to-transparent z-10" />
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-400/20 mb-4">
              <span className="text-pink-300 text-sm font-semibold">✨ FEATURES</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-300 via-pink-200 to-white bg-clip-text text-transparent">
                Designed for Excellence
              </span>
            </h2>
            <p className="text-lg text-pink-200/80 max-w-2xl mx-auto">
              Every detail crafted to deliver an unmatched experience in robotic companionship
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="flex flex-col h-full">
                <div className="feature-icon mb-6 text-4xl">
                  🪶
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Premium Design
                </h3>
                <p className="text-pink-200/70 leading-relaxed flex-grow">
                  Sleek aerodynamic shell crafted from aerospace-grade materials. 
                  Beautiful aesthetics meet durability in every curve.
                </p>
                <div className="mt-6 pt-6 border-t border-pink-400/10">
                  <a href="#" className="text-pink-300 text-sm font-semibold hover:text-pink-200 transition-colors inline-flex items-center gap-2">
                    Learn more
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="flex flex-col h-full">
                <div className="feature-icon mb-6 text-4xl">
                  🤖
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Smart AI Brain
                </h3>
                <p className="text-pink-200/70 leading-relaxed flex-grow">
                  Advanced neural networks enable real-time learning, adaptive 
                  pathfinding, and intelligent decision making.
                </p>
                <div className="mt-6 pt-6 border-t border-pink-400/10">
                  <a href="#" className="text-pink-300 text-sm font-semibold hover:text-pink-200 transition-colors inline-flex items-center gap-2">
                    Learn more
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="flex flex-col h-full">
                <div className="feature-icon mb-6 text-4xl">
                  ⚙️
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Fully Customizable
                </h3>
                <p className="text-pink-200/70 leading-relaxed flex-grow">
                  Personalize sounds, LED colors, movement patterns, and behavioral 
                  responses to match your unique preferences.
                </p>
                <div className="mt-6 pt-6 border-t border-pink-400/10">
                  <a href="#" className="text-pink-300 text-sm font-semibold hover:text-pink-200 transition-colors inline-flex items-center gap-2">
                    Learn more
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features List */}
          <div className="mt-20 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-pink-400/10">
              <span className="text-2xl">⚡</span>
              <div>
                <h4 className="text-white font-semibold mb-1">Ultra-Fast Response</h4>
                <p className="text-pink-200/60 text-sm">Sub-millisecond reaction time for precise control</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-pink-400/10">
              <span className="text-2xl">🔋</span>
              <div>
                <h4 className="text-white font-semibold mb-1">All-Day Battery</h4>
                <p className="text-pink-200/60 text-sm">48+ hours of continuous operation on a single charge</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-pink-400/10">
              <span className="text-2xl">🛡️</span>
              <div>
                <h4 className="text-white font-semibold mb-1">Built to Last</h4>
                <p className="text-pink-200/60 text-sm">Military-grade durability with IP67 water resistance</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-pink-400/10">
              <span className="text-2xl">🌐</span>
              <div>
                <h4 className="text-white font-semibold mb-1">Cloud Connected</h4>
                <p className="text-pink-200/60 text-sm">Seamless updates and cloud sync across all devices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA + Contact */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-purple-900/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Info */}
            <div className="space-y-8">
              <div>
                <div className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-400/20 mb-4">
                  <span className="text-pink-300 text-sm font-semibold">💌 GET IN TOUCH</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-pink-300 to-white bg-clip-text text-transparent">
                    Let's Build Together
                  </span>
                </h2>
                <p className="text-xl text-pink-200/80 leading-relaxed">
                  Have questions about PigeonBot? Want to customize your order? 
                  Our team is here to help bring your vision to life.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-pink-400/10">
                  <div className="text-2xl">📧</div>
                  <div>
                    <div className="text-pink-200 text-sm">Email us</div>
                    <div className="text-white font-semibold">hello@pigeonbot.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-pink-400/10">
                  <div className="text-2xl">💬</div>
                  <div>
                    <div className="text-pink-200 text-sm">Live chat</div>
                    <div className="text-white font-semibold">Available 9AM - 6PM EST</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-pink-400/10">
                  <div className="text-2xl">📍</div>
                  <div>
                    <div className="text-pink-200 text-sm">Visit us</div>
                    <div className="text-white font-semibold">San Francisco, CA</div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-pink-400/10">
                  <span className="text-pink-200 text-sm">✓ Free Shipping</span>
                </div>
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-pink-400/10">
                  <span className="text-pink-200 text-sm">✓ 2 Year Warranty</span>
                </div>
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-pink-400/10">
                  <span className="text-pink-200 text-sm">✓ 30-Day Returns</span>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="glass-card p-8 md:p-10 rounded-3xl">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-pink-200 text-sm font-medium mb-2">First Name</label>
                    <input 
                      type="text"
                      placeholder="Alex"
                      className="w-full p-4 rounded-xl bg-white/5 border border-pink-300/20 focus:border-pink-400/50 focus:outline-none focus:ring-2 focus:ring-pink-400/20 text-white placeholder-pink-200/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-pink-200 text-sm font-medium mb-2">Last Name</label>
                    <input 
                      type="text"
                      placeholder="Johnson"
                      className="w-full p-4 rounded-xl bg-white/5 border border-pink-300/20 focus:border-pink-400/50 focus:outline-none focus:ring-2 focus:ring-pink-400/20 text-white placeholder-pink-200/40 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-pink-200 text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email"
                    placeholder="alex@example.com"
                    className="w-full p-4 rounded-xl bg-white/5 border border-pink-300/20 focus:border-pink-400/50 focus:outline-none focus:ring-2 focus:ring-pink-400/20 text-white placeholder-pink-200/40 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-pink-200 text-sm font-medium mb-2">Company (Optional)</label>
                  <input 
                    type="text"
                    placeholder="Your company"
                    className="w-full p-4 rounded-xl bg-white/5 border border-pink-300/20 focus:border-pink-400/50 focus:outline-none focus:ring-2 focus:ring-pink-400/20 text-white placeholder-pink-200/40 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-pink-200 text-sm font-medium mb-2">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full p-4 rounded-xl bg-white/5 border border-pink-300/20 focus:border-pink-400/50 focus:outline-none focus:ring-2 focus:ring-pink-400/20 text-white placeholder-pink-200/40 transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full btn-accent px-8 py-4 rounded-xl text-white text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Send Message
                  <span>🕊️</span>
                </button>

                <p className="text-pink-200/60 text-xs text-center">
                  We typically respond within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-400/20 mb-4">
              <span className="text-pink-300 text-sm font-semibold">💬 TESTIMONIALS</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-300 via-pink-200 to-white bg-clip-text text-transparent">
                Loved by Innovators
              </span>
            </h2>
            <p className="text-lg text-pink-200/80 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've transformed their workflows
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Testimonial 1 - Featured */}
            <div className="md:col-span-2 glass-card p-10 rounded-3xl">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <img
                  src="/customer-henry.jpeg"
                  alt="Henry Dawson"
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-pink-400/30 shadow-lg shadow-pink-500/20"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-pink-300 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-2xl">★</span>
                    ))}
                  </div>
                  <blockquote className="text-xl text-white/90 leading-relaxed mb-6">
                    "I tested the prototype extensively over two weeks. The navigation is dependable, 
                    the battery life comfortably lasts my daily runs, and the pecking precision is outstanding. 
                    Setup was straightforward and the support team replied quickly to questions."
                  </blockquote>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-white font-bold text-lg">Henry Dawson</div>
                      <div className="text-pink-200/70">Early Adopter & Beta Tester</div>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-pink-500/10 border border-pink-400/20">
                      <span className="text-pink-300 text-sm font-semibold">Verified Purchase ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex items-center gap-2 text-pink-300 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
              <p className="text-white/90 mb-6 leading-relaxed">
                "The PigeonBot prototype exceeded expectations. Excellent build quality and thoughtful AI — 
                it's exactly what our team needed for field trials."
              </p>
              <div>
                <div className="text-white font-semibold">Elena Rodriguez</div>
                <div className="text-pink-200/70 text-sm">Research Engineer</div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex items-center gap-2 text-pink-300 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
              <p className="text-white/90 mb-6 leading-relaxed">
                "Incredibly intuitive to set up and customize. The AI learns quickly and the build quality 
                is phenomenal. Worth every penny!"
              </p>
              <div>
                <div className="text-white font-semibold">Marcus Chen</div>
                <div className="text-pink-200/70 text-sm">Tech Enthusiast</div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-pink-400/10">
              <div className="text-4xl font-bold text-white mb-2">4.9</div>
              <div className="text-pink-200/70 text-sm">Average Rating</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-pink-400/10">
              <div className="text-4xl font-bold text-white mb-2">1,200+</div>
              <div className="text-pink-200/70 text-sm">Happy Customers</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-pink-400/10">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-pink-200/70 text-sm">Would Recommend</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-pink-400/10">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-pink-200/70 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Prototype Showcase */}
      <section id="prototype" className="py-24 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Column */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="glass-card p-4 rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=60"
                    alt="PigeonBot Prototype"
                    className="w-full rounded-2xl shadow-2xl shadow-pink-500/20"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-2xl border-4 border-[#1a0a1e]">
                  <div className="text-sm">Now Available</div>
                  <div className="text-2xl">Model A1</div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <div className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-400/20 mb-4">
                  <span className="text-pink-300 text-sm font-semibold">🔬 PROTOTYPE</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-pink-300 to-white bg-clip-text text-transparent">
                    See It In Action
                  </span>
                </h2>
                <p className="text-xl text-pink-200/80 leading-relaxed">
                  Our working prototype demonstrates silent flight, advanced navigation, 
                  and precision control. Experience the future of robotics today.
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Silent Operation</div>
                    <div className="text-pink-200/70 text-sm">Whisper-quiet motors for stealth mode</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Advanced Navigation</div>
                    <div className="text-pink-200/70 text-sm">AI-powered obstacle avoidance and path planning</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Precision Control</div>
                    <div className="text-pink-200/70 text-sm">Sub-millimeter accuracy for delicate tasks</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="#" 
                  className="btn-accent px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Watch Demo Video
                  <span>▶</span>
                </a>
                <a 
                  href="#" 
                  className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-pink-400/30 font-semibold transition-all inline-flex items-center justify-center gap-2"
                >
                  Technical Specs
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
