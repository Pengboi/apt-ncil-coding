import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neo-Pokédex Archives",
  description: "Explore Pokémon base stats and TCG cards in a futuristic digital archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
