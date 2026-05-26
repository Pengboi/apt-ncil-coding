import { Product } from './data/products';

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  ribbonText: string;
  glitter: boolean;
}
