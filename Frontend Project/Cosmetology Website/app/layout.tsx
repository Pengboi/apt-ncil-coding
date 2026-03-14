import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bella Beauty | Luxury Cosmetology & Spa',
  description: 'Experience luxury cosmetology treatments in a serene, relaxing environment. Hair styling, facials, nails, makeup, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
