import React, { useState } from 'react';
import { Users, Package, BarChart, Clock, Search } from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { products } from '../lib/data';

const AdminPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.barcode.includes(searchTerm);
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage inventory, view analytics, and process checkouts
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-2xl font-semibold">{products.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active Trolleys</p>
                <p className="text-2xl font-semibold">2</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <BarChart className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Today's Sales</p>
                <p className="text-2xl font-semibold">$1,245.89</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Avg. Checkout Time</p>
                <p className="text-2xl font-semibold">2m 34s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button 
            variant="primary" 
            size="lg" 
            fullWidth 
            className="p-6 justify-start"
            onClick={() => window.location.href = '/admin/checkout'}
          >
            <div className="flex items-center">
              <div className="bg-blue-700 p-3 rounded-full mr-4">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Process Checkout</h3>
                <p className="text-blue-100 text-sm">Handle customer payments</p>
              </div>
            </div>
          </Button>
          
          <Button 
            variant="primary" 
            size="lg" 
            fullWidth 
            className="p-6 justify-start bg-green-600 hover:bg-green-700"
          >
            <div className="flex items-center">
              <div className="bg-green-700 p-3 rounded-full mr-4">
                <BarChart className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Analytics</h3>
                <p className="text-green-100 text-sm">View reports and metrics</p>
              </div>
            </div>
          </Button>
          
          <Button 
            variant="primary" 
            size="lg" 
            fullWidth 
            className="p-6 justify-start bg-purple-600 hover:bg-purple-700"
          >
            <div className="flex items-center">
              <div className="bg-purple-700 p-3 rounded-full mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">User Management</h3>
                <p className="text-purple-100 text-sm">Manage staff accounts</p>
              </div>
            </div>
          </Button>
        </div>

        {/* Inventory Management */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Inventory Management</h2>
          </div>
          
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  placeholder="Search by name or barcode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <Button variant="success">Add New Product</Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Barcode
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weight (kg)
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.image && (
                            <div className="flex-shrink-0 h-10 w-10 mr-3">
                              <img 
                                className="h-10 w-10 rounded-full object-cover" 
                                src={product.image} 
                                alt="" 
                              />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.barcode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.weight}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="outline" size="sm" className="mr-2">
                          Edit
                        </Button>
                        <Button variant="danger" size="sm">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No products found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;