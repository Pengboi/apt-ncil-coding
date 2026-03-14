# Bella Beauty - Cosmetology Website

A beautiful, modern cosmetology website built with Next.js 14, React, and TypeScript.

## 🌸 Features

- **Hero Section** - Stunning landing with animated stats
- **Services** - 6 service cards with hover effects and filtering
- **About** - Company story with image placeholders
- **Gallery** - Filterable portfolio showcase
- **Testimonials** - Auto-rotating client reviews slider
- **Booking Form** - Functional appointment booking with modal
- **Contact** - Contact information cards
- **Footer** - Newsletter signup and social links

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project folder:
```bash
cd "Frontend Project/Cosmetology Website"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The static files will be generated in the `dist` folder.

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS Modules** - Scoped component styling
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
├── app/
│   ├── globals.css       # Global styles & CSS variables
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── Navbar.tsx        # Fixed navigation
│   ├── Hero.tsx          # Hero section
│   ├── Services.tsx      # Services grid
│   ├── About.tsx         # About section
│   ├── Gallery.tsx       # Portfolio gallery
│   ├── Testimonials.tsx  # Client reviews
│   ├── Booking.tsx       # Booking form
│   ├── Contact.tsx       # Contact cards
│   ├── Footer.tsx        # Footer
│   └── index.ts          # Component exports
├── public/               # Static assets
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🎨 Design

- **Primary Color:** Golden brown (#d4a574)
- **Font:** Playfair Display (headings) + Poppins (body)
- **Responsive:** Mobile-first design

---

Made with 💖 for APT Coding Camp
