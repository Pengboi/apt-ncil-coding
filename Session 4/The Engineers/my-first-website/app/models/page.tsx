export default function Models() {
  const cClassGenerations = [
    {
      name: 'W203 (2000-2007)',
      description: 'The third-generation C-Class introduced a more rounded design and improved technology. Available as sedan, wagon, and coupe body styles.',
      features: ['Semi-automatic climate control', 'COMAND infotainment system', '7G-TRONIC automatic transmission', '4MATIC all-wheel drive option'],
      engines: ['2.0L - 3.5L petrol engines', '2.0L - 3.0L diesel engines', 'AMG V8 variants available'],
    },
    {
      name: 'W204 (2007-2014)',
      description: 'A more aggressive design with sharper lines. Introduced BlueTEC diesel technology and the C63 AMG with its legendary 6.2L V8.',
      features: ['Attention Assist system', 'PRE-SAFE safety system', 'Harman Kardon sound system', 'LED daytime running lights'],
      engines: ['1.8L - 3.5L petrol engines', '2.1L - 3.0L diesel engines', 'C63 AMG 6.2L V8'],
    },
    {
      name: 'W205 (2014-2021)',
      description: 'Revolutionary design with diamond grille and advanced technology. Introduced the C-Class Coupe and Cabriolet variants.',
      features: ['MBUX infotainment system', 'Wireless smartphone integration', 'Driver assistance packages', 'Air Body Control suspension'],
      engines: ['1.5L - 3.0L petrol engines', '2.0L - 3.0L diesel engines', 'AMG 2.0L turbo and 4.0L V8'],
    },
    {
      name: 'W206 (2021-Present)',
      description: 'The latest generation features a more digital cockpit, plug-in hybrid options, and enhanced autonomous driving capabilities.',
      features: ['Hyperscreen digital display', 'Level 2 autonomous driving', 'Plug-in hybrid variants', 'Augmented reality navigation'],
      engines: ['1.5L - 2.0L petrol engines', '2.0L diesel engines', 'AMG performance hybrid'],
    },
  ];

  const eClassGenerations = [
    {
      name: 'W211 (2002-2009)',
      description: 'Elegant design with quad headlights. Known for exceptional build quality and introduced air suspension to the E-Class.',
      features: ['AIRMATIC air suspension', '4MATIC all-wheel drive', 'COMAND APS navigation', 'Bi-xeon headlamps'],
      engines: ['2.0L - 5.0L petrol engines', '2.2L - 3.2L diesel engines', 'E55 AMG and E63 AMG variants'],
    },
    {
      name: 'W212 (2009-2016)',
      description: 'Distinctive design with squared-off headlights. Introduced Direct Injection engines and the E63 AMG Bi-Turbo.',
      features: ['Attention Assist', 'Night View Assist', 'DISTRONIC PLUS cruise control', 'PRE-SAFE brake'],
      engines: ['1.8L - 3.5L petrol engines', '2.1L - 3.0L diesel engines', 'E63 AMG 5.5L Bi-Turbo V8'],
    },
    {
      name: 'W213 (2016-2023)',
      description: 'Sleek design with MULTIBEAM LED headlights. Introduced E-Class All-Terrain and plug-in hybrid variants.',
      features: ['MBUX with voice control', 'Car-to-X communication', 'Remote Parking Assist', 'ENERGIZING comfort control'],
      engines: ['2.0L - 3.0L petrol engines', '2.0L - 3.0L diesel engines', 'E63 AMG 4.0L Bi-Turbo V8'],
    },
    {
      name: 'W214 (2023-Present)',
      description: 'The latest E-Class features Superscreen dashboard, enhanced hybrid technology, and Level 3 autonomous driving capability.',
      features: ['Superscreen digital cockpit', 'Level 3 autonomous driving', 'Advanced plug-in hybrid system', 'AI-powered voice assistant'],
      engines: ['2.0L petrol engines', '2.0L diesel engines', 'AMG E-Performance hybrids'],
    },
  ];

  const sClassGenerations = [
    {
      name: 'W220 (1998-2005)',
      description: 'Revolutionary design with rounded body and innovative technology. Introduced COMAND system and Active Body Control.',
      features: ['COMAND infotainment', 'Active Body Control suspension', 'Keyless Go', 'Dynamic seat ventilation'],
      engines: ['2.8L - 5.5L petrol engines', '3.2L - 4.0L diesel engines', 'S55 and S600 AMG variants'],
    },
    {
      name: 'W221 (2005-2013)',
      description: 'Classic elegance with powerful presence. Introduced Night View Assist, PRE-SAFE, and the first hybrid S-Class.',
      features: ['Night View Assist', 'PRE-SAFE system', 'SPLITVIEW display', 'Magic Body Control'],
      engines: ['3.0L - 6.0L petrol engines', '3.0L - 4.0L diesel engines', 'S63 and S65 AMG variants'],
    },
    {
      name: 'W222 (2013-2020)',
      description: 'The pinnacle of luxury with stunning interior design. Introduced ENERGIZING comfort and autonomous driving features.',
      features: ['ENERGIZING comfort control', 'Remote Parking Pilot', 'Car-to-X communication', 'Burmester 3D sound system'],
      engines: ['3.0L - 6.0L petrol engines', '2.9L - 4.0L diesel engines', 'S63 and S65 AMG variants'],
    },
    {
      name: 'W223 (2020-Present)',
      description: 'The flagship of innovation with Hyperscreen, Level 3 autonomous driving, and revolutionary rear-seat entertainment.',
      features: ['Hyperscreen digital display', 'Level 3 autonomous driving', 'Rear-seat airbags', 'E-ACTIVE BODY CONTROL'],
      engines: ['3.0L - 4.0L petrol engines', '3.0L diesel engines', 'S63 AMG E-Performance'],
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-[#00ADEF]/10 border border-[#00ADEF] rounded-full mb-6">
            <span className="text-[#00ADEF] font-semibold text-sm">VEHICLES</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Mercedes-Benz Models
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            From the 2000s to Today
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Explore the evolution of Mercedes-Benz luxury vehicles, from the sporty C-Class to the flagship S-Class, 
            spanning over two decades of automotive excellence.
          </p>
        </div>
      </section>

      {/* C-Class Section */}
      <section id="c-class" className="py-16 px-4 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[#00ADEF] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-4xl">C</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              C-Class
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The compact executive sedan that combines sporty performance with everyday practicality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cClassGenerations.map((gen, index) => (
              <div key={index} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#00ADEF] transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-[#00ADEF]/20 to-[#00ADEF]/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#00ADEF] rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-3xl">C</span>
                    </div>
                    <p className="text-[#00ADEF] font-semibold">{gen.name}</p>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{gen.name}</h3>
                  <p className="text-gray-400 mb-6">{gen.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {gen.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-500 text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#00ADEF] rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Engine Options</h4>
                    <ul className="space-y-1">
                      {gen.engines.map((engine, idx) => (
                        <li key={idx} className="text-gray-500 text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#00ADEF] rounded-full mr-2"></span>
                          {engine}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E-Class Section */}
      <section id="e-class" className="py-16 px-4 bg-gradient-to-r from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[#00ADEF] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-4xl">E</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              E-Class
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The mid-size luxury sedan perfect for business executives and comfort-seeking drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eClassGenerations.map((gen, index) => (
              <div key={index} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#00ADEF] transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-[#00ADEF]/20 to-[#00ADEF]/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#00ADEF] rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-3xl">E</span>
                    </div>
                    <p className="text-[#00ADEF] font-semibold">{gen.name}</p>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{gen.name}</h3>
                  <p className="text-gray-400 mb-6">{gen.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {gen.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-500 text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#00ADEF] rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Engine Options</h4>
                    <ul className="space-y-1">
                      {gen.engines.map((engine, idx) => (
                        <li key={idx} className="text-gray-500 text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#00ADEF] rounded-full mr-2"></span>
                          {engine}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S-Class Section */}
      <section id="s-class" className="py-16 px-4 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[#00ADEF] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-4xl">S</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              S-Class
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The flagship luxury sedan that defines automotive excellence and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sClassGenerations.map((gen, index) => (
              <div key={index} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#00ADEF] transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-[#00ADEF]/20 to-[#00ADEF]/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#00ADEF] rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-3xl">S</span>
                    </div>
                    <p className="text-[#00ADEF] font-semibold">{gen.name}</p>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{gen.name}</h3>
                  <p className="text-gray-400 mb-6">{gen.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {gen.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-500 text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#00ADEF] rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Engine Options</h4>
                    <ul className="space-y-1">
                      {gen.engines.map((engine, idx) => (
                        <li key={idx} className="text-gray-500 text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#00ADEF] rounded-full mr-2"></span>
                          {engine}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Model Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="px-6 py-4 text-left text-white font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center text-[#00ADEF] font-semibold">C-Class</th>
                  <th className="px-6 py-4 text-center text-[#00ADEF] font-semibold">E-Class</th>
                  <th className="px-6 py-4 text-center text-[#00ADEF] font-semibold">S-Class</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#2A2A2A]">
                  <td className="px-6 py-4 text-gray-400">Position</td>
                  <td className="px-6 py-4 text-center text-white">Compact Executive</td>
                  <td className="px-6 py-4 text-center text-white">Mid-Size Luxury</td>
                  <td className="px-6 py-4 text-center text-white">Full-Size Luxury</td>
                </tr>
                <tr className="border-b border-[#2A2A2A]">
                  <td className="px-6 py-4 text-gray-400">Best For</td>
                  <td className="px-6 py-4 text-center text-white">Sporty driving, daily use</td>
                  <td className="px-6 py-4 text-center text-white">Business, comfort, luxury</td>
                  <td className="px-6 py-4 text-center text-white">Ultimate luxury, innovation</td>
                </tr>
                <tr className="border-b border-[#2A2A2A]">
                  <td className="px-6 py-4 text-gray-400">Starting Price</td>
                  <td className="px-6 py-4 text-center text-white">$$</td>
                  <td className="px-6 py-4 text-center text-white">$$$</td>
                  <td className="px-6 py-4 text-center text-white">$$$$</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-400">Technology</td>
                  <td className="px-6 py-4 text-center text-white">MBUX, Driver Assist</td>
                  <td className="px-6 py-4 text-center text-white">MBUX, Level 3 Autonomy</td>
                  <td className="px-6 py-4 text-center text-white">Hyperscreen, Level 3 Autonomy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}