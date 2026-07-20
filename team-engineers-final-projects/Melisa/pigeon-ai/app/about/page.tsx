import Image from 'next/image';

export const metadata = {
  title: 'About Us - PigeonBot 🤖',
  description: 'Learn about the story behind PigeonBot, our mission, and the team creating the world\'s cutest AI companions.',
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="badge mb-4">
            <span>💫</span>
            <span>Our Story</span>
          </div>
          <h1 className="about-title">
            Building the Future of <span className="text-gradient">Companionship</span>
          </h1>
          <p className="about-subtitle">
            We believe technology should bring joy, not complexity. That&apos;s why we created PigeonBot — 
            an AI companion designed to make every day a little brighter.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title">Our Mission</h2>
              <p className="about-text">
                PigeonBot was born from a simple idea: what if technology could be both intelligent 
                and adorable? We set out to create AI companions that don&apos;t just assist — they 
                genuinely connect with people.
              </p>
              <p className="about-text">
                Every PigeonBot is crafted with care, combining cutting-edge artificial intelligence 
                with delightful design. Our goal is to bring a smile to your face while making your 
                life easier, one interaction at a time.
              </p>
              <div className="mission-stats">
                <div className="mission-stat">
                  <span className="stat-number">2023</span>
                  <span className="stat-label">Founded</span>
                </div>
                <div className="mission-stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Happy Owners</span>
                </div>
                <div className="mission-stat">
                  <span className="stat-number">10</span>
                  <span className="stat-label">Unique Designs</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-wrapper">
                <div className="glow-bg"></div>
                <Image
                  src="/pigeonbot-hero.png"
                  alt="PigeonBot Mission"
                  width={500}
                  height={500}
                  className="about-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section values-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">What We Believe In</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </div>
          
          <div className="values-grid">
            {[
              {
                icon: '💖',
                title: 'Made with Love',
                desc: 'Every PigeonBot is crafted with passion and attention to detail. We pour our hearts into creating companions that truly connect.'
              },
              {
                icon: '🧠',
                title: 'Intelligence First',
                desc: 'Smart AI that learns and adapts to you. Our neural networks are designed to understand and grow with your preferences.'
              },
              {
                icon: '🎨',
                title: 'Design Matters',
                desc: 'Beautiful aesthetics meet functionality. We believe technology should look as good as it works.'
              },
              {
                icon: '🛡️',
                title: 'Privacy Protected',
                desc: 'Your data stays yours. We use military-grade encryption and never share your personal information.'
              },
              {
                icon: '🌱',
                title: 'Sustainable Future',
                desc: 'Eco-friendly materials and responsible manufacturing. We care about our planet as much as our customers.'
              },
              {
                icon: '🤝',
                title: 'Community Driven',
                desc: 'Built with feedback from real users. Our community shapes the future of PigeonBot.'
              },
            ].map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-section timeline-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">From idea to reality</p>
          </div>

          <div className="timeline">
            {[
              {
                year: '2023',
                title: 'The Spark',
                desc: 'The idea for PigeonBot was born during a hackathon. We wanted to create an AI companion that was both smart and cute.'
              },
              {
                year: '2023',
                title: 'First Prototype',
                desc: 'Our first working prototype impressed everyone at the demo day. The feedback was overwhelmingly positive.'
              },
              {
                year: '2024',
                title: 'Official Launch',
                desc: 'PigeonBot officially launched with 5 unique designs. We sold out in the first week!' 
              },
              {
                year: '2024',
                title: 'Growing Family',
                desc: 'Expanded to 10 designs and introduced customization options. The community kept growing.'
              },
              {
                year: '2025',
                title: 'Today & Beyond',
                desc: 'Now serving 500+ happy owners worldwide. We&apos;re just getting started on this amazing journey.'
              },
            ].map((item, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section team-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Meet the Flock</h2>
            <p className="section-subtitle">The passionate people behind PigeonBot</p>
          </div>

          <div className="team-grid">
            {[
              {
                name: 'Alex Chen',
                role: 'Founder & CEO',
                bio: 'Former AI researcher with a passion for making technology accessible and delightful.',
                avatar: 'AC'
              },
              {
                name: 'Sam Rivera',
                role: 'Lead Designer',
                bio: 'Award-winning product designer who believes tech should spark joy.',
                avatar: 'SR'
              },
              {
                name: 'Jordan Kim',
                role: 'Head of Engineering',
                bio: 'Full-stack wizard building the brains behind every PigeonBot.',
                avatar: 'JK'
              },
              {
                name: 'Taylor Brooks',
                role: 'Community Manager',
                bio: 'The voice of our users, ensuring every feedback shapes our future.',
                avatar: 'TB'
              },
            ].map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.avatar}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Meet Your New Best Friend?</h2>
            <p className="cta-subtitle">
              Join thousands of happy PigeonBot owners and experience the joy of AI companionship.
            </p>
            <a href="/customize" className="btn btn-primary glow cta-btn">
              Customize Your Pigeon
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
