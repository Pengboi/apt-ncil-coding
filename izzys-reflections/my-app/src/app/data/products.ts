import { Product } from '../types';

export const products: Product[] = [
  // T-Shirts
  {
    id: 'tshirt-1',
    name: 'Classic Cotton T-Shirt',
    description: 'Premium 100% cotton t-shirt perfect for custom printing. Soft, comfortable, and durable with a classic fit.',
    price: 25,
    category: 'tshirts',
    images: ['/images/products/tshirt-1.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['White', 'Black', 'Navy', 'Red', 'Heather Gray', 'Royal Blue', 'Forest Green'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'tshirt-2',
    name: 'V-Neck T-Shirt',
    description: 'Stylish V-neck t-shirt with a modern fit. Perfect for casual or dressy occasions.',
    price: 27,
    category: 'tshirts',
    images: ['/images/products/tshirt-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['White', 'Black', 'Navy', 'Gray', 'Burgundy'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },
  {
    id: 'tshirt-3',
    name: 'Organic Cotton Tee',
    description: 'Eco-friendly organic cotton t-shirt. Sustainable fashion that feels great and looks amazing.',
    price: 32,
    category: 'tshirts',
    images: ['/images/products/tshirt-3.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    colors: ['Natural', 'Black', 'Olive', 'Rust', 'Teal'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },

  // Long Sleeves
  {
    id: 'longsleeve-1',
    name: 'Classic Long Sleeve Tee',
    description: 'Versatile long sleeve shirt for any season. Great for layering or standalone wear.',
    price: 30,
    category: 'longsleeves',
    images: ['/images/products/longsleeve-1.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['White', 'Black', 'Navy', 'Heather Gray', 'Olive'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'longsleeve-2',
    name: 'Thermal Long Sleeve',
    description: 'Warm waffle-knit thermal long sleeve shirt. Perfect for cooler weather with a classic look.',
    price: 35,
    category: 'longsleeves',
    images: ['/images/products/longsleeve-2.jpg'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'Navy', 'Charcoal', 'Heather Gray'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },

  // Hoodies
  {
    id: 'hoodie-1',
    name: 'Premium Pullover Hoodie',
    description: 'Heavyweight hoodie with soft fleece interior. Perfect for custom designs and staying cozy.',
    price: 45,
    category: 'hoodies',
    images: ['/images/products/hoodie-1.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'Navy', 'Gray', 'Burgundy', 'Forest Green', 'Royal Blue'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'hoodie-2',
    name: 'Zip-Up Hoodie',
    description: 'Full-zip hoodie for easy layering. Premium construction with kangaroo pockets.',
    price: 48,
    category: 'hoodies',
    images: ['/images/products/hoodie-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'Navy', 'Gray', 'Charcoal', 'Maroon'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'hoodie-3',
    name: 'Lightweight Hoodie',
    description: 'Perfect for mild weather or gym wear. Breathable and comfortable with a modern fit.',
    price: 38,
    category: 'hoodies',
    images: ['/images/products/hoodie-3.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Heather Gray', 'Navy', 'Olive'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },

  // Shorts
  {
    id: 'shorts-1',
    name: 'Athletic Shorts',
    description: 'Performance athletic shorts with moisture-wicking fabric. Perfect for sports and workouts.',
    price: 28,
    category: 'shorts',
    images: ['/images/products/shorts-1.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black', 'Navy', 'Gray', 'Red', 'Royal Blue'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'shorts-2',
    name: 'Casual Cotton Shorts',
    description: 'Comfortable cotton shorts perfect for everyday wear. Relaxed fit with drawstring waist.',
    price: 26,
    category: 'shorts',
    images: ['/images/products/shorts-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['Black', 'Navy', 'Khaki', 'Olive', 'Gray'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },

  // Socks
  {
    id: 'socks-1',
    name: 'Crew Socks (3-Pack)',
    description: 'Comfortable crew socks in a 3-pack. Great for adding logos or custom designs.',
    price: 18,
    category: 'socks',
    images: ['/images/products/socks-1.jpg'],
    sizes: ['S/M', 'L/XL'],
    colors: ['White', 'Black', 'Gray', 'Navy'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'socks-2',
    name: 'Ankle Socks (3-Pack)',
    description: 'Low-profile ankle socks perfect for athletic or casual wear. Cushioned for comfort.',
    price: 16,
    category: 'socks',
    images: ['/images/products/socks-2.jpg'],
    sizes: ['S/M', 'L/XL'],
    colors: ['White', 'Black', 'Gray', 'Multicolor'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },

  // Aprons
  {
    id: 'apron-1',
    name: 'Chef Apron',
    description: 'Professional-grade chef apron with adjustable neck strap and waist ties. Durable and stain-resistant.',
    price: 32,
    category: 'aprons',
    images: ['/images/products/apron-1.jpg'],
    colors: ['White', 'Black', 'Navy', 'Red', 'Burgundy', 'Olive'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'apron-2',
    name: 'Bib Apron with Pockets',
    description: 'Practical bib apron with multiple pockets. Perfect for BBQ, crafting, or kitchen work.',
    price: 28,
    category: 'aprons',
    images: ['/images/products/apron-2.jpg'],
    colors: ['Black', 'Navy', 'Denim', 'Khaki', 'Red'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },

  // Tote Bags
  {
    id: 'totebag-1',
    name: 'Canvas Tote Bag',
    description: 'Durable canvas tote bag perfect for shopping, beach, or daily use. Spacious and eco-friendly.',
    price: 22,
    category: 'totebags',
    images: ['/images/products/totebag-1.jpg'],
    colors: ['Natural', 'Black', 'Navy', 'Red', 'Pink', 'Teal'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'totebag-2',
    name: 'Large Shopping Tote',
    description: 'Oversized tote bag with reinforced handles. Perfect for groceries, books, or everyday essentials.',
    price: 26,
    category: 'totebags',
    images: ['/images/products/totebag-2.jpg'],
    colors: ['Natural', 'Black', 'Gray', 'Burgundy', 'Forest Green'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },

  // Hats
  {
    id: 'hat-1',
    name: 'Snapback Cap',
    description: 'Classic snapback cap with adjustable fit. Bold front panel perfect for embroidery or printing.',
    price: 28,
    category: 'hats',
    images: ['/images/products/hat-1.jpg'],
    colors: ['Black', 'Navy', 'Red', 'White', 'Camo', 'Royal Blue'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'hat-2',
    name: 'Beanie',
    description: 'Warm acrylic beanie perfect for winter wear. Great for subtle branding.',
    price: 22,
    category: 'hats',
    images: ['/images/products/hat-2.jpg'],
    colors: ['Black', 'Navy', 'Charcoal', 'Heather Gray', 'Burgundy', 'Olive'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },
  {
    id: 'hat-3',
    name: 'Trucker Hat',
    description: 'Vintage-style trucker hat with mesh back. Perfect for casual custom designs.',
    price: 26,
    category: 'hats',
    images: ['/images/products/hat-3.jpg'],
    colors: ['Black/White', 'Navy/White', 'Red/White', 'Camo/Black', 'Pink/White'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'hat-4',
    name: 'Dad Hat',
    description: 'Low-profile dad hat with curved brim. Comfortable and stylish for everyday wear.',
    price: 24,
    category: 'hats',
    images: ['/images/products/hat-4.jpg'],
    colors: ['Black', 'Navy', 'Olive', 'Pink', 'Stone', 'Mustard'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },

  // Mugs
  {
    id: 'mug-1',
    name: 'Ceramic Mug 11oz',
    description: 'Classic ceramic mug perfect for coffee, tea, or hot chocolate. Dishwasher and microwave safe.',
    price: 18,
    category: 'mugs',
    images: ['/images/products/mug-1.jpg'],
    colors: ['White', 'Black', 'Red', 'Navy', 'Pink', 'Teal'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'mug-2',
    name: 'Travel Mug',
    description: 'Double-wall insulated travel mug with spill-resistant lid. Keeps drinks hot or cold for hours.',
    price: 25,
    category: 'mugs',
    images: ['/images/products/mug-2.jpg'],
    colors: ['Silver', 'Black', 'Navy', 'White', 'Teal', 'Rose Gold'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'mug-3',
    name: 'Large Mug 15oz',
    description: 'Extra-large ceramic mug for serious coffee lovers. More room for your custom design.',
    price: 22,
    category: 'mugs',
    images: ['/images/products/mug-3.jpg'],
    colors: ['White', 'Black', 'Blue', 'Green', 'Yellow'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },
  {
    id: 'mug-4',
    name: 'Color Changing Mug',
    description: 'Magic mug that reveals your design when hot liquid is added. A fun and memorable gift!',
    price: 28,
    category: 'mugs',
    images: ['/images/products/mug-4.jpg'],
    colors: ['Black'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },

  // Cups
  {
    id: 'cup-1',
    name: 'Stadium Cup 16oz',
    description: 'Durable plastic stadium cup perfect for events and parties. Reusable and dishwasher safe.',
    price: 8,
    category: 'cups',
    images: ['/images/products/cup-1.jpg'],
    colors: ['Clear', 'Red', 'Blue', 'Green', 'Black', 'White'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'cup-2',
    name: 'Tumbler Cup with Straw',
    description: 'Double-wall insulated tumbler with matching straw. Great for iced drinks and smoothies.',
    price: 20,
    category: 'cups',
    images: ['/images/products/cup-2.jpg'],
    colors: ['Clear', 'Pink', 'Blue', 'Purple', 'Black', 'Teal'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },
  {
    id: 'cup-3',
    name: 'Wine Tumbler',
    description: 'Stemless wine tumbler with double-wall insulation. Perfect for indoor or outdoor use.',
    price: 22,
    category: 'cups',
    images: ['/images/products/cup-3.jpg'],
    colors: ['Rose Gold', 'Silver', 'Black', 'White', 'Teal', 'Pink'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },

  // Plates
  {
    id: 'plate-1',
    name: 'Dinner Plate 10"',
    description: 'Ceramic dinner plate perfect for special occasions or everyday use. Microwave and dishwasher safe.',
    price: 24,
    category: 'plates',
    images: ['/images/products/plate-1.jpg'],
    colors: ['White', 'Black', 'Red', 'Blue'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'plate-2',
    name: 'Appetizer Plate Set',
    description: 'Set of 4 small appetizer plates. Perfect for serving snacks, desserts, or appetizers.',
    price: 35,
    category: 'plates',
    images: ['/images/products/plate-2.jpg'],
    colors: ['White', 'Black', 'Multicolor'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },

  // Polo Shirts
  {
    id: 'poloshirt-1',
    name: 'Classic Polo Shirt',
    description: 'Professional polo shirt perfect for corporate branding and team uniforms. Premium cotton blend.',
    price: 35,
    category: 'poloshirts',
    images: ['/images/products/poloshirt-1.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['White', 'Black', 'Navy', 'Red', 'Forest Green', 'Royal Blue', 'Burgundy'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'poloshirt-2',
    name: 'Performance Polo',
    description: 'Moisture-wicking performance polo shirt. Great for golf, tennis, or active work environments.',
    price: 38,
    category: 'poloshirts',
    images: ['/images/products/poloshirt-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['White', 'Black', 'Navy', 'Gray', 'Red', 'Blue'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },

  // Baby Clothes
  {
    id: 'baby-1',
    name: 'Baby Onesie',
    description: 'Soft cotton baby onesie with envelope neckline for easy changing. Perfect for baby shower gifts.',
    price: 20,
    category: 'babyclothes',
    images: ['/images/products/baby-1.jpg'],
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'],
    colors: ['White', 'Pink', 'Blue', 'Yellow', 'Mint', 'Gray'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'baby-2',
    name: 'Baby T-Shirt',
    description: 'Comfortable baby t-shirt with lap shoulders. Easy to put on and take off.',
    price: 18,
    category: 'babyclothes',
    images: ['/images/products/baby-2.jpg'],
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'],
    colors: ['White', 'Pink', 'Blue', 'Yellow', 'Mint', 'Lavender'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },
  {
    id: 'baby-3',
    name: 'Baby Bib',
    description: 'Soft cotton baby bib with Velcro closure. Keeps baby clean and looks adorable.',
    price: 12,
    category: 'babyclothes',
    images: ['/images/products/baby-3.jpg'],
    colors: ['White', 'Pink', 'Blue', 'Yellow', 'Mint', 'Gray'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },

  // Dog Clothes
  {
    id: 'dog-1',
    name: 'Dog T-Shirt',
    description: 'Comfortable cotton dog t-shirt. Perfect for small to medium sized dogs. Shows off your pup\'s personality!',
    price: 22,
    category: 'dogclothes',
    images: ['/images/products/dog-1.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Red', 'Blue', 'Pink', 'Green'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'dog-2',
    name: 'Dog Bandana',
    description: 'Stylish dog bandana that ties around the neck. Perfect for any occasion and fits most dogs.',
    price: 16,
    category: 'dogclothes',
    images: ['/images/products/dog-2.jpg'],
    sizes: ['S', 'M', 'L'],
    colors: ['Red', 'Blue', 'Pink', 'Green', 'Yellow', 'Black', 'White'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
    featured: true,
  },
  {
    id: 'dog-3',
    name: 'Dog Hoodie',
    description: 'Cozy fleece dog hoodie with leash hole. Keeps your furry friend warm and stylish.',
    price: 28,
    category: 'dogclothes',
    images: ['/images/products/dog-3.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Black', 'Red', 'Blue', 'Pink'],
    customizationOptions: {
      allowText: true,
      allowImage: true,
    },
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getAllCategories = (): { id: Product['category']; name: string }[] => [
  { id: 'tshirts', name: 'T-Shirts' },
  { id: 'longsleeves', name: 'Long Sleeves' },
  { id: 'hoodies', name: 'Hoodies' },
  { id: 'shorts', name: 'Shorts' },
  { id: 'socks', name: 'Socks' },
  { id: 'aprons', name: 'Aprons' },
  { id: 'totebags', name: 'Tote Bags' },
  { id: 'hats', name: 'Hats' },
  { id: 'mugs', name: 'Mugs' },
  { id: 'cups', name: 'Cups' },
  { id: 'plates', name: 'Plates' },
  { id: 'poloshirts', name: 'Polo Shirts' },
  { id: 'babyclothes', name: 'Baby Clothes' },
  { id: 'dogclothes', name: 'Dog Clothes' },
];
