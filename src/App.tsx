import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TrolleyPage from './pages/TrolleyPage';
import AdminPage from './pages/AdminPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trolley/:id" element={<TrolleyPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;