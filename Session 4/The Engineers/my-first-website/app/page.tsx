import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FFB6C1] to-[#E6E6FA] flex flex-col justify-center items-center text-center p-8 relative overflow-hidden">
      {/* Floating Shapes */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-20 h-20 rounded-full bg-[#FFB6C1] opacity-60 top-[20%] left-[10%] animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute w-16 h-16 rounded-full bg-[#E6E6FA] opacity-60 top-[60%] right-[15%] animate-[float_8s_ease-in-out_infinite_2s]"></div>
        <div className="absolute w-24 h-24 rounded-full bg-[#98FF98] opacity-60 bottom-[20%] left-[20%] animate-[float_8s_ease-in-out_infinite_4s]"></div>
        <div className="absolute w-12 h-12 rounded-full bg-[#FF69B4] opacity-60 top-[40%] right-[25%] animate-[float_8s_ease-in-out_infinite_1s]"></div>
        <div className="absolute w-16 h-16 rounded-full bg-[#FFDAB9] opacity-60 bottom-[40%] right-[10%] animate-[float_8s_ease-in-out_infinite_3s]"></div>
      </div>

      {/* Welcome Content */}
      <div className="relative z-10 max-w-3xl animate-[fadeInUp_1s_ease-out]">
        <div className="inline-block bg-gradient-to-r from-[#FF69B4] to-[#9370DB] text-white px-8 py-3 rounded-full font-semibold text-lg mb-8 shadow-lg animate-[bounce_2s_infinite]">
          ✨ Welcome ✨
        </div>

        <h1 className="font-[family-name:var(--font-playfair)] text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider leading-tight"
            style={{textShadow: '5px 5px 0px #FF69B4, 10px 10px 0px rgba(147, 112, 219, 0.3), 15px 15px 30px rgba(0,0,0,0.1)'}}>
          HAIR BY<br/>JULIETA
        </h1>

        <p className="font-[family-name:var(--font-playfair)] text-2xl md:text-4xl text-[#FF69B4] mb-6"
           style={{textShadow: '2px 2px 0px rgba(255,255,255,0.8)'}}>
          Where Your Beauty Journey Begins
        </p>

        <p className="text-lg md:text-xl text-[#2C2C2C] max-w-2xl mx-auto mb-12 leading-relaxed animate-[fadeInUp_1s_ease-out_0.4s_both]">
          Welcome to Hair by Julieta! This is your one-stop destination for all things hair. 
          Whether you're looking for a fresh trim, stunning highlights, or a complete transformation, 
          you've come to the right place. Browse our complete service menu and book your appointment 
          today to experience the magic of professional hair styling!
        </p>

        {/* Introduction Section */}
        <div className="bg-white rounded-[30px] shadow-xl p-8 md:p-12 mt-8 animate-[fadeInUp_1s_ease-out_0.6s_both]">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#FF69B4] mb-8"
              style={{textShadow: '2px 2px 0px rgba(255,255,255,0.8)'}}>
            What We Offer 💕
          </h2>

          <p className="text-base md:text-lg text-[#2C2C2C] leading-relaxed mb-8">
            At Hair by Julieta, we specialize in creating beautiful, confidence-boosting hairstyles 
            tailored just for you. From classic cuts to the latest colour trends, our comprehensive 
            range of services covers everything you need to look and feel your best. Explore our 
            service categories below and discover how we can help you achieve your dream hair!
          </p>

          {/* Services Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-[rgba(255,182,193,0.2)] to-[rgba(230,230,250,0.2)] p-6 rounded-[20px] text-left border-l-8 border-[#FF69B4] hover:translate-y-[-5px] hover:shadow-lg transition-all">
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#2C2C2C] mb-3 flex items-center gap-2">
                ✂️ Cuts & Styles
              </h3>
              <ul className="text-sm text-[#666666] list-none space-y-2">
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Trims & Maintenance - £30</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Layers & Textured Cuts - £40</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Bobs & Pixie Cuts - £35-38</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Side Bangs & Fringes - £25</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Complete Restyles - £55</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Men's & Children's Cuts - £30</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[rgba(255,182,193,0.2)] to-[rgba(230,230,250,0.2)] p-6 rounded-[20px] text-left border-l-8 border-[#9370DB] hover:translate-y-[-5px] hover:shadow-lg transition-all">
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#2C2C2C] mb-3 flex items-center gap-2">
                🎨 Colour & Dye
              </h3>
              <ul className="text-sm text-[#666666] list-none space-y-2">
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Toner / Gloss - £35</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Root Touch-ups - £125</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Highlights - £140-240</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Full Head Colour - £155</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Balayage & Ombre - £185-220</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Fashion Colours - £275+</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[rgba(255,182,193,0.2)] to-[rgba(230,230,250,0.2)] p-6 rounded-[20px] text-left border-l-8 border-[#3CB371] hover:translate-y-[-5px] hover:shadow-lg transition-all">
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#2C2C2C] mb-3 flex items-center gap-2">
                💇‍♀️ Styling & Care
              </h3>
              <ul className="text-sm text-[#666666] list-none space-y-2">
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Blow Dries & Curls - £25-35</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Straightening - £30</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Wash & Style - £20</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Deep Conditioning - £25</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Hair Treatments - £20-35</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Scalp Treatments - £30</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[rgba(255,182,193,0.2)] to-[rgba(230,230,250,0.2)] p-6 rounded-[20px] text-left border-l-8 border-[#FF69B4] hover:translate-y-[-5px] hover:shadow-lg transition-all">
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#2C2C2C] mb-3 flex items-center gap-2">
                👰 Special Occasions
              </h3>
              <ul className="text-sm text-[#666666] list-none space-y-2">
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Bridal Hair - £85</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Wedding Party Styling - £65</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Prom & Event Hair - £60</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Elegant Updos - £55</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Vintage Styles - £45</li>
                <li className="pl-4 relative before:content-['✨'] before:absolute before:left-0">Braiding Services - £35+</li>
              </ul>
            </div>
          </div>

          {/* Button Group */}
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/booking" className="inline-block px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-[#FF69B4] to-[#9370DB] text-white shadow-lg hover:translate-y-[-5px] hover:shadow-xl transition-all">
              ✨ Book Your Appointment
            </Link>
            <Link href="/events" className="inline-block px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-[#9370DB] to-[#3CB371] text-white shadow-lg hover:translate-y-[-5px] hover:shadow-xl transition-all border-2 border-[#9370DB]">
              🎉 Book Events & Parties
            </Link>
            <Link href="/prices" className="inline-block px-8 py-4 rounded-full font-semibold text-lg bg-white text-[#FF69B4] shadow-lg hover:translate-y-[-5px] hover:shadow-xl transition-all border-2 border-[#FF69B4] hover:bg-[#FF69B4] hover:text-white">
              📋 View Full Price List
            </Link>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="flex flex-wrap gap-6 justify-center mt-12 p-8">
        <div className="text-center text-[#2C2C2C] bg-white p-6 rounded-[15px] shadow-md min-w-[120px] hover:translate-y-[-5px] hover:shadow-lg transition-all">
          <div className="text-4xl mb-2">✂️</div>
          <div className="text-sm font-semibold">Expert Cuts</div>
        </div>
        <div className="text-center text-[#2C2C2C] bg-white p-6 rounded-[15px] shadow-md min-w-[120px] hover:translate-y-[-5px] hover:shadow-lg transition-all">
          <div className="text-4xl mb-2">🎨</div>
          <div className="text-sm font-semibold">Beautiful Colours</div>
        </div>
        <div className="text-center text-[#2C2C2C] bg-white p-6 rounded-[15px] shadow-md min-w-[120px] hover:translate-y-[-5px] hover:shadow-lg transition-all">
          <div className="text-4xl mb-2">💇‍♀️</div>
          <div className="text-sm font-semibold">Styling</div>
        </div>
        <div className="text-center text-[#2C2C2C] bg-white p-6 rounded-[15px] shadow-md min-w-[120px] hover:translate-y-[-5px] hover:shadow-lg transition-all">
          <div className="text-4xl mb-2">👰</div>
          <div className="text-sm font-semibold">Bridal</div>
        </div>
        <div className="text-center text-[#2C2C2C] bg-white p-6 rounded-[15px] shadow-md min-w-[120px] hover:translate-y-[-5px] hover:shadow-lg transition-all">
          <div className="text-4xl mb-2">✨</div>
          <div className="text-sm font-semibold">Treatments</div>
        </div>
      </div>
    </div>
  );
}
