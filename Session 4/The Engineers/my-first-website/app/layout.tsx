import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mercedes-Benz | The Best or Nothing",
  description: "Explore Mercedes-Benz luxury vehicles, from the C-Class to the S-Class, and discover the rich Formula 1 history of Mercedes-AMG Petronas.",
  keywords: "Mercedes-Benz, luxury cars, F1, Formula 1, Mercedes-AMG, C-Class, E-Class, S-Class",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
