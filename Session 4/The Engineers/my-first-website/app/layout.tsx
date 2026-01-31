import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My First Website",
  description: "Built at APT Coding Camp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-full py-6 backdrop-blur-sm bg-black/20 border-b border-pink-500/20">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <a className="text-2xl font-bold tracking-tight bg-gradient-to-r from-pink-300 to-pink-100 bg-clip-text text-transparent" href="#">✨ PigeonBot</a>
            <nav className="flex items-center gap-4">
              <a className="text-sm text-pink-200 hover:text-pink-100 transition-colors" href="#features">Features</a>
              <a className="text-sm text-pink-200 hover:text-pink-100 transition-colors" href="#pricing">Pricing</a>
              <a className="text-sm text-pink-200 hover:text-pink-100 transition-colors" href="#contact">Contact</a>
              <a className="px-5 py-2 rounded-full btn-accent text-sm ml-2" href="#">Build Now 💖</a>
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className="mt-20 py-10 border-t border-pink-500/20 bg-gradient-to-br from-pink-900/5 to-purple-900/5">
          <div className="max-w-6xl mx-auto px-4 text-sm text-pink-200 text-center">© {new Date().getFullYear()} PigeonBot — Built with Next.js 💕 Made with love at APT Coding Camp</div>
        </footer>
      </body>
    </html>
  );
}
