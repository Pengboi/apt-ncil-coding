export default function F1History() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.ctfassets.net/1fvlg6xqnm65/5D4gqsOZ77bCjTG8gnyDM9/7fa80b560ee97d1437481f4dbf5976e3/M351781.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p className="text-white/80 text-sm tracking-[0.4em] uppercase mb-6 font-medium">
            Formula One World Championship
          </p>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            Mercedes-AMG
          </h1>
          <p className="text-4xl md:text-6xl font-light text-[#00D2BE] mb-8">
            Petronas F1 Team
          </p>
          <div className="w-32 h-1 bg-[#00D2BE] mx-auto mb-8" />
          <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Eight consecutive World Championships. Over 100 Grand Prix victories. 
            A legacy of engineering excellence.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#111] border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-white mb-2">8</p>
              <p className="text-[#00D2BE] text-sm tracking-wider uppercase font-medium">Constructors</p>
              <p className="text-gray-500 text-xs mt-1">Championships</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-white mb-2">8</p>
              <p className="text-[#00D2BE] text-sm tracking-wider uppercase font-medium">Drivers</p>
              <p className="text-gray-500 text-xs mt-1">Championships</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-white mb-2">125+</p>
              <p className="text-[#00D2BE] text-sm tracking-wider uppercase font-medium">Grand Prix</p>
              <p className="text-gray-500 text-xs mt-1">Victories</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-white mb-2">2010</p>
              <p className="text-[#00D2BE] text-sm tracking-wider uppercase font-medium">Team</p>
              <p className="text-gray-500 text-xs mt-1">Founded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Drivers Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[#00D2BE] text-sm tracking-[0.2em] uppercase mb-2">Team</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Driver Personnel</h2>
            </div>
            <p className="text-gray-500 hidden md:block">Current and former racing drivers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Lewis Hamilton */}
            <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-[#00D2BE]/50 transition-all duration-500">
              <div className="h-2 bg-gradient-to-r from-[#00D2BE] to-[#00D2BE]/50" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Lewis Hamilton</h3>
                    <p className="text-[#00D2BE] font-medium">2013 — 2024</p>
                  </div>
                  <span className="text-5xl font-bold text-gray-800 group-hover:text-[#00D2BE]/20 transition-colors">44</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-800">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">6</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Titles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">84</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">151</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Podiums</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  The most successful driver in F1 history. Holds records for wins, pole positions, and podiums.
                </p>
              </div>
            </div>

            {/* Nico Rosberg */}
            <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-500">
              <div className="h-2 bg-gradient-to-r from-gray-500 to-gray-600" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Nico Rosberg</h3>
                    <p className="text-gray-400 font-medium">2010 — 2016</p>
                  </div>
                  <span className="text-5xl font-bold text-gray-800 group-hover:text-gray-600/20 transition-colors">6</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-800">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">1</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Title</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">23</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">57</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Podiums</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  2016 World Champion who retired at the peak of his career after defeating Hamilton.
                </p>
              </div>
            </div>

            {/* Valtteri Bottas */}
            <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-500">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-400" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Valtteri Bottas</h3>
                    <p className="text-blue-400 font-medium">2017 — 2021</p>
                  </div>
                  <span className="text-5xl font-bold text-gray-800 group-hover:text-blue-500/20 transition-colors">77</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-800">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">—</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Titles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">10</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">58</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Podiums</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Consistent performer who contributed to five consecutive Constructors Championships.
                </p>
              </div>
            </div>

            {/* George Russell */}
            <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-500">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-400" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">George Russell</h3>
                    <p className="text-purple-400 font-medium">2022 — Present</p>
                  </div>
                  <span className="text-5xl font-bold text-gray-800 group-hover:text-purple-500/20 transition-colors">63</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-800">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">—</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Titles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">3</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">15</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Podiums</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Mercedes Junior Team graduate known for exceptional qualifying pace and race craft.
                </p>
              </div>
            </div>

            {/* Michael Schumacher */}
            <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-600/50 transition-all duration-500">
              <div className="h-2 bg-gradient-to-r from-yellow-600 to-yellow-500" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Michael Schumacher</h3>
                    <p className="text-yellow-500 font-medium">2010 — 2012</p>
                  </div>
                  <span className="text-5xl font-bold text-gray-800 group-hover:text-yellow-600/20 transition-colors">7</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-800">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">7*</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Career</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">—</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">1</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Podium</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Seven-time champion who laid the groundwork for Mercedes future dominance.
                </p>
              </div>
            </div>

            {/* Kimi Antonelli */}
            <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-500">
              <div className="h-2 bg-gradient-to-r from-green-500 to-green-400" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Kimi Antonelli</h3>
                    <p className="text-green-400 font-medium">2025 — Present</p>
                  </div>
                  <span className="text-5xl font-bold text-gray-800 group-hover:text-green-500/20 transition-colors">12</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-800">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">—</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Titles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">—</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">F2</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">Champion</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Highly-rated Italian prospect and Mercedes Junior Team graduate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Section */}
      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[#00D2BE] text-sm tracking-[0.2em] uppercase mb-2">Chassis</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Championship Cars</h2>
            </div>
            <p className="text-gray-500 hidden md:block">2010 — 2024</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { model: "MGP W01", year: "2010", wins: "0", engine: "FO 108X V8", desc: "Return to F1" },
              { model: "MGP W02", year: "2011", wins: "0", engine: "FO 108Y V8", desc: "First design" },
              { model: "F1 W03", year: "2012", wins: "1", engine: "FO 108Z V8", desc: "First win since 1955" },
              { model: "F1 W04", year: "2013", wins: "3", engine: "FO 108F V8", desc: "Hamilton joins" },
            ].map((car, i) => (
              <div key={i} className="group bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all">
                <p className="text-gray-500 text-sm mb-2">{car.year}</p>
                <h4 className="text-xl font-bold text-white mb-4">{car.model}</h4>
                <div className="text-3xl font-bold text-white mb-2">{car.wins} <span className="text-sm text-gray-500 font-normal">wins</span></div>
                <p className="text-xs text-gray-500 mb-3">{car.engine}</p>
                <p className="text-sm text-gray-400">{car.desc}</p>
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
              { model: "F1 W09", year: "2018", wins: "11", desc: "Hamilton's fifth" },
              { model: "F1 W10", year: "2019", wins: "15", desc: "Sixth title streak" },
              { model: "F1 W11", year: "2020", wins: "13", desc: "Record-breaking" },
              { model: "F1 W12", year: "2021", wins: "9", desc: "Red Bull battle" },
            ].map((car, i) => (
              <div key={i} className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-[#00D2BE]/30 hover:border-[#00D2BE] transition-all overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#00D2BE]/5 rounded-bl-full" />
                <p className="text-[#00D2BE] text-sm mb-2 font-medium">{car.year}</p>
                <h4 className="text-xl font-bold text-white mb-4">{car.model}</h4>
                <div className="text-4xl font-bold text-white mb-2">{car.wins}</div>
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
              <div key={i} className="group bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all">
                <p className="text-gray-500 text-sm mb-2">{car.year}</p>
                <h4 className="text-xl font-bold text-white mb-4">{car.model}</h4>
                <div className="text-3xl font-bold text-white mb-2">{car.wins} <span className="text-sm text-gray-500 font-normal">wins</span></div>
                <p className="text-sm text-gray-400">{car.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Power Units */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[#00D2BE] text-sm tracking-[0.2em] uppercase mb-2">Engineering</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Power Unit Development</h2>
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
              <div key={i} className="group flex flex-col md:flex-row md:items-center gap-6 p-8 bg-gradient-to-r from-gray-900 to-black rounded-2xl border border-gray-800 hover:border-gray-700 transition-all">
                <div className="md:w-64">
                  <h4 className="text-xl font-bold text-white mb-1">{engine.name}</h4>
                  <p className="text-[#00D2BE] text-sm">{engine.era}</p>
                </div>
                <div className="md:w-48">
                  <p className="text-white font-medium">{engine.type}</p>
                  <p className="text-gray-500 text-sm">{engine.power}</p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-400">{engine.desc}</p>
                </div>
                <div className="md:w-24 text-right">
                  <p className="text-3xl font-bold text-white">{engine.wins}</p>
                  <p className="text-xs text-gray-500 uppercase">wins</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#00D2BE] text-sm tracking-[0.2em] uppercase mb-2">History</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Historical Timeline</h2>
          </div>

          {/* Desktop Timeline - Alternating */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-800 -translate-x-px" />
            
            {[
              { year: "2010", title: "Return to F1", desc: "Mercedes returns as constructor after 55 years, acquiring Brawn GP" },
              { year: "2012", title: "First Victory", desc: "Nico Rosberg wins at Chinese GP — first since 1955" },
              { year: "2014", title: "Hybrid Era Begins", desc: "Dominant start to turbo-hybrid era with 16 wins" },
              { year: "2016", title: "Rosberg Champion", desc: "Nico Rosberg wins World Championship, retires days later" },
              { year: "2020", title: "Seven Titles", desc: "Lewis Hamilton equals Schumacher's 7 championships record" },
              { year: "2021", title: "New Generation", desc: "George Russell joins alongside Lewis Hamilton" },
              { year: "2022", title: "Ground Effect", desc: "New regulations bring challenges with porpoising" },
              { year: "2024", title: "Hamilton Departs", desc: "Lewis Hamilton announces move to Ferrari for 2025" },
            ].map((event, i) => (
              <div key={i} className="grid grid-cols-2 gap-8 mb-12 last:mb-0 items-center">
                {i % 2 === 0 ? (
                  <>
                    <div className="text-right pr-12">
                      <p className="text-3xl font-bold text-[#00D2BE]">{event.year}</p>
                      <h4 className="text-xl font-bold text-white mt-1">{event.title}</h4>
                      <p className="text-gray-500 mt-2">{event.desc}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-[#00D2BE] rounded-full border-4 border-[#0d0d0d] -ml-2" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-end">
                      <div className="w-4 h-4 bg-[#00D2BE] rounded-full border-4 border-[#0d0d0d] mr-10" />
                    </div>
                    <div className="pl-4">
                      <p className="text-3xl font-bold text-[#00D2BE]">{event.year}</p>
                      <h4 className="text-xl font-bold text-white mt-1">{event.title}</h4>
                      <p className="text-gray-500 mt-2">{event.desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-800" />
            
            {[
              { year: "2010", title: "Return to F1", desc: "Mercedes returns as constructor after 55 years, acquiring Brawn GP" },
              { year: "2012", title: "First Victory", desc: "Nico Rosberg wins at Chinese GP — first since 1955" },
              { year: "2014", title: "Hybrid Era Begins", desc: "Dominant start to turbo-hybrid era with 16 wins" },
              { year: "2016", title: "Rosberg Champion", desc: "Nico Rosberg wins World Championship, retires days later" },
              { year: "2020", title: "Seven Titles", desc: "Lewis Hamilton equals Schumacher's 7 championships record" },
              { year: "2021", title: "New Generation", desc: "George Russell joins alongside Lewis Hamilton" },
              { year: "2022", title: "Ground Effect", desc: "New regulations bring challenges with porpoising" },
              { year: "2024", title: "Hamilton Departs", desc: "Lewis Hamilton announces move to Ferrari for 2025" },
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-6 pl-4 mb-10 last:mb-0">
                <div className="w-3 h-3 bg-[#00D2BE] rounded-full border-4 border-[#0d0d0d] z-10 flex-shrink-0 mt-2" />
                <div>
                  <p className="text-2xl font-bold text-[#00D2BE]">{event.year}</p>
                  <h4 className="text-lg font-bold text-white mt-1">{event.title}</h4>
                  <p className="text-gray-500 text-sm mt-1">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">The Silver Arrows Legacy</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            From the pioneering W25 of the 1930s to the record-breaking W11 of the hybrid era, 
            Mercedes-Benz has consistently remained at the forefront of Formula One technology 
            and motorsport achievement.
          </p>
        </div>
      </section>
    </div>
  );
}
