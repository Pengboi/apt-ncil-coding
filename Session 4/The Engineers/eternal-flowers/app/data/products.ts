export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'birthday' | 'valentine' | 'bouquet' | 'box' | 'purse';
  colors: ('pink' | 'red' | 'white' | 'peach' | 'emerald-green' | 'purple' | 'pink-gold')[];
  customizable: boolean;
  features: string[];
  image: string;
  gallery?: string[];
  bestseller?: boolean;
  new?: boolean;
}

export const products: Product[] = [
  {
    id: 'birthday-princess-pink',
    name: 'Birthday Princess Bouquet - Pink',
    description: 'A beautiful pink bouquet with 12 sparkling roses, golden tiara, and custom age ribbon. Eternal beauty that lasts forever! The perfect gift to make her feel like royalty on her special day!',
    price: 30,
    category: 'birthday',
    colors: ['pink', 'red', 'white', 'peach', 'emerald-green', 'purple', 'pink-gold'],
    customizable: true,
    features: ['12 Artificial Roses', 'Golden Tiara', 'Custom Age Ribbon', 'Crystal Centers', 'Designer Wrapping'],
    image: '/images/pink-birthday-bouquet.jpg',
    gallery: ['/images/pink-birthday-bouquet.jpg'],
    bestseller: true,
  },
  {
    id: 'birthday-queen-red',
    name: 'Birthday Queen Bouquet - Red',
    description: 'Our grandest birthday arrangement with 24 deep red sparkling roses, premium crystal tiara, and luxury designer wrapping with custom ribbon. Eternal beauty that lasts forever!',
    price: 35,
    category: 'birthday',
    colors: ['pink', 'red', 'white', 'peach', 'emerald-green', 'purple', 'pink-gold'],
    customizable: true,
    features: ['24 Artificial Roses', 'Crystal Tiara', 'Custom Ribbon Text', 'Golden Butterflies', 'Luxury Designer Paper'],
    image: '/images/red-birthday-bouquet.jpg',
    gallery: ['/images/red-birthday-bouquet.jpg', '/images/red-birthday-detail.jpg'],
    bestseller: true,
  },
  {
    id: 'love-letter-box-blue',
    name: "Mum's Love Letter Box",
    description: 'A beautiful tribute to Mum with our signature letter box arrangement. Features three sections of sparkling royal blue roses with a delicate butterfly accent. Eternal beauty that lasts forever!',
    price: 40,
    category: 'valentine',
    colors: ['pink', 'red', 'white', 'peach', 'emerald-green', 'purple', 'pink-gold'],
    customizable: true,
    features: ['3-Section Letter Box', '18 Blue Roses', 'Butterfly Accent', 'Crystal Centers', 'Gift Ribbon'],
    image: '/images/blue-letter-box.jpg',
    gallery: ['/images/blue-letter-box.jpg'],
    bestseller: true,
  },
  {
    id: 'valentine-heart-red',
    name: "Valentine's Romance Bouquet",
    description: 'A romantic heart-shaped arrangement filled with vibrant red sparkling roses, pearl decorations, and a "Happy Valentine\'s Day" tag. Eternal beauty that lasts forever!',
    price: 25,
    category: 'valentine',
    colors: ['pink', 'red', 'white', 'peach', 'emerald-green', 'purple', 'pink-gold'],
    customizable: true,
    features: ['Heart Box Design', '20 Red Roses', 'Pearl Strand', 'Butterfly Accents', 'Valentine Tag'],
    image: '/images/red-valentine-heart.jpg',
    gallery: ['/images/red-valentine-heart.jpg'],
    new: true,
  },
  {
    id: 'valentine-bouquet-blue',
    name: 'Eternal Love Blue Bouquet',
    description: 'Express your eternal love with this stunning blue rose bouquet featuring golden butterflies and crystal centers. Wrapped in elegant gold-trimmed paper. Eternal beauty that lasts forever!',
    price: 25,
    category: 'bouquet',
    colors: ['pink', 'red', 'white', 'peach', 'emerald-green', 'purple', 'pink-gold'],
    customizable: true,
    features: ['15 Blue Roses', 'Golden Butterflies', 'Crystal Centers', 'Premium Wrapping', 'Gift Card'],
    image: '/images/blue-bouquet-elegant.jpg',
    gallery: ['/images/blue-bouquet-elegant.jpg', '/images/blue-roses-detail.jpg'],
  },
  {
    id: 'pink-delight-bouquet',
    name: 'Pink Delight Bouquet',
    description: 'Soft pink roses with gold trim details and delicate golden butterflies. Perfect for thank you gifts, birthdays, or just because. Eternal beauty that lasts forever!',
    price: 25,
    category: 'bouquet',
    colors: ['pink', 'red', 'white', 'peach', 'emerald-green', 'purple', 'pink-gold'],
    customizable: true,
    features: ['10 Pink Roses', 'Gold Trim', 'Butterfly Accents', 'Designer Paper', 'Thank You Card'],
    image: '/images/pink-thankyou-bouquet.jpg',
    gallery: ['/images/pink-thankyou-bouquet.jpg'],
  },
  {
    id: 'letter-box-purple',
    name: 'Purple Passion Letter Box',
    description: 'Gorgeous purple roses arranged in our signature letter box style with three sections. Features a beautiful butterfly accent. Eternal beauty that lasts forever!',
    price: 45,
    category: 'box',
    colors: ['pink', 'red', 'white', 'peach', 'emerald-green', 'purple', 'pink-gold'],
    customizable: true,
    features: ['Letter Box Design', '18 Purple Roses', 'Butterfly Accent', 'Gift Ready', 'Crystal Details'],
    image: '/images/purple-letter-box.jpg',
    gallery: ['/images/purple-letter-box.jpg'],
  },
  {
    id: 'flower-purse-purple',
    name: 'Royal Purple Flower Purse',
    description: 'Our signature flower purse! A stunning wearable accessory featuring 6 purple sparkling roses, golden crown accent, and a chic gold chain strap. Truly unique! Eternal beauty that lasts forever!',
    price: 15,
    category: 'purse',
    colors: ['pink', 'red', 'white', 'peach', 'emerald-green', 'purple', 'pink-gold'],
    customizable: false,
    features: ['6 Artificial Roses', 'Golden Crown', 'Gold Chain Strap', 'Black Base', 'Purple Ribbon'],
    image: '/images/purple-flower-purse.jpg',
    gallery: ['/images/purple-flower-purse.jpg'],
    new: true,
  },
  
];

export const categories = [
  { id: 'all', name: 'All Products', icon: '✨' },
  { id: 'birthday', name: 'Birthday', icon: '🎂' },
  { id: 'valentine', name: 'Valentine\'s', icon: '💕' },
  { id: 'bouquet', name: 'Bouquets', icon: '💐' },
  { id: 'box', name: 'Letter Boxes', icon: '🎁' },
  { id: 'purse', name: 'Flower Purses', icon: '👜' },
];

export const colors = [
  { id: 'pink', name: 'Pink', hex: '#ec4899' },
  { id: 'red', name: 'Red', hex: '#dc2626' },
  { id: 'white', name: 'White', hex: '#f9fafb' },
  { id: 'peach', name: 'Peach', hex: '#fdba74' },
  { id: 'emerald-green', name: 'Emerald Green', hex: '#10b981' },
  { id: 'purple', name: 'Purple', hex: '#7c3aed' },
  { id: 'pink-gold', name: 'Pink with Gold', hex: '#ec4899' },
];

// Hero images for reference
export const heroImages = {
  main: '/images/birthday-girl-bouquet.jpg', // Girl holding the large pink bouquet
  secondary: '/images/red-birthday-bouquet.jpg',
};
