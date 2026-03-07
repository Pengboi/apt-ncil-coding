export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'birthday' | 'valentine' | 'bouquet' | 'box' | 'purse' | 'thank-you';
  colors: string[];
  customizable: boolean;
  features: string[];
  image: string;
  gallery?: string[];
  bestseller?: boolean;
  new?: boolean;
}

export const products: Product[] = [
  // BIRTHDAY COLLECTION
  {
    id: 'birthday-princess-pink',
    name: 'Birthday Princess Bouquet - Pink',
    description: 'A beautiful pink bouquet with 12 sparkling roses, golden tiara, and custom age ribbon. The perfect gift to make her feel like royalty on her special day!',
    price: 89,
    category: 'birthday',
    colors: ['soft-pink', 'royal-purple'],
    customizable: true,
    features: ['12 Preserved Roses', 'Golden Tiara', 'Custom Age Ribbon', 'Crystal Centers', 'Designer Wrapping'],
    image: '/images/pink-birthday-bouquet.jpg',
    gallery: ['/images/pink-birthday-bouquet.jpg'],
    bestseller: true,
  },
  {
    id: 'birthday-queen-red',
    name: 'Birthday Queen Bouquet - Red',
    description: 'Our grandest birthday arrangement with 24 deep red sparkling roses, premium crystal tiara, and luxury designer wrapping with custom ribbon.',
    price: 149,
    category: 'birthday',
    colors: ['classic-red'],
    customizable: true,
    features: ['24 Preserved Roses', 'Crystal Tiara', 'Custom Ribbon Text', 'Golden Butterflies', 'Luxury Designer Paper'],
    image: '/images/red-birthday-bouquet.jpg',
    gallery: ['/images/red-birthday-bouquet.jpg', '/images/red-birthday-detail.jpg'],
    bestseller: true,
  },
  
  // VALENTINE'S COLLECTION
  {
    id: 'love-letter-box-blue',
    name: 'I Love You Letter Box',
    description: 'Spell out your love with our signature "I ❤️ U" letter box arrangement. Features three sections of sparkling royal blue roses with a delicate butterfly accent.',
    price: 129,
    category: 'valentine',
    colors: ['royal-blue'],
    customizable: true,
    features: ['3-Section Letter Box', '18 Blue Roses', 'Butterfly Accent', 'Crystal Centers', 'Gift Ribbon'],
    image: '/images/blue-letter-box.jpg',
    gallery: ['/images/blue-letter-box.jpg'],
    bestseller: true,
  },
  {
    id: 'valentine-heart-red',
    name: 'Valentine\'s Heart Box',
    description: 'A romantic heart-shaped box filled with vibrant red sparkling roses, pearl decorations, and a "Happy Valentine\'s Day" tag.',
    price: 139,
    category: 'valentine',
    colors: ['classic-red'],
    customizable: true,
    features: ['Heart Box Design', '20 Red Roses', 'Pearl Strand', 'Butterfly Accents', 'Valentine Tag'],
    image: '/images/red-valentine-heart.jpg',
    gallery: ['/images/red-valentine-heart.jpg'],
    new: true,
  },
  {
    id: 'valentine-bouquet-blue',
    name: 'Eternal Love Blue Bouquet',
    description: 'Express your eternal love with this stunning blue rose bouquet featuring golden butterflies and crystal centers. Wrapped in elegant gold-trimmed paper.',
    price: 109,
    category: 'valentine',
    colors: ['royal-blue'],
    customizable: true,
    features: ['15 Blue Roses', 'Golden Butterflies', 'Crystal Centers', 'Premium Wrapping', 'Gift Card'],
    image: '/images/blue-bouquet-elegant.jpg',
    gallery: ['/images/blue-bouquet-elegant.jpg', '/images/blue-roses-detail.jpg'],
  },
  
  // BOUQUETS
  {
    id: 'royal-blue-bouquet',
    name: 'Royal Blue Bouquet',
    description: 'Majestic royal blue preserved roses with sparkling glitter finish, crystal centers, and golden butterfly accents. A truly regal gift for any occasion.',
    price: 99,
    category: 'bouquet',
    colors: ['royal-blue'],
    customizable: true,
    features: ['12 Blue Roses', 'Crystal Centers', 'Golden Butterflies', 'Luxury Wrapping', 'Ribbon Bow'],
    image: '/images/blue-bouquet-elegant.jpg',
    gallery: ['/images/blue-bouquet-elegant.jpg'],
    bestseller: true,
  },
  {
    id: 'pink-delight-bouquet',
    name: 'Pink Delight Bouquet',
    description: 'Soft pink roses with gold trim details and delicate golden butterflies. Perfect for thank you gifts, birthdays, or just because.',
    price: 85,
    category: 'bouquet',
    colors: ['soft-pink'],
    customizable: true,
    features: ['10 Pink Roses', 'Gold Trim', 'Butterfly Accents', 'Designer Paper', 'Thank You Card'],
    image: '/images/pink-thankyou-bouquet.jpg',
    gallery: ['/images/pink-thankyou-bouquet.jpg'],
  },
  {
    id: 'red-velvet-bouquet',
    name: 'Red Velvet Sparkle Bouquet',
    description: 'Rich red velvet-textured roses with sparkling glitter finish, crystal centers, and designer wrapping. The classic romantic choice.',
    price: 109,
    category: 'bouquet',
    colors: ['classic-red'],
    customizable: true,
    features: ['12 Red Roses', 'Velvet Texture', 'Crystal Centers', 'Premium Wrapping', 'Optional Tiara'],
    image: '/images/red-birthday-bouquet.jpg',
    gallery: ['/images/red-birthday-bouquet.jpg'],
  },
  
  // LETTER BOXES
  {
    id: 'letter-box-purple',
    name: 'Purple Passion Letter Box',
    description: 'Gorgeous purple roses arranged in our signature letter box style with three sections. Features a beautiful butterfly accent.',
    price: 119,
    category: 'box',
    colors: ['royal-purple'],
    customizable: true,
    features: ['Letter Box Design', '18 Purple Roses', 'Butterfly Accent', 'Gift Ready', 'Crystal Details'],
    image: '/images/purple-letter-box.jpg',
    gallery: ['/images/purple-letter-box.jpg'],
  },
  {
    id: 'letter-box-blue',
    name: 'Royal Blue Letter Box',
    description: 'Stunning blue roses in a sleek black letter box. Perfect for anniversaries, romantic gestures, or expressing gratitude.',
    price: 129,
    category: 'box',
    colors: ['royal-blue'],
    customizable: true,
    features: ['Sleek Black Box', '18 Blue Roses', 'Crystal Centers', 'Personalized Ribbon Option', 'Butterfly'],
    image: '/images/blue-letter-box.jpg',
    gallery: ['/images/blue-letter-box.jpg'],
  },
  
  // FLOWER PURSES (Your unique product!)
  {
    id: 'flower-purse-purple',
    name: 'Royal Purple Flower Purse',
    description: 'Our signature flower purse! A stunning wearable accessory featuring 6 purple sparkling roses, golden crown accent, and a chic gold chain strap. Truly unique!',
    price: 95,
    category: 'purse',
    colors: ['royal-purple'],
    customizable: false,
    features: ['6 Preserved Roses', 'Golden Crown', 'Gold Chain Strap', 'Black Base', 'Purple Ribbon'],
    image: '/images/purple-flower-purse.jpg',
    gallery: ['/images/purple-flower-purse.jpg'],
    new: true,
  },
  {
    id: 'flower-purse-pink',
    name: 'Pink Petal Flower Purse',
    description: 'A charming pink version of our exclusive flower purse. Features soft pink roses with golden butterfly accents and chain strap.',
    price: 89,
    category: 'purse',
    colors: ['soft-pink'],
    customizable: false,
    features: ['6 Pink Roses', 'Butterfly Accents', 'Chain Strap', 'Elegant Design', 'Gift Box'],
    image: '/images/purple-flower-purse.jpg', // Use purple as placeholder until pink photo added
    gallery: ['/images/purple-flower-purse.jpg'],
  },
  
  // THANK YOU COLLECTION
  {
    id: 'thank-you-pink',
    name: 'Thank You Pink Bouquet',
    description: 'Show your appreciation with this beautiful pink bouquet featuring golden butterflies and a "Thank You" card. Perfect for gratitude and appreciation.',
    price: 75,
    category: 'thank-you',
    colors: ['soft-pink'],
    customizable: true,
    features: ['8 Pink Roses', 'Gold Butterflies', 'Thank You Card', 'Elegant Wrapping', 'Crystal Centers'],
    image: '/images/pink-thankyou-bouquet.jpg',
    gallery: ['/images/pink-thankyou-bouquet.jpg'],
  },
];

export const categories = [
  { id: 'all', name: 'All Products', icon: '✨' },
  { id: 'birthday', name: 'Birthday', icon: '🎂' },
  { id: 'valentine', name: 'Valentine\'s', icon: '💕' },
  { id: 'bouquet', name: 'Bouquets', icon: '💐' },
  { id: 'box', name: 'Letter Boxes', icon: '🎁' },
  { id: 'purse', name: 'Flower Purses', icon: '👜' },
  { id: 'thank-you', name: 'Thank You', icon: '🙏' },
];

export const colors = [
  { id: 'royal-blue', name: 'Royal Blue', hex: '#1e3a8a' },
  { id: 'classic-red', name: 'Classic Red', hex: '#dc2626' },
  { id: 'soft-pink', name: 'Soft Pink', hex: '#ec4899' },
  { id: 'royal-purple', name: 'Royal Purple', hex: '#7c3aed' },
  { id: 'white', name: 'Pure White', hex: '#f3f4f6' },
  { id: 'black', name: 'Midnight Black', hex: '#111827' },
];

// Hero images for reference
export const heroImages = {
  main: '/images/birthday-girl-bouquet.jpg', // Girl holding the large pink bouquet
  secondary: '/images/red-birthday-bouquet.jpg',
};
