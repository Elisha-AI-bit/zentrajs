import React, { useState } from 'react';
import { ShoppingCart, Users, Clipboard, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const role = localStorage.getItem('role') || '';

  const isAdmin = location.pathname.includes('/admin');
  const isTrolley = location.pathname.includes('/trolley');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-green-600 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-2xl flex items-center gap-2">
            <ShoppingCart size={28} />
            <span>Zentra</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-white hover:text-blue-100 transition-colors ${
                location.pathname === '/' ? 'font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/trolley/TR001"
              className={`text-white hover:text-blue-100 transition-colors ${
                isTrolley ? 'font-semibold' : ''
              }`}
            >
              Smart Trolley
            </Link>
            {role === 'cashier' && (
              <Link
                to="/cashier"
                className={`text-white hover:text-blue-100 transition-colors ${
                  location.pathname === '/cashier' ? 'font-semibold' : ''
                }`}
              >
                Checkout
              </Link>
            )}
            <Link
              to="/admin"
              className={`text-white hover:text-blue-100 transition-colors ${
                location.pathname === '/admin' ? 'font-semibold' : ''
              }`}
            >
              Staff
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-10">
        <div className="flex justify-around items-center p-3">
          <Link to="/" className={`flex flex-col items-center p-2 ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}>
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link 
            to="/trolley/TR001" 
            className={`flex flex-col items-center p-2 ${isTrolley ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <ShoppingCart size={20} />
            <span className="text-xs mt-1">Trolley</span>
          </Link>
          {role === 'cashier' && (
            <Link
              to="/cashier"
              className={`flex flex-col items-center p-2 ${
                location.pathname === '/cashier' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Clipboard size={20} />
              <span className="text-xs mt-1">Checkout</span>
            </Link>
          )}
          <Link
            to="/admin"
            className={`flex flex-col items-center p-2 ${
              location.pathname === '/admin' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Users size={20} />
            <span className="text-xs mt-1">Staff</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;