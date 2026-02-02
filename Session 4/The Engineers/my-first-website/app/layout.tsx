import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'PigeonBot — Your AI Companion 🤖',
  description: 'Meet PigeonBot, the smartest and cutest AI robot companion. Bold design, vibrant personality.',
};

function Header() {
  return (
    <header className="navbar">
      <nav className="navbar-container">
        <Link href="/" className="navbar-brand">
          <span className="navbar-icon">🤖</span>
          <span className="navbar-logo">PigeonBot</span>
        </Link>
        <ul className="navbar-menu">
          <li><Link href="#features" className="nav-link">Features</Link></li>
          <li><Link href="#about" className="nav-link">About</Link></li>
          <li><Link href="#reviews" className="nav-link">Reviews</Link></li>
          <li><Link href="#contact" className="nav-link">Contact</Link></li>
        </ul>
        <Link href="#contact" className="navbar-cta">
          Get Started
        </Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient bg-dots border-t border-pink-500/10 py-12 text-gray-400">
      <div className="container mx-auto grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🤖</span>
            <span className="text-2xl font-bold text-gradient">PigeonBot</span>
          </div>
          <p className="text-sm max-w-sm">The smartest, cutest AI companion robot. Bringing joy and intelligence to your everyday life.</p>
          <div className="flex space-x-3 mt-4">
            <Link href="#" className="social-btn" aria-label="Twitter"><svg viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-.205-..."/></svg></Link>
            <Link href="#" className="social-btn" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="..."/></svg></Link>
            <Link href="#" className="social-btn" aria-label="GitHub"><svg viewBox="0 0 24 24"><path d="..."/></svg></Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Product</h4>
          <ul className="space-y-2">
            <li><Link href="#features" className="footer-link">Features</Link></li>
            <li><Link href="#about" className="footer-link">About</Link></li>
            <li><Link href="#pricing" className="footer-link">Pricing</Link></li>
            <li><Link href="#docs" className="footer-link">Documentation</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="footer-link">About Us</Link></li>
            <li><Link href="#" className="footer-link">Careers</Link></li>
            <li><Link href="#" className="footer-link">Blog</Link></li>
            <li><Link href="#contact" className="footer-link">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t border-pink-500/10 pt-4 flex flex-col md:flex-row justify-between text-sm">
        <p>© {new Date().getFullYear()} PigeonBot. Made with ❤️ at APT Coding Camp</p>
        <div className="flex space-x-4">
          <Link href="#" className="footer-link">Privacy</Link>
          <Link href="#" className="footer-link">Terms</Link>
          <Link href="#" className="footer-link">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className="bg-dark-900 text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
