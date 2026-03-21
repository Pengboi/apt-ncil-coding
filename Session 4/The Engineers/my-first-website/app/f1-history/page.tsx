export default function F1History() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, #f8f8f8 0%, #ffffff 50%, #f0f4f8 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230078d4' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-6 font-medium">
            Formula One World Championship
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Mercedes-AMG
          </h1>
          <p className="text-3xl md:text-5xl font-light text-blue-600 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Petronas F1 Team
          </p>
          <div className="w-24 h-0.5 bg-blue-600 mx-auto mb-8" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Eight consecutive World Championships. Over 125 Grand Prix victories. 
            A legacy of engineering excellence.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>8</p>
              <p className="text-blue-400 text-sm tracking-wider uppercase font-medium">Constructors</p>
              <p className="text-gray-500 text-xs mt-1">Championships</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>8</p>
              <p className="text-blue-400 text-sm tracking-wider uppercase font-medium">Drivers</p>
              <p className="text-gray-500 text-xs mt-1">Championships</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>125+</p>
              <p className="text-blue-400 text-sm tracking-wider uppercase font-medium">Grand Prix</p>
              <p className="text-gray-500 text-xs mt-1">Victories</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>2010</p>
              <p className="text-blue-400 text-sm tracking-wider uppercase font-medium">Team</p>
              <p className="text-gray-500 text-xs mt-1">Founded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Drivers Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-blue-600 text-sm tracking-[0.2em] uppercase mb-2 font-medium">Team</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Driver Personnel</h2>
            </div>
            <p className="text-gray-400 hidden md:block">Current and former racing drivers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Lewis Hamilton */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-400" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Lewis Hamilton</h3>
                    <p className="text-blue-600 font-medium text-sm">2013 — 2024</p>
                  </div>
                  <span className="text-5xl font-bold text-gray-100 group-hover:text-blue-100 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>44</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>6</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Titles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>84</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>151</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Podiums</p>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">
                  The most successful driver in F1 history. Holds records for wins, pole positions, and podiums.
                </p>
              </div>
            </div>

            {/* Nico Rosberg */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="h-1 bg-gradient-to-r from-gray-400 to-gray-300" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Nico Rosberg</h3>
                    <p className="text-gray-500 font-medium text-sm">2010 — 2016</p>
                  </div>
                  <span className="text-5xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>6</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>1</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Title</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>23</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>57</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Podiums</p>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">
                  2016 World Champion who retired at the peak of his career after defeating Hamilton.
                </p>
              </div>
            </div>

            {/* Valtteri Bottas */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Valtteri Bottas</h3>
                    <p className="text-blue-500 font-medium text-sm">2017 — 2021</p>
                  </div>
                  <span className="text-5xl font-bold text-gray-100 group-hover:text-blue-50 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>77</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>—</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Titles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>10</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>58</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Podiums</p>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Consistent performer who contributed to five consecutive Constructors Championships.
                </p>
              </div>
            </div>

            {/* George Russell */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200 transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-400" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>George Russell</h3>
                    <p className="text-purple-600 font-medium text-sm">2022 — Present</p>
                  </div>
                  <span className="text-5xl font-bold text-gray-100 group-hover:text-purple-50 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>63</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>—</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Titles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>3</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>15</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Podiums</p>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Mercedes Junior Team graduate known for exceptional qualifying pace and race craft.
                </p>
              </div>
            </div>

            {/* Michael Schumacher */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-yellow-200 transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="h-1 bg-gradient-to-r from-yellow-500 to-yellow-400" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Michael Schumacher</h3>
                    <p className="text-yellow-600 font-medium text-sm">2010 — 2012</p>
                  </div>
                  <span className="text-5xl font-bold text-gray-100 group-hover:text-yellow-50 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>7</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>7*</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Career</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>—</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>1</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Podium</p>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Seven-time champion who laid the groundwork for Mercedes future dominance.
                </p>
              </div>
            </div>

            {/* Kimi Antonelli */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="h-1 bg-gradient-to-r from-green-500 to-green-400" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Kimi Antonelli</h3>
                    <p className="text-green-600 font-medium text-sm">2025 — Present</p>
                  </div>
                  <span className="text-5xl font-bold text-gray-100 group-hover:text-green-50 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>12</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>—</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Titles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>—</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>F2</p>
                    <p className="text-xs text-gray-400 uppercase mt-1">Champion</p>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Highly-rated Italian prospect and Mercedes Junior Team graduate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-blue-600 text-sm tracking-[0.2em] uppercase mb-2 font-medium">Chassis</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Championship Cars</h2>
            </div>
            <p className="text-gray-400 hidden md:block">2010 — 2024</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { model: "MGP W01", year: "2010", wins: "0", engine: "FO 108X V8", desc: "Return to F1" },
              { model: "MGP W02", year: "2011", wins: "0", engine: "FO 108Y V8", desc: "First design" },
              { model: "F1 W03", year: "2012", wins: "1", engine: "FO 108Z V8", desc: "First win since 1955" },
              { model: "F1 W04", year: "2013", wins: "3", engine: "FO 108F V8", desc: "Hamilton joins" },
            ].map((car, i) => (
              <div key={i} className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all shadow-sm hover:shadow-lg">
                <p className="text-gray-400 text-sm mb-2">{car.year}</p>
                <h4 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{car.model}</h4>
                <div className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{car.wins} <span className="text-sm text-gray-400 font-normal">wins</span></div>
                <p className="text-xs text-gray-400 mb-3">{car.engine}</p>
                <p className="text-sm text-gray-500">{car.desc}</p>
              </div>
            ))}
          </div>

          {/* Championship Era - Highlighted */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { model: "F1 W05", year: "2014", wins: "16", desc: "Hybrid era begins" },
              { model: "F1 W06", year: "2015", wins: "16", desc: "Back-to-back titles" },
              { model: "F1 W07", year: "2016", wins: "19", desc: "Most dominant ever" },
              { model: "F1 W08", year: "2017", wins: "12", desc: "Fifth consecutive" },
              { model: "F1 W09", year: "2018", wins: "11", desc: "Hamilton&apos;s fifth" },
              { model: "F1 W10", year: "2019", wins: "15", desc: "Sixth title streak" },
              { model: "F1 W11", year: "2020", wins: "13", desc: "Record-breaking" },
              { model: "F1 W12", year: "2021", wins: "9", desc: "Red Bull battle" },
            ].map((car, i) => (
              <div key={i} className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full" />
                <p className="text-blue-400 text-sm mb-2 font-medium">{car.year}</p>
                <h4 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{car.model}</h4>
                <div className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{car.wins}</div>
                <p className="text-sm text-gray-400">{car.desc}</p>
              </div>
            ))}
          </div>

          {/* Recent Era */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { model: "F1 W13", year: "2022", wins: "1", desc: "Ground effect struggles" },
              { model: "F1 W14", year: "2023", wins: "0", desc: "First winless season" },
              { model: "F1 W15", year: "2024", wins: "4", desc: "Return to winning" },
            ].map((car, i) => (
              <div key={i} className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all shadow-sm hover:shadow-lg">
                <p className="text-gray-400 text-sm mb-2">{car.year}</p>
                <h4 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{car.model}</h4>
                <div className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{car.wins} <span className="text-sm text-gray-400 font-normal">wins</span></div>
                <p className="text-sm text-gray-500">{car.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Power Units */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-blue-600 text-sm tracking-[0.2em] uppercase mb-2 font-medium">Engineering</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Power Unit Development</h2>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { name: "FO 108X / Y / Z / F", era: "2010 — 2013", type: "2.4L Naturally Aspirated V8", power: "750 HP", wins: "4", desc: "Final era of naturally aspirated V8 engines" },
              { name: "PU106A Hybrid", era: "2014", type: "1.6L V6 Turbo-Hybrid", power: "850+ HP", wins: "16", desc: "Revolutionary power unit with MGU-K, MGU-H, and advanced ERS" },
              { name: "PU106B Hybrid", era: "2015", type: "1.6L V6 Turbo-Hybrid", power: "870+ HP", wins: "16", desc: "Evolution with improved reliability and efficiency" },
              { name: "M08 — M11 EQ Power+", era: "2016 — 2020", type: "1.6L V6 Turbo-Hybrid", power: "900+ HP", wins: "70", desc: "Peak of Mercedes dominance with annual improvements" },
              { name: "M12 — M15 E Performance", era: "2021 — 2024", type: "1.6L V6 Turbo-Hybrid", power: "950+ HP", wins: "13", desc: "Continued hybrid development with increased competition" },
            ].map((engine, i) => (
              <div key={i} className="group flex flex-col md:flex-row md:items-center gap-6 p-8 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all shadow-sm hover:shadow-lg">
                <div className="md:w-64">
                  <h4 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{engine.name}</h4>
                  <p className="text-blue-600 text-sm font-medium">{engine.era}</p>
                </div>
                <div className="md:w-48">
                  <p className="text-gray-900 font-medium">{engine.type}</p>
                  <p className="text-gray-400 text-sm">{engine.power}</p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-500">{engine.desc}</p>
                </div>
                <div className="md:w-24 text-right">
                  <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>{engine.wins}</p>
                  <p className="text-xs text-gray-400 uppercase">wins</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm tracking-[0.2em] uppercase mb-2 font-medium">History</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Historical Timeline</h2>
          </div>

          {/* Desktop Timeline - Alternating */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-px" />
            
            {[
              { year: "2010", title: "Return to F1", desc: "Mercedes returns as constructor after 55 years, acquiring Brawn GP" },
              { year: "2012", title: "First Victory", desc: "Nico Rosberg wins at Chinese GP — first since 1955" },
              { year: "2014", title: "Hybrid Era Begins", desc: "Dominant start to turbo-hybrid era with 16 wins" },
              { year: "2016", title: "Rosberg Champion", desc: "Nico Rosberg wins World Championship, retires days later" },
              { year: "2020", title: "Seven Titles", desc: "Lewis Hamilton equals Schumacher&apos;s 7 championships record" },
              { year: "2021", title: "New Generation", desc: "George Russell joins alongside Lewis Hamilton" },
              { year: "2022", title: "Ground Effect", desc: "New regulations bring challenges with porpoising" },
              { year: "2024", title: "Hamilton Departs", desc: "Lewis Hamilton announces move to Ferrari for 2025" },
            ].map((event, i) => (
              <div key={i} className="grid grid-cols-2 gap-8 mb-12 last:mb-0 items-center">
                {i % 2 === 0 ? (
                  <>
                    <div className="text-right pr-12">
                      <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Playfair Display, serif' }}>{event.year}</p>
                      <h4 className="text-xl font-bold text-gray-900 mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>{event.title}</h4>
                      <p className="text-gray-500 mt-2">{event.desc}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white -ml-2 shadow-md" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-end">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white mr-10 shadow-md" />
                    </div>
                    <div className="pl-4">
                      <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Playfair Display, serif' }}>{event.year}</p>
                      <h4 className="text-xl font-bold text-gray-900 mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>{event.title}</h4>
                      <p className="text-gray-500 mt-2">{event.desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
            
            {[
              { year: "2010", title: "Return to F1", desc: "Mercedes returns as constructor after 55 years, acquiring Brawn GP" },
              { year: "2012", title: "First Victory", desc: "Nico Rosberg wins at Chinese GP — first since 1955" },
              { year: "2014", title: "Hybrid Era Begins", desc: "Dominant start to turbo-hybrid era with 16 wins" },
              { year: "2016", title: "Rosberg Champion", desc: "Nico Rosberg wins World Championship, retires days later" },
              { year: "2020", title: "Seven Titles", desc: "Lewis Hamilton equals Schumacher&apos;s 7 championships record" },
              { year: "2021", title: "New Generation", desc: "George Russell joins alongside Lewis Hamilton" },
              { year: "2022", title: "Ground Effect", desc: "New regulations bring challenges with porpoising" },
              { year: "2024", title: "Hamilton Departs", desc: "Lewis Hamilton announces move to Ferrari for 2025" },
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-6 pl-4 mb-10 last:mb-0">
                <div className="w-3 h-3 bg-blue-600 rounded-full border-4 border-white z-10 flex-shrink-0 mt-2 shadow-md" />
                <div>
                  <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Playfair Display, serif' }}>{event.year}</p>
                  <h4 className="text-lg font-bold text-gray-900 mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>{event.title}</h4>
                  <p className="text-gray-500 text-sm mt-1">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>The Silver Arrows Legacy</h2>
          <p className="text-gray-500 leading-relaxed text-lg">
            From the pioneering W25 of the 1930s to the record-breaking W11 of the hybrid era, 
            Mercedes-Benz has consistently remained at the forefront of Formula One technology 
            and motorsport achievement.
          </p>
        </div>
      </section>
    </div>
  );
}
