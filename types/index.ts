export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  description: string;
  imageUrls: string[];
  stock: number;
  dimensions?: string;
  material?: string;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  customerInfo: CustomerInfo;
  status: "Confirmed" | "Processing" | "Shipped" | "Delivered";
}
