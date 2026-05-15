import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eternal Flowers | Luxury Forever Flowers Handmade in the UK",
  description: "Handcrafted eternal flowers with sparkling crystals, golden butterflies, and personalised ribbons. Luxury bouquets, letter boxes, heart boxes, and unique flower purses that last for years. Made with love in the United Kingdom.",
  keywords: ["eternal flowers", "forever flowers", "artificial roses", "luxury bouquets", "flower purses", "birthday flowers", "valentines flowers", "UK florist"],
  icons: {
    icon: "/images/eternal_flowers.png",
    apple: "/images/eternal_flowers.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${jost.variable} antialiased bg-[var(--cream)] text-[var(--charcoal)]`}>
        {children}
      </body>
    </html>
  );
}
