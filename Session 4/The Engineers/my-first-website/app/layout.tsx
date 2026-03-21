import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mercedes-Benz | The Best or Nothing",
  description: "Experience luxury, performance, and innovation. Explore Mercedes-Benz luxury vehicles, from the C-Class to the S-Class, and discover the rich Formula 1 history of Mercedes-AMG Petronas.",
  keywords: "Mercedes-Benz, luxury cars, F1, Formula 1, Mercedes-AMG, C-Class, E-Class, S-Class, automotive excellence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased bg-white text-gray-900`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
