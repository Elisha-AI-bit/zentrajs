import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';

interface LoginPageProps {
  onLogin: (role: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminCredentials = { username: 'admin', password: 'admin123' };
    if (username === adminCredentials.username && password === adminCredentials.password) {
      localStorage.setItem('role', 'admin');
      onLogin('admin');
      navigate('/admin');
      return;
    }
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = storedUsers.some((user: { username: string; password: string }) =>
      user.username === username && user.password === password
    );
    if (userExists) {
      localStorage.setItem('role', 'cashier');
      onLogin('cashier');
      navigate('/cashier');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <Button
            variant="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage; 