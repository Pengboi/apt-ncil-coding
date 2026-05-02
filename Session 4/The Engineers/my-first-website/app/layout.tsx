import type { Metadata } from "next";
import { Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({ 
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["400"]
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
      <body className={`${greatVibes.variable} ${poppins.variable} font-[family-name:var(--font-poppins)]`}>
        {children}
      </body>
    </html>
  );
}
