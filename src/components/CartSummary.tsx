import React from 'react';
import { CartItem } from '../types';

interface CartSummaryProps {
  items: CartItem[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.07; // Assuming 7% tax
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Items ({totalItems})</span>
          <span className="font-medium">K{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (7%)</span>
          <span className="font-medium">K{tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 my-2 pt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-blue-600">K{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;