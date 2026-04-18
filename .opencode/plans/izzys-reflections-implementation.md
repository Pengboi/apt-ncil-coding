# Izzy's Reflections Website - Implementation Plan

## Project Overview
E-commerce website for Izzy's Reflections - a press printing business offering custom-printed shirts, hats, and mugs, plus 360 camera booth hire for events.

## Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API

## Project Structure

```
izzys-reflections/my-app/
├── src/
│   └── app/
│       ├── components/
│       │   ├── Header.tsx
│       │   ├── Footer.tsx
│       │   ├── Navigation.tsx
│       │   ├── CartSidebar.tsx
│       │   ├── ProductCard.tsx
│       │   ├── ProductGallery.tsx
│       │   └── MobileMenu.tsx
│       ├── contexts/
│       │   └── CartContext.tsx
│       ├── data/
│       │   ├── products.ts
│       │   └── cameraPackages.ts
│       ├── types/
│       │   └── index.ts
│       ├── utils/
│       │   └── helpers.ts
│       ├── page.tsx (Home)
│       ├── layout.tsx
│       ├── globals.css
│       ├── about/
│       │   └── page.tsx
│       ├── contact/
│       │   └── page.tsx
│       ├── shop/
│       │   └── page.tsx
│       ├── products/
│       │   └── [id]/
│       │       └── page.tsx
│       ├── custom-order/
│       │   └── page.tsx
│       ├── camera-booth/
│       │   └── page.tsx
│       ├── services/
│       │   └── page.tsx
│       ├── cart/
│       │   └── page.tsx
│       └── checkout/
│           └── page.tsx
```

## File-by-File Implementation Details

### 1. Types (`src/app/types/index.ts`)

**Product Interface:**
```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'shirts' | 'hats' | 'mugs';
  images: string[];
  sizes?: string[];
  colors?: string[];
  customizationOptions?: {
    allowText: boolean;
    allowImage: boolean;
  };
  featured?: boolean;
}
```

**CartItem Interface:**
```typescript
export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
  customText?: string;
  customImage?: string;
}
```

**CameraBoothPackage Interface:**
```typescript
export interface CameraBoothPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}
```

### 2. Product Data (`src/app/data/products.ts`)

**Sample Products:**

**Shirts (4 items):**
1. Classic T-Shirt - $25
2. Premium Hoodie - $45
3. Long Sleeve Tee - $30
4. Polo Shirt - $35

**Hats (4 items):**
1. Snapback Cap - $28
2. Beanie - $22
3. Trucker Hat - $26
4. Dad Hat - $24

**Mugs (4 items):**
1. Ceramic Mug 11oz - $18
2. Travel Mug - $25
3. Large Mug 15oz - $22
4. Color Changing Mug - $28

Each product includes placeholder image URLs, size options, color variants, and customization flags.

### 3. Camera Booth Packages (`src/app/data/cameraPackages.ts`)

**3 Packages:**
1. **Basic Package** - $299 (2 hours)
   - 360° camera booth setup
   - Props included
   - 50+ videos
   - Basic sharing station

2. **Premium Package** - $499 (4 hours) [POPULAR]
   - Everything in Basic
   - 100+ videos
   - Custom branded overlay
   - Premium props
   - Extended sharing options

3. **Deluxe Package** - $799 (6 hours)
   - Everything in Premium
   - Unlimited videos
   - Custom music
   - Professional attendant
   - USB drive with all videos

### 4. Cart Context (`src/app/contexts/CartContext.tsx`)

**State:**
- items: CartItem[]
- isOpen: boolean

**Actions:**
- addToCart(item: CartItem)
- removeFromCart(productId: string)
- updateQuantity(productId: string, quantity: number)
- toggleCart()
- clearCart()
- totalItems: number
- totalPrice: number

**Features:**
- Persist cart to localStorage
- Calculate totals automatically
- Handle item merging (same product/size/color)

