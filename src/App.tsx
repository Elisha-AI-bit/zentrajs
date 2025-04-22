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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trolley/:id" element={<TrolleyPage />} />
        <Route path="/admin" element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" replace />} />
        <Route path="/admin/checkout" element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" replace />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/cashier" element={<CashierDashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;