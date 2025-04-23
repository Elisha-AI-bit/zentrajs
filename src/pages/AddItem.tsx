import React, { useState } from 'react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { products } from '../lib/data';
import Papa from 'papaparse';

interface AddItemProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [barcode, setBarcode] = useState('');
  const [weight, setWeight] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const handleAddItem = () => {
    const newItem = {
      id: (products.length + 1).toString(),
      name,
      price: parseFloat(price),
      barcode,
      weight: parseFloat(weight),
      category,
      image,
    };
    products.push(newItem);
    setName('');
    setPrice('');
    setBarcode('');
    setWeight('');
    setCategory('');
    setImage('');
    onClose();
    alert('Item added successfully!');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBulkAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log('Parsed data:', results.data);
          const newItems = results.data.map((item: any) => ({
            id: (products.length + 1).toString(),
            name: item.name,
            price: parseFloat(item.price),
            barcode: item.barcode,
            weight: parseFloat(item.weight),
            category: item.category,
            image: item.image || '',
          }));
          products.push(...newItems);
          alert('Items added successfully!');
        },
        skipEmptyLines: true,
      });
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div>
      <Button variant="success" onClick={onClose} className="shadow-md hover:shadow-lg transition-shadow">
        Add New Item
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Item</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700" htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700" htmlFor="barcode">Barcode</label>
              <input
                type="text"
                id="barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700" htmlFor="weight">Weight</label>
              <input
                type="text"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700" htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700" htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <input type="file" accept=".csv,.txt" onChange={handleBulkAdd} className="hidden" id="bulkAddInput" />
              <label htmlFor="bulkAddInput">
                <Button variant="success" className="ml-2">Bulk Add</Button>
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="success" onClick={handleAddItem} className="shadow-md hover:shadow-lg transition-shadow">
              Add Item
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddItem; 