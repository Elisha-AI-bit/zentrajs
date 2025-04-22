export interface Product {
  id: string;
  name: string;
  price: number;
  barcode: string;
  weight: number;
  category: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Trolley {
  id: string;
  name: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  status: 'shopping' | 'checkout' | 'completed';
  timestamp: string;
}

export interface Receipt {
  id: string;
  trolleyId: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  timestamp: string;
  cashierId: string;
}