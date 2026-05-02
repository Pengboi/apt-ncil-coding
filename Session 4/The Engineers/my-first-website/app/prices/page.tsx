import Link from "next/link";

export default function Prices() {
  const cuts = [
    { name: "Side Bangs / Fringe", price: "£25" },
    { name: "Clipper Cut", price: "£25" },
    { name: "Split Ends Trim", price: "£28" },
    { name: "Men's Cut", price: "£30" },
    { name: "Trims", price: "£30" },
    { name: "Pixie Cut", price: "£35" },
    { name: "Children's Cut", price: "£32" },
    { name: "Bob Cut", price: "£38" },
    { name: "Layers", price: "£40" },
    { name: "Textured Cut", price: "£42" },
    { name: "Long Layers", price: "£45" },
    { name: "Restyle / Transformation", price: "£55" },
  ];

  const colours = [
    { name: "Toner / Gloss", price: "£35" },
    { name: "Highlights (T-Section)", price: "£140" },
    { name: "Root Touch Up", price: "£125" },
    { name: "Full Head Colour", price: "£155" },
    { name: "Highlights (Half Head)", price: "£170" },
    { name: "Ombre", price: "£185" },
    { name: "Sombré", price: "£200" },
    { name: "Balayage", price: "£220" },
    { name: "Highlights (Full Head)", price: "£240" },
    { name: "Bleach & Tone", price: "£260" },
    { name: "Fashion Colour", price: "£275+" },
    { name: "Colour Correction", price: "£300+" },
  ];

  const styling = [
    { name: "Wash & Blow Dry", price: "£20" },
    { name: "Blow Dry", price: "£25" },
    { name: "Deep Conditioning", price: "£25" },
    { name: "Straightening", price: "£30" },
    { name: "Hair Mask Treatment", price: "£20" },
    { name: "Curls", price: "£35" },
    { name: "Hot Oil Treatment", price: "£28" },
    { name: "Scalp Treatment", price: "£30" },
  ];

  const special = [
    { name: "Updo", price: "£55" },
    { name: "Prom / Event Hair", price: "£60" },
    { name: "Bridal Party (per person)", price: "£65" },
    { name: "Bridal Hair", price: "£85" },
    { name: "Pin Curls / Vintage", price: "£45" },
    { name: "Braiding", price: "£35+" },
  ];

  const treatments = [
    { name: "Olaplex Treatment", price: "£35" },
    { name: "Perm", price: "£80" },
    { name: "Relaxer", price: "£75" },
    { name: "Hair Botox", price: "£120" },
    { name: "Brazilian Blow Dry", price: "£130" },
    { name: "Keratin Treatment", price: "£150+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FFB6C1] to-[#E6E6FA] p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8 p-4">
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold text-white mb-2 tracking-wider"
            style={{textShadow: '4px 4px 0px #FF69B4, 8px 8px 0px rgba(147, 112, 219, 0.3)'}}>
          HAIR BY JULIETA
        </h1>
        <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-[#2C2C2C]"
           style={{textShadow: '1px 1px 0px rgba(255,255,255,0.8)'}}>
          Complete Price List
        </p>
      </div>

      {/* Price List Container */}
      <div className="max-w-5xl mx-auto bg-white rounded-[30px] shadow-2xl overflow-hidden border-4 border-[#FFB6C1]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FFB6C1] via-[#E6E6FA] to-[#98FF98] p-8 text-center relative overflow-hidden">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)] animate-[rotate_20s_linear_infinite]"></div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-white relative z-10" style={{textShadow: '2px 2px 0px rgba(147,112,219,0.5)'}}>
            Service Menu
          </h2>
        </div>

        <div className="p-6 md:p-12">
          {/* Cuts Section */}
          <div className="mb-10 bg-gradient-to-r from-[rgba(255,182,193,0.1)] to-[rgba(230,230,250,0.1)] rounded-[20px] p-6 border-l-8 border-[#FF69B4] hover:translate-x-2 hover:shadow-lg transition-all">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white bg-gradient-to-r from-[#FF69B4] to-[#9370DB] inline-block px-6 py-3 rounded-[15px] mb-6" style={{textShadow: '2px 2px 0px #FF69B4'}}>
              <span className="text-2xl mr-2">✂️</span> CUTS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cuts.map((service) => (
                <div key={service.name} className="flex justify-between items-center p-4 bg-white rounded-[12px] shadow-sm hover:scale-[1.02] hover:shadow-md transition-all border-2 border-transparent hover:border-[#FFB6C1]">
                  <span className="font-medium text-[#2C2C2C]">{service.name}</span>
                  <span className="font-[family-name:var(--font-playfair)] font-bold text-[#FF69B4] text-xl">{service.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Colour Section */}
          <div className="mb-10 bg-gradient-to-r from-[rgba(255,182,193,0.1)] to-[rgba(230,230,250,0.1)] rounded-[20px] p-6 border-l-8 border-[#9370DB] hover:translate-x-2 hover:shadow-lg transition-all">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white bg-gradient-to-r from-[#FF69B4] to-[#9370DB] inline-block px-6 py-3 rounded-[15px] mb-6" style={{textShadow: '2px 2px 0px #FF69B4'}}>
              <span className="text-2xl mr-2">🎨</span> COLOUR & DYE
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {colours.map((service) => (
                <div key={service.name} className="flex justify-between items-center p-4 bg-white rounded-[12px] shadow-sm hover:scale-[1.02] hover:shadow-md transition-all border-2 border-transparent hover:border-[#FFB6C1]">
                  <span className="font-medium text-[#2C2C2C]">{service.name}</span>
                  <span className="font-[family-name:var(--font-playfair)] font-bold text-[#FF69B4] text-xl">{service.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Styling Section */}
          <div className="mb-10 bg-gradient-to-r from-[rgba(255,182,193,0.1)] to-[rgba(230,230,250,0.1)] rounded-[20px] p-6 border-l-8 border-[#3CB371] hover:translate-x-2 hover:shadow-lg transition-all">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white bg-gradient-to-r from-[#FF69B4] to-[#9370DB] inline-block px-6 py-3 rounded-[15px] mb-6" style={{textShadow: '2px 2px 0px #FF69B4'}}>
              <span className="text-2xl mr-2">💇‍♀️</span> STYLING
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {styling.map((service) => (
                <div key={service.name} className="flex justify-between items-center p-4 bg-white rounded-[12px] shadow-sm hover:scale-[1.02] hover:shadow-md transition-all border-2 border-transparent hover:border-[#FFB6C1]">
                  <span className="font-medium text-[#2C2C2C]">{service.name}</span>
                  <span className="font-[family-name:var(--font-playfair)] font-bold text-[#FF69B4] text-xl">{service.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Occasion Section */}
          <div className="mb-10 bg-gradient-to-r from-[rgba(255,182,193,0.1)] to-[rgba(230,230,250,0.1)] rounded-[20px] p-6 border-l-8 border-[#FF69B4] hover:translate-x-2 hover:shadow-lg transition-all">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white bg-gradient-to-r from-[#FF69B4] to-[#9370DB] inline-block px-6 py-3 rounded-[15px] mb-6" style={{textShadow: '2px 2px 0px #FF69B4'}}>
              <span className="text-2xl mr-2">👰</span> SPECIAL OCCASION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {special.map((service) => (
                <div key={service.name} className="flex justify-between items-center p-4 bg-white rounded-[12px] shadow-sm hover:scale-[1.02] hover:shadow-md transition-all border-2 border-transparent hover:border-[#FFB6C1]">
                  <span className="font-medium text-[#2C2C2C]">{service.name}</span>
                  <span className="font-[family-name:var(--font-playfair)] font-bold text-[#FF69B4] text-xl">{service.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Treatments Section */}
          <div className="mb-10 bg-gradient-to-r from-[rgba(255,182,193,0.1)] to-[rgba(230,230,250,0.1)] rounded-[20px] p-6 border-l-8 border-[#9370DB] hover:translate-x-2 hover:shadow-lg transition-all">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white bg-gradient-to-r from-[#FF69B4] to-[#9370DB] inline-block px-6 py-3 rounded-[15px] mb-6" style={{textShadow: '2px 2px 0px #FF69B4'}}>
              <span className="text-2xl mr-2">✨</span> TREATMENTS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {treatments.map((service) => (
                <div key={service.name} className="flex justify-between items-center p-4 bg-white rounded-[12px] shadow-sm hover:scale-[1.02] hover:shadow-md transition-all border-2 border-transparent hover:border-[#FFB6C1]">
                  <span className="font-medium text-[#2C2C2C]">{service.name}</span>
                  <span className="font-[family-name:var(--font-playfair)] font-bold text-[#FF69B4] text-xl">{service.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Note */}
          <div className="bg-gradient-to-r from-[#FF69B4] to-[#9370DB] text-white p-6 rounded-[15px] text-center mb-8">
            <p className="text-lg font-medium">
              💕 All services include a complimentary consultation to achieve your perfect look! 💕
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-[#E6E6FA] to-[#FFB6C1] p-8 text-center">
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#2C2C2C] mb-4">Get in Touch</h3>
          <p className="text-[#666666] leading-relaxed mb-4">
            📞 Phone: [Your Number]<br/>
            📧 Email: [Your Email]<br/>
            📍 Address: [Your Location]<br/>
            🕒 Open: Mon-Sat 9am-6pm
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF69B4] to-[#9370DB] text-white rounded-full font-semibold shadow-lg hover:translate-y-[-3px] hover:shadow-xl transition-all">
              ← Welcome
            </Link>
            <Link href="/booking" className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF69B4] to-[#9370DB] text-white rounded-full font-semibold shadow-lg hover:translate-y-[-3px] hover:shadow-xl transition-all">
              Book Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
