import type { Metadata } from "next";
import { Black_Ops_One, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const blackOps = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const techMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-terminal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TACTICAL OPS | CLASSIFIED MISSION",
  description: "OPERATION: SHADOW STRIKE - Classified military brief. Eyes only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${blackOps.variable} ${techMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
