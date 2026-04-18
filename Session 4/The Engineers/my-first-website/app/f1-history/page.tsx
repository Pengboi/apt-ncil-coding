'use client';

import { useState } from 'react';

interface Driver {
  id: number;
  name: string;
  number: string;
  years: string;
  titles: string;
  wins: string;
  podiums: string;
  description: string;
  color: string;
  status: 'current' | 'former' | 'legend';
}

interface Car {
  id: number;
  model: string;
  year: string;
  wins: string;
  poles: string;
  desc: string;
  champion?: boolean;
}

interface Engine {
  id: number;
  name: string;
  era: string;
  type: string;
  power: string;
  wins: string;
  desc: string;
}

const drivers: Driver[] = [
  {
    id: 1,
    name: 'Lewis Hamilton',
    number: '44',
    years: '2013 — 2024',
    titles: '6',
    wins: '84',
    podiums: '151',
    description: 'The most successful driver in F1 history. Holds records for wins, pole positions, and podiums.',
    color: '#00D4AA',
    status: 'legend',
  },
  {
    id: 2,
    name: 'Nico Rosberg',
    number: '6',
    years: '2010 — 2016',
    titles: '1',
    wins: '23',
    podiums: '57',
    description: '2016 World Champion who retired at the peak of his career after defeating Hamilton.',
    color: '#9CA3AF',
    status: 'legend',
  },
  {
    id: 3,
    name: 'Valtteri Bottas',
    number: '77',
    years: '2017 — 2021',
    titles: '—',
    wins: '10',
    podiums: '58',
    description: 'Consistent performer who contributed to five consecutive Constructors Championships.',
    color: '#3B82F6',
    status: 'former',
  },
  {
    id: 4,
    name: 'George Russell',
    number: '63',
    years: '2022 — Present',
    titles: '—',
    wins: '3',
    podiums: '15',
    description: 'Mercedes Junior Team graduate known for exceptional qualifying pace and race craft.',
    color: '#8B5CF6',
    status: 'current',
  },
  {
    id: 5,
    name: 'Michael Schumacher',
    number: '7',
    years: '2010 — 2012',
    titles: '7*',
    wins: '—',
    podiums: '1',
    description: 'Seven-time champion who laid the groundwork for Mercedes future dominance.',
    color: '#EAB308',
    status: 'legend',
  },
  {
    id: 6,
    name: 'Kimi Antonelli',
    number: '12',
    years: '2025 — Present',
    titles: '—',
    wins: '—',
    podiums: 'F2',
    description: 'Highly-rated Italian prospect and Mercedes Junior Team graduate.',
    color: '#22C55E',
    status: 'current',
  },
];

const cars: Car[] = [
  { id: 1, model: 'MGP W01', year: '2010', wins: '0', poles: '0', desc: 'Return to F1 after 55 years' },
  { id: 2, model: 'MGP W02', year: '2011', wins: '0', poles: '0', desc: 'First full Mercedes design' },
  { id: 3, model: 'F1 W03', year: '2012', wins: '1', poles: '1', desc: 'First win since 1955' },
  { id: 4, model: 'F1 W04', year: '2013', wins: '3', poles: '5', desc: 'Hamilton joins the team' },
];

const championshipCars: Car[] = [
  { id: 5, model: 'F1 W05', year: '2014', wins: '16', poles: '18', desc: 'Hybrid era begins with dominance', champion: true },
  { id: 6, model: 'F1 W06', year: '2015', wins: '16', poles: '15', desc: 'Back-to-back World Championships', champion: true },
  { id: 7, model: 'F1 W07', year: '2016', wins: '19', poles: '20', desc: 'Most dominant season in history', champion: true },
  { id: 8, model: 'F1 W08', year: '2017', wins: '12', poles: '15', desc: 'Fifth consecutive title secured', champion: true },
  { id: 9, model: 'F1 W09', year: '2018', wins: '11', poles: '13', desc: "Hamilton's fifth World Championship", champion: true },
  { id: 10, model: 'F1 W10', year: '2019', wins: '15', poles: '10', desc: 'Sixth consecutive title streak', champion: true },
  { id: 11, model: 'F1 W11', year: '2020', wins: '13', poles: '15', desc: 'Record-breaking championship car', champion: true },
  { id: 12, model: 'F1 W12', year: '2021', wins: '9', poles: '9', desc: 'Intense battle with Red Bull', champion: false },
];

