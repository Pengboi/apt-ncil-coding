export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'tshirts' | 'longsleeves' | 'hoodies' | 'shorts' | 'socks' | 'aprons' | 'totebags' | 'hats' | 'mugs' | 'cups' | 'plates' | 'poloshirts' | 'babyclothes' | 'dogclothes';
  images: string[];
  sizes?: string[];
  colors?: string[];
  customizationOptions?: {
    allowText: boolean;
    allowImage: boolean;
  };
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
  customText?: string;
  customImage?: string;
}

export interface CameraBoothPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

export interface CustomOrderRequest {
  name: string;
  email: string;
  phone: string;
  productType: string;
  quantity: number;
  description: string;
  designFile?: File;
  deadline?: string;
}

export interface CameraBookingRequest {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  packageId: string;
  guestCount: number;
  specialRequests?: string;
}
