import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"]
});

const poppins = Poppins({ 
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Hair by Julieta - Professional Hair Styling Services",
  description: "Transform your look with expert hair cuts, colouring, styling, and special occasion services. Book your appointment today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} font-[family-name:var(--font-poppins)]`}>
        {children}
      </body>
    </html>
  );
}
