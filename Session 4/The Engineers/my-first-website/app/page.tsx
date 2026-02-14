import Gallery from './components/Gallery';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 text-6xl animate-bounce">✨</div>
          <div className="absolute top-40 right-20 text-5xl animate-pulse">⭐</div>
          <div className="absolute bottom-32 left-1/4 text-7xl animate-bounce" style={{animationDelay: '0.5s'}}>🎉</div>
          <div className="absolute bottom-20 right-1/3 text-6xl animate-pulse" style={{animationDelay: '1s'}}>💫</div>
          <div className="absolute top-1/3 left-1/2 text-5xl animate-bounce" style={{animationDelay: '1.5s'}}>🌟</div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-lg animate-pulse">
            Let's Go Cheer! 💫
          </h1>
          <p className="text-2xl md:text-4xl text-white mb-8 font-semibold drop-shadow-md">
            Spirit, Energy, Excellence!
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold text-xl md:text-2xl px-8 py-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300">
            Feel the Spirit! 🔥
          </button>
        </div>
      </section>

      {/* Motivational Quotes Section */}
      <section className="py-20 bg-gradient-to-b from-pink-100 to-purple-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-800">
            Cheer Spirit Quotes ✨
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-pink-400 to-pink-600 p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <p className="text-white text-xl md:text-2xl font-semibold italic">
                "Cheerleading is not just about the pom-poms, it's about the heart!"
              </p>
              <div className="mt-4 text-4xl">💖</div>
            </div>
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <p className="text-white text-xl md:text-2xl font-semibold italic">
                "Together we shine, together we win!"
              </p>
              <div className="mt-4 text-4xl">🏆</div>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <p className="text-white text-xl md:text-2xl font-semibold italic">
                "Spirit is the heart of cheerleading!"
              </p>
              <div className="mt-4 text-4xl">💙</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <p className="text-white text-xl md:text-2xl font-semibold italic">
                "Dream big, cheer loud, shine bright!"
              </p>
              <div className="mt-4 text-4xl">⭐</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Cheerleading Section */}
      <section className="py-20 bg-gradient-to-b from-purple-100 to-blue-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-800">
            What is Cheerleading? 🎉
          </h2>
          <p className="text-xl md:text-2xl text-center mb-12 text-gray-700 max-w-4xl mx-auto">
            Cheerleading is an exciting activity that combines athleticism, teamwork, and spirit! 
            Cheerleaders use energetic routines, chants, and stunts to motivate crowds and support their teams.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 border-4 border-pink-400">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-pink-600 mb-2">Teamwork & Trust</h3>
              <p className="text-gray-600">Building strong bonds and trusting your teammates</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 border-4 border-orange-400">
              <div className="text-5xl mb-4">💪</div>
              <h3 className="text-xl font-bold text-orange-600 mb-2">Athleticism & Strength</h3>
              <p className="text-gray-600">Developing power, flexibility, and coordination</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 border-4 border-blue-400">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-blue-600 mb-2">Performance & Showmanship</h3>
              <p className="text-gray-600">Entertaining crowds with amazing routines</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 border-4 border-yellow-400">
              <div className="text-5xl mb-4">🏫</div>
              <h3 className="text-xl font-bold text-yellow-600 mb-2">School Spirit & Pride</h3>
              <p className="text-gray-600">Showing support and building community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Cheer Spirit Section */}
      <section className="py-20 bg-gradient-to-b from-blue-100 to-pink-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-5 text-4xl animate-bounce">📣</div>
          <div className="absolute top-20 right-10 text-4xl animate-pulse">🎊</div>
          <div className="absolute bottom-10 left-1/4 text-4xl animate-bounce" style={{animationDelay: '0.3s'}}>🎀</div>
          <div className="absolute bottom-20 right-1/4 text-4xl animate-pulse" style={{animationDelay: '0.6s'}}>✨</div>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-purple-800">
            Unleash Your Spirit! 🔥
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-8 rounded-2xl shadow-xl">
              <div className="text-6xl mb-4 text-center">💖</div>
              <p className="text-white text-2xl font-bold text-center">
                "Go Team Go!"
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-2xl shadow-xl">
              <div className="text-6xl mb-4 text-center">🔥</div>
              <p className="text-white text-2xl font-bold text-center">
                "We've Got Spirit!"
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-2xl shadow-xl">
              <div className="text-6xl mb-4 text-center">⚡</div>
              <p className="text-white text-2xl font-bold text-center">
                "Rise Up!"
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-8 rounded-2xl shadow-xl">
              <div className="text-6xl mb-4 text-center">🌟</div>
              <p className="text-white text-2xl font-bold text-center">
                "Be Loud, Be Proud!"
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">Fun Cheerleading Fact! 🎉</h3>
            <p className="text-xl text-gray-700">
              Did you know? Cheerleading began in the United States in the late 1800s, 
              and today over 3 million people participate in cheerleading across the country! 
              It's one of the fastest-growing sports in the world! 🌍
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-pink-600 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white text-2xl font-bold mb-4">
            Keep the Spirit Alive! 💫
          </p>
          <p className="text-white text-lg mb-6">
            Dream big, cheer loud, and always shine bright! ✨
          </p>
          <div className="flex justify-center gap-6 text-4xl mb-6">
            <span className="hover:scale-125 transition-transform cursor-pointer">📣</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">🎊</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">🎀</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">⭐</span>
          </div>
          <p className="text-white text-sm">
            Made with 💖 at APT Coding Camp
          </p>
        </div>
      </footer>
    </main>
  );
}
