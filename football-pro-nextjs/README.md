# Football Pro - Next.js Project

A modern, responsive football lifestyle website built with Next.js, TypeScript, and React.

## Features

- **Hero Section**: Animated hero with statistics counter and smooth scroll
- **Training Tips**: Interactive cards with difficulty levels
- **Healthy Lifestyle**: Nutrition, hydration, sleep & mental wellness guides
- **Product Showcase**: Filterable product grid with category tabs
- **Newsletter**: Email subscription with notification feedback
- **Responsive Design**: Mobile-first approach with hamburger menu

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: CSS Variables + Custom CSS (no external CSS frameworks)
- **Icons**: Font Awesome 6 (via CDN)
- **Font**: Poppins (Google Fonts)

## Project Structure

```
football-pro-nextjs/
├── app/
│   ├── globals.css          # Global styles with CSS variables
│   ├── layout.tsx           # Root layout with fonts & metadata
│   └── page.tsx             # Main page assembling all sections
├── components/
│   ├── sections/            # Page sections
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── TrainingTips.tsx
│   │   ├── Lifestyle.tsx
│   │   ├── Products.tsx
│   │   ├── Newsletter.tsx
│   │   └── Footer.tsx
│   └── ui/                  # UI components
│       ├── Icons.tsx        # Icon wrapper components
│       └── index.ts
├── hooks/
│   └── useNotification.tsx  # Notification context hook
├── next.config.js           # Next.js config for static export
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Installation

```bash
cd football-pro-nextjs
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
```

The static files will be generated in the `dist` folder.

## Key Features Implementation

### Smooth Scroll Navigation
- Clicking nav links smoothly scrolls to sections
- Active section highlighting on scroll
- Mobile hamburger menu with smooth transitions

### Scroll Animations
- Intersection Observer API for triggering animations
- Fade-up, fade-left, fade-right animations on scroll
- Staggered animations with delay support

### Product Filtering
- Category tabs (All, Boots, Gear, Accessories)
- Smooth filtering transitions
- Dynamic star rating display

### Notification System
- React Context for global notifications
- Auto-dismiss after 4 seconds
- Success and info variants

### Counter Animation
- Animated statistics counters in hero section
- Triggered when element comes into view

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