### 5. Layout Components

**Header Component:**
- Logo "Izzy's Reflections" with reflective mirror icon
- Navigation with dropdown for Services
- Cart icon with item count badge
- Mobile hamburger menu button
- Sticky positioning

**Navigation Dropdown (Desktop):**
- Services → Shop | 360 Camera Booth
- Direct links: About | Contact

**Mobile Menu:**
- Full screen overlay
- Accordion for Services section
- Close button (X icon)

**Footer Component:**
- 4 columns: Logo/About, Quick Links, Services, Contact
- Social media icons (Facebook, Instagram, Twitter)
- Copyright text
- Newsletter signup form

**Cart Sidebar:**
- Slide-in from right
- List of cart items with images
- Quantity controls (+/- buttons)
- Remove item button (trash icon)
- Subtotal display
- Checkout button
- Continue shopping link

### 6. Product Components

**ProductCard Component:**
- Image with hover zoom effect
- Product name
- Price
- Quick "Add to Cart" button
- Link to product detail page

**ProductGallery Component:**
- Filter tabs: All | Shirts | Hats | Mugs
- Grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Category filter buttons with icons
- ProductCard components mapped from data

### 7. Pages

**Home Page (`/`):**
- Hero section with background image
  - Headline: "Custom Prints & 360° Memories"
  - Subtext: "Premium printing on shirts, hats, and mugs. Plus unforgettable 360° camera booth experiences."
  - Two CTAs: "Shop Now" | "Book Camera Booth"
  
- Featured Products section
  - Grid of 6 featured items
  - "View All Products" button
  
- Services Overview section
  - Two cards side by side
  - Left: Custom Printing (icon + description + CTA)
  - Right: 360 Camera Booth (icon + description + CTA)
  
- How It Works section (3 steps)
  1. Choose Your Product
  2. Upload Your Design
  3. We Handle the Rest
  
- Testimonials section (3 testimonials with avatars)

**Shop Page (`/shop`):**
- Page title: "Our Products"
- Category filter tabs
- ProductGallery component
- Sort dropdown (Price: Low to High, Price: High to Low, Featured)

**Product Detail Page (`/products/[id]`):**
- Large product image gallery (main image + thumbnails)
- Product name and price
- Description
- Size selector (if applicable)
- Color selector (if applicable)
- Customization section:
  - Text input for custom text
  - File upload area for custom images
  - Preview mockup
- Quantity selector
- "Add to Cart" button
- Related products section

**Custom Order Page (`/custom-order`):**
- Page title: "Custom Order Request"
- Intro text explaining the process
- Form fields:
  - Name (required)
  - Email (required)
  - Phone (required)
  - Product Type dropdown (required)
  - Quantity (number input)
  - Description textarea (required)
  - File upload (drag & drop or click)
  - Deadline date picker (optional)
- Submit button
- Success message on submit

**360 Camera Booth Page (`/camera-booth`):**
- Hero with video demo placeholder
- Page title: "360° Camera Booth Hire"
- "How It Works" section with 3 steps
- Package cards (3 tiers)
  - Price prominently displayed
  - Duration
  - Feature list with checkmarks
  - "Most Popular" badge on middle tier
  - "Book Now" button on each
- Gallery section (placeholder for event photos)
- FAQs accordion
- Booking form at bottom
  - Event details
  - Package selection
  - Contact info

**Services Page (`/services`):**
- Page title: "Our Services"
- Two main service cards:
  1. Custom Printing Services
     - Description
     - Process steps
     - CTA to shop
  2. 360 Camera Booth
     - Description
     - Event types list
     - CTA to camera booth page

**About Page (`/about`):**
- Page title: "About Izzy's Reflections"
- Business story section
- Mission statement
- Team section (placeholder for team photos)
- Values section (3 value cards)

**Contact Page (`/contact`):**
- Page title: "Get In Touch"
- Contact form:
  - Name, Email, Subject, Message
