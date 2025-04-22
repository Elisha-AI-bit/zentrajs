import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface ProductListProps {
  items: CartItem[];
  onRemove?: (id: string) => void;
  isCheckout?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ items, onRemove, isCheckout = false }) => {
  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No items in cart</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li 
            key={item.id} 
            className="p-4 flex items-center hover:bg-gray-50 transition-colors animate-fade-in"
          >
            {item.image && (
              <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden mr-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  Weight: {item.weight} kg
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 text-right">
              <div className="font-medium text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                Qty: {item.quantity}
              </div>
            </div>
            {!isCheckout && onRemove && (
              <button
                onClick={() => onRemove(item.id)}
                className="ml-4 text-red-600 hover:text-red-800 p-1"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;