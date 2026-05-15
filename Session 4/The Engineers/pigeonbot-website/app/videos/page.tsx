import Image from 'next/image';

export const metadata = {
  title: 'Pigeon AI Videos 🎬',
  description: 'Watch PigeonBot in action! AI-generated videos of our adorable companions.',
};

export default function VideosPage() {
  return (
    <div className="videos-page">
      {/* Hero Section */}
      <section className="videos-hero">
        <div className="container">
          <div className="badge mb-4">
            <span>🎬</span>
            <span>AI Videos</span>
          </div>
          <h1 className="videos-title">
            PigeonBot <span className="text-gradient">In Action</span>
          </h1>
          <p className="videos-subtitle">
            Watch our AI companions come to life! These videos showcase the personality and charm of PigeonBot.
          </p>
        </div>
      </section>

      {/* Featured Video - Twerking Pigeon */}
      <section className="video-section featured">
        <div className="container">
          <div className="video-header">
            <div className="video-badge">🔥 Trending</div>
            <h2 className="video-title">Twerking Pigeon AI</h2>
            <p className="video-desc">Our most popular AI-generated video! Watch PigeonBot show off its dance moves.</p>
          </div>

          <div className="video-player-container">
            <div className="video-player">
              <video
                controls
                poster="/pigeonbot-hero.png"
                className="video-element"
                preload="metadata"
              >
                <source src="/videos/pigeon-twerking.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Placeholder overlay when video doesn't exist */}
              <div className="video-placeholder">
                <div className="placeholder-content">
                  <span className="placeholder-icon">🎥</span>
                  <h3>Add Your Video Here!</h3>
                  <p>To add the twerking pigeon video:</p>
                  <ol className="placeholder-steps">
                    <li>Save your video as <code>pigeon-twerking.mp4</code></li>
                    <li>Place it in the <code>/public/videos/</code> folder</li>
                    <li>The video will automatically appear here!</li>
                  </ol>
                  <div className="placeholder-emoji">🐦 💃</div>
                </div>
              </div>
            </div>
          </div>

          <div className="video-stats">
            <div className="stat">
              <span className="stat-icon">👁️</span>
              <span className="stat-value">10.5K</span>
              <span className="stat-label">Views</span>
            </div>
            <div className="stat">
              <span className="stat-icon">❤️</span>
              <span className="stat-value">2.3K</span>
              <span className="stat-label">Likes</span>
            </div>
            <div className="stat">
              <span className="stat-icon">💬</span>
              <span className="stat-value">156</span>
              <span className="stat-label">Comments</span>
            </div>
            <div className="stat">
              <span className="stat-icon">🔄</span>
              <span className="stat-value">892</span>
              <span className="stat-label">Shares</span>
            </div>
          </div>
        </div>
      </section>

      {/* More Videos Grid */}
      <section className="video-section more-videos">
        <div className="container">
          <h2 className="section-title">More PigeonBot Videos</h2>
          <p className="section-subtitle">Coming soon...</p>
          
          <div className="videos-grid">
            {[
              { title: 'PigeonBot Dancing', emoji: '🕺', status: 'Coming Soon' },
              { title: 'PigeonBot Singing', emoji: '🎤', status: 'Coming Soon' },
              { title: 'PigeonBot Cooking', emoji: '👨‍🍳', status: 'Coming Soon' },
              { title: 'PigeonBot Gaming', emoji: '🎮', status: 'Coming Soon' },
            ].map((video, index) => (
              <div key={index} className="video-card coming-soon">
                <div className="video-thumbnail">
                  <span className="thumbnail-emoji">{video.emoji}</span>
                  <div className="play-overlay">
                    <span className="play-icon">▶</span>
                  </div>
                </div>
                <div className="video-info">
                  <h3 className="video-name">{video.title}</h3>
                  <span className="video-status">{video.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="videos-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Want Your Own Dancing Pigeon?</h2>
            <p className="cta-subtitle">
              Customize and order your own PigeonBot companion today!
            </p>
            <a href="/customize" className="btn btn-primary glow cta-btn">
              Customize Now
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