const recentCars: Car[] = [
  { id: 13, model: 'F1 W13', year: '2022', wins: '1', poles: '1', desc: 'Ground effect regulation struggles' },
  { id: 14, model: 'F1 W14', year: '2023', wins: '0', poles: '1', desc: 'First winless season since 2011' },
  { id: 15, model: 'F1 W15', year: '2024', wins: '4', poles: '4', desc: 'Return to winning form' },
];

const engines: Engine[] = [
  {
    id: 1,
    name: 'FO 108X / Y / Z / F',
    era: '2010 — 2013',
    type: '2.4L Naturally Aspirated V8',
    power: '750 HP',
    wins: '4',
    desc: 'Final era of naturally aspirated V8 engines',
  },
  {
    id: 2,
    name: 'PU106A Hybrid',
    era: '2014',
    type: '1.6L V6 Turbo-Hybrid',
    power: '850+ HP',
    wins: '16',
    desc: 'Revolutionary power unit with MGU-K, MGU-H, and advanced ERS',
  },
  {
    id: 3,
    name: 'PU106B Hybrid',
    era: '2015',
    type: '1.6L V6 Turbo-Hybrid',
    power: '870+ HP',
    wins: '16',
    desc: 'Evolution with improved reliability and efficiency',
  },
  {
    id: 4,
    name: 'M08 — M11 EQ Power+',
    era: '2016 — 2020',
    type: '1.6L V6 Turbo-Hybrid',
    power: '900+ HP',
    wins: '70',
    desc: 'Peak of Mercedes dominance with annual improvements',
  },
  {
    id: 5,
    name: 'M12 — M15 E Performance',
    era: '2021 — 2024',
    type: '1.6L V6 Turbo-Hybrid',
    power: '950+ HP',
    wins: '13',
    desc: 'Continued hybrid development with increased competition',
  },
];

const timelineEvents = [
  { year: '2010', title: 'Return to F1', desc: 'Mercedes returns as constructor after 55 years, acquiring Brawn GP' },
  { year: '2012', title: 'First Victory', desc: 'Nico Rosberg wins at Chinese GP — first since 1955' },
  { year: '2014', title: 'Hybrid Era Begins', desc: 'Dominant start to turbo-hybrid era with 16 wins' },
  { year: '2016', title: 'Rosberg Champion', desc: 'Nico Rosberg wins World Championship, retires days later' },
  { year: '2020', title: 'Seven Titles', desc: "Lewis Hamilton equals Schumacher's 7 championships record" },
  { year: '2021', title: 'New Generation', desc: 'George Russell joins alongside Lewis Hamilton' },
  { year: '2022', title: 'Ground Effect', desc: 'New regulations bring challenges with porpoising' },
  { year: '2024', title: 'Hamilton Departs', desc: 'Lewis Hamilton announces move to Ferrari for 2025' },
];

const stats = [
  { value: '8', label: "Constructors'", sublabel: 'Championships' },
  { value: '8', label: "Drivers'", sublabel: 'Championships' },
  { value: '125+', label: 'Grand Prix', sublabel: 'Victories' },
  { value: '2010', label: 'Team', sublabel: 'Founded' },
];

