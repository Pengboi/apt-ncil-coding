'use client';

import { useState } from 'react';
import Gallery from './components/Gallery';

export default function Home() {
  const [spiritLevel, setSpiritLevel] = useState(50);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 overflow-hidden">
        {/* Animated Pom-Poms Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Pom-Poms */}
          <div className="absolute top-10 left-10 text-6xl animate-bounce" style={{animationDuration: '2s'}}>🎀</div>
          <div className="absolute top-32 right-16 text-5xl animate-pulse" style={{animationDelay: '0.3s'}}>🎀</div>
          <div className="absolute bottom-40 left-1/4 text-7xl animate-bounce" style={{animationDelay: '0.7s'}}>🎀</div>
          <div className="absolute bottom-20 right-1/3 text-6xl animate-pulse" style={{animationDelay: '1.2s'}}>🎀</div>
          <div className="absolute top-1/4 left-1/2 text-5xl animate-bounce" style={{animationDelay: '1.5s'}}>🎀</div>
          <div className="absolute top-20 right-1/4 text-6xl animate-pulse" style={{animationDelay: '0.8s'}}>🎀</div>
          {/* Stars & Sparkles */}
          <div className="absolute top-20 left-20 text-5xl animate-bounce">✨</div>
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
          {/* Interactive Spirit Meter */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6 max-w-md mx-auto">
            <p className="text-white text-lg mb-2">Spirit Meter! 🔥</p>
            <div className="w-full bg-white/30 rounded-full h-6 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500"
                style={{width: `${spiritLevel}%`}}
              />
            </div>
            <p className="text-white mt-2">{spiritLevel}% SPIRIT!</p>
          </div>
          <button 
            onClick={() => setSpiritLevel(prev => Math.min(prev + 10, 100))}
            className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold text-xl md:text-2xl px-8 py-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
          >
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

      {/* 🎀 Pom-Poms Section */}
      <section className="py-20 bg-gradient-to-b from-pink-200 to-rose-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-rose-700">
            Pom-Poms & Poms! 🎀
          </h2>
          {/* Photo Showcase */}
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 transition-all duration-500">
              <img 
                src="/images/photo 1.jpg" 
                alt="Cheerleader with pom-poms" 
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-rose-600 to-transparent p-4">
                <p className="text-white font-bold text-lg">📸 Cheerleaders in action with pom-poms!</p>
              </div>
            </div>
          </div>
          <p className="text-xl text-center mb-12 text-rose-600">
            The most iconic cheerleading accessory! Shake them with spirit!
          </p>
          
          {/* Pom-Pom Types */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Plastic Pom-Poms */}
            <div className="bg-white p-6 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 border-4 border-pink-400">
              <div className="text-6xl mb-4 animate-bounce">🎀</div>
              <h3 className="text-2xl font-bold text-pink-600 mb-2">Plastic Pom-Poms</h3>
              <p className="text-gray-600 mb-4">Shiny and loud! Perfect for game day noise!</p>
              <div className="flex justify-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-500"></span>
                <span className="w-6 h-6 rounded-full bg-purple-500"></span>
                <span className="w-6 h-6 rounded-full bg-blue-500"></span>
                <span className="w-6 h-6 rounded-full bg-gold-500" style={{backgroundColor: '#FFD700'}}></span>
              </div>
            </div>
            
            {/* Metallic Pom-Poms */}
            <div className="bg-white p-6 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 border-4 border-yellow-400">
              <div className="text-6xl mb-4 animate-pulse">✨</div>
              <h3 className="text-2xl font-bold text-yellow-600 mb-2">Metallic Pom-Poms</h3>
              <p className="text-gray-600 mb-4">Super sparkly! Catches the lights beautifully!</p>
              <div className="flex justify-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></span>
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-silver-300 to-gray-400" style={{background: 'linear-gradient(to right, #C0C0C0, #808080)'}}></span>
              </div>
            </div>
            
            {/* Paper Pom-Poms */}
            <div className="bg-white p-6 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 border-4 border-blue-400">
              <div className="text-6xl mb-4 animate-bounce" style={{animationDelay: '0.5s'}}>📄</div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Tissue Pom-Poms</h3>
              <p className="text-gray-600 mb-4">Light and fluffy! Great for decorations!</p>
              <div className="flex justify-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-400"></span>
                <span className="w-6 h-6 rounded-full bg-orange-400"></span>
                <span className="w-6 h-6 rounded-full bg-yellow-400"></span>
              </div>
            </div>
          </div>

          {/* Pom-Pom Movements */}
          <div className="bg-gradient-to-r from-rose-400 to-pink-500 p-8 rounded-2xl shadow-xl">
            <h3 className="text-3xl font-bold text-white text-center mb-6">Pom-Pom Moves! 📣</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">👆</div>
                <p className="text-white font-bold">High V</p>
                <p className="text-white/80 text-sm">Arms up in V shape!</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">👇</div>
                <p className="text-white font-bold">Low V</p>
                <p className="text-white/80 text-sm">Arms down in V!</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">💪</div>
                <p className="text-white font-bold">T Motion</p>
                <p className="text-white/80 text-sm">Arms out like T!</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">🙌</div>
                <p className="text-white font-bold">K Motion</p>
                <p className="text-white/80 text-sm">Diagonal arms!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 👕 Cheer Uniforms Section */}
      <section className="py-20 bg-gradient-to-b from-purple-200 to-indigo-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-purple-800">
            Cheer Uniforms 👕✨
          </h2>
          {/* Photo Showcase */}
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 transition-all duration-500">
              <img 
                src="/images/photo 2.jpg" 
                alt="Team in uniform" 
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600 to-transparent p-4">
                <p className="text-white font-bold text-lg">📸 Team spirit in full uniform!</p>
              </div>
            </div>
          </div>
          <p className="text-xl text-center mb-12 text-purple-600">
            Look your best while cheering! Style meets spirit!
          </p>

          {/* Uniform Types */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Classic Shell Top */}
            <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-4 text-center">👕</div>
              <h3 className="text-xl font-bold text-purple-600 mb-2">Shell Top</h3>
              <p className="text-gray-600 text-sm mb-3">The classic sleeveless uniform top with team colors</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Sleeveless</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">V-Neck</span>
              </div>
            </div>

            {/* Skirt */}
            <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-4 text-center">👗</div>
              <h3 className="text-xl font-bold text-pink-600 mb-2">Cheer Skirt</h3>
              <p className="text-gray-600 text-sm mb-3">Pleated skirt, usually 12-14 inches long</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">Pleated</span>
                <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">Spandex</span>
              </div>
            </div>

            {/* Warm-Ups */}
            <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-4 text-center">🧥</div>
              <h3 className="text-xl font-bold text-blue-600 mb-2">Warm-Ups</h3>
              <p className="text-gray-600 text-sm mb-3">Track suits for practice and travel</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Jacket</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Pants</span>
              </div>
            </div>

            {/* Shoes */}
            <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-4 text-center">👟</div>
              <h3 className="text-xl font-bold text-orange-600 mb-2">Cheer Shoes</h3>
              <p className="text-gray-600 text-sm mb-3">Special lightweight shoes for stunts</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Lightweight</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Grippy</span>
              </div>
            </div>
          </div>

          {/* Uniform Color Ideas */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 rounded-2xl shadow-xl">
            <h3 className="text-3xl font-bold text-white text-center mb-6">Popular Uniform Colors! 🎨</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="flex justify-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-red-600"></span>
                  <span className="w-8 h-8 rounded-full bg-white border-2 border-gray-300"></span>
                  <span className="w-8 h-8 rounded-full bg-blue-600"></span>
                </div>
                <p className="text-white font-bold">Classic Red, White & Blue</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="flex justify-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-purple-600"></span>
                  <span className="w-8 h-8 rounded-full bg-gold-400" style={{backgroundColor: '#FFD700'}}></span>
                </div>
                <p className="text-white font-bold">Purple & Gold</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="flex justify-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-black"></span>
                  <span className="w-8 h-8 rounded-full bg-orange-500"></span>
                </div>
                <p className="text-white font-bold">Black & Orange</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📋 Cheer Routines & Positioning Section */}
      <section className="py-20 bg-gradient-to-b from-blue-200 to-cyan-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-800">
            Routines & Positioning 📋🎯
          </h2>
          <p className="text-xl text-center mb-12 text-blue-600">
            Learn formations, stunts, and routine basics!
          </p>

          {/* Formation Diagram */}
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-12">
            <h3 className="text-2xl font-bold text-blue-700 text-center mb-6">Common Formations 📐</h3>
            
            {/* Formation Visuals */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Line Formation */}
              <div className="text-center">
                <p className="font-bold text-gray-700 mb-4">Single Line</p>
                <div className="bg-blue-100 p-4 rounded-xl inline-block">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">1</div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">2</div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">3</div>
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">4</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Straight across the floor</p>
              </div>

              {/* V Formation */}
              <div className="text-center">
                <p className="font-bold text-gray-700 mb-4">V Formation</p>
                <div className="bg-purple-100 p-4 rounded-xl inline-block">
                  <div className="flex gap-4 justify-center">
                    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">1</div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">2</div>
                  </div>
                  <div className="flex gap-4 justify-center mt-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">3</div>
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">4</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Point facing forward</p>
              </div>

              {/* Circle Formation */}
              <div className="text-center">
                <p className="font-bold text-gray-700 mb-4">Circle</p>
                <div className="bg-cyan-100 p-4 rounded-xl inline-block">
                  <div className="relative w-20 h-20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-pink-500"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-purple-500"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-500"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange-500"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">All facing center</p>
              </div>
            </div>
          </div>

          {/* Stunt Positions */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Stunt Positions 🤸</h3>
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3">
                  <span className="text-3xl">🦶</span>
                  <div>
                    <p className="text-white font-bold">Base</p>
                    <p className="text-white/80 text-sm">Lifts and supports the flyer</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3">
                  <span className="text-3xl">🤲</span>
                  <div>
                    <p className="text-white font-bold">Spotter</p>
                    <p className="text-white/80 text-sm">Ensures safety, catches the flyer</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3">
                  <span className="text-3xl">🧚</span>
                  <div>
                    <p className="text-white font-bold">Flyer</p>
                    <p className="text-white/80 text-sm">The one lifted into the air!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-6 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Routine Elements 🎵</h3>
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3">
                  <span className="text-3xl">📣</span>
                  <div>
                    <p className="text-white font-bold">Chants</p>
                    <p className="text-white/80 text-sm">Short, rhythmic cheers</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3">
                  <span className="text-3xl">💃</span>
                  <div>
                    <p className="text-white font-bold">Dance</p>
                    <p className="text-white/80 text-sm">Choreographed movements</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3">
                  <span className="text-3xl">🤸</span>
                  <div>
                    <p className="text-white font-bold">Tumbling</p>
                    <p className="text-white/80 text-sm">Cartwheels, flips, jumps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Count Guide */}
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-6 rounded-2xl shadow-xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Counting in 8s! 🎶</h3>
            <p className="text-white mb-4">Cheer routines are counted in sets of 8 beats</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div key={num} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {num}
                </div>
              ))}
            </div>
            <p className="text-white/80 mt-4 text-sm">"5, 6, 7, 8..." - Every cheerleader knows this count!</p>
          </div>
        </div>
      </section>

      {/* 🏆 Cheer Competitions Section */}
      <section className="py-20 bg-gradient-to-b from-yellow-200 to-orange-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-orange-800">
            Cheer Competitions! 🏆🥇
          </h2>
          <p className="text-xl text-center mb-12 text-orange-600">
            Where the best teams compete for glory!
          </p>

          {/* Competition Levels */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Recreational */}
            <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-t-8 border-green-400">
              <div className="text-5xl mb-4 text-center">🌱</div>
              <h3 className="text-xl font-bold text-green-600 mb-2 text-center">Recreational</h3>
              <p className="text-gray-600 text-center mb-4">For beginners and fun!</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✓ No experience needed</li>
                <li>✓ Local events</li>
                <li>✓ Focus on fun & learning</li>
              </ul>
            </div>

            {/* School */}
            <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-t-8 border-blue-400">
              <div className="text-5xl mb-4 text-center">🏫</div>
              <h3 className="text-xl font-bold text-blue-600 mb-2 text-center">School Teams</h3>
              <p className="text-gray-600 text-center mb-4">Middle & High School squads</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✓ Represent your school</li>
                <li>✓ Regional competitions</li>
                <li>✓ Pep rallies & games</li>
              </ul>
            </div>

            {/* All-Star */}
            <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-t-8 border-purple-400">
              <div className="text-5xl mb-4 text-center">⭐</div>
              <h3 className="text-xl font-bold text-purple-600 mb-2 text-center">All-Star</h3>
              <p className="text-gray-600 text-center mb-4">Elite competitive teams</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✓ Private gyms/clubs</li>
                <li>✓ National championships</li>
                <li>✓ Higher difficulty levels</li>
              </ul>
            </div>
          </div>

          {/* Competition Divisions */}
          <div className="bg-gradient-to-r from-orange-400 to-red-400 p-8 rounded-2xl shadow-xl mb-12">
            <h3 className="text-3xl font-bold text-white text-center mb-6">Competition Divisions 📊</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">👶</div>
                <p className="text-white font-bold">Tiny</p>
                <p className="text-white/80 text-sm">Ages 3-6</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">🧒</div>
                <p className="text-white font-bold">Mini</p>
                <p className="text-white/80 text-sm">Ages 5-8</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">👧</div>
                <p className="text-white font-bold">Youth</p>
                <p className="text-white/80 text-sm">Ages 5-11</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">🧑</div>
                <p className="text-white font-bold">Junior</p>
                <p className="text-white/80 text-sm">Ages 12-14</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">👦</div>
                <p className="text-white font-bold">Senior</p>
                <p className="text-white/80 text-sm">Ages 15-18</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">👨</div>
                <p className="text-white font-bold">Open</p>
                <p className="text-white/80 text-sm">All ages 17+</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">👥</div>
                <p className="text-white font-bold">Coed</p>
                <p className="text-white/80 text-sm">Mixed gender</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                <div className="text-4xl mb-2">👭</div>
                <p className="text-white font-bold">All-Girl</p>
                <p className="text-white/80 text-sm">Female only</p>
              </div>
            </div>
          </div>

          {/* Major Competitions */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-orange-700 text-center mb-6">Major Cheer Competitions! 🌍</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl">
                <span className="text-4xl">🏆</span>
                <div>
                  <p className="font-bold text-orange-800">The Cheerleading Worlds</p>
                  <p className="text-gray-600 text-sm">The biggest competition at ESPN Wide World of Sports in Florida!</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-xl">
                <span className="text-4xl">🎪</span>
                <div>
                  <p className="font-bold text-orange-800">Summit Championship</p>
                  <p className="text-gray-600 text-sm">Youth-level world championship - for the best young teams!</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-xl">
                <span className="text-4xl">🌟</span>
                <div>
                  <p className="font-bold text-orange-800">NCA All-Star Nationals</p>
                  <p className="text-gray-600 text-sm">National Cheerleaders Association - huge competition in Dallas!</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                <span className="text-4xl">💎</span>
                <div>
                  <p className="font-bold text-orange-800">UCA Nationals</p>
                  <p className="text-gray-600 text-sm">Universal Cheerleaders Association - college & high school focus!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scoring */}
          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-2xl shadow-xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">What Judges Look For 📋</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">Stunt Difficulty</span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">Technique</span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">Creativity</span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">Synchronization</span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">Crowd Appeal</span>
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
      <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 py-12">
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
            <span className="hover:scale-125 transition-transform cursor-pointer">🏆</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">🤸</span>
          </div>
          <p className="text-white/80 text-sm mb-2">
            🎀 Pom-Poms • 👕 Uniforms • 📋 Routines • 🏆 Competitions
          </p>
          <p className="text-white text-sm">
            Made with 💖 at APT Coding Camp
          </p>
        </div>
      </footer>
    </main>
  );
}
