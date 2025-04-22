import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Info, AlertTriangle } from 'lucide-react';
import Layout from '../components/Layout';
import BarcodeScanner from '../components/BarcodeScanner';
import ProductList from '../components/ProductList';
import CartSummary from '../components/CartSummary';
import Button from '../components/Button';
import { CartItem, Product } from '../types';
import { useLocalStorage } from '../lib/useLocalStorage';
import { trolleys } from '../lib/data';

const TrolleyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the trolley or use the first one as default
  const trolleyId = id || trolleys[0]?.id || 'TR001';
  
  // Load cart data from localStorage
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(`trolley-${trolleyId}`, []);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' }>({ message: '', type: 'info' });

  // Calculate total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const handleAddProduct = (product: Product) => {
    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Update quantity if product exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Add new product to cart
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    
    setNotification({
      message: `${product.name} added to cart`,
      type: 'success'
    });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification({ message: '', type: 'info' });
    }, 3000);
  };
  
  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === itemId);
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      
      if (item) {
        setNotification({
          message: `${item.name} removed from cart`,
          type: 'info'
        });
        
        // Clear notification after 3 seconds
        setTimeout(() => {
          setNotification({ message: '', type: 'info' });
        }, 3000);
      }
      
      return updatedItems;
    });
  };
  
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your shopping cart?')) {
      setCartItems([]);
      setNotification({
        message: 'Cart cleared',
        type: 'info'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification({ message: '', type: 'info' });
      }, 3000);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center text-gray-800">
            <ShoppingCart className="mr-2" />
            Smart Trolley {trolleyId}
          </h1>
          <p className="text-gray-600 mt-1">
            Scan items as you shop and keep track of your spending
          </p>
        </div>
        
        {/* Notification */}
        {notification.message && (
          <div 
            className={`mb-4 p-3 rounded-md animate-fade-in ${
              notification.type === 'success' ? 'bg-green-100 text-green-800' : 
              notification.type === 'error' ? 'bg-red-100 text-red-800' : 
              'bg-blue-100 text-blue-800'
            }`}
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <Info className="w-5 h-5 mr-2" />
              ) : notification.type === 'error' ? (
                <AlertTriangle className="w-5 h-5 mr-2" />
              ) : (
                <Info className="w-5 h-5 mr-2" />
              )}
              <p>{notification.message}</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Barcode Scanner Column */}
          <div className="lg:col-span-1">
            <BarcodeScanner onScan={handleAddProduct} />
            
            <div className="mt-6">
              <CartSummary items={cartItems} />
            </div>
            
            <div className="mt-6">
              <Button 
                variant="danger" 
                fullWidth 
                onClick={clearCart}
                disabled={cartItems.length === 0}
              >
                Clear Cart
              </Button>
            </div>
          </div>
          
          {/* Product List Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Shopping Cart</h2>
                  <div className="text-gray-600">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                <ProductList items={cartItems} onRemove={handleRemoveItem} />
              </div>
              
              {cartItems.length > 0 && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-600 mr-2">Total:</span>
                      <span className="text-xl font-bold text-gray-900">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">
                      To complete your purchase, proceed to checkout and provide trolley ID: <span className="font-bold">{trolleyId}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrolleyPage;