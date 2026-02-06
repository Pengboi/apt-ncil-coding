export default function F1History() {
  const milestones = [
    { year: '2010', title: 'Mercedes Returns to F1', description: 'Mercedes-Benz returns to Formula 1 as a constructor after 55 years, acquiring the Brawn GP team and forming Mercedes GP Petronas.' },
    { year: '2012', title: 'First Victory', description: 'Nico Rosberg secures Mercedes\' first victory as a works team at the Chinese Grand Prix.' },
    { year: '2014', title: 'Hybrid Era Dominance Begins', description: 'The start of the turbo-hybrid era. Mercedes dominates with 16 wins out of 19 races, securing both Constructors\' and Drivers\' Championships.' },
    { year: '2015', title: 'Back-to-Back Championships', description: 'Mercedes continues dominance with Lewis Hamilton winning his third World Championship and the team securing their second consecutive Constructors\' title.' },
    { year: '2016', title: 'Nico Rosberg Champion', description: 'Nico Rosberg wins his first and only World Championship in a dramatic final race, retiring days later.' },
    { year: '2017', title: 'Hamilton\'s Fourth Title', description: 'Lewis Hamilton wins his fourth World Championship as Mercedes secures their fourth consecutive Constructors\' Championship.' },
    { year: '2018', title: 'Fifth Consecutive Title', description: 'Mercedes extends their record with a fifth consecutive Constructors\' Championship. Hamilton wins his fifth drivers\' title.' },
    { year: '2019', title: 'Sixth Title Streak', description: 'Mercedes makes history with six consecutive Constructors\' Championships. Hamilton wins his sixth World Championship.' },
    { year: '2020', title: 'Record-Breaking Season', description: 'Mercedes achieves their seventh consecutive Constructors\' Championship with 13 wins from 17 races. Hamilton equals Schumacher\'s record with his seventh title.' },
    { year: '2021', title: 'New Era Begins', description: 'George Russell joins the team alongside Lewis Hamilton, marking the start of a new chapter for Mercedes-AMG Petronas.' },
  ];

  const drivers = [
    { name: 'Lewis Hamilton', years: '2013-Present', titles: '7 World Championships', wins: '103+ Wins', description: 'The most successful driver in Formula 1 history, joined Mercedes in 2013 and went on to win 6 World Championships with the team.' },
    { name: 'Nico Rosberg', years: '2010-2016', titles: '1 World Championship', wins: '23 Wins', description: 'Son of 1982 World Champion Keke Rosberg, Nico spent his entire career at Mercedes and won the 2016 World Championship.' },
    { name: 'Valtteri Bottas', years: '2017-2021', titles: '0', wins: '10 Wins', description: 'The reliable Finn played a crucial supporting role to Hamilton, securing 10 race wins and helping Mercedes to multiple Constructors\' titles.' },
    { name: 'George Russell', years: '2022-Present', titles: '0', wins: '1 Win', description: 'The young British talent joined Mercedes from Williams, bringing fresh energy and ambition to the Silver Arrows.' },
  ];

  const stats = [
    { label: 'Constructors\' Championships', value: '8', period: '2014-2021' },
    { label: 'Drivers\' Championships', value: '8', period: '2014-2021' },
    { label: 'Race Wins', value: '115+', period: '2010-2023' },
    { label: 'Podium Finishes', value: '250+', period: '2010-2023' },
    { label: 'Pole Positions', value: '130+', period: '2010-2023' },
    { label: 'Fastest Laps', value: '90+', period: '2010-2023' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-[#00D2BE]/10 border border-[#00D2BE] rounded-full mb-6">
            <span className="text-[#00D2BE] font-semibold text-sm">FORMULA 1</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Mercedes-AMG Petronas
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            F1 History
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            The most successful team in the modern era of Formula 1, dominating the hybrid era 
            with unprecedented success and engineering excellence.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Championship Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 text-center hover:border-[#00D2BE] transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-[#00D2BE] mb-2">{stat.value}</div>
                <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
                <div className="text-gray-500 text-xs">{stat.period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Journey to Dominance
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-[#2A2A2A]"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}>
                <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#00D2BE] rounded-full border-4 border-[#0A0A0A] z-10"></div>
                  
                  {/* Content */}
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#00D2BE] transition-all duration-300">
                      <div className="text-[#00D2BE] font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{milestone.title}</h3>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drivers Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Our Champions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {drivers.map((driver, index) => (
              <div key={index} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-8 hover:border-[#00D2BE] transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{driver.name}</h3>
                    <p className="text-gray-500 text-sm">{driver.years}</p>
                  </div>
                  <div className="w-16 h-16 bg-[#00D2BE] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xl">{driver.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Championships</div>
                    <div className="text-white font-semibold">{driver.titles}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Race Wins</div>
                    <div className="text-white font-semibold">{driver.wins}</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{driver.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-16 px-4 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Silver Arrows Legacy
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            The Silver Arrows name dates back to the 1930s when Mercedes-Benz dominated Grand Prix racing. 
            The modern Mercedes-AMG Petronas team continues this legacy of excellence, innovation, and racing supremacy. 
            From the pioneering days of the W25 to the turbo-hybrid dominance of the W11, Mercedes has always been 
            at the forefront of Formula 1 technology and performance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6">
              <div className="text-[#00D2BE] font-bold text-2xl mb-2">1930s</div>
              <div className="text-white font-semibold mb-2">Original Silver Arrows</div>
              <div className="text-gray-400 text-sm">Dominance in pre-war Grand Prix racing</div>
            </div>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6">
              <div className="text-[#00D2BE] font-bold text-2xl mb-2">1954-55</div>
              <div className="text-white font-semibold mb-2">Return to F1</div>
              <div className="text-gray-400 text-sm">Juan Manuel Fangio wins back-to-back titles</div>
            </div>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6">
              <div className="text-[#00D2BE] font-bold text-2xl mb-2">2010-Present</div>
              <div className="text-white font-semibold mb-2">Modern Era</div>
              <div className="text-gray-400 text-sm">Most successful team in F1 history</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
