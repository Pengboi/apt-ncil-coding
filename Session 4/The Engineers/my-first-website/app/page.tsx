import PlayerCard from './components/PlayerCard';
import { players } from '../data/players';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-main text-foreground">
      <section className="w-full py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              <span className="text-yellow-600">Hala</span> Madrid!
            </h2>
            <p className="text-lg mb-6 text-muted-foreground">Your destination for latest news, fixtures and fan content for the <span className="font-semibold text-yellow-600">Real Madrid</span> family.</p>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <a href="/squad" className="btn-primary">Explore</a>
              <a href="#fixtures" className="btn-secondary">Fixtures</a>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <img src="/images/football.png" alt="Football" className="w-40 h-40 md:w-56 md:h-56" />
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">About The Club</h3>
          <p className="mb-8 text-center text-muted-foreground max-w-2xl mx-auto">
            Welcome to Madridista Zone – your premier destination for all things
            <span className="font-semibold text-yellow-600"> Real Madrid</span>.
            We deliver the latest news, match info and merchandise for supporters worldwide.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Club Facts</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>Founded:</strong> 1902</li>
                <li><strong>Stadium:</strong> Santiago Bernabéu</li>
                <li><strong>League:</strong> La Liga</li>
                <li><strong>Colors:</strong> White, Gold</li>
              </ul>
            </div>
            
            <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Trophies</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 15x Champions League winners</li>
                <li>• 34x La Liga champions</li>
                <li>• 8x Copa del Rey winners</li>
                <li>• 5x UEFA Super Cup winners</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="squad" className="w-full py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">First Team Squad</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Vinícius Júnior", pos: "Left Winger 🇧🇷" },
              { name: "Rodrygo Goes", pos: "Right Winger 🇧🇷" },
              { name: "Kylian Mbappé", pos: "Striker 🇫🇷" },
              { name: "Jude Bellingham", pos: "Central Midfielder 🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
              { name: "Antonio Rüdiger", pos: "Center-back 🇩🇪" },
              { name: "Andriy Lunin", pos: "Goalkeeper 🇺🇦" },
            ].map((player) => (
              <div key={player.name} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
                <div className="font-semibold text-gray-800 dark:text-white">{player.name}</div>
                <div className="text-sm text-yellow-600">{player.pos}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fixtures" className="w-full py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Upcoming Matches</h3>
          <ul className="space-y-4">
            {[
              { match: "Real Madrid vs Barcelona", venue: "Santiago Bernabéu", date: "Sun 14 Feb, 20:00", league: "LaLiga" },
              { match: "Atletico Madrid vs Real Madrid", venue: "Wanda Metropolitano", date: "Sat 21 Feb, 18:30", league: "LaLiga" },
              { match: "Real Madrid vs PSG", venue: "Santiago Bernabéu", date: "Wed 25 Feb, 20:00", league: "Champions League" },
            ].map((fixture) => (
              <li key={fixture.match} className="p-4 bg-white dark:bg-gray-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md border-l-4 border-yellow-500">
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">{fixture.match}</div>
                  <div className="text-sm text-muted-foreground">📍 {fixture.venue} — 🕐 {fixture.date}</div>
                </div>
                <div className="text-sm font-bold px-4 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 rounded-full w-fit">
                  {fixture.league}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="merch" className="w-full py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Official Merchandise</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-28 h-28 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <img src="/images/home jersey photo.webp" alt="Home Jersey" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="font-semibold text-gray-800 dark:text-white">Home Jersey 2024/25</div>
              <div className="text-sm text-muted-foreground mb-3">Classic white home kit</div>
              <a href="#" className="btn-primary inline-block text-sm">Buy £89.99</a>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-28 h-28 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <img src="/images/scarf photo.avif" alt="Official Scarf" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="font-semibold text-gray-800 dark:text-white">Official Scarf</div>
              <div className="text-sm text-muted-foreground mb-3">White & gold scarf</div>
              <a href="#" className="btn-primary inline-block text-sm">Buy £24.99</a>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-28 h-28 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <img src="/images/mug photo.jpg" alt="Club Mug" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="font-semibold text-gray-800 dark:text-white">Club Mug</div>
              <div className="text-sm text-muted-foreground mb-3">Ceramic mug with crest</div>
              <a href="#" className="btn-primary inline-block text-sm">Buy £14.99</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:to-gray-900 text-center text-sm border-t-4 border-yellow-500">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img src="/images/rm-shield.svg" alt="Real Madrid" className="w-8 h-8" />
          </div>
          <p className="text-gray-400">Hala Madrid y nada más! 💜🤍</p>
          <p className="text-gray-500 mt-2 text-xs">Made with Football at APT Coding Camp</p>
        </div>
      </footer>
    </main>
  );
}
