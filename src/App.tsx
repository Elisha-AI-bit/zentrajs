import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TrolleyPage from './pages/TrolleyPage';
import AdminPage from './pages/AdminPage';
import CheckoutPage from './pages/CheckoutPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LoginPage from './pages/LoginPage';
import CashierDashboard from './pages/CashierDashboard';
import UserManagement from './pages/UserManagement';
import AddItem from './pages/AddItem';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  const handleLogin = (userRole: string) => {
    setIsAuthenticated(true);
    setRole(userRole);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trolley/:id" element={<TrolleyPage />} />
        <Route path="/admin" element={isAuthenticated && role === 'admin' ? <AdminPage /> : <Navigate to="/login" replace />} />
        <Route path="/cashier" element={isAuthenticated && role === 'cashier' ? <CheckoutPage /> : <Navigate to="/login" replace />} />
        <Route path="/admin/checkout" element={isAuthenticated && role === 'admin' ? <CheckoutPage /> : <Navigate to="/login" replace />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;