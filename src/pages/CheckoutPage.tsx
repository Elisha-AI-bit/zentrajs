import React, { useState } from 'react';
import { ShoppingCart, ArrowRight, Loader2, Check } from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Receipt from '../components/Receipt';
import { CartItem, Receipt as ReceiptType } from '../types';
import { useLocalStorage } from '../lib/useLocalStorage';

const CheckoutPage: React.FC = () => {
  const [trolleyId, setTrolleyId] = useState('');
  const [loadingTrolley, setLoadingTrolley] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptType | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState('');
  
  const fetchTrolley = () => {
    if (!trolleyId.trim()) {
      setError('Please enter a trolley ID');
      return;
    }
    
    setLoadingTrolley(true);
    setError('');
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Get cart items from localStorage
      const items = JSON.parse(localStorage.getItem(`trolley-${trolleyId}`) || '[]');
      
      if (items.length === 0) {
        setError('No items found for this trolley ID or the trolley is empty');
        setCartItems([]);
      } else {
        setCartItems(items);
      }
      
      setLoadingTrolley(false);
    }, 1000);
  };
  
  const processPayment = () => {
    if (cartItems.length === 0) {
      setError('No items to checkout');
      return;
    }
    
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      
      // Generate receipt
      const newReceipt: ReceiptType = {
        id: `REC${Math.random().toString(36).substr(2, 8)}`,
        trolleyId: trolleyId,
        items: [...cartItems],
        totalAmount,
        totalItems,
        timestamp: new Date().toISOString(),
        cashierId: 'CASH001',
      };
      
      setReceipt(newReceipt);
      setProcessingPayment(false);
      
      // Clear the trolley data in localStorage
      localStorage.removeItem(`trolley-${trolleyId}`);
    }, 2000);
  };
  
  const resetCheckout = () => {
    setTrolleyId('');
    setCartItems([]);
    setReceipt(null);
    setError('');
  };
  
  // Calculate total amount and items
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center text-gray-800">
            <ShoppingCart className="mr-2" />
            Checkout System
          </h1>
          <p className="text-gray-600 mt-1">
            Process customer payments using their trolley ID
          </p>
        </div>
        
        {receipt ? (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Receipt Generated</h2>
              <Button 
                variant="outline" 
                onClick={resetCheckout}
              >
                New Checkout
              </Button>
            </div>
            <Receipt receipt={receipt} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trolley ID Input */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-4">Enter Trolley ID</h2>
                
                <div className="mb-4">
                  <label htmlFor="trolleyId" className="block text-sm text-gray-600 mb-1">
                    Trolley ID
                  </label>
                  <input
                    type="text"
                    id="trolleyId"
                    value={trolleyId}
                    onChange={(e) => setTrolleyId(e.target.value)}
                    placeholder="e.g., TR001"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    disabled={loadingTrolley}
                  />
                </div>
                
                <Button
                  variant="primary"
                  fullWidth
                  onClick={fetchTrolley}
                  disabled={loadingTrolley || !trolleyId.trim()}
                  className="mb-4"
                >
                  {loadingTrolley ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Loading...
                    </>
                  ) : (
                    <>
                      Fetch Trolley Data
                      <ArrowRight className="ml-2" size={18} />
                    </>
                  )}
                </Button>
                
                {error && (
                  <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-2">Available Trolleys (Demo)</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTrolleyId('TR001')}
                    >
                      TR001
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTrolleyId('TR002')}
                    >
                      TR002
                    </Button>
                  </div>
                </div>
              </div>
              
              {cartItems.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-4 mt-6">
                  <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items</span>
                      <span>{totalItems}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>K{totalAmount.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (7%)</span>
                      <span>K{(totalAmount * 0.07).toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-blue-600">K{(totalAmount * 1.07).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="success"
                    fullWidth
                    className="mt-4"
                    onClick={processPayment}
                    disabled={processingPayment}
                  >
                    {processingPayment ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={18} />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Checkout
                        <Check className="ml-2" size={18} />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
            
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Items in Trolley</h2>
                    <div className="text-gray-600">
                      {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      {loadingTrolley ? (
                        <div className="flex flex-col items-center">
                          <Loader2 className="animate-spin mb-2" size={24} />
                          <p>Loading trolley data...</p>
                        </div>
                      ) : (
                        <p>Enter a trolley ID and fetch data to see items</p>
                      )}
                    </div>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <div
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
                            <p className="text-sm text-gray-500">K{item.price.toFixed(2)} each</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                {item.category}
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4 text-right">
                            <div className="font-medium text-gray-900">
                              K{(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                
                {cartItems.length > 0 && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-600 mr-2">Total:</span>
                        <span className="text-xl font-bold text-gray-900">
                          K{totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm">
                        Trolley ID: <span className="font-bold">{trolleyId}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CheckoutPage;