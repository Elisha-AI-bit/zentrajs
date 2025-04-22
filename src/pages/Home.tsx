import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ClipboardList, LayoutDashboard, Truck } from 'lucide-react';
import Button from '../components/Button';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Welcome to Zentra Smart Shopping System
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Revolutionizing retail with real-time item tracking and seamless checkout
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/trolley/TR001">
                <Button size="lg" variant="primary" className="font-semibold">
                  Start Shopping
                </Button>
              </Link>
              <Link to="/admin">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-semibold">
                  Admin Dashboard
                </Button>
              </Link>
              <Link to="/cashier">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-semibold">
                  Cashier Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Trolley Integration</h3>
              <p className="text-gray-600">
                Trolleys equipped with barcode scanners, weight sensors, and display screens for real-time shopping.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Spending Control</h3>
              <p className="text-gray-600">
                Track your spending in real-time with running totals and detailed item information.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <ClipboardList className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Checkout</h3>
              <p className="text-gray-600">
                Skip the line with our unique trolley ID system for fast and accurate payment processing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <LayoutDashboard className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
              <p className="text-gray-600">
                Comprehensive management tools for inventory, checkout processing, and analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-10">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Grab a Smart Trolley</h3>
                <p className="text-gray-600">
                  Each smart trolley is equipped with a display screen, barcode scanner, and weight sensors.
                </p>
              </div>
              <div className="md:w-1/2 bg-gray-100 rounded-lg overflow-hidden shadow-md h-48 flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/5704412/pexels-photo-5704412.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Smart trolley" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center mb-10">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
                <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Scan & Shop</h3>
                <p className="text-gray-600">
                  As you shop, scan item barcodes to add them to your cart. The display shows your running total.
                </p>
              </div>
              <div className="md:w-1/2 bg-gray-100 rounded-lg overflow-hidden shadow-md h-48 flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/230799/pexels-photo-230799.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Scanning items" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Checkout</h3>
                <p className="text-gray-600">
                  Head to checkout and share your trolley ID. The cashier retrieves your cart info for fast payment.
                </p>
              </div>
              <div className="md:w-1/2 bg-gray-100 rounded-lg overflow-hidden shadow-md h-48 flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/2292919/pexels-photo-2292919.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Quick checkout" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;