export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  barcode: string; // Código de barras / SKU para lector
  name: string;
  subtitle: string;
  category: 'vestidos' | 'blusas' | 'blazers' | 'pantalones' | 'accesorios' | 'calzado';
  categoryLabel: string;
  price: number; // Precio base en USD (se convierte a Córdobas C$ a tasa oficial)
  rating: number;
  reviewCount: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  tag?: 'NUEVO' | 'MÁS VENDIDO' | 'EDICIÓN LIMITADA' | 'EXCLUSIVO';
  inStock: boolean;
  description: string;
  details: string[];
  composition: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  tagline: string;
}

export type ShippingType = 'local' | 'nacional';
