import type { Metadata } from "next";
import { Cormorant_Garamond, Sora } from "next/font/google";
import "./globals.css";
import { CartProvider } from './context/CartContext';
import CartIcon from './components/CartIcon';
import Cart from './components/Cart';

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const sora = Sora({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Madridista Zone | Real Madrid Fan Hub",
  description: "The ultimate destination for Real Madrid fans. News, squad info, fixtures, and merchandise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className} style={{ background: 'var(--bg-primary)' }}>
        <CartProvider>
          {/* Navigation Header - Authentic Real Madrid */}
          <header className="w-full py-4 sticky top-0 z-40" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
              {/* Logo */}
              <a href="/" className="flex items-center gap-3 group">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Crown - Real Madrid Gold */}
                    <path 
                      d="M50 5 L60 25 L75 15 L70 35 L90 30 L80 50 L95 70 L70 65 L75 90 L50 80 L25 90 L30 65 L5 70 L20 50 L10 30 L30 35 L25 15 L40 25 Z" 
                      fill="#D4AF37"
                      className="drop-shadow-lg"
                    />
                    {/* Cross - White */}
                    <rect x="45" y="30" width="10" height="25" fill="white"/>
                    <rect x="37" y="38" width="26" height="10" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Madridista Zone
                  </h1>
                  <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Est. 1902</p>
                </div>
              </a>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                <a href="/" className="nav-link">Home</a>
                <a href="/squad" className="nav-link">Squad</a>
                <a href="/#fixtures" className="nav-link">Fixtures</a>
                <a href="/#merch" className="nav-link">Shop</a>
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2">
                <CartIcon />
                
                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 transition-colors" style={{ color: 'var(--text-primary)' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Cart Sidebar */}
          <Cart />

          {/* Page Content */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
