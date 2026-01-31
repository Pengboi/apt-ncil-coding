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
        <header className="w-full py-6">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <a className="text-xl font-bold tracking-tight" href="#">PigeonBot</a>
            <nav className="flex items-center gap-3">
              <a className="text-sm muted hover:underline" href="#features">Features</a>
              <a className="text-sm muted hover:underline" href="#pricing">Pricing</a>
              <a className="text-sm muted hover:underline" href="#contact">Contact</a>
              <a className="px-4 py-2 rounded-full btn-accent text-sm ml-2" href="#">Build Now</a>
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className="mt-20 py-10">
          <div className="max-w-6xl mx-auto px-4 text-sm muted">© {new Date().getFullYear()} PigeonBot — Built with Next.js</div>
        </footer>
      </body>
    </html>
  );
}
