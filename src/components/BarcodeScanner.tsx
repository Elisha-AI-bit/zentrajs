import React, { useState } from 'react';
import { Scan, AlertCircle } from 'lucide-react';
import Button from './Button';
import { findProductByBarcode } from '../lib/data';

interface BarcodeScannerProps {
  onScan: (product: any) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  const [barcode, setBarcode] = useState('');
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode.trim()) {
      setError('Please enter a barcode');
      return;
    }

    const product = findProductByBarcode(barcode);
    if (product) {
      onScan(product);
      setBarcode('');
      setError('');
    } else {
      setError('Product not found. Please try again.');
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    setError('');
    
    // Simulate a scanning delay
    setTimeout(() => {
      const productIndex = Math.floor(Math.random() * 8); // We have 8 products in our data
      const randomBarcode = `800123456789${productIndex}`;
      const product = findProductByBarcode(randomBarcode);
      
      if (product) {
        onScan(product);
        setBarcode('');
      }
      
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Scan className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold">Barcode Scanner</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="flex flex-col space-y-2">
          <label htmlFor="barcode" className="text-sm text-gray-600">
            Enter Barcode
          </label>
          <div className="flex">
            <input
              type="text"
              id="barcode"
              name="barcode"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 8001234567890"
              disabled={isScanning}
            />
            <Button
              type="submit"
              variant="primary"
              className="rounded-l-none"
              disabled={isScanning}
            >
              Add
            </Button>
          </div>
        </div>
      </form>
      
      <div className="flex justify-between items-center">
        <Button 
          variant="secondary" 
          onClick={simulateScan}
          className="w-full" 
          disabled={isScanning}
        >
          {isScanning ? 'Scanning...' : 'Simulate Scan'}
        </Button>
      </div>
      
      {error && (
        <div className="mt-3 text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;