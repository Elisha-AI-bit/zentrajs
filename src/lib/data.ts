import { Product, Trolley } from '../types';

// Sample product data
export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 1.99,
    barcode: '8001234567890',
    weight: 0.5,
    category: 'Fruits',
    image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    name: 'Whole Milk',
    price: 2.49,
    barcode: '8001234567891',
    weight: 1,
    category: 'Dairy',
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    name: 'Whole Wheat Bread',
    price: 3.29,
    barcode: '8001234567892',
    weight: 0.7,
    category: 'Bakery',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    name: 'Fresh Eggs (12-pack)',
    price: 4.99,
    barcode: '8001234567893',
    weight: 0.6,
    category: 'Dairy',
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '5',
    name: 'Chicken Breast',
    price: 8.99,
    barcode: '8001234567894',
    weight: 1.2,
    category: 'Meat',
    image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '6',
    name: 'Atlantic Salmon',
    price: 12.99,
    barcode: '8001234567895',
    weight: 0.5,
    category: 'Seafood',
    image: 'https://images.pexels.com/photos/248928/pexels-photo-248928.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '7',
    name: 'Avocado',
    price: 1.49,
    barcode: '8001234567896',
    weight: 0.2,
    category: 'Fruits',
    image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '8',
    name: 'Red Bell Pepper',
    price: 1.29,
    barcode: '8001234567897',
    weight: 0.2,
    category: 'Vegetables',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

// Sample trolley data
export const trolleys: Trolley[] = [
  {
    id: 'TR001',
    name: 'Trolley 1',
    items: [],
    totalAmount: 0,
    totalItems: 0,
    status: 'shopping',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'TR002',
    name: 'Trolley 2',
    items: [],
    totalAmount: 0,
    totalItems: 0,
    status: 'shopping',
    timestamp: new Date().toISOString(),
  },
];

// Find a product by barcode
export const findProductByBarcode = (barcode: string): Product | undefined => {
  return products.find(product => product.barcode === barcode);
};