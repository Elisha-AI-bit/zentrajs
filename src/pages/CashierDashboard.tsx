import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const CashierDashboard: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleCheckout = () => {
    // Logic to process checkout
    alert('Checkout processed successfully!');
    setCartItems([]);
    setTotal(0);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Cashier Dashboard</h1>
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Cart Items</h2>
          <ul className="list-disc pl-5">
            {cartItems.length === 0 ? (
              <li className="text-gray-500">No items in the cart</li>
            ) : (
              cartItems.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item.name} - ${item.price.toFixed(2)}
                </li>
              ))
            )}
          </ul>
          <p className="text-lg font-semibold text-gray-800 mt-4">Total: ${total.toFixed(2)}</p>
        </div>
        <Button variant="success" onClick={handleCheckout} disabled={cartItems.length === 0}>
          Process Checkout
        </Button>
      </div>
    </Layout>
  );
};

export default CashierDashboard; 