import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real Madrid Fan Zone",
  description: "A Real Madrid themed fan page built at APT Coding Camp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-full py-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-10 border-b-2 border-yellow-500">
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/rm-shield.svg" alt="Real Madrid" className="w-10 h-10" />
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Madridista Zone</h1>
            </div>
            <nav className="hidden sm:flex items-center gap-2">
              <a href="#about" className="text-sm">About</a>
              <a href="/squad" className="text-sm">Squad</a>
              <a href="#fixtures" className="text-sm">Fixtures</a>
              <a href="#merch" className="text-sm">Merch</a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
