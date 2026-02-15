import PlayerCard from '../components/PlayerCard';
import FormationPitch from '../components/FormationPitch';
import { players } from '../../data/players';

const videoStart = 0; // change this value to set clip start (seconds)

export default function SquadPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-main text-foreground">
      <section className="w-full py-8 bg-gradient-to-b from-gray-900/5 to-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-md bg-black">
            <iframe
              title="Match clip"
              src={`https://www.youtube.com/embed/XUPgMNeMVRc?autoplay=1&mute=1&start=${videoStart}&rel=0`}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Starting XI Formation</h2>
            <a href="/" className="text-sm text-muted-foreground">← Back</a>
          </div>

          {/* Formation Pitch Visualization */}
          <div className="mb-12">
            <FormationPitch players={players} />
          </div>

          <div className="flex items-center justify-between mb-6 mt-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Full Squad</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
              <PlayerCard key={player.slug} player={player} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
