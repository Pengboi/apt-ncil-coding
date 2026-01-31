export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-rm bg-cover bg-center text-black">
      <header className="w-full py-6 backdrop-blur-sm bg-black/30">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Real Madrid Fan Zone</h1>
          <nav className="space-x-4">
            <a href="#teams" className="">Teams</a>
            <a href="#fixtures" className="">Fixtures</a>
            <a href="#about" className="">About</a>
          </nav>
        </div>
      </header>

      <section className="flex-grow flex items-center justify-center w-full">
        <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-5xl font-bold mb-4">Welcome, Madridistas</h2>
            <p className="text-lg mb-6 text-black/70">Latest news, fixtures and fan content for Real Madrid supporters.</p>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <a href="#teams" className="btn-primary">Explore Teams</a>
              <a href="#fixtures" className="btn-secondary">View Fixtures</a>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <img src="/images/rm-shield.svg" alt="RMCF Shield" className="w-56 h-56 drop-shadow-2xl" />
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-4">About Real Madrid</h3>
          <p className="text-black/70 mb-4">Real Madrid Club de Fútbol, founded in 1902 and based at the Santiago Bernabéu, is one of the world's most successful football clubs. The club has won numerous domestic and European titles, including multiple Champions League trophies. This fan site delivers news, match info and merchandise for supporters.</p>
          
          <div className="my-6 rounded-lg overflow-hidden shadow-lg">
            <img src="/images/team photo.jpg" alt="Real Madrid Team Photo" className="w-full h-auto" />
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Key Facts</h4>
              <ul className="text-black/70 space-y-2">
                <li><strong>Founded:</strong> 1902</li>
                <li><strong>Stadium:</strong> Santiago Bernabéu (81,044 capacity)</li>
                <li><strong>League:</strong> La Liga (Spain)</li>
                <li><strong>Nickname:</strong> Los Blancos (The Whites)</li>
                <li><strong>Colors:</strong> White, Blue, Gold</li>
                <li><strong>Motto:</strong> "Hala Madrid"</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-3">Achievements</h4>
              <ul className="text-black/70 space-y-2">
                <li>• <strong>15x</strong> UEFA Champions League winners</li>
                <li>• <strong>34x</strong> La Liga champions</li>
                <li>• <strong>8x</strong> Copa del Rey winners</li>
                <li>• <strong>5x</strong> UEFA Super Cup winners</li>
                <li>• <strong>Most successful club</strong> in European football history</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-black/5">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-6">Meet the Squad</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white/8 rounded-lg">
              <div className="text-lg font-semibold text-accent-blue">Vinícius Júnior</div>
              <div className="text-sm text-black/60">Left Winger • Brazil</div>
              <div className="text-xs text-black/50 mt-2">Dynamic Brazilian winger known for exceptional pace, dribbling skills and left-foot crossing ability. Key attacking player in Real Madrid's setup, capable of both creating and scoring goals. Rapidly becoming one of the world's top wingers.</div>
            </div>
            
            <div className="p-4 bg-white/8 rounded-lg">
              <div className="text-lg font-semibold text-accent-blue">Rodrygo Goes</div>
              <div className="text-sm text-black/60">Right Winger • Brazil</div>
              <div className="text-xs text-black/50 mt-2">Talented Brazilian winger with exceptional technical ability and flair. Known for quick feet, precision passing and the ability to play in multiple attacking positions. Provides creative support and defensive work rate on the right flank.</div>
            </div>
            
            <div className="p-4 bg-white/8 rounded-lg">
              <div className="text-lg font-semibold text-accent-blue">Kylian Mbappé</div>
              <div className="text-sm text-black/60">Striker • France</div>
              <div className="text-xs text-black/50 mt-2">World-class French striker with blistering pace, clinical finishing and elite-level goal-scoring record. Brings explosive attacking threat to Real Madrid's frontline. One of the best forwards in world football with proven Champions League experience.</div>
            </div>
            
            <div className="p-4 bg-white/8 rounded-lg">
              <div className="text-lg font-semibold text-accent-blue">Jude Bellingham</div>
              <div className="text-sm text-black/60">Central Midfielder • England</div>
              <div className="text-xs text-black/50 mt-2">Young English midfielder bringing creativity, physicality and tactical intelligence to the midfield. Excellent ball-carrier with strong passing range and defensive awareness. Developing into one of Europe's most promising midfield talents.</div>
            </div>
            
            <div className="p-4 bg-white/8 rounded-lg">
              <div className="text-lg font-semibold text-accent-blue">Antonio Rüdiger</div>
              <div className="text-sm text-black/60">Center-back • Germany</div>
              <div className="text-xs text-black/50 mt-2">Commanding German defender known for physical presence, aerial dominance and tactical positioning. Provides stability and leadership at the heart of Real Madrid's defense. Experienced in high-pressure European competitions.</div>
            </div>
            
            <div className="p-4 bg-white/8 rounded-lg">
              <div className="text-lg font-semibold text-accent-blue">Andriy Lunin</div>
              <div className="text-sm text-black/60">Goalkeeper • Ukraine</div>
              <div className="text-xs text-black/50 mt-2">Skilled Ukrainian goalkeeper providing excellent shot-stopping, distribution and sweeper skills. Demonstrates strong reflexes and command of the penalty area. Critical backbone of Real Madrid's defensive line.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="fixtures" className="w-full py-12 bg-black/5">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-4">Upcoming Matches</h3>
          <ul className="space-y-3">
            <li className="p-4 bg-white/6 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-semibold">Real Madrid vs Barcelona</div>
                <div className="text-sm text-black/60">Santiago Bernabéu — Sun 14 Feb, 20:00</div>
              </div>
              <div className="text-sm text-black/70">LaLiga</div>
            </li>
            <li className="p-4 bg-white/6 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-semibold">Atletico Madrid vs Real Madrid</div>
                <div className="text-sm text-black/60">Wanda Metropolitano — Sat 21 Feb, 18:30</div>
              </div>
              <div className="text-sm text-black/70">LaLiga</div>
            </li>
            <li className="p-4 bg-white/6 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-semibold">Real Madrid vs Paris Saint-Germain</div>
                <div className="text-sm text-black/60">Santiago Bernabéu — Wed 25 Feb, 20:00</div>
              </div>
              <div className="text-sm text-black/70">Champions League</div>
            </li>
          </ul>
        </div>
      </section>

      <section id="merch" className="w-full py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-6">Merchandise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/6 rounded-lg text-center">
              <img src="/images/home jersey photo.webp" alt="Home Jersey" className="mx-auto w-32 h-32 mb-3 object-cover" />
                <div className="font-semibold">Home Jersey</div>
                <div className="text-sm text-black/60 mb-3">Classic white home kit</div>
              <a href="#" className="btn-primary inline-block">Buy £59.99</a>
            </div>

            <div className="p-4 bg-white/6 rounded-lg text-center">
              <img src="/images/scarf photo.avif" alt="Scarf" className="mx-auto w-32 h-32 mb-3 object-cover" />
              <div className="font-semibold">Supporter Scarf</div>
              <div className="text-sm text-black/60 mb-3">White & gold scarf</div>
              <a href="#" className="btn-primary inline-block">Buy £19.99</a>
            </div>

            <div className="p-4 bg-white/6 rounded-lg text-center">
              <img src="/images/mug photo.jpg" alt="Mug" className="mx-auto w-32 h-32 mb-3 object-cover" />
              <div className="font-semibold">Club Mug</div>
              <div className="text-sm text-black/60 mb-3">White ceramic mug with crest</div>
              <a href="#" className="btn-primary inline-block">Buy £9.99</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-6 bg-black/25 text-center text-sm">
        <div className="max-w-4xl mx-auto px-6">Made with ⚽ at APT Coding Camp</div>
      </footer>
    </main>
  );
}
