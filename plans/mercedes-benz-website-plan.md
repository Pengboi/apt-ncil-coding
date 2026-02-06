# Mercedes-Benz Website - Architecture Plan

## Project Overview
Create a modern, luxury Mercedes-Benz website with a dark theme featuring:
- Home page with hero section
- F1 History page (Mercedes-AMG Petronas era 2010-present)
- Cars/Models page (C-Class, E-Class, S-Class from 2000s to present)

## Technology Stack
- **Framework**: Next.js 16.1.6 with App Router
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5

## Site Architecture

```
mercedes-benz-website/
├── app/
│   ├── layout.tsx              # Root layout with navigation & footer
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles & theme
│   ├── f1-history/
│   │   └── page.tsx            # F1 history page
│   ├── models/
│   │   └── page.tsx            # Cars/models page
│   └── components/
│       ├── Navigation.tsx      # Header navigation
│       ├── Footer.tsx          # Footer component
│       ├── Hero.tsx            # Home page hero
│       ├── ModelCard.tsx       # Reusable model card
│       ├── F1Timeline.tsx      # F1 timeline component
│       └── ImageGallery.tsx    # Reusable image gallery
└── public/
    └── images/
        ├── f1/                 # F1 car images
        ├── models/             # Car model images
        │   ├── c-class/
        │   ├── e-class/
        │   └── s-class/
        └── logo/               # Mercedes logos
```

## Page Structure

### 1. Home Page (/)
**Sections:**
- Hero section with Mercedes-Benz branding
- Featured Models preview (C, E, S Class)
- F1 History teaser with CTA
- Call-to-action sections

### 2. F1 History Page (/f1-history)
**Sections:**
- Page header with Mercedes-AMG Petronas branding
- Timeline of achievements (2010-present)
  - 2010: Mercedes returns to F1
  - 2014: Start of hybrid era dominance
  - 2014-2020: 7 consecutive constructors' championships
  - Driver championships (Hamilton, Rosberg, etc.)
- Championship statistics
- Driver profiles
- F1 car image gallery

### 3. Models Page (/models)
**Sections:**
- Page header
- C-Class section (W203 2000-2007, W204 2007-2014, W205 2014-2021, W206 2021-present)
- E-Class section (W211 2002-2009, W212 2009-2016, W213 2016-2023, W214 2023-present)
- S-Class section (W220 1998-2005, W221 2005-2013, W222 2013-2020, W223 2020-present)
- Image galleries for each model
- Specifications and features

## Design System

### Color Palette (Dark Theme)
```css
--primary: #00ADEF (Mercedes Blue)
--secondary: #00D2BE (Petronas Teal)
--accent: #ED1C24 (Racing Red)
--background: #0A0A0A (Deep Black)
--surface: #1A1A1A (Dark Gray)
--text-primary: #FFFFFF
--text-secondary: #B0B0B0
--border: #2A2A2A
```

### Typography
- Headings: Inter font, bold weights
- Body: Inter font, regular/medium weights
- Accent text: Uppercase, letter-spacing

### Components
- **Cards**: Dark surface with subtle border, hover lift effect
- **Buttons**: Primary blue with hover brightness, secondary outlined
- **Navigation**: Fixed header with blur backdrop
- **Timeline**: Vertical line with milestone markers
- **Gallery**: Grid layout with hover zoom effect

## Navigation Structure

```
┌─────────────────────────────────────────────────────┐
│  MERCEDES-BENZ    Models    F1 History    Contact   │
└─────────────────────────────────────────────────────┘
```

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Implementation Order

### Phase 1: Foundation
1. Update root layout with Mercedes branding
2. Create Navigation component
3. Create Footer component
4. Update global styles with dark theme

### Phase 2: Home Page
5. Create Hero component
6. Add featured models section
7. Add F1 teaser section

### Phase 3: F1 History Page
8. Create F1 history page structure
9. Implement timeline component
10. Add statistics section
11. Add driver profiles
12. Add image gallery

### Phase 4: Models Page
13. Create models page structure
14. Add C-Class section with gallery
15. Add E-Class section with gallery
16. Add S-Class section with gallery
17. Add specifications for each model

### Phase 5: Polish
18. Add smooth transitions and animations
19. Ensure responsive design
20. Test all navigation and interactions

## Key Features

### Interactive Elements
- Smooth scroll navigation
- Hover effects on cards and buttons
- Image gallery with lightbox
- Timeline animations on scroll
- Mobile hamburger menu

### Performance Considerations
- Next.js Image optimization for all images
- Lazy loading for image galleries
- Minimal JavaScript bundle size
- CSS-in-JS with Tailwind for optimal performance

## Content Requirements

### F1 History Content
- Championship years: 2014, 2015, 2016, 2017, 2018, 2019, 2020
- Drivers: Lewis Hamilton, Nico Rosberg, Valtteri Bottas, George Russell
- Key moments: 2014 return to dominance, 2020 record-breaking season

### Model Content
- C-Class: Compact executive sedan, sporty design
- E-Class: Mid-size luxury sedan, business focus
- S-Class: Full-size luxury flagship, technology leader

## Success Criteria
- All pages load quickly (< 3 seconds)
- Fully responsive on mobile, tablet, and desktop
- Smooth navigation between all pages
- Professional luxury aesthetic matching Mercedes brand
- Accessible with proper semantic HTML
