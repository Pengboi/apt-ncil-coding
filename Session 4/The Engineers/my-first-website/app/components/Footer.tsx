import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-gray-900 font-semibold text-xl tracking-wide">Mercedes-Benz</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The best or nothing. Experience luxury, performance, and innovation crafted with over a century of excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-sm tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cars-for-sale" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/models" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  Models
                </Link>
              </li>
              <li>
                <Link href="/f1-history" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  F1 Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Model Series */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-sm tracking-wide uppercase">Model Series</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cars-for-sale" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  C-Class
                </Link>
              </li>
              <li>
                <Link href="/cars-for-sale" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  E-Class
                </Link>
              </li>
              <li>
                <Link href="/cars-for-sale" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  S-Class
                </Link>
              </li>
              <li>
                <Link href="/cars-for-sale" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                  AMG Performance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Mercedes-Benz Fan Website. Not affiliated with Mercedes-Benz AG.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200 text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200 text-sm">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200 text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