- Business info sidebar:
  - Address
  - Phone
  - Email
  - Hours
- Embedded map placeholder

**Cart Page (`/cart`):**
- Page title: "Your Cart"
- Cart items table/list
- Quantity controls
- Remove buttons
- Order summary sidebar:
  - Subtotal
  - Estimated shipping
  - Total
  - Checkout button
- "Continue Shopping" link
- Empty cart state with illustration

**Checkout Page (`/checkout`):**
- Page title: "Checkout"
- Two-column layout:
  - Left: Shipping form
    - Contact info
    - Shipping address
    - Shipping method selection
  - Right: Order summary
    - Cart items (read-only)
    - Promo code input
    - Totals breakdown
    - Pay button (placeholder for Stripe integration)

## Design System

### Colors
- Primary: `#1e40af` (Blue-800) - Main brand color
- Primary Light: `#3b82f6` (Blue-500) - Hover states
- Secondary: `#f59e0b` (Amber-500) - Accent/CTAs
- Background: `#ffffff` (White)
- Text Primary: `#111827` (Gray-900)
- Text Secondary: `#6b7280` (Gray-500)
- Border: `#e5e7eb` (Gray-200)
- Success: `#10b981` (Green-500)
- Error: `#ef4444` (Red-500)

### Typography
- Font Family: Inter (system default sans-serif)
- Heading 1: 3rem (48px), font-bold
- Heading 2: 2.25rem (36px), font-bold
- Heading 3: 1.5rem (24px), font-semibold
- Body: 1rem (16px), font-normal
- Small: 0.875rem (14px)

### Spacing
- Page padding: px-4 sm:px-6 lg:px-8
- Section spacing: py-16 to py-24
- Component gaps: gap-4 to gap-8
- Card padding: p-6

### Components
- Buttons:
  - Primary: bg-blue-600 text-white hover:bg-blue-700
  - Secondary: bg-amber-500 text-white hover:bg-amber-600
  - Outline: border-2 border-blue-600 text-blue-600
  - Sizes: sm (px-3 py-1.5), md (px-4 py-2), lg (px-6 py-3)

- Cards:
  - Background: white
  - Border: 1px solid gray-200
  - Border radius: rounded-lg
  - Shadow: shadow-sm to shadow-md
  - Hover: shadow-lg transition

- Forms:
  - Input: border-gray-300 rounded-md focus:ring-blue-500
  - Label: text-sm font-medium text-gray-700
  - Error: text-red-500 text-sm

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Animation & Interactions
- Page transitions: fade in
- Card hover: scale(1.02) with shadow increase
- Button hover: background color darken
- Cart sidebar: slide in from right (300ms ease-out)
- Mobile menu: slide in from left
- Image gallery: crossfade between images

## SEO Considerations
- Meta title template: "{page} | Izzy's Reflections"
- Meta descriptions for each page
- Structured data for products
- Alt text for all images
- Semantic HTML structure

## Build Configuration
- Output: static export
- Image optimization: disabled for static export (use placeholder images)
- Trailingslash: true

## Next Steps After Build
1. Replace placeholder images with actual product photos
2. Add real contact information
3. Configure email service for forms (Resend, SendGrid, etc.)
4. Set up analytics (Google Analytics or Plausible)
5. Add SSL certificate for custom domain
6. Configure Stripe for payment processing
7. Test all forms and cart functionality
8. Optimize images for web
9. Add cookie consent banner
10. Create social media accounts and link them

## Timeline Estimate
- Total: 2-3 hours for complete implementation
- Breakdown:
  - Setup & Types: 15 min
  - Data & Context: 20 min
  - Layout Components: 30 min
  - Product Components: 25 min
  - Pages (9 pages): 60 min
  - Styling & Polish: 20 min
  - Testing & Build: 15 min

---

**Ready to execute?** All requirements and specifications are documented above for comprehensive implementation.