export default function F1History() {
  const [activeTab, setActiveTab] = useState<'all' | 'current' | 'former' | 'legend'>('all');

  const filteredDrivers = activeTab === 'all' 
    ? drivers 
    : drivers.filter(d => d.status === activeTab);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/10 via-transparent to-[#0078D4]/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a2e]/50 via-[#0A0A0A] to-[#0A0A0A]" />
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-10">
            <span className="w-2 h-2 rounded-full bg-[#00D4AA] animate-pulse" />
            <span className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium">Formula One World Championship</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Mercedes-AMG</span>
          </h1>
          <p className="text-3xl md:text-5xl lg:text-6xl font-light text-[#00D4AA] mb-10">
            Petronas F1 Team
          </p>

          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#00D4AA] to-transparent mx-auto mb-10" />

          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            Eight consecutive World Championships. Over 125 Grand Prix victories. 
            A legacy of engineering excellence that redefined Formula One.
          </p>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="text-xs tracking-[0.3em] uppercase text-gray-500">Scroll</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-[#00D4AA] to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-20 border-y border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="relative inline-block">
                  <p className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 group-hover:text-[#00D4AA] transition-colors duration-500">
                    {stat.value}
                  </p>
                  <div className="absolute -inset-4 bg-[#00D4AA]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="text-[#00D4AA] text-sm tracking-[0.15em] uppercase font-semibold mb-1">{stat.label}</p>
                <p className="text-gray-500 text-sm">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drivers Section */}
      <section className="py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <p className="text-[#00D4AA] text-sm tracking-[0.25em] uppercase mb-4 font-semibold">Driver Personnel</p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">The Champions</h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3">
              {(['all', 'current', 'former', 'legend'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border ${
                    activeTab === tab 
                      ? 'bg-[#00D4AA] border-[#00D4AA] text-black' 
                      : 'bg-transparent border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Drivers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDrivers.map((driver, index) => (
              <div 
                key={driver.id}
                className="group relative bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 hover:border-[#00D4AA]/50 transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Accent Line */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${driver.color}, transparent)` }}
                />

                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                    driver.status === 'current' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    driver.status === 'legend' ? 'bg-[#00D4AA]/20 text-[#00D4AA] border border-[#00D4AA]/30' :
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {driver.status}
                  </span>
                </div>

                <div className="p-10">
                  {/* Number & Name */}
                  <div className="mb-8">
                    <span 
                      className="text-7xl font-bold opacity-20 block mb-2"
                      style={{ color: driver.color }}
                    >
                      {driver.number}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{driver.name}</h3>
                    <p className="text-gray-500 text-sm">{driver.years}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 rounded-xl bg-white/5">
                      <p className="text-2xl font-bold text-white mb-1">{driver.titles}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Titles</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5">
                      <p className="text-2xl font-bold text-white mb-1">{driver.wins}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Wins</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5">
                      <p className="text-2xl font-bold text-white mb-1">{driver.podiums}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Podiums</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">{driver.description}</p>
                </div>

                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${driver.color}10, transparent 70%)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cars Section */}
      <section className="py-32 px-6 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-20">
            <p className="text-[#00D4AA] text-sm tracking-[0.25em] uppercase mb-4 font-semibold">Chassis Evolution</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">Championship Cars</h2>
            <p className="text-gray-400 text-xl max-w-2xl">From the pioneering W01 to the record-breaking W11, every Silver Arrow tells a story of innovation.</p>
          </div>

          {/* Early Years */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-400 mb-8 tracking-wide">Early Years <span className="text-gray-600">2010 — 2013</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cars.map((car) => (
                <div 
                  key={car.id}
                  className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <p className="text-gray-500 text-sm mb-3">{car.year}</p>
                  <h4 className="text-2xl font-bold text-white mb-4">{car.model}</h4>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-white">{car.wins}</span>
                    <span className="text-gray-500 text-sm">wins</span>
                  </div>
                  <p className="text-gray-400 text-sm">{car.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Championship Era */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-semibold text-white tracking-wide">Dynasty Era</h3>
              <span className="px-3 py-1 rounded-full bg-[#00D4AA]/20 text-[#00D4AA] text-xs font-semibold uppercase border border-[#00D4AA]/30">2014 — 2021</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {championshipCars.map((car) => (
                <div 
                  key={car.id}
                  className={`group relative p-8 rounded-2xl border transition-all duration-300 overflow-hidden ${
                    car.champion 
                      ? 'bg-gradient-to-br from-[#00D4AA]/20 to-[#00D4AA]/5 border-[#00D4AA]/30' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Champion Badge */}
                  {car.champion && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#00D4AA] flex items-center justify-center">
                      <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}

                  <p className={`text-sm mb-3 ${car.champion ? 'text-[#00D4AA]' : 'text-gray-500'}`}>{car.year}</p>
                  <h4 className="text-2xl font-bold text-white mb-4">{car.model}</h4>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-white">{car.wins}</span>
                    <span className="text-gray-500 text-sm">wins</span>
                  </div>
                  <p className="text-gray-400 text-sm">{car.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Era */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-400 mb-8 tracking-wide">Recent Era <span className="text-gray-600">2022 — 2024</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recentCars.map((car) => (
                <div 
                  key={car.id}
                  className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <p className="text-gray-500 text-sm mb-3">{car.year}</p>
                  <h4 className="text-2xl font-bold text-white mb-4">{car.model}</h4>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-white">{car.wins}</span>
                    <span className="text-gray-500 text-sm">wins</span>
                  </div>
                  <p className="text-gray-400 text-sm">{car.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Power Units Section */}
      <section className="py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-20">
            <p className="text-[#00D4AA] text-sm tracking-[0.25em] uppercase mb-4 font-semibold">Engineering Excellence</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">Power Unit Evolution</h2>
            <p className="text-gray-400 text-xl max-w-2xl">From naturally aspirated V8s to hybrid turbo marvels — the engines that powered the Silver Arrows.</p>
          </div>

          {/* Engines List */}
          <div className="space-y-6">
            {engines.map((engine, index) => (
              <div 
                key={engine.id}
                className="group flex flex-col lg:flex-row lg:items-center gap-8 p-8 lg:p-10 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00D4AA]/30 transition-all duration-500"
              >
                {/* Number */}
                <div className="hidden lg:block text-5xl font-bold text-white/10 group-hover:text-[#00D4AA]/30 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Main Info */}
                <div className="lg:w-72">
                  <h4 className="text-2xl font-bold text-white mb-2">{engine.name}</h4>
                  <p className="text-[#00D4AA] font-medium">{engine.era}</p>
                </div>

                {/* Specs */}
                <div className="lg:w-56">
                  <p className="text-white font-medium">{engine.type}</p>
                  <p className="text-gray-500">{engine.power}</p>
                </div>

                {/* Description */}
                <div className="flex-1">
                  <p className="text-gray-400">{engine.desc}</p>
                </div>

                {/* Wins */}
                <div className="lg:w-24 lg:text-right">
                  <p className="text-4xl font-bold text-white group-hover:text-[#00D4AA] transition-colors">{engine.wins}</p>
                  <p className="text-gray-500 text-sm uppercase tracking-wide">wins</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 px-6 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="text-[#00D4AA] text-sm tracking-[0.25em] uppercase mb-4 font-semibold">Historical Journey</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">Timeline of Success</h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00D4AA] via-white/20 to-transparent" />

            {timelineEvents.map((event, index) => (
              <div 
                key={index}
                className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'
                }`}>
                  <span className="text-4xl md:text-5xl font-bold text-[#00D4AA] block mb-3">{event.year}</span>
                  <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
                  <p className="text-gray-400 max-w-md mx-auto md:mx-0">{event.desc}</p>
                </div>

                {/* Center Dot */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 mt-3">
                  <div className="w-4 h-4 rounded-full bg-[#00D4AA] border-4 border-[#0D0D0D] shadow-lg shadow-[#00D4AA]/20" />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-32 px-6 bg-[#0A0A0A] border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/20 mb-10">
            <svg className="w-10 h-10 text-[#00D4AA]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">The Silver Arrows Legacy</h2>
          <p className="text-gray-400 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            From the pioneering W25 of the 1930s to the record-breaking W11 of the hybrid era, 
            Mercedes-Benz has consistently remained at the forefront of Formula One technology 
            and motorsport achievement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="/" 
              className="px-10 py-4 rounded-full bg-[#00D4AA] text-black font-semibold tracking-wide hover:bg-[#00D4AA]/90 transition-all duration-300"
            >
              Back to Home
            </a>
            <a 
              href="/cars-for-sale" 
              className="px-10 py-4 rounded-full border border-white/20 text-white font-semibold tracking-wide hover:bg-white/5 transition-all duration-300"
            >
              View Collection
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
