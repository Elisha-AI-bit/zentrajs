import React from 'react';
import { Receipt as ReceiptType } from '../types';
import { ShoppingBag, Calendar, User } from 'lucide-react';

interface ReceiptProps {
  receipt: ReceiptType;
}

const Receipt: React.FC<ReceiptProps> = ({ receipt }) => {
  const date = new Date(receipt.timestamp);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">ZENTRA MARKET</h1>
        <p className="text-gray-500">Chau , Shopping City</p>
        <p className="text-gray-500">Tel: +260 973993130</p>
      </div>

      <div className="border-t border-b border-gray-200 py-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-gray-700">
            <ShoppingBag size={18} className="mr-2" />
            <span>Receipt #: {receipt.id.substring(0, 8).toUpperCase()}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Calendar size={18} className="mr-2" />
            <span>{formattedDate} {formattedTime}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-700">
          <User size={18} className="mr-2" />
          <span>Cashier: {receipt.cashierId}</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Items Purchased</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 text-gray-600">Item</th>
              <th className="text-center py-2 text-gray-600">Qty</th>
              <th className="text-right py-2 text-gray-600">Price</th>
              <th className="text-right py-2 text-gray-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {receipt.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-2 text-gray-800">{item.name}</td>
                <td className="py-2 text-center text-gray-800">{item.quantity}</td>
                <td className="py-2 text-right text-gray-800">K{item.price.toFixed(2)}</td>
                <td className="py-2 text-right text-gray-800">K{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-800">K{receipt.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Tax (7%)</span>
          <span className="text-gray-800">K{(receipt.totalAmount * 0.07).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>K{(receipt.totalAmount * 1.07).toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm">
        <p>Trolley ID: {receipt.trolleyId}</p>
        <p className="mt-2">Thank you for shopping with Zentra!</p>
        <p>Please keep your receipt for returns or exchanges.</p>
      </div>
    </div>
  );
};

export default Receipt;